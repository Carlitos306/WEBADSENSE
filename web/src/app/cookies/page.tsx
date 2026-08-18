import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Casa Inteligente.',
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-content">
        <h1 className="text-3xl font-bold text-dark-900 mb-6">Política de Cookies</h1>
        <div className="prose prose-dark max-w-none text-dark-700 leading-relaxed space-y-4">
          <p><em>[PLACEHOLDER — Este contenido debe ser redactado por un profesional legal.]</em></p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">Cookies que utilizamos</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio.</li>
            <li><strong>Google AdSense:</strong> Para mostrar publicidad relevante.</li>
          </ul>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">Gestión de cookies</h2>
          <p>Puedes configurar tu navegador para rechazar cookies. Sin embargo, esto puede afectar la funcionalidad del sitio.</p>
        </div>
      </div>
    </div>
  );
}
