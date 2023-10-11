import instance from "../index";

//获取文章列表
export function getArticlesList(data) {
    return instance({
        url: '/articles',
        method: 'GET',
        params: data,
    })
}

//获取文章详情
export function getArticleDetail(id) {
    return instance({
        url: `/articles/${id}/edit`,
        method: 'GET',
    })
}