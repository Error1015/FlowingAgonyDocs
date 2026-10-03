<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  type Enchantment,
  type Lang,
  categoryById,
  conflictLabel,
  labels,
  localizedLore,
  localizedSlot,
  rarityOf,
  romanOf,
} from '../data'
import EffectText from './EffectText.vue'

const props = withDefaults(
  defineProps<{
    enchantment: Enchantment
    lang?: Lang
    globalLevel?: number
  }>(),
  { lang: 'zh', globalLevel: 1 },
)

const t = computed(() => labels(props.lang))
const cat = computed(() => categoryById.get(props.enchantment.category))
const accent = computed(() => cat.value?.accent ?? 'var(--fa-accent)')
const rarity = computed(() => rarityOf(props.enchantment))

const level = ref(Math.min(props.globalLevel, props.enchantment.maxLevel))

watch(
  () => props.globalLevel,
  (v) => {
    level.value = Math.min(v, props.enchantment.maxLevel)
  },
)

const primary = computed(() =>
  props.lang === 'zh' ? props.enchantment.zhName : props.enchantment.enName,
)
const secondary = computed(() =>
  props.lang === 'zh' ? props.enchantment.enName : props.enchantment.zhName,
)
</script>

<template>
  <article :id="enchantment.slug" class="fa-en" :style="{ '--fa-cat-accent': accent }">
    <header class="fa-en__head">
      <div class="fa-en__names">
        <h3 class="fa-en__zh">{{ primary }}</h3>
        <p class="fa-en__en">{{ secondary }}</p>
      </div>
      <div class="fa-en__tags">
        <span class="fa-badge" :class="`fa-badge--${rarity.cls}`">
          {{ lang === 'zh' ? rarity.zh : rarity.en }}
        </span>
        <span v-if="enchantment.treasure" class="fa-badge fa-badge--treasure">
          {{ t.treasure }}
        </span>
        <span v-if="enchantment.curse" class="fa-badge fa-badge--curse">{{ t.curse }}</span>
        <span v-if="enchantment.noTrade" class="fa-badge fa-badge--plain">
          {{ t.noTrade }}
        </span>
        <span v-if="enchantment.legacyRemoved" class="fa-badge fa-badge--plain">
          {{ t.legacyRemoved }}
        </span>
      </div>
    </header>

    <div class="fa-en__meta">
      <div class="fa-en__metablock">
        <span class="fa-en__metalabel">{{ t.slots }}</span>
        <span class="fa-chiplist">
          <span v-for="s in enchantment.slots" :key="s" class="fa-slot">
            {{ localizedSlot(s, lang) }}
          </span>
        </span>
      </div>
      <div class="fa-en__metablock">
        <span class="fa-en__metalabel">{{ t.maxLevel }}</span>
        <span class="fa-levels">
          <button
            v-for="n in enchantment.maxLevel"
            :key="n"
            type="button"
            class="fa-pip"
            :class="{ 'is-on': n === level }"
            :title="`${t.level} ${romanOf(n)}`"
            :aria-pressed="n === level"
            @click="level = n"
          >
            {{ romanOf(n) }}
          </button>
        </span>
      </div>
    </div>

    <p v-if="localizedLore(enchantment, lang)" class="fa-en__lore">
      {{ localizedLore(enchantment, lang) }}
    </p>

    <section class="fa-en__effect">
      <div class="fa-en__effecthead">
        <span class="fa-en__effecttitle">{{ t.effect }}</span>
        <span v-if="enchantment.maxLevel > 1" class="fa-en__metalabel">
          {{ t.level }} {{ romanOf(level) }} / {{ romanOf(enchantment.maxLevel) }}
        </span>
      </div>
      <EffectText
        :text="lang === 'zh' ? enchantment.zhEffect : enchantment.enEffect"
        :max-level="enchantment.maxLevel"
        :level="level"
      />
    </section>

    <footer class="fa-en__foot">
      <div v-if="enchantment.conflictLinks.length" class="fa-en__conflict">
        <span class="fa-en__metalabel">{{ t.conflicts }}</span>
        <template v-for="(c, i) in enchantment.conflictLinks" :key="c.zh">
          <span v-if="i > 0" class="fa-en__id">·</span>
          <a v-if="c.slug" class="fa-en__conflictlink" :href="`#${c.slug}`">
            {{ conflictLabel(c, lang) }}
          </a>
          <span v-else class="fa-en__conflictplain">
            {{ conflictLabel(c, lang) }}
            <template v-if="c.kind === 'vanilla'"> ({{ t.vanilla }})</template>
            <template v-else-if="c.kind === 'unknown'"> ({{ t.unknown }})</template>
          </span>
        </template>
      </div>
      <div class="fa-en__source">
        <a
          :href="`https://www.mcmod.cn/item/${enchantment.id}.html`"
          target="_blank"
          rel="noreferrer"
        >
          {{ t.source }} · mcmod.cn/item/{{ enchantment.id }}
        </a>
      </div>
    </footer>
  </article>
</template>
