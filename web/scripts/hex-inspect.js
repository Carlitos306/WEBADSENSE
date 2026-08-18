const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

function hexAround(bytes, needleBuf, label) {
  const idx = bytes.indexOf(needleBuf);
  if (idx < 0) { console.log(`  [${label}] needle not found`); return; }
  const start = Math.max(0, idx - 12);
  const end = Math.min(bytes.length, idx + needleBuf.length + 12);
  const slice = bytes.slice(start, end);
  const hex = Array.from(slice).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`  [${label}] @${idx}:\n    hex:  ${hex}\n    utf8: ${JSON.stringify(slice.toString('utf8'))}`);
}

const cases = [
  ['asistentes-hubs/05-como-configurar-home-assistant-alexa.md', Buffer.from('Cuesta', 'utf8')],
  ['guias-de-compra/03-dispositivos-imprescindibles-domotica.md', Buffer.from('Precio:', 'utf8')],
  ['iluminacion/02-focos-inteligentes-wifi-baratos.md', Buffer.from('desde ', 'utf8')],
  ['iluminacion/04-interruptores-inteligentes-wifi.md', Buffer.from('Precio:', 'utf8')],
  ['iluminacion/05-iluminacion-inteligente-jardin.md', Buffer.from('Precio:', 'utf8')],
  ['seguridad/05-sistema-seguridad-casero-diy.md', Buffer.from('desde ', 'utf8')],
  ['seguridad/06-alarmas-inteligentes-sin-cuota.md', Buffer.from('1000', 'utf8')],
  ['seguridad/07-sensores-movimiento-wifi-casa.md', Buffer.from('Precio:', 'utf8')],
  ['seguridad/09-mejores-camaras-seguridad-casa.md', Buffer.from('C210', 'utf8')],
  ['seguridad/10-como-instalar-ring-stick-up-cam.md', Buffer.from('Ring Protect', 'utf8')],
];

for (const [rel, needle] of cases) {
  const bytes = fs.readFileSync(path.join(CONTENT_DIR, rel));
  console.log(`==== ${rel}`);
  hexAround(bytes, needle, 'euro-area');
}