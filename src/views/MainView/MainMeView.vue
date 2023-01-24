<script setup>
import { useUserStore } from '@/store/user';
import { useHomeTitle } from "@/events/title";
useHomeTitle('我的')

const userStore = useUserStore()

</script>
<template>
    <v-container class="py-2 container">
        <div class="py-2">
            <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" :subtitle="userStore.email" link
                @click="userStore.loginState ? $router.push({ name: 'User' }) : userStore.login()"
                append-icon="mdi-chevron-right">
                <template v-slot:prepend>
                    <v-avatar class="border" size="56">
                        <v-img :src="userStore.avatar" />
                    </v-avatar>
                </template>
            </v-list-item>
        </div>

        <!-- 用户面板 -->
        <div class="py-2 list-item-primaryIcon">
            <v-list border rounded="lg">
                <v-list-item title="我的关注" link prepend-icon="mdi-apps" append-icon="mdi-chevron-right"
                    :to="{ name: 'Watched' }" />
                <template v-if="userStore.loginState">
                    <v-list-item title="我的应用" link prepend-icon="mdi-apps" append-icon="mdi-chevron-right" />
                </template>
            </v-list>
        </div>

        <!-- 软件面板 -->
        <div class="py-2 list-item-primaryIcon">
            <v-list border rounded="lg" color="primary">
                <v-list-item title="设置" link prepend-icon="mdi-cog-outline" append-icon="mdi-chevron-right" />
                <v-list-item title="关于" link prepend-icon="mdi-information-outline" append-icon="mdi-chevron-right" />
            </v-list>
        </div>
    </v-container>
</template>
<style scoped>
@media (min-width: 1280px) {
    .v-container {
        max-width: 1200px;
    }
}
</style>