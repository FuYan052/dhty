<template>
  <div class="bindPhone" v-title data-title="微信登录" v-show="isShowPage">
  <!-- <div class="bindPhone" v-title data-title="微信登录"> -->
    <div class="bindPhoneBox">
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
          <input type="text" v-model="ckeckCode" placeholder="请输入手机验证码" placeholder-class="placeholderStyle">
          <el-button class="yzm" :disabled='disabled' @click="getCode2">{{content}}</el-button>
        </li>
      </ul>
      <div class="loginBtn" @click="BindPhone">
        绑定
      </div>
      <div class="logoImg">
        <img src="../assets/logoImg.png" style="width: 100%; height: 100%;" alt="">
      </div>
      <div class="agreement">
        <span class="radiu" :class="{raiduChecked : isChecked}" @click="handleAgree"><i class="el-icon-check" v-show="isChecked"></i></span>
          我同意并认可<span class="_mark" @click="toAgreement">《来虎用户协议》</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'BindPhone',
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
      isShowPage: false,
      ckeckCode: '',
      ruleForm: {
        phoneNum: '',
      },
      disabled: false,
      content: '获取验证码',
      totalTime: 0,
      timer: null,
      code: '',
      toPath: '',
      rules: {
        phoneNum: [
          { validator:validPhone,trigger:'blur'}
        ],
      },
      rule1: false, //当输入合法时才允许提交登录信息
      isChecked: false,
      wxUserInfo: ''
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {
    // console.log()
    console.log(window.location.href)
    // console.log(location.search)
    const url = location.search
    const requertUrl = new Object()
    // console.log(url.indexOf("?"))
    if(url.indexOf("?") != -1) {
      var str = url.substr(1);
      console.log(str)
      var strs = str.split("&");
      console.log(strs)
      for(var i = 0; i < strs.length; i ++) {
      requertUrl[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
    }
    // console.log(requertUrl)
    this.code = requertUrl.code
    const _toPath = window.sessionStorage.getItem('routerPath')
    const _toPathName = window.sessionStorage.getItem('routerPathName')
    // console.log(decodeURIComponent(requertUrl.state))
    this.$http.getWXLogin(this.code).then(resp => {
      console.log(resp)
      if(resp.status == 200){
        this.wxUserInfowxUserInfo = resp.data
        if(resp.data.phone === null) {
          this.isShowPage = true
        }else{
          console.log("已注册")
          window.localStorage.setItem('userId', resp.data.userId)
          window.localStorage.setItem('userPhone', resp.data.phone)
          window.localStorage.setItem('ty-token', resp.data.token)
          this.changeLoginStatus(true)
          this.changeUserId(resp.data.userId)
          this.changeUserPhone(resp.data.phone)
          this.changeToken(resp.data.token)
          this.$router.replace({
            path: _toPath,
            name: _toPathName,
            params: {
              _userId: resp.data.userId
            }
          })
        }
      }else{
        this.isShowPage = false
    }
      // if(resp.data.phone !== '') {
      //   console.log("已注册")
      //   window.localStorage.setItem('userId', resp.data.userId)
      //   window.localStorage.setItem('userPhone', resp.data.phone)
      //   window.localStorage.setItem('ty-token', resp.data.token)
      //   this.changeLoginStatus(true)
      //   this.changeUserId(resp.data.userId)
      //   this.changeUserPhone(resp.data.phone)
      //   this.changeToken(resp.data.token)
      //   this.$router.replace({
      //     path: _toPath,
      //     name: _toPathName,
      //     params: {
      //       _userId: resp.data.userId
      //     }
      //   })
      // }else{
      //   this.isShowPage = true
      // }
     })

    this.ruleForm.phoneNum = window.sessionStorage.getItem('weixinInputPhone') || ''
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
        this.$toast({
          message: '手机号格式不正确！',
          duration: 2000
        });
      }
    },
    handleAgree() {
      this.isChecked = !this.isChecked
    },
    toAgreement() {
      window.sessionStorage.setItem('weixinInputPhone', this.ruleForm.phoneNum) //存session防止看了用户协议回来后输入被清空
      this.$router.push({
        path: '/home/register/userAgreement'
      })
    },
    BindPhone() {
      if(this.rule1 && this.ckeckCode !== '' && this.isChecked){
        const params = {
          phone: this.ruleForm.phoneNum,
          authCode: this.ckeckCode,
          headPortrait: this.wxUserInfowxUserInfo.headPortrait,
          nickName: this.wxUserInfowxUserInfo.nickName,
          openId: this.wxUserInfowxUserInfo.openId,
          region: this.wxUserInfowxUserInfo.region,
          sex: this.wxUserInfowxUserInfo.sex,
          token: '',
          userId: '',
        }
        console.log(params)
        this.$http.postBindPhone(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            window.localStorage.setItem('userId', resp.data.userId)
            window.localStorage.setItem('userPhone', resp.data.phone)
            window.localStorage.setItem('ty-token', resp.data.token)
            this.changeLoginStatus(true)
            this.changeUserId(resp.data.userId)
            this.changeUserPhone(resp.data.phone)
            this.changeToken(resp.data.token)
            // this.$toast({
            //   message: '登录成功！',
            //   duration: 2000
            // });
            // 登录成功后跳转回之前要去的页面
            // const toPath = window.sessionStorage.getItem('routerPath')
            // const toPathName = window.sessionStorage.getItem('routerPathName')
            this.$messagebox({
              title: '提示',
              message: `为了方便您下次登录，我们为您设置的初始密码为手机号后六位:${resp.data.initPassword}！`,
              showCancelButton: false,
              confirmButtonText: '知道了'
            });
            this.$router.replace({
              path: '/home/register/registerUserInfo',
            })
          }
        })
      }else{
        if(!this.rule1 || this.ckeckCode === '') {
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
      window.sessionStorage.removeItem('weixinInputPhone')
    },
  }
}
</script>

<style lang="scss" scoped>
  .bindPhone{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    padding: 0 80px;
    .bindPhoneBox{
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
        margin-top: 400px;
        margin-bottom: 65px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .logoImg{
      width: 81px;
      height: 113px;
      margin: 0 auto;
      margin-top: 250px;
      margin-bottom: 65px;
      // img{
      //   width: 100%;
      //   height: 100%;
      // }
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
.bindPhone .el-input__inner{
  font-size: 32px;
  height: 80px;
  padding: 0;
  border: none;
  background: #f2f2f2;
}
.bindPhone .el-form-item__error {
  top: 35%;
  right: 0;
  left: auto;
  font-size: 22px;
  color: red;
}
.bindPhone .el-icon-view{
  font-size: 26px;
  line-height: 105px;
}
.bindPhone ul li input{
  background: #f2f2f2;
  height: 80px !important;
  font-size: 32px;
  /* border: 1px solid red !important; */
}
.bindPhone input:-ms-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.bindPhone input::-moz-placeholder{
  color: #909090;
  font-size: 32px;
}
.bindPhone input::-webkit-input-placeholder{
  color: #909090;
  font-size: 32px;
}
.mint-msgbox {
    width: 70%;
  }
.mint-msgbox-title{
  font-size: 26px;
}
.mint-msgbox-message{
  color: rgb(22, 21, 21);
  font-size: 28px;
}
.mint-msgbox-content{
  padding: 60px 10px;
}
.mint-msgbox-btns{
  height: 80px;
  font-size: 28px;
}
</style>