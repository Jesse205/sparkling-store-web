<script setup>
import {  inject, onActivated, onDeactivated } from "vue";
import MyCarousel from "@/components/AppCarousel.vue"
import { useHomeStore } from '@/store/home';

const homeStore=useHomeStore()
const appName = inject('appName')
// const carousels = ref(null)
// const carouselRatio = ref(900 / 383)
// const page = ref(0)
homeStore.loadAppConfig()

onActivated(() => {
    document.title = `首页-${appName}`
})

onDeactivated(() => {
    document.title = appName
})

</script>

<template>
    <!-- 轮播图 -->
    <div class="py-2">
        <MyCarousel :items="homeStore.carousels" :aspect-ratio="homeStore.carouselRatio" />
    </div>

    <!-- 应用列表 -->
    <div class="py-2">
        <v-list border rounded="lg" lines="two">
            <v-list-item v-for="item in 10" title="Aide Lua Pro" :key="item" subtitle="从 Androlua 过渡到 AndroidStudio"
                link>
                <template v-slot:prepend>
                    <v-avatar class="elevation-1">
                        <v-img src="https://linguang.top/apps/image/Aide%20Lua%20Pro.svg" />
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
    </div>

    <!-- <div class="text-center">
        <v-pagination v-model="page" :length="6"></v-pagination>
    </div> -->
</template>

<style scoped>

</style>