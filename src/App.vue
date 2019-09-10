<template>
  <div id="app">
    <keep-alive>
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
  methods: {

  },
  mounted() {
    // const params = {
    //   grant_type: 'client_credential',
    //   appid: 'wxd3d4d3045a1213a1',
    //   secret: 'cb78c2c273d6b6e46634dded46fda369'
    // }
    // this.$http.getWXUserInfo(params).then(resp => {
    //   console.log(resp)
    // })
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
img {
    display:block
}
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
  font-size: 22px !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-size: 28px;
  background: #fff;
  font-family: '微软雅黑';
}
</style>
