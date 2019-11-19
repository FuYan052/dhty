<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <div class="scrollBox" ref="scrollBox">
      <!-- 图片 -->
      <div class="topimg">
        <div class="img">
          <!-- <img src="../../assets/bg1.png" style="width:100%; height: 100%; border-radius: 8px;" alt=""> -->
          <img :src="theDetail.cVenueImage" style="width:100%; height: 100%; border-radius: 8px;" alt="">
        </div>
        <div class="titleTop">
          <p class="p1">{{theDetail.title}}</p>
          <p class="p2">FASRER HIGHER STRONGER </p>
        </div>
      </div>
      <!-- 标题及报名情况 -->
      <div class="titleBox">
        <div class="titleText">{{theDetail.title}}</div>
        <div class="people">
          <span class="span1">￥<b>{{theDetail.cost}}</b>/人</span>
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
              <!-- <div 
                class="imgItem" v-for="(it,ind) in 5" 
                :key="ind"
                >
                <img src="../../assets/touxiang.jpg" style="width: 100; height:100%; border-radius: 50%;" alt="">
              </div> -->
              <div 
                class="imgItem" v-for="(it,ind) in theDetail.enrolledVoList" 
                :key="ind"
                :class="{groupOwner : it.group}"
                >
                <img :src="it.image" style="width:100%; height: 100%; border-radius: 50%;" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 收缩项 -->
      <ul class="ul1">
        <li class="li1" ref="leader">
          <div class="title" @click="show1 = !show1">
            临时群主的福利和义务<span class="sp1">(直降8元)</span><span v-show="!show1" class="sp2 el-icon-arrow-down"></span><span v-show="show1" class="sp2 el-icon-arrow-up"></span>
          </div>
          <div class="detail" v-show="show1">
            <p>1.担任临时群主，本次活动可直接<span class="sp1">抵扣8元</span>打球费。</p>
            <p>2.一场活动仅有一名临时群主，如有其他人抢先担任，请按照普通球友的方式支付。</p>
            <p>3.在选择担任临时群主前，请您确保能提前到达活动场馆并能按照信息提示到来虎自助取球机或场馆前台领球，分发到每个场地。</p>
          </div>
        </li>
        <li class="li2" ref="rule">
          <div class="title" @click="show2 = !show2">
            规则<span v-show="!show2" class="sp2 el-icon-arrow-down"></span><span  v-show="show2" class="sp2 el-icon-arrow-up"></span>
          </div>
          <div class="detail" v-show="show2">
            <p>1.新人第一次活动请电话或者微信联系，以便为您提供更好的服务。电话:18113011911（微信同号）。</p>
            <p>2.活动人请按照客服通知的场地编号对号入场，球员会按照水平分组，6人一个场地，练习热身15分钟后正式开始活动，双打实行上下制（活动开始首局负者下场，其余时间不论胜负，每名球员打两局下场休息一局再上，禁止霸场，乱串场地）。</p>
            <p>3.活动开始<span class="sp1">前2小时</span>可取消参与活动；报名未到或者未在活动开始前两小时取消的，均按照当场活动费用扣费。已经报满了的场次可以报名为候补。若报名结束后依然没有候补成功，则费用会在活动开始前两小时后原路退回；若候补成功，会短信通知。</p>
          </div>
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
            <span v-show="!show3" class="sp2 el-icon-arrow-down"></span><span  v-show="show3" class="sp2 el-icon-arrow-up"></span>
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
      <div class="btn" @click="submit">{{theDetail.osState}}</div>
    </div>
  </div>
</template>

<script> 
export default {
  name: 'ActivityDetail',
  data() {
    return {
      show1: true,
      show2: true,
      show3: false,
      activityDetailId: '',
      theDetail: '',
      imgurl: '',
      isChecked: false,  //是否勾选免责条款
      disabled: false,  //报名按钮是否能点击
      content: '',  //倒计时内容
      endTime: '',
      isTosignUp: '',
      state: '',  //后端传过来为2时，则表示人员已满，不能报名
      isFromUrl: null,  //判断url是否是通过分享链接进入
      fromUrl: '', //分享的类型
      timer1: null,
    }
  },
  created() {
    // 获取签名的url
    this.fromUrl = encodeURIComponent(window.location.href.split('#')[0])

    this.activityDetailId = this.$route.params.id
    window.sessionStorage.setItem('activityDetailId',this.$route.params.id)
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

        // 获取签名
        this.$http.getSignatureInfo(this.fromUrl).then(resp => {
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
              // 分享配置
              that.timer1 = setTimeout(() => {
                wx.updateAppMessageShareData({ 
                  title: that.theDetail.title, // 分享标题
                  desc: `时间：${that.theDetail.time};  地点：${that.theDetail.venueName}`, // 分享描述
                  // link: `http://192.168.0.108:8081/#/activityDetail/${that.activityDetailId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  link: `https://laihu.baogongxia.com/#/activityDetail/${that.activityDetailId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://dhty.oss-cn-shenzhen.aliyuncs.com/%E6%9D%A5%E8%99%8E%E5%9B%BE%E7%89%87.jpg', // 分享图标
                  success: function (res) {
                    console.log('分享设置成功')
                    // 设置成功
                  }
                })
              },1500)
            })
          }
        })
      }
    })
    // 记录用户浏览记录
    const params2 = {
      userId: window.localStorage.getItem('userId') || '',
      actId: this.activityDetailId
    }
    this.$http.saveRecord(params2).then(resp => {
      console.log(resp)
    })
  },
  mounted () {
    // 当前一页点击的是‘临时领队’时滚动条滚动到临时领队位置
    if(window.sessionStorage.getItem('clickType') === '领队') {
      const scrollHeight = this.$refs.leader.offsetTop - 50
      // this.$refs.scrollBox.scrollTo(0,scrollHeight)
      window.scrollTo(0,scrollHeight)
    }
    // 当前一页点击的是‘规则’时滚动条滚动到规则位置
    if(window.sessionStorage.getItem('clickType') === '规则') {
      const scrollHeight = this.$refs.rule.offsetTop - 50
      // this.$refs.scrollBox.scrollTo(0,scrollHeight)
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
    // 分享配置
    handleShare() {
      // const that = this
      // this.timer1 = setTimeout(() => {
      //       // wx.ready(function() {
      //         wx.updateAppMessageShareData({ 
      //           title: that.theDetail.title, // 分享标题
      //           desc: `时间：${that.theDetail.time};  地点：${that.theDetail.venueName}`, // 分享描述
      //           // link: `http://192.168.0.108:8081/#/activityDetail/${that.activityDetailId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //           link: `https://laihu.baogongxia.com/#/activityDetail/${that.activityDetailId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //           imgUrl: 'https://dhty.oss-cn-shenzhen.aliyuncs.com/%E6%9D%A5%E8%99%8E%E5%9B%BE%E7%89%87.jpg', // 分享图标
      //           success: function (res) {
      //             console.log('分享设置成功')
      //             // 设置成功
      //           }
      //         })
      //       // })
      //     },2000)
    },
    // 地图导航
    toMap() {
      // this.map2()
      const that = this

      wx.openLocation({
        longitude: Number(that.theDetail.lon),
        latitude: Number(that.theDetail.lat),
        scale: 13,
        name: that.theDetail.venueName,
        address: that.theDetail.address,
      })
    },
    // map2() {
    //   const that = this
    //   wx.openLocation({
    //     longitude: Number(that.theDetail.lon),
    //     latitude: Number(that.theDetail.lat),
    //     scale: 13,
    //     name: that.theDetail.venueName,
    //     address: that.theDetail.address,
    //   })
    // },
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
    // window.sessionStorage.removeItem('config')
    window.sessionStorage.removeItem('clickType')
    // window.sessionStorage.removeItem('isReload');
    clearTimeout(this.timer1)
    this.timer1 = null
  }
}
</script>

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #1e1e1c;
    // overflow: hidden;
    padding-bottom: 21vh;
    .topimg{
      width: 100%;
      height: 408px;
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
        background: rgba(0,0,0,0.4);
        z-index: 19;
        .p1{
          width: 30%;
          height: 34px;
          line-height: 36px;
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
        .shareBtn{
          width: 45px;
          height: 45px;
          position: absolute;
          top: 20px;
          right: 20px;
          background: url('../../assets/shareIcon.png') no-repeat center;
          background-size: 100% auto;
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
          line-height: 70px;
          color: #fff;
        }
        .people{
          width: 100%;
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
                border: 1px solid #dedede;
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
              .sp1{
                color: #ffbb02;
              }
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