<script setup>
import { ref, inject, computed } from "vue";
import MyCarousel from "@/components/AppCarousel.vue"
import { useHomeTitle } from "@/events/title";
import { useHomeStore } from '@/store/home';

useHomeTitle('首页')
const homeStore = useHomeStore()
homeStore.loadAppConfig()

const apiBaseUrl = inject('apiBaseUrl')

const maxItems = 20
const pages = ref(1)
const page = ref(1)
const todayApps = ref(null)

const TODAY_APPS_URL = apiBaseUrl + 'today.json'
fetch(TODAY_APPS_URL)
    .then(response => response.json())
    .then((data) => {
        if (data.state == 200) {
            pages.value = Math.ceil(data.data.length / maxItems)
            todayApps.value = data.data
        }
    })
    .catch((error) => {
        console.error(error);
    })

const nowTodayPageList = computed(() => {
    return todayApps.value.slice((maxItems + 1) * (page.value - 1), (maxItems + 1) * (page.value))
})

</script>

<template>

    <v-container class="py-2">
        <!-- 轮播图 -->
        <div v-show="page == 1" class="py-2">
            <MyCarousel :items="homeStore.carousels" :aspect-ratio="homeStore.carouselRatio" />
        </div>

        <!-- 应用列表 -->
        <div v-if="todayApps" class="py-2">
            <v-list border rounded="lg" lines="two">
                <v-list-subheader>最近更新</v-list-subheader>
                <v-list-item v-for="item in nowTodayPageList" :key="item.name" :title="item.name"
                    :subtitle="item.summary" :to="`/app/${item.package_name}`">
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