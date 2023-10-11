import { getHomeConfig } from '@/request/api/home'
import { getTags } from '@/request/api/tags';

const opOptions = {
    namespaced: true,
    actions: {
        getSuggestList: function (context) {
            getTags().then((res) => {
                console.log(res);
                const list = res.data.data.list.filter((item) => {
                    return item.status === true;
                });
                context.commit('SETSUGGEST', list.map((item) => {
                    return {
                        value: item.name,
                    }
                }));
            })
        }
    },
    mutations: {
        SETSUGGEST: function (state, value) {
            state.suggestList = value;
        }
    },
    state: {
        suggestList: [],  //搜索建议下拉列表
    },
    getters: {

    }
}

export default opOptions