import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles';
import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedArticles } from '@/components/ui/RelatedArticles';
import { FeaturedImage } from '@/components/ui/ArticleImage';
import { categoryLabel, formatDate } from '@/lib/utils';
import { Clock, Calendar, User } from 'lucide-react';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map(s => {
    const [category, slug] = s.split('/');
    return { category, slug };
  });
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(`${params.category}/${params.slug}`);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description || `Artículo sobre ${article.keyword}`,
    alternates: { canonical: `/${params.category}/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.description || '',
      url: `/${params.category}/${params.slug}`,
      type: 'article',
      publishedTime: article.fecha,
      modifiedTime: article.fechaActualizacion || article.fecha,
      authors: [`${siteConfig.url}/autores/equipo-smarthome`],
      siteName: siteConfig.name,
      images: article.imagen ? [
        {
          url: article.imagen,
          width: 1200,
          height: 630,
          alt: article.imagenAlt || article.title,
        }
      ] : [],
    },
    twitter: {
      card: article.imagen ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.description || '',
      images: article.imagen ? [article.imagen] : [],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(`${params.category}/${params.slug}`);
  if (!article) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || '',
    author: {
      '@type': 'Person',
      name: article.autor || 'Casa Inteligente',
      url: `${siteConfig.url}/autores/equipo-smarthome`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: article.fecha,
    dateModified: article.fechaActualizacion || article.fecha,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${params.category}/${params.slug}`,
    },
    ...(article.imagen && {
      image: {
        '@type': 'ImageObject',
        url: article.imagen,
        alt: article.imagenAlt || article.title,
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: categoryLabel(params.category), item: `${siteConfig.url}/${params.category}` },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="py-8 md:py-12">
        <div className="container-content">
          <Breadcrumbs items={[
            { label: categoryLabel(params.category), href: `/${params.category}` },
            { label: article.title },
          ]} />

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-dark-400">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                {categoryLabel(params.category)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.fecha)}
              </span>
              {article.fechaActualizacion && (
                <span className="inline-flex items-center gap-1">
                  Actualizado: {formatDate(article.fechaActualizacion)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
              <Link
                href="/autores/equipo-smarthome"
                className="inline-flex items-center gap-1 hover:text-brand-600 transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                {article.autor}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-dark-900 leading-tight text-balance">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-4 text-lg text-dark-500 leading-relaxed">
                {article.description}
              </p>
            )}
          </header>

          <FeaturedImage
            src={article.imagen || null}
            alt={article.imagenAlt || article.title}
            title={article.title}
          />

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Artículos relacionados */}
          <RelatedArticles articles={article.relatedArticles} />

          {/* Disclaimer afiliación */}
          <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>Divulgación de afiliados:</strong> Este artículo puede contener enlaces de afiliado. Si compras a través de estos enlaces, recibimos una pequeña comisión sin coste adicional para ti. Esto nos ayuda a mantener el sitio y seguir creando contenido gratuito.
          </div>
        </div>
      </article>
    </>
  );
}
