<template>
    <v-main>
        <div id="mainContent">
            <slot />
        </div>
    </v-main>
</template>
<style lang="scss">
html {
    overflow-y: hidden !important;
}

.v-main {
    position: fixed;
    height: 100%;
    width: 100%;
}

// 区域滚动
.v-main>#mainContent {
    overflow-y: auto;
    height: calc(100%);
    transform: translateZ(0);// 用于开启硬件加速
}
</style>