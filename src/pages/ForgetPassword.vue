<template>
  <!-- 忘记密码 -->
  <div class="forgetPassword" v-title data-title="忘记密码">
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
                  <el-input type="password" placeholder="请输入6-16位的新密码" v-model="ruleForm.inputPassword"></el-input>
                </el-form-item>
              </el-form>
          </li>
          <li class="passWord">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="" prop="inputRePassword">
                  <el-input type="password" placeholder="确认新密码" v-model="ruleForm.inputRePassword"></el-input>
                </el-form-item>
              </el-form>
          </li>
          <li class="hqyzm">
            <input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="placeholderStyle">
            <el-button class="yzm" :disabled='disabled' @click="getCode3">{{content}}</el-button>
          </li>
        </ul>
        <div class="resetBtn" @click="resetPassword">
          确认
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
        new Error('请输入11位手机号！'))
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
    getCode3() {  
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
        this.$toast({
          message: '手机号格式不正确！',
          duration: 2000
        });
      }
    },
    resetPassword() {
      if(this.rule1 && this.rule2 && this.rule3 && this.code !== '') {
        const params = {
          phone: this.ruleForm.phoneNum,
          passWord: this.ruleForm.inputRePassword,
          code: this.code,
        }
        this.$http.postForgetPassword(params).then(resp => {
          // console.log(resp)
          if(resp.status == 200) {
            this.$toast({
              message: '密码修改成功！',
              duration: 2000
            });
          }
        })
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
    background: #f2f2f2;
    overflow: hidden;
    padding: 0 80px;
    .resetPassword{
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
            line-height: 100px;
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
            idth: 160px;
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
      .resetBtn{
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
    }
  }
</style>
<style>
.forgetPassword .el-input__inner{
  height: 100px;
  line-height: 100px;
  padding: 0;
  border: none;
  font-size: 32px;
  background: #f2f2f2;
}
.forgetPassword .el-form-item__error {
  top: 35%;
  right: 0;
  left: auto;
  font-size: 22px;
  color: red;
}
.forgetPassword .el-icon-view{
  font-size: 26px;
  line-height: 105px;
}
.forgetPassword ul li input{
  background: #f2f2f2;
  height: 80px !important;
  font-size: 32px;
}
.forgetPassword input:-ms-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.forgetPassword input::-moz-placeholder{
  color: #909090;
  font-size: 32px;
}
.forgetPassword input::-webkit-input-placeholder{
  color: #909090;
  font-size: 32px;
}
</style>
