<script setup>
defineProps({
    item: Object,
})
</script>
<template>
    <v-list-item lines="two" :title="item.name" :subtitle="item.summary" :to="`/app/${item.packageName}`">
        <template v-slot:prepend>
            <v-avatar class="elevation-1" rounded="lg" size="48">
                <v-img :src="item.icon" />
            </v-avatar>
        </template>
        <slot/>
    </v-list-item>
</template>