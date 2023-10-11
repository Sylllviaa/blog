import { getRecommend } from '@/request/api/recommend';
import { COLOR } from '@/const';

const recommendOptions = {
    namespaced: true,
    actions: {
        getRecommends: function (context) {
            getRecommend().then((res) => {
                console.log('@@@@@', res);
                const listAddColor = res.data.data.list.map((item) => {
                    return {
                        ...item,
                        color: COLOR[item.project - 1],
                    }
                })
                context.commit('UPDATERECOMMENDLIST', listAddColor);
            })
        }
    },
    mutations: {
        UPDATERECOMMENDLIST: function (state, value) {
            console.log('%%%%%', state);
            state.list = value;
        },
    },
    state: {
        list: [],
    },
    getters: {

    }
}

export default recommendOptions