<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>用户信息</v-app-bar-title>
        </v-app-bar>
        <AppMain>
            <v-container class="container list-item-primaryIcon">
                <v-list>
                    <v-list-item lines="two" title="用户昵称" :subtitle="userStore.name || '未命名'"
                        prepend-icon="mdi-account-outline" link />
                    <v-list-item lines="two" title="电子邮箱" :subtitle="userStore.email || '未知'" link
                        prepend-icon="mdi-email-outline" />
                    <v-list-item lines="two" title="用户ID" :subtitle="userStore.uid || '未知'" link
                        prepend-icon="mdi-identifier" />
                </v-list>
            </v-container>
        </AppMain>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useTitle } from "@/events/title";
useTitle('用户信息')

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.container {
    padding: 0;
}
</style>