const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');
const WRITE = process.argv.includes('--write');

// cp1252 byte -> Unicode (solo rango 0x80-0x9F difiere de latin1)
const CP1252_BYTE = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160,
  0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
};
const UNI2CP = {};
for (const [b, u] of Object.entries(CP1252_BYTE)) UNI2CP[u] = parseInt(b);

function toCp1252Byte(cp) {
  if (cp <= 0xFF && !(cp >= 0x80 && cp <= 0x9F)) return cp;
  if (UNI2CP[cp] !== undefined) return UNI2CP[cp];
  // bytes cp1252 sin glifo (0x81, 0x8D, 0x8F, 0x90, 0x9D): identity para revertir U+0081 etc.
  return (cp >= 0x80 && cp <= 0x9F) ? cp : null;
}

const MOJI_LEADS = new Set([0x00C3 /* Ã */, 0x00C2 /* Â */, 0x00E2 /* â */]);

function isMojiLead(cp) {
  return MOJI_LEADS.has(cp);
}

function reverseCluster(chars) {
  const bytes = Buffer.alloc(chars.length);
  for (let i = 0; i < chars.length; i++) {
    const b = toCp1252Byte(chars[i].codePointAt(0));
    if (b === null) return null; // char no mapea a cp1252: no tocar
    bytes[i] = b;
  }
  const out = bytes.toString('utf8');
  // reversal valido: sin U+FFFD, sin controles (excepto tab/newline), y sin acentos mojibake que quedaran
  for (const ch of out) {
    const cp = ch.codePointAt(0);
    if (cp === 0xFFFD) return null;
    if (cp < 32 && cp !== 9 && cp !== 10 && cp !== 13) return null;
    if (isMojiLead(cp)) return null;
  }
  return out;
}

function fixContent(raw) {
  const out = [];
  let i = 0;
  const arr = Array.from(raw); // preserva puntos de codigo (incl. surrogate pairs)
  while (i < arr.length) {
    const cp = arr[i].codePointAt(0);
    if (!isMojiLead(cp)) {
      out.push(arr[i]);
      i++;
      continue;
    }
    // extender cluster: caracteres que mapean a byte cp1252 >= 0x80
    let j = i;
    while (j < arr.length) {
      let b = toCp1252Byte(arr[j].codePointAt(0));
      if (b === null || b < 0x80) break;
      j++;
    }
    const cluster = arr.slice(i, j);
    if (cluster.length < 2) {
      out.push(arr[i]);
      i++;
      continue;
    }
    const decoded = reverseCluster(cluster);
    if (decoded === null) {
      out.push(arr[i]); // no tocar si la inversion falla o es peligrosa
      i++;
      continue;
    }
    out.push(decoded);
    i += cluster.length;
  }
  return out.join('');
}

let changed = 0;
for (const cat of fs.readdirSync(CONTENT_DIR)) {
  const catDir = path.join(CONTENT_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).filter(f => f.endsWith('.md'))) {
    const fp = path.join(catDir, file);
    const bytes = fs.readFileSync(fp);
    const hasBom = bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
    let raw = bytes.toString('utf8');
    if (hasBom) raw = raw.slice(1);

    const hasMoji = /[ÃÂâ€¡¿©º±°¬]/.test(raw);
    if (!hasMoji) continue;

    const beforeLen = raw.length;
    const fixed = fixContent(raw);

    // validacion de resultado final
    const mojiLeft = /[ÃÂ]/.test(fixed);
    const ctrlLeft = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(fixed);
    const replLeft = fixed.includes('\uFFFD');

    const status = (mojiLeft || ctrlLeft || replLeft) ? 'WARN' : 'OK';

    console.log(`\n${status} ${cat}/${file}`);
    console.log(`  BOM: ${hasBom} | cambio: ${beforeLen} -> ${fixed.length}`);
    console.log(`  muestra: ${JSON.stringify(raw.slice(0, 90))}`);
    console.log(`       ->  ${JSON.stringify(fixed.slice(0, 90))}`);
    if (mojiLeft || ctrlLeft || replLeft) {
      console.log(`  !! quedan: moji=${mojiLeft} ctrl=${ctrlLeft} repl=${replLeft}`);
    }

    if (WRITE) {
      if (fixed !== raw || hasBom) {
        const out = Buffer.from(fixed, 'utf8');
        fs.writeFileSync(fp, out); // sin BOM, UTF-8 puro (consistente con archivos bien formados)
        changed++;
      }
    }
  }
}
console.log(`\n${WRITE ? `Escritos: ${changed}` : 'MODO SIMULACION (usa --write para aplicar)'}`);