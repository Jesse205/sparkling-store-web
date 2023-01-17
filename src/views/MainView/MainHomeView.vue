<script setup>
import { ref } from "vue";
import MyCarousel from "@/components/AppCarousel.vue"
import { useHomeTitle } from "@/events/title";
import { useHomeStore } from '@/store/home';

useHomeTitle('首页')
const homeStore = useHomeStore()
homeStore.loadAppConfig()



const pages = ref(50)
const page = ref(1)

</script>

<template>

    <v-container class="py-2">
        <!-- 轮播图 -->
        <div v-show="page == 1" class="py-2">
            <MyCarousel :items="homeStore.carousels" :aspect-ratio="homeStore.carouselRatio" />
        </div>
        <!-- 应用列表 -->
        <div class="py-2">
            <v-list border rounded="lg" lines="two">
                <v-list-item v-for="item in 10" :key="item" :title="item + 10 * (page - 1)"
                    subtitle="从 Androlua 过渡到 AndroidStudio" link>
                    <template v-slot:prepend>
                        <v-avatar class="elevation-1">
                            <v-img src="https://linguang.top/apps/image/aidelua.svg" />
                        </v-avatar>
                    </template>
                </v-list-item>
            </v-list>
        </div>

        <div class="text-center">
            <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
    </v-container>
</template>

<style scoped>

</style>