import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const ajax = axios.create({
  baseURL: 'http://192.168.0.122:9000/'
})

// 模拟登录数据 
// const ajax = axios.create({
//   baseURL: 'http://rap2api.taobao.org/app/mock'
// })

// request拦截器
ajax.interceptors.request.use(config => {
  console.log(config)
  // Do something before request is sent
  if (localStorage.getItem('ufo-token')) {
    config.headers.common['token'] = localStorage.getItem('ufo-token'); //让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
ajax.interceptors.response.use(resp => {
    if (resp.status === 200) {
      return resp.data
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

// 登录
export const postLogin = (params) => {
  return ajax.post(`/v1/rest/login/doLogin?phone=${params.phoneNum}&passWord=${params.password}`)
}
// export const postLogin = () => {
//   return ajax.post(`/167512/api/login`)
// }