<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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

/** Boolean flags on an enchantment that are worth filtering by. */
type TraitKey = 'treasure' | 'curse' | 'noTrade' | 'legacyRemoved'
const TRAITS: TraitKey[] = ['treasure', 'curse', 'noTrade', 'legacyRemoved']

const query = ref('')
const activeCat = ref<string>('all')
const activeRarity = ref<RarityClass | 'all'>('all')
const activeTrait = ref<TraitKey | 'all'>('all')
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

const traitCounts = computed(() => {
  const m = {} as Record<TraitKey, number>
  for (const k of TRAITS) m[k] = enchantments.filter((e) => e[k]).length
  return m
})

function traitLabel(key: TraitKey): string {
  const l = t.value
  switch (key) {
    case 'treasure':
      return l.traitTreasure
    case 'curse':
      return l.traitCurse
    case 'noTrade':
      return l.traitNoTrade
    default:
      return l.traitRemoved
  }
}

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
  const cat = activeCat.value
  const rarity = activeRarity.value
  const trait = activeTrait.value
  const level = activeLevel.value
  return enchantments.filter((e) => {
    if (cat !== 'all' && e.category !== cat) return false
    if (rarity !== 'all' && rarityOf(e).cls !== rarity) return false
    if (trait !== 'all' && !e[trait]) return false
    if (level > 1 && e.maxLevel < level) return false
    if (q && !haystack(e).includes(q)) return false
    return true
  })
})

/** Group by category when browsing, flatten once a narrowing filter is active. */
const grouped = computed(() => {
  if (query.value.trim() || activeCat.value !== 'all' || activeTrait.value !== 'all') {
    return [{ id: activeCat.value, items: filtered.value, flat: true }]
  }
  return categories
    .map((c) => ({ id: c.id, items: filtered.value.filter((e) => e.category === c.id), flat: false }))
    .filter((g) => g.items.length > 0)
})

const isFiltered = computed(
  () =>
    !!query.value.trim() ||
    activeCat.value !== 'all' ||
    activeRarity.value !== 'all' ||
    activeTrait.value !== 'all' ||
    activeLevel.value > 1,
)

/** How many filter dimensions are narrowing the list right now. */
const activeCount = computed(() => {
  let n = 0
  if (query.value.trim()) n++
  if (activeCat.value !== 'all') n++
  if (activeRarity.value !== 'all') n++
  if (activeTrait.value !== 'all') n++
  if (activeLevel.value > 1) n++
  return n
})

const activeSummary = computed(() => {
  const parts: string[] = []
  if (query.value.trim()) parts.push(`“${query.value.trim()}”`)
  if (activeCat.value !== 'all') parts.push(catName(activeCat.value))
  if (activeRarity.value !== 'all') {
    const r = rarityLabels[activeRarity.value]
    parts.push(props.lang === 'zh' ? r.zh : r.en)
  }
  if (activeTrait.value !== 'all') parts.push(traitLabel(activeTrait.value))
  if (activeLevel.value > 1) parts.push(`${t.value.level} ${romanOf(activeLevel.value)}`)
  return parts.join(' · ')
})

/* ------------------------------------------------------------------
 * Collapsing toolbar
 * ------------------------------------------------------------------
 * `autoCollapsed` follows the scroll position; `override` records an
 * explicit click. An explicit choice wins over the scroll state until the
 * page returns to the top, which resets everything back to expanded.
 *
 * Folding and unfolding use thresholds `2 × DEAD_ZONE` apart. A single
 * threshold is not safe here: the fold removes ~260px of page height, and
 * any scroll adjustment made in response would land on the other side of
 * the same threshold and flip the state back — an infinite flicker.
 */
const DEAD_ZONE = 8

const toolbar = ref<HTMLElement>()
const sentinel = ref<HTMLElement>()
const panel = ref<HTMLElement>()
const panelHeight = ref(520)

const autoCollapsed = ref(false)
const override = ref<'open' | 'closed' | null>(null)

const expanded = computed(() =>
  override.value === 'open' ? true : override.value === 'closed' ? false : !autoCollapsed.value,
)

function toggle() {
  if (expanded.value) {
    autoCollapsed.value = true
    override.value = null
  } else {
    override.value = 'open'
  }
}

/**
 * The toolbar's own sticky offset, in pixels.
 *
 * Reading `--vp-nav-height` directly does not work: it is declared as `4rem`,
 * and `parseFloat('4rem')` is 4, not 64. The computed `top` of the toolbar is
 * already resolved to pixels by the browser, and it is by definition the exact
 * line the toolbar sticks at, so use that instead.
 */
function stickyOffset(): number {
  const el = toolbar.value
  if (!el) return 64
  const value = Number.parseFloat(getComputedStyle(el).top)
  return Number.isFinite(value) ? value : 64
}

let queued = false
function onScroll() {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    const marker = sentinel.value
    const el = toolbar.value
    if (!marker || !el) return

    // On narrow screens the CSS un-sticks the toolbar, so folding it away
    // would only shift the list for no benefit. Let CSS decide.
    if (getComputedStyle(el).position !== 'sticky') {
      autoCollapsed.value = false
      override.value = null
      return
    }

    // `top` is the anchor's distance below the viewport top. It keeps
    // decreasing as the page scrolls and is not affected by the toolbar's own
    // height, so it is a stable reference — see the dead band below.
    const nav = stickyOffset()
    const top = marker.getBoundingClientRect().top

    if (top <= nav - DEAD_ZONE) {
      if (autoCollapsed.value) return

      // Folding removes roughly `panelHeight` of page height. If there is less
      // than that left below the viewport, the browser clamps the scroll
      // position — and because the height transition runs over ~340ms, that
      // clamping keeps firing scroll events, each of which can flip the state
      // back. That produced a permanent flicker on filtered-down pages.
      // A page that barely scrolls has nothing to gain from folding anyway.
      const room =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY
      if (room < panelHeight.value + 8) return

      // never fold the panel away while someone is using it
      const active = document.activeElement
      if (active && active !== document.body && el.contains(active)) return
      autoCollapsed.value = true
      return
    }

    if (top >= nav + DEAD_ZONE && autoCollapsed.value) {
      autoCollapsed.value = false
      override.value = null
    }
  })
}

let observer: ResizeObserver | undefined
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  if (panel.value && typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => {
      if (panel.value) panelHeight.value = panel.value.scrollHeight
    })
    observer.observe(panel.value)
    panelHeight.value = panel.value.scrollHeight
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})

function reset() {
  query.value = ''
  activeCat.value = 'all'
  activeRarity.value = 'all'
  activeTrait.value = 'all'
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
    <div ref="sentinel" class="fa-explorer__sentinel" aria-hidden="true" />

    <div
      ref="toolbar"
      class="fa-explorer__toolbar"
      :class="{ 'is-collapsed': !expanded }"
      :style="{ '--fa-panel-h': `${panelHeight}px` }"
    >
      <!-- compact bar: takes over once the toolbar folds away -->
      <div class="fa-explorer__compact" :inert="expanded">
        <button
          type="button"
          class="fa-filterbtn"
          :aria-expanded="expanded"
          :title="expanded ? t.hideFilters : t.showFilters"
          @click="toggle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M3 5h18l-7 8.2V19l-4 2v-7.8L3 5Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ t.filters }}</span>
          <span v-if="activeCount" class="fa-filterbtn__count">{{ activeCount }}</span>
          <svg
            class="fa-filterbtn__chev"
            :class="{ 'is-open': expanded }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <span v-if="activeSummary" class="fa-explorer__summary">{{ activeSummary }}</span>

        <button v-if="isFiltered" type="button" class="fa-linkbtn" @click="reset">
          {{ t.clear }}
        </button>
      </div>

      <div ref="panel" class="fa-explorer__panel" :inert="!expanded">
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
        <span class="fa-filter-label">{{ t.filterCategory }}</span>
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
        <span class="fa-filter-label">{{ t.filterRarity }}</span>
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
      </div>

      <div class="fa-explorer__row">
        <span class="fa-filter-label">{{ t.filterTraits }}</span>
        <div class="fa-chips">
          <button
            type="button"
            class="fa-chip"
            :class="{ 'is-on': activeTrait === 'all' }"
            @click="activeTrait = 'all'"
          >
            {{ t.all }}
          </button>
          <button
            v-for="key in TRAITS"
            :key="key"
            type="button"
            class="fa-chip fa-chip--trait"
            :class="[`is-${key}`, { 'is-on': activeTrait === key }]"
            @click="activeTrait = activeTrait === key ? 'all' : key"
          >
            <span class="fa-chip__dot" />
            {{ traitLabel(key) }}
            <span class="fa-chip__count">{{ traitCounts[key] }}</span>
          </button>
        </div>
        <button v-if="isFiltered" type="button" class="fa-linkbtn" @click="reset">
          {{ t.clear }}
        </button>
      </div>
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
