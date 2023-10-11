
const tagsOptions = {
    namespaced: true,
    actions: {
    },
    mutations: {
        SETCURRENTPAGE: function (state, value) {
            console.log('%%%%%', state);
            //设置当前页面
            state.page = value;
        },
    },
    state: {
        page: 1,
    },
    getters: {

    }
}

export default tagsOptions