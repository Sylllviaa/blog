import { getHomeConfig } from '@/request/api/home'

const homeOptions = {
    namespaced: true,
    actions: {
        getHomeImg: function (context) {
            getHomeConfig().then((res) => {
                console.log(res);
                const { data } = res.data;
                context.commit('SETEFFECTS', data.effects);
                context.commit('SETTIMELINE', data.archiveBgImg);
                context.commit('SETCATEGORY', data.categoriesBgImg);
                context.commit('SETTAG', data.tagsBgImg);
                context.commit('SETARTICLE', data.articlesBgImg);
                context.commit('SETTYPE', data.introduction);
            })
        }
    },
    mutations: {
        SETEFFECTS: function (state, value) {
            state.effects = value;
        },
        SETTIMELINE: function (state, value) {
            state.archiveBgImg = value;
        },
        SETCATEGORY: function (state, value) {
            state.categoriesBgImg = value;
        },
        SETTAG: function (state, value) {
            state.tagsBgImg = value;
        },
        SETARTICLE: function (state, value) {
            state.articlesBgImg = value;
        },
        SETTYPE: function (state, value) {
            //首页打字机简介
            state.introduction = value;
        }
    },
    state: {
        effects: false,
        archiveBgImg: '',  //时间线背景图
        categoriesBgImg: '',  //分类页
        tagsBgImg: '',  //标签页
        articlesBgImg: '',  //文章页
        introduction: '',
    },
    getters: {

    }
}

export default homeOptions