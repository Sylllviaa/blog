<template>
    <div class="footer" :class="{ 'fixed-footer': fixed }">
        <div class="copyright">
            <a href="http://beian.miit.gov.cn/">Copyright 2023 Slyvia · ICP备</a>
        </div>
        <div>本系统由Vue和ElementUI提供技术支持</div>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    props: {
        fixed: {
            type: Boolean,
            default: false,   //默认是False，只有在首页等没有滚动条的地方传一下true
        }
    }
};
</script>
<style lang='less' scoped>
.footer {
    width: 100%;
    font-size: .3rem;
    margin: .5556rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .copyright {
        margin-bottom: .1852rem;

        a {
            color: inherit;
        }
    }
}

.fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9999;
}
</style>