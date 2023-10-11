<template>
    <div class="label" :style="{ background: `url(${tagsBgImg[0].imgUrl}) top left repeat` }">
        <HeaderNav background="transparent"></HeaderNav>
        <div class="content">
            <router-view></router-view>
            <div class="tags-wap tagcloud" v-show="menuOrDetail">
                <a class="tag" v-for="(t, index) in tags" :key="t._id" @click="goDetail(t)">
                    <el-tag :color="t.color" :hit="false" effect="plain">{{ t.name }}({{ t.articleNum }})</el-tag>
                </a>
            </div>
        </div>
        <Footer :fixed="true"></Footer>
    </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import { randomColor } from '@/utils/index';
import { getTags } from '@/request/api/tags';
import { mapState } from 'vuex';

export default {
    name: 'Label',
    components: {
        HeaderNav,
        Footer,
    },
    data() {
        return {
            tags: [],
        }
    },
    created() {
        this.getLabels().then((res) => {
            if (res) {
                //如果有标签
                const list = res.filter((item) => item.status === true)
                if (list) {
                    //如果有启用的标签
                    list.forEach((item) => {
                        this.tags.push({
                            _id: item._id,
                            name: item.name,
                            articleNum: item.articleNum,
                            color: randomColor(),
                        })
                    });
                }
            }
        });
    },
    updated() {
        window.tagcloud(window, document)({
            selector: '.tagcloud', //元素选择器
            fontSize: 16, //基本字体大小
            radius: 100, //滚动半径
            mspeed: 'normal', //滚动最大速度
            ispeed: 'normal', //滚动初始速度
            direction: 135, //初始滚动方向
            keep: false, //鼠标移出后是否继续随鼠标滚动
        });
    },
    methods: {
        goDetail(t) {
            this.$router.push({
                name: 'labelDetail',
                query: {
                    tag: t.name,
                }
            })
        },
        getLabels: async () => {
            const res = await getTags();
            return res.data.data ? res.data.data.list : [];
        }
    },
    computed: {
        menuOrDetail() {
            if (this.$route.name === 'label') {
                return true
            }
            if (this.$route.name === 'labelDetail') {
                return false
            }
        },
        ...mapState('homeOptions', ['tagsBgImg']),
    }
};
</script>
<style lang='less' scoped>
.label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url(@/assets/genbkgtile.jpg) top left repeat;

    .content {
        position: absolute;
        top: 1.2037rem;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: .3704rem;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tags-wap {
        padding: 0 .5556rem;
        width: 70%;
        height: 100%;

        .tag {
            margin-right: .5556rem;
            margin-bottom: .5556rem;
        }

        /deep/.el-tag--plain {
            color: #fff;
            border-color: transparent;
        }

        /deep/.el-tag {
            border-radius: .2778rem;
        }
    }
}
</style>