<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>我的关注</v-app-bar-title>
        </v-app-bar>
        <AppMain>
            <v-container class="container list-item-primaryIcon">
                <v-list>
                    <!-- eslint-disable-next-line vue/valid-v-for -->
                    <AppItem v-for="item in watchedApps" :item="item" />
                </v-list>
            </v-container>
        </AppMain>
    </div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { useTitle } from "@/events/title";
import AppItem from '@/components/AppItem.vue'
import { useAppsStore } from '@/store/apps'

useTitle('我的关注')

const appsStore = useAppsStore()
const watchedApps = ref()

function refresh() {
    watchedApps.value = null
    let watchedList = JSON.parse(localStorage.getItem('watchedList'))
    let appConfigs = []
    if (watchedList) {
        for (let index in watchedList) {
            appConfigs.push(appsStore.getAppConfig(watchedList[index]))
        }
    }
    watchedApps.value = appConfigs
}

onActivated(refresh)
</script>

<style lang="scss" scoped>
.container {
    padding: 0;
}
</style>