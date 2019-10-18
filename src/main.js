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
// import './utils/directive'

Vue.config.productionTip = false
Vue.prototype.$http = $http;
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

// 判断ios还是android
// Vue.prototype.$isIosOrAndroid = function () {
//   let u = navigator.userAgent;
//   let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
//   let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
//   let isStr = ''
//   if (isAndroid) {
//     isStr = 'android'
//   }
//   if (isiOS) {
//     isStr = 'ios'
//   }
//   return isStr
// }


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

// 距离过滤器
Vue.filter('GetDistance',function(_lat1, _lng1, _lat2, _lng2){
    var lat1 = Number(_lat1)
    var lng1 = Number(_lng1)
    var lat2 = Number(_lat2)
    var lng2 = Number(_lng2)
    console.log(lat1,lng1,lat2,lng2)
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 100) / 100;
    console.log(s)
    return s;
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
