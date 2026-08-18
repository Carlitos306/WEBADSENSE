import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Product } from '@/types';

interface AffiliateProductCardProps {
  product: Product;
  layout?: 'vertical' | 'horizontal';
}

export function AffiliateProductCard({ product, layout = 'vertical' }: AffiliateProductCardProps) {
  if (layout === 'horizontal') {
    return (
      <div className="flex gap-4 rounded-xl border border-dark-100 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-md">
        {product.imagen && (
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-dark-50">
            <Image
              src={product.imagen}
              alt={product.nombre}
              fill
              className="object-contain p-2"
              sizes="96px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-dark-900 text-sm truncate">{product.nombre}</h3>
          <p className="text-xs text-dark-400 mt-0.5">{product.marca}</p>
          {product.precio && (
            <p className="text-brand-600 font-bold text-lg mt-1">{product.precio}</p>
          )}
          {product.urlAfiliado && (
            <a
              href={product.urlAfiliado}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Ver precio <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-dark-100 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-50">
      {product.imagen && (
        <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-dark-50">
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">{product.marca}</span>
        {product.modelo && (
          <span className="text-xs text-dark-400">{product.modelo}</span>
        )}
      </div>
      <h3 className="font-semibold text-dark-900 mb-2 line-clamp-2">{product.nombre}</h3>
      {product.precio && (
        <p className="text-brand-600 font-bold text-xl mb-3">{product.precio}</p>
      )}
      {product.urlAfiliado ? (
        <a
          href={product.urlAfiliado}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Ver precio <ExternalLink className="h-4 w-4" />
        </a>
      ) : (
        <span className="flex w-full items-center justify-center rounded-lg border border-dark-200 bg-dark-50 px-4 py-2.5 text-sm font-medium text-dark-400">
          Precio no disponible
        </span>
      )}
    </div>
  );
}
