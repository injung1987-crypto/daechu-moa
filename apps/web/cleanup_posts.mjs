import { postsData, categories } from './src/constants/postsData.js';
import fs from 'fs';

function cleanContent(content) {
  if (!content) return '';
  let c = content;
  // Remove author prefix
  c = c.replace(/^작성자:\s+운영팀\n?/, '');
  // Cut at footer markers
  const footerMarkers = [
    '■ 대출나라 홈페이지',
    '\n목록\n',
    '\n목록\n이전',
    '\n목록\n다음',
    '사기번호검색\n',
    '최근 등록 업체\n',
    'TIP대출나라에 광고',
    '대출나라 이용안내',
  ];
  for (const marker of footerMarkers) {
    const idx = c.indexOf(marker);
    if (idx !== -1) c = c.substring(0, idx);
  }
  // Remove HTML tags
  c = c.replace(/<[^>]+>/g, '');
  // Remove HTML comment artifacts
  c = c.replace(/-->/g, '');
  // Clean up excessive blank lines
  c = c.replace(/\n{3,}/g, '\n\n');
  return c.trim();
}

// Rebuild posts with cleaned content, filter out undefined
const cleaned = postsData
  .filter(p => p && typeof p === 'object')
  .map(p => ({
    ...p,
    content: p.id >= 21 ? cleanContent(p.content) : p.content,
  }));

// Generate JS source
const lines = [];
lines.push('');
lines.push('export const categories = [');
categories.forEach(c => {
  lines.push('  { id: "' + c.id + '", name: "' + c.name + '" },');
});
lines.push('];');
lines.push('');
lines.push('export const postsData = [');
cleaned.forEach(p => {
  // Escape for template literal
  const safeContent = p.content
    .split('\\').join('\\\\')
    .split('`').join('\\`')
    .split('${').join('\\${');
  lines.push('  {');
  lines.push('    id: ' + p.id + ',');
  lines.push('    category: "' + p.category + '",');
  lines.push('    title: ' + JSON.stringify(p.title) + ',');
  lines.push('    date: "' + p.date + '",');
  lines.push('    views: ' + p.views + ',');
  lines.push('    content: `' + safeContent + '`,');
  lines.push('  },');
});
lines.push('];');
lines.push('');

fs.writeFileSync('./src/constants/postsData.js', lines.join('\n'), 'utf8');
console.log('Done. Cleaned', cleaned.length, 'posts.');
