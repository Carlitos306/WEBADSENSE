import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16 md:py-24 text-center">
      <div className="container-content">
        <h1 className="text-6xl font-bold text-dark-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-dark-700 mb-4">Página no encontrada</h2>
        <p className="text-dark-500 mb-8">La página que buscas no existe o ha sido movida.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
