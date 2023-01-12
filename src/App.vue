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

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="10">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <v-snackbar v-model="store.snackbar">{{ store.snackbarText }}</v-snackbar>
</template>

<style>
/* 调整容器最大宽度 */
@media (min-width: 1280px) {
  .v-container {
    max-width: 1280px !important;
  }
}

/* 隐藏进度条的底色 */
.hideProgressUnderlay .v-progress-circular__underlay {
  display: none;
}

.v-icon--size-default {
  font-size: 24px !important;
}

/* 选中的图标不变灰 */
.v-btn--active.v-btn--variant-plain {
  opacity: 1 !important;
}
</style>