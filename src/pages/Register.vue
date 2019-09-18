<template>
  <!-- 注册 -->
  <div class="register" v-title data-title="注册">
    <div class="registerInfo">
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
                  <el-input type="password" placeholder="请输入6-16位的密码" v-model="ruleForm.inputPassword"></el-input>
                </el-form-item>
              </el-form>
          </li>
          <li class="hqyzm">
            <input type="text" v-model="checkCode" placeholder="请输入验证码" placeholder-class="placeholderStyle">
            <el-button class="yzm" :disabled='disabled' @click="getCode1">{{content}}</el-button>
          </li>
        </ul>
        <button class="registerBtn" @click="doRegister" :disabled="isDisabled">
          注册
        </button>
        <img class="logoImg" src="../assets/logoImg.png" alt="">
    </div>
    <div class="agreement">
      <span class="radiu" :class="{raiduChecked : isChecked}" @click="handleAgree"><i class="el-icon-check" v-show="isChecked"></i></span>
      我同意并认可<span class="_mark" @click="toAgreement">《来虎用户协议》</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    let validPhone=(rule,value,callback)=>{
      let reg=/[0-9]{11}/
      if(!reg.test(value)){callback(
        new Error('请输入11位的手机号！'))
        this.rule1 = false
      }else{
        this.callback1()
      }
    };
    let validPassword=(rule,value,callback)=>{
      let reg=/[0-9a-zA-Z]{6,16}/
      if(!reg.test(value)){callback(
        new Error('请输入6-16位的密码！'))
        this.rule2 = false
      }else{
        this.callback2()
      }
    };
    return {
      ruleForm: {
        phoneNum: '',
        inputPassword: '',
      },
      disabled: false,
      content: '获取验证码',
      totalTime: 0,
      timer: null,
      checkCode: '',  //验证码
      rules: {
        phoneNum: [
          { validator:validPhone,trigger:'blur'}
        ],
        inputPassword: [
          { validator:validPassword,trigger:'blur' }
        ]
      },
      rule1: false,  //当输入不合法时无法注册
      rule2: false,  //当输入不合法时无法注册
      isChecked: false,  //是否同意用户协议
      isDisabled: false,  //是否能点击注册，防止用户在短时间内多次提交注册
      timer2: ''
    }
  },
  methods: {
    // 用户协议
    toAgreement() {
      this.$router.push({
        path: '/home/register/userAgreement'
      })
    },
    // 获取验证码
    getCode1() {  
      if(this.rule1) {
        this.totalTime = 60
        this.$http.postCode(this.ruleForm.phoneNum).then(resp => {
          console.log(resp)
          // if(resp.status == 200) {
          //   this.$toast('获取短信验证码！')
          // }
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
    // 输入值合法时的回调
    callback1 () {
      this.rule1 = true
    },
    callback2 () {
      this.rule2 = true
    },
    handleAgree() {
      this.isChecked = !this.isChecked
    },
    toAgreement() {
      this.$router.push({
        path: '/home/register/userAgreement'
      })
    },
    // 提交注册信息
    doRegister() {
      console.log("点击")
      // this.isDisabled = true
      if(this.rule1 && this.rule2 && this.checkCode !== '' && this.isChecked){
        const params = {
          phone: this.ruleForm.phoneNum,
          authCode: this.checkCode,
          passWord: this.ruleForm.inputPassword,
        }
        // console.log(params)
        this.$http.postRegister(params).then(resp => {
          console.log(resp)
          this.isDisabled = true
          const _this = this
          this.timer2 = setTimeout(() => {
            _this.isDisabled = false
            clearTimeout(_this.timer2)
            this.timer2 = null
          },5000)
          if(resp.status == 200) {
            this.$toast({
              message: '注册成功！',
              duration: 2000
            });
            window.sessionStorage.setItem('isRegister',true)
            window.localStorage.setItem('userId',resp.data.id)
            this.$router.replace({
              path: '/home/register/registerUserInfo',
            })
            // this.$router.push({
            //   path: '/home/login'
            // })
          }
        })
      }else{
        this.isDisabled = false
        if(!this.rule1 || this.code === '') {
          this.$toast({
            message: '请输入正确的信息！',
            duration: 2000
          });
        }
        else if(!this.isChecked) {
          this.$toast({
            message: '未同意来虎用户协议！',
            duration: 2000
          });
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .register{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    padding: 0 80px;
    .registerInfo{
      width: 100%;
      min-height: 600px;
      margin-top: 160px;
      // border: 1px solid red;
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
      .registerBtn{
        border: none;
        outline: none;
        width: 100%;
        height: 94px;
        background: #fac31e;
        color: #fff;
        line-height: 94px;
        text-align: center;
        margin-top: 116px;
        letter-spacing: 2px;
        border-radius: 14px;
        padding-left: 15px;
        font-size: 30px;
      }
      .logoImg{
        width: 81px;
        height: 113px;
        margin: 0 auto;
        margin-top: 282px;
        margin-bottom: 65px;
      }
      .agreement{
        font-size: 20px;
        margin-top: 27px;
        text-align: center;
        color: #c8c8c8;
        span{
          color: #fac31e;
        }
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
<style scpoed>
.register .el-input__inner{
  font-size: 32px;
  height: 80px;
  padding: 0;
  border: none;
  background: #f2f2f2;
}
.register .el-form-item__error {
  top: 35%;
  right: 0;
  left: auto;
  font-size: 22px;
  color: red;
}
.register .el-icon-view{
  font-size: 26px;
  line-height: 105px;
}
.register ul li input{
  background: #f2f2f2;
  height: 80px !important;
  font-size: 32px;
  /* border: 1px solid red !important; */
}
.register input:-ms-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.register input::-moz-placeholder{
  color: #909090;
  font-size: 32px;
}
.register input::-webkit-input-placeholder{
  color: #909090;
  font-size: 32px;
}
</style>

