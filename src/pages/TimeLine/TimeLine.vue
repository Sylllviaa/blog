<template>
    <div class="timelinevue" :style="{ background: `url(${archiveBgImg[0].imgUrl}) top left repeat` }">
        <HeaderNav background="transparent" backTopTarget=".content"></HeaderNav>
        <div class="content">
            <ul class="timeline-year" v-for="oneYear in timelineContent" :key="oneYear.year">
                <h2>{{ oneYear.year }}</h2>
                <el-timeline class="years-content">
                    <el-timeline-item v-for="article in oneYear.articles" :key="article.time" :timestamp="article.timestamp"
                        placement="top" :color="activecolor" @mouseenter.native="changecolor"
                        @mouseleave.native="() => activecolor = ''">
                        <el-card class="card" @click.native="() => goArticle(article)">
                            <h4>{{ article.title }}</h4>
                            <p class="describe">{{ article.introduction }}</p>
                            <p>提交于 {{ article.time }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </ul>
            <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="pagination.totalCount" :page-size="pagination.pageSize"
                    :current-page="page" @current-change="(page) => currentChange(page)">
                </el-pagination>
            </div>

            <Footer></Footer>
        </div>
    </div>
</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';
import { getArticlesList } from '@/request/api/articles';
import dayjs from 'dayjs';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: 'TimeLine',
    components: {
        HeaderNav,
        Footer,
    },
    data() {
        return {
            activecolor: '',
            timelineContent: [],
            pagination: {
                pageSize: 20,
                totalCount: 20,
            },
        }
    },
    computed: {
        ...mapState('timeLineOptions', ['page']),
        ...mapState('homeOptions', ['archiveBgImg']),
    },
    methods: {
        // ...mapActions('timeLineOptions', ['getTotalCount', 'getCurrentList']),
        ...mapMutations('timeLineOptions', ['SETCURRENTPAGE']),
        changecolor() {
            this.activecolor = 'green'
        },
        getArticlesByTimeLine: async (conditions) => {
            const res = await getArticlesList(conditions);
            return res.data.data ? res.data.data : {};
        },
        goArticle(row) {
            console.log(row);
            this.$router.push({
                name: 'articleDetail',
                query: {
                    id: row.id,
                }
            })
        },
        currentChange(page) {
            console.log(111, page);
            this.SETCURRENTPAGE(page);
            this.timelineContent.splice(0);
            this.fetchData();
        },
        fetchData() {
            this.getArticlesByTimeLine({
                page: this.page,
                pageSize: this.pagination.pageSize,
                status: '1',
                publishStatus: '1',
            }).then((data) => {
                console.log('-------', data);

                // this.$set(this.pagination, 'page', data.page);
                // this.$set(this.pagination, 'pageSize', data.pageSize);
                this.$set(this.pagination, 'totalCount', data.totalCount);

                const setYear = new Set()
                data.list.forEach((item, index) => {
                    const year = dayjs((item.updateTime !== 0 ? item.updateTime : item.createTime) * 1000).format('YYYY');
                    console.log(year);
                    setYear.add(year);
                });
                const years = Array.from(setYear);
                console.log(years);

                years.forEach((year) => {
                    this.timelineContent.push({
                        year,
                        articles: [],
                    })
                });

                data.list.forEach((item) => {
                    const year = dayjs((item.updateTime !== 0 ? item.updateTime : item.createTime) * 1000).format('YYYY');
                    this.timelineContent.forEach((obj) => {
                        if (obj.year === year) {
                            obj.articles.push({
                                id: item._id,
                                title: item.title,
                                introduction: item.introduction,
                                time: dayjs((item.updateTime !== 0 ? item.updateTime : item.createTime) * 1000).format('YYYY-MM-DD HH:mm'),
                                timestamp: dayjs((item.updateTime !== 0 ? item.updateTime : item.createTime) * 1000).format('YYYY-MM-DD'),
                            })
                        }
                    })
                });
            })
        }
    },
    mounted() {
        this.fetchData();
    },

};
</script>
<style lang='less' scoped>
.timelinevue {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url(@/assets/garden618.jpg) center center repeat;
    color: #fff;

    .content {
        position: absolute;
        top: 1.2037rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
        padding-top: .3704rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .timeline-year {
            width: 50%;
            // margin: 0 auto;
            padding: 0;
        }

        .years-content {
            .card {
                h4 {
                    font-size: .3333rem;
                    margin-bottom: .1481rem;
                }

                .describe {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: .0926rem;
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