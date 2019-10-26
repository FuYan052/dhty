<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <div class="wrap">
      <!-- 图片 -->
      <div class="topimg">
        <img :src="theDetail.cVenueImage" style="width:100%; height: 100%;" alt="">
      </div>
      <!-- 标题及报名情况 -->
      <div class="titleBox">
        <div class="titleText">{{theDetail.title}}</div>
        <div class="people">
          <span class="span1">￥{{theDetail.cost}}/人</span>
          <span class="span2">报名情况：{{theDetail.enrolled}}/{{theDetail.people}}</span>
        </div>
      </div>
      <!-- 时间详情 -->
      <div class="detailBox">
        <div class="p1">时间：{{theDetail.time}}&nbsp;&nbsp;{{theDetail.timeStart}}-{{theDetail.timeEnd}}</div>
        <div class="p1 p2">地点：{{theDetail.venueName}}<span @click="toMap" class="el-icon-map-location"></span></div>
        <p>已报名会员:</p>
        <div class="headImgBox">
          <div class="left">
            <div class="imgItem" v-for="(it,ind) in theDetail.enrolledVoList" :key="ind">
              <img :src="it.image" style="width: 100; height:100%; border-radius: 50%;" alt="">
            </div>
          </div>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <!-- 规则 -->
      <div class="regularBox">
        <div class="regularTitle">规则</div>
        <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
        <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
      </div>
      <!-- 特殊服务 -->
      <div class="service">
        <div class="serviceTitle">特殊服务</div>
        <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
        <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
      </div>
      <!-- 来虎领队义务与福利 -->
      <div class="tourLeaderService">
        <div class="title">来虎领队义务与福利</div>
        <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
        <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
      </div>
      <!-- 来虎领队 -->
      <div class="tourLeader">
        <div class="title">来虎领队</div>
        <p class="p1">手机：13345436788<span class="el-icon-arrow-right"></span><a :href="'tel:' + theDetail.phone"><span class="el-icon-phone"></span></a></p>
        <p class="p2">电话：028-85514712<span class="el-icon-arrow-right"></span><span class="el-icon-phone-outline"></span></p>
        <div class="text">如有疑问可添加来虎领队微信或拨打来虎领队电话咨询</div>
      </div>
    </div>
    
    <!-- 报名截止 -->
    <div class="time">
      <p class="p1">报名截止还有：<span>{{content}}</span></p>
      <div class="p2">
        <div class="checkbox" @click="checked" :class="{checked:isChecked}"><span v-show="isChecked" class="span1 el-icon-check"></span></div>
        <div class="span2">我已阅读并同意<span class="span3" @click="toEscapeClause">《免责条款》</span></div>
      </div>
      <el-button @click="submit">{{theDetail.osState}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDetail',
  data() {
    return {
      activityDetailId: '',
      theDetail: '',
      imgurl: '',
      isChecked: false,  //是否勾选免责条款
      disabled: false,  //报名按钮是否能点击
      content: '',  //倒计时内容
      endTime: '',
      isTosignUp: '',
      state: '',  //后端传过来为2时，则表示人员已满，不能报名
    }
  },
  created() {
    this.activityDetailId = this.$route.params.id
    this.$http.activitiesDetail(this.activityDetailId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data
        this.state = resp.data.state
        this.peopleLength = resp.data.enrolled
        this.groupId = resp.data.groupId
        this.imgurl = resp.data.image
        this.endTime = (new Date(resp.data.endTime.replace(/-/g,'/')).getTime()) / 1000
        this.countdowm(this.endTime) //执行倒计时函数
      }
    })
  },
  methods: {
    // 免责条款
    toEscapeClause() {
      this.$router.push({
        path: '/escapeClause'
      })
    },
    // 地图导航
    toMap() {
      const that = this
      const configData = JSON.parse(window.sessionStorage.getItem('config'))
      // console.log(configData) 
      wx.config({
        // debug: true,
        appId: 'wxd3d4d3045a1213a1',
        timestamp: configData.timestamp,
        nonceStr: configData.nonceStr,
        signature: configData.signature,
        jsApiList: ['openLocation']
      });
      wx.ready(function() {
        wx.openLocation({
          longitude: Number(that.theDetail.lon),
          latitude: Number(that.theDetail.lat),
          scale: 13,
          name: that.theDetail.venueName,
          address: that.theDetail.address,
          fail: function() {
            that.$toast('抱歉，调起导航失败，请重试！')
          }
        })
      })
    },
    // 报名列表
    toList() {
      this.$router.push({
        path: '/signUpList',
      })
    },
    checked() {
      this.isChecked = !this.isChecked
    },
    // 倒计时
    countdowm(timestamp) {
      // console.log(timestamp)
      let self = this
      let timer = setInterval(function() {
        let nowTime = new Date();
        // let endTime = new Date(timestamp * 1000);
        let endTime = timestamp * 1000;
        // console.log(endTime)
        let t = endTime - nowTime.getTime();
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
          self.isTosignUp = true
        } else{
          self.isTosignUp = false
          clearInterval(timer);
          self.content = '报名结束';
          self._callback();
        }
        // if(self.content == '') {
        //   self.content = '报名结束'
        // }
      },1000)
    },
    _callback(){
      if(this.callback && this.callback instanceof Function){
        console.log(...this)
        this.callback(...this);
      }
    },
    submit() {
      console.log(this.isTosignUp)
      if(this.state == 3) {
        this.$toast({
          message: '抱歉，人员已满！',
          duration: 2000
        });
      }else if(this.state == 4) {
        this.$toast({
          message: '抱歉，报名已结束！',
          duration: 2000
        });
      }else{
        if(this.isTosignUp && this.state !== 2) {
          if(this.isChecked) {
            // this.$router.push({
            //   path: '/activitySignUp'
            // })
            const redirectUrl = encodeURIComponent(`https://laihu.baogongxia.com/#/activitySignUp`)
            // const redirectUrl = encodeURIComponent(`http://192.168.0.137:8082/#/activitySignUp`)
            // const appid = 'wxf1894ca38c849d17'  //测试号
            const appid = 'wxd3d4d3045a1213a1'  
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state='1'#wechat_redirect`
          }else{
            this.$toast({
              message: '未同意《免责条款》！',
              duration: 2000
            });
          }
        }else{
          this.$toast({
            message: '报名已结束！',
            duration: 2000
          });
        }
      }
    },
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('config')
  }
}
</script>

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 165px;
    .wrap{
      padding: 0 20px;
      .topimg{
        width: 100%;
        height: 300px;
      }
      .titleBox{
        width: 100%;
        height: 130px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        .titleText{
          font-size: 30px;
          line-height: 30px;
          margin-top: 20px;
        }
        .people{
          width: 100%;
          margin-top: 20px;
          span{
            display: block;
          }
          .span1{
            float: left;
            color: #fdb20f;
          }
          .span2{
            float: right;
          }
        }
      }
      .detailBox{
        width: 100%;
        height: 320px;
        background: #fff;
        margin-top: 20px;
        padding: 0 20px;
        overflow: hidden;
        .p1{
          width: 100%;
          height: 80px;
          font-size: 28px;
          line-height: 80px;
          border-bottom: 1px solid #dedede;
        }
        p{
          margin-top: 20px;
        }
        .p2{
          padding-right: 10px;
          span{
            font-size: 32px;
            float: right;
            color: #43bcf1;
            line-height: 80px;
          }
        }
        .headImgBox{
          width: 100%;
          height: 80px;
          .left{
            width: 80%;
            height: 80px;
            float: left;
            padding-top: 10px;
            .imgItem{
              width: 60px;
              height: 60px;
              float: left;
              border-radius: 50%;
              border: 1px solid #fff;
            }
          }
          span{
            float: right;
            font-size: 32px;
            line-height: 80px;
          }
        }
      }
      .regularBox{
        width: 100%;
        min-height: 300px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        .regularTitle{
          width: 100%;
          height: 60px;
          font-size: 28px;
          line-height: 60px;
        }
        p{
          font-size: 27px;
          line-height: 40px;
          margin-top: 10px;
        }
      }
      .service{
        width: 100%;
        min-height: 300px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        .serviceTitle{
          width: 100%;
          height: 60px;
          font-size: 28px;
          line-height: 60px;
        }
      }
      .tourLeaderService{
        width: 100%;
        min-height: 300px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        .title{
          width: 100%;
          height: 60px;
          font-size: 28px;
          line-height: 60px;
        }
      }
      .tourLeader{
        width: 100%;
        min-height: 250px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        .title{
          width: 100%;
          height: 60px;
          font-size: 28px;
          line-height: 60px;
          border-bottom: 1px solid #dedede;
        }
        p{
          width: 100%;
          margin-top: 15px;
          span{
            float: right;
          }
        }
        .p1{
          a{
            color: #68df62;
            font-size: 34px;
            float: right;
            margin-right: 15px;
            line-height: 23px;
          }
        }
        .p2{
          span:nth-of-type(2){
            color: #e9c628;
            font-size: 34px;
            margin-right: 15px;
            line-height: 23px;
          }
        }
        .text{
          width: 100%;
          height: 60px;
          font-size: 23px;
          line-height: 60px;
          border-top: 1px solid #dedede;
          margin-top: 20px;
        }
      }
    }
    .time{
      width: 100%;
      height: 146px;
      background: #fff;
      margin-top: 45px;
      border-top: 1px solid #f5f2f2;
      border-bottom: 1px solid #f5f2f2;
      position: fixed;
      bottom: 0;
      // position: relative;
      .p1{
        font-size: 25px;
        padding-left: 20px;
        color: #636468;
        margin-top: 25px;
        span{
          font-size: 25px;
          color: #ee5e39;
        }
      }
      .p2{
        width: 490px;
        height: 60px;
        position: relative;
        // padding-top: 20px;
        line-height: 60px;
        padding-left: 20px;
        position: relative;
        .checkbox{
          width: 35px;
          height: 35px;
          margin-top: 12px;
          float: left;
          line-height: 32px;
          text-align: center;
          border: 2px solid #c8c8ca;
          border-radius: 50%;
          .span1{
            font-size: 25px;
            text-align: center;
            color: #fff;
          }
        }
        .checked{
          border: 2px solid #ffd200;
          background: #ffd200;
        }
        .span2{
          height: 60px;
          line-height: 60px;
          float: left;
          padding-left: 10px;
          font-size: 22px;
          color: #4a5157;
          // position: absolute;
          // top: 13px;
          // .span3{
          //   color: #6a9cbf;
          // }
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
    background: #ee5e39;
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