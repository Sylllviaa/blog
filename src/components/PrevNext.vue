<template>
    <div class="prevnext">
        <el-button plain v-if="prev" class="prevnext-btn">上一篇:{{ prev.title }}</el-button>
        <el-button plain v-if="next" class="prevnext-btn">下一篇:{{ next.title }}</el-button>
    </div>
</template>
<script>
export default {
    name: 'PrevNext',
    props: ['prev', 'next']
};
</script>
<style lang='less' scoped>
.prevnext {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: .3704rem;

    .prevnext-btn {
        margin: 0;
        margin-bottom: .1852rem;
    }
}
</style>