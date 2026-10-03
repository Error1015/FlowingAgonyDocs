<script setup lang="ts">
import { computed } from 'vue'
import {
  type Lang,
  categoryById,
  conflictLabel,
  enchantments,
  labels,
  localePath,
  localizedCategory,
  localizedSlot,
  rarityOf,
  romanOf,
} from '../data'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const t = computed(() => labels(props.lang))

const rows = computed(() =>
  enchantments.map((e) => ({
    slug: e.slug,
    name: props.lang === 'zh' ? e.zhName : e.enName,
    alt: props.lang === 'zh' ? e.enName : e.zhName,
    cat: categoryById.get(e.category),
    catName: categoryById.get(e.category)
      ? localizedCategory(categoryById.get(e.category)!, props.lang)
      : e.category,
    accent: categoryById.get(e.category)?.accent ?? 'var(--fa-accent)',
    slots: e.slots.map((s) => localizedSlot(s, props.lang)).join(' · '),
    maxLevel: e.maxLevel,
    rarity: rarityOf(e),
    conflicts: e.conflictLinks.map((c) => conflictLabel(c, props.lang)).join(' · '),
  })),
)
</script>

<template>
  <div class="fa-table-wrap">
    <table class="fa-table">
      <thead>
        <tr>
          <th class="fa-table__name">{{ lang === 'zh' ? '名称' : 'Name' }}</th>
          <th>{{ t.category }}</th>
          <th>{{ t.slots }}</th>
          <th class="fa-table__center">{{ t.maxLevel }}</th>
          <th>{{ t.rarity }}</th>
          <th>{{ t.conflicts }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.slug" :style="{ '--fa-cat-accent': r.accent }">
          <td class="fa-table__name">
            <a :href="`${localePath('/enchantments/', lang)}#${r.slug}`" class="fa-table__link">
              <span class="fa-table__dot" />
              {{ r.name }}
            </a>
            <span class="fa-table__alt">{{ r.alt }}</span>
          </td>
          <td class="fa-table__cat">{{ r.catName }}</td>
          <td class="fa-table__slots">{{ r.slots }}</td>
          <td class="fa-table__center">
            <span class="fa-table__lvl">{{ romanOf(r.maxLevel) }}</span>
          </td>
          <td>
            <span class="fa-badge" :class="`fa-badge--${r.rarity.cls}`">
              {{ lang === 'zh' ? r.rarity.zh : r.rarity.en }}
            </span>
          </td>
          <td class="fa-table__conflicts">{{ r.conflicts || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fa-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--fa-border);
  border-radius: var(--fa-radius);
  background: var(--fa-surface);
}

.fa-table {
  width: 100%;
  min-width: 780px;
  border-collapse: collapse;
  font-size: 13.5px;
}

.fa-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 11px 14px;
  background: var(--fa-surface-3);
  border-bottom: 1px solid var(--fa-border);
  font-family: var(--fa-font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  color: var(--fa-text-muted);
  white-space: nowrap;
}

.fa-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--fa-border);
  vertical-align: middle;
  color: var(--fa-text);
}

.fa-table tbody tr:last-child td {
  border-bottom: none;
}

.fa-table tbody tr:hover td {
  background: var(--fa-surface-2);
}

.fa-table__name {
  min-width: 190px;
}

.fa-table__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--fa-text-strong);
  font-weight: 600;
  text-decoration: none;
}

.fa-table__link:hover {
  color: var(--vp-c-brand-1);
}

.fa-table__dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 2px;
  background: var(--fa-cat-accent);
  transform: rotate(45deg);
}

.fa-table__alt {
  display: block;
  margin-left: 14px;
  font-size: 11.5px;
  color: var(--fa-text-muted);
}

.fa-table__cat {
  white-space: nowrap;
}

.fa-table__slots,
.fa-table__conflicts {
  font-size: 12.5px;
  color: var(--fa-text-muted);
}

.fa-table__center {
  text-align: center;
}

.fa-table__lvl {
  font-family: var(--fa-font-mono);
  font-weight: 600;
  color: var(--fa-text-strong);
}
</style>
