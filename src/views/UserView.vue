<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>用户信息</v-app-bar-title>
        </v-app-bar>
        <v-main>
            <v-container class="container">
                <div class="py-2">
                    <v-list-item lines="two" title="用户昵称" :subtitle="userStore.name || '未命名'" link />
                    <v-list-item lines="two" title="电子邮箱" :subtitle="userStore.email || '未知'" link />
                    <v-list-item lines="two" title="用户ID" :subtitle="userStore.uid || '未知'" link />
                </div>
            </v-container>
        </v-main>
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