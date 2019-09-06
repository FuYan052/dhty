<template>
  <div class="login" v-title data-title="登录">
    <div class="top">
      <!-- <span></span> -->
    </div>
    <p class="name">登录</p>
    <div class="wrap">
      中国<span>+86</span>
    </div>
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
                <el-input type="password" placeholder="请输入6-16位的密码" show-password v-model="ruleForm.inputPassword"></el-input>
              </el-form-item>
            </el-form>
          </li>
        </ul>
        <div class="loginBtn" @click="doLodin">
          登录
        </div>
        <p class="changeHandle">
          <span @click="doRegister">注册</span>
          <span @click="doReset">忘记密码</span>
        </p>
        <div class="changeType">
          <img src="../assets/loginPhone.png" alt=""  @click="handleChangeType">
          <p>手机验证码登录</p>
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
        new Error('账号为11位的手机号'))
        this.rule1 = false
      }else{
        this.callback1()
      }
    };
    let validPassword=(rule,value,callback)=>{
      let reg=/[0-9a-zA-Z]{6,16}/
      if(!reg.test(value)){callback(
        new Error('请输入正确的6-16位密码'))
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
      content: '获取验证码',
      totalTime: 0,
      timer: null,
      rule1: false,
      rule2: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin () {
      // 当isLogin为true的时候，执行跳转
      // const {
      //   from = '/home'
      // } = this.$route.params
      // this.$router.push(from)
    }
  },
  created() {
    console.log(this.$router)
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
            this.changeLoginStatus(true)
            this.changeUserId(resp.data.id)
            this.changeUserPhone(resp.data.phone)
            this.changeToken(resp.data.token)
            this.$toast("登录成功！")
            this.$router.go(-2);
          }
        })
        console.log(params)
      }else{
        this.$message({
          showClose: true,
          message: '请输入正确的信息！',
          type: 'warning'
        });
      }
    },
    handleChangeType() {
      this.$router.push({
        path: '/home/loginForCode'
      })
    },
    doRegister() {
      this.$router.push({
        path: '/home/register'
      })
    },
    doReset() {
      this.$router.push({
        path: '/home/forgetPassword'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 100%;
    min-height: 100vh;
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
      width: 92%;
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
      width: 92%;
      min-height: 600px;
      margin: 0 auto;
      // border: 1px solid red;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 120px;
          border-bottom: 1px solid #f3f3f3;
          padding-top: 10px;
          input{
            width: 60%;
            height: 100px;
            line-height: 100px;
            float: left;
            font-size: 26px;
            border: none;
            outline: none;
          }
          input:-ms-input-placeholder{
            color: #cbcbcb;
            letter-spacing: 1px;
          }
          input::-moz-placeholder{
            color: #cbcbcb;
            letter-spacing: 1px;
          }
          input::-webkit-input-placeholder{
            color: #cbcbcb;
            letter-spacing: 1px;
          }
        }
      }
      .loginBtn{
        width: 100%;
        height: 80px;
        background: #fac31e;
        color: #fff;
        line-height: 80px;
        text-align: center;
        margin-top: 170px;
        letter-spacing: 30px;
        border-radius: 40px;
        margin-bottom: 35px;
        padding-left: 15px;
      }
      .changeHandle{
        width: 100%;
        padding: 0 20px;
        span{
          display: inline-block;
          color: #fac31e;
        }
        span:nth-child(2){
          float: right;
        }
      }
      .changeType{
        width: 100%;
        margin-top: 145px;
        img{
          width: 87px;
          height: 87px;
          margin: 0 auto;
        }
        p{
          color: #b4b4b4;
          margin-top: 25px;
          text-align: center;
        }
      }
    }
  }
</style>
<style>
.login .el-input__inner{
  font-size: 24px;
  height: 100px;
  line-height: 100px;
  padding: 0;
  border: none;
}
.login .el-form-item__error {
  top: 75%;
}
</style>
