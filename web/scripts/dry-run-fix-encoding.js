const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), '..', '_content');
const UTF8 = 'utf8';
const LATIN1 = 'latin1';

function fixDoubleEncoding(s) {
  return Buffer.from(s, LATIN1).toString(UTF8);
}

const MOJI_PATTERNS = [/[ÃÂ]/g, /â€/g, /â‚¬/g, /Â[§°ªº]/, /ç|¢|£|¤|¥/g];

function looksMojibake(s) {
  return MOJI_PATTERNS.some(re => { re.lastIndex = 0; return re.test(s); });
}

function hasBom(bytes) {
  return bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
}

const results = [];
for (const cat of fs.readdirSync(CONTENT_DIR)) {
  const catDir = path.join(CONTENT_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).filter(f => f.endsWith('.md'))) {
    const fp = path.join(catDir, file);
    const bytes = fs.readFileSync(fp);
    if (!looksMojibake(bytes.toString(UTF8))) continue;

    const original = bytes.toString(UTF8);
    const fixed = fixDoubleEncoding(original);

    const stillMojibake = looksMojibake(fixed);
    const ctrlChars = (fixed.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g) || []).length;

    results.push({
      file: `${cat}/${file}`,
      bom: hasBom(bytes),
      ok: !stillMojibake,
      ctrlChars,
      sampleBefore: original.slice(0, 160).replace(/\n/g, '\\n'),
      sampleAfter: fixed.slice(0, 160).replace(/\n/g, '\\n'),
    });
  }
}

let bad = 0;
for (const r of results) {
  console.log(`${r.ok ? 'OK ' : '!! '} ${r.file} (bom=${r.bom}, ctrl=${r.ctrlChars})`);
  if (!r.ok || r.ctrlChars > 0) {
    bad++;
    console.log('   ANTES :', r.sampleBefore);
    console.log('   DESPUES:', r.sampleAfter);
  }
}
console.log(`\nTotal con mojibake: ${results.length}, fallos de correccion: ${bad}`);