import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Casa Inteligente.',
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-content">
        <h1 className="text-3xl font-bold text-dark-900 mb-6">Contacto</h1>
        <div className="prose prose-dark max-w-none text-dark-700 leading-relaxed space-y-4">
          <p>¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? Escríbenos a:</p>
          <p><strong>Email:</strong> [tu@email.com]</p>
          <p><em>[PLACEHOLDER — Añade un formulario de contacto si lo deseas.]</em></p>
        </div>
      </div>
    </div>
  );
}
