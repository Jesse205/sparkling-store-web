<template>
  <v-app>
    <v-divider />
    <router-view v-slot="{ Component }">
      <keep-alive :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <v-snackbar v-model="store.snackbar">{{ store.snackbarText }}</v-snackbar>
  </v-app>
</template>

<script setup>
//import { ref } from 'vue'
import { useStore } from '@/store/index';
import { useTheme } from 'vuetify'
const store = useStore()
const theme = useTheme()

// 自动设置暗色模式
let colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
theme.global.name.value = colorSchemeMediaQuery.matches ? 'dark' : 'light';
let onColorSchemeChanged = () => {
  theme.global.name.value = colorSchemeMediaQuery.matches ? 'dark' : 'light';
}

// 添加颜色模式监听
try {
  // Chrome & Firefox
  colorSchemeMediaQuery.addEventListener('change', onColorSchemeChanged);
} catch (e1) {
  try {
    // Safari
    colorSchemeMediaQuery.addListener(onColorSchemeChanged);
  } catch (e2) {
    console.error(e1);
    console.error(e2);
  }
}
</script>

