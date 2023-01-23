<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>应用浏览</v-app-bar-title>
        </v-app-bar>
        <AppMain>
            <v-progress-linear v-show="!loaded" color="primary" class="progress" indeterminate></v-progress-linear>
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
                        <v-icon icon="mdi-format-quote-open" />
                    </v-card>
                </div>
                <div v-show="appConfig.screenshot && appConfig.screenshot.length > 0" class="py-2">
                    <div class="title">屏幕截图</div>
                    <div id="screenshotThumbnails" :style="{ 'min-height': screenshotHeight + 'px' }">
                        <!-- eslint-disable-next-line vue/valid-v-for -->
                        <v-img v-for="(item, index) in appConfig.screenshot"
                            class="screenshotThumbnail mx-1 rounded-lg border" :height="screenshotHeight"
                            :width="screenshotHeight * appConfig.screenshot_ratio" @click="onScreenshotClick(index)"
                            :src="item" cover v-ripple />
                    </div>

                    <v-overlay class="screenshotOverlay h-100 w-100" v-model="screenshotOverlay"
                        scroll-strategy="block">
                        <v-carousel v-model="screenshotModel" class="h-100 w-100" show-arrows="hover" hide-delimiters>
                            <!-- eslint-disable-next-line vue/valid-v-for -->
                            <v-carousel-item v-for="item in appConfig.screenshot" :src="item"
                                @click="screenshotOverlay = false" />
                        </v-carousel>
                        <!-- <div class="screenshotModel">{{ screenshotModel }}</div> -->
                    </v-overlay>
                </div>
                <div v-show="appConfig.introduction" class="py-2" style="white-space: pre-line;">
                    <div class="title">介绍</div>
                    {{ appConfig.introduction }}
                </div>
                <div v-if="loaded" class="py-2">
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
import { ref, inject, watch,  onActivated } from "vue";
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useTitle } from "@/events/title";
import { useStore } from '@/store/index';

useTitle('应用浏览')

const mainStore = useStore()
const appConfig = ref({})
const route = useRoute()
const loaded = ref(false)
const appName = inject('appName')

const refresh = () => {
    if (route.params.packageName) {
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

function initConfig() {
    appConfig.value = {}
    loaded.value = false
}

onBeforeRouteLeave(() => {
    console.log('Before route leave');
    screenshotOverlay.value = false
})

onBeforeRouteUpdate(() => {
    console.log('Before route update');
    initConfig()
})

onActivated(() => {
    initConfig()
})

refresh()

const screenshotModel = ref()
const screenshotOverlay = ref(false)
const screenshotHeight = 320
// onDeactivated(() => screenshotOverlay.value = false)
function onScreenshotClick(index) {
    screenshotOverlay.value = true
    screenshotModel.value = index
}

</script>

<style lang="scss" scoped>
.progress {
    position: absolute;
    top: initial !important;
}

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

.screenshotThumbnail {
    float: left;
}

#screenshotThumbnails {
    display: flex;
    overflow-x: auto;
    // border-radius: 8px;
    padding: 8px 0;
    transform: translateZ(0);
}

/* .screenshotModel {
    position: fixed;
    bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
    opacity: 0.6;
} */

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
    font-size: 1.125rem;
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

.summaryCard>i {
    position: absolute;
    left: 16px;
    top: 4px;
    font-size: 60px;
    opacity: 0.5;
}

.screenshotOverlay :deep(.v-overlay__content) {
    height: 100%;
    width: 100%;
}
</style>