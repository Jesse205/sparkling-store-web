<script setup>
import { inject, onActivated, onDeactivated } from "vue";
import { useUserStore } from '@/store/user';
import { useHomeStore } from '@/store/home'

const appName = inject('appName')

const userStore = useUserStore()

const homeStore = useHomeStore()

onActivated(() => {
    document.title = `我的-${appName}`
    homeStore.fragmentTitle='我的'
})

onDeactivated(() => {
    document.title = appName
})

</script>
<template>
    <div class="py-2">
        <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" link :prepend-avatar="userStore.avatar">
        </v-list-item>
    </div>
</template>