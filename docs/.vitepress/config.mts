import { defineConfig } from 'vitepress'

const MOD_ZH = '白门的奇异附魔：苦痛长河：重生'
const MOD_EN = "MarbleGate's Exotic Enchantment: Flowing Agony: Reborn"

const REPO = 'https://github.com/Error1015/FlowingAgony-Reborn'

const zhSidebar = [
  {
    text: '开始使用',
    items: [
      { text: '快速开始', link: '/guide/' },
      { text: '附魔机制', link: '/guide/mechanics/' },
      { text: '常见问题', link: '/guide/faq/' },
    ],
  },
  {
    text: '附魔图鉴',
    items: [
      { text: '全部附魔', link: '/enchantments/' },
      { text: '速查表', link: '/enchantments/table/' },
      { text: '状态效果', link: '/effects/' },
    ],
  },
  {
    text: '其它',
    items: [
      { text: '更新日志', link: '/changelog/' },
      { text: '关于本模组', link: '/about/' },
    ],
  },
]

const enSidebar = [
  {
    text: 'Getting started',
    items: [
      { text: 'Quick start', link: '/en/guide/' },
      { text: 'Enchantment mechanics', link: '/en/guide/mechanics/' },
      { text: 'FAQ', link: '/en/guide/faq/' },
    ],
  },
  {
    text: 'Enchantment index',
    items: [
      { text: 'All enchantments', link: '/en/enchantments/' },
      { text: 'Quick reference', link: '/en/enchantments/table/' },
      { text: 'Status effects', link: '/en/effects/' },
    ],
  },
  {
    text: 'More',
    items: [
      { text: 'Changelog', link: '/en/changelog/' },
      { text: 'About', link: '/en/about/' },
    ],
  },
]

const socialLinks = [
  { icon: 'github', link: REPO, ariaLabel: 'GitHub' },
  {
    icon: {
      svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 2h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h.6V4H7Zm2.6 0v16H17a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H9.6Zm1.9 3.1h5.2v1.7h-5.2V7.1Zm0 3.5h5.2v1.7h-5.2v-1.7Zm0 3.5h3.4v1.7h-3.4v-1.7Z"/></svg>',
    },
    link: 'https://www.mcmod.cn/class/18692.html',
    ariaLabel: 'MC百科',
  },
]

const searchTranslations = {
  zh: {
    button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
    modal: {
      noResultsText: '没有找到结果',
      resetButtonTitle: '清除查询条件',
      footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
    },
  },
  en: {
    button: { buttonText: 'Search docs', buttonAriaLabel: 'Search docs' },
    modal: {
      noResultsText: 'No results found',
      resetButtonTitle: 'Reset search',
      footer: { selectText: 'to select', navigateText: 'to navigate', closeText: 'to close' },
    },
  },
}

export default defineConfig({
  lang: 'zh-CN',
  title: MOD_ZH,
  description:
    '白门的奇异附魔：苦痛长河：重生 —— Minecraft Java 版 Forge 模组文档。59 个附魔的完整分类与效果说明，中英双语、亮暗主题。',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#c8392f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: MOD_ZH }],
    ['meta', { property: 'og:description', content: MOD_EN }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,600;1,400&family=Noto+Serif+SC:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap',
      },
    ],
  ],

  cleanUrls: false,
  lastUpdated: true,
  ignoreDeadLinks: false,

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
  },

  /* ------------------------------------------------------------------
   * Shared theme defaults. Anything a locale re-declares wins.
   * ------------------------------------------------------------------ */
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '苦痛长河：重生',
    socialLinks,
    search: { provider: 'local', options: { translations: searchTranslations.zh } },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',
    externalLinkIcon: true,
    footer: {
      message: '文档内容整理自 MC百科资料与模组源码，遵循 BY-NC-SA 3.0 协议。',
      copyright:
        '模组作者 白门 (MarbleGate) · 移植与维护 Error1015 · 以 3-Clause BSD 协议开源',
    },
  },

  /* ------------------------------------------------------------------
   * Locales: Chinese at the root, English under /en/
   * ------------------------------------------------------------------ */
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        siteTitle: '苦痛长河：重生',
        nav: [
          { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
          { text: '附魔图鉴', link: '/enchantments/', activeMatch: '^/enchantments/' },
          { text: '状态效果', link: '/effects/', activeMatch: '^/effects/' },
          { text: '更新日志', link: '/changelog/', activeMatch: '^/changelog/' },
          { text: '关于', link: '/about/', activeMatch: '^/about/' },
        ],
        sidebar: zhSidebar,
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: MOD_EN,
      description:
        'Documentation for the Minecraft Java Edition Forge mod Flowing Agony Reborn — all 59 enchantments categorised with full per-level effects.',
      themeConfig: {
        siteTitle: 'Flowing Agony: Reborn',
        nav: [
          { text: 'Guide', link: '/en/guide/', activeMatch: '^/en/guide/' },
          {
            text: 'Enchantments',
            link: '/en/enchantments/',
            activeMatch: '^/en/enchantments/',
          },
          { text: 'Status effects', link: '/en/effects/', activeMatch: '^/en/effects/' },
          { text: 'Changelog', link: '/en/changelog/', activeMatch: '^/en/changelog/' },
          { text: 'About', link: '/en/about/', activeMatch: '^/en/about/' },
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        search: { provider: 'local', options: { translations: searchTranslations.en } },
        footer: {
          message:
            'Compiled from the MC百科 data pages and the mod source, under BY-NC-SA 3.0.',
          copyright:
            'Mod by 白门 (MarbleGate) · Ported and maintained by Error1015 · Released under the 3-Clause BSD Licence',
        },
      },
    },
  },
})
