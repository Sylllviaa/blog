<template>
    <div class="rightConfig">
        <!-- <el-card class="friends">
            <div class="title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lianjie"></use>
                </svg>
                <span>友情链接</span>
            </div>
            <div class="f-items">
                <div class="item">
                    <el-avatar shape="square" :size="50" fit="fit" :src="url"></el-avatar>
                    <span class="friend-name">孙词的博客</span>
                </div>
                <div class="item">
                    <el-avatar shape="square" :size="50" fit="fit" :src="url"></el-avatar>
                    <span class="friend-name">孙词的博客</span>
                </div>
            </div>
        </el-card> -->
        <el-card class="recommend">
            <div class="title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tuijian"></use>
                </svg>
                <span>推荐网站</span>
            </div>
            <div class="r-items">
                <a class="r-item" :href="r.link" v-for="r in list" :key="r._id">
                    <div class="mark" :style="{ backgroundColor: r.color }"></div>
                    <span>{{ r.name }}</span>
                </a>
            </div>
        </el-card>
    </div>
</template>
<script>

import { randomColor } from '@/utils/index';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'RightConfig',
    data() {
        return {
            // url: 'https://himg.bdimg.com/sys/portrait/item/public.1.a2319588.wosZ-AsrKFKzRa0bt0MVEA.jpg',
        }
    },
    computed: {
        ...mapState('recommendOptions', ['list']),
    },
    methods: {
        ...mapActions('recommendOptions', ['getRecommends']),
    },
    mounted() {
        this.getRecommends();
    },

};
</script>
<style lang='less' scoped>
.rightConfig {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 100%;
        height: .5556rem;
        border-bottom: 1px solid #ccc;
        line-height: .5556rem;
    }

    .friends {
        width: 50%;

        .f-items {
            .item {
                padding-top: .1852rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        }
    }

    .recommend {
        margin-top: .3704rem;
        width: 50%;

        .r-items {
            .r-item {
                padding-top: .1852rem;
                display: flex;
                align-items: center;
                color: #000;

                &:hover {
                    color: #00e676;
                }
            }

            .mark {
                width: .0926rem;
                height: .0926rem;
                margin-right: .1852rem;
            }
        }
    }
}
</style>