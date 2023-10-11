<template>
    <div class="header" :style="{ backgroundColor: background }">
        <div class="headerNav" v-show="isPC">
            <div class="left">
                <div class="nickname" :style="{ color: primaryColor }">{{ nickName }}</div>
            </div>
            <div class="right">
                <el-menu :default-active="$route.matched[0].path" class="el-menu-demo" mode="horizontal"
                    @select="handleSelect" :router="true" :background-color="background" :text-color="primaryColor"
                    :active-text-color="activeColor">
                    <el-menu-item v-for="(m, index) in menuArr" :index="m.path" :key="index
                        ">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="m.icon"></use>
                        </svg>
                        <span>{{ m.name }}</span>
                    </el-menu-item>
                    <!-- <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zhuti"></use>
                            </svg>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>白天</el-dropdown-item>
                            <el-dropdown-item>夜晚</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <!-- <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-avatar shape="circle" :size="25" fit="fit" :src="url"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </el-menu>
            </div>
        </div>

        <div class="mobile" v-show="!isPC">
            <el-menu :default-active="$route.matched[0].path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                :router="true" :background-color="background" :text-color="primaryColor" :active-text-color="activeColor">
                <el-menu-item v-for="(m, index) in menuArr" :index="m.path" :key="index
                    ">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="m.icon"></use>
                    </svg>
                </el-menu-item>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zhuti"></use>
                        </svg>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>白天</el-dropdown-item>
                        <el-dropdown-item>夜晚</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <el-avatar shape="circle" :size="25" fit="fit" :src="url"></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu>
        </div>

        <el-backtop :target="backTopTarget" :right="60" :bottom="20"></el-backtop>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'HeaderNav',
    props: {
        lightIndex: {
            type: Number,
            default: 0
        },
        background: {
            type: String,
        },
        primaryColor: {
            type: String,
            default: '#fff'
        },
        activeColor: {
            type: String,
            default: '#00e676'
        },
        backTopTarget: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            menuArr: [
                {
                    path: '/index',
                    name: '首页',
                    icon: '#icon-shouye',
                },
                {
                    path: '/article',
                    name: '文章',
                    icon: '#icon-16',
                },
                {
                    path: '/timeline',
                    name: '时间线',
                    icon: '#icon-shijianxian',
                },
                {
                    path: '/classify',
                    name: '分类',
                    icon: '#icon-grouping',
                },
                {
                    path: '/label',
                    name: '标签',
                    icon: '#icon-biaoqian',
                },
                {
                    path: '/about',
                    name: '关于',
                    icon: '#icon-guanyu',
                }
            ],
            url: 'https://himg.bdimg.com/sys/portrait/item/public.1.a2319588.wosZ-AsrKFKzRa0bt0MVEA.jpg',
        }
    },
    computed: {
        ...mapState('userOptions', ['nickName']),
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    // mounted() {
    //     console.log(this.$route.matched[0].path);
    // }
};
</script>
<style lang='less' scoped>
.headerNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.2037rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;

    .icon {
        fill: #fff;
    }

    .left {
        display: flex;
        align-items: center;
        justify-content: left;
        padding-left: .7407rem;

        .nickname {
            font-size: .6481rem;
            font-weight: 300;
            width: 7.4074rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }
    }

    .right {
        padding-right: .7407rem;

        .el-menu {
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: none;
        }

        .el-menu-item {
            padding: 0 .3704rem;

            .icon {
                margin-right: .1852rem;
            }
        }

        .el-dropdown {
            padding: 0 .3704rem;
        }
    }
}

.mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;

    .el-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: none;
    }

    .el-menu-item {
        padding: 0;
        text-align: center;
    }

    .el-dropdown {
        text-align: center;
    }
}
</style>