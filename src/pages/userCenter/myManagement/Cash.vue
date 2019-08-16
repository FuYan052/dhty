<template>
  <!-- 提现 -->
  <div class="cash" v-title data-title="提现">
    <p class="p1">虎币（个）</p>
    <p class="p2">14809</p>
    <div class="cate">
      <div>
        <p>正在提取中（个）</p>
        <p>0</p>
      </div>
      <div>
        <p>可提取虎币（个）</p>
        <p>14809</p>
      </div>
      <div>
        <p>待结算（个）</p>
        <p>0</p>
      </div>
    </div>
    <div class="btn">提现</div>
    <div class="record" @click="toDetail">
      账户明细<span class="el-icon-arrow-right"></span>
    </div>
    <p class="careful">
      注意：100个虎币=1元，最低提取额度为1000虎币。
    </p>
  </div>
</template>

<script>
export default {
  name: 'Cash',
  methods: {
    toDetail() {
      this.$router.push({
        path: '/userCenter/cash/accountDetails'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cash{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .p1{
      width: 100%;
      margin-top: 35px;
      margin-left: 35px;
    }
    .p2{
      width: 100%;
      font-size: 45px;
      font-weight: bold;
      text-align: center;
      color: #fac31e;
      margin-top: 45px;
    }
    .cate{
      width: 100%;
      height: 140px;
      background: #fff;
      margin-top: 80px;
      border-top: 1px solid #a09d9d;
      border-bottom: 1px solid #a09d9d;
      padding-top: 20px;
      div{
        width: 31.3%;
        height: 95px;
        float: left;
        font-size: 24px;
        p{
          line-height: 30px;
          text-align: center;
          color: #8b8b8b;
        }
        p:nth-child(2){
          color: #000;
          line-height: 90px;
        }
      }
      div:nth-child(2){
        width: 37.4%;
        border-left: 2px solid #a09d9d;
        border-right: 2px solid #a09d9d;
      }
    }
    .btn{
      width: 255px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #fff;
      background: #fac31e;
      font-size: 24px;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 80px;
    }
    .record{
      width: 100%;
      height: 90px;
      border-top: 1px solid #a09d9d;
      border-bottom: 1px solid #a09d9d;
      background: #fff;
      margin-top: 80px;
      padding: 0 40px;
      line-height: 90px;
      span{
        float: right;
        line-height: 90px;
        font-size: 32px;
        font-weight: bold;
        color: #919191;
      }
    }
    .careful{
      padding-left: 40px;
      color: #9b9b9b;
      margin-top: 30px;
      font-size: 24px;
    }
  }
</style>

