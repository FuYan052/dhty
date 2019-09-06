<template>
  <!-- 登录 -->
  <div class="loginHome">
    <div class="imgBox">
      <img class="loginBg" src="../assets/LOGO1.png" alt="">
    </div>
    <div class="Btn toLoginBotton" @click="doLogin">
      手机号登录
    </div>
    <div class="Btn toRegisterBotton" @click="doRegister">
      注册
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
  mounted() {
    this.$toast('请先登录！');
  },
  methods: {
    doLogin() {
      this.$router.push({
        path: '/home/login'
      })
    },
    doRegister() {
      this.$router.push({
        path: '/home/register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginHome{
    width: 100%;
    min-height: 100vh;
    background: url("../assets/homeBg.jpg") no-repeat center;
    background-size: cover;
    overflow: hidden;
    .imgBox{
      width: 168px;
      height: 175px;
      margin: 0 auto;
      margin-top: 258px;
      img{
        width: 168px;
        height: 175px;
      }
    }
    .Btn{
      width: 580px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      letter-spacing: 1px;
      font-size: 30px;
      color: #e59d25;
      border: 2px solid #e79c25;
      border-radius: 40px;
      margin: 0 auto;
    }
    .toLoginBotton{
      margin-top: 185px;
    }
    .toRegisterBotton{
      margin-top: 36px;
    }
  }
</style>
<style>
  .mint-toast-text{
    font-size: 26px;
  }
</style>
