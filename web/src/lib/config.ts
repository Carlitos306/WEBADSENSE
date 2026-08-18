import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Casa Inteligente',
  description: 'Tu guía completa de smart home: comparativas, tutoriales, reseñas y consejos para crear tu casa inteligente.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://casa-inteligente.dev',
  locale: 'es_ES',
};

export const categories = [
  { slug: 'seguridad', name: 'Seguridad', icon: 'Shield' },
  { slug: 'iluminacion', name: 'Iluminación', icon: 'Lightbulb' },
  { slug: 'asistentes-hubs', name: 'Asistentes y Hubs', icon: 'Cpu' },
  { slug: 'guias-de-compra', name: 'Guías de Compra', icon: 'ShoppingCart' },
  { slug: 'persianas', name: 'Persianas', icon: 'Blinds' },
  { slug: 'clima-energia', name: 'Clima y Energía', icon: 'Thermometer', disabled: true },
  { slug: 'electrodomesticos', name: 'Electrodomésticos', icon: 'WashingMachine', disabled: true },
  { slug: 'entretenimiento', name: 'Entretenimiento', icon: 'Music', disabled: true },
  { slug: 'tutoriales', name: 'Tutoriales', icon: 'BookOpen', disabled: true },
];
