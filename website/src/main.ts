/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

import { createI18n } from 'vue-i18n'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import en from './locales/en.json'
import fi from './locales/fi.json'
// Styles
import 'unfonts.css'

const i18n = createI18n({
  locale: 'fi',
  fallbackLocale: 'en',
  messages: {
    fi,
    en,
  },
})

const app = createApp(App)
app.use(i18n)
registerPlugins(app)
app.mount('#app')
