const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

const MOJI_FILES = [
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

function revLatin1(s) { return Buffer.from(s, 'latin1').toString('utf8'); }

const HIGH = {
  0x80: 0x20AC,0x82:0x201A,0x83:0x192,0x84:0x201E,0x85:0x2026,0x86:0x2020,0x87:0x2021,
  0x88:0x2C6,0x89:0x2030,0x8A:0x160,0x8B:0x2039,0x8C:0x152,0x8E:0x17D,0x91:0x2018,
  0x92:0x2019,0x93:0x201C,0x94:0x201D,0x95:0x2022,0x96:0x2013,0x97:0x2014,0x98:0x2DC,
  0x99:0x2122,0x9A:0x161,0x9B:0x203A,0x9C:0x153,0x9E:0x17E,0x9F:0x178,
};
const UNI2CP = {};
for (const [b, u] of Object.entries(HIGH)) UNI2CP[u] = parseInt(b);
function toCp1252(s) {
  const buf = Buffer.alloc(s.length);
  for (let i = 0; i < s.length; i++) {
    const cp = s.charCodeAt(i);
    if (cp <= 0xFF && !(cp >= 0x80 && cp <= 0x9F)) buf[i] = cp;
    else if (UNI2CP[cp] !== undefined) buf[i] = UNI2CP[cp];
    else buf[i] = cp & 0xFF;
  }
  return buf;
}
function revCp1252(s) { return toCp1252(s).toString('utf8'); }

function analyze(label, out, raw) {
  const probs = [];
  for (let i = 0; i < out.length; i++) {
    const cp = out.charCodeAt(i);
    if (cp === 0xFFFD || (cp < 32 && cp !== 9 && cp !== 10 && cp !== 13)) {
      probs.push({ cp: 'U+' + cp.toString(16), ctx: out.slice(Math.max(0, i - 18), i + 18).replace(/[\r\n]/g, '↲') });
    }
  }
  console.log(`  ${label}: probs=${probs.length} acctual=${(out.match(/[áéíóúüñ¿¡€–—›“”‘’]/g) || []).length} moji=${/[ÃÂ]/.test(out)}`);
  for (const p of probs.slice(0, 4)) console.log(`      @${p.cp} ctx="${p.ctx}"`);
}

for (const rel of MOJI_FILES) {
  const fp = path.join(CONTENT_DIR, rel);
  let raw = fs.readFileSync(fp, 'utf8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  console.log(`\n==== ${rel}`);
  analyze('latin1', revLatin1(raw), raw);
  analyze('cp1252', revCp1252(raw), raw);
}