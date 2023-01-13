/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md2,
  theme: {
    // defaultTheme: 'light',
    options: { customProperties: true },
    themes: {
      light: {
        colors: {
          primary: '#FF5722',
          secondary: '#FF9800',
          surface: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#FF5722',
          secondary: '#FF9800',
          surface: '#121212',
        },
      },
    },
  },
})
