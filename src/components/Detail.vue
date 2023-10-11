<template>
    <div class="detail">
        <h2 class="detail-title">{{ category }}--({{ detailContent.totalCount }})</h2>
        <div class="table-detail">
            <el-table :data="tableData" style="width: 50%" :show-header="false" max-height="400">
                <el-table-column prop="title" label="标题" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="100">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="pagination.totalCount" :page-size="pagination.pageSize"
                :current-page="pagination.page" hide-on-single-page>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Detail',
    props: ['category', 'detailContent'],
    data() {
        return {
            tableData: [],
            pagination: {},
        }
    },
    created() {
        this.tableData = this.detailContent.list.map((item) => {
            return {
                ...item,
                createTime: item.createTime | filterDate,
            }
        });
        this.pagination = {
            page: this.detailContent.page,
            pageSize: this.detailContent.pageSize,
            totalCount: this.detailContent.totalCount,
        }
        console.log(this);
    }
};
</script>
<style lang='less' scoped>
.detail {
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