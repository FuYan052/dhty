<template>
  <div class="matchSignUp" v-title data-title="比赛报名">
    <div class="topBox">
      <div class="wrap1">
        <div class="date">
          <p class="time">{{theDetail.timeStart}}</p>
          <p class="time2">{{theDetail.time}}</p>
        </div>
        <div class="title">
          <p class="titleText">
            {{theDetail.title}}
          </p>
          <p class="place">场馆：{{theDetail.venueName}}</p>
        </div>
      </div>
      <!-- 临时群主 -->
      <div class="leader">
        <!-- <div class="radiuBox" @click="isSelect = true"><span class="el-icon-check" v-show="isSelect"></span></div> -->
        <div class="descr">
          <p>含马来西亚大赛款羽毛球运动服1件</p>
        </div>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="number">选择性别</div>
    <div class="numberWrap">
      <ul>
        <li>
          <div class="left"><span></span><span class="text">男</span></div>
          <div class="right">
            <div class="circle" @click="choiceMen"><span v-show="isMen"></span></div>
          </div>
        </li>
        <li>
          <div class="left"><span></span><span class="text">女</span></div>
          <div class="right">
            <div class="circle" @click="choiceWomen"><span v-show="isWomen"></span></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 支付方式 -->
    <div class="payType">支付方式</div>
    <ul class="pay">
      <li>
        <div class="left">
          <div class="circle"><span></span></div><div class="text">微信支付</div>
        </div>
        <div class="right">
          {{theDetail.cost}}元/人
        </div>
      </li>
    </ul>
    <!-- 支付按钮 -->
    <div class="bottomWrap">
      <div class="total">合计：<span>{{total}}</span>元</div>
      <div class="btn" @click="surePay">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchSignUp',
  data() {
    return{
      theDetail: '',
      radio: '1',
      activityDetailId: '',
      code: '',
      timer1: null,
      ableClickDesc1: false,
      ableClickDesc2: false,
      timer: null ,
      people: null,  //活动限制人数
      enrolled: null,  //已报名人数
      isnoUse: false,  //默认使用优惠券
      useCoupList: [],  //可使用优惠券列表
      notUserCoupList: [],  //不可使用优惠券列表
      selectedCoupon: '',  //选中的优惠券
      couponId: '',  //选中的优惠券id
      haveSelected: false,
      state: '',  //活动状态
      isSelect: true,  //默认选择定制衣服
      isMen: false,  
      isWomen: false,  
      menNum: '',
      womenNum: ''
    }
  },
  watch: {
    
  },
  computed: {
    total() {
      return Number(this.theDetail.cost)
      //   return Number(this.theDetail.cost) - 38  //需要定制38元的衣服
      // }else{
      //   return Number(this.theDetail.cost)  //不需要定制衣服
    }
  },
  created() {
    this.activityDetailId = '34'
    // this.activityDetailId = window.sessionStorage.getItem('activityDetailId')
    const params = {
      id: this.activityDetailId,
      userId: window.localStorage.getItem('userId')
    }
    this.$http.getPayMatchInfo(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data
        // this.people = resp.data.activitiesDetailsInfoVOList.people
        // this.enrolled = resp.data.activitiesDetailsInfoVOList.enrolled
        // this.state = resp.data.activitiesDetailsInfoVOList.state
        // this.useCoupList = resp.data.couponVoList
        // this.notUserCoupList = resp.data.noCouponVoList
      }
    })
  },
  mounted() {
    // 获取code给后端换openId
    const url = location.search
    const requertUrl = new Object()
    if(url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
      requertUrl[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
    }
    this.code = requertUrl.code
    const params = {
      code: this.code,
      userId: window.localStorage.getItem('userId')
    }
    this.$http.getOpenId(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        console.log(resp)
      }else{
        this.$toast({
          message: '抱歉，稍后重试！',
          duration: 2000
        })
        const that = this
        this.timer = setTimeout(() => {
          that.$route.replace({
            path: '/activityDetail'
          })
        }, 3000);
      }
    })
  },
  activated() {
    this.num1 = window.sessionStorage.getItem('menNum') || ''
    this.num2 = window.sessionStorage.getItem('womenNum') || ''
    this.selectedCoupon = JSON.parse(window.sessionStorage.getItem('selectedCoupon')) || ''
  },
  methods: {
    // 选择性别男
    choiceMen() {
      this.isMen = !this.isMen
      this.isWomen = false
      this.menNum = 1
      this.womenNum = 0
    },
    // 选择性别女
    choiceWomen() {
      this.isWomen = !this.isWomen
      this.isMen = false
      this.womenNum = 1
      this.menNum = 0
    },
    // 支付
    surePay() {
      if((!this.isMen) && (!this.isWomen)){
        this.$toast({
          message: '请选择性别！',
          duration: 2000
        })
      }else {
        const that = this
        const params = {
          userId: window.localStorage.getItem('userId'),
          oaMoneyId: this.activityDetailId,
          totalPrice: this.total,
          mNumber: this.menNum,
          gNumber: this.womenNum,
          isClothing: this.isSelect
        }
        console.log(params)
        this.$http.postPayMatch(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            const configData = resp.data
            window.sessionStorage.removeItem('womenNum')
            window.sessionStorage.removeItem('menNum')
            window.sessionStorage.removeItem('selectedCoupon')

            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: configData.appId, // 必填，公众号的唯一标识
              timestamp: configData.timeStamp, // 必填，生成签名的时间戳
              nonceStr: configData.nonceStr, // 必填，生成签名的随机串
              signature: configData.signature, // 必填，签名，见附录1
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
              wx.chooseWXPay({
                  timestamp: configData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写 。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: configData.nonceStr, // 支付签名随机串，不长于 32 位
                  package: configData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType: configData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: configData.paySign, // 支付签名
                  success: function (res) {
                    // 支付成功后的回调函数
                    console.log(res);
                    window.sessionStorage.setItem('orderId',configData.orderNo)
                    that.timer1 = setTimeout(() => {
                      that.$router.replace({
                        path: '/activitySignUp/paySuccess'
                      })
                    },500)
                  }, 
                  fail: function (res) {
                    //失败回调函数
                    console.log(res);
                    // that.$toast({
                    //   message: '支付失败!',
                    //   duration: 2000
                    // })
                  },
                  cancel: function(res) {
                    that.$toast({
                      message: '取消支付!',
                      duration: 2000
                    })
                  }
              });
            }); 
            // wx.error(function(res){
            //   that.$toast({
            //     message: '支付失败！',
            //     duration: 2000
            //   })
            // })
          }
        })
      }
    }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('womenNum')
    window.sessionStorage.removeItem('menNum')
    window.sessionStorage.removeItem('selectedCoupon')
    // 清除定时器
    clearTimeout(this.timer)
    this.timer = null
    clearTimeout(this.timer1)
    this.timer1 = null
  }
}
</script>

<style lang="scss" scoped>
  .matchSignUp{
    width: 100%;
    min-height: 100vh;
    background: #1e1e1e;
    overflow: hidden;
    padding: 0 16px;
    .topBox{
      width: 100%;
      min-height: 120px;
      background: #fff;
      margin-top: 25px;
      border-radius: 15px;
      padding: 0 30px;
      .wrap1{
        width: 100%;
        height: 180px;
        border-bottom: 1px solid #e8e8e8;
        padding-top: 41px;
        .date{
          width: 170px;
          height: 100px;
          border-right: 1px solid #e8e8e8;
          float: left;
          .time{
            font-size: 38px;
            color: #f7b706;
            font-weight: bold;
            line-height: 38px;
            margin-top: 6px;
          }
          .time2{
            font-size: 26px;
            color: #7d7d7d;
            line-height: 26px;
            margin-top: 20px;
          }
        }
        .title{
          float: left;
          padding-left: 30px;
          .titleText{
            height: 37px;
            font-size: 36px;
            line-height: 38px;
            margin-top: 3px;
            width: 440px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .place{
            height: 26;
            font-size: 26px;
            line-height: 30px;
            width: 440px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            margin-top: 25px;
            color: #4b4b4b;
          }
        }
      }
      .leader{
        width: 100%;
        min-height: 50px;
        background: #fff;
        // border: 1px solid red;
        margin-top: 8px;
        overflow: hidden;
        .radiuBox{
          width: 40px;
          height: 40px;
          transform: scale(0.7);
          float: left;
          border-radius: 50%;
          border: 1px solid rgb(192, 192, 192);
          font-size: 0;
          span{
            font-size: 26px;
            line-height: 40px;
            margin-left: 4px;
            font-weight: bold;
            display: inline-block;
            text-align: center;
            color: #7a7979;
          }
        }
        .descr{
          height: 55px;
          float: left;
          // border: 1px solid red;
          margin-left: 6px;
          p{
            font-size: 22px;
            line-height: 22px;
            margin-top: 9px;
            span{
              color: #fdc925;
            }
          }
          p:nth-of-type(2){
            font-size: 22px;
            margin-top: 25px;
            margin-left: -10px;
            padding-bottom: 5px;
            color: #5b5b5b;
            position: relative;
          }
          p:nth-of-type(2)::after{
            content: '';
            display: inline-block;
            width: 274px;
            height: 26px;
            position: absolute;
            left: 5px;
            top:-3px;
            border-bottom: 1px solid #ababab;
          }
        }
        .detail{
          width: 100%;
          height: auto;
          margin: 0 auto;
          margin-top: 110px;
          border-top: 1px dashed #e8e8e8;
          padding-top: 10px;
          padding-bottom: 18px;
          p{
            width: 100%;
            font-size: 28px;
            line-height: 48px;
            color: #4a4a4a;
            margin-top: 5px;
          }
        }
      }
    }
    .number{
      width: 100%;
      height: 128px;
      padding-left: 20px;
      line-height: 30px;
      font-size: 30px;
      color: #fff;
      padding-top: 60px;
    }
    .numberWrap{
      width: 100%;
      height: 208px;
      border-radius: 15px;
      background: #fff;
      padding: 0 30px;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 100px;
          // padding-left: 30px;
          // padding-right: 25px;
          .left{
            width: 200px;
            height: 96px;
            line-height: 96px;
            float: left;
            font-size: 25px;
            span:nth-of-type(1){
              display: block;
              float: left;
              width: 60px;
              height: 96px;
              margin-top: 4px;
              line-height: 96px;
              font-size: 38px;
              // color: #12abe7;
              padding-right: 25px;
              margin-top: -2px;
              // border: 1px solid red;
              background: url("../../assets/male.png") no-repeat center;
              background-size: 60%
            }
            .text{
              display: block;
              float: left;
              height: 99px;
              line-height: 97px;
              font-size: 25px;
              color: #000;
              margin-left: 10px;
            }
          }
          .right{
            float: right;
            margin-top: 22px;
            .circle{
              // width: 47px;
              // height: 47px;
              width: 60px;
              height: 60px;
              transform: scale(0.8);
              display: inline-block;
              border: 1px solid #febe14;
              border-radius: 50%;
              vertical-align: middle;
              position: relative;
              span{
                display: block;
                width: 21px;
                height: 21px;
                background: #febe14;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
              }
            }
          }
        }
        li:nth-child(2){
          border-top: 1px solid #f0f2f1;
          .left{
            span:nth-of-type(1){
              padding-right: 25px;
              background: url("../../assets/female.png") no-repeat center;
              background-size: 60%
            }
          }
        }
      }
    }
    .payType{
      width: 100%;
      height: 128px;
      padding-left: 20px;
      line-height: 30px;
      font-size: 30px;
      color: #fff;
      padding-top: 60px;
    }
    .pay{
      width: 100%;
      height: 126px;
      background: #fff;
      border-radius: 15px;
      padding: 0 38px;
      li{
        width: 100%;
        height: 126px;
        .left{
          width: 250px;
          height: 126px;
          // line-height: 20px;
          font-size: 0;
          float: left;
          .circle{
            width: 60px;
            height: 60px;
            transform: scale(0.8);
            display: inline-block;
            border: 1px solid #00b766;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            span{
              display: block;
              width: 21px;
              height: 21px;
              background: #00b766;
              border-radius: 50%;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .text{
            display: inline-block;
            margin-left: 20px;
            line-height: 126px;
            font-size: 28px;
            vertical-align: middle;
          }
        }
        .right{
          float: right;
          width: 200px;
          font-size: 24px;
          line-height: 126px;
          text-align: right;
          color: #000;
        }
      }
      .coupon_li{
        .left{
          width: 160px;
          .circle{
            border: 1px solid #febe14;
            span{
              background: #febe14;
            }
          }
        }
        .right{
          width: auto;
          p{
            display: inline-block;
            span{
              b{
                font-weight: normal;
                color: red;
              }
            }
            .useNum{
              color: red;
            }
          }
        }
      }
    }
    .coupon{
      width: 100%;
      height: 151px;
      background: #fff;
      border-radius: 15px;
      margin-top: 15px;
      padding: 0 40px;
      padding-left: 47px;
      .title{
        width: 100%;
        height: 80px;
        overflow: hidden;
        .t1{
          width: 80px;
          height: 40px;
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          background: #ffbc01;
          float: left;
          margin-top: 22px;
        }
        .t2{
          font-size: 24px;
          line-height: 80px;
          float: left;
          margin-left: 15px;
        }
        .t3{
          float: right;
          line-height: 80px;
          color: red;
          font-size: 29px;
          p{
            float: left;
          }
          .el-icon-arrow-right{
            float: right;
            line-height: 82px;
            font-size: 28px;
            color: #000;
            padding-left: 10px;
          }
        }
      }
      .noUse{
        width: 100%;
        height: 60px;
        .text{
          font-size: 26px;
          line-height: 60px;
          float: left;
        }
        .switchBtn{
          width: 100px;
          height: 60px;
          float: right;
          margin-right: -15px;
        }
      }
    }
    .bottomWrap{
      width: 100%;
      height: 272px;
      padding: 0 15px;
      background: #1e1e1e;
      margin-top: 80px;
      // position: fixed;
      // bottom: 0;
      // left: 0;
      .total{
        width: 100%;
        height: 74px;
        line-height: 74px;
        color: #fff;
        font-size: 29px;
        span{
          color: #e8b310;
          font-size: 34px;
          line-height: 74px;
        }
      }
      .btn{
        width: 100%;
        height: 96px;
        line-height: 96px;
        text-align: center;
        margin-top: 12px;
        background: #ffbc01;
        border-radius: 15px;
      }
    }
  }
</style>
<style>
.activitySignUp .numberWrap .right .el-input-number{
    width: 250px;
    height: 45px;
    margin-top: 25px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input__inner{
    width: 120px;
    height: 52px;
    line-height: 45px;
    border-radius: 10px;
    font-size: 24px;
    padding: 0;
    margin-left: 67px;
    outline: none !important;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__decrease{
    background: #d5d9d8;
    color: #fff;
    border-radius: 7px;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__decrease i{
    font-size: 26px;
    line-height: 50px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__increase{
    background: #fac31e;
    color: #fff;
    border-radius: 7px;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
  .activitySignUp .numberWrap .right .actDesc .el-input-number__decrease{
    background: #fac31e;
    color: #fff;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__increase i{
    font-size: 26px;
    line-height: 50px;
  }
  .switchBtn .el-switch__core{
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
}
.switchBtn .el-switch__core:after{
  top:3px;
  left: 0;
  content: '';
  width: 30px;
  height: 30px;
}
.switchBtn .el-switch.is-checked .el-switch__core:after{
  margin-left: -30px;
  top:3px;
  content: '';
  width: 30px;
  height: 30px;
}
</style>