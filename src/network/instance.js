import axios from 'axios'

// export function request(config) {
const instance = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  timeout: 5000
})

// 2.axios的拦截器
instance.interceptors.request.use(config => {
  //为请求对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, err => {
  //console.log(err)
});
//2.2 响应拦截
instance.interceptors.response.use(response => {

  return response.data
}, error => {
  console.log('error有什么错：')
  console.log(error)
  // 解构赋值，把error.response赋值给response
  //   let {
  //     response
  //   } = error;
  //   if (response) {
  //     // 服务器起码返回了结果
  //     // 常见错误状态码
  //     switch (response.status) {
  //       case 401:
  //         break;
  //       case 403:
  //         break;
  //       case 404:
  //         break;
  //     }
  //   } else {
  //     // 服务器没有结果返回，做断网处理
  //     if (!window.navigator.onLine) {
  //       // 断网处理
  //       return
  //     }
  //     // 如果不是断网
  //     return Promise.reject(error)
  //   }
  // })
  // return instance(config)
})

export {
  instance
}