/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins

import pinia from './pinia'
import router from '../router'
import vuetify from './vuetify'

export function registerPlugins(app) {
  app
    .use(pinia)
    .use(router)
    .use(vuetify)
}
