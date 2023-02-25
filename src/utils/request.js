import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500
}
import Cookies from 'js-cookie'
// 创建axios实例
const service = axios.create({
    timeout: 30000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        let token = Cookies.get("mips_access_token")
        config.headers['Authorization'] = 'Bearer ' + token;
        config.baseURL = sessionStorage.getItem('baseUrl');
        return config
    }
)
// 响应拦截
service.interceptors.response.use(res => {
        return res.data
    },
    error => {
        return Promise.reject(new Error(error))
    })
export default service
