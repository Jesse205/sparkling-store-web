// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      devOptions: {
        enabled: true
      },
      workbox: {
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: '粼光应用商店 Lite',
        short_name: '粼光商店 Lite',
        start_url: '/',
        description: '不只是一个应用市场•粼光',
        author: 'Jesse205',
        scope: '/',
        lang: 'zh-CN',
        display: 'standalone',
        theme_color: '#FF5722',
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/maskable_icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
    }),
    legacy({
      targets: ['defaults','ie 6-11'],
    }),
  ],
  define: {
    'process.env': {},
    __VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
