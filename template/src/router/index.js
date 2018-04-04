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

router.beforeEach ((to, from, next) => {
  // 路由拦截器
  next()
})

export default router
