<template>
  <div class="registerLabel" v-title data-title="注册">
    <div class="topBg topBgMale" v-show="isMale">
      <div class="skipBtn" @click="handleSkipBtn">跳过 ></div>
    </div>
    <div class="topBg topBgFemale" v-show="!isMale">
      <div class="skipBtn" @click="handleSkipBtn">跳过 ></div>
    </div>
    <p class="title1">选择你的形象标签</p>
    <p class="title2">选择越多推荐的信息越精准</p>
    <ul class="labelBox">
      <li 
        v-for="(item,index) in labelList" 
        :key="index"
        @click="selected(item,index)"
        :class="{selected:selectedListIds.indexOf(item.id)>=0}"
        >{{item.name}}</li>
    </ul>
    <p class="saveBtn" @click="submit">我选好了</p>
  </div>
</template>

<script>
export default {
  name: 'RegisterLabel',
  data() {
    return {
      isMale: true,
      labelList: [],
      selectedListIds: [],
      lastSelect: ''
    }
  },
  created() {
    // 上一页选择的信息
    this.lastSelect = JSON.parse(window.sessionStorage.getItem('registerInfo')) 
    console.log(this.lastSelect)
    if(this.lastSelect.sexValue == '男') {
      this.isMale = true
    }else{
      this.isMale = false
    }
    this.$http.postInitLebal().then(resp => {
      console.log(resp)
      this.labelList = resp.data
    })
  },
  methods: {
    //选择标签
    selected(it,ind) {
      // 选中的标签id集合
      let selectedIdIndex = this.selectedListIds.indexOf(it.id)
      if(selectedIdIndex >= 0) {
        this.selectedListIds.splice(selectedIdIndex, 1)
      }else{
        this.selectedListIds.push(it.id)
      }
    },
    // 跳过
    handleSkipBtn() {
      const params = {
        userId: window.localStorage.getItem('userId'),
        sex: this.lastSelect.sexValue,
        ageGroup: this.lastSelect.birthdayValue,
        occupationLevel: this.lastSelect.levelValue,
        occupation: this.lastSelect.workValue,
      }
      // console.log(params)
      this.$http.postRegisterInfo(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          if(window.sessionStorage.getItem('isRegister')) {
            this.$router.replace({
              path: '/home/login'
            })
            window.sessionStorage.removeItem('isRegister')
          }else{
            this.$router.replace({
              path: window.sessionStorage.getItem('routerPath'),
              name: window.sessionStorage.getItem('routerPathName'),
                params: {
                  _userId: window.localStorage.getItem('userId')
                }
            })
          }
        }
      })
    },
    // 选择标签后提交
    submit() {
      const params = {
        userId: window.localStorage.getItem('userId'),
        sex: this.lastSelect.sexValue,
        ageGroup: this.lastSelect.birthdayValue,
        occupationLevel: this.lastSelect.levelValue,
        occupation: this.lastSelect.workValue,
        labelId: this.selectedListIds.join(',')
      }
      // console.log(params)
      this.$http.postRegisterInfo(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          if(window.sessionStorage.getItem('isRegister')) {
            this.$router.replace({
              path: '/home/login'
            })
            window.sessionStorage.removeItem('isRegister')
          }else{
            this.$router.replace({
              path: window.sessionStorage.getItem('routerPath'),
              name: window.sessionStorage.getItem('routerPathName'),
                params: {
                  _userId: window.localStorage.getItem('userId')
                }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .registerLabel{
    width: 100%;
    min-height: 100vh;
    background: #fefefe;
    .topBg{
      width: 100%;
      height: 438px;
      background: url("../assets/male.jpg") no-repeat center;
      background-size: cover;
      .skipBtn{
        width: 94px;
        height: 45px;
        line-height: 45px;
        float: right;
        font-size: 26px;
        color: #9b999c;
        margin-top: 36px;
        margin-right: 30px;
      }
    }
    .topBgFemale{
      background: url("../assets/female.jpg") no-repeat center;
      background-size: cover;
    }
    .title1{
      font-size: 43px;
      line-height: 43px;
      margin-top: 30px;
      text-align: center;
      color: #1b181c;
    }
    .title2{
      font-size: 25px;
      line-height: 25px;
      margin-top: 33px;
      text-align: center;
      color: #4c4c4c;
    }
    .labelBox{
      width: 540px;
      height: 502px;
      margin: 0 auto;
      margin-top: 65px;
      font-size: 0;
      overflow: auto;
      li{
        width: 218px;
        height: 68px;
        font-size: 32px;
        display: inline-block;
        line-height: 66px;
        border-radius: 40px;
        color: #585858;
        text-align: center;
        border: 1px solid #cacaca;
        margin-bottom: 25px;
        margin-left: 20px;
        // vertical-align: top;
      }
      li:nth-of-type(even){
        margin-left: 64px;
      }
      .selected{
        background: #ffb400;
        border: 1px solid #ffb400;
        line-height: 66px;
        border: none;
        color: #fff;
      }
    }
    .saveBtn{
      font-size: 56px;
      text-align: center;
      line-height: 56px;
      margin-top: 55px;
    }
  }
</style>