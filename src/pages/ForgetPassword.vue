<template>
  <!-- 忘记密码 -->
  <div class="forgetPassword">
    <div class="top">
      <span></span>
    </div>
    <p class="name">忘记密码</p>
    <div class="wrap">
      中国<span>+86</span>
    </div>
    <div class="resetPassword">
        <ul>
          <li>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="" prop="phoneNum">
                <el-input v-model="ruleForm.phoneNum" placeholder="请输入您的手机号"></el-input>
              </el-form-item>
            </el-form>
          </li>
          <li class="passWord">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="" prop="inputPassword">
                  <el-input type="password" placeholder="请输入6-16位的新密码" show-password v-model="ruleForm.inputPassword"></el-input>
                </el-form-item>
              </el-form>
          </li>
          <li class="passWord">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="" prop="inputRePassword">
                  <el-input type="password" placeholder="确认新密码" show-password v-model="ruleForm.inputRePassword"></el-input>
                </el-form-item>
              </el-form>
          </li>
          <li class="hqyzm">
            <input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="placeholderStyle">
            <el-button class="yzm" :disabled='disabled' @click="getCode">{{content}}</el-button>
          </li>
        </ul>
        <div class="resetBtn" @click="resetPassword">
          重置密码
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
   data() {
     let validPhone=(rule,value,callback)=>{
      let reg=/[0-9]{11}/
      if(!reg.test(value)){callback(
        new Error('账号必须是11位的手机号'))
        this.rule1 = false
      }else{
        this.callback1()
      }
    };
    let validPassword=(rule,value,callback)=>{
      let reg=/[0-9a-zA-Z]{6,16}/
      if(!reg.test(value)){callback(
        new Error('密码必须是6-16位'))
        this.rule2 = false
      }else{
        this.callback2()
      }
    };
    let validRePassword=(rule,value,callback)=>{
      if(value !== this.ruleForm.inputPassword){callback(
        new Error('两次密码不一致'))
        this.rule3 = false
      }else{
        this.callback3()
      }
    };
    return {
       ruleForm: {
        phoneNum: '',
        inputPassword: '',
        inputRePassword: ''
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
        inputPassword: [
          { validator:validPassword,trigger:'blur' }
        ],
        inputRePassword: [
          { validator:validRePassword,trigger:'blur' }
        ]
      },
      rule1: false,  //当输入合法时才允许重置密码操作
      rule2: false,  //当输入合法时才允许重置密码操作
      rule3: false,  //当输入合法时才允许重置密码操作
    }
  },
  methods: {
    // 输入值合法时的回调
    callback1() {
      this.rule1 = true
    },
    callback2() {
      this.rule2 = true
    },
    callback3() {
      this.rule3 = true
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
    resetPassword() {
      if(this.rule1 && this.rule2 && this.rule3 && this.code !== '') {
        const params = {
          phone: this.ruleForm.phoneNum,
          passWord: this.ruleForm.inputRePassword,
          code: this.code,
        }
        console.log(params)
      } else {
        this.$message({
          showClose: true,
          message: '请输入正确的信息及验证码！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .forgetPassword{
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
    .resetPassword{
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
        .passWord{
          .showPassword{
            width: 30px;
            height: 30px;
            font-size: 30px;
            float: right;
            margin-top: 30px;
            color: #cbcbcb;
          }
        }
        .hqyzm{
          .yzm{
            width: 160px;
            height: 48px;
            border: 1px solid #fac31e;
            color: #fac31e;
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
      .resetBtn{
        width: 100%;
        height: 80px;
        background: #fac31e;
        color: #fff;
        line-height: 80px;
        text-align: center;
        margin-top: 170px;
        border-radius: 40px;
        margin-bottom: 35px;
        padding-left: 15px;
      }
    }
  }
</style>
<style>
.forgetPassword .el-input__inner{
  height: 100px;
  line-height: 100px;
  padding: 0;
  border: none;
}
.forgetPassword .el-form-item__error {
  top: 75%;
}
</style>
