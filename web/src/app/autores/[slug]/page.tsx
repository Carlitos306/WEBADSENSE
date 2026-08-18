import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthor } from '@/lib/authors';
import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { User } from 'lucide-react';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [{ slug: 'equipo-smarthome' }];
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthor(params.slug);
  if (!author) return {};

  return {
    title: `${author.name} — Autor`,
    description: author.bio,
    alternates: { canonical: `/autores/${params.slug}` },
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthor(params.slug);
  if (!author) notFound();

  const allArticles = getAllArticles();
  const authorArticles = allArticles.filter(a => a.slug.includes('/'));

  return (
    <div className="py-12 md:py-16">
      <div className="container-content">
        <Breadcrumbs items={[{ label: 'Autores' }, { label: author.name }]} />

        <div className="flex items-start gap-6 mb-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 flex-shrink-0">
            <User className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark-900 mb-2">{author.name}</h1>
            <p className="text-dark-500 max-w-2xl">{author.bio}</p>
            {author.specialization.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {author.specialization.map(s => (
                  <span key={s} className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-dark-900 mb-6">Artículos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authorArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
