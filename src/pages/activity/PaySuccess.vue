<template>
  <div class="paySuccess" v-title data-title="支付成功">
    <div class="topBg"></div>
    <p class="p1">支付成功</p>
    <div class="itemBox">
      <p class="p_s p_s_1">支付金额：<span>￥{{orderDetail.totalPrice}}</span></p>
      <div class="p_s name"><span class="span1">支付对象：</span><span>{{orderDetail.title}}</span></div>
      <p class="p_s">支付时间：<span>{{orderDetail.timeStart}}</span></p>
      <p class="p_s">交易单号：<span>{{orderDetail.orderNo}}</span></p>
    </div>
    <div class="btnBox">
      <div class="btn btn1" @click="goActHome">返回首页</div>
      <div class="btn btn2" @click="goMyact">查看活动</div>
    </div> 
    <div class="bottomBg"></div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  data() {
    return {
      orderId: '',
      orderDetail: null
    }
  },
  created() {
    this.orderId = window.sessionStorage.getItem('orderId')
    this.$http.payOk(this.orderId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.orderDetail = resp.data
      }
    })
  },
  methods: {
    // 返回活动首页
    goActHome() {
      this.$router.replace({
        path: '/activityHome'
      })
    },
    // 查看活动
    goMyact() {
      this.$router.replace({
        path: '/userCenter/myActivities'
      })
    }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('orderId')
  }
}
</script>

<style lang="scss" scoped>
  .paySuccess{
    width: 100%;
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
    .topBg{
      width: 100%;
      height: 164px;
      background: url('../../assets/paySuccessBg.jpg') no-repeat center;
      background-size: cover;
    }
    .p1{
      text-align: center;
      font-size: 35px;
      line-height: 37px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .itemBox{
      width: 100%;
      min-height: 280px;
      padding-bottom: 50px;
      margin-top: 52px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
    }
    .p_s{
      font-size: 28px;
      color: #686868;
      line-height: 26px;
      margin-top: 35px;
      padding-left: 60px;
      span{
        color: #000;
        padding-left: 32px;
        vertical-align: top;
      }
    }
    .p_s_1{
      margin-top: 54px;
    }
    .name{
      min-height: 37px;
      line-height: 45px;
      // border: 1px solid red;
      .span1{
        width: 24%;
        padding-left: 0px;
        display: inline-block;
        color: #686868;
      }
      .span2{
        padding-left: 0px;
        display: inline-block;
        width: 76%;
        // border: 1px solid red;
      }
    }
    .btnBox{
      width: 100%;
      height: 200px;
      padding: 0 60px;
      margin-top: 85px;
      .btn{
        width: 295px;
        height: 80px;
        line-height: 80px;
        float: left;
        text-align: center;
        border: 1px solid #ffd148;
        border-radius: 5px;
        font-size: 29px;
        color: #ffd148;
        margin-top: 55px;
      }
      .btn2{
        float: right;
        background: #fecb1a;
        color: #fff;
        border: none;
      }
    }
    .bottomBg{
      width: 100%;
      height: 30vh;
      background: #f2f2f2;
      position: fixed;
      bottom: 0;
    }
  }
</style>