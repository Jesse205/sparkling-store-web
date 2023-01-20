<script setup>
import { useUserStore } from '@/store/user';
import { useHomeTitle } from "@/events/title";
useHomeTitle('我的')

const userStore = useUserStore()

</script>
<template>
    <v-container class="py-2">
        <div class="py-2">
            <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" :subtitle="userStore.email" link
                :prepend-avatar="userStore.avatar"
                @click="userStore.loginState ? $router.push({ name: 'User' }) : userStore.login()"
                append-icon="mdi-chevron-right" />
        </div>

        <!-- 用户面板 -->
        <div v-if="userStore.loginState" class="py-2 list-item-primaryIcon">
            <v-list border rounded="lg">
                <v-list-item title="应用管理" link prepend-icon="mdi-apps" append-icon="mdi-chevron-right" />
            </v-list>
        </div>

        <!-- 软件面包 -->
        <div class="py-2 list-item-primaryIcon">
            <v-list border rounded="lg" color="primary">
                <v-list-item title="设置" link prepend-icon="mdi-cog-outline" append-icon="mdi-chevron-right" />
                <v-list-item title="关于" link prepend-icon="mdi-information-outline" append-icon="mdi-chevron-right" />
            </v-list>
        </div>
    </v-container>
</template>
