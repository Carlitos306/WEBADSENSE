import Link from 'next/link';
import { categories } from '@/lib/config';

export function Footer() {
  const activeCategories = categories.filter(c => !c.disabled);

  return (
    <footer className="border-t border-dark-100 bg-dark-50">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-dark-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white text-xs">SI</span>
              Casa Inteligente
            </Link>
            <p className="mt-3 text-sm text-dark-500 leading-relaxed">
              Tu guía completa de smart home: comparativas, tutoriales y consejos para crear tu casa inteligente.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 text-sm mb-3">Categorías</h3>
            <ul className="space-y-2">
              {activeCategories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="text-sm text-dark-500 hover:text-brand-600 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 text-sm mb-3">Recursos</h3>
            <ul className="space-y-2">
              <li><Link href="/guias-de-compra" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Guías de Compra</Link></li>
              <li><Link href="/asistentes-hubs" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Asistentes de Voz</Link></li>
              <li><Link href="/seguridad" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Seguridad del Hogar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacidad" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Política de Cookies</Link></li>
              <li><Link href="/aviso-legal" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Aviso Legal</Link></li>
              <li><Link href="/contacto" className="text-sm text-dark-500 hover:text-brand-600 transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-dark-200 pt-6 text-center text-xs text-dark-400">
          <p>© {new Date().getFullYear()} Casa Inteligente. Todos los derechos reservados.</p>
          <p className="mt-1">Este sitio contiene enlaces de afiliado. Al comprar a través de estos enlaces, nos ayudas sin coste adicional para ti.</p>
        </div>
      </div>
    </footer>
  );
}
