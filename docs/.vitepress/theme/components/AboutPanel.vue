<script setup lang="ts">
import { computed } from 'vue'
import { type Lang, gameSetting, localePath, meta, stats } from '../data'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const lang = computed(() => props.lang)

const rows = computed(() => {
  const zh = lang.value === 'zh'
  return [
    {
      label: zh ? '模组名称' : 'Mod name',
      value: zh ? meta.modZh : meta.modEn,
    },
    { label: zh ? '英文名称' : 'Chinese name', value: zh ? meta.modEn : meta.modZh },
    { label: zh ? '运作方式' : 'Mod loader', value: meta.loader },
    {
      label: zh ? '支持版本' : 'MC versions',
      value: meta.mcVersions.join(' · '),
    },
    { label: zh ? '运行环境' : 'Environment', value: zh ? '客户端需装 · 服务端需装' : 'Client required · Server required' },
    { label: zh ? '前置模组' : 'Dependency', value: meta.requires.join(' · ') },
    { label: zh ? '开源协议' : 'Licence', value: meta.license },
  ]
})
</script>

<template>
  <div class="fa-about">
    <div class="fa-info">
      <div v-for="r in rows" :key="r.label" class="fa-info__card">
        <div class="fa-info__label">{{ r.label }}</div>
        <div class="fa-info__value">{{ r.value }}</div>
      </div>
    </div>

    <h3 class="fa-about__heading">{{ lang === 'zh' ? '开发与维护' : 'Authors & maintainers' }}</h3>
    <div class="fa-info">
      <div v-for="a in meta.authors" :key="a.name" class="fa-info__card">
        <div class="fa-info__label">{{ lang === 'zh' ? a.role : a.roleEn }}</div>
        <div class="fa-info__value">
          <a :href="a.url" target="_blank" rel="noreferrer">{{ a.name }}</a>
        </div>
      </div>
    </div>

    <h3 class="fa-about__heading">{{ lang === 'zh' ? '内容规模' : 'Content scale' }}</h3>
    <div class="fa-info">
      <div class="fa-info__card">
        <div class="fa-info__label">{{ lang === 'zh' ? '附魔总数' : 'Enchantments' }}</div>
        <div class="fa-info__value">{{ stats.enchantmentCount }}</div>
      </div>
      <div class="fa-info__card">
        <div class="fa-info__label">{{ lang === 'zh' ? '附魔分类' : 'Categories' }}</div>
        <div class="fa-info__value">{{ stats.categoryCount }}</div>
      </div>
      <div class="fa-info__card">
        <div class="fa-info__label">{{ lang === 'zh' ? '状态效果' : 'Status effects' }}</div>
        <div class="fa-info__value">{{ stats.effectCount }}</div>
      </div>
      <div class="fa-info__card">
        <div class="fa-info__label">{{ lang === 'zh' ? '宝藏附魔' : 'Treasure enchantments' }}</div>
        <div class="fa-info__value">{{ stats.treasureCount }}</div>
      </div>
    </div>

    <template v-if="gameSetting">
      <h3 class="fa-about__heading">{{ lang === 'zh' ? '游戏机制' : 'Game mechanic' }}</h3>
      <article class="fa-mechanic">
        <header class="fa-mechanic__head">
          <h4>{{ lang === 'zh' ? gameSetting.zhName : gameSetting.enName }}</h4>
          <span class="fa-mechanic__alt">
            {{ lang === 'zh' ? gameSetting.enName : gameSetting.zhName }}
          </span>
        </header>
        <div class="fa-mechanic__body">
          <p
            v-for="(para, i) in (lang === 'zh' ? gameSetting.zhDesc : gameSetting.enDesc)
              .split('\n')
              .filter((p) => p.trim())"
            :key="i"
          >
            {{ para }}
          </p>
        </div>
      </article>
    </template>

    <h3 class="fa-about__heading">{{ lang === 'zh' ? '外部链接' : 'External links' }}</h3>
    <div class="fa-links">
      <a :href="meta.mcmodClass" target="_blank" rel="noreferrer">MC百科 · Reborn</a>
      <a :href="meta.mcmodOrigin" target="_blank" rel="noreferrer">MC百科 · {{ lang === 'zh' ? '原作' : 'Original' }}</a>
      <a :href="meta.mcmodItemList" target="_blank" rel="noreferrer">
        {{ lang === 'zh' ? '附魔资料页' : 'Enchantment data page' }}
      </a>
      <a :href="meta.curseforge" target="_blank" rel="noreferrer">CurseForge</a>
      <a :href="meta.modrinth" target="_blank" rel="noreferrer">Modrinth</a>
      <a :href="meta.github" target="_blank" rel="noreferrer">GitHub</a>
      <a :href="localePath('/changelog/', lang)">{{ lang === 'zh' ? '更新日志' : 'Changelog' }}</a>
    </div>
  </div>
</template>

<style scoped>
.fa-about__heading {
  margin: 44px 0 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--fa-border);
  font-family: var(--fa-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--fa-text-strong);
}

.fa-mechanic {
  padding: 24px;
  border: 1px solid var(--fa-border);
  border-left: 3px solid var(--fa-violet);
  border-radius: var(--fa-radius);
  background: var(--fa-surface);
  box-shadow: var(--fa-shadow-sm);
}

.fa-mechanic__head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.fa-mechanic__head h4 {
  margin: 0;
  font-family: var(--fa-font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--fa-text-strong);
}

.fa-mechanic__alt {
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fa-text-muted);
}

.fa-mechanic__body {
  margin-top: 14px;
}

.fa-mechanic__body p {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--fa-text);
}

.fa-mechanic__body p + p {
  margin-top: 12px;
}
</style>
