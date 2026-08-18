export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description?: string;
  keyword: string;
  keywords?: string[];
  volumen?: number;
  kd?: number;
  intencion: 'comparativa' | 'guia' | 'tutorial' | 'informativa';
  categoria: string;
  subcategoria?: string;
  fecha: string;
  fechaActualizacion?: string;
  autor?: string;
  imagen?: string;
  imagenAlt?: string;
  schema?: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: string;
  relatedArticles: ArticleSummary[];
}

export interface ArticleSummary {
  title: string;
  slug: string;
  description?: string;
  categoria: string;
  intencion: string;
  keyword: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  articles: ArticleSummary[];
}

export interface Product {
  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  precio?: number;
  moneda?: string;
  imagen?: string;
  urlProducto?: string;
  urlAfiliado?: string;
  conectividad?: {
    wifi?: boolean;
    bluetooth?: boolean;
    zigbee?: boolean;
    zwave?: boolean;
    thread?: boolean;
    matter?: boolean;
  };
  compatibilidad?: {
    alexa?: boolean;
    googleHome?: boolean;
    appleHomekit?: boolean;
    homeAssistant?: boolean;
  };
  pros?: string[];
  contras?: string[];
  idealPara?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: string;
}
