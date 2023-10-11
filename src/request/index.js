// 封装一下请求，配置根路径，上线之后便于修改

import axios from 'axios'

// 创建一个axios实例
const instance = axios.create({
    baseURL: '/web/api/v1',

})

export default instance