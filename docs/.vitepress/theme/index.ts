import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'

import HomePage from './components/HomePage.vue'
import EnchantExplorer from './components/EnchantExplorer.vue'
import EnchantTable from './components/EnchantTable.vue'
import EnchantCard from './components/EnchantCard.vue'
import StatusEffectList from './components/StatusEffectList.vue'
import ChangelogList from './components/ChangelogList.vue'
import AboutPanel from './components/AboutPanel.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('EnchantExplorer', EnchantExplorer)
    app.component('EnchantTable', EnchantTable)
    app.component('EnchantCard', EnchantCard)
    app.component('StatusEffectList', StatusEffectList)
    app.component('ChangelogList', ChangelogList)
    app.component('AboutPanel', AboutPanel)
  },
} satisfies Theme
