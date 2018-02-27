import axios from 'axios'
import { appConfig } from './utils.js'

axios.defaults.baseURL = appConfig.baseUrl  //请求接口地址
axios.defaults.validateStatus = function (status) {
  return status < 500
}
axios.defaults.timeout = 10000

//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  for (let key in config.params) {
    if (config.params[key] == null || config.params[key] == '') {
      delete config.params[key]
    }
  }
  return config
},function(err){
  //Do something with request error
  return Promise.reject(error);
})

//响应拦截器
axios.interceptors.response.use(function(res){
  return res
},function(){
  return Promise.reject(err);
})

export default axios