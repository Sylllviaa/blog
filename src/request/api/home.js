import instance from "../index";

//获取关于信息
export function getHomeConfig() {
    return instance({
        url: '/config/home',
        method: 'GET',
    })
}