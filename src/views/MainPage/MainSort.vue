<script setup>
import { inject, onActivated, onDeactivated } from "vue";

const appName = inject('appName')
onActivated(() => {
    document.title = `分类-${appName}`
})

onDeactivated(() => {
    document.title = appName
})
</script>
<template>
    <div></div>
</template>