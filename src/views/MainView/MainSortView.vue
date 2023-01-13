<script setup>
import { inject, onActivated, onDeactivated } from "vue";
import { useHomeStore } from '@/store/home';

const appName = inject('appName')

const homeStore = useHomeStore()

onActivated(() => {
    document.title = `分类-${appName}`
    homeStore.fragmentTitle = '分类'
})

onDeactivated(() => {
    document.title = appName
    homeStore.fragmentTitle = null
})

</script>
<template>
    <div></div>
</template>