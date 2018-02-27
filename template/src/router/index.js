import Vue from 'vue'
import Router from 'vue-router'
import Index from './../views/index.vue'
import * as Utils from './../utils/index.js'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  }
]

const router =  new Router({
  routes
})

router.beforeEach ((to,from,next) => {
  //路由拦截器
  if(window.location.href.indexOf('.html?')>-1){
    //先对hash模式的异常参数做重新拼接
    let url = Utils.resetUrl()
    window.location.href = url
  }else{
    {{#weixin}}
    if( Utils.BrowserInfo.versions.weixin ){
      //微信环境配置sdk
      
    }
    {{/weixin}}
    next()
  }
})

export default router