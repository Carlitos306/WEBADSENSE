import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Casa Inteligente.',
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-content">
        <h1 className="text-3xl font-bold text-dark-900 mb-6">Política de Privacidad</h1>
        <div className="prose prose-dark max-w-none text-dark-700 leading-relaxed space-y-4">
          <p><em>[PLACEHOLDER — Este contenido debe ser redactado por un profesional legal. No uses este texto sin adaptarlo a tu situación real.]</em></p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">1. Información que recopilamos</h2>
          <p>Cuando visitas Casa Inteligente, podemos recopilar información automáticamente, como tu dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia.</p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">2. Uso de la información</h2>
          <p>Utilizamos esta información para mejorar nuestro sitio, analizar el tráfico y personalizar tu experiencia.</p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">3. Cookies</h2>
          <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Consulta nuestra Política de Cookies para más información.</p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">4. Enlaces de afiliado</h2>
          <p>Este sitio contiene enlaces de afiliado. Al hacer clic en estos enlaces y realizar una compra, recibimos una comisión sin coste adicional para ti.</p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">5. Contacto</h2>
          <p>Si tienes preguntas sobre esta política, contáctanos en [tu@email.com].</p>
        </div>
      </div>
    </div>
  );
}
