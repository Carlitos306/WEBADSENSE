import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllArticles, getFeaturedArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/config';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { ArrowRight, Shield, Lightbulb, Cpu, ShoppingCart, Search, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Tu Guía de Casa Inteligente y Domótica`,
  description: 'Comparativas, tutoriales y guías para crear tu casa inteligente. Cámaras, focos, asistentes de voz, cerraduras y más.',
  alternates: { canonical: '/' },
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  ShoppingCart: <ShoppingCart className="h-6 w-6" />,
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const latest = allArticles.slice(0, 8);

  const categories = [
    { slug: 'seguridad', name: 'Seguridad', description: 'Cámaras, cerraduras, alarmas y sensores para proteger tu hogar.', icon: 'Shield', count: allArticles.filter(a => a.categoria === 'seguridad').length },
    { slug: 'iluminacion', name: 'Iluminación', description: 'Focos, interruptores y soluciones de iluminación inteligente.', icon: 'Lightbulb', count: allArticles.filter(a => a.categoria === 'iluminacion').length },
    { slug: 'asistentes-hubs', name: 'Asistentes y Hubs', description: 'Alexa, Google Home, HomeKit y protocolos de domótica.', icon: 'Cpu', count: allArticles.filter(a => a.categoria === 'asistentes-hubs').length },
    { slug: 'guias-de-compra', name: 'Guías de Compra', description: 'Qué comprar para empezar en domótica.', icon: 'ShoppingCart', count: allArticles.filter(a => a.categoria === 'guias-de-compra').length },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-brand-950 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-wide relative py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur mb-6">
              <Zap className="h-4 w-4 text-brand-400" />
              Guía actualizada 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance mb-4">
              Tu guía completa de <span className="text-brand-400">casa inteligente</span>
            </h1>
            <p className="text-lg text-dark-200 max-w-2xl mb-8 leading-relaxed">
              Comparativas reales, tutoriales paso a paso y consejos para crear tu smart home. Sin hype, sin contenido inventado.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guias-de-compra/casa-inteligente-principiantes"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
              >
                Empezar aquí
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/seguridad"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Search className="h-4 w-4" />
                Ver comparativas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-900">Explora por categoría</h2>
            <p className="mt-2 text-dark-500">Todo lo que necesitas saber sobre casa inteligente, organizado por temas.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(cat => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                description={cat.description}
                count={cat.count}
                icon={iconMap[cat.icon]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparativas destacadas */}
      {featured.length > 0 && (
        <section className="py-12 md:py-16 bg-dark-50">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-dark-900">Comparativas destacadas</h2>
                <p className="mt-2 text-dark-500">Análisis comparativos para ayudarte a decidir.</p>
              </div>
              <Link href="/seguridad" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                Ver todas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Últimos artículos */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-900">Últimos artículos</h2>
            <p className="mt-2 text-dark-500">Contenido nuevo y actualizado sobre smart home.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-brand-600 to-brand-700">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">No te pierdas nada</h2>
          <p className="text-brand-100 max-w-lg mx-auto mb-6">
            Recibe las mejores ofertas y novedades de casa inteligente directamente en tu email. Sin spam, solo contenido útil.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-brand-200">Próximamente. Déjanos tu email para ser el primero en saberlo.</p>
        </div>
      </section>
    </>
  );
}
