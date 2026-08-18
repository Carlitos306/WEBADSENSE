import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Casa Inteligente.',
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-content">
        <h1 className="text-3xl font-bold text-dark-900 mb-6">Aviso Legal</h1>
        <div className="prose prose-dark max-w-none text-dark-700 leading-relaxed space-y-4">
          <p><em>[PLACEHOLDER — Este contenido debe ser redactado por un profesional legal.]</em></p>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">Información del titular</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Nombre:</strong> [Tu nombre]</li>
            <li><strong>CIF/NIF:</strong> [Tu identificación]</li>
            <li><strong>Dirección:</strong> [Tu dirección]</li>
            <li><strong>Email:</strong> [tu@email.com]</li>
          </ul>
          <h2 className="text-xl font-semibold text-dark-800 mt-8">Condiciones de uso</h2>
          <p>El acceso y uso de este sitio web implica la aceptación de las condiciones establecidas en este aviso legal.</p>
        </div>
      </div>
    </div>
  );
}
