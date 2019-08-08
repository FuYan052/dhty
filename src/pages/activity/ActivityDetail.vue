<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <div class="topTitle">
      <p class="p1">活动主题：</p>
      <p class="p2">俱乐部俱乐部活动晚俱乐部活动晚活动7月22日周一浩然俱乐部活动晚上俱乐部活动晚7:00周一浩然俱乐部活动周一浩然俱乐部活动</p>
    </div>
    <ul>
      <li>
        <span class="span1">活动时间：</span>2019-06-26&nbsp;&nbsp;19:00-21:00
      </li>
      <li>
        <span class="span1">报名费用：</span>￥180
      </li>
      <li>
        <span class="span1">活动地点：</span>中和首创羽毛球馆<span class="span2 el-icon-location-information" @click="toMap"><b>导航</b></span>
      </li>
      <li>
        <span class="span1">组&nbsp;&nbsp;织&nbsp;&nbsp;者：</span>17602848628(楠少轻狂)<a href="tel://15096762111"><span class="span2 el-icon-phone-outline"><b>拨打</b></span></a>
      </li>
      <li>
        <span class="span1">俱&nbsp;&nbsp;乐&nbsp;&nbsp;部：</span>成都千羽千寻羽毛球俱乐部<span class="span2 el-icon-house"><b>查看</b></span>
      </li>
      <li>
        <span class="span1">报名人数：</span>4/16
      </li>
      <li class="num">
        <span class="span1">已&nbsp;&nbsp;报&nbsp;&nbsp;名：</span><span class="span2 el-icon-arrow-right"></span>
        <div class="imgBox">
          <img src="../../assets/touxiang.jpg" alt="">
          <img src="../../assets/touxiang.jpg" alt="">
          <img src="../../assets/touxiang.jpg" alt="">
          <img src="../../assets/touxiang.jpg" alt="">
          <img src="../../assets/touxiang.jpg" alt="">
        </div>
      </li>
    </ul>
    <!-- 活动描述 -->
    <div class="descr">
      <div class="tiltle">
        活动详情：
      </div>
      <div class="text">
        活跃在高新区中和首创的一直俱乐部，创建两年时间拥有700位会员球友，每天都有活动，分级对抗，美女多多，每周五还有免费八人转奖品赛，精美奖品免费带回家！！！
      </div>
    </div>
    <!-- 报名截止 -->
    <div class="time">
      <p class="p1">报名截止还有：<span>{{content}}</span></p>
      <div class="p2">
        <div class="checkbox" @click="checked"></div><span v-show="isChecked" class="span1 el-icon-check"></span>
        <span class="span2">我已阅读并同意<span class="span3">《免责条款》</span></span>
      </div>
      <el-button @click="submit">立即报名</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDetail',
  data() {
    return {
      isChecked: true,  //是否勾选免责条款
      disabled: false,  //报名按钮是否能点击
      content: '',  //倒计时内容
      endTime: '1565092516'
    }
  },
  mounted() {
    this.countdowm(this.endTime)
    console.log(new Date().getTime())
    console.log(new Date(1565092516 * 1000))
  },
  methods: {
    toMap() {
      const location = {
        lat: 30.558120,
        lng: 104.057150
      }
      this.$router.push({
        path: '/mapPage',
        name: 'MapPage',
        params: location
      })
      window.sessionStorage.setItem('location',JSON.stringify(location))
    },
    checked() {
      this.isChecked = !this.isChecked
      console.log(this.isChecked)
    },
    submit() {
      // console.log("ok")
      this.$router.push({
        path: '/activitySignUp'
      })
    },
    // 倒计时
    countdowm(timestamp) {
      let self = this
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if(t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          if(day > 0){
            format = `${day}天${hour}小时${min}分${sec}秒`;
          } 
          if(day <= 0 && hour > 0 ){
            format = `${hour}小时${min}分${sec}秒`; 
          }
          if(day <= 0 && hour <= 0){
            format =`${min}分${sec}秒`;
          }
          self.content = format;
        }
        else{
          clearInterval(timer);
          self.content = self.endText;
          self._callback();
        }
      },1000)
    },
    _callback(){
      if(this.callback && this.callback instanceof Function){
        console.log(...this)
        this.callback(...this);
      }
    }
  }
}
</script>  

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #f7f8fa;
    padding-bottom: 210px;
    .topTitle{
      width: 100%;
      min-height: 200px;
      background: #fff;
      border-bottom: 1px solid #dfdfdf;
      overflow: hidden;
      padding: 0 35px;
      .p1{
        width: 100%;
        color: #50505a;
        font-size: 24px;
        line-height: 60px ;
        font-weight: bold;
      }
      .p2{
        font-size: 21px;
        color: #636363;
        float: right;
        line-height: 42px;
        padding-left: 115px;
      }
    }
    ul{
      width: 100%;
      height: auto;
      margin-top: 20px;
      background: #fff;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 35px;
      li{
        width: 100%;
        height: 112px;
        line-height: 112px;
        color: #717171;
        border-top: 1px solid #dfdfdf;
        .span1{
          padding-right: 20px;
          color: #141414;
          font-weight: bold;
          font-size: 24px;
        }
        .span2{
          width: 100px;
          height: 52px;
          font-size: 32px;
          float: right;
          font-weight: bold;
          display: block;
          margin-top: 20px;
          color: #2ebda1;
          text-align: center;
          b{
            display: block;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
          }
        }
      }
      li:nth-of-type(1) {
        border-top: none;
      }
      .num{
        .imgBox{
          width: 490px;
          height: 100px;
          float: right;
          overflow: hidden;
          padding-right: 15px;
          img{
            width: 62px;
            height: 62px;
            border: 1px solid #dedede;
            border-radius: 50%;
            float: left;
            // margin-left: -10px;
            margin-top: 22px;
          }
        }
        .span2{
          width: 70px;
          margin-top: 40px;
          color: #b1b1b1;
        }
      }
    }
    .descr{
      width: 100%;
      min-height: 292px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 38px;
      background: #fff;
      margin-top: 40px;
      .tiltle{
        width: 100%;
        height: 90px;
        line-height: 90px;
        color: #141414;
        font-weight: bold;
        font-size: 24px;
      }
      .text{
        width: 100%;
        height: auto;
        padding-right: 40px;
        font-size: 22px;
        line-height: 40px;
        color: #53575a;
        padding-bottom: 35px;
      }
    }
    .time{
      width: 100%;
      height: 162px;
      background: #fff;
      margin-top: 45px;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      position: fixed;
      bottom: 0;
      // position: relative;
      .p1{
        font-size: 22px;
        padding-left: 20px;
        color: #636468;
        margin-top: 20px;
        span{
          font-size: 25px;
          color: #ba5251;
        }
      }
      .p2{
        width: 490px;
        height: 80px;
        position: relative;
        padding-top: 20px;
        padding-left: 85px;
        position: relative;
        .checkbox{
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 2px solid #c8c8ca;
          border-radius: 50%;
          position: absolute;
          left: 20px;
          top: 10px;
          z-index: 29;
        }
        .span1{
          display: block;
          font-size: 36px;
          font-weight: bold;
          position: absolute;
          left: 26px;
          top: 17px;
          color: #53575a;
        }
        .span2{
          font-size: 22px;
          color: #4a5157;
          display: inline-block;
          position: absolute;
          top: 13px;
          .span3{
            color: #6a9cbf;
          }
        }
      }
    }
  }
</style>
<style>
  .activityDetail .el-button{
    width: 160px;
    height: 80px;
    color: #fff;
    background: #e94e52;
    float: right;
    border-radius: 10px;
    position: absolute;
    top: 28px;
    right: 15px;
    outline: none;
    border: none;
    font-size: 28px;
  }
</style>
