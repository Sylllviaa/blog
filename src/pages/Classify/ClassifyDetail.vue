<template>
    <div class="classifyDetail">
        <div class="content detail">
            <!-- <Detail :category="title" :detailContent="detailContent"></Detail> -->
            <h2 class="detail-title">{{ category }}--({{ pagination.totalCount }})</h2>
            <div class="table-detail">
                <el-table :data="detailContent" style="width: 70%" :show-header="false" max-height="400"
                    @row-click="goArticle">
                    <el-table-column prop="title" label="标题" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="200">
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="pagination.totalCount" :page-size="pagination.pageSize"
                    :current-page="page" @current-change="(page) => currentChange(page)">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Detail from '@/components/Detail.vue';
import { getArticlesList } from '@/request/api/articles';
import dayjs from 'dayjs';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'ClassifyDetail',
    props: ['category'],
    data() {
        return {
            detailContent: [],
            pagination: {
                pageSize: 20,
                totalCount: 20,
            },
        }
    },
    computed: {
        ...mapState('categoryOptions', ['page']),
    },
    components: {
        Detail,
    },
    methods: {
        ...mapMutations('categoryOptions', ['SETCURRENTPAGE']),
        getArticlesByCategory: async (conditions) => {
            const res = await getArticlesList(conditions);
            return res.data.data ? res.data.data : {};
        },
        goArticle(row) {
            console.log(row);
            this.$router.push({
                name: 'articleDetail',
                query: {
                    id: row._id,
                }
            })
        },
        fetchData() {
            this.getArticlesByCategory({
                page: this.page,
                pageSize: this.pagination.pageSize,
                categories: this.category,
                status: '1',   //文章已经启用
                publishStatus: '1',   //文章已经发布
            }).then((data) => {
                console.log('--------', data);

                data.list.forEach((item) => {
                    this.detailContent.push({
                        ...item,
                        createTime: dayjs(item.createTime * 1000).format('YYYY-MM-DD HH:mm'),
                    })
                });

                this.$set(this.pagination, 'totalCount', data.totalCount);

            })
            console.log('=======', this.detailContent);
        },
        currentChange(page) {
            this.SETCURRENTPAGE(page);
            this.detailContent.splice(0);
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData();
    },
};
</script>
<style lang='less' scoped>
.classifyDetail {
    width: 100%;
    height: 100%;

    .detail-title {
        text-align: center;
        padding-bottom: .3704rem;
    }

    .table-detail {
        width: 100%;

        .el-table {
            margin-left: 50%;
            transform: translateX(-50%);
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
</style>