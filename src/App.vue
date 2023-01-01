<script setup>
import { ref, watchEffect } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()

// 自动设置暗色模式
let colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)')
const themeMode = ref(colorSchemeMedia.matches ? 'dark' : 'light')
colorSchemeMedia.addListener(() => {
  themeMode.value = colorSchemeMedia.matches ? 'dark' : 'light'
})

watchEffect(() => {
  theme.global.name.value = themeMode.value
})

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="10">
      <component :is="Component" />
    </keep-alive>
  </router-view>
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

/* 隐藏按钮背景 */
.hideBtnOverlay .v-btn__overlay {
  display: none;
}

.v-icon--size-default {
  font-size: 24px !important;
}


/* 底栏图标改为灰色 */
.v-theme--light .v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: rgba(0, 0, 0, .6) !important;
}

.v-theme--dark .v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: rgba(255, 255, 255, 0.6) !important;
}
</style>