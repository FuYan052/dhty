<template>
  <div class="activitySignUp" v-title data-title="活动报名">
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
        <div class="radiuBox" @click="handleChoiceLeader"><span class="el-icon-check" v-show="isSelect"></span></div>
        <div class="descr">
          <p :class="{disableClass : isDisable1}">担任本场临时群主<span :class="{disableClass2 : isDisable1}">直降8元</span></p>
          <p @click="isShowLeaderDetail = !isShowLeaderDetail" :class="{disableClass2 : isDisable1}">《来虎临时领队义务和责任》</p>
        </div>
        <div class="detail" v-show="isShowLeaderDetail">
          <p>1.担任临时群主，本次活动可直接抵扣8元打球费。</p>
          <p>2.一场活动仅有一名临时群主，如有其他人抢先担任，请按照普通球友的方式支付。</p>
          <p>3.在选择担任临时群主前，请您确保能提前到达活动场馆并能按照信息提示到来虎自助取球机或场馆前台领球，分发到每个场地。</p>
        </div>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="number"><span v-if="!isPreferActivities">报名人数</span><span v-else>选择性别</span></div>
    <div class="numberWrap" v-if="!isPreferActivities">
      <ul>
        <li>
          <div class="left"><span></span><span class="text">男</span></div>
          <div class="right">
            <el-input-number :class="{actDesc : ableClickDesc1}" v-model="num1" @change="handleChangeMen" :min="0"></el-input-number>
          </div>
        </li>
        <li>
          <div class="left"><span></span><span class="text">女</span></div>
          <div class="right">
            <el-input-number :class="{actDesc : ableClickDesc2}" v-model="num2" @change="handleChangeWomen" :min="0"></el-input-number>
          </div>
        </li>
      </ul>
    </div>
    <!-- 报名人数 -->
    <div class="numberWrap2" v-else>
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
    <!-- 优惠券 -->
    <div class="coupon">
      <div class="title" @click="toSelectCoup">
        <div class="t1">优惠</div>
        <div class="t2">{{selectedCoupon.name}}</div>
        <div class="t3" :class="{disableClass2 : isDisable2}">
          <p v-if="isShowNoUse">暂无可用</p>
          <p v-else>
            <span class="useNum" v-show="!haveSelected">{{useCoupList.length}}张可用</span>
            <span v-show="haveSelected">-￥{{selectedCoupon.money}}</span>
          </p>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <!-- 暂不使用优惠券 -->
      <div class="noUse">
        <div class="text">暂不使用优惠券</div>
        <div class="switchBtn">
          <el-switch
            @change='isUseCoup'
            v-model="isnoUse"
            active-color="#ffbc01"
            inactive-color="#cdcbce">
          </el-switch>
        </div>
      </div>
    </div>
    <!-- 支付按钮 -->
    <div class="bottomWrap">
      <div class="total">合计：<span>{{total}}</span>元</div>
      <div class="btn" @click="surePay">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivitySignUp',
  data() {
    return{
      theDetail: '',
      num1: 0,
      num2: 0,
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
      isSelect: false,  //默认不选择临时领队
      isShowLeaderDetail: false,  //是否展示领队义务与责任
      // switchVuale: false,
      isDisable1: false,  //是否能选临时群主
      isPreferActivities: false,  //是否是优惠活动
      isMen: false,  
      isWomen: false,
    }
  },
  watch: {
    num1(val) {
      if(val >= 1) {
        this.ableClickDesc1 = true
      }else{
        this.ableClickDesc1 = false
      }
    },
    num2(val) {
      if(val >= 1) {
        this.ableClickDesc2 = true
      }else{
        this.ableClickDesc2 = false
      }
    },
    selectedCoupon(v) {
      console.log(v)
      if(v !== '') {
        this.haveSelected = true
        this.couponId = v.id
      }else{
        this.haveSelected = false
      }
    },
  },
  computed: {
    total() {
      if(this.haveSelected && this.isSelect) {
        if(((Number(this.theDetail.cost) * (this.num1 + this.num2)) - Number(this.selectedCoupon.money) - 8) <= 0) {
          return 0
        }else{
          return (Number(this.theDetail.cost) * (this.num1 + this.num2)) - Number(this.selectedCoupon.money) - 8
        }
      }else if(this.isSelect) {
        if(((Number(this.theDetail.cost) * (this.num1 + this.num2)) - 8) <= 0) {
          return 0
        }else{
          return (Number(this.theDetail.cost) * (this.num1 + this.num2)) - 8
        }
      }else if(this.haveSelected) {
        if((Number(this.theDetail.cost) * (this.num1 + this.num2)) - Number(this.selectedCoupon.money) <= 0) {
          return 0
        }else{
          return (Number(this.theDetail.cost) * (this.num1 + this.num2)) - Number(this.selectedCoupon.money)
        }
      }else{
        return Number(this.theDetail.cost) * (this.num1 + this.num2)
      }
    },
    isShowNoUse(){
      return this.useCoupList.length === 0
    },
    isDisable2() {
      if(Number(this.theDetail.cost) <= 5) {
        return true
      }else{
        return false
      }   
    }
  },
  created() {
    this.activityDetailId = window.sessionStorage.getItem('activityDetailId')
    const params = {
      id: this.activityDetailId,
      userId: window.localStorage.getItem('userId')
    }
    this.$http.getPayActInfo(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data.activitiesDetailsInfoVOList
        this.people = resp.data.activitiesDetailsInfoVOList.people
        this.enrolled = resp.data.activitiesDetailsInfoVOList.enrolled
        this.state = resp.data.activitiesDetailsInfoVOList.state
        this.useCoupList = resp.data.couponVoList
        this.notUserCoupList = resp.data.noCouponVoList
        if(Number(this.theDetail.cost) <= 1) {
          this.isPreferActivities = true
        }else{
          this.isPreferActivities = false
        }
        if(Number(this.theDetail.cost) <= 8) {
          this.isSelect = false
          this.isDisable1 = true
        }else{
          this.isDisable1 = false
        }
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
    handleChangeWomen(value) {
      window.sessionStorage.setItem('womenNum' ,value)
    },
    handleChangeMen(value) {
      window.sessionStorage.setItem('menNum' ,value)
    },
    // 选择性别男
    choiceMen() {
      this.isMen = !this.isMen
      this.isWomen = false
      this.num1 = 1
      this.num2 = 0
      if((!this.isWomen) && (!this.isMen)) {
        this.num2 = 0
        this.num1 = 0
      }
    },
    // 选择性别女
    choiceWomen() {
      this.isWomen = !this.isWomen
      this.isMen = false
      this.num2 = 1
      this.num1 = 0
      if((!this.isWomen) && (!this.isMen)) {
        this.num2 = 0
        this.num1 = 0
      }
    },
    // 选择临时群主
    handleChoiceLeader() {
      if(Number(this.theDetail.cost) <= 8) {
        this.isSelect = false
        this.isDisable1 = true
      }else{
        this.isSelect = !this.isSelect
        this.isDisable1 = false
      }
    },
    // 是否使用优惠券
    isUseCoup() {
      this.haveSelected = false

    },
    // 选择优惠券
    toSelectCoup() {
      if(!this.isnoUse) {
        if(!this.isDisable2) {
          // 将优惠券列表传给下一页
          window.sessionStorage.setItem('useCouponList' ,JSON.stringify(this.useCoupList))
          window.sessionStorage.setItem('notUserCoupList' ,JSON.stringify(this.notUserCoupList))
          this.$router.push({
            path: '/activitySignUp/selectCoupon'
          })
        }
      }
    },
    // 支付
    surePay() {
      if((this.num1 + this.num2) <= 0){
        if(this.isPreferActivities) {
          this.$toast({
            message: '请选择性别！',
            duration: 2000
          })
        }else{
          this.$toast({
            message: '请添加报名人数！',
            duration: 2000
          })
        }
        
      }else if((this.num1 + this.num2) > this.people - this.enrolled) {
        this.$toast({
          message: '人数已超过限制！',
          duration: 2000
        })
      }else if((this.num1 + this.num2) > 0 && (this.num1 + this.num2) < this.people) {
        const that = this
        const params = {
          couponId: this.couponId,
          userId: window.localStorage.getItem('userId'),
          oaMoneyId: this.activityDetailId,
          // code: this.code,
          totalPrice: this.total,
          mNumber: this.num1,
          gNumber: this.num2,
          state: this.state,
          isGroup: this.isSelect
        }
        console.log(params)
        this.$http.postPay(params).then(resp => {
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
  .activitySignUp{
    width: 100%;
    min-height: 100vh;
    background: #1e1e1e;
    overflow: hidden;
    padding: 0 16px;
    padding-bottom: 340px;
    .topBox{
      width: 100%;
      min-height: 318px;
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
          padding-left: 40px;
          .titleText{
            height: 37px;
            font-size: 36px;
            line-height: 38px;
            margin-top: 4px;
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
            margin-top: 28px;
            color: #4b4b4b;
          }
        }
      }
      .leader{
        width: 100%;
        min-height: 110px;
        background: #fff;
        // border: 1px solid red;
        margin-top: 22px;
        overflow: hidden;
        .radiuBox{
          width: 50px;
          height: 50px;
          transform: scale(0.8);
          float: left;
          border-radius: 50%;
          border: 1px solid rgb(192, 192, 192);
          font-size: 0;
          span{
            font-size: 36px;
            line-height: 50px;
            margin-left: 5px;
            font-weight: bold;
            display: inline-block;
            text-align: center;
            color: #7a7979;
          }
        }
        .descr{
          height: 100px;
          float: left;
          // border: 1px solid red;
          margin-left: 12px;
          p{
            font-size: 27px;
            line-height: 22px;
            margin-top: 13px;
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
            width: 260px;
            height: 100%;
            float: right;
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
    .numberWrap2{
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
      position: fixed;
      bottom: 0;
      left: 0;
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
.disableClass{
  color: #ccc !important;
}
.disableClass2{
  color: #ccc !important;
}
</style>