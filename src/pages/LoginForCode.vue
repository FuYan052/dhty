<template>
  <div class="loginForCode" v-title data-title="手机号登录">
    <!-- <div class="top">
    </div>
    <p class="name">登录</p>
    <div class="wrap">
      中国<span>+86</span>
    </div> -->
    <!-- 手机号验证码快捷登录 -->
    <div class="loginType">
        <ul>
          <li>
            <!-- <input type="text" placeholder="请输入你的账号" placeholder-class="placeholderStyle"> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="" prop="phoneNum">
                <el-input v-model="ruleForm.phoneNum" placeholder="请输入您的手机号"></el-input>
              </el-form-item>
            </el-form>
          </li>
          <li class="hqyzm">
            <input type="text" v-model="code" placeholder="请输入手机验证码" placeholder-class="placeholderStyle">
            <el-button class="yzm" :disabled='disabled' @click="getCode2">{{content}}</el-button>
          </li>
        </ul>
        <p class="changeHandle">
          <!-- <span @click="doRegister">注册</span> -->
          手机不可用？<span @click="changePhone">点此更换手机</span>
        </p>
        <div class="loginBtn" @click="loginForCodde">
          登录
        </div>
        <img class="logoImg" src="../assets/logoImg.png" alt="">
    </div>
    <div class="agreement">
      <span class="radiu" :class="{raiduChecked : isChecked}" @click="handleAgree"><i class="el-icon-check" v-show="isChecked"></i></span>
      我同意并认可<span class="_mark" @click="toAgreement">《来虎用户协议》</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'LoginForCode',
  data() {
    let validPhone=(rule,value,callback)=>{
      let reg=/[0-9]{11}/
      if(!reg.test(value)){callback(
        new Error('请输入11位手机号！'))
        this.rule1 = false
      }else{
        this.callback()
      }
    };
    return {
      ruleForm: {
        phoneNum: '',
      },
      disabled: false,
      content: '获取验证码',
      totalTime: 0,
      timer: null,
      code: '',
      rules: {
        phoneNum: [
          { validator:validPhone,trigger:'blur'}
        ],
      },
      rule1: false, //当输入合法时才允许提交登录信息
      isChecked: false  //是否同意用户协议
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus','changeUserId','changeUserPhone','changeToken']),
     // 输入值合法时的回调
    callback () {
      this.rule1 = true
    },
    getCode2() {
      if(this.rule1) {
        this.totalTime = 60
        this.$http.postCode(this.ruleForm.phoneNum).then(resp => {
          console.log(resp)
        })
        this.timer = setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + '秒'
          this.disabled = true
          if(this.totalTime <= 0){
            this.content = '获取验证码'
            this.disabled = false
            clearInterval(this.timer)
          }
        },1000)
      }else{
        this.$toast('手机号格式不正确！')
      }
    },
    loginForCodde() {
      if(this.rule1 && this.code !== '' && this.isChecked){
        const params = {
          phone: this.ruleForm.phoneNum,
          code: this.code
        }
        this.$http.postLoginForCode(params).then(resp => {
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
            // 登录成功后跳转回之前要去的页面
            const toPath = window.sessionStorage.getItem('routerPath')
            const toPathName = window.sessionStorage.getItem('routerPathName')
            this.$router.replace({
              path: toPath
            })
          }
        })
      }else{
        if(!this.rule1 || this.code === '') {
          this.$toast('请输入正确的信息！')
        }
        else if(!this.isChecked) {
          this.$toast('请阅读来虎用户协议！')
        }
      }
    },
    changePhone() {

    },
    handleAgree() {
      this.isChecked = !this.isChecked
    },
    toAgreement() {
      this.$router.push({
        path: '/home/register/userAgreement'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginForCode{
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
        .hqyzm{
          .yzm{
            width: 160px;
            height: 60px;
            border: 1px solid #c8c8c8;
            color: #fff;
            border-radius: 90px;
            text-align: center;
            float: right;
            // margin-top: 20px;
            background: #c8c8c8;
            font-size: 22px;
            span{
              line-height: 60px;
              font-size: 22px;
            }
          }
        }
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
      .loginBtn{
        width: 100%;
        height: 94px;
        background: #fac31e;
        color: #fff;
        line-height: 94px;
        text-align: center;
        // margin-top: 170px;
        letter-spacing: 2px;
        border-radius: 14px;
        padding-left: 15px;
        font-size: 30px;
      }
      .logoImg{
        width: 81px;
        height: 113px;
        margin: 0 auto;
        margin-top: 400px;
        margin-bottom: 65px;
      }
    }
    .agreement{
      width: 100%;
      // height: 34px;
      text-align: center;
      font-size: 26px;
      margin-top: 65px;
      line-height: 32px; 
      vertical-align: middle;
      .radiu{
        display: inline-block;
        width: 30px;
        height:30px;
        border-radius: 50%;
        border: 1px solid #fac31e;
        vertical-align: top;
        padding-top: 2px;
        i{
          font-size: 26px;
          color: #fff;
          vertical-align: top;
          text-align: center;
        }
      }
      .raiduChecked{
        background: #fac31e;
      }
      ._mark{
        color: #fac31e;
      }
    }
  }
</style>
<style>
.loginForCode .el-input__inner{
  font-size: 32px;
  height: 80px;
  padding: 0;
  border: none;
  background: #f2f2f2;
}
.loginForCode .el-form-item__error {
  top: 35%;
  right: 0;
  left: auto;
  font-size: 22px;
  color: red;
}
.loginForCode .el-icon-view{
  font-size: 26px;
  line-height: 105px;
}
.loginForCode .loginType ul li input{
  background: #f2f2f2;
  height: 80px !important;
  font-size: 32px;
  /* border: 1px solid red !important; */
}
.loginForCode input:-ms-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.loginForCode input::-moz-placeholder{
  color: #909090;
  font-size: 32px;
}
.loginForCode input::-webkit-input-placeholder{
  color: #909090;
  font-size: 32px;
}
</style>
