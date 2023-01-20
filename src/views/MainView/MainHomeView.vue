<script setup>
import { ref, watchEffect, watch } from "vue";
import MyCarousel from "@/components/AppCarousel.vue"
import { useHomeTitle } from "@/events/title";
import { useHomeStore } from '@/store/home';
import { useAppsStore } from '@/store/apps'
import { useStore } from '@/store/index'

useHomeTitle('首页')
const homeStore = useHomeStore()
homeStore.loadAppConfig()

const maxItems = 20
const pages = ref(1)
const page = ref(1)
const todayAppPackages = ref([])

const mainStore = useStore()
const appsStore = useAppsStore()

fetch(mainStore.TODAY_APPS_URL)
    .then(response => response.json())
    .then((data) => {
        if (data.state == 200) {
            // 获取页数
            pages.value = Math.ceil(data.data.length / maxItems)
            let appPackageNamesList = data.data
            for (let index in appPackageNamesList) {
                let packageName = appPackageNamesList[index]
                todayAppPackages.value.push(packageName)
            }

        }
    })
    .catch((error) => {
        console.error(error);
    })

const nowTodayPageList = ref([])

watchEffect(() => {
    let nowPackageNamesList = todayAppPackages.value.slice((maxItems) * (page.value - 1), (maxItems) * (page.value))
    let newList = []
    for (let index in nowPackageNamesList) {
        // 不能写成一行
        let config = appsStore.getAppConfig(nowPackageNamesList[index])
        newList.push(config)
    }
    nowTodayPageList.value = newList
})

watch(page, () => {
    
    document.getElementById('homeContent').scrollTo(0,0)
})

</script>

<template>

    <v-container class="py-2">
        <!-- 轮播图 -->
        <div v-show="page == 1" class="py-2">
            <MyCarousel :items="homeStore.carousels" :aspect-ratio="homeStore.carouselRatio" />
        </div>

        <!-- 应用列表 -->
        <div v-if="todayAppPackages" class="py-2">
            <v-list border rounded="lg" lines="two">
                <v-list-subheader>最近更新</v-list-subheader>
                <!-- eslint-disable-next-line vue/valid-v-for -->
                <v-list-item v-for="item in nowTodayPageList" :title="item.name" :subtitle="item.summary"
                    :to="`/app/${item.packageName}`">
                    <template v-slot:prepend>
                        <v-avatar class="elevation-1" rounded="lg">
                            <v-img :src="item.icon" />
                        </v-avatar>
                    </template>
                </v-list-item>
            </v-list>
        </div>

        <div v-if="pages != 1" class="text-center">
            <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
    </v-container>

</template>

<style scoped>

</style>