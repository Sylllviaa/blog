import { getArticlesList } from '@/request/api/articles';

const timeLineOptions = {
    namespaced: true,
    actions: {
        // getTotalCount: function (context) {
        //     const body = {
        //         page: context.state.pagination.page,
        //     };
        //     getArticlesList(body).then((res) => {
        //         context.commit('UPDATETOTALCOUNT', res.data.data.totalCount);
        //     })
        // },
        // getCurrentList: function (context) {
        //     getArticlesList({
        //         page: context.state.pagination.page,
        //     }).then((res) => {
        //         context.commit('UPDATECURRENTLIST', res.data.data.list);
        //     })
        // }
    },
    mutations: {
        // UPDATETOTALCOUNT: function (state, value) {
        //     //更新全部数量
        //     state.pagination.totalCount = value;
        // },
        SETCURRENTPAGE: function (state, value) {
            console.log('%%%%%', state);
            //设置当前页面
            state.page = value;
        },
        // UPDATECURRENTLIST: function (state, value) {
        //     console.log('%%%%%', value);
        //     //更新当前页面文章列表
        //     state.list = value;
        // }
    },
    state: {
        // pagination: {
        //     pageSize: 20,
        //     totalCount: 20,
        // },
        // list: [],
        page: 1,
    },
    getters: {

    }
}

export default timeLineOptions