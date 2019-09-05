<template>
  <!-- 提现账户明细 -->
  <div class="accountDetails" v-title data-title="账户明细">
    <div class="cate">
      <div 
        class="cateItem"
        :class="{currStyle : currIndex === index}" 
        v-for="(item,index) in cateList" 
        :key="index"
        @click="changeCate(item,index)"
        >{{item}}</div>
    </div>
    <ul class="detailList">
      <li v-for="(item,index) in 3" :key="index">
        <div class="left"></div>
        <div class="text">
          <p class="p1">{{number}}虎币</p>
          <p class="p2">{{content}}</p>
        </div>
        <div class="right">
          2019-08-16&nbsp;&nbsp;&nbsp;15:20
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountDetails',
  data() {
    return {
      cateList: ['购物明细','账户明细','提现明细'],
      currIndex: 0,
      number: '+465',
      content: '订单' + 89895642562226554652
    }
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
      if(item === '购物明细') {
        this.content = '订单' + 89895642562226554652
        this.number = '+465'
      }
      if(item === '账户明细') {
        this.content = '参与活动'
        this.number = '+165'
      }
      if(item === '提现明细') {
        this.content = '提现'
        this.number = '-1465'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .accountDetails{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cate{
      width: 100%;
      height: 80px;
      line-height: 78px;
      border: 1px solid #f8d2a7;
      // border-bottom: 1px solid #f8d2a7;
      .cateItem{
        width: 33.3%;
        height: 76px;
        line-height: 76px;
        text-align: center;
        float: left;
        color: #919292;
        font-size: 26px;
      }
      .currStyle{
        color: #1f1b10;
        height: 76px;
        background: #fdeab0;
      }
    }
    .detailList{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 160px;
        padding: 0 20px;
        background: #fff;
        margin-bottom: 20px;
        .left{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          float: left;
          margin-top: 50px;
          background: url("../../../assets/accountIcon.png") no-repeat center;
          background-size: contain;
        }
        .text{
          width: 55%;
          height: 160px;
          float: left;
          margin-left: 30px;
          padding-top: 20px;
          .p1{
            color: rgb(252, 105, 105);
            line-height: 60px;
          }
          .p2{
            line-height: 60px;
            font-size: 20px;
          }
        }
        .right{
          height: 160px;
          font-size: 22px;
          float: right;
          line-height: 160px;
          color: #acaba9;
        }
      }
    }
  }
</style>
