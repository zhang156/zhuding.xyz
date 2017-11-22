import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:8001/'
})
service.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

// 拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

Vue.prototype.$http = axios

export default service