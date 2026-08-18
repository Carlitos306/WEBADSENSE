import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import readingTime from 'reading-time';
import type { Article, ArticleSummary, ArticleFrontmatter, Category } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

export function getAllArticleSlugs(): string[] {
  const slugs: string[] = [];
  const categories = getCategories();

  for (const cat of categories) {
    const catDir = path.join(CONTENT_DIR, cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      slugs.push(`${cat}/${file.replace('.md', '')}`);
    }
  }
  return slugs;
}

export function getCategories(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter(f => {
    const fullPath = path.join(CONTENT_DIR, f);
    return fs.statSync(fullPath).isDirectory();
  });
}

export function getCategoryMeta(slug: string): Category | null {
  const meta: Record<string, { name: string; description: string; icon: string }> = {
    'seguridad': { name: 'Seguridad', description: 'Cámaras, cerraduras, alarmas, sensores y todo lo necesario para proteger tu hogar con tecnología inteligente.', icon: 'Shield' },
    'iluminacion': { name: 'Iluminación', description: 'Focos, interruptores, cintas LED y soluciones de iluminación inteligente para cada habitación.', icon: 'Lightbulb' },
    'asistentes-hubs': { name: 'Asistentes y Hubs', description: 'Alexa, Google Home, HomeKit, Home Assistant y todos los protocolos de domótica explicados.', icon: 'Cpu' },
    'guias-de-compra': { name: 'Guías de Compra', description: 'Guías completas para principiantes, comparativas de productos y consejos para empezar en domótica.', icon: 'ShoppingCart' },
    'clima-energia': { name: 'Clima y Energía', description: 'Termostatos inteligentes, sensores de temperatura y soluciones de eficiencia energética.', icon: 'Thermometer' },
    'electrodomesticos': { name: 'Electrodomésticos', description: 'Aspiradores robot, cocinas inteligentes y electrodomésticos conectados.', icon: 'WashingMachine' },
    'entretenimiento': { name: 'Entretenimiento', description: 'Audio multiroom, streaming y sistemas de sonido inteligente.', icon: 'Music' },
    'tutoriales': { name: 'Tutoriales', description: 'Guías paso a paso para instalar, configurar y resolver problemas de dispositivos smart home.', icon: 'BookOpen' },
  };

  const info = meta[slug];
  if (!info) return null;

  const articles = getArticlesByCategory(slug);

  return {
    ...info,
    slug,
    articles,
  };
}

export function getArticleBySlug(slug: string): Article | null {
  const parts = slug.split('/');
  if (parts.length !== 2) return null;

  const [category, articleSlug] = parts;
  const filePath = path.join(CONTENT_DIR, category, `${articleSlug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .processSync(content);

  const contentHtml = addInternalLinks(processedContent.toString(), data.slug || slug, data.categoria || category);
  const stats = readingTime(content);

  const frontmatter: ArticleFrontmatter = {
    title: data.title || '',
    slug: data.slug || slug,
    description: data.description,
    keyword: data.keyword || '',
    keywords: data.keywords,
    volumen: data.volumen,
    kd: data.kd,
    intencion: data.intencion || 'informativa',
    categoria: data.categoria || category,
    subcategoria: data.subcategoria,
    fecha: data.fecha || '',
    fechaActualizacion: data.fechaActualizacion,
    autor: data.autor || 'Equipo SmartHome',
    imagen: data.imagen,
    imagenAlt: data.imagenAlt,
    schema: data.schema,
  };

  const relatedArticles = getRelatedArticles(frontmatter, 3);

  return {
    ...frontmatter,
    content: contentHtml,
    readingTime: stats.text,
    relatedArticles,
  };
}

export function getAllArticles(): ArticleSummary[] {
  const slugs = getAllArticleSlugs();
  const articles: ArticleSummary[] = [];

  for (const slug of slugs) {
    const parts = slug.split('/');
    const filePath = path.join(CONTENT_DIR, parts[0], `${parts[1]}.md`);
    if (!fs.existsSync(filePath)) continue;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    articles.push({
      title: data.title || '',
      slug: data.slug || slug,
      description: data.description,
      categoria: data.categoria || parts[0],
      intencion: data.intencion || 'informativa',
      keyword: data.keyword || '',
    });
  }

  return articles;
}

export function getArticlesByCategory(category: string): ArticleSummary[] {
  return getAllArticles().filter(a => a.categoria === category);
}

export function getRelatedArticles(article: ArticleFrontmatter, limit: number = 3): ArticleSummary[] {
  const all = getAllArticles();

  const scored = all
    .filter(a => a.slug !== article.slug)
    .map(a => {
      let score = 0;
      if (a.categoria === article.categoria) score += 3;
      if (a.intencion === article.intencion) score += 1;
      if (a.keyword && article.keyword) {
        const articleWords = article.keyword.toLowerCase().split(' ');
        const aWords = a.keyword.toLowerCase().split(' ');
        const overlap = articleWords.filter(w => aWords.includes(w)).length;
        score += overlap;
      }
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.article);
}

export function getFeaturedArticles(): ArticleSummary[] {
  const all = getAllArticles();
  return all.filter(a =>
    a.intencion === 'comparativa' || a.keyword.includes('mejor')
  ).slice(0, 6);
}

let keywordLinkCache: Map<string, { slug: string; title: string; categoria: string }> | null = null;

function getAllKeywordLinks(): Map<string, { slug: string; title: string; categoria: string }> {
  if (keywordLinkCache) return keywordLinkCache;

  const all = getAllArticles();
  keywordLinkCache = new Map();

  for (const article of all) {
    if (article.keyword) {
      keywordLinkCache.set(article.keyword.toLowerCase(), {
        slug: article.slug,
        title: article.title,
        categoria: article.categoria,
      });
    }
  }

  return keywordLinkCache;
}

const MAX_AUTO_LINKS = 3;

export function addInternalLinks(html: string, currentSlug: string, currentCategoria: string): string {
  const allLinks = getAllKeywordLinks();
  let result = html;
  const linked = new Set<string>();
  let linkCount = 0;

  const sortedEntries = Array.from(allLinks.entries())
    .filter(([_, { slug, categoria }]) => {
      if (slug === currentSlug) return false;
      if (categoria !== currentCategoria) return false;
      return true;
    })
    .sort((a, b) => b[0].length - a[0].length);

  const skipPatterns = [
    /<h[1-6][^>]*>.*?<\/h[1-6]>/gi,
    /<a[^>]*>.*?<\/a>/gi,
    /<strong[^>]*>.*?<\/strong>/gi,
    /<[^>]+>/g,
  ];

  for (const [keyword, { slug }] of sortedEntries) {
    if (linkCount >= MAX_AUTO_LINKS) break;
    if (linked.has(slug)) continue;
    if (keyword.length < 6) continue;

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<![<a-zA-Z])\\b${escapedKeyword}\\b(?![^<]*</a>)`, 'i');
    
    const match = result.match(regex);
    if (!match) continue;

    const matchIndex = result.indexOf(match[0]);
    const beforeMatch = result.substring(Math.max(0, matchIndex - 200), matchIndex);
    const afterMatch = result.substring(matchIndex, matchIndex + 200);

    let inHeading = false;
    for (const pattern of skipPatterns) {
      const fullContext = beforeMatch + match[0] + afterMatch;
      if (pattern.test(fullContext)) {
        inHeading = true;
        break;
      }
    }
    if (inHeading) continue;

    const relativeSlug = slug.startsWith('/') ? slug : `/${slug}`;
    result = result.replace(regex, (m) => {
      linked.add(slug);
      linkCount++;
      return `<a href="${relativeSlug}" class="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">${m}</a>`;
    });
  }

  return result;
}
