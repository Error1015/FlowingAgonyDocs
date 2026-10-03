<script setup lang="ts">
/**
 * Renders an enchantment effect text faithfully, while making the
 * per-level number groups (`2/4/6`, `10%/20%/30%`, `5s/7.5s/10s` …)
 * interactive: the value for the currently selected level is
 * emphasised, the rest are dimmed.
 *
 * Nothing is invented — every number comes verbatim from the source
 * text; only the presentation changes. Groups whose value count does
 * not match the enchantment's max level are rendered untouched.
 */
import { computed } from 'vue'

interface Props {
  text: string
  maxLevel?: number
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxLevel: 1,
  level: 1,
})

interface NumSeg {
  k: 'num'
  parts: string[]
  aligned: boolean
}

interface TextSeg {
  k: 'text'
  v: string
}

type Seg = NumSeg | TextSeg

interface Line {
  kind: 'text' | 'label' | 'gap'
  /** Leading version marker rendered as a chip before the body. */
  lead?: string
  segs: Seg[]
}

// A number, optionally a range, optionally a unit, repeated with slashes.
const NUM_RE =
  /(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?[a-zA-Z%]*)(?:\s*\/\s*(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?[a-zA-Z%]*))+/g

// A line that is nothing but a version selector, e.g. ">=1.18.2:".
const LABEL_RE = /^(?:>=|<=|=)?\s*\d+(?:\.\d+)*\s*[:;]?$/

// A version selector at the very start of a longer line, e.g. ">=1.18 Effect: …".
const LEAD_RE = /^\s*(>=|<=|=)\s*(\d+(?:\.\d+)*)\s*[:;]?\s*/

function splitNumbers(line: string): Seg[] {
  const segs: Seg[] = []
  let last = 0
  NUM_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = NUM_RE.exec(line)) !== null) {
    if (m.index > last) segs.push({ k: 'text', v: line.slice(last, m.index) })
    const parts = m[0].split('/').map((s) => s.trim())
    segs.push({
      k: 'num',
      parts,
      aligned: props.maxLevel > 1 && parts.length === props.maxLevel,
    })
    last = m.index + m[0].length
  }
  if (last < line.length) segs.push({ k: 'text', v: line.slice(last) })
  return segs.length ? segs : [{ k: 'text', v: line }]
}

const lines = computed<Line[]>(() =>
  String(props.text ?? '')
    .split('\n')
    .map<Line>((raw) => {
      const trimmed = raw.trim()
      if (!trimmed) return { kind: 'gap', segs: [] }
      if (LABEL_RE.test(trimmed)) {
        return { kind: 'label', segs: [{ k: 'text', v: trimmed.replace(/[:;]$/, '') }] }
      }
      const lead = LEAD_RE.exec(raw)
      if (lead) {
        const body = raw.slice(lead[0].length)
        return {
          kind: 'text',
          lead: `${lead[1]}${lead[2]}`,
          segs: splitNumbers(body),
        }
      }
      return { kind: 'text', segs: splitNumbers(raw) }
    }),
)

function numClass(seg: NumSeg, index: number): Record<string, boolean> {
  if (!seg.aligned) return { 'is-static-num': true }
  return {
    'is-active': index === props.level - 1,
    'is-dim': index !== props.level - 1,
  }
}
</script>

<template>
  <div class="fa-en__body">
    <template v-for="(line, li) in lines" :key="li">
      <div v-if="line.kind === 'gap'" class="fa-fx-gap" />
      <p v-else-if="line.kind === 'label'" class="fa-fx-line">
        <span class="fa-fx-label">{{ (line.segs[0] as TextSeg).v }}</span>
      </p>
      <p v-else class="fa-fx-line">
        <span v-if="line.lead" class="fa-fx-label">{{ line.lead }}</span>
        <template v-for="(seg, si) in line.segs" :key="si">
          <span v-if="seg.k === 'text'">{{ seg.v }}</span>
          <span v-else class="fa-fx-group">
            <template v-for="(part, pi) in (seg as NumSeg).parts" :key="pi">
              <span v-if="pi > 0" class="fa-fx-sep">/</span>
              <span class="fa-fx-num" :class="numClass(seg as NumSeg, pi)">{{ part }}</span>
            </template>
          </span>
        </template>
      </p>
    </template>
  </div>
</template>

<style scoped>
.fa-fx-gap {
  height: 8px;
}

.fa-fx-group {
  white-space: nowrap;
}
</style>
