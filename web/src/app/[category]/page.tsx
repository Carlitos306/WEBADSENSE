import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryMeta, getArticlesByCategory, getCategories } from '@/lib/articles';
import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { categoryLabel } from '@/lib/utils';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getCategories().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryMeta(params.slug);
  if (!category) return {};

  return {
    title: `${category.name} — Casa Inteligente`,
    description: category.description,
    alternates: { canonical: `/${params.slug}` },
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
      url: `/${params.slug}`,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryMeta(params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(params.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — Casa Inteligente`,
    description: category.description,
    url: `${siteConfig.url}/${params.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteConfig.url}/${params.slug}/${a.slug.split('/').pop()}`,
        name: a.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-dark-50 py-12 md:py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: category.name }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">{category.name}</h1>
          <p className="text-lg text-dark-500 max-w-2xl">{category.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-dark-400">
            <span>{articles.length} artículos</span>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div className="container-wide">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-dark-400 text-lg">Esta categoría está en preparación. Próximamente habrá contenido aquí.</p>
              <Link href="/" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
