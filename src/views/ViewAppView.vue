<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>应用浏览</v-app-bar-title>
        </v-app-bar>
        <v-main>
            <v-container class="container py-2">
                <div class="header py-2">
                    <v-avatar class="elevation-1" rounded="lg" size="91">
                        <v-img :src="appConfig.icon" />
                    </v-avatar>
                    <div class="header-right ml-4">
                        <span class="text-h6">{{ appConfig.name }}</span>
                        <span class="text-subtitle-1 v-list-item-subtitle">{{appConfig.version}}</span>
                        <v-btn class="downloadButton" variant="flat" color="primary">下载应用</v-btn>
                    </div>
                </div>
                <div class="py-2">
                    <v-card class="text-center summaryCard" :text="appConfig.summary" variant="tonal"></v-card>
                </div>
                <div class="py-2">
                    <span class="title">屏幕截图</span>
                </div>
                {{ $route.params.packageName }}
            </v-container>
        </v-main>
    </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { useTitle } from "@/events/title";
import { useStore } from '@/store/index'
import { useRoute } from "vue-router";
useTitle('应用浏览')

const mainStore = useStore()
const appConfig = ref({})
const route = useRoute()
onActivated(() => {
    let appConfigUrl = `${mainStore.APP_CONFIG_BASE_URL}/${route.params.packageName}.json`
    fetch(appConfigUrl)
        .then(response => response.json())
        .then((data) => {
            appConfig.value = data
        })

})


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

.downloadButton {
    height: 32px;
    width: 96px;
    margin-top: 8px;
}

.title {
    color: rgba(var(--v-theme-on-background));
    font-size: 1rem;
}
.summaryCard :deep(.v-card-text){
    font-size: 1rem;
}
</style>