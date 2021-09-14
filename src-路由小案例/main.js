import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import router from './routers'
// 不展示生产环境相关的提示信息
Vue.config.productionTip = false
Vue.use(vueRouter)
new Vue({
  render: (h) => h(App),
    router
}).$mount('#app')
