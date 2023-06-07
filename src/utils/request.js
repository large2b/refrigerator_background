import axios from "axios";
import config from "./config"
import { Loading, Message } from 'element-ui';
import store from '@/store/index'
import { getToken } from '@/utils/auth'


let TIMEOUT  = 4 * 1000
let mode = 'baseUrl'
// let mode = 'mock'

const service = axios.create({
    baseURL: config[mode],
    timeout: TIMEOUT
})

// request 拦截器
service.interceptors.request.use(config => {
    // do something before request is sent
    if(store.getters.token) {
        config.headers['token'] = getToken()
    }
    return config
},error => {
    // do something with request error

    // console.log(error); // for debug
    Promise.reject(error);
})

// response 拦截器
service.interceptors.response.use(
    response => {
        // do somthing with the response
        // define request status through status code
    },
    error => {
        console.log('err' + error); // for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)

export default service


// const request = (options) => {
//     let loadingInstance = Loading.service({
//         fullscreen:true
//     })
//     return new Promise((resolve,reject) => {
//         axios.request({
//             method: options.method || 'GET',
//             url: config.baseUrl + options.url,
//             data:options.data,
//             headers:{
//                 "Content-Type": options.contentType || "application/x-www-form-urlencoded",
//                 // "Content-Type": "application/x-www-form-urlencoded",
//                 'Authorization': options.Authorization || 'test1',
//             },
//             timeout:TIMEOUT
//         }).then( res => {
//             resolve(res.data)
//         }).catch( err => {
//             reject(err)
//         }).then(()=> loadingInstance.close())
//     })
// }
// export default request

