import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

export function CategoryCard({ slug, name, description, count, icon }: CategoryCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group rounded-xl border border-dark-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-50"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
        {icon}
      </div>
      <h3 className="font-semibold text-dark-900 mb-1">{name}</h3>
      <p className="text-sm text-dark-500 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-brand-600">{count} artículos</span>
        <ArrowRight className="h-4 w-4 text-dark-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
      </div>
    </Link>
  );
}
