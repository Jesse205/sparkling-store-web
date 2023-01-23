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
                apps.value.push({ name: groupConfig.name, apps: appGroup })
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
            <span class="text-h6">{{ group.name }}</span>
            <v-lazy>
                <v-card border rounded="lg" flat class="groupCard">
                    <v-row no-gutters cols="false">
                        <!-- eslint-disable-next-line vue/valid-v-for -->
                        <v-col v-for="item in group.apps" v-ripple class="rounded-lg pa-2 text-center app-col">
                            <v-card rounded="lg" class="icon">
                                <v-img :src="item.icon" aspect-ratio="1" />
                            </v-card>
                            {{ item.name }}
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
    margin: 8px;

}

.app-col {
    width: calc(100%/4);
    flex: 0 0 calc(100%/4);
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