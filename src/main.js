// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import * as $http from './requests';


Vue.config.productionTip = false
Vue.prototype.$http = $http;
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.use(ElementUI);
// 图片放大查看
Vue.use(preview)

// 全局导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/userCenter') {
//     next();
//   } else {
//     let t = localStorage.getItem('ufo-token');
//     if (t === 'null' || t === '' && to.path != '/login') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    if(window.localStorage.getItem('ufo-token') === null){
      window.localStorage.setItem('ufo-token','')
    }
    if(window.localStorage.getItem('type') === null){
      window.localStorage.setItem('type','')
    }
  }
})
