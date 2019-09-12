<template>
  <!-- 登录 -->
  <div class="loginHome">
    <div class="imgBox">
      <!-- <img class="loginBg" src="../assets/LOGO1.png" alt=""> -->
    </div>
    <div class="Btn toLoginBotton" @click="doLogin">
      登录
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
  // beforeRouteEnter:(to,from,next)=>{
  //   console.log(to)
  //   console.log(from)
  //   // console.log(to)
  // },
  mounted() {
    // this.$toast({
    //   message: '请先登录！',
    //   duration: 1000
    // });
  },
  methods: {
    doLogin() {
      this.$router.replace({
        path: '/home/login'
      })
    },
    doRegister() {
      this.$router.replace({
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
      background: url("../assets/LOGO1.png") no-repeat center;
      background-size: contain;
      // img{
      //   width: 168px;
      //   height: 175px;
      // }
    }
    .Btn{
      width: 580px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      letter-spacing: 1px;
      font-size: 34px;
      color: #ffbc00;
      border: 2px solid #e79c25;
      border-radius: 40px;
      margin: 0 auto;
    }
    .toLoginBotton {
      background: #ffbc00;
      color: #fff;
      border: none;
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
