const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

function fixDoubleEncoding(s) {
  return Buffer.from(s, 'latin1').toString('utf8');
}

const files = [
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

for (const rel of files) {
  const fp = path.join(CONTENT_DIR, rel);
  const bytes = fs.readFileSync(fp);
  const hasBom = bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
  const raw = bytes.toString('utf8');
  const body = hasBom ? raw.slice(1) : raw;
  const fixed = fixDoubleEncoding(body);

  // control chars in fixed output
  const ctrlChars = [];
  for (let i = 0; i < fixed.length; i++) {
    const c = fixed.charCodeAt(i);
    if (c < 32 && c !== 9 && c !== 10 && c !== 13) {
      ctrlChars.push({ cp: c, hex: 'U+' + c.toString(16).toUpperCase(), char: JSON.stringify(fixed[i]), idx: i, ctx: JSON.stringify(fixed.slice(Math.max(0, i - 20), i + 20)) });
    }
  }

  console.log(`==== ${rel}`);
  console.log(`  BOM: ${hasBom}  |  ctrl chars in fixed: ${ctrlChars.length}`);
  for (const cc of ctrlChars.slice(0, 8)) {
    console.log(`    ${cc.hex} ${cc.char} @${cc.idx} ctx=${cc.ctx}`);
  }
}