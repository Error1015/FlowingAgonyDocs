<script setup lang="ts">
import { computed } from 'vue'
import {
  type Lang,
  categories,
  enchantmentsOf,
  localePath,
  localizedCategory,
  localizedCategoryDesc,
  meta,
  stats,
} from '../data'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const lang = computed(() => props.lang)

const copy = {
  zh: {
    eyebrow: `Minecraft Java 版 · ${meta.loader} · ${meta.mcVersions.join(' / ')}`,
    title: meta.modZh,
    latin: meta.modEn,
    tagline:
      '围绕附魔系统展开的重制与移植之作。它扩展了原版附魔机制，用 59 个彼此咬合的附魔与状态效果，把装备成长、战斗节奏与冒险过程重新写了一遍。',
    ctaPrimary: '浏览全部附魔',
    ctaSecondary: '安装与上手',
    ctaTertiary: 'GitHub 仓库',
    stats: [
      { value: String(stats.enchantmentCount), unit: '', label: '附魔' },
      { value: String(stats.categoryCount), unit: '', label: '分类' },
      { value: String(stats.effectCount), unit: '', label: '状态效果' },
      { value: String(meta.mcVersions.length), unit: '', label: '支持版本' },
    ],
    catTitle: '附魔分类',
    catDesc:
      '十一个分类各自围绕一种情绪或处境建立。点击任意分类，可直接跳转到该类附魔的完整效果说明。',
    startTitle: '三步开始',
    startDesc: '安装本模组只需要一个前置，其余交给游戏本身。',
    steps: [
      {
        title: '安装前置',
        body: `先装好 Kotlin for Forge，这是本模组唯一的硬性前置。`,
      },
      {
        title: '放入模组',
        body: `把 Flowing Agony Reborn 的 jar 放进 mods 文件夹，客户端与服务端都需要安装。`,
      },
      {
        title: '在游戏内查看效果',
        body: '搭配「附魔描述」模组可在游戏内直接看到附魔说明，或随时查阅本站的完整数值表。',
      },
    ],
    linksTitle: '相关链接',
    linksDesc: '下载、源码与反馈渠道。',
    viewAll: '查看全部',
  },
  en: {
    eyebrow: `Minecraft Java Edition · ${meta.loader} · ${meta.mcVersions.join(' / ')}`,
    title: meta.modEn,
    latin: meta.modZh,
    tagline:
      'A remake and port built around the enchantment system. It extends vanilla enchanting with 59 interlocking enchantments and status effects that rewrite gear progression, combat rhythm and the way an adventure unfolds.',
    ctaPrimary: 'Browse all enchantments',
    ctaSecondary: 'Install & get started',
    ctaTertiary: 'GitHub repository',
    stats: [
      { value: String(stats.enchantmentCount), unit: '', label: 'Enchantments' },
      { value: String(stats.categoryCount), unit: '', label: 'Categories' },
      { value: String(stats.effectCount), unit: '', label: 'Status effects' },
      { value: String(meta.mcVersions.length), unit: '', label: 'MC versions' },
    ],
    catTitle: 'Enchantment categories',
    catDesc:
      'Eleven categories, each built around one mood or predicament. Pick any of them to jump straight to the full effect write-ups.',
    startTitle: 'Three steps to start',
    startDesc: 'One dependency is all it takes; the rest is handled by the game.',
    steps: [
      { title: 'Install the dependency', body: 'Kotlin for Forge first — it is the only hard requirement.' },
      {
        title: 'Drop in the mod',
        body: 'Put the Flowing Agony Reborn jar into your mods folder. Both client and server need it.',
      },
      {
        title: 'Read effects in game',
        body: 'Pair it with Enchantment Descriptions to see tooltips in game, or use the full value tables on this site.',
      },
    ],
    linksTitle: 'Links',
    linksDesc: 'Downloads, source code and feedback channels.',
    viewAll: 'View all',
  },
} as const

const c = computed(() => copy[lang.value])
</script>

<template>
  <div class="fa-home">
    <!-- ============================ hero ============================ -->
    <header class="fa-hero">
      <div class="fa-hero__aurora" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div class="fa-shell fa-hero__inner">
        <span class="fa-eyebrow">{{ c.eyebrow }}</span>
        <h1 class="fa-hero__title">{{ c.title }}</h1>
        <p class="fa-hero__latin">{{ c.latin }}</p>
        <p class="fa-hero__tagline">{{ c.tagline }}</p>

        <div class="fa-hero__actions">
          <a class="fa-btn fa-btn--primary" :href="localePath('/enchantments/', lang)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 5h16M4 12h16M4 19h10" stroke-linecap="round" />
            </svg>
            {{ c.ctaPrimary }}
          </a>
          <a class="fa-btn fa-btn--ghost" :href="localePath('/guide/', lang)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ c.ctaSecondary }}
          </a>
          <a class="fa-btn fa-btn--ghost" :href="meta.github" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
              />
            </svg>
            {{ c.ctaTertiary }}
          </a>
        </div>

        <div class="fa-stats">
          <div v-for="s in c.stats" :key="s.label" class="fa-stats__item">
            <div class="fa-stats__value">
              {{ s.value }}<small v-if="s.unit">{{ s.unit }}</small>
            </div>
            <div class="fa-stats__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- ========================== categories ======================== -->
    <section class="fa-section">
      <div class="fa-shell">
        <div class="fa-section__head">
          <div>
            <h2 class="fa-section__title">{{ c.catTitle }}</h2>
            <p class="fa-section__desc">{{ c.catDesc }}</p>
          </div>
        </div>

        <div class="fa-cats">
          <a
            v-for="cat in categories"
            :key="cat.id"
            class="fa-cat"
            :style="{ '--fa-cat-accent': cat.accent }"
            :href="`${localePath('/enchantments/', lang)}#cat-${cat.id}`"
          >
            <span class="fa-cat__count">{{ enchantmentsOf(cat.id).length }}</span>
            <span class="fa-cat__name">
              <span class="fa-cat__zh">{{ localizedCategory(cat, lang) }}</span>
              <span class="fa-cat__en">{{ lang === 'zh' ? cat.en : cat.zh }}</span>
            </span>
            <p class="fa-cat__desc">{{ localizedCategoryDesc(cat, lang) }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================ steps =========================== -->
    <section class="fa-section fa-section--tight">
      <div class="fa-shell">
        <div class="fa-section__head">
          <div>
            <h2 class="fa-section__title">{{ c.startTitle }}</h2>
            <p class="fa-section__desc">{{ c.startDesc }}</p>
          </div>
        </div>
        <div class="fa-steps">
          <div v-for="(s, i) in c.steps" :key="i" class="fa-step">
            <h3 class="fa-step__title">{{ s.title }}</h3>
            <p class="fa-step__body">{{ s.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================= links ========================== -->
    <section class="fa-section fa-section--tight">
      <div class="fa-shell">
        <div class="fa-section__head">
          <div>
            <h2 class="fa-section__title">{{ c.linksTitle }}</h2>
            <p class="fa-section__desc">{{ c.linksDesc }}</p>
          </div>
        </div>
        <div class="fa-links">
          <a :href="meta.mcmodClass" target="_blank" rel="noreferrer">MC百科</a>
          <a :href="meta.curseforge" target="_blank" rel="noreferrer">CurseForge</a>
          <a :href="meta.modrinth" target="_blank" rel="noreferrer">Modrinth</a>
          <a :href="meta.github" target="_blank" rel="noreferrer">GitHub</a>
          <a :href="localePath('/changelog/', lang)">{{ lang === 'zh' ? '更新日志' : 'Changelog' }}</a>
          <a :href="localePath('/about/', lang)">{{ lang === 'zh' ? '关于本模组' : 'About' }}</a>
        </div>
      </div>
    </section>
  </div>
</template>
