<template>
  <div id="app">
    <keep-alive :include="include">
      <!-- 需要缓存视图的组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存视图的组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      include: ['Organization','Playground','CompleteInfo','MyActivities','ActivitySignUp']
    }
  },
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      // console.log(to.meta.keepAlive)
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // console.log(from.name)
      if(from.name == 'ActivityHome') {
        !this.include.includes(from.name) && this.include.push(from.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //如果是后退
      if (from.meta.keepAlive && !to.meta.needCacheLast) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },
  created() {
  },
  methods: {

  },
  mounted() {

  },
}
</script>

<style>
body{
  width: 100%;
  height: 100%;
}
.v-modal{
  opacity: 0.3;
}
*{
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
html,body,ul,li,ol,dl,dd,dt,p,h1,h2,h3,h4,h5,h6,form,fieldset,legend,img {
    margin:0;
    padding:0
}
fieldset,img {
    border:0
}
/* img {
    display:block
} */
address,caption,cite,code,dfn,th,var {
    font-style:normal;
    font-weight:normal
}
ul,ol {
    list-style:none
}
li{ 
  list-style: none; 
}
input {
    padding-top:0;
    padding-bottom:0;
    font-family:"SimSun","宋体"
}
input::-moz-focus-inner{
    border:0;
    padding:0
}
select,input{
    vertical-align:middle
}
select,input,textarea{
    font-size:12px;
    margin:0
}
input[type="text"],input[type="password"],textarea{
    outline-style:none;
    -webkit-appearance:none
}
textarea{
    resize:none
}
table{
    border-collapse:collapse
}
.mint-toast-text {
  font-size: 29px !important;
  line-height: 40px;
}
.mint-msgbox {
  width: 70% !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-size: 28px;
  background: #fff;
  font-family: '微软雅黑';
  position: relative;
}
</style>
