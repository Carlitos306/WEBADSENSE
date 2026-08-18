export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string | null;
  specialization: string[];
  url?: string;
}

export const authors: Record<string, Author> = {
  'equipo-smarthome': {
    id: 'equipo-smarthome',
    name: 'Equipo SmartHome',
    bio: '[PLACEHOLDER — Añade una biografía real del autor o equipo editorial aquí.]',
    avatar: null,
    specialization: ['casa inteligente', 'domótica', 'tecnología'],
  },
};

export function getAuthor(id: string): Author | null {
  return authors[id] || null;
}

export function getAuthorBySlug(slug: string): Author | null {
  const id = slug.replace('/autores/', '');
  return authors[id] || null;
}
