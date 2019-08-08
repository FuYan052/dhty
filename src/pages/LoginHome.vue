<template>
  <!-- 登录 -->
  <div class="loginHome">
    <img class="loginBg" src="../assets/loginBg.png" alt="">
    <p class="title1">登录大虎体育运动</p>
    <p class="title2">让时代改变你的生活</p>
    <div class="toBotton" @click="doLogin">
      登录/注册
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHome',
  created() {
    // this.$http.getInfo().then( resp => {
    //   console.log(resp)
    // })
  },
  methods: {
    doLogin() {
      this.$router.push({
        path: '/home/login'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .loginHome{
    width: 100%;
    min-height: 100vh;
    background: #f4f4f6;
    overflow: hidden;
    .loginBg{
      width: 470px;
      height: 470px;
      margin: 0 auto;
      margin-top: 80px;
    }
    .title1{
      font-size: 30px;
      text-align: center;
      margin-top: 50px;
      color: #28282a;
      letter-spacing: 1px;
    }
    .title2{
      font-size: 24px;
      text-align: center;
      margin-top: 25px;
      color: #8f8f91;
      letter-spacing: 1px;
    }
    .toBotton{
      width: 330px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      letter-spacing: 1px;
      color: #fff;
      background: #fac31e;
      border-radius: 40px;
      margin: 80px auto;
    }
  }
</style>

