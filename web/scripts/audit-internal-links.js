const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');
const LINK_RE = /\[([^\]]*)\]\((\/[^)\s]+)\)/g;

function getSlugMap() {
  const map = new Map();
  if (!fs.existsSync(CONTENT_DIR)) return map;
  for (const cat of fs.readdirSync(CONTENT_DIR)) {
    const catDir = path.join(CONTENT_DIR, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(catDir, file);
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      const slug = (data.slug || `/${cat}/${file.replace('.md', '')}`).replace(/^\/+/, '');
      map.set(slug, { file, title: data.title });
    }
  }
  return map;
}

const slugMap = getSlugMap();
console.log(`Rutas reales del build (slugs frontmatter): ${slugMap.size}`);

const knownPages = new Set([
  '/', '/privacidad', '/cookies', '/aviso-legal', '/contacto',
  ...new Set(Array.from(slugMap.keys()).map(s => `/${s.split('/')[0]}`)),
]);

let broken = 0;
let checked = 0;
const brokenList = [];

for (const [slug, { file }] of slugMap) {
  const filePath = path.join(CONTENT_DIR, slug.split('/')[0], file);
  const txt = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(txt);

  let m;
  const seen = new Set();
  while ((m = LINK_RE.exec(content)) !== null) {
    const href = m[2];
    if (!href.startsWith('/')) continue;
    if (seen.has(href)) continue;
    seen.add(href);

    const hashIdx = href.indexOf('#');
    const cleanHref = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
    if (cleanHref === '/' || knownPages.has(cleanHref) || slugMap.has(cleanHref.replace(/^\/+/, ''))) {
      checked++;
      continue;
    }
    broken++;
    brokenList.push({ from: `/${slug}`, href });
  }
}

console.log(`Enlaces internos verificados: ${checked}`);
console.log(`Enlaces rotos: ${broken}`);
if (brokenList.length) {
  for (const b of brokenList) console.log(`  ROTO ${b.href}  (referenciado desde ${b.from})`);
}

const disabledCats = new Set(['clima-energia', 'electrodomesticos', 'entretenimiento', 'tutoriales']);
const hasDisabled = Array.from(slugMap.keys()).some(s => disabledCats.has(s.split('/')[0]));
console.log(`\nArtículos en categorías 'disabled' (header no enlaza, pero sitemap sí):`, Array.from(slugMap.keys()).filter(s => disabledCats.has(s.split('/')[0])));
process.exit(broken > 0 ? 1 : 0);