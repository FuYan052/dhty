<template>
  <div class="registerUserInfo" v-title data-title="注册">
    <div class="wrap">
      <!-- 性别 -->
      <div class="info info1">
        <p class="title">你的性别</p>
        <ul>
          <li 
            v-for="(item,index) in list1" 
            :key="index"
            @click="changeSex(item,index)"
            :class="{activeColor: index === currSexIndex}"
            >
            {{item}}
          </li>
        </ul>
      </div>
      <!-- 你是一位 -->
      <div class="info info2">
        <p class="title">你是一位</p>
        <ul>
          <li 
            v-for="(item,index) in list2" 
            :key="index"
            @click="changeBirthday(item,index)"
            :class="{activeColor: index === currBirthdayIndex}"
            >
            {{item}}
          </li>
        </ul>
      </div>
      <!-- 你觉得你自己的水平 -->
      <div class="info info3">
        <p class="title">你觉得你自己的水平</p>
        <ul>
          <li 
            v-for="(item,index) in list3" 
            :key="index"
            @click="changeLevel(item,index)"
            :class="{activeColor: index === currLevelIndex}"
            >
            {{item}}
          </li>
        </ul>
      </div>
      <!-- 你的职业 -->
      <div class="info info4">
        <p class="title">你的职业</p>
        <ul>
          <li 
            v-for="(item,index) in list4" 
            :key="index"
            @click="changeWork(item,index)"
            :class="{activeColor: index === currWorkIndex}"
            >
            {{item}}
          </li>
        </ul>
      </div>
      </div>
      <!-- 确认 -->
      <div class="sureButton" @click="sureButton">提交</div>
  </div>
</template>

<script>
export default {
  name: 'RegisterUserInfo',
  data() {
    return {
      list1: ['男', '女'],
      list2: ['69前', '70后','80后','90后','00后'],
      list3: ['初级', '中级','高级','专业'],
      list4: ['军人', '创业','学生','事业编','技术流','生产人',
              '运输人', '自由职业','商业服务人'],
      currSexIndex: '',
      currBirthdayIndex: '',
      currLevelIndex: '',
      currWorkIndex: '',
      sexValue: '',
      birthdayValue: '',
      levelValue: '',
      workValue: '',
    }
  },
  methods: {
    changeSex(item,index) {
      this.currSexIndex = index
      this.sexValue = item
    },
    changeBirthday(item,index) {
      this.currBirthdayIndex = index
      this.birthdayValue = item
    },
    changeLevel(item,index) {
      this.currLevelIndex = index
      this.levelValue = item
    },
    changeWork(item,index) {
      this.currWorkIndex = index
      this.workValue = item
    },
    sureButton() {
      if(this.sexValue == '') {
        this.$toast({
          message: '请选择性别！',
          duration: 2000
        });
      }else if(this.birthdayValue == '') {
        this.$toast({
          message: '请选择年龄段！',
          duration: 2000
        });
      }else if(this.levelValue == '') {
        this.$toast({
          message: '请选择水平！',
          duration: 2000
        });
      }else if(this.workValue == '') {
        this.$toast({
          message: '请选择职业！',
          duration: 2000
        });
      }else{
        const params = {
          sexValue: this.sexValue,
          birthdayValue: this.birthdayValue,
          levelValue: this.levelValue,
          workValue: this.workValue
        }
        window.sessionStorage.setItem('registerInfo',JSON.stringify(params))
        this.$router.replace({
          path: '/home/register/registerLabel',
          name: 'RegisterLabel',
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .registerUserInfo{
    width: 100%;
    min-height: 100vh;
    padding: 0 54px;
    overflow: hidden;
    .wrap{
      width: 100%;
      height: 82vh;
      margin-top: 70px;
      overflow: auto;
      // border: 1px solid red;
      .info{
        width: 100%;
        height: 245px;
        padding: 0 33px;
        .title{
          text-align: center;
          font-size: 32px;
          line-height: 32px;
          margin-bottom: 57px;
          color: #797979;
        }
        ul{
          width: 100%;
          height: 98px;
          li{
            width: 49.2%;
            height: 98px;
            font-size: 27px;
            float: left;
            background: #f4f4f4;
            margin-left: 1.3%;
            line-height: 98px;
            text-align: center;
            border-radius: 5px;
            box-shadow:0px 2px 2px rgba(0,0,0,0.2);
          }
          li:nth-child(1){
            margin-left: 0;
          }
          .activeColor{
            color: #ffb400;
            font-size: 31px;
          }
        }
      }
      .info2{
        ul{
          li{
            width: 18.85%;
            margin-left: 1.4%;
          }
        }
      }
      .info3{
        ul{
          li{
            width: 24%;
            margin-left: 1.3%;
          }
        }
      }
      .info4{
        min-height: 420px;
        // border: 1px solid red;
        ul{
          min-height: 420px;
          li{
            width: 32.3%;
            margin-left: 1.3%;
            margin-bottom: 10px;
          }
          li:nth-child(1){
            margin-left: 0;
          }
          li:nth-child(4){
            margin-left: 0;
          }
          li:nth-child(7){
            margin-left: 0;
          }
        }
      }
    }
    .sureButton{
      width: 100%;
      height: 94px;
      background: #fac31e;
      color: #fff;
      line-height: 94px;
      text-align: center;
      letter-spacing: 2px;
      border-radius: 14px;
      padding-left: 15px;
      font-size: 36px;
      margin-top: 30px;
    }
  }
</style>