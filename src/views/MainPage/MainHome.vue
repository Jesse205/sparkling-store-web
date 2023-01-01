<script setup>
import { ref, inject, onActivated, onDeactivated } from "vue";
import MyCarousel from "@/components/AppCarousel.vue"

const appName = inject('appName')
const carousels = [
    {
        image: 'https://linguang.top/Banner/banner1.png',
        src: ''
    },
    {
        image: 'https://linguang.top/Banner/banner2.png',
        src: ''
    },
    {
        image: 'https://linguang.top/Banner/banner3.png',
        src: 'https://bwcxlg.top/'
    }
]
const carouselRatio = 900 / 383
const page = ref(0)

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
        <MyCarousel :items="carousels" :aspect-ratio="carouselRatio" />
    </div>
    <!-- 应用列表 -->
    <div class="py-2">
        <v-list border class="rounded-lg">
            <v-list-item v-for="item in 10" title="Aide Lua Pro" :key="item" subtitle="从 Androlua 过渡到 AndroidStudio"
                class="py-4" link>
                <template v-slot:prepend>
                    <v-avatar class="elevation-1">
                        <v-img src="https://linguang.top/apps/image/Aide%20Lua%20Pro.svg" />
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
    </div>
    <div class="text-center">
        <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
</template>

<style scoped>

</style>