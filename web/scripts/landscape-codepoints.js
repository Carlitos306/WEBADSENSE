const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

const FILES = [
  'asistentes-hubs/05-como-configurar-home-assistant-alexa.md',
  'guias-de-compra/03-dispositivos-imprescindibles-domotica.md',
  'iluminacion/02-focos-inteligentes-wifi-baratos.md',
  'iluminacion/04-interruptores-inteligentes-wifi.md',
  'iluminacion/05-iluminacion-inteligente-jardin.md',
  'seguridad/05-sistema-seguridad-casero-diy.md',
  'seguridad/06-alarmas-inteligentes-sin-cuota.md',
  'seguridad/07-sensores-movimiento-wifi-casa.md',
  'seguridad/09-mejores-camaras-seguridad-casa.md',
  'seguridad/10-como-instalar-ring-stick-up-cam.md',
];

// mojibake lead/carry codepoints
const MOJI_CODES = new Set([0xC3, 0xC2, 0xE2, 0x80, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8E, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0x9B, 0x9C, 0x9E, 0x9F, 0xAC, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xAB, 0xAD, 0xAE, 0xAF, 0xB0, 0xB1, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xBB, 0xBC, 0xBD, 0xBE, 0xBF]);

const CLEAN_CP1252_HIGH = new Set([
  0x20AC, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6, 0x2030, 0x0160, 0x2039, 0x0152,
  0x017D, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A,
  0x0153, 0x017E, 0x0178,
]);

for (const rel of FILES) {
  const bytes = fs.readFileSync(path.join(CONTENT_DIR, rel));
  let raw = bytes.toString('utf8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

  const counts = new Map();
  for (const ch of raw) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x7F) counts.set(cp, (counts.get(cp) || 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  console.log(`\n==== ${rel}  (unique non-ASCII codepoints: ${sorted.length})`);
  const fmt = c => {
    const hex = 'U+' + c.toString(16).toUpperCase().padStart(4, '0');
    const char = String.fromCodePoint(c).replace(/[\x00-\x1F]/g, '.');
    return `${hex} '${char}'`;
  };
  for (const [cp, n] of sorted.slice(0, 40)) {
    const inMoji = MOJI_CODES.has(cp);
    const cleanHigh = CLEAN_CP1252_HIGH.has(cp) || /[áéíóúüñÁÉÍÓÚÜÑ¿¡€–—›“‘”’«»]/.test(String.fromCodePoint(cp));
    const tag = inMoji ? 'MOJI' : '';
    if (cleanHigh && !inMoji) continue;
    console.log(`    ${fmt(cp)} x${n} ${tag}`);
  }
  console.log(`    --- limpios (acentos correctos): ${sorted.filter(([cp]) => /[áéíóúüñÁÉÍÓÚÜÑ¿¡€–—›“‘”’«»]/.test(String.fromCodePoint(cp))).reduce((s, [, n]) => s + n, 0)}`);
}