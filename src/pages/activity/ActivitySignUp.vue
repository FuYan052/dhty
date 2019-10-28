<template>
  <!-- 活动报名 -->
  <div class="activitySignUp" v-title data-title="活动报名">
    <div class="actDetail">
      <div class="left">
        <div class="imgbox">
          <img :src="theDetail.venueImage" style="width: 100%; hight: 100% border-radius: 10px;" alt="">
        </div>
        <!-- <h1 class="time">{{theDetail.timeStart}}</h1>
        <div class="date">{{theDetail.time}}</div> -->
      </div>
      <div class="right">
        <p class="title">{{theDetail.title}}</p>
        <p class="p name">费&nbsp;&nbsp;&nbsp;用：{{theDetail.cost}}/人</p>
        <p class="p organizer">组织者：{{theDetail.nickName}}</p>
        <p class="p place">体育馆：{{theDetail.venueName}}</p>
      </div>
      <div class="timeWrap">
        <h1 class="time">{{theDetail.timeStart}}</h1>
        <div class="date">{{theDetail.time}}</div>
      </div>
    </div>
    <!-- 临时群主 -->
    <div class="leader">
      <div class="radiuBox" @click="isSelect = !isSelect"><span class="el-icon-check" v-show="isSelect"></span></div>
      <div class="descr">
        <p>担任本场活动临时领队</p>
        <p @click="isShowLeaderDetail = !isShowLeaderDetail">《来虎临时领队义务和责任》</p>
      </div>
      <div class="detail" v-show="isShowLeaderDetail">
        <p>1、在“确认支付”页面选择“担任临时群主”并成功担任的，本次活动可直接抵扣8元报名费用。</p>
        <p>2、一场活动有且仅有一个临时群主，所以若有其他人已经担任，则您在支付时会失败，此时需要您取消“担任临时群主”的选择，继续按照普通球友的方式支付。</p>
        <p>3、在选择担任临时群主时，请您确保能提前到达活动场馆并能按照信息提示到来虎自助取球机或场馆前台领球，分发到每个场地；在活动结束后主动收拾残球，并回收入柜。</p>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="number">报名人数</div>
    <div class="numberWrap">
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
    <!-- 支付方式 -->
    <div class="payType">支付方式</div>
      <ul class="pay">
        <!-- <li>
          <div class="left">
            <el-radio v-model="radio" label="1">会费支付</el-radio>
          </div>
          <div class="right">
          </div>
        </li> -->
        <li>
          <div class="left">
            <div class="circle"><span></span></div><div class="text">微信支付</div>
          </div>
          <div class="right">
            {{theDetail.cost}}元/人
          </div>
        </li>
        <li class="coupon_li">
          <div class="left">
            <div class="circle" @click="isUseCoup"><span v-show="isUse"></span></div><div class="text">优惠券</div>
          </div>
          <div class="right" @click="toSelectCoup">
            <p v-if="isShowNoUse">暂无可用</p>
            <p v-else>
              <span class="useNum" v-show="!haveSelected">11张可用</span>
              <span v-show="haveSelected">嘉年华优惠券&nbsp;&nbsp;&nbsp;<b>-￥5</b></span>
            </p>
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
      </ul>
    <!-- 确认按钮 -->
    <div class="bottom">
      <div class="left">
        <p class="p1">合计：</p>
        <p class="p2">现金：{{total}}元</p>
      </div>
      <div class="btn" @click="surePay">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivitySignUp',
  data() {
    return {
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
      isUse: true,  //默认使用优惠券
      useCoupList: [],  //可使用优惠券列表
      notUserCoupList: [],  //不可使用优惠券列表
      selectedCoupon: '',  //选中的优惠券
      couponId: '',  //选中的优惠券id
      haveSelected: false,
      state: '',  //活动状态
      isSelect: false,  //默认不选择临时领队
      isShowLeaderDetail: false,  //是否展示领队义务与责任
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
    }
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
        this.useCoupList = resp.data.couponVoList
        this.notUserCoupList = resp.data.noCouponVoList
        this.state = resp.data.state
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
    // 是否使用优惠券
    isUseCoup() {
      this.isUse = !this.isUse
      this.haveSelected = false
    },
    // 选择优惠券
    toSelectCoup() {
      // 将优惠券列表传给下一页
      window.sessionStorage.setItem('useCouponList' ,JSON.stringify(this.useCoupList))
      window.sessionStorage.setItem('notUserCoupList' ,JSON.stringify(this.notUserCoupList))
      this.$router.push({
        path: '/activitySignUp/selectCoupon'
      })
    },
    // 支付
    surePay() {
      if((this.num1 + this.num2) <= 0){
        this.$toast({
          message: '请添加报名人数！',
          duration: 2000
        })
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
          isGroup: this.isShowLeaderDetail
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
                    that.$toast({
                      message: '支付失败!',
                      duration: 2000
                    })
                  },
                  cancel: function(res) {
                    that.$toast({
                      message: '取消支付!',
                      duration: 2000
                    })
                  }
              });
            }); 
            wx.error(function(res){
              that.$toast({
                message: '支付失败！',
                duration: 2000
              })
            })
          }
        })
      }
    }
  },
  beforeDestroy() {
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
    background: #f2f2f2;
    .actDetail{
      width: 100%;
      height: 228px;
      background: #fff;
      overflow: hidden;
      position: relative;
      .left{
        width: 190px;
        height: 135px;
        border-right: 1px solid #e8e8e8;
        float: left;
        margin-top: 45px;
        padding-right: 20px;
        overflow: hidden;
        .imgbox{
          width: 128px;
          height: 128px;
          // border: 1px solid red;
          margin-left: 25px;
          border-radius: 10px;
          margin-top: 2px;
        }
      }
      .right{
        width: 520px;
        height: 100%;
        float: right;
        // padding-top: 42px;
        white-space: nowrap;
        padding-right: 20px;
        .title{
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #000;
          margin-top: 40px;
          font-size: 32px;
          line-height: 34px;
        }
        .p{
          width: 60%;
          font-size: 22px;
          color: #797979;
          line-height: 37px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name{
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .timeWrap{
        width: 190px;
        height: 135px;
        border-right: 1px solid #e8e8e8;
        // margin-top: 65px;
        padding-right: 20px;
        position: absolute;
        right: 0;
        top: 80px;
        .time{
          font-size: 36px;
          color: #f9c41e;
          font-weight: bold;
          text-align: center;
          line-height: 65px;
        }
        .date{
          font-size: 25px;
          color: #a5a5a5;
          text-align: center;
        }
      }
    }
    .leader{
      width: 100%;
      min-height: 110px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      .radiuBox{
        width: 60px;
        height: 60px;
        transform: scale(0.8);
        float: left;
        border-radius: 50%;
        border: 1px solid rgb(192, 192, 192);
        margin-top: 15px;
        margin-left: 30px;
        span{
          font-size: 45px;
          line-height: 60px;
          margin-left: 3px;
          font-weight: bold;
          display: inline-block;
          text-align: center;
        }
      }
      .descr{
        height: 100px;
        float: left;
        // border: 1px solid red;
        margin-left: 15px;
        p{
          font-size: 27px;
          line-height: 27px;
          margin-top: 20px;
        }
        p:nth-of-type(2){
          font-size: 22px;
          margin-top: 20px;
          margin-left: -10px;
          color: #fac31e;
        }
      }
      .detail{
        width: 92%;
        height: auto;
        margin: 0 auto;
        margin-top: 110px;
        border-top: 1px dashed #dedede;
        padding-top: 10px;
        padding-bottom: 18px;
        p{
          width: 100%;
          font-size: 26px;
          line-height: 40px;
          margin-top: 5px;
        }
      }
    }
    .number{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 100px;
      font-size: 30px;
    }
    .numberWrap{
      width: 100%;
      height: auto;
      background: #fff;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 100px;
          padding-left: 30px;
          padding-right: 25px;
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
    .payType{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 100px;
      font-size: 30px;
    }
    .pay{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%;
        height: 100px;
        padding-left: 30px;
        padding-right: 40px;
        .left{
          width: 250px;
          line-height: 20px;
          font-size: 0;
          float: left;
          .circle{
            width: 47px;
            height: 47px;
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
            line-height: 96px;
            font-size: 28px;
            vertical-align: middle;
          }
        }
        .right{
          float: right;
          width: 200px;
          line-height: 100px;
          text-align: right;
          color: #6e6e6e;
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
    .bottom{
      width: 100%;
      height: 128px;
      padding-left: 20px;
      border-top: 1px solid #e6eaeb;
      background: #fff;
      position: fixed;
      bottom: 0;
      .left{
        width: 50%;
        height: 128px;
        float: left;
        padding-left: 20px;
        .p1{
          font-size: 24px;
          color: #717171;
          line-height: 22px;
          margin-top: 24px;
        }
        .p2{
          font-size: 28px;
          color: #ec532a;
          line-height: 24px;
          margin-top: 20px;
        }
      }
      .btn{
        width: 152px;
        height: 76px;
        color: #fff;
        background: #ee5e39;
        line-height: 76px;
        text-align: center;
        float: right;
        margin-top: 27px;
        margin-right: 17px;
        border-radius: 10px;
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
</style>
