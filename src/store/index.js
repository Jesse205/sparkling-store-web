import { defineStore } from 'pinia';
import { inject } from 'vue';

export const useStore = defineStore('main', () => {
    const apiBaseUrl = inject('apiBaseUrl')
    const TODAY_APPS_URL = apiBaseUrl + 'today.json'
    const APP_CONFIG_BASE_URL = apiBaseUrl + 'apps'
    return {
        TODAY_APPS_URL,
        APP_CONFIG_BASE_URL
    }
})
