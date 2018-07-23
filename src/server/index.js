import axios from 'axios'

//设置默认请求域名
axios.defaults.baseURL='http://chat.wykiss.cn/v1/'
//设置跨域向后台提交cookie
axios.defaults.withCredentials=true

export function get(url,params={}) {
    return new Promise((resolve, reject) =>{
        axios.get(url, {params})
            .then((response)=>{
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

export function post(url,params={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then((response)=>{
              resolve(response)
          })
          .catch((error)=>{
              reject(error)
          })
    })
}






















