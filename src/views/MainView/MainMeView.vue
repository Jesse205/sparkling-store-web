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
                @click="userStore.loginState ? $router.push({ name: 'User' }) : userStore.login()">
                <template v-slot:append>
                    <v-icon style="height:40px" color="text-primary-lighten-1" icon="mdi-chevron-right"
                        variant="text" />
                </template>
            </v-list-item>
        </div>
    </v-container>
</template>