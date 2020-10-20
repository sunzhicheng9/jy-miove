import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false
import LazyLoad from 'vue-lazyload'
// 导入vuex的store对象
import store from '@/store/vuex'
Vue.use(LazyLoad,{
  loading:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1715905395,2044559868&fm=26&gp=0.jpg'
})

// 定义事件总线（后续需要使用的）
         // (名字自定义)
Vue.prototype.eventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
