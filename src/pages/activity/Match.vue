<template>
  <!-- 美孚杯羽毛球赛 -->
  <div class="match" v-title data-title="美孚杯羽毛球赛">
    <div class="scrollBox" ref="scrollBox">
      <!-- 图片 -->
      <div class="topimg">
        <div class="img">
          <img src="../../assets/matchBg.jpg" style="width:100%; height: 100%; border-radius: 8px;" alt="">
          <!-- <img :src="theDetail.cVenueImage" style="width:100%; height: 100%; border-radius: 8px;" alt=""> -->
        </div>
        <div class="titleTop">
          <!-- <p class="p1">美孚杯羽毛球赛</p>
          <p class="p2">FASRER HIGHER STRONGER </p> -->
        </div>
      </div>
      <!-- 标题及报名情况 -->
      <div class="titleBox">
        <!-- <div class="titleText">美孚杯羽毛球赛美孚杯羽毛球赛美孚杯羽毛球赛美孚杯羽毛球赛</div> -->
        <div class="titleText">{{theDetail.title}}</div>
        <div class="people">
          <span class="span1">￥<b>{{theDetail.cost}}</b>/人(含订制参赛服1件)</span>
          <span class="span2">{{theDetail.enrolled}}/{{theDetail.people}}</span>
        </div>
      </div>
      <div class="dateBox">
        <div class="common date">
          <span class="span1">时间</span>
          <span class="span2">{{theDetail.time}}</span>
          <span class="span3">{{theDetail.timeStart}}-{{theDetail.timeEnd}}</span>
        </div>
        <div class="common place" @click="toMap">
          <span class="span1">地点</span>
          <span class="span2">{{theDetail.venueName}}</span>
          <span class="span4"></span>
        </div>
        <!-- 已报名会员 -->
        <div class="people" @click="toList">
          <p>已报名会员<span class="el-icon-arrow-right"></span></p>
          <div class="headImgBox" v-show="theDetail.enrolled !== 0">
            <div class="left">
              <div 
                class="imgItem" v-for="(it,ind) in theDetail.enrolledVoList" 
                :key="ind"
                :class="{groupOwner : it.group}"
                >
                <img :src="it.image" style="width: 100; height:100%; border-radius: 50%;" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 收缩项 -->
      <ul class="ul1">
        <li class="li2">
          <div class="title" @click="show4 = !show4">
            参赛条件<span v-show="!show4" class="sp2 el-icon-arrow-down"></span><span  v-show="show4" class="sp2 el-icon-arrow-up"></span>
          </div>
          <div class="detail" v-show="show4">
            <p>1.参赛选手需要身体健康，无遗传病、心脏病等疾病。</p>
            <p>2.在国家体育总局乒羽中心及原国家体委注册的运动员不能参加此次比赛。</p>
            <p>3.本次比赛仅接受男双和混双报名。</p>
          </div>
        </li>
        <li class="li2">
          <div class="title" @click="show5 = !show5">
            赛事安排<span v-show="!show5" class="sp2 el-icon-arrow-down"></span><span  v-show="show5" class="sp2 el-icon-arrow-up"></span>
          </div>
          <div class="detail" v-show="show5">
            <p>1.半决赛前采取单轮淘汰赛，一局31分制，16分交换场地，30平不加分，先到31分为胜。</p>
            <p>2.半决赛及决赛采用三局两胜制，单局采用21分制。</p>
            <p>3.比赛采用有中国羽协审定的《羽毛球竞赛规则》和世界羽联公布的最新规定。</p>
            <p>4.男双遇到混双时让6分。</p>
          </div>
        </li>
        <li class="li2">
          <div class="title" @click="show6 = !show6">
            赛事流程<span v-show="!show6" class="sp2 el-icon-arrow-down"></span><span  v-show="show6" class="sp2 el-icon-arrow-up"></span>
          </div>
          <div class="detail" v-show="show6">
            <p>13:00~13:30 签到、参赛队员抽签及热身</p>
            <p>13:30~15:00 淘汰赛60进30，30进15</p>
            <p>15:00-16:00 再次抽签分组15进8，8进4</p>
            <p>16:00-17:00 半决赛、决赛及颁奖仪式</p>
            <p>注：15:00后两片、16点后四片场地可供淘汰球员自由切磋</p>
         </div>
        </li>
        <li class="li2 prize">
          <div class="title" @click="show7 = !show7">
            奖品设置<span v-show="!show7" class="sp2 el-icon-arrow-down"></span><span  v-show="show7" class="sp2 el-icon-arrow-up"></span>
          </div>
          <ul class="prizeDetail" v-show="show7">
            <li v-for="(item,index) in prizeList" :key="index">
              <div class="left">
                <div class="imgBox">
                  <img :src="item.image" style="height: 100%; width: auto;" alt="">
                </div>
              </div>
              <div class="right">
                <p class="p1">{{item.title}}</p>
                <p class="p2">总价值：<span>{{item.totalPrice}}</span></p>
              </div>
            </li>
            <div class="descr">
              纪念奖：参赛球员均可获得来虎定制马来西亚大赛款价值88元羽毛球速干比赛服一件(报名费68元者)，龙骨手胶及饮用水一瓶。
            </div>
            <div class="memorialAward">
              <div class="btImg img1"></div>
              <div class="btImg img2"></div>
            </div>
         </ul>
        </li>
        <li class="li3">
          <div class="title" @click="show3 = !show3">
            <div class="left" v-show="show3">
              <div class="imgbox">
                <img src="../../assets/laihuHeaderImg.png" style="width:100%; height: 100%; border-radius: 50%;" alt="">
              </div>
            </div>
            <div class="name">
              来虎客服
            </div>
            <div class="nameText" v-show="show3">虎妞</div>
            <span class="sp2 el-icon-arrow-down"></span>
          </div>
          <div class="detail" v-show="show3">
            <div class="comm phone">
              手机<span class="Num">18113011911</span><a href='tel: 18113011911' ><span class="phoneIcon"></span></a>
            </div>
            <div class="comm weixin">
              微信<span class="Num">laihu007&nbsp;(添加微信号咨询)</span><span class="phoneIcon"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部按钮 -->
    <div class="signupWrap">
      <p class="p1">报名截止还有：<span>{{content}}</span></p>
      <div class="check">
        <span class="text" @click="toEscapeClause">我已同意《免责条款》</span>
        <span class="checkBox" @click="checked"><b class="el-icon-check" v-show="isChecked"></b></span>
      </div>
      <div class="btn" @click="submit">立即报名</div>
    </div>
  </div>
</template>

<script> 
export default {
  name: 'Match',
  data() {
    return {
      // show1: true,
      // show2: true,
      show3: false,
      show4: true,
      show5: true,
      show6: true,
      show7: true,
      activityDetailId: '',
      theDetail: '',
      // imgurl: '',  
      isChecked: false,  //是否勾选免责条款
      disabled: false,  //报名按钮是否能点击
      content: '',  //倒计时内容
      endTime: '',
      isTosignUp: '',
      state: '',  //后端传过来为2时，则表示人员已满，不能报名
      prizeList: [],  //奖品列表
      timestamp: '',  //调取微信位置接口参数
      nonceStr: '',  //调取微信位置接口参数
      signature: '',  //调取微信位置接口参数
      isFromUrl: null,  //判断url是否是通过分享链接进入
<<<<<<< HEAD
      fromUrl: '' //分享的类型
=======
      fromType: '' //分享的类型
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
    }
  },
  created() {
    // 判断url及分享类型
<<<<<<< HEAD
    if(window.location.href.indexOf('?from=') > -1) {
      this.isFromUrl = true
      this.fromUrl = encodeURIComponent(window.location.href.split('#')[0]) 
=======
    if(window.location.href.indexOf('?from=singlemessage') > -1) {
      this.isFromUrl = true
      this.fromType = 'singlemessage'
    }else if(window.location.href.indexOf('?from=timeline') > -1) {
      this.isFromUrl = true
      this.fromType = 'timeline'
    }else if(window.location.href.indexOf('?from=groupmessage') > -1) {
      this.isFromUrl = true
      this.fromType = 'groupmessage'
    }else{
      this.isFromUrl = false
      this.fromType = ''
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
    }
    // this.activityDetailId = this.$route.params.id
    this.activityDetailId = '34'
    window.sessionStorage.setItem('activityDetailId',this.activityDetailId)
    this.$http.activitiesDetail(this.activityDetailId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data
        this.state = resp.data.state
        this.peopleLength = resp.data.enrolled
        // this.imgurl = resp.data.image
        this.endTime = (new Date(resp.data.endTime.replace(/-/g,'/')).getTime()) / 1000
        this.countdowm(this.endTime) //执行倒计时函数

         // 分享配置
        if(this.isFromUrl) {
          this.handleShare2()
        }else{
          this.handleShare1()
        }
      }
    })

    // 奖品列表
    this.prizeList = [{
      image: require('../../assets/prize1.png'),
      title: '第1名:送2桶美孚1号',
      totalPrice: '800+'
    },{
      image: require('../../assets/prize2.png'),
      title: '第2名:送美孚1号速霸2000各1桶',
      totalPrice: '600+'
    },{
      image: require('../../assets/prize3.png'),
      title: '第3-4名:送2桶速霸2000',
      totalPrice: '400+'
    },{
      image: require('../../assets/prize4.png'),
      title: '第5-8名:送1桶速霸2000',
      totalPrice: '200+'
    }]
  },
  methods: {
    // 免责条款
    toEscapeClause() {
      this.$router.push({
        path: '/escapeClause'
      })
    },
    // 分享配置
    handleShare1() {
      // 获取签名
      this.$http.getSignature().then(resp => {
        console.log(resp)
        if(resp.status = 200) {
          this.timestamp = resp.data.timestamp
          this.nonceStr = resp.data.nonceStr
          this.signature = resp.data.signature

          const that = this
          wx.config({
            // debug: true,
            appId: 'wxd3d4d3045a1213a1',
            // appId: 'wxf1894ca38c849d17',  //测试号
            timestamp: that.timestamp,
            nonceStr: that.nonceStr,
            signature: that.signature,
            jsApiList: ['openLocation','updateAppMessageShareData']
          });
          wx.ready(function() {
            wx.updateAppMessageShareData({ 
               title: that.theDetail.title, // 分享标题
                desc: `时间：${that.theDetail.time};   地点：${that.theDetail.venueName}`, // 分享描述
                // link: 'http://192.168.0.108:8081/#/match', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: 'https://laihu.baogongxia.com/#/match', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://dhty.oss-cn-shenzhen.aliyuncs.com/%E6%9D%A5%E8%99%8E%E5%9B%BE%E7%89%87.jpg', // 分享图标
                success: function (res) {
                  // 设置成功
                }
            })
          })
        }
      })
    },
    handleShare2() {
      // 获取签名
<<<<<<< HEAD
      this.$http.getSignatureInfo(this.fromUrl).then(resp => {
=======
      this.$http.getSignatureInfo(this.fromType).then(resp => {
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
        console.log(resp)
        if(resp.status = 200) {
          this.timestamp = resp.data.timestamp
          this.nonceStr = resp.data.nonceStr
          this.signature = resp.data.signature

          const that = this
          wx.config({
            // debug: true,
            appId: 'wxd3d4d3045a1213a1',
            // appId: 'wxf1894ca38c849d17',  //测试号
            timestamp: that.timestamp,
            nonceStr: that.nonceStr,
            signature: that.signature,
            jsApiList: ['openLocation','updateAppMessageShareData']
          });
          wx.ready(function() {
            wx.updateAppMessageShareData({ 
              title: that.theDetail.title, // 分享标题
              desc: `时间：${that.theDetail.time};   地点：${that.theDetail.venueName}`, // 分享描述
              // link: 'http://192.168.0.108:8081/#/match', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: 'https://laihu.baogongxia.com/#/match', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://dhty.oss-cn-shenzhen.aliyuncs.com/%E6%9D%A5%E8%99%8E%E5%9B%BE%E7%89%87.jpg', // 分享图标
              success: function (res) {
                // 设置成功
              }
            })
          })
        }
      })
    },
    // 地图导航
    toMap() {
      if(this.isFromUrl) {
        this.map2()
      }else{
        this.map1()
      }
    },
    map1() {
      this.$http.getSignature().then(resp => {
      console.log(resp)
      if(resp.status = 200) {
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature

        this.$toast({
          message: '获取中...',
          duration: 800
        });
        const that = this
        wx.config({
          // debug: true,
          appId: 'wxd3d4d3045a1213a1',
          // appId: 'wxf1894ca38c849d17',  //测试号
          timestamp: that.timestamp,
          nonceStr: that.nonceStr,
          signature: that.signature,
          jsApiList: ['openLocation','updateAppMessageShareData']
        });
        wx.ready(function() {
          // that.$indicator.close();
          wx.openLocation({
            longitude: Number(that.theDetail.lon),
            latitude: Number(that.theDetail.lat),
            scale: 13,
            name: that.theDetail.venueName,
            address: that.theDetail.address,
          })
        })
        // 当微信获取位置配置失败
        wx.error(function(res){
          // that.$indicator.close();
          that.$toast({
            message: '抱歉，调起导航失败，请稍后重试！',
            duration: 2000
          });
        });
      }
    })
  },
  map2() {
<<<<<<< HEAD
    this.$http.getSignatureInfo(this.fromUrl).then(resp => {
=======
    this.$http.getSignatureInfo(this.fromType).then(resp => {
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
      console.log(resp)
      if(resp.status = 200) {
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature

        this.$toast({
          message: '获取中...',
          duration: 800
        });
        const that = this
        wx.config({
          // debug: true,
          appId: 'wxd3d4d3045a1213a1',
          // appId: 'wxf1894ca38c849d17',  //测试号
          timestamp: that.timestamp,
            nonceStr: that.nonceStr,
            signature: that.signature,
          jsApiList: ['openLocation','updateAppMessageShareData']
        });
        wx.ready(function() {
          // that.$indicator.close();
          wx.openLocation({
            longitude: Number(that.theDetail.lon),
            latitude: Number(that.theDetail.lat),
            scale: 13,
            name: that.theDetail.venueName,
            address: that.theDetail.address,
          })
        })
        // 当微信获取位置配置失败
        wx.error(function(res){
          // that.$indicator.close();
          that.$toast({
            message: '抱歉，调起导航失败，请稍后重试！',
            duration: 2000
          });
        });
      }
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
            const redirectUrl = encodeURIComponent(`https://laihu.baogongxia.com/#/matchSignUp`)
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
  .match{
    width: 100%;
    min-height: 100vh;
    background: #1e1e1c;
    // overflow: hidden;
    padding-bottom: 21vh;
    .topimg{
      width: 100%;
      height: 408px;
      // border: 1px solid red;
      padding: 0 20px;
      padding-top: 20px;
      position: relative;
      background: url('../../assets/acvDetailBg.png') no-repeat center bottom;
      background-size: 700px auto;
      background-position: 25px 388px;
      .img{
        width: 720px;
        height: 368px;
        position: absolute;
        left: 15px;
        top: 20px;
        z-index: 9;
      }
      .titleTop{
        width: 720px;
        height: 368px;
        border-radius: 15px;
        position: absolute;
        top: 20px;
        left: 15px;
        // background: rgba(0,0,0,0.4);
        z-index: 19;
        .p1{
          width: 30%;
          height: 32px;
          line-height: 34px;
          font-size: 32px;
          color: #fff;
          margin: 0 auto;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          margin-top: 120px;
          padding-left: 20px;
        }
        .p2{
          font-size: 22px;
          line-height: 72px;
          color: #fff;
          text-align: center;
          letter-spacing: 4px;
          font-weight: 700;
          margin-top: 10px;
        }
      }
    }
    .scrollBox{
      // height: 82.4vh;
      // overflow: auto;
      .titleBox{
        width: 100%;
        min-height: 140px;
        margin-top: 20px;
        overflow: hidden;
        padding: 0 30px;
        .titleText{
          font-size: 34px;
          line-height: 55px;
          color: #fff;
        }
        .people{
          width: 100%;
          margin-top: 10px;
          span{
            display: block;
            letter-spacing: 1px;
          }
          .span1{
            float: left;
            color: #fdb20f;
            line-height: 50px;
            font-size: 26px;
            b{
              font-size: 34px;
            }
          }
          .span2{
            font-size: 26px;
            line-height: 50px;
            color: #fff;
            float: right;
          }
        }
      }
      .dateBox{
        width: 96%;
        // height: 376px;
        min-height: 262px;
        background: #fff;
        margin: 0 auto;
        border-radius: 15px;
        padding: 0 32px;
        overflow: hidden;
        .common{
          width: 100%;
          height: 96px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 0;
          padding-left: 6px;
          span{
            font-size: 30px;
            line-height: 96px;
            display: inline-block;
            color: #474747;
          }
          .span2{
            margin-left: 59px;
          }
          .span3{
            margin-left: 59px;
          }
        }
        .place{
          width: 100%;
          padding-right: 4px;
          .span4{
            display: block;
            width: 38px;
            height: 96px;
            float: right;
            margin-right: 15px;
            background: url('../../assets/placeIcon.png') no-repeat center;
            background-size: 100% auto;
          }
        }
        .people{
          width: 100%;
          min-height: 66px;
          padding: 0 6px;
          p{
            font-size: 30px;
            color: #474747;
            line-height: 30px;
            margin-top: 30px;
            span{
              float: right;
              font-size: 32px;
              line-height: 30px;
              margin-right: 10px;
            }
          }
          .headImgBox{
            width: 100%;
            height: 92px;
            margin-top: 20px;
            // border: 1px solid red;
            .left{
              width: 100%;
              height: 62px;
              overflow: hidden;
              float: left;
              margin-left: -10px;
              .imgItem{
                width: 60px;
                height: 60px;
                float: left;
                margin-left: 10px;
                border-radius: 50%;
                border: 1px solid #fff;
              }
              .groupOwner{
                border: 2px solid #fac31e;
              }
            }
          }
        }
      }
      .ul1{
        width: 100%;
        height: auto;
        padding: 0 2%;
        margin-top: 15px;
        li{
          width: 100%;
          min-height: 99px;
          background: #fff;
          border-radius: 13px;
          margin-bottom: 15px;
          padding-left: 37px;
          padding-right: 32px;
          .title{
            width: 100%;
            height: 99px;
            color: #464646;
            line-height: 99px;
          }
          .sp2{
            float: right;
            margin-right: 18px;
            line-height: 99px;
            font-size: 32px;
          }
          .detail{
            width: 100%;
            height: auto;
            border-top: 1px solid #e8e8e8;
            padding: 15px 0;
            p{
              font-size: 28px;
              line-height: 48px;
              color: #4a4a4a;
            }
          }
        }
        .li1{
          .sp1{
            color: #ffbb02;
          }
        }
        .li3{
          .title{
            font-size: 0;
            .left{
              width: 130px;
              height: 99px;
              display: inline-block;
              padding-top: 20px;
              vertical-align: top;
              .imgbox{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                float: left;
              }
            }
            .name{
              width: 160px;
              height: 99px;
              font-size: 30px;
              color: #464646;
              line-height: 99px;
              display: inline-block; 
              vertical-align: top;
            }
            .nameText{
              height: 99px;
              font-size: 30px;
              color: #464646;
              line-height: 99px;
              display: inline-block;
              vertical-align: top;
            }
          }
          .detail{
            .comm{
              width: 100%;
              height: 96px;
              font-size: 30px;
              line-height: 96px;
              padding-left: 5px;
              color: #4d4d4d;
              .Num{
                padding-left: 71px;
                font-size: 30px;
              }
            }
            .phone{
              border-bottom: 1px solid #e6e6e6;
              .phoneIcon{
                display: block;
                width: 38px;
                height: 96px;
                float: right;
                margin-right: 20px;
                background: url('../../assets/phoneIcon.png') no-repeat center;
                background-size: 100% auto;
              }
            }
          }
        }
        .prize{
          padding-left: 25px;
          padding-right: 25px;
          .prizeDetail{
            width: 100%;
            min-height: 870px;
            position: relative;
            li{
              width: 100%;
              height: 140px;
              background: url('../../assets/prizeBg.png') no-repeat center;
              background-size: 100% auto;
              margin-bottom: 20px;
              padding: 0;
              .left{
                width: 28%;
                height: 140px;
                float: left;
                .imgBox{
                  width: 135px;
                  height: 90px;
                  margin-top: 25px;
                  margin-left: 25px;
                }
              }
              .right{
                width: 72%;
                height: 140px;
                float: left;
                .p1{
                  color: #fff;
                  font-size: 32px;
                  line-height: 32px;
                  margin-top: 30px;
                }
                .p2{
                  font-size: 25px;
                  color: #fff;
                  margin-top: 20px;
                  span{
                    font-size: 32px;
                    line-height: 32px;
                    color: #ffc90f;
                    // color: #ffbc01;
                  }
                }
              }
            }
            .descr{
              width: 100%;
              font-size: 28px;
              line-height: 40px;
              color: #4a4a4a;
            }
            .memorialAward{
              width: 235px;
              height: 110px;
              position: absolute;
              bottom: 20px;
              right: 15px;
              .btImg{
                width: 110px;
                height: 110px;
                border-radius: 50%;
                float: left;
                background: url('../../assets/prize5.png') no-repeat center;
                background-size: cover;
              }
              .img2{
                float: right;
                background: url('../../assets/prize6.png') no-repeat center;
                background-size: cover;
              }
            }
          }
        }
      }
    }
    .signupWrap{
      width: 100%;
      height: 21vh;
      padding: 0 15px;
      position: fixed;
      bottom: 0;
      background: #1e1e1c;
      .p1{
        height: 72px;
        line-height: 72px;
        padding-left: 6px;
        font-size: 28px;
        color: #fff;
        span{
          font-size: 32px;
          color: #e6ab09;
        }
      }
      .check{
        width: 100%;
        height: 52px;
        font-size: 0;
        span{
          display: block;
          color: #fff;
          float: right;
        }
        .text{
          width: 250px;
          vertical-align: top;
          font-size: 25px;
          line-height: 28px;
          position: relative;
        }
        .text::after{
          content: '';
          width: 233px;
          height: 28px;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          border-bottom: 1px solid #fff;
        }
        .checkBox{
          width: 22px;
          height: 22px;
          border: 1px solid #fff;
          margin-right: 5px;
          margin-top: 2px;
          line-height: 28px;
          b{
            color: #f8c026;
            line-height: 22px;
            font-size: 18px;
            text-align: center;
          }
        }
      }
      .btn{
        width: 100%;
        height: 96px;
        line-height: 96px;
        text-align: center;
        background: #ffbc01;
        border-radius: 15px;
        font-size: 33px;
      }
    }
  }
</style>