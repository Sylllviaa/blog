import instance from "../index";

//获取标签
export function getTags(params) {
    return instance({
        url: '/tags',
        method: 'GET',
        params,
    })
}