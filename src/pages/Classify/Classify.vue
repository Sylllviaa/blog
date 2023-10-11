<template>
    <div class="classify" :style="{ background: `url(${categoriesBgImg[0].imgUrl}) top left repeat` }">
        <HeaderNav background="transparent"></HeaderNav>
        <div class="content">
            <router-view></router-view>
            <ul class="grid" :class="{ 'grid-mobile': !isPC }" v-show="menuOrDetail">
                <li v-for="m in classifyMenu" :class="m.classArrow" @click.prevent="goDetail(m)" :key="m.catagory">
                    <span :data-letter="m.alph">{{ m.alph }}</span>
                    <i>{{ m.title }}</i>
                </li>
            </ul>
            <Footer :fixed="isPC"></Footer>
        </div>
    </div>
</template>
<script>
import '@/css/component.css'
import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import { isPC } from '@/utils';
import { getCategories } from '@/request/api/categories';
import { mapState } from 'vuex';

export default {
    name: 'Classify',
    components: {
        HeaderNav,
        Footer,
    },
    data() {
        return {
            classifyMenu: [
                { catagory: '001', title: '-', alph: 'T', classArrow: 'ot-letter-left' },
                { catagory: '002', title: '-', alph: 'L', classArrow: 'ot-letter-top' },
                { catagory: '003', title: '-', alph: 'P', classArrow: 'ot-letter-right' },
                { catagory: '004', title: '-', alph: 'O', classArrow: 'ot-letter-bottom' },
            ],
        }
    },
    methods: {
        goDetail(m) {
            this.$router.push({
                name: 'classifyDetail',
                query: {
                    category: m.title,
                }
            })
        },
        getTitle: async () => {
            const res = await getCategories()
            return res.data.data.list;
        }
    },
    computed: {
        menuOrDetail() {
            if (this.$route.name === 'classify') {
                return true
            }
            if (this.$route.name === 'classifyDetail') {
                return false
            }
        },
        ...mapState('homeOptions', ['categoriesBgImg']),
    },
    mounted() {
        this.getTitle().then((res) => {
            res.forEach((item, index) => {
                this.classifyMenu[index].catagory = item._id;
                this.classifyMenu[index].title = item.name;
            })
        })
    }
};
</script>
<style lang='less' scoped>
.classify {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url(@/assets/yinibg1.jpg) top left repeat;

    .content {
        position: absolute;
        top: 1.2037rem;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: .3704rem;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .grid {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;

        li {
            border-radius: .2778rem;
        }

        .ot-letter-left {
            background: url(@/assets/jishu.jpg);
            background-size: cover;
        }

        .ot-letter-top {
            background: url(@/assets/shenghuo.jpg);
            background-size: cover;
        }

        .ot-letter-right {
            background: url(@/assets/zhanpian.jpg);
            background-size: cover;
        }

        .ot-letter-bottom {
            background: url(@/assets/qita.jpg);
            background-size: cover;
        }
    }

    .grid li {
        display: flex;
        flex-direction: column;

        i {
            font-size: 0.5rem;
        }
    }

    .grid-mobile {
        flex-direction: column;
        padding: 1.4815rem 0;
    }
}
</style>