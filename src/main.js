// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import preview from 'vue-photo-preview'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import './assets/js/mobileFonts.js'
// import 'vue-photo-preview/dist/skin.css'
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

// 判断ios还是android
Vue.prototype.$isIosOrAndroid = function () {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  let isStr = ''
  if (isAndroid) {
    isStr = 'android'
  }
  if (isiOS) {
    isStr = 'ios'
  }
  return isStr
}


Vue.use(ElementUI);
Vue.use(MintUI)
// 图片放大查看
// Vue.use(preview)

// 全局导航守卫
router.beforeEach((to, from, next) => {
  let hasToken = localStorage.getItem('ty-token');
  // console.log(hasToken)
  if (hasToken) {
    next()
  }else {
    if (to.meta.requireAuth) {
      window.sessionStorage.setItem('routerPath',to.fullPath)
      window.sessionStorage.setItem('routerPathName',to.name)
      next('/home')
    } else { 
      next()
    } 
  }
});

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    if(window.localStorage.getItem('ty-token') === null){
      window.localStorage.setItem('ty-token','')
    }
  }
})
