<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <div class="topTitle">
      <p class="p1">【俱乐部活动】7月22日周一浩然俱乐部活动晚上7:00</p>
      <p class="p2">报名情况<span><b>4</b>/24</span></p>
    </div>
    <ul>
      <li>
        <span class="span1 el-icon-time"></span>2019-06-26&nbsp;&nbsp;19:00-21:00<span class="span2 el-icon-arrow-right"></span>
      </li>
      <li>
        <span class="span1 el-icon-location-information"></span>地点：中和首创羽毛球馆<span class="span2 el-icon-arrow-right"></span>
      </li>
      <li>
        <span class="span1 el-icon-phone-outline"></span>组织者：17602848628(楠少轻狂)<span class="span2 el-icon-arrow-right"></span>
      </li>
      <li>
        <span class="span1 el-icon-house"></span>成都千羽千寻羽毛球俱乐部<span class="span2 el-icon-arrow-right"></span>
      </li>
      <li class="num">
        <span class="span1 el-icon-user"></span>人数：4/18<span class="span2 el-icon-arrow-right"></span>
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
        <span class="span1 el-icon-document"></span>活动描述
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
    checked() {
      this.isChecked = !this.isChecked
      console.log(this.isChecked)
    },
    submit() {
      console.log("ok")
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
    .topTitle{
      width: 100%;
      height: 200px;
      background: #fff;
      border-bottom: 1px solid #dfdfdf;
      overflow: hidden;
      .p1{
        width: 100%;
        padding: 0 35px;
        color: #fac41a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 28px;
        margin-top: 50px;
      }
      .p2{
        font-size: 21px;
        color: #0c0c0c;
        float: right;
        margin-right: 20px;
        margin-top: 45px;
        span{
          color: #fac41a;
          padding-left: 10px;
          b{
            font-size: 27px;
          }
        }
      }
    }
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 35px;
      li{
        width: 100%;
        height: 112px;
        line-height: 112px;
        color: #717171;
        padding-right: 20px;
        border-top: 1px solid #dfdfdf;
        .span1{
          padding-right: 20px;
          color: #fcd560;
          font-size: 32px;
        }
        .span2{
          float: right;
          font-weight: bold;
          display: block;
          margin-top: 40px;
          color: #cdcdcd;
        }
      }
      li:nth-of-type(1) {
        border-top: none;
      }
      .num{
        .imgBox{
          width: 240px;
          height: 100px;
          float: right;
          overflow: hidden;
          padding-right: 15px;
          img{
            width: 62px;
            height: 62px;
            border: 1px solid #dedede;
            border-radius: 50%;
            float: right;
            margin-left: -10px;
            margin-top: 22px;
          }
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
        height: 112px;
        line-height: 112px;
        color: #717171;
        border-bottom: 1px solid #dfdfdf;
        .span1{
          padding-right: 20px;
          color: #fcd560;
          font-size: 32px;
        }
      }
      .text{
        width: 100%;
        height: auto;
        padding-right: 40px;
        font-size: 22px;
        line-height: 40px;
        color: #53575a;
        padding-top: 25px;
        padding-bottom: 35px;
      }
    }
    .time{
      width: 100%;
      height: 142px;
      background: #fff;
      margin-top: 45px;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      position: relative;
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
