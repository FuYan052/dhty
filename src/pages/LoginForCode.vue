<template>
  <div class="loginForCode">
    <div class="top">
      <span></span>
    </div>
    <p class="name">登录</p>
    <div class="wrap">
      中国<span>+86</span>
    </div>
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
            <el-button class="yzm" :disabled='disabled' @click="getCode">{{content}}</el-button>
          </li>
        </ul>
        <div class="loginBtn" @click="loginForCodde">
          登录
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForCode',
  data() {
    let validPhone=(rule,value,callback)=>{
      let reg=/[0-9]{11}/
      if(!reg.test(value)){callback(
        new Error('账号必须是11位的手机号'))
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
      rule1: false //当输入合法时才允许提交登录信息
    }
  },
  methods: {
     // 输入值合法时的回调
    callback () {
      this.rule1 = true
    },
    getCode() {
      this.totalTime = 60
      this.timer = setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        this.disabled = true
        console.log(this.totalTime)
        if(this.totalTime <= 0){
          console.log('ending')
          this.content = '获取验证码'
          this.disabled = false
          clearInterval(this.timer)
        }
      },1000)
    },
    loginForCodde() {
      if(this.rule1 && this.code !== ''){
        const params = {
          phone: this.ruleForm.phoneNum,
          code: this.code
        }
        console.log(params)
      }else{
        this.$message({
          showClose: true,
          message: '请输入正确的信息！',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginForCode{
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
        .hqyzm{
          .yzm{
            width: 160px;
            height: 48px;
            border: 1px solid #29cb92;
            color: #29cb92;
            border-radius: 25px;
            text-align: center;
            float: right;
            margin-top: 30px;
            background: #fff;
            font-size: 20px;
            span{
              line-height: 43px;
              font-size: 20px;
            }
          }
        }
      }
      .loginBtn{
        width: 100%;
        height: 80px;
        background: #29cb92;
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
          color: #29cb92;
        }
        span:nth-child(2){
          float: right;
        }
      }
    }
  }
</style>
<style>
.loginForCode .el-input__inner{
  height: 100px;
  line-height: 100px;
  padding: 0;
  border: none;
}
.loginForCode .el-form-item__error {
  top: 75%;
}
</style>
