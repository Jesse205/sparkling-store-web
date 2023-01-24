<script setup>
import { ref } from "vue";
import { useHomeTitle } from "@/events/title";
import { useStore } from '@/store/index'
import { useAppsStore } from '@/store/apps'

useHomeTitle('分类')
const apps = ref([])
const mainStore = useStore()
const appsStore = useAppsStore()

fetch(mainStore.ALL_APPS_URL)
    .then(response => response.json())
    .then((data) => {
        if (data.state == 200) {
            let groupsList = data.data
            for (let index in groupsList) {
                let groupConfig = groupsList[index]
                let appsGroupConfig = groupConfig.apps
                let appGroup = ref([])

                for (let index in appsGroupConfig) {
                    let packageName = appsGroupConfig[index]
                    appGroup.value.push(appsStore.getAppConfig(packageName))
                }
                apps.value.push({ name: groupConfig.name, summary: groupConfig.summary, apps: appGroup })
            }
        }
    })
    .catch((error) => {
        console.error(error);
    })

</script>
<template>
    <v-container class="py-2">
        <div v-for="group in apps" :key="group.name" class="group py-2">
            <div class="text-h6">{{ group.name }}</div>
            <div class="text-subtitle-1" style="opacity: 0.62;">{{ group.summary }}</div>
            <v-lazy>
                <v-card border rounded="lg" flat class="groupCard">
                    <v-row no-gutters cols="false">
                        <!-- eslint-disable-next-line vue/valid-v-for -->
                        <v-col v-for="item in group.apps" class="app-col">
                            <router-link :to="`/app/${item.packageName}`" v-ripple
                                class="rounded-lg px-2 app-col-content text-center">
                                <v-img :src="item.icon" class="icon elevation-1 rounded-lg" />
                                <div class="appName text-center">{{ item.name }}</div>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-card>
            </v-lazy>
        </div>
    </v-container>
</template>

<style scoped lang="scss">
.group>span {
    margin: 0 8px;
}

.groupCard {
    padding: 8px;
}

.icon {
    margin: 8px auto;
    margin-top: 0;
    width: 80%;
}

.icon>img {
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
}

.app-col {
    width: calc(100%/4);
    flex: 0 0 calc(100%/4);
}

.appName {
    display: block;
    height: 40px;
    overflow: hidden;
    width: 100%;
    font-size: 16px;
    line-height: 1.15;
}

.app-col-content {
    display: block;
    padding-top: 8px;
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    text-decoration: none;
}

@media(min-width: 600px) {
    .app-col {
        width: calc(100%/6);
        flex: 0 0 calc(100%/6);
    }
}

/* @media(min-width: 960px) {
    .app-col {
        width: calc(100%/8);
        flex: 0 0 calc(100%/8);
    }
} */
@media(min-width: 1264px) {
    .app-col {
        width: calc(100%/8);
        flex: 0 0 calc(100%/8);
    }
}

@media(min-width: 1904px) {
    .app-col {
        width: calc(100%/12);
        flex: 0 0 calc(100%/12);
    }
}
</style>