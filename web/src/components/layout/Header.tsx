'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/config';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const activeCategories = categories.filter(c => !c.disabled);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-dark-900 hover:text-brand-600 transition-colors">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">SI</span>
            <span>Casa Inteligente</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-dark-600 hover:bg-dark-50 hover:text-dark-900 transition-colors"
              >
                Categorías
                <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoriesOpen && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-dark-100 bg-white p-2 shadow-lg">
                  {activeCategories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-dark-600 hover:bg-dark-50 hover:text-dark-900 transition-colors"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {activeCategories.slice(0, 3).map(cat => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-dark-600 hover:bg-dark-50 hover:text-dark-900 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden rounded-lg p-2 text-dark-600 hover:bg-dark-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-dark-100 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {activeCategories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-dark-600 hover:bg-dark-50 hover:text-dark-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
