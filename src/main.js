/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import '@/sass/main.scss'

// Components
import App from './App.vue'
import AppMain from './components/AppMain.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.component('AppMain', AppMain)

registerPlugins(app)
app.provide('appName', '粼光商店 Lite')
app.provide('apiBaseUrl', '/api/')
app.mount('#app')
