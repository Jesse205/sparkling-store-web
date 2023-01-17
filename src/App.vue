<template>
  <v-app>
    <router-view v-slot="{ Component, route }">

      <keep-alive :max="10">
        <transition :name="route.meta.transition">
          <component :is="Component" class="page" />
        </transition>
      </keep-alive>

    </router-view>
  </v-app>
</template>

<script setup>
//import { ref } from 'vue'
import { useTheme } from 'vuetify'
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
<style scoped>
.page {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
