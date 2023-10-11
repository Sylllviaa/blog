<template>
    <div class="index">
        <IndexAnimation></IndexAnimation>
        <HeaderNav background="transparent"></HeaderNav>
        <div class="common">
            <div class="home">
                {{ info.introduction }}
            </div>
        </div>
        <Footer :fixed="true"></Footer>
        <div class="optionspanel">
            <Options></Options>
        </div>
    </div>
</template>
<script>
import IndexAnimation from '@/components/IndexAnimation.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import Options from '@/components/Options.vue';
import { mapState } from 'vuex';

let i = 0
let timer = null   //开启定时器实现打字机效果
export default {
    name: 'Index',
    components: {
        IndexAnimation,
        HeaderNav,
        Footer,
        Options,
    },
    mounted() {
        // this.typing()
        this.isOpenTyping();
    },
    data() {
        return {
            info: {
                introduction: '',
                introductionTarget: 'There is a kind of call to eat together.'
            }
        }
    },
    computed: {
        ...mapState('homeOptions', ['effects', 'introduction']),
    },
    methods: {
        typing() {
            if (i < this.info.introductionTarget.length) {
                this.info.introduction = this.info.introductionTarget.slice(0, i + 1).concat('_')
                i++
                timer = setTimeout(this.typing, 100)
            }
            else {
                this.info.introduction = this.info.introductionTarget
                clearTimeout(timer)
            }
        },
        isOpenTyping() {
            //是否开启打字机效果
            if (this.effects) {
                //开启
                this.$set(this.info, 'introductionTarget', this.introduction);
                this.typing();
            }
            else {
                //关闭
                this.$set(this.info, 'introduction', this.introduction);
            }
        }
    },
};
</script>
<style lang='less' scoped>
.index {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: pink;
}

.home {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 0.48rem;
    font-weight: 700;
}

.optionspanel {
    position: fixed;
    top: 100px;
    left: 20px;
}
</style>