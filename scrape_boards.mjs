import https from 'https';
import fs from 'fs';

const BASE = 'https://xn--910bq9bp2fj52a.com';

const BOARDS = [
  { boardType: 'info',    label: '금융TIP',  listPath: '/community/tip',   viewBase: '/community/tip/view' },
  { boardType: 'caution', label: '공지사항', listPath: '/cscenter/notice', viewBase: '/cscenter/notice/view' },
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'ko-KR,ko;q=0.9',
  'Connection': 'keep-alive',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const loc = res.headers['location'];
        const next = loc.startsWith('http') ? loc : BASE + loc;
        return fetchPage(next).then(resolve).catch(reject);
      }
      const bufs = [];
      res.on('data', c => bufs.push(c));
      res.on('end', () => resolve(Buffer.concat(bufs).toString('utf8')));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout: ' + url)); });
  });
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/&[a-z]+;/gi, ' ').replace(/&#\d+;/gi, ' ')
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Extract posts from list page: find all links matching viewBase pattern
function parseListPage(html, viewBase) {
  const posts = [];
  // Find all href="viewBase/ID/1" patterns in the page
  const escapedBase = viewBase.replace(/\//g, '\\/');
  const linkRe = new RegExp(`href=["'](${escapedBase}\\/(\\d+)\\/1)["']`, 'g');

  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1];
    const id = m[2];

    // Find the surrounding context (up to 500 chars after the href)
    const pos = m.index;
    const context = html.slice(Math.max(0, pos - 50), pos + 500);

    // Extract title from anchor text
    const anchorRe = new RegExp(`href=["']${href.replace(/\//g, '\\/')}["'][^>]*>([\\s\\S]*?)<\\/a>`, 'i');
    const anchorMatch = anchorRe.exec(context);
    const title = anchorMatch ? stripHtml(anchorMatch[1]).replace(/\s+/g, ' ').trim() : '';
    if (!title) continue;

    // Extract date from context (look forward from the link)
    const dateMatch = context.match(/\d{4}[.\-]\d{2}[.\-]\d{2}/);
    const date = dateMatch ? dateMatch[0].replace(/\./g, '-') : '';

    // Extract view count (last number in context that's not the ID)
    const numMatches = [...context.matchAll(/\b(\d+)\b/g)].map(n => n[1]);
    const views = numMatches.filter(n => n !== id && n.length <= 6).pop() || '0';

    posts.push({ id, href, title, date, views });
  }

  return posts;
}

function extractContent(html) {
  // Try multiple selectors for the post content area
  const selectors = [
    /<div[^>]+class="[^"]*(?:bbs_content|tip_content|view_content|board_content|content_view)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+class="[^"]*(?:article|post_content|txt_area)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    // Broad: content area between title row and navigation
    /(?:작성일|등록일|Date)[\s\S]{0,200}?<\/tr>([\s\S]*?)(?:<a[^>]+>목록<\/a>|class="btn_list")/i,
  ];

  for (const re of selectors) {
    const m = re.exec(html);
    if (m && stripHtml(m[1]).length > 20) {
      return stripHtml(m[1]).substring(0, 3000);
    }
  }

  // Fallback: find the longest <p> block
  let best = '';
  let m2;
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((m2 = pRe.exec(html)) !== null) {
    const t = stripHtml(m2[1]).trim();
    if (t.length > best.length) best = t;
  }
  return best.length > 20 ? best.substring(0, 3000) : '';
}

async function scrapeBoard(board, maxPages = 10) {
  const results = [];
  console.log(`\n[${board.label}] 스크래핑 시작 (최대 ${maxPages}페이지)`);

  for (let page = 1; page <= maxPages; page++) {
    const url = page === 1 ? `${BASE}${board.listPath}` : `${BASE}${board.listPath}?page=${page}`;
    process.stdout.write(`  페이지 ${page}... `);

    let html;
    try {
      html = await fetchPage(url);
    } catch (e) {
      console.log(`오류: ${e.message}`);
      await sleep(2000);
      continue;
    }

    if (html.includes('자동 차단') || html.includes('비정상 접속')) {
      console.log('차단됨! 중단');
      break;
    }

    const posts = parseListPage(html, board.viewBase);
    console.log(`${posts.length}개`);

    if (posts.length === 0) {
      console.log('  → 더 이상 게시글 없음, 중단');
      break;
    }

    for (const post of posts) {
      await sleep(1200);
      const detailUrl = `${BASE}${post.href}`;

      let content = '';
      try {
        const detailHtml = await fetchPage(detailUrl);
        content = extractContent(detailHtml);
      } catch (e) {
        // skip content, use empty
      }

      results.push({
        boardType: board.boardType,
        title: post.title,
        date: post.date,
        views: parseInt(post.views) || 0,
        content,
      });

      process.stdout.write('.');
    }
    console.log('');
    await sleep(1500);
  }

  console.log(`  → [${board.label}] 총 ${results.length}개 완료`);
  return results;
}

async function main() {
  const all = [];

  const pageLimits = { info: 30, caution: 5 };

  for (const board of BOARDS) {
    const posts = await scrapeBoard(board, pageLimits[board.boardType] || 10);
    all.push(...posts);
  }

  console.log(`\n전체 수집: ${all.length}개`);
  fs.writeFileSync('./scraped_boards.json', JSON.stringify(all, null, 2), 'utf8');
  console.log('저장: scraped_boards.json');
}

main().catch(console.error);
