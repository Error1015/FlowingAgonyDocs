<script setup lang="ts">
import { computed } from 'vue'
import {
  type Lang,
  labels,
  localizedEffectDesc,
  localizedEffectName,
  localePath,
  markerEffects,
  statusEffects,
} from '../data'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const t = computed(() => labels(props.lang))

const buffs = computed(() => statusEffects.filter((e) => e.kind === 'buff'))
const debuffs = computed(() => statusEffects.filter((e) => e.kind === 'debuff'))
</script>

<template>
  <div class="fa-effects-wrap">
    <section v-if="buffs.length" class="fa-effects-section">
      <h3 class="fa-effects-heading">{{ t.buffs }}</h3>
      <div class="fa-effects">
        <article
          v-for="e in buffs"
          :key="e.id"
          class="fa-effect fa-effect--buff"
          :id="e.id"
        >
          <header class="fa-effect__head">
            <div>
              <h4 class="fa-effect__zh">{{ localizedEffectName(e, lang) }}</h4>
              <p class="fa-effect__en">
                {{ lang === 'zh' ? e.enName : e.zhName }}
              </p>
            </div>
            <span class="fa-badge fa-badge--uncommon">{{ t.buffs }}</span>
          </header>
          <p class="fa-effect__desc">{{ localizedEffectDesc(e, lang) }}</p>
          <footer v-if="e.source" class="fa-effect__foot">
            <a :href="`${localePath('/enchantments/', lang)}#${e.source}`">{{ e.source }}</a>
          </footer>
        </article>
      </div>
    </section>

    <section class="fa-effects-section">
      <h3 class="fa-effects-heading">{{ t.debuffs }}</h3>
      <div class="fa-effects">
        <article
          v-for="e in debuffs"
          :key="e.id"
          class="fa-effect fa-effect--debuff"
          :id="e.id"
        >
          <header class="fa-effect__head">
            <div>
              <h4 class="fa-effect__zh">{{ localizedEffectName(e, lang) }}</h4>
              <p class="fa-effect__en">
                {{ lang === 'zh' ? e.enName : e.zhName }}
              </p>
            </div>
            <span class="fa-badge fa-badge--curse">
              {{ t.debuffs }}<template v-if="e.stages"> · {{ e.stages.join(' ') }}</template>
            </span>
          </header>
          <p class="fa-effect__desc">{{ localizedEffectDesc(e, lang) }}</p>
          <footer v-if="e.source" class="fa-effect__foot">
            <a :href="`${localePath('/enchantments/', lang)}#${e.source}`">{{ e.source }}</a>
          </footer>
        </article>
      </div>
    </section>

    <section class="fa-effects-section">
      <article class="fa-effect fa-effect--marker" id="marker-effects">
        <header class="fa-effect__head">
          <div>
            <h4 class="fa-effect__zh">
              {{ lang === 'zh' ? markerEffects.zhName : markerEffects.enName }}
            </h4>
            <p class="fa-effect__en">
              {{ lang === 'zh' ? markerEffects.enName : markerEffects.zhName }}
            </p>
          </div>
          <span class="fa-badge fa-badge--plain">{{ markerEffects.list.length }}</span>
        </header>
        <p class="fa-effect__desc">
          {{ lang === 'zh' ? markerEffects.zhDesc : markerEffects.enDesc }}
        </p>
        <footer class="fa-effect__foot">
          <code v-for="m in markerEffects.list" :key="m" class="fa-marker-id">{{ m }}</code>
        </footer>
      </article>
    </section>
  </div>
</template>

<style scoped>
.fa-effects-section + .fa-effects-section {
  margin-top: 44px;
}

.fa-effects-heading {
  margin: 0 0 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--fa-border);
  font-family: var(--fa-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--fa-text-strong);
}

.fa-effect--marker {
  border-left: 3px solid var(--fa-violet);
}

.fa-marker-id {
  display: inline-block;
  margin: 3px 5px 0 0;
  padding: 1px 7px;
  border-radius: 5px;
  background: var(--fa-surface-3);
  font-size: 11px;
  color: var(--fa-text-muted);
}

.fa-effect__foot a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-family: var(--fa-font-mono);
  font-size: 11.5px;
}

.fa-effect__foot a:hover {
  border-bottom: 1px solid currentColor;
}
</style>
