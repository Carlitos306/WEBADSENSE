import { ArticleCard } from './ArticleCard';
import type { Article, ArticleSummary } from '@/types';

interface RelatedArticlesProps {
  articles: Article[] | ArticleSummary[];
  title?: string;
}

export function RelatedArticles({ articles, title = 'Artículos relacionados' }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-dark-100">
      <h2 className="text-xl font-bold text-dark-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
