<template>
    <div class="article" :style="{ background: `url(${articlesBgImg[0].imgUrl}) top left repeat` }">
        <HeaderNav background="transparent" backTopTarget=".content"></HeaderNav>
        <div class="detail" v-show="!menuOrDetail">
            <router-view></router-view>
        </div>
        <div class="content" v-show="menuOrDetail">
            <RightConfig v-show="isPC" class="right"></RightConfig>
            <div class="left">
                <el-card class="article-card" v-for="l in info.list" :key="l._id" @click.native="goDetail(l)">
                    <div class="cover" v-show="isPC">
                        <el-image :src="l.cover" lazy fit="fill">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </div>
                    <div class="card-box" :style="{ width: isPC ? '60%' : '100%' }">
                        <h2 class="title">{{ l.title }}</h2>
                        <div class="subtitle">
                            <el-button>查看({{ l.views }})</el-button>
                            <el-button>评论({{ l.comment }})</el-button>
                            <el-button>点赞({{ l.like }})</el-button>
                            <el-button>{{ l.createTime | filterDate }}</el-button>
                        </div>
                        <p class="article-content">
                            {{ l.introduction }}
                        </p>
                        <div class="classify">
                            <el-button plain class="catogary">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-grouping"></use>
                                </svg>
                                <span>{{ l.categories }}</span>
                            </el-button>
                            <el-button plain class="tag" v-for="(t, index) in l.tags" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-biaoqian"></use>
                                </svg>
                                <span>{{ t }}</span>
                            </el-button>
                        </div>
                    </div>
                </el-card>
                <div class="pagination">
                    <el-pagination layout="prev, pager, next" :total="info.totalCount" :page-size="info.pageSize"
                        :current-page="page" @current-change="(page) => currentChange(page)">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import RightConfig from '@/components/RightConfig.vue';
import { isPC } from '@/utils';
import { getArticlesList } from '@/request/api/articles';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Article',
    components: {
        HeaderNav,
        Footer,
        RightConfig,
    },
    data() {
        return {
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            info: {
                pageSize: 10,
                totalCount: 0,
                list: [],
            },
        }
    },
    computed: {
        menuOrDetail() {
            if (this.$route.name === 'article') {
                return true
            }
            if (this.$route.name === 'articleDetail') {
                return false
            }
        },
        ...mapState('articlesOptions', ['page']),
        ...mapState('homeOptions', ['articlesBgImg']),
    },
    methods: {
        ...mapMutations('articlesOptions', ['SETCURRENTPAGE']),
        goDetail(l) {
            this.$router.push({
                name: 'articleDetail',
                query: {
                    id: l._id
                }
            })
        },
        getArticles: async (conditions) => {
            const res = await getArticlesList(conditions);
            return res.data.data ? res.data.data : {};
        },
        fetchData() {
            this.getArticles({
                page: this.page,
                pageSize: this.info.pageSize,
                status: '1',
                publishStatus: '1',
            }).then((data) => {
                this.$set(this.info, 'totalCount', data.totalCount);
                data.list.forEach((item) => {
                    this.info.list.push(item);
                })
            })
        },
        currentChange(page) {
            this.SETCURRENTPAGE(page);
            this.info.list.splice(0);
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData();
    },
};
</script>
<style lang='less' scoped>
.article {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-image: '../../assets/misc16bk1.jpg';
    // background: top left repeat;

    .content,
    .detail {
        position: absolute;
        top: 1.2037rem;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: .3704rem;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
    }

    .right {
        flex: 3;
    }

    .left {
        flex: 9;

        .article-card {
            width: 80%;
            margin: 0 auto;
            margin-bottom: .3704rem;
            cursor: pointer;

            /deep/.el-card__body {
                display: flex;
                justify-content: space-around;
            }

            .cover {
                width: 30%;
            }

            .card-box {
                width: 60%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .el-button {
                    border: none;
                    margin: 0;
                }

                .title {
                    font-size: .4074rem;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .subtitle {
                    margin-left: -0.3704rem;
                    display: flex;
                    flex-wrap: wrap;
                }

                .article-content {
                    display: -webkit-box; //将盒子转换为弹性盒子
                    -webkit-box-orient: vertical; //文本显示方式，默认水平
                    -webkit-line-clamp: 2; //设置显示多少行
                    overflow: hidden;
                    line-height: 2em;
                }

                .classify {
                    margin-left: -0.3704rem;

                    .icon {
                        margin-right: .0926rem;
                    }
                }
            }
        }

        .pagination {
            width: 100%;
            text-align: center;
            margin: .1852rem 0;
        }

        /deep/.el-pagination {
            margin: 0 auto;
        }

        /deep/.el-pagination .btn-next,
        /deep/.el-pagination .btn-prev {
            background-color: transparent;
        }

        /deep/.el-pager li {
            background-color: transparent;
        }
    }
}
</style>