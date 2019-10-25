<template>
  <div class="login" v-title data-title="登录">
    <!-- <p class="name">登录</p> -->
    <!-- <div class="wrap">
      中国<span>+86</span>
    </div> -->
    <div class="loginType">
        <ul>
          <li>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="" prop="phoneNum">
                <el-input v-model="ruleForm.phoneNum" placeholder="请输入您的手机号"></el-input>
              </el-form-item>
            </el-form>
          </li>
          <li class="hqyzm">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="" prop="inputPassword">
                <el-input type="password" placeholder="请输入6-16位的密码" v-model="ruleForm.inputPassword"></el-input>
              </el-form-item>
            </el-form>
          </li>
        </ul>
        <p class="changeHandle">
          <!-- <span @click="doRegister">注册</span> -->
          忘记密码？<span @click="doReset">点此找回</span>
        </p>
        <div class="loginBtn" @click="doLodin">
          登录
        </div>
        <div class="btnWrap">
          <div class="changeType">
            <div class="loginImg" @click="handleChangeType">
              <img src="../assets/loginPhone.png" style="width: 100%;" alt="">
            </div>
          <p>手机登录</p>
          </div>
          <div class="changeType">
            <!-- <img src="../assets/weinxinIcon.png" alt=""> -->
            <div class="loginImg" @click="wexinLogin">
              <img src="../assets/weinxinIcon.png" style="width: 100%;" alt="">
            </div>
            <p>微信登录</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    let validPhone=(rule,value,callback)=>{
      let reg=/[0-9]{11}/
      if(!reg.test(value)){callback(
        new Error('请输入11位手机号！'))
        this.rule1 = false
      }else{
        this.callback1()
      }
    };
    let validPassword=(rule,value,callback)=>{
      let reg=/[0-9a-zA-Z]{6,16}/
      if(!reg.test(value)){callback(
        new Error('请输入正确的6-16位密码！'))
        this.rule2 = true
      }else{
        this.callback2()
      }
    };
    return {
      ruleForm: {
        phoneNum: '',
        inputPassword: '',
      },
       rules: {
        phoneNum: [
          { validator:validPhone,trigger:'blur'}
        ],
        inputPassword: [
          { validator:validPassword,trigger:'blur' }
        ]
      },
      content: '获取验证码!',
      totalTime: 0,
      timer: null,
      rule1: false,
      rule2: false,
      timer: '',
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus','changeUserId','changeUserPhone','changeToken']),
    // 输入值合法时的回调
    callback1() {
      this.rule1 = true
    },
    callback2() {
      this.rule2 = true
    },
    doLodin() {
      if(this.rule1 && this.rule2){
        const params = {
          phone: this.ruleForm.phoneNum,
          passWord: this.ruleForm.inputPassword
        }
        this.$http.postLoginForPassword(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            window.localStorage.setItem('userId', resp.data.id)
            window.localStorage.setItem('userPhone', resp.data.phone)
            window.localStorage.setItem('ty-token', resp.data.token)
            window.localStorage.setItem('userType', resp.data.type)
            this.changeLoginStatus(true)
            this.changeUserId(resp.data.id)
            this.changeUserPhone(resp.data.phone)
            this.changeToken(resp.data.token)
            // this.$toast({
            //   message: '登录成功！',
            //   duration: 2000
            // });

            // 登录成功后跳转回之前要去的页面
            const toPath = window.sessionStorage.getItem('routerPath')
            const toPathName = window.sessionStorage.getItem('routerPathName')
            if(toPathName == 'ClubInfo') {
              this.$router.replace({
                path: toPath,
              })
            }else{
              this.$router.replace({
                path: toPath,
                name: toPathName,
                params: {
                  _userId: resp.data.id
                }
              })
            }
          }
        })
        console.log(params)
      }else{
        this.$toast({
          message: '请输入正确的信息！',
          duration: 2000
        });
      }
    },
    handleChangeType() {
      this.$router.replace({
        path: '/home/loginForCode'
      })
    },
    doRegister() {
      this.$router.replace({
        path: '/home/register'
      })
    },
    doReset() {
      this.$router.replace({
        path: '/home/forgetPassword'
      })
    },
    // 微信登录
    wexinLogin() {
      const state = window.sessionStorage.getItem('routerPath')
      const redirectUrl = encodeURIComponent(`https://laihu.baogongxia.com/#/home/bindPhone`)
      // const redirectUrl = encodeURIComponent(`http://192.168.0.137:8082/#/home/bindPhone`)
      // const appid = 'wxf1894ca38c849d17'  //测试号
      const appid = 'wxd3d4d3045a1213a1'
      // console.log(this.state)
      // console.log(window.location.href)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    padding: 0 80px;
    .top{
      width: 100%;
      height: 94px;
      padding-left: 30px;
      padding-top: 33px;
      span{
        display: block;
        width: 20px;
        height: 31px;
        background: url("../assets/backBg.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .name{
      font-size: 38px;
      text-align: center;
      color: #303030;
      margin-top: 11px;
    }
    .wrap{
      width: 100%;
      height: 120px;
      line-height: 120px;
      margin: 0 auto;
      margin-top: 40px;
      border-bottom: 1px solid #f3f3f3;
      span{
        float: right;
      }
    }
    .loginType{
      width: 100%;
      min-height: 600px;
      margin: 0 auto;
      // border: 1px solid red;
      margin-top: 160px;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 118px;
          border-bottom: 1px solid #d7d7d7;
          padding-top: 30px;
          input{
            width: 60%;
            height: 100px;
            line-height: 120px;
            float: left;
            font-size: 27px;
            border: none;
            outline: none;
          }
        }
      }
      .loginBtn{
        width: 100%;
        height: 94px;
        background: #fac31e;
        color: #fff;
        line-height: 94px;
        text-align: center;
        letter-spacing: 2px;
        border-radius: 14px;
        padding-left: 15px;
        font-size: 30px;
      }
      .changeHandle{
        width: 100%;
        padding: 0 6px;
        margin-top: 66px;
        line-height: 26px;
        font-size: 26px;
        padding-bottom: 28px;
        span{
          display: inline-block;
          color: #fac31e;
        }
        span:nth-child(2){
          float: right;
        }
      }
      .btnWrap{
        width: 100%;
        height: 180px;
        margin-top: 300px;
        // border: 1px solid red;
        .changeType{
          width: 49.2%;
          display: inline-block;
          // border: 1px solid red;
          .loginImg{
            width: 85px;
            height: 85px;
            margin: 0 auto;
          }
          p{
            color: #909090;
            text-align: center;
            font-size: 26px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
<style scpoed>
.login .el-input__inner{
  font-size: 32px;
  height: 80px;
  /* line-height: 120px; */
  padding: 0;
  border: none;
  background: #f2f2f2;
}
.login .el-form-item__content .el-form-item__error {
  top: 35%;
  right: 0;
  left: auto;
  font-size: 22px;
  color: red;
}
.login .el-icon-view{
  font-size: 26px;
  line-height: 93px;
}
.login input:-ms-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.login input::-moz-placeholder{
  color: #909090;
  font-size: 32px;
}
.login input::-webkit-input-placeholder{
  color: #909090;
  font-size: 32px;
}
</style>
