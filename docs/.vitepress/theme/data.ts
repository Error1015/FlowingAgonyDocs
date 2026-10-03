import { withBase } from 'vitepress'
import dataset from '../data/dataset.json'

export type Lang = 'zh' | 'en'
export type RarityClass = 'legendary' | 'rare' | 'uncommon' | 'common'
export type ConflictKind = 'mod' | 'vanilla' | 'unknown'

export interface ConflictRef {
  zh: string
  en: string
  slug: string | null
  kind: ConflictKind
}

export interface Enchantment {
  id: string
  slug: string
  category: string
  zhName: string
  enName: string
  zhLore: string
  enLore: string
  slots: string[]
  maxLevel: number
  maxLevelRaw: string
  rarityTier: number
  rarityRaw: string
  treasure: boolean
  curse: boolean
  noTrade: boolean
  legacyRemoved: boolean
  conflicts: { zh: string; en: string }[]
  conflictLinks: ConflictRef[]
  zhEffect: string
  enEffect: string
}

export interface Category {
  id: string
  zh: string
  en: string
  zhDesc: string
  enDesc: string
  accent: string
  glyph: string
}

export interface StatusEffect {
  id: string
  zhName: string
  enName: string
  kind: 'buff' | 'debuff'
  zhDesc: string
  enDesc: string
  source: string
  stages?: string[]
}

export interface Release {
  version: string
  date: string
  zhNotes: string[]
  enNotes: string[]
}

export interface GameSetting {
  zhName: string
  enName: string
  zhDesc: string
  enDesc: string
}

export interface SlotName {
  zh: string
  en: string
}

export const meta = dataset.meta
export const slotNames = dataset.slotNames as Record<string, SlotName>
export const categories = dataset.categories as Category[]
export const enchantments = dataset.enchantments as Enchantment[]
export const statusEffects = dataset.effects as StatusEffect[]
export const markerEffects = dataset.markerEffects
export const changelog = dataset.changelog as Release[]
export const gameSetting = dataset.gameSetting as GameSetting | null
export const stats = dataset.stats
export const buildInfo = dataset.build

export const categoryById = new Map(categories.map((c) => [c.id, c]))
export const enchantmentBySlug = new Map(enchantments.map((e) => [e.slug, e]))
export const enchantmentById = new Map(enchantments.map((e) => [e.id, e]))

/** Enchantments of a category, in the canonical order used across the site. */
export function enchantmentsOf(categoryId: string): Enchantment[] {
  return enchantments.filter((e) => e.category === categoryId)
}

export function localizedName(e: Enchantment, lang: Lang): string {
  return lang === 'zh' ? e.zhName : e.enName
}

export function otherName(e: Enchantment, lang: Lang): string {
  return lang === 'zh' ? e.enName : e.zhName
}

export function localizedLore(e: Enchantment, lang: Lang): string {
  return lang === 'zh' ? e.zhLore : e.enLore
}

export function localizedEffect(e: Enchantment, lang: Lang): string {
  return lang === 'zh' ? e.zhEffect : e.enEffect
}

export function localizedCategory(c: Category, lang: Lang): string {
  return lang === 'zh' ? c.zh : c.en
}

export function localizedCategoryDesc(c: Category, lang: Lang): string {
  return lang === 'zh' ? c.zhDesc : c.enDesc
}

export function localizedSlot(slot: string, lang: Lang): string {
  const s = slotNames[slot]
  if (!s) return slot
  return lang === 'zh' ? s.zh : s.en
}

/** Bilingual label for a conflict reference. */
export function conflictLabel(c: { zh: string; en: string }, lang: Lang): string {
  return lang === 'zh' ? c.zh : c.en
}

export function localizedEffectName(e: StatusEffect, lang: Lang): string {
  return lang === 'zh' ? e.zhName : e.enName
}

export function localizedEffectDesc(e: StatusEffect, lang: Lang): string {
  return lang === 'zh' ? e.zhDesc : e.enDesc
}

/** mcmod rarity weight: 1 = very rare, 2 = rare, 5 = uncommon, 10 = common. */
export function rarityOf(e: Enchantment): { cls: RarityClass; zh: string; en: string } {
  switch (e.rarityTier) {
    case 1:
      return { cls: 'legendary', zh: '非常稀有', en: 'Very Rare' }
    case 2:
      return { cls: 'rare', zh: '稀有', en: 'Rare' }
    case 5:
      return { cls: 'uncommon', zh: '不常见', en: 'Uncommon' }
    default:
      return { cls: 'common', zh: '常见', en: 'Common' }
  }
}

export const RARITY_ORDER: RarityClass[] = ['legendary', 'rare', 'uncommon', 'common']

/** Roman numerals used for enchantment levels. */
export const ROMAN = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']

export function romanOf(n: number): string {
  return ROMAN[n - 1] ?? String(n)
}

export interface UILabels {
  all: string
  search: string
  searchPlaceholder: string
  level: string
  levelAll: string
  slots: string
  maxLevel: string
  rarity: string
  conflicts: string
  synergy: string
  treasure: string
  curse: string
  noTrade: string
  legacyRemoved: string
  effect: string
  lore: string
  results: string
  empty: string
  clear: string
  source: string
  vanilla: string
  unknown: string
  category: string
  buffs: string
  debuffs: string
  version: string
  date: string
  notes: string
  noNotes: string
  copied: string
}

const ZH: UILabels = {
  all: '全部',
  search: '搜索',
  searchPlaceholder: '搜索附魔名称、效果或适用物品…',
  level: '附魔等级',
  levelAll: '全部等级',
  slots: '适用物品',
  maxLevel: '最高等级',
  rarity: '刷新权重',
  conflicts: '冲突附魔',
  synergy: '联动附魔',
  treasure: '宝藏附魔',
  curse: '诅咒',
  noTrade: '无法通过交易获得',
  legacyRemoved: 'Backport 1.15.2 中已移除',
  effect: '附魔效果',
  lore: '风味描述',
  results: '匹配附魔',
  empty: '没有符合条件的附魔，试试换个关键词。',
  clear: '重置筛选',
  source: '来源',
  vanilla: '原版',
  unknown: '其它',
  category: '分类',
  buffs: '增益效果',
  debuffs: '负面效果',
  version: '版本',
  date: '日期',
  notes: '更新内容',
  noNotes: '该版本暂无更新说明。',
  copied: '已复制',
}

const EN: UILabels = {
  all: 'All',
  search: 'Search',
  searchPlaceholder: 'Search by name, effect or applicable item…',
  level: 'Enchantment level',
  levelAll: 'All levels',
  slots: 'Applies to',
  maxLevel: 'Max level',
  rarity: 'Rarity',
  conflicts: 'Incompatible with',
  synergy: 'Synergy',
  treasure: 'Treasure enchantment',
  curse: 'Curse',
  noTrade: 'Not obtainable via trading',
  legacyRemoved: 'Removed in Backport 1.15.2',
  effect: 'Effect',
  lore: 'Flavour text',
  results: 'Matching enchantments',
  empty: 'No enchantment matches those filters. Try another keyword.',
  clear: 'Reset filters',
  source: 'Source',
  vanilla: 'Vanilla',
  unknown: 'Other',
  category: 'Category',
  buffs: 'Buffs',
  debuffs: 'Debuffs',
  version: 'Version',
  date: 'Date',
  notes: 'Changes',
  noNotes: 'No release notes recorded for this version.',
  copied: 'Copied',
}

export function labels(lang: Lang): UILabels {
  return lang === 'zh' ? ZH : EN
}

/**
 * Routes are mirrored between locales: the Chinese site lives at the root,
 * the English site under /en/.
 *
 * The result is passed through `withBase()` because these paths are used in
 * component templates, which VitePress does not rewrite automatically the way
 * it does for links written in markdown.
 */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  const localized = lang === 'zh' ? clean : `/en${clean === '/' ? '/' : clean}`
  return withBase(localized)
}
