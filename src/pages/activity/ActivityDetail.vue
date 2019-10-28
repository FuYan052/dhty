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
        <div class="headImgBox" >
          <div class="left" @click="toList">
            <div 
              class="imgItem" v-for="(it,ind) in theDetail.enrolledVoList" 
              :key="ind"
              :class="{groupOwner : it.group}"
              >
              <img :src="it.image" style="width: 100; height:100%; border-radius: 50%;" alt="">
            </div>
          </div>
          <span class="el-icon-arrow-right" @click="toList"></span>
        </div>
      </div>
      <!-- 规则 -->
      <div class="regularBox" ref="rule">
        <div class="regularTitle">规则</div>
        <p>1、新人第一次活动请电话或者微信联系，以便为您提供更好的服务。电话：187（微信同号）。</p>
        <p>2、活动人请按照客服通知的场地编号对号入场，球员按水平被分组，6人一个场地，练习热身实行15分钟轮换，双打比赛实行上下制（活动开始首局负者下场，其余时间不论胜负，每名球员打两局下场休息一局再上，禁止霸场，乱串场地）。</p>
        <p>3、请参与者自带球拍，穿运动装和羽毛球球鞋（如果没有球拍或球鞋可提前到来虎小店购买，我们将免费给你配送到场地）。运动前可吃少许易消化食物，不宜空腹或者饱胀进行剧烈活动，可自带温水。</p>
        <p>4、活动开始前2小时可取消参与活动；报名未到或者未在活动开始前两小时取消的。均按照当场活动费用扣费。</p>
        <p>5、所有活动均属个人自愿自主参与的，确认报名前请仔细阅读《免责声明》，所有参与者都是独立的责任人，户外及体育活动具有一定的危险性，可能发生危及生命的意外事故和疾病，活动参与者应特别注意安全并自己购买意外保险，没有人对活动中发生的意外事故负责。</p>
        <p>6、因本次活动属于低价半自助打球行为，所以羽毛球会由本次活动的临时群主在活动开始前领取并分配给球友，若活动开始前发现临时群主还未发放羽毛球的，可与客服联系，客服电话：187.（临时群主的资格获取、福利、责任等，详见“临时群主的福利与义务”）。</p>
      </div>
      <!-- 特殊服务 -->
      <!-- <div class="service">
        <div class="serviceTitle">特殊服务</div>
        <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
        <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
      </div> -->
      <!-- 来虎领队义务与福利 -->
      <div class="tourLeaderService" ref="leader">
        <div class="title">来虎领队义务与福利</div>
        <p>1、在“确认支付”页面选择“担任临时群主”并成功担任的，本次活动可直接抵扣8元报名费用。</p>
        <p>2、一场活动有且仅有一个临时群主，所以若有其他人已经担任，则您在支付时会失败，此时需要您取消“担任临时群主”的选择，继续按照普通球友的方式支付。</p>
        <p>3、在选择担任临时群主时，请您确保能提前到达活动场馆并能按照信息提示到来虎自助取球机或场馆前台领球，分发到每个场地；在活动结束后主动收拾残球，并回收入柜。</p>
      </div>
      <!-- 来虎领队 -->
      <div class="tourLeader">
        <div class="title">来虎领队</div>
        <p class="p1">手机：13345436788<span class="el-icon-arrow-right"></span><a :href="'tel:' + theDetail.phone"><span class="el-icon-phone"></span></a></p>
        <p class="p2">电话：028-85514712<span class="el-icon-arrow-right"></span><a href="tel: 028-85514712"><span class="el-icon-phone-outline"></span></a></p>
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
  mounted () {
    // 当前一页点击的是‘临时领队’时滚动条滚动到临时领队位置
    if(window.sessionStorage.getItem('clickType') === '领队') {
      const scrollHeight = this.$refs.leader.offsetTop - 10
      window.scrollTo(0,scrollHeight)
    }
    // 当前一页点击的是‘规则’时滚动条滚动到规则位置
    if(window.sessionStorage.getItem('clickType') === '规则') {
      const scrollHeight = this.$refs.rule.offsetTop - 10
      window.scrollTo(0,scrollHeight)
    }
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
            that.$toast({
              message: '抱歉，调起导航失败，请重试！',
              duration: 2000
            });
          }
        })
      })
      // 当微信获取位置配置失败
      wx.error(function(res){
        that.$toast({
          message: '抱歉，调起导航失败，请重试！',
          duration: 2000
        });
      });
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
    window.sessionStorage.removeItem('clickType')
  }
}
</script>

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    // padding-bottom: 165px;
    padding-bottom: 700px;
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
            .groupOwner{
              border: 2px solid #fac31e;
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
        padding-bottom: 20px;
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
      // .service{
      //   width: 100%;
      //   min-height: 300px;
      //   background: #fff;
      //   margin-top: 20px;
      //   overflow: hidden;
      //   padding: 0 20px;
      //   .serviceTitle{
      //     width: 100%;
      //     height: 60px;
      //     font-size: 28px;
      //     line-height: 60px;
      //   }
      // }
      .tourLeaderService{
        width: 100%;
        min-height: 300px;
        background: #fff;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 20px;
        padding-bottom: 20px;
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
          span{
            font-size: 34px;
            float: right;
            line-height: 45px;
          }
          a{
            color: #68df62;
            font-size: 34px;
            float: right;
            margin-right: 15px;
            // line-height: 23px;
            line-height: 45px;
          }
        }
        .p2{
          span{
            font-size: 34px;
            float: right;
            line-height: 45px;
          }
          a{
            color: #e9c628;
            font-size: 34px;
            float: right;
            margin-right: 15px;
            line-height: 45px;
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