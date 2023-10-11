import instance from "../index";

//获取关于信息
export function getAbout() {
    return instance({
        url: '/about',
        method: 'GET',
    })
}