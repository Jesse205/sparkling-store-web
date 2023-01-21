import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStore } from '@/store/index';

export const useAppsStore = defineStore('apps', () => {
    const appsCache = {}
    const mainStore = useStore()

    function getAppConfig(packageName,force) {
        let config = appsCache[packageName]
        if (config == null || force) {
            // 应用配置url
            let appConfigUrl = `${mainStore.APP_CONFIG_BASE_URL}/${packageName}.json`
            let name = ref() // 应用名
            let icon = ref() // 图标
            let summary = ref()
            config = { name, icon, summary, packageName }
            // appsCache[packageName] = config
            fetch(appConfigUrl)
                .then(response => response.json())
                .then((data) => {
                    name.value = data.name
                    icon.value = data.icon
                    summary.value = data.summary
                })
        }
        return config
    }

    let clearConfigsCache = () => {
        for(let key in appsCache){
            delete appsCache[key];
        }
    }

    return {
        getAppConfig,
        clearConfigsCache
    }
})
