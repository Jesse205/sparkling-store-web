<template>
  <v-app>

    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <keep-alive :max="10">
          <component :is="Component" class="page" />
        </keep-alive>
      </transition>
    </router-view>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide } from 'vue'
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

// PWA 安装
const installBtnVisible = ref(false)
const onInstallBtnClick = ref()
provide('installBtnVisible', installBtnVisible)
provide('onInstallBtnClick', onInstallBtnClick)

const onBeforeInstallPrompt = (deferredPrompt) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  deferredPrompt.preventDefault();
  installBtnVisible.value = true
  onInstallBtnClick.value = () => {
    installBtnVisible.value = false
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        installBtnVisible.value = false
      } else {
        console.log("User dismissed the A2HS prompt");
        installBtnVisible.value = true
      }
      deferredPrompt = null
    });
  }
}
onMounted(() => {
  window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
})
onBeforeUnmount(() => {
  window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
})
</script>
<style scoped>
.page {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
