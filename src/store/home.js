import { defineStore } from 'pinia';
import { ref, inject } from 'vue';

export const useHomeStore = defineStore('home', () => {
    const apiBaseUrl = inject('apiBaseUrl')
    const APP_CONFIG_URL = apiBaseUrl + 'homeconfig.json'
    const config = ref(null)
    const carousels = ref()
    const carouselRatio = ref(2.3)// 默认2.3

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

    const fragmentTitle = ref('')
    return {
        config,
        carousels,
        carouselRatio,
        loadAppConfig,
        fragmentTitle
    }
})
