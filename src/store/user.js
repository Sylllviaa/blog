import { getUser } from "@/request/api/user";

const userOptions = {
    namespaced: true,
    actions: {
        getUserInfo: function (context) {
            getUser().then((res) => {
                console.log('user', res);
                const admin = res.data.data.list[0];
                context.commit('SETNICKNAME', admin.nickName);
                context.commit('SETAVATAR', admin.avatar);
                context.commit('SETGITHUB', admin.github);
                context.commit('SETGITEE', admin.gitee);
            })
        }
    },
    mutations: {
        SETNICKNAME: function (state, value) {
            state.nickName = value;
        },
        SETAVATAR: function (state, value) {
            state.avatar = value;
        },
        SETGITHUB: function (state, value) {
            state.github = value;
        },
        SETGITEE: function (state, value) {
            state.gitee = value;
        }
    },
    state: {
        nickName: '',
        avatar: '',
        github: '',
        gitee: '',
    },
    getters: {

    }
}

export default userOptions