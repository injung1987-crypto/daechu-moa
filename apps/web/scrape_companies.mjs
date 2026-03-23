import https from 'https';
import fs from 'fs';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9',
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseCompanies(html) {
  const results = [];
  // Match each company card block
  const cardRegex = /<a href="\/area_loan\/[bm]view\/(\d+)"[^>]*>[\s\S]*?<\/a>\s*<\/li>/g;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const block = match[0];
    const id = match[1];

    const txtMatch = block.match(/<span class="product-item__txt">([\s\S]*?)<\/span>/);
    const bannerTitle = txtMatch ? txtMatch[1].trim().replace(/<[^>]+>/g, '') : '';

    const descMatch = block.match(/<div class="product-item__contents">\s*<p>([\s\S]*?)<\/p>/);
    const desc = descMatch ? descMatch[1].replace(/<br\s*\/?>/g, ' / ').replace(/<[^>]+>/g, '').trim() : '';

    const phoneMatch = block.match(/<span><i><\/i>([\d-]+)<\/span>/);
    const phone = phoneMatch ? phoneMatch[1].trim() : '';

    const nameMatch = block.match(/<p class="adbann_com">([\s\S]*?)<\/p>/);
    const name = nameMatch ? nameMatch[1].trim() : '';

    const areaMatch = block.match(/<p class="adbann_area">([\s\S]*?)<\/p>/);
    const area = areaMatch ? areaMatch[1].trim() : '전국';

    if (name && phone) {
      results.push({ id: parseInt(id), name, bannerTitle, desc, phone, area });
    }
  }
  return results;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const allCompanies = [];
  const baseUrl = 'https://xn--910bq9bp2fj52a.com';

  // First check last page number
  const firstPage = await fetchPage(`${baseUrl}/area_loan/list`);
  const lastPageMatch = firstPage.match(/href='\/area_loan\/list\/(\d+)' class='page_l00'/);
  const totalPages = lastPageMatch ? parseInt(lastPageMatch[1]) : 14;
  console.log(`Total pages: ${totalPages}`);

  for (let page = 1; page <= totalPages; page++) {
    const url = page === 1 ? `${baseUrl}/area_loan/list` : `${baseUrl}/area_loan/list/${page}`;
    console.log(`Fetching page ${page}/${totalPages}...`);
    const html = page === 1 ? firstPage : await fetchPage(url);
    const companies = parseCompanies(html);
    allCompanies.push(...companies);
    console.log(`  Found ${companies.length} companies (total: ${allCompanies.length})`);
    if (page < totalPages) await sleep(500);
  }

  console.log(`\nTotal scraped: ${allCompanies.length}`);

  // Save raw data
  fs.writeFileSync('scraped_companies.json', JSON.stringify(allCompanies, null, 2), 'utf8');
  console.log('Saved to scraped_companies.json');
}

main().catch(console.error);
