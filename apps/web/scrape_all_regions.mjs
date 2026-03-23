import https from 'https';
import fs from 'fs';

const REGIONS = [
  { name: '서울', encoded: '%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C' },
  { name: '경기', encoded: '%EA%B2%BD%EA%B8%B0%EB%8F%84' },
  { name: '인천', encoded: '%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '대전', encoded: '%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '대구', encoded: '%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '부산', encoded: '%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '광주', encoded: '%EA%B4%91%EC%A3%BC%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '울산', encoded: '%EC%9A%B8%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C' },
  { name: '세종', encoded: '%EC%84%B8%EC%A2%85%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EC%8B%9C' },
  { name: '강원', encoded: '%EA%B0%95%EC%9B%90%EB%8F%84' },
  { name: '충북', encoded: '%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84' },
  { name: '충남', encoded: '%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84' },
  { name: '전북', encoded: '%EC%A0%84%EB%9D%BC%EB%B6%81%EB%8F%84' },
  { name: '전남', encoded: '%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84' },
  { name: '경북', encoded: '%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84' },
  { name: '경남', encoded: '%EA%B2%BD%EC%83%81%EB%82%A8%EB%8F%84' },
  { name: '제주', encoded: '%EC%A0%9C%EC%A3%BC%EB%8F%84' },
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ko-KR,ko;q=0.9',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function getLastPage(html, encodedRegion) {
  const re = new RegExp(`href='/area_loan/list/${encodedRegion}/(\\d+)' class='page_l00'`);
  const m = html.match(re);
  return m ? parseInt(m[1]) : 1;
}

function parseCompanies(html, regionName) {
  const results = [];
  // Split by each company card anchor
  const parts = html.split(/<a href="\/area_loan\/[bm]view\/\d+[^"]*" class="product-item-area">/);
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];

    const txtMatch = block.match(/<span class="product-item__txt">([\s\S]*?)<\/span>/);
    const bannerTitle = txtMatch ? txtMatch[1].trim().replace(/<[^>]+>/g, '') : '';

    const descMatch = block.match(/<p>([\s\S]*?)<\/p>/);
    const desc = descMatch ? descMatch[1].replace(/<br\s*\/?>/gi, ' / ').replace(/<[^>]+>/g, '').trim() : '';

    const phoneMatch = block.match(/<span><i><\/i>([\d-]+)<\/span>/);
    const phone = phoneMatch ? phoneMatch[1].trim() : '';

    const nameMatch = block.match(/<p class="adbann_com">([\s\S]*?)<\/p>/);
    const name = nameMatch ? nameMatch[1].trim() : '';

    if (name && phone && phone.startsWith('010')) {
      results.push({ name, bannerTitle, desc, phone, region: regionName });
    }
  }
  return results;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const BASE = 'https://xn--910bq9bp2fj52a.com';
  const allRaw = [];

  for (const region of REGIONS) {
    const firstUrl = `${BASE}/area_loan/list/${region.encoded}`;
    process.stdout.write(`[${region.name}] 페이지1 가져오는 중...`);
    const firstHtml = await fetchPage(firstUrl);
    const lastPage = getLastPage(firstHtml, region.encoded);
    const companies1 = parseCompanies(firstHtml, region.name);
    allRaw.push(...companies1);
    process.stdout.write(` ${lastPage}페이지, ${companies1.length}개\n`);

    for (let page = 2; page <= lastPage; page++) {
      await sleep(300);
      const url = `${BASE}/area_loan/list/${region.encoded}/${page}`;
      const html = await fetchPage(url);
      const companies = parseCompanies(html, region.name);
      allRaw.push(...companies);
      process.stdout.write(`  page ${page}/${lastPage}: +${companies.length}개 (누적 ${allRaw.length})\n`);
    }
    await sleep(500);
  }

  console.log(`\n총 수집: ${allRaw.length}개 (중복 포함)`);

  // Track all regions per company
  const companyMap = {};
  allRaw.forEach(c => {
    const key = c.name + '|' + c.phone;
    if (!companyMap[key]) {
      companyMap[key] = { ...c, regions: new Set() };
    }
    companyMap[key].regions.add(c.region);
  });

  // Assign region: if 1 region → use it; if 2 regions → use first; if 3+ → 전국
  const unique = Object.values(companyMap).map(c => {
    const regionList = [...c.regions];
    const region = regionList.length >= 3 ? '전국' : regionList[0];
    return { name: c.name, bannerTitle: c.bannerTitle, desc: c.desc, phone: c.phone, region };
  });

  console.log(`중복 제거 후: ${unique.length}개`);
  const byRegion = {};
  unique.forEach(c => byRegion[c.region] = (byRegion[c.region]||0)+1);
  console.log('지역별:', JSON.stringify(byRegion));

  fs.writeFileSync('scraped_all_regions.json', JSON.stringify(unique, null, 2), 'utf8');
  console.log('저장 완료: scraped_all_regions.json');
}

main().catch(console.error);
