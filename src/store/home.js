import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('home', () => {
    const APP_CONFIG_URL = '/api/homeconfig.json'
    const config = ref(null)
    const carousels = ref()
    const carouselRatio = ref(2.25)// 默认2.25
    function loadAppConfig() {
        fetch(APP_CONFIG_URL)
            .then(response => response.json())
            .then((data) => {
                config.value = data.data
                carousels.value = data.data.banners.data
                carouselRatio.value = data.data.banners.ratio
            })
            .catch((error) => {
                console.error(error);
            })
    }
    return {
        config,
        carousels,
        carouselRatio,
        loadAppConfig
    }
})
