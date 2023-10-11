<template>
    <div class="notfound">
        <div class="warning">
            404 NotFound
        </div>
        <div class="goIndex" @click="goIndex">
            <el-button plain>返回主页</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
    methods: {
        goIndex() {
            this.$router.push({
                name: 'index',
                path: '/index',
            })
        }
    },
};
</script>
<style lang='less' scoped>
.notfound {
    text-align: center;
}

.warning {
    font-size: .5556rem;
    margin: .5556rem 0;
}
</style>