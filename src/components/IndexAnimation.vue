<template>
    <canvas class="index-canvas" ref="canvas"></canvas>
</template>
<script>

import { index_fullScreenAnimation } from '../utils/index'
export default {
    name: 'IndexAnimation',
    mounted() {
        console.log(this);
        index_fullScreenAnimation(this.$refs.canvas)
    },
};
</script>
<style lang='less' scoped>
.index-canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
</style>