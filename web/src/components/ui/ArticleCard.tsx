import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import type { ArticleSummary } from '@/types';
import { categoryLabel } from '@/lib/utils';
import { articleUrl } from '@/lib/links';

const intencionColors: Record<string, string> = {
  comparativa: 'bg-blue-50 text-blue-700',
  guia: 'bg-green-50 text-green-700',
  tutorial: 'bg-purple-50 text-purple-700',
  informativa: 'bg-amber-50 text-amber-700',
};

export function ArticleCard({ article }: { article: ArticleSummary }) {
  const href = articleUrl(article.categoria, article.slug);

  return (
    <article className="group rounded-xl border border-dark-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-md hover:shadow-brand-50">
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${intencionColors[article.intencion] || 'bg-dark-100 text-dark-600'}`}>
          {article.intencion}
        </span>
        <span className="text-xs text-dark-400">{categoryLabel(article.categoria)}</span>
      </div>

      <Link href={href}>
        <h3 className="text-lg font-semibold text-dark-900 group-hover:text-brand-600 transition-colors leading-snug mb-2">
          {article.title}
        </h3>
      </Link>

      {article.description && (
        <p className="text-sm text-dark-500 line-clamp-2 mb-3">{article.description}</p>
      )}

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
      >
        Leer más
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
