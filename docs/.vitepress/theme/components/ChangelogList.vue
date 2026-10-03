<script setup lang="ts">
import { computed } from 'vue'
import { type Lang, changelog, labels, localePath, meta } from '../data'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const t = computed(() => labels(props.lang))

const releases = computed(() => changelog ?? [])

/** Section headings inside release notes are rendered without a bullet. */
function isHeading(line: string): boolean {
  return !/^[\d\s·.、)）]/.test(line) && line.length <= 14 && !/[。；;.]$/.test(line)
}
</script>

<template>
  <div class="fa-log-wrap">
    <p class="fa-log__intro">
      <template v-if="lang === 'zh'">
        更新记录同步自 MC百科 版本页与 GitHub 仓库。当前主线为
        <strong>{{ meta.mcVersions[0] }}</strong> Forge，其它分支的改动会单独标注。
      </template>
      <template v-else>
        Release notes mirror the MC百科 version page and the GitHub repository. The main line is
        <strong>{{ meta.mcVersions[0] }}</strong> Forge; changes on other branches are called out
        separately.
      </template>
    </p>

    <ol v-if="releases.length" class="fa-log">
      <li v-for="r in releases" :key="r.version" class="fa-log__item">
        <div class="fa-log__head">
          <span class="fa-log__version">{{ r.version }}</span>
          <span class="fa-log__date">{{ r.date }}</span>
        </div>
        <ul v-if="(lang === 'zh' ? r.zhNotes : r.enNotes).length" class="fa-log__notes">
          <li
            v-for="(n, i) in lang === 'zh' ? r.zhNotes : r.enNotes"
            :key="i"
            :class="{ 'is-heading': isHeading(n) }"
          >
            {{ n }}
          </li>
        </ul>
        <p v-else class="fa-log__empty">{{ t.noNotes }}</p>
      </li>
    </ol>

    <p v-else class="fa-empty">
      <template v-if="lang === 'zh'">
        暂无更新记录。可前往
        <a :href="meta.mcmodClass" target="_blank" rel="noreferrer">MC百科版本页</a>
        或
        <a :href="`${meta.github}/releases`" target="_blank" rel="noreferrer">GitHub</a>
        查看最新发布。
      </template>
      <template v-else>
        No release notes recorded yet. See the
        <a :href="meta.mcmodClass" target="_blank" rel="noreferrer">MC百科 version page</a>
        or
        <a :href="`${meta.github}/releases`" target="_blank" rel="noreferrer">GitHub</a>
        for the latest builds.
      </template>
    </p>

    <p class="fa-log__footnote">
      <a :href="`${meta.github}/commits`" target="_blank" rel="noreferrer">
        {{ lang === 'zh' ? '查看全部提交记录' : 'Browse every commit' }}
      </a>
      ·
      <a :href="localePath('/enchantments/', lang)">
        {{ lang === 'zh' ? '返回附魔总览' : 'Back to the enchantment index' }}
      </a>
    </p>
  </div>
</template>

<style scoped>
.fa-log-wrap {
  margin-bottom: 8px;
}

.fa-log__intro {
  margin: 0 0 28px;
  max-width: 68ch;
  font-size: 14px;
  line-height: 1.75;
  color: var(--fa-text-muted);
}

.fa-log__empty {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: var(--fa-text-muted);
  font-style: italic;
}

.fa-log__footnote {
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--fa-border);
  font-size: 13.5px;
}

.fa-log__footnote a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.fa-log__footnote a:hover {
  border-bottom: 1px solid currentColor;
}
</style>
