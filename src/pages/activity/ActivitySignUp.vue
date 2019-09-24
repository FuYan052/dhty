<template>
  <!-- 活动报名 -->
  <div class="activitySignUp" v-title data-title="活动报名">
    <div class="actDetail">
      <div class="left">
        <h1 class="time">{{theDetail.timeStart}}</h1>
        <div class="date">{{theDetail.time}}</div>
      </div>
      <div class="right">
        <!-- <p class="title"><span>【俱乐部活动】</span>08月05日周一俱乐部活动一起</p> -->
        <p class="title">{{theDetail.title}}</p>
        <p class="p name">俱乐部：{{theDetail.groupName}}</p>
        <p class="p organizer">组织者：{{theDetail.nickName}}</p>
        <p class="p place">体育馆：{{theDetail.venueName}}</p>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="number">报名人数</div>
    <div class="numberWrap">
      <ul>
        <li>
          <div class="left"><span class="el-icon-user"></span>男</div>
          <div class="right">
            <el-input-number v-model="num1" @change="handleChange" :min="0"></el-input-number>
          </div>
        </li>
        <li>
          <div class="left"><span class="el-icon-user"></span>女</div>
          <div class="right">
            <el-input-number v-model="num2" @change="handleChange" :min="0"></el-input-number>
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
      code: ''
    }
  },
  computed: {
    total() {
      return Number(this.theDetail.cost) * (this.num1 + this.num2)
    }
  },
  created() {
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
    // 向后台提交信息
    this.activityDetailId = window.sessionStorage.getItem('activityDetailId')
    this.$http.activitiesDetail(this.activityDetailId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data
      }
    })
  },
  methods: {
    handleChange(value) {
      // console.log(value);
    },
    // 支付
    surePay() {
      const params = {
        userId: window.localStorage.getItem('userId'),
        oaMoneyId: this.activityDetailId,
        code: this.code,
        totalPrice: this.total
      }
      console.log(params)
      this.$http.postPay(params).then(resp => {
        console.log(resp)
        if(resp.statis == 200) {


          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          wx.ready(function () {
            wx.chooseWXPay({
                timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: paySign, // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                  console.log(res);
                },
                fail: function (res) {
                  //失败回调函数
                  console.log(res);
                }
            });
          });
        }
      })
    }
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
      .left{
        width: 170px;
        height: 120px;
        border-right: 1px solid #e8e8e8;
        float: left;
        margin-top: 55px;
        padding-right: 20px;
        overflow: hidden;
        .time{
          font-size: 26px;
          color: #f9c41e;
          font-weight: bold;
          text-align: center;
          line-height: 65px;
        }
        .date{
          font-size: 22px;
          color: #a5a5a5;
          text-align: center;
        }
      }
      .right{
        width: 540px;
        height: 100%;
        float: right;
        padding-top: 42px;
        white-space: nowrap;
        padding-right: 20px;
        .title{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #7f7f7f;
        }
        .p{
          font-size: 20px;
          color: #797979;
          line-height: 37px;
        }
        .name{
          margin-top: 5px;
        }
      }
    }
    .number{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 120px;
    }
    .numberWrap{
      width: 100%;
      height: auto;
      // height: 195px;
      background: #fff;
      ul{
        width: 100%;
        height: auto;
        // border: 1px solid red;
        li{
          width: 100%;
          height: 100px;
          padding-left: 30px;
          padding-right: 40px;
          .left{
            width: 200px;
            height: 96px;
            line-height: 96px;
            float: left;
            font-size: 20px;
            span{
              font-size: 32px;
              color: #12abe7;
              padding-right: 25px;
            }
          }
          .right{
            width: 230px;
            height: 100%;
            float: right;
          }
        }
        li:nth-child(2){
          border-top: 1px solid #f0f2f1;
          .left{
            span{
              color: #e60e57;
            }
          }
        }
      }
    }
    .payType{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 120px;
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
          width: 300px;
          line-height: 20px;
          font-size: 0;
          float: left;
          .circle{
            width: 47px;
            height: 47px;
            display: inline-block;
            border: 1px solid #fac31e;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            span{
              display: block;
              width: 21px;
              height: 21px;
              background: #fac31e;
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
    }
    .bottom{
      width: 100%;
      height: 128px;
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
          font-size: 22px;
          color: #717171;
          line-height: 22px;
          margin-top: 24px;
        }
        .p2{
          font-size: 24px;
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
    width: 230px;
    height: 45px;
    margin-top: 25px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input__inner{
    width: 120px;
    height: 45px;
    line-height: 43px;
    border-radius: 10px;
    font-size: 20px;
    padding: 0;
    margin-left: 55px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__decrease{
    background: #d5d9d8;
    color: #fff;
    border-radius: 7px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__increase{
    background: #fac31e;
    color: #fff;
    border-radius: 7px;
  }
</style>
