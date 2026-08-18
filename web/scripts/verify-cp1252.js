const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');

const CP1252_HIGH = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160,
  0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
};
const UNICODE_TO_CP1252 = {};
for (const [byte, cp] of Object.entries(CP1252_HIGH)) {
  UNICODE_TO_CP1252[cp] = parseInt(byte);
}

function toCp1252Bytes(str) {
  const buf = Buffer.alloc(str.length);
  for (let i = 0; i < str.length; i++) {
    const cp = str.charCodeAt(i);
    if (cp <= 0xFF && !(cp >= 0x80 && cp <= 0x9F)) buf[i] = cp;
    else if (UNICODE_TO_CP1252[cp] !== undefined) buf[i] = UNICODE_TO_CP1252[cp];
    else {
      buf[i] = cp & 0xFF;
    }
  }
  return buf;
}

function fixDoubleEncoding(s) {
  return toCp1252Bytes(s).toString('utf8');
}

const files = fs.readdirSync(CONTENT_DIR)
  .filter(c => fs.statSync(path.join(CONTENT_DIR, c)).isDirectory())
  .flatMap(c => fs.readdirSync(path.join(CONTENT_DIR, c))
    .filter(f => f.endsWith('.md'))
    .map(f => `${c}/${f}`));

let total = 0;
for (const rel of files) {
  const fp = path.join(CONTENT_DIR, rel);
  const bytes = fs.readFileSync(fp);
  const hasBom = bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
  let raw = bytes.toString('utf8');
  if (hasBom) raw = raw.slice(1);
  const fixed = fixDoubleEncoding(raw);

  const ctrlChars = [];
  for (let i = 0; i < fixed.length; i++) {
    const c = fixed.charCodeAt(i);
    if (c < 32 && c !== 9 && c !== 10 && c !== 13) ctrlChars.push(c);
  }
  const replacement = (fixed.match(/\uFFFD/g) || []).length;
  const stillMojibake = /[ÃÂ]/.test(fixed);
  const lostNonAscii = !/á|é|í|ó|ú|ü|ñ|Á|É|Í|Ó|Ú|¿|¡|€|–|—|›|–|“|”|‘|’/.test(fixed)
    && /[ÃÂ]/.test(raw);

  if (ctrlChars.length > 0 || replacement > 0 || stillMojibake) {
    total++;
    console.log(`!! ${rel}  ctrl=${[...new Set(ctrlChars.map(c=>'U+'+c.toString(16).toUpperCase()))].join(',')} repl=${replacement} moji=${stillMojibake}`);
    console.log(`   ANTES : ${JSON.stringify(raw.slice(0,140))}`);
    console.log(`   DESPUES: ${JSON.stringify(fixed.slice(0,140))}`);
  }
}
console.log(`\nArchivos con problemas tras fix cp1252: ${total}`);