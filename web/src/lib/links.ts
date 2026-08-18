const HASH_INDEX_RE = /[#?$]/;

export function normalizeInternalLink(href: string): string {
  if (!href) return '#';

  let clean = href.trim().replace(/^https?:\/\/[^/]+/i, '');
  if (!clean.startsWith('/')) clean = `/${clean}`;

  const splitIdx = clean.search(HASH_INDEX_RE);
  const path = splitIdx >= 0 ? clean.slice(0, splitIdx) : clean;
  const suffix = splitIdx >= 0 ? clean.slice(splitIdx) : '';

  const segments = path
    .split('/')
    .filter(s => s.length > 0)
    .map(s => s.toLowerCase());

  return `/${segments.join('/')}${suffix}`;
}

export function articleUrl(categoria: string, slugOrHref: string): string {
  const clean = (slugOrHref || '').replace(/^\/+/, '');
  const segments = clean.split('/').filter(Boolean);
  const articleSlug = segments.length > 0 ? segments[segments.length - 1] : clean;
  return normalizeInternalLink(`/${categoria}/${articleSlug}`);
}

export function categoryUrl(slug: string): string {
  return normalizeInternalLink(`/${slug}`);
}