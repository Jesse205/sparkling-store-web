<script setup>
import { sanitizeUrl } from "@braintree/sanitize-url"
defineProps({
    items: Object,
    aspectRatio: Number,
    cycle: {
        type: Boolean,
        default: true,
    },
    continuous: {
        type: Boolean,
        default: true
    },
    showArrows: {
        type: [Boolean, String],
        default: "hover"
    }
})
</script>

<template>
    <!-- 卡片提供边框 -->
    <v-card border rounded="lg" flat>
        <v-responsive :aspect-ratio="aspectRatio" :style="{ 'spect-ratio': aspectRatio }">
            <v-carousel :continuous="continuous" :show-arrows="showArrows" :cycle="cycle" hide-delimiters height="100%"
                v-bind="$attrs">
                <slot>
                    <v-carousel-item v-for="item in items" :key="item.src">
                        <!-- 自定义图片，支持链接点击与进度条 -->
                        <component :href="item.src ? sanitizeUrl(item.src) : null" :target="item.src ? '_blank' : null"
                            :is="item.src ? 'a' : 'div'">
                            <v-img :aspect-ratio="aspectRatio" :src="item.image" cover>
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular class="hideProgressUnderlay" indeterminate
                                            color="primary" />
                                    </div>
                                </template>
                            </v-img>
                        </component>
                    </v-carousel-item>
                </slot>
                <!-- 前进后退按钮 -->
                <template v-slot:prev="{ props }">
                    <v-btn class="carousel-button" :class="props.class" variant="text" @click="props.onClick"
                        color="primary" icon="mdi-chevron-left" size="large" />
                </template>
                <template v-slot:next="{ props }">
                    <v-btn class="carousel-button" :class="props.class" variant="text" @click="props.onClick"
                        color="primary" icon="mdi-chevron-right" size="large" />
                </template>
            </v-carousel>
        </v-responsive>
    </v-card>
</template>

<style scoped>
.carousel-button {
    height: 40px !important;
    width: 40px !important;
}
:deep(.v-window__container){
    height: 100% !important;
}
</style>