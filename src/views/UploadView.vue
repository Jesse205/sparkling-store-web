<template>
    <div>
        <v-app-bar flat border="b" hideOnScroll>
            <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
            <v-app-bar-title>上传应用</v-app-bar-title>

        </v-app-bar>
        <v-main>
            upload
        </v-main>
    </div>
</template>

<script setup>
import { useTitle } from "@/events/title";
useTitle('上传应用')

</script>

<style lang="scss" scoped>

</style>