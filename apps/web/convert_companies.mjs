import data from './scraped_companies.json' with { type: 'json' };
import fs from 'fs';

// Area normalization
const areaMap = {
  '서울': '서울',
  '경기': '경기',
  '경기남부': '경기',
  '경기동부': '경기',
  '인천': '인천',
  '부산': '부산',
  '대구': '대구',
  '대전': '대전',
  '광주': '광주',
  '울산': '울산',
  '세종시': '세종',
  '강원': '강원',
  '충북': '충북',
  '충남': '충남',
  '전북': '전북',
  '전남': '전남',
  '경북': '경북',
  '경남': '경남',
  '제주': '제주',
  '전국': '전국',
};

function getRegion(area) {
  return areaMap[area] || area;
}

function getLoanTypes(banner, desc) {
  const text = (banner + ' ' + desc).toLowerCase();
  const types = new Set();
  if (text.includes('월변')) types.add('월변대출');
  if (text.includes('소액')) types.add('소액대출');
  if (text.includes('무직')) types.add('무직자대출');
  if (text.includes('직장')) types.add('직장인대출');
  if (text.includes('담보')) types.add('담보대출');
  if (text.includes('개인사업') || text.includes('사업자')) types.add('사업자대출');
  if (text.includes('전세')) types.add('전세대출');
  if (text.includes('신용')) types.add('신용대출');
  if (text.includes('비대면')) types.add('비대면대출');
  if (text.includes('당일')) types.add('당일대출');
  if (text.includes('주부')) types.add('주부대출');
  if (text.includes('여성')) types.add('여성대출');
  if (types.size === 0) {
    types.add('월변대출');
    types.add('소액대출');
  }
  return [...types].slice(0, 3);
}

function getRates(banner, desc) {
  const text = banner + ' ' + desc;
  if (text.includes('저금리') || text.includes('최저')) {
    return { min: 10.0, max: 17.5 };
  }
  if (text.includes('고액') || text.includes('억')) {
    return { min: 8.5, max: 16.0 };
  }
  return { min: 12.0, max: 19.9 };
}

function getLoanProducts(name, banner, desc) {
  const descParts = desc.split(' / ').filter(Boolean);
  const products = [];
  
  const types = getLoanTypes(banner, desc);
  
  products.push({
    name: banner || `${name} 대출`,
    rate: `연 12.0% ~ 19.9%`,
    limit: '최대 3,000만원',
    target: descParts[0] || '상담 후 결정'
  });
  
  if (descParts.length > 1) {
    products.push({
      name: types[1] || '소액대출',
      rate: `연 15.0% ~ 19.9%`,
      limit: '최대 500만원',
      target: descParts[1] || '누구나 신청 가능'
    });
  }
  
  return products;
}

// scraped_companies.json uses 'area' field — normalize to region (no deduplication)
const companies = data.map((c, i) => {
  const region = getRegion(c.area || c.region || '전국');
  const rates = getRates(c.bannerTitle, c.desc);
  const loanTypes = getLoanTypes(c.bannerTitle, c.desc);

  return {
    id: i + 1,
    name: c.name,
    region,
    phone: c.phone,
    bannerTitle: c.bannerTitle,
    desc: c.desc,
    registrationNumber: '조회 중',
    businessNumber: '조회 중',
    featured: i < 10,
    loanTypes,
    interestRateMin: rates.min,
    interestRateMax: rates.max,
    loanProducts: getLoanProducts(c.name, c.bannerTitle, c.desc),
  };
});


// Build region list
const regionOrder = ['전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '전국'];
const foundRegions = [...new Set(companies.map(c => c.region))];
const regions = regionOrder.filter(r => r === '전체' || foundRegions.includes(r));

// Build loanProducts list
const allTypes = new Set();
companies.forEach(c => c.loanTypes.forEach(t => allTypes.add(t)));
const loanProductsList = ['전체', ...allTypes];

// Generate JS file
const lines = [];
lines.push('');
lines.push('export const regions = ' + JSON.stringify(regions) + ';');
lines.push('');
lines.push('export const loanProducts = ' + JSON.stringify(loanProductsList) + ';');
lines.push('');
lines.push('export const companiesData = [');
companies.forEach(c => {
  lines.push('  ' + JSON.stringify(c) + ',');
});
lines.push('];');
lines.push('');

fs.writeFileSync('./src/constants/companiesData.js', lines.join('\n'), 'utf8');
console.log('Done! Written', companies.length, 'companies');
console.log('Regions:', regions.join(', '));
