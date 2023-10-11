import instance from "../index";

//获取关于信息
export function getRecommend() {
    return instance({
        url: '/config/recommend',
        method: 'GET',
    })
}