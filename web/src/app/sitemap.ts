import { MetadataRoute } from 'next';
import { getAllArticleSlugs, getCategories } from '@/lib/articles';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteConfig.url}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteConfig.url}/aviso-legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteConfig.url}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const categories = getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${siteConfig.url}/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = getAllArticleSlugs().map(slug => {
    const [category, articleSlug] = slug.split('/');
    return {
      url: `${siteConfig.url}/${category}/${articleSlug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticPages, ...categoryPages, ...articlePages];
}
