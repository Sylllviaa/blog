import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import getElementUI from './plugins'
import 'element-ui/lib/theme-chalk/index.css'
// 屏幕适配
import 'lib-flexible'
import router from './router'
import { isPC } from './utils'
import './css/global.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

import store from './store';

// 注册全局过滤器
import * as filters from './utils/filter'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate


Vue.config.productionTip = false

Vue.use(VueRouter)
getElementUI(Vue)
Vue.prototype.isPC = isPC

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
