// Splits scripts/data.raw.json into translation input slices.
// Usage: node scripts/split-i18n.mjs [sliceCount]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const raw = JSON.parse(readFileSync(join(here, 'data.raw.json'), 'utf8'));

const sliceCount = Number(process.argv[2] || 6);
const outDir = join(here, 'i18n');
mkdirSync(outDir, { recursive: true });

const items = raw.enchantments;
const per = Math.ceil(items.length / sliceCount);

for (let i = 0; i < sliceCount; i++) {
  const slice = items.slice(i * per, (i + 1) * per).map((e) => ({
    id: e.id,
    zhName: e.zhName,
    enName: e.enName,
    category: e.category,
    slots: e.slots,
    zhEffect: e.zhEffect,
    conflicts: e.conflicts,
  }));
  if (!slice.length) continue;
  const file = join(outDir, `in-${i + 1}.json`);
  writeFileSync(file, JSON.stringify(slice, null, 2), 'utf8');
  console.log(`${file}  (${slice.length} items)`);
}
console.log(`total ${items.length} enchantments -> ${sliceCount} slices`);
