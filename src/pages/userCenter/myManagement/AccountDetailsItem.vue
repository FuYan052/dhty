<template>
  <div class="accountDetailsItem" v-title data-title="账单明细">
    <div class="content">
      <div class="top">
        <div class="ImgBox">
          <img :src="accountDetail.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
        </div>
        <p class="title">{{accountDetail.name}}</p>
        <p class="money" v-if="accountDetail.paymentType">+{{accountDetail.totalFee}}</p>
        <p class="money tui" v-else>-{{accountDetail.totalFee}}</p>
      </div>
      <ul class="bottom">
        <li>
          <div class="left">支付类型</div>
          <div class="right" v-if="accountDetail.paymentType">收报名费</div>
          <div class="right" v-else>退报名费</div>
        </li>
        <li>
          <div class="left">支付会员</div>
          <div class="right">{{accountDetail.name}}-{{accountDetail.phone}}</div>
        </li>
        <li>
          <div class="left">支付时间</div>
          <div class="right">{{accountDetail.timeStart}}</div>
        </li>
        <li>
          <div class="left">交易单号</div>
          <div class="right" v-if="accountDetail.paymentType">{{accountDetail.outTradeNo}}</div>
          <div class="right" v-else>{{accountDetail.outRefundNo}}</div>
        </li>
        <li>
          <div class="left">备注</div>
          <div class="right">{{accountDetail.remark}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountDetailsItem',
  data() {
    return {
      accountDetail: ''
    }
  },
  created() {
    const id = this.$route.params.id
    this.$http.getAccountDetail(id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.accountDetail = resp.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .accountDetailsItem{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .content{
      width: 100%;
      height: auto;
      background: #fff;
      padding: 0 58px;
      overflow: hidden;
      .top{
        width: 100%;
        height: 380px;
        border-bottom: 1px solid #f2f2f2;
        .ImgBox{
          width: 96px;
          height: 96px;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 45px;
        }
        .title{
          width: 100%;
          font-size: 30px;
          line-height: 30px;
          margin-top: 32px;
          text-align: center;
        }
        .money{
          width: 100%;
          font-size: 43px;
          line-height: 43px;
          text-align: center;
          font-weight: bold;
          margin-top: 42px;
          color: #222222;
        }
        .tui{
          color: #e55e27;
        }
      }
      .bottom{
        width: 100%;
        height: auto;
        padding: 30px 0;
        padding-bottom: 50px;
        li{
          width: 100%;
          min-height: 58px;
          .left{
            display: inline-block;
            width: 23.1%;
            min-height: 58px;
            font-size: 27px;
            line-height: 40px;
            color: #868686;
            text-align: left;
            vertical-align: top;
          }
          .right{
            width: 75%;
            min-height: 58px;
            display: inline-block;
            font-size: 27px;
            line-height: 40px;
            color: #2f2f2f;
            text-align: left;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>