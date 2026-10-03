<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  type Enchantment,
  type Lang,
  type RarityClass,
  RARITY_ORDER,
  categories,
  enchantments,
  labels,
  localizedCategory,
  localizedCategoryDesc,
  localizedSlot,
  rarityOf,
  romanOf,
} from '../data'
import EnchantCard from './EnchantCard.vue'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const t = computed(() => labels(props.lang))

const query = ref('')
const activeCat = ref<string>('all')
const activeRarity = ref<RarityClass | 'all'>('all')
const activeLevel = ref(1)

const rarityLabels: Record<RarityClass, { zh: string; en: string }> = {
  legendary: { zh: '非常稀有', en: 'Very Rare' },
  rare: { zh: '稀有', en: 'Rare' },
  uncommon: { zh: '不常见', en: 'Uncommon' },
  common: { zh: '常见', en: 'Common' },
}

const maxLevelOverall = Math.max(...enchantments.map((e) => e.maxLevel))

const countByCategory = computed(() => {
  const m = new Map<string, number>()
  for (const e of enchantments) m.set(e.category, (m.get(e.category) ?? 0) + 1)
  return m
})

function haystack(e: Enchantment): string {
  return [
    e.zhName,
    e.enName,
    e.zhEffect,
    e.enEffect,
    e.zhLore,
    e.enLore,
    ...e.slots.map((s) => localizedSlot(s, 'zh')),
    ...e.slots.map((s) => localizedSlot(s, 'en')),
    ...e.conflicts.flatMap((c) => [c.zh, c.en]),
  ]
    .join(' ')
    .toLowerCase()
}

const filtered = computed<Enchantment[]>(() => {
  const q = query.value.trim().toLowerCase()
  return enchantments.filter((e) => {
    if (activeCat.value !== 'all' && e.category !== activeCat.value) return false
    if (activeRarity.value !== 'all' && rarityOf(e).cls !== activeRarity.value) return false
    if (activeLevel.value > 1 && e.maxLevel < activeLevel.value) return false
    if (q && !haystack(e).includes(q)) return false
    return true
  })
})

/** Group by category when browsing, flatten once a search is active. */
const grouped = computed(() => {
  if (query.value.trim() || activeCat.value !== 'all') {
    return [{ id: activeCat.value, items: filtered.value, flat: true }]
  }
  return categories
    .map((c) => ({ id: c.id, items: filtered.value.filter((e) => e.category === c.id), flat: false }))
    .filter((g) => g.items.length > 0)
})

const isFiltered = computed(
  () => !!query.value.trim() || activeCat.value !== 'all' || activeRarity.value !== 'all' || activeLevel.value > 1,
)

function reset() {
  query.value = ''
  activeCat.value = 'all'
  activeRarity.value = 'all'
  activeLevel.value = 1
}

function catName(id: string) {
  const c = categories.find((x) => x.id === id)
  return c ? localizedCategory(c, props.lang) : id
}
function catNameAlt(id: string) {
  const c = categories.find((x) => x.id === id)
  return c ? (props.lang === 'zh' ? c.en : c.zh) : ''
}
function catDesc(id: string) {
  const c = categories.find((x) => x.id === id)
  return c ? localizedCategoryDesc(c, props.lang) : ''
}
function catAccent(id: string) {
  return categories.find((x) => x.id === id)?.accent ?? 'var(--fa-accent)'
}
function catGlyph(id: string) {
  return categories.find((x) => x.id === id)?.glyph ?? '·'
}
</script>


<template>
  <div class="fa-explorer">
    <div class="fa-explorer__toolbar">
      <div class="fa-explorer__row">
        <div class="fa-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
          <input
            v-model="query"
            class="fa-input"
            type="search"
            :aria-label="t.search"
            :placeholder="t.searchPlaceholder"
          />
          <button v-if="query" class="fa-field__clear" type="button" aria-label="clear" @click="query = ''">
            ×
          </button>
        </div>

        <div class="fa-en__metablock">
          <span class="fa-en__metalabel">{{ t.level }}</span>
          <span class="fa-levels">
            <button
              v-for="n in maxLevelOverall"
              :key="n"
              type="button"
              class="fa-pip"
              :class="{ 'is-on': activeLevel === n }"
              @click="activeLevel = activeLevel === n ? 1 : n"
            >
              {{ romanOf(n) }}
            </button>
          </span>
        </div>
      </div>

      <div class="fa-explorer__row">
        <div class="fa-chips">
          <button
            type="button"
            class="fa-chip"
            :class="{ 'is-on': activeCat === 'all' }"
            @click="activeCat = 'all'"
          >
            {{ t.all }}
            <span class="fa-chip__count">{{ enchantments.length }}</span>
          </button>
          <button
            v-for="c in categories"
            :key="c.id"
            type="button"
            class="fa-chip"
            :class="{ 'is-on': activeCat === c.id }"
            :style="{ '--fa-chip-accent': c.accent }"
            @click="activeCat = activeCat === c.id ? 'all' : c.id"
          >
            <span class="fa-chip__dot" />
            {{ localizedCategory(c, lang) }}
            <span class="fa-chip__count">{{ countByCategory.get(c.id) ?? 0 }}</span>
          </button>
        </div>
      </div>

      <div class="fa-explorer__row">
        <div class="fa-chips">
          <button
            type="button"
            class="fa-chip"
            :class="{ 'is-on': activeRarity === 'all' }"
            @click="activeRarity = 'all'"
          >
            {{ t.all }}
          </button>
          <button
            v-for="r in RARITY_ORDER"
            :key="r"
            type="button"
            class="fa-chip"
            :class="{ 'is-on': activeRarity === r }"
            :style="{ '--fa-chip-accent': `var(--fa-rarity-${r})` }"
            @click="activeRarity = activeRarity === r ? 'all' : r"
          >
            <span class="fa-chip__dot" />
            {{ lang === 'zh' ? rarityLabels[r].zh : rarityLabels[r].en }}
          </button>
        </div>
        <button v-if="isFiltered" type="button" class="fa-linkbtn" @click="reset">
          {{ t.clear }}
        </button>
      </div>
    </div>

    <div class="fa-explorer__meta">
      <span>{{ t.results }} · <strong>{{ filtered.length }}</strong> / {{ enchantments.length }}</span>
    </div>

    <div v-if="!filtered.length" class="fa-empty">{{ t.empty }}</div>

    <template v-else>
      <section
        v-for="group in grouped"
        :id="`cat-${group.id}`"
        :key="group.id"
        class="fa-group"
        :style="{ '--fa-cat-accent': catAccent(group.id) }"
      >
        <header v-if="!group.flat" class="fa-group__head">
          <span class="fa-group__mark">{{ catGlyph(group.id) }}</span>
          <div>
            <div class="fa-group__title">
              <span class="fa-group__zh">{{ catName(group.id) }}</span>
              <span class="fa-group__en">{{ catNameAlt(group.id) }}</span>
              <span class="fa-count">{{ group.items.length }}</span>
            </div>
            <p class="fa-group__desc">{{ catDesc(group.id) }}</p>
          </div>
        </header>

        <div class="fa-enchants">
          <EnchantCard
            v-for="e in group.items"
            :key="e.slug"
            :enchantment="e"
            :lang="lang"
            :global-level="activeLevel"
          />
        </div>
      </section>
    </template>
  </div>
</template>
