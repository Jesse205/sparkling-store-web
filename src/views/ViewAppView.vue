<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>应用浏览</v-app-bar-title>
        </v-app-bar>
        <AppMain>
            <v-container class="container py-2">
                <!-- 顶部 -->
                <div class="header py-2">
                    <!-- 图标 -->
                    <v-avatar class="elevation-1" rounded="lg" size="96">
                        <v-img :src="appConfig.icon" />
                    </v-avatar>
                    <div class="header-right ml-4">
                        <!-- 应用名 -->
                        <span class="text-h6">{{ appConfig.name }}</span>
                        <!-- 版本 -->
                        <span class="text-subtitle-1 v-list-item-subtitle">
                            {{ loaded? `${appConfig.version} (${appConfig.version_code})` : null}}</span>
                        <v-btn class="downloadButton" variant="flat" color="primary" :disabled="!appConfig.download_url"
                            :href="appConfig.download_url" target="_blank">下载应用</v-btn>

                    </div>
                </div>
                <!-- 应用简介 -->
                <div class="py-2">
                    <v-card v-show="(!loaded) || appConfig.summary" class="text-center summaryCard" variant="tonal">
                        <v-card-text>{{ appConfig.summary }}</v-card-text>
                        <span>“</span>
                    </v-card>
                </div>
                <div class="py-2">
                    <div class="title">屏幕截图</div>

                    <v-slide-group center-active v-model="screenshotModel" mandatory="force"
                        :style="{ 'min-height': screenshotHeight + 'px' }">
                        <!-- eslint-disable-next-line vue/valid-v-for -->
                        <v-slide-group-item v-for="item in appConfig.screenshot" v-slot="{ toggle }">
                            <v-img class="mx-1 rounded-lg border" :height="screenshotHeight"
                                :width="screenshotHeight * appConfig.screenshot_ratio"
                                @click="toggle(); screenshotOverlay = true" :src="item" cover v-ripple />
                        </v-slide-group-item>
                    </v-slide-group>

                    <v-overlay class="screenshotOverlay h-100 w-100" v-model="screenshotOverlay"
                        scroll-strategy="block">
                        <v-carousel v-model="screenshotModel" class="h-100 w-100" show-arrows="hover">
                            <!-- eslint-disable-next-line vue/valid-v-for -->
                            <v-carousel-item v-for="item in appConfig.screenshot" :src="item"
                                @click="screenshotOverlay = false"></v-carousel-item>
                        </v-carousel>
                    </v-overlay>
                </div>
                <div class="py-2" style="white-space: pre-line;">
                    <div class="title">介绍</div>
                    {{ appConfig.introduction }}
                </div>
                <div class="py-2">
                    <div class="title">详情信息</div>
                    版本：{{ loaded && `${appConfig.version} (${appConfig.version_code})` }}<br />
                    包名：{{ appConfig.package_name }}<br />
                    开发者：{{ appConfig.developer }}<br />
                </div>
            </v-container>
        </AppMain>
    </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import { useRoute } from "vue-router";
import { useTitle } from "@/events/title";
import { useStore } from '@/store/index';

useTitle('应用浏览')

const mainStore = useStore()
const appConfig = ref({})
const route = useRoute()
const loaded = ref(false)
const appName = inject('appName')

const refresh = () => {
    appConfig.value = {}
    loaded.value = false
    if (route.params.packageName) {
        console.log(route.params.packageName);
        let appConfigUrl = `${mainStore.APP_CONFIG_BASE_URL}/${route.params.packageName}.json`
        fetch(appConfigUrl)
            .then(response => response.json())
            .then((data) => {
                data.package_name = route.params.packageName
                appConfig.value = data
                document.title = `${data.name}-${appName}`
                loaded.value = true
            })
    }
}
watch(() => route.params.packageName, refresh)
//onBeforeRouteUpdate(refresh)
// onActivated(refresh)
refresh()

const screenshotModel = ref()
const screenshotOverlay = ref(false)
const screenshotHeight = 320
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    width: 100%;
    align-items: center;
}

.header-right {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header-right>.text-subtitle-1 {
    height: 1.75rem
}

.header-right>.text-h6 {
    height: 2rem
}

.downloadButton {
    height: 32px;
    width: 96px;
    // margin-top: 8px;
}

.title {
    color: rgba(var(--v-theme-on-background));
    font-size: 1rem;
    margin-bottom: 8px;
    font-weight: 500;
}

.summaryCard {
    width: 100%;
}

@media (min-width: 600px) {
    .summaryCard {
        width: fit-content;
    }
}

.summaryCard :deep(.v-card-text) {
    font-size: 1rem;
    min-height: 52px;
    padding-left: 48px;
    padding-right: 48px;
}

.summaryCard>span {
    position: absolute;
    left: -16px;
    top: -16px;
    font-size: 60px;
    opacity: 0.5;
}

.screenshotOverlay :deep(.v-overlay__content) {
    height: 100%;
    width: 100%;
}
</style>