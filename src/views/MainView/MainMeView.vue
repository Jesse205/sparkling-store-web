<script setup>
import { inject, onActivated, onDeactivated } from "vue";
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const appName = inject('appName')
onActivated(() => {
    document.title = `我的-${appName}`
})

onDeactivated(() => {
    document.title = appName
})

</script>
<template>
    <div class="py-2">
        <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" link
            :prepend-avatar="userStore.avatar">
        </v-list-item>
    </div>
</template>