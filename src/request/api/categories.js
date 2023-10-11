import instance from "../index";

//获取分类
export function getCategories() {
    return instance({
        url: '/categories',
        method: 'GET',
    })
}