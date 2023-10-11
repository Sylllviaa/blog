<template>
    <div class="about">
        <HeaderNav background="transparent"></HeaderNav>
        <div class="carousel" v-if="isPC">
            <el-carousel indicator-position="none" arrow="never">
                <el-carousel-item v-for="bg in bgImgArr" :key="bg._id">
                    <img :src="bg.imgUrl" alt="background">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="carousel" v-if="!isPC">
            <el-carousel indicator-position="none" arrow="never">
                <el-carousel-item>
                    <img src="../../assets/pt1.jpg" alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../../assets/pt2.jpg" alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../../assets/pt3.jpg" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="content">
            <el-card class="box-card">
                <el-avatar shape="circle" :size="100" fit="fill" :src="avatar" class="card-avatar"></el-avatar>
                <div class="text">
                    {{ aboutInfo.desc }}
                </div>
                <div class="card-tags">
                    <a class="tag" v-for="(t, index) in tags" :key="index">
                        <el-tag :color="t.color" :hit="false" effect="plain">{{ t.name }}</el-tag>
                    </a>
                </div>
            </el-card>
            <div class="friendship">
                <a class="item" :href="github" target="_blank">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-github-fill"></use>
                    </svg>
                    <span>GitHub</span>
                </a>
                <a class="item" :href="gitee" target="_blank">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gitee"></use>
                    </svg>
                    <span>Gitee</span>
                </a>
                <!-- <a class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                    <span>WeChat</span>
                </a> -->
            </div>
        </div>

        <Footer :fixed="true"></Footer>
    </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import { randomColor } from '@/utils/index';
import { getAbout } from '@/request/api/about';
import { mapState } from 'vuex';

export default {
    name: 'About',
    components: {
        HeaderNav,
        Footer,
    },
    data() {
        return {
            aboutInfo: {
                desc: '',
                // avatar: 'https://himg.bdimg.com/sys/portrait/item/public.1.a2319588.wosZ-AsrKFKzRa0bt0MVEA.jpg',
            },
            bgImgArr: [],
            tags: [],
        }
    },
    computed: {
        ...mapState('userOptions', ['avatar', 'github', 'gitee']),
    },
    methods: {
        getAboutDetail: async () => {
            const res = await getAbout();
            console.log('res', res);
            return res.data.data ? res.data.data : {};
        }
    },
    mounted() {
        this.getAboutDetail().then((data) => {
            this.$set(this.aboutInfo, 'desc', data.desc);
            data.tags.forEach((item) => {
                this.tags.push({
                    name: item,
                    color: randomColor(),
                })
            });
            data.imgs.forEach((item) => {
                this.bgImgArr.push(item);
            })
        })
    },
    // mounted() {
    //     this.resizeHandler()
    //     window.addEventListener('resize', this.resizeHandler)
    //     console.log(this.carouselHeight);
    // },
    // methods: {
    //     resizeHandler() {
    //         this.carouselHeight = window.innerHeight + 'px'
    //     }
    // },
    // beforeDestroy() {
    //     window.removeEventListener('resize', this.resizeHandler)
    // }

};
</script>
<style lang='less' scoped>
.about {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .carousel {
        width: 100%;
        height: 100%;

        .el-carousel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -999;

            /deep/.el-carousel__container {
                height: 100%;
            }
        }

        img {
            width: 100%;
            height: 100%;
        }

    }

    .content {
        position: absolute;
        top: 1.2037rem;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding-top: .7407rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        /deep/.box-card {
            width: 60%;
            position: relative;

            .el-card__body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .text {
                margin: .1852rem 0;
                font-size: .2593rem;
            }

            .card-tags {
                .tag {
                    display: inline-block;
                    margin: .1852rem;
                }

            }
        }

        .friendship {
            display: flex;
            margin-top: .3704rem;

            .item {
                width: 1.4815rem;
                height: 1.4815rem;
                font-size: .2963rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;

                .icon {
                    width: .9259rem;
                    height: .9259rem;
                }
            }
        }
    }

    //修改标签的颜色、边框等
    /deep/.el-tag--plain {
        color: #fff;
        border-color: transparent;
    }

    /deep/.el-tag {
        border-radius: .2778rem;
    }

}
</style>