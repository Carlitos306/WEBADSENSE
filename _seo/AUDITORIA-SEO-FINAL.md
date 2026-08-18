# AUDITORÍA SEO FINAL — Casa Inteligente Web

**Fecha:** 2026-08-18
**Estado:** BUILD EXITOSO — 35 páginas SSG
**Artículos analizados:** 25

---

## PUNTUACIONES

| Categoría | Puntuación | Nota |
|---|---|---|
| **SEO Técnico** | 72/100 | Sólido, con gaps en OpenGraph de categorías |
| **Arquitectura** | 78/100 | Buena jerarquía, faltan pillar pages |
| **Contenido** | 65/100 | 25 artículos buenos, pero todos ~1000 palabras, sin imágenes |
| **Enlazado Interno** | 70/100 | Auto-enlazado funciona, pero hay self-link y duplicados en markdown |
| **Confianza (E-E-A-T)** | 40/100 | Sin autor real, sin página de autor, sin fuentes, sin imágenes |
| **Global** | 65/100 | Base sólida, pero necesita trabajo en confianza y contenido visual |

---

## 1. AUDITORÍA DE ARQUITECTURA

### Estructura actual
```
/ (home)
├── /seguridad/ (10 artículos)
├── /iluminacion/ (5 artículos)
├── /asistentes-hubs/ (5 artículos)
├── /guias-de-compra/ (5 artículos)
├── /privacidad
├── /cookies
├── /aviso-legal
└── /contacto
```

### Profundidad de clics
- Home → Categoría → Artículo: **2 clics** ✅
- Home → Artículo (destacados): **1 clic** ✅
- Legal → Artículo: **3 clics** (aceptable)

### Breadcrumbs
- Home: Inicio ✅
- Categoría: Inicio > Categoría ✅
- Artículo: Inicio > Categoría > Artículo ✅
- Schema BreadcrumbList implementado ✅

### Páginas huérfanas
- Ninguna. Todas las páginas están en el sitemap y accesibles desde la navegación.

### Categorías sin contenido suficiente
- **Clima y Energía** (0 artículos) — Redirigir a Home o no incluir en nav principal
- **Electrodomésticos** (0 artículos) — Mismo caso
- **Entretenimiento** (0 artículos) — Mismo caso
- **Tutoriales** (0 artículos) — Mismo caso

**Problema:** El Header muestra 8 categorías en dropdown, pero 4 están vacías. Esto genera experiencia negativa.

### Enlaces internos por artículo
- Todos los artículos tienen 3 enlaces internos manuales en el markdown
- El sistema automático `addInternalLinks()` enlaza keywords adicionales
- **Problema detectado:** Artículo 16 (Home Assistant) tiene un self-link en su markdown

---

## 2. AUDITORÍA DE CADA ARTÍCULO

### 🟢 LISTO (12 artículos)

| # | Artículo | Palabras | Por qué está listo |
|---|---|---|---|
| 1 | Cámaras sin suscripción | ~1250 | Buena estructura, comparativa clara, enlaces internos |
| 2 | Ring vs Eufy | ~1300 | Comparativa sólida, pros/contras, Coste Total de Propiedad |
| 5 | Sistema seguridad DIY | ~1600 | Guía completa, paso a paso, presupuestos por nivel |
| 6 | Alarmas sin cuota | ~1200 | Buena comparativa, tablas de costes |
| 9 | Mejores cámaras | ~1100 | Cobertura amplia por categorías |
| 11 | Philips Hue vs IKEA | ~950 | Comparativa directa, tabla resumen |
| 13 | Configurar Govee | ~1250 | Tutorial paso a paso claro |
| 16 | Home Assistant guía | ~1650 | Guía completa, la más larga del sitio |
| 17 | Alexa vs Google vs Siri | ~1150 | Comparativa equilibrada |
| 19 | Zigbee vs Z-Wave | ~1300 | Explicación técnica accesible |
| 21 | Principiantes | ~1150 | Guía completa de entrada |
| 22 | Casa barata 200€ | ~1050 | Presupuesto real, desglose claro |

### 🟡 MEJORABLE (11 artículos)

| # | Artículo | Palabras | Qué mejorar |
|---|---|---|---|
| 3 | Cerraduras inteligentes | ~1150 | Falta tabla comparativa detallada con precios reales |
| 4 | Videoportero barato | ~1050 | Menciona € en título pero $ en contenido (inconsistencia) |
| 7 | Sensores movimiento | ~950 | Poco contenido, solo 950 palabras |
| 8 | Conectar Eufy Alexa | ~850 | Muy corto (850 palabras), podría ser más detallado |
| 10 | Instalar Ring | ~1100 | Buen tutorial, pero sin imágenes de referencia |
| 12 | Focos WiFi baratos | ~950 | Competidor débil, necesita más profundidad |
| 14 | Interruptores WiFi | ~950 | Poco contenido, solo 5 H2s |
| 15 | Iluminación jardín | ~1150 | Aceptable, pero sin especificaciones IP detalladas |
| 18 | Matter protocol | ~1050 | Informativo, pero necesita actualización頻繁emente |
| 20 | HA + Alexa | ~950 | Tutorial válido, podría incluir más troubleshooting |
| 23 | 10 dispositivos | ~1000 | Listicle genérico, sin precios actualizados |

### 🔴 NECESITA CAMBIOS (2 artículos)

| # | Artículo | Palabras | Problema |
|---|---|---|---|
| 24 | Alquileres | ~850 | Muy corto, falta profundidad, sin presupuesto detallado |
| 25 | Merece la pena | ~750 | El más corto del sitio (750 palabras), contenido débil, opiniones sin fuentes |

### Detalles por artículo problemático

**Artículo 24 — Alquileres (850 palabras)**
- Falta tabla de dispositivos con precios reales
- Falta presupuesto total detallado
- Falta comparativa de marcas que se puedan retirar fácilmente
- **Mejora:** Ampliar a 1200+ palabras con tabla de productos y presupuesto

**Artículo 25 — Merece la pena (750 palabras)**
- El más corto de todo el sitio
- "Opinión honesta" sin respaldo de datos o fuentes
- Lista de pros/contras demasiado genérica
- **Mejora:** Añadir datos reales (ahorro energético, estadísticas de adopción) o convertir en artículo más corto con disclaimer claro

---

## 3. CANIBALIZACIÓN

### Conflictos detectados

**1. Cámaras (art.1 vs art.2 vs art.9)**
- Art.1: "cámaras sin suscripción" — filtra por característica
- Art.2: "Ring vs Eufy" — compara dos marcas
- Art.9: "mejores cámaras" — general por categorías
- **Veredicto:** No canibalizan. Intenciones distintas. ✅ Mantener

**2. Principiantes (art.21) vs 10 dispositivos (art.23)**
- Art.21: "casa inteligente principiantes" — guía conceptual completa
- Art.23: "dispositivos imprescendibles" — listicle de productos
- **Veredicto:** Solapamiento ~40%. Podrían competir por "empezar domótica"
- **Solución recomendada:** Diferenciar más. Art.21 = guía de conceptos, Art.23 = lista de productos con precios y enlaces de afiliado

**3. Casa barata (art.22) vs Alquileres (art.24)**
- Ambos cubren domótica con presupuesto limitado
- **Veredicto:** Diferentes suficiente. Art.22 = propiedad, Art.24 = alquiler
- **Mantener separados** ✅

### Cannibalizaciones futuras potenciales
- Si se crea "mejor termostato" + "termostato X vs Y vs Z", podrían canibalizar
- Prevenir diferenciando intención claramente

---

## 4. SEO TÉCNICO

### ✅ Lo que funciona bien
- Title dinámico por página con template `%s | Casa Inteligente`
- Meta description dinámica por artículo
- Canonical URL en todas las páginas
- Robots: allow all, sitemap reference
- Sitemap.xml dinámico (generado desde archivos reales)
- OpenGraph en artículos (title, description, url, type, publishedTime, modifiedTime)
- Twitter cards en artículos
- Schema.org Article en artículos
- Schema.org BreadcrumbList en artículos
- Schema.org CollectionPage + ItemList en categorías
- Breadcrumbs visuales + schema

### ⚠️ Problemas detectados y corregidos
1. **Keyword link cache** — El mapa de keywords se construía una vez y no filtraba el artículo actual. Corregido: ahora se filtra por `currentSlug` en cada llamada.
2. **Sitemap hardcodeado** — Las URLs de categorías estaban hardcodeadas. Corregido: ahora es completamente dinámico.

### ⚠️ Problemas que quedan

**A. Category pages sin OpenGraph/Twitter cards**
- Las páginas de categoría solo tienen `title` y `description`
- Falta `openGraph.title`, `openGraph.description`, `openGraph.url`
- Falta `twitter.card`, `twitter.title`, `twitter.description`
- **Impacto:** Bajo. Las categorías no son páginas de alto tráfico.

**B. Category pages sin Twitter cards**
- Mismo problema que A
- **Impacto:** Bajo

**C. Self-link en artículo 16 (Home Assistant)**
- El markdown original contiene un enlace a sí mismo
- **Impacto:** Medio. Google puede penalizar self-links excesivos
- **Solución:** Eliminar el enlace del markdown (requiere editar el artículo)

**D. Duplicate links en artículos 19 y 20**
- Artículo 19: dos enlaces al mismo artículo (Home Assistant)
- Artículo 20: dos enlaces al mismo artículo (Alexa vs Google)
- **Impacto:** Bajo. No es penalizable, pero es innecesario

**E. URL del sitio hardcodeada**
- `config.ts` tiene `url: 'https://casa-inteligente.dev'`
- Esto es un dominio ficticio
- **Impacto:** Alto en producción. Debe cambiarse al dominio real antes del deploy

**F. Faltan imágenes en todos los artículos**
- `imagen: null` en los 25 artículos
- No hay componente `next/image` optimizando cargas
- **Impacto:** Alto. Google valora contenido visual. Rich results de artículos requieren imagen.

---

## 5. RENDIMIENTO

### ✅ Positivo
- Build estático (SSG) — carga instantánea
- First Load JS: ~96 kB (aceptable)
- Tailwind CSS purgado
- Lucide React con `optimizePackageImports`
- Google Fonts (Inter) con preconnect
- Sin dependencias innecesarias

### ⚠️ A mejorar
- **Imágenes:** No hay sistema de imágenes. Cuando se añadan, usar `next/image` con lazy loading
- **Fuentes:** Google Fonts se carga externamente. Podría self-hostearse para mejor performance
- **CLS:** Sin imágenes, no hay CLS. Pero cuando se añadan, hay que definir `width` y `height`

### Core Web Vitals estimados
- **LCP:** ~1.5s (estático, buena skeleton) ✅
- **FID:** ~0ms (sin JavaScript pesado) ✅
- **CLS:** 0 (sin imágenes dinámicas) ✅
- **INP:** ~50ms (componentes simples) ✅

---

## 6. CALIDAD Y CONFIANZA

### Problemas detectados

**A. Contenido potencialmente genérico**
- Artículo 25 ("Merece la pena"): opiniones presentadas como hechos sin fuentes
- Varios artículos usan frases como "las mejores opciones del mercado" sin respaldo
- **Necesita:** Fuentes, datos reales, o disclaimer de opinión

**B. Sin imágenes**
- Todos los artículos son texto plano
- No hay capturas de pantallas de apps
- No hay fotos de productos instalados
- **Impacto:** Alto. Reduce credibilidad y tiempo en página

**C. Sin precios verificables**
- Algunos artículos mencionan rangos de precio ($5-$15/mes)
- No hay enlaces a tiendas con precios actuales
- **Necesita:** Enlaces de afiliado con precios reales

**D. Sin experiencias personales**
- Los artículos no incluyen "lo probé durante X semanas"
- No hay capturas de configuración real
- **Nota:** Esto es coherente con la instrucción de no inventar datos

**E. Artículos demasiado cortos**
- 8 artículos tienen menos de 1000 palabras
- El promedio del sitio es ~1084 palabras
- **Problema:** Google tiende a preferir contenido más profundo (1500-2500 palabras) para comparativas

---

## 7. E-E-A-T / CONFIANZA

### Lo que falta

| Elemento | Estado | Impacto |
|---|---|---|
| Autor real con nombre | ❌ "Equipo SmartHome" genérico | Alto |
| Página de autor | ❌ No existe | Alto |
| Foto del autor | ❌ No existe | Medio |
| Fuentes citadas | ❌ Ninguna | Alto |
| Metodología de comparativa | ❌ No explicada | Medio |
| Disclaimer de afiliación | ✅ Presente en artículos | - |
| Página de contacto | ✅ Existe (placeholder) | - |
| Fecha de actualización visible | ✅ Implementada | - |
| Contenido original con datos verificables | ⚠️ Parcial | Alto |

### Propuestas concretas
1. Crear página `/autores/equipo-smarthome` con bio
2. Añadir sección "Metodología" al final de comparativas
3. Añadir fuentes en artículos que citan datos (consumo, precios, especificaciones)
4. Crear página `/sobre-nosotros` con información editorial

---

## 8. AFILIACIÓN

### Componentes creados
- `AffiliateProductCard` — Lista ✅
- `ComparisonTable` — Lista ✅
- `AffiliateButton` — Lista ✅

### Estado de enlaces
- **No hay enlaces de afiliado falsos** ✅
- **No hay placeholders que puedan indexarse** ✅
- Los componentes están preparados pero sin URLs reales
- El disclaimer de afiliación está presente en todos los artículos ✅

### Riesgo actual
- Ninguno. Los componentes solo se renderizan si se les pasa un `href` real

---

## 9. GOOGLE

### Preparación

| Requisito | Estado |
|---|---|
| Sitemap.xml | ✅ Dinámico, 35 URLs |
| Robots.txt | ✅ Allow all |
| Canonical URLs | ✅ En todas las páginas |
| OpenGraph | ✅ En artículos, ⚠️ incompleto en categorías |
| Twitter cards | ✅ En artículos, ❌ en categorías |
| Schema.org Article | ✅ En artículos |
| Schema.org BreadcrumbList | ✅ En artículos |
| Schema.org CollectionPage | ✅ En categorías |
| Mobile responsive | ✅ Tailwind responsive |
| HTTPS | ✅ (depende del deploy) |
| Core Web Vitals | ✅ Estáticamente óptimo |

### Google Discover
- ❌ No hay imágenes (requiere `og:image` con 1200x628px)
- ❌ No hay `author` link
- ⚠️ Contenido puede no ser apto sin imágenes

### Rich Results
- ✅ Article schema presente
- ✅ BreadcrumbList presente
- ❌ Falta `image` en Article schema
- ❌ Falta `author.url` en Article schema

---

## 10. CAMBIOS APLICADOS

| Cambio | Archivo | Justificación |
|---|---|---|
| Fixed keyword link cache filtering | `articles.ts` | El self-link del artículo 16 se generaba automáticamente |
| Dynamic sitemap | `sitemap.ts` | URLs de categorías estaban hardcodeadas |

**NO se cambiaron:**
- URLs existentes
- Estructura de carpetas
- Contenido de artículos
- Número de artículos

---

## 11. ESTADO FINAL DEL BUILD

```
✓ Build exitoso: 35 páginas SSG
✓ 0 errores TypeScript
✓ 0 warnings
✓ First Load JS: ~96 kB
✓ LCP estimado: ~1.5s
✓ CLS: 0
```

---

## 12. LISTA DE ARTÍCULOS Y ESTADO

| # | Artículo | Estado | Acción |
|---|---|---|---|
| 1 | Cámaras sin suscripción | 🟢 LISTO | Ninguna |
| 2 | Ring vs Eufy | 🟢 LISTO | Ninguna |
| 3 | Cerraduras inteligentes | 🟡 MEJORABLE | Añadir tabla con precios reales |
| 4 | Videoportero barato | 🟡 MEJORABLE | Unificar moneda (€ o $) |
| 5 | Sistema seguridad DIY | 🟢 LISTO | Ninguna |
| 6 | Alarmas sin cuota | 🟢 LISTO | Ninguna |
| 7 | Sensores movimiento | 🟡 MEJORABLE | Ampliar a 1200+ palabras |
| 8 | Conectar Eufy Alexa | 🟡 MEJORABLE | Ampliar troubleshooting |
| 9 | Mejores cámaras | 🟢 LISTO | Ninguna |
| 10 | Instalar Ring | 🟢 LISTO | Ninguna |
| 11 | Philips Hue vs IKEA | 🟢 LISTO | Ninguna |
| 12 | Focos WiFi baratos | 🟡 MEJORABLE | Ampliar contenido |
| 13 | Configurar Govee | 🟢 LISTO | Ninguna |
| 14 | Interruptores WiFi | 🟡 MEJORABLE | Ampliar a 1200+ palabras |
| 15 | Iluminación jardín | 🟡 MEJORABLE | Añadir spec IP detalladas |
| 16 | Home Assistant guía | 🟢 LISTO | Eliminar self-link del markdown |
| 17 | Alexa vs Google vs Siri | 🟢 LISTO | Ninguna |
| 18 | Matter protocol | 🟡 MEJORABLE | Añader más dispositivos disponibles |
| 19 | Zigbee vs Z-Wave | 🟢 LISTO | Eliminar link duplicado del markdown |
| 20 | HA + Alexa | 🟡 MEJORABLE | Eliminar link duplicado del markdown |
| 21 | Principiantes | 🟢 LISTO | Ninguna |
| 22 | Casa barata 200€ | 🟢 LISTO | Ninguna |
| 23 | 10 dispositivos | 🟡 MEJORABLE | Añadir precios reales |
| 24 | Alquileres | 🔴 NECESITA CAMBIOS | Ampliar a 1200+ palabras, añadir presupuesto |
| 25 | Merece la pena | 🔴 NECESITA CAMBIOS | Añadir datos reales o convertir en opinión clara |

---

## 13. QUÉ HACER DESPUÉS DE ESTA AUDITORÍA

### Prioridad ALTA (antes del deploy)
1. **Cambiar URL real** en `config.ts` (actualmente es `casa-inteligente.dev`)
2. **Añadir imágenes** a los artículos (mínimo imagen principal por artículo)
3. **Ampliar art.24 y art.25** a 1200+ palabras
4. **Crear página de autor** y `/sobre-nosotros`
5. **Eliminar self-link** del artículo 16 (Home Assistant)

### Prioridad MEDIA (primer mes)
6. **Añadir enlaces de afiliado reales** a los artículos comparativos
7. **Ampliar artículos débiles** (7, 8, 12, 14, 18, 20, 23)
8. **Añadir OpenGraph a categorías**
9. **Integrar Google Analytics** con ID real
10. **Conectar Google Search Console**

### Prioridad BAJA (siguientes meses)
11. **Crear pillar page** para cada categoría
12. **Añadir herramientas** (comparador, calculadora)
13. **Newsletter funcional**
14. **Búsqueda interna**
15. **Contenido para categorías vacías** (clima, electrodomésticos, etc.)
