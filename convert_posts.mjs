/**
 * convert_posts.mjs
 * Merges scraped_boards.json into postsData.js
 * - Keeps existing hand-written posts (IDs 1~48)
 * - Appends scraped posts starting from ID 49
 */
import fs from 'fs';

const scraped = JSON.parse(fs.readFileSync('./scraped_boards.json', 'utf8'));

// Read current postsData.js to get existing posts count
const currentJs = fs.readFileSync('./src/constants/postsData.js', 'utf8');
// Count existing posts by extracting ids
const existingIds = [...currentJs.matchAll(/^\s+id:\s+(\d+),/gm)].map(m => parseInt(m[1]));
const maxExistingId = existingIds.length > 0 ? Math.max(...existingIds) : 48;
console.log(`Existing posts: max ID = ${maxExistingId}`);

function escapeTemplateLiteral(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

// Format date: "2026-03-20" or "2026.03.20" → "2026-03-20"
function normalizeDate(d) {
  if (!d) return '2026-01-01';
  return d.replace(/\./g, '-');
}

// Map boardType to category
const categoryMap = {
  info:     'info',
  news:     'news',
  caution:  'caution',
  faq:      'faq',
  industry: 'industry',
};

const newPosts = [];
let nextId = maxExistingId + 1;

for (const p of scraped) {
  const title = (p.title || '').trim();
  if (!title) continue;

  const category = categoryMap[p.boardType] || 'info';
  const date = normalizeDate(p.date);
  const views = p.views || Math.floor(Math.random() * 500) + 50;
  const content = (p.content || '내용을 불러오는 중입니다.').trim();

  newPosts.push({ id: nextId++, category, title, date, views, content });
}

console.log(`New posts to add: ${newPosts.length}`);

// Generate JS entries to append
const lines = newPosts.map(p => {
  const escaped = escapeTemplateLiteral(p.content);
  return `  {
    id: ${p.id},
    category: "${p.category}",
    title: "${p.title.replace(/"/g, '\\"')}",
    date: "${p.date}",
    views: ${p.views},
    content: \`${escaped}\`,
  },`;
});

// Inject into postsData.js: replace closing `];` with new entries + `];`
const updated = currentJs.replace(/\];\s*$/, lines.join('\n') + '\n];');
fs.writeFileSync('./src/constants/postsData.js', updated, 'utf8');
console.log(`Done! postsData.js updated with ${newPosts.length} new posts (total IDs up to ${nextId - 1})`);

// Summary by category
const byCat = {};
newPosts.forEach(p => { byCat[p.category] = (byCat[p.category]||0)+1; });
console.log('Added by category:', byCat);
