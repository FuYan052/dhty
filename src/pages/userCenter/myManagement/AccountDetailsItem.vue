<template>
  <div class="accountDetailsItem" v-title data-title="账单明细">
    <div class="content">
      <div class="top">
        <div class="ImgBox">
          <img src="../../../assets/LOGO1.png" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
        </div>
        <p class="title">来虎体育</p>
        <p class="money">+25.00</p>
      </div>
      <ul class="bottom">
        <li>
          <div class="left">支付类型</div>
          <div class="right">收报名费</div>
        </li>
        <li>
          <div class="left">支付会员</div>
          <div class="right">西拉-18884521325</div>
        </li>
        <li>
          <div class="left">支付时间</div>
          <div class="right">2019-10-28  13:25:00</div>
        </li>
        <li>
          <div class="left">交易单号</div>
          <div class="right">524675568565269569569556</div>
        </li>
        <li>
          <div class="left">备注</div>
          <div class="right">智能约球-高级场-波利羽毛球馆</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountDetailsItem'
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