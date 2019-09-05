// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import preview from 'vue-photo-preview'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
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

Vue.use(ElementUI);
Vue.use(MintUI)
// 图片放大查看
// Vue.use(preview)

// 全局导航守卫
// var whiteList = ["/home","/home/login","/home/register","/home/loginForCode","/home/forgetPassword"]
//设置名单，需要登录才可以进入的页面
var whiteList = ["/userCenter/popularize","/userCenter/manageHome","/userCenter/myData"]
router.beforeEach((to, from, next) => {
  let hasToken = localStorage.getItem('ty-token');
  // let hasToken = true
  if (hasToken) {
    next()
  }else {
    if (whiteList.indexOf(to.path) !== -1) {
      next('/home' )//这里是即将进入的页面是名单中的页面就直接进入
    } else { 
      next()//这里是即将进入的页面不是白名单的页面又没有token的情况下重定向到登录页面进行登录操作
    } 
  }
});

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
