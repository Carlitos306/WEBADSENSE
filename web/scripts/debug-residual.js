const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

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
  return null;
}

function loadFix(raw) {
  const CP1252_LEAD = new Set([0x00C3, 0x00C2, 0x00E2]);
  const isLead = cp => CP1252_LEAD.has(cp);
  function reverseCluster(chars) {
    const bytes = Buffer.alloc(chars.length);
    for (let i = 0; i < chars.length; i++) {
      const b = toCp1252Byte(chars[i].codePointAt(0));
      if (b === null) return null;
      bytes[i] = b;
    }
    const out = bytes.toString('utf8');
    for (const ch of out) {
      const cp = ch.codePointAt(0);
      if (cp === 0xFFFD) return null;
      if (cp < 32 && cp !== 9 && cp !== 10 && cp !== 13) return null;
      if (isLead(cp)) return null;
    }
    return out;
  }
  const out = [];
  const arr = Array.from(raw);
  let i = 0;
  while (i < arr.length) {
    const cp = arr[i].codePointAt(0);
    if (!isLead(cp)) { out.push(arr[i]); i++; continue; }
    let j = i;
    while (j < arr.length) {
      let b = toCp1252Byte(arr[j].codePointAt(0));
      if (b === null || b < 0x80) break;
      j++;
    }
    const cluster = arr.slice(i, j);
    if (cluster.length < 2) { out.push(arr[i]); i++; continue; }
    const decoded = reverseCluster(cluster);
    if (decoded === null) { out.push(arr[i]); i++; continue; }
    out.push(decoded);
    i += cluster.length;
  }
  return out.join('');
}

const fp = path.join(CONTENT_DIR, 'seguridad/07-sensores-movimiento-wifi-casa.md');
const bytes = fs.readFileSync(fp);
let raw = bytes.toString('utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const fixed = loadFix(raw);

// buscar Ã o Â residuales en output fijo
for (let i = 0; i < fixed.length; i++) {
  const c = fixed[i];
  if (c === 'Ã' || c === 'Â') {
    console.log(`QUEDA '${c}' @${i} ctx=${JSON.stringify(fixed.slice(i - 30, i + 35))}`);
  }
}