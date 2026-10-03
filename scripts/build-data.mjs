// Builds the site dataset from scripts/*.raw.json + scripts/i18n/out-*.json
// Output: docs/.vitepress/data/dataset.json
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outDir = join(root, 'docs', '.vitepress', 'data');
mkdirSync(outDir, { recursive: true });

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const readJsonIfExists = (p) => (existsSync(p) ? readJson(p) : null);

const raw = readJson(join(here, 'data.raw.json'));
const effectsRaw = readJson(join(here, 'effects.raw.json'));
const changelogRaw = readJsonIfExists(join(here, 'changelog.raw.json'));

// ---- merge translations -----------------------------------------------------
const translations = new Map();
const problems = [];
for (let i = 1; i <= 12; i++) {
  const p = join(here, 'i18n', `out-${i}.json`);
  if (!existsSync(p)) continue;
  for (const row of readJson(p)) {
    if (!row || !row.id) {
      problems.push(`out-${i}.json: row without id`);
      continue;
    }
    translations.set(String(row.id), row.enEffect || '');
  }
}

const enchantments = raw.enchantments.map((e) => {
  const enEffect = translations.get(e.id);
  if (!enEffect) problems.push(`missing English effect for ${e.id} (${e.zhName})`);
  return { ...e, enEffect: enEffect || '' };
});

const ids = new Set(enchantments.map((e) => e.id));
if (ids.size !== enchantments.length) problems.push('duplicate enchantment ids');

// Enchantments that belong to vanilla Minecraft rather than this mod.
const VANILLA = new Set([
  'mending',
  'power',
  'punch',
  'sharpness',
  'smite',
  'bane of arthropods',
  'unbreaking',
  'fortune',
  'silk touch',
]);

// Resolve every conflict reference to either another enchantment in this mod,
// a vanilla enchantment, or an unknown/external entry.
const byZh = new Map(enchantments.map((e) => [e.zhName, e]));
const byEn = new Map(enchantments.map((e) => [e.enName.toLowerCase(), e]));
const unresolved = [];

for (const e of enchantments) {
  e.conflictLinks = e.conflicts.map((c) => {
    const hit = byZh.get(c.zh) || byEn.get(String(c.en).toLowerCase());
    const isVanilla = VANILLA.has(String(c.en).toLowerCase());
    if (!hit && !isVanilla) unresolved.push(`${e.slug} -> ${c.zh} (${c.en})`);
    return {
      zh: c.zh,
      en: c.en,
      slug: hit ? hit.slug : null,
      kind: hit ? 'mod' : isVanilla ? 'vanilla' : 'unknown',
    };
  });
}

// ---- assemble dataset -------------------------------------------------------
const dataset = {
  meta: raw.meta,
  slotNames: raw.slotNames,
  categories: raw.categories,
  enchantments,
  effects: effectsRaw.effects,
  markerEffects: effectsRaw.markerEffects,
  changelog: changelogRaw?.releases ?? [],
  gameSetting: changelogRaw?.gameSetting ?? null,
  stats: {
    enchantmentCount: enchantments.length,
    categoryCount: raw.categories.length,
    effectCount: effectsRaw.effects.length,
    maxLevelOverall: Math.max(...enchantments.map((e) => e.maxLevel)),
    treasureCount: enchantments.filter((e) => e.treasure).length,
    curseCount: enchantments.filter((e) => e.curse).length,
  },
  build: {
    generatedAt: new Date().toISOString().slice(0, 10),
    source: raw.meta.mcmodItemList,
  },
};

writeFileSync(join(outDir, 'dataset.json'), JSON.stringify(dataset, null, 2), 'utf8');

console.log(`dataset.json written`);
console.log(`  enchantments : ${enchantments.length}`);
console.log(`  categories   : ${raw.categories.length}`);
console.log(`  effects      : ${effectsRaw.effects.length}`);
console.log(`  releases     : ${dataset.changelog.length}`);
console.log(
  `  en effects   : ${enchantments.filter((e) => e.enEffect).length}/${enchantments.length}`,
);
if (problems.length) {
  console.log('\nPROBLEMS:');
  for (const p of problems) console.log('  - ' + p);
}
if (unresolved.length) {
  console.log('\nNOTE: conflicts referencing entries outside this mod:');
  for (const p of unresolved) console.log('  - ' + p);
}
process.exitCode = problems.length ? 1 : 0;
