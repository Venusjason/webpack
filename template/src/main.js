{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}
import FastClick from 'fastclick'
import VConsole from 'vconsole'
import  'lib-flexible'

/* eslint-disable no-new */
Vue.config.productionTip = false
// 解决移动端300ms延迟
FastClick.attach(document.body)
if( process.env.NODE_ENV != 'production' ){
  // 开发环境 开启调试模式
  new VConsole()
}

new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
