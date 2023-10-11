import instance from "../index";

//获取用户
export function getUser() {
    return instance({
        url: '/user',
        method: 'GET',
    })
}