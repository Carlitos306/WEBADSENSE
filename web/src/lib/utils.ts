export function categoryLabel(slug: string): string {
  const labels: Record<string, string> = {
    'seguridad': 'Seguridad',
    'iluminacion': 'Iluminación',
    'asistentes-hubs': 'Asistentes y Hubs',
    'guias-de-compra': 'Guías de Compra',
    'clima-energia': 'Clima y Energía',
    'electrodomesticos': 'Electrodomésticos',
    'entretenimiento': 'Entretenimiento',
    'tutoriales': 'Tutoriales',
  };
  return labels[slug] || slug;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
