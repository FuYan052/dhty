<template>
  <!-- 支付选择优惠券 -->
  <div class="selectCoupon" v-title data-title="优惠券">
    <!-- 分类 -->
    <ul class="cate">
      <li @click="changeCate(1)" :class="{actCate: act1}">可用优惠券({{num1}})</li>
      <li @click="changeCate(2)" :class="{actCate: act2}">不可以优惠券({{num2}})</li>
    </ul>
    <!-- 优惠券列表 -->
    <ul class="listBox">
      <li v-for="(item,index) in currList" :key="index" @click="clickCoup(item,index)">
        <div class="couItem">
          <!-- 优惠券左边 -->
          <div class="left">
            <p class="p1"><span>￥</span>{{item.money}}</p>
            <p class="p2">无门槛优惠券</p>
          </div>
          <!-- 优惠券右边 -->
          <div class="right">
            <div class="title">
              <div class="tip">优惠券</div>
              <div class="titleText">{{item.name}}</div>
            </div>
            <p class="dateRange">{{item.startTime}}-{{item.endTime}}</p>
            <!-- 单选框 -->
            <div class="radiuBox"><span class="el-icon-check" v-show="i === index"></span></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottomBox">
      <div class="sureBtn">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCoupon',
  data() {
    return {
      act1: true,
      act2: false,
      list1: [],  //可用优惠券
      list2: [],  //不可用优惠券
      currList: [],  //页面渲染
      i: null,
      selectedCoupon: ''
    }
  },
  created() {
    this.list1 = JSON.parse(window.sessionStorage.getItem('notUserCoupList'))
    this.list2 = JSON.parse(window.sessionStorage.getItem('useCouponList'))
    this.currList = this.list1
    console.log(this.currList)
  },
  computed: {
    num1() {
      return this.list1.length
    },
    num2() {
      return this.list2.length
    }
  },
  methods: {
    // 切换分类
    changeCate(cateIndex) {
      if(cateIndex === 1) {  //可用优惠券
        this.act1 = true
        this.act2 = false
        this.currList = this.list1
      }
      if(cateIndex === 2) {  //不可用优惠券
        this.act1 = false
        this.act2 = true
        this.currList = this.list2
      }
    },
    clickCoup(item,index) {
      this.i = index
      this.selectedCoupon = item
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectCoupon{
    width: 100%;
    min-height: 100vh;
    background: #f7f7f7;
    padding-top: 96px;
    padding-bottom: 166px;
    .cate{
      width: 100%;
      height: 96px;
      background: #fff;
      z-index: 9;
      position: fixed;
      top: 0;
      li{
        width: 35%;
        height: 96px;
        line-height: 96px;
        font-size: 26px;
        float: left;
        text-align: center;
        margin-left: 10%;
      }
      .actCate{
        border-bottom: 4px solid #fea406;
      }
    }
    .listBox{
      width: 100%;
      min-height: 80vh;
      padding: 0 18px;
      li{
        width: 100%;
        height: auto;
        margin-top: 18px;
        .couItem{
          width: 100%;
          height: 200px;
          .left{
            width: 33.8%;
            height: 200px;
            background: url('../../assets/couponBlueBg.png') no-repeat center;
            background-size: 100% 100%;
            float: left;
            .p1{
              text-align: center;
              color: #fff;
              font-size: 55px;
              font-weight: bold;
              line-height: 55px;
              margin-top: 50px;
              span{
                font-size: 26px;
              }
            }
            .p2{
              text-align: center;
              color: #fff;
              font-size: 24px;
              line-height: 24px;
              margin-top: 15px;
            }
          }
          // .alreadyUsed{  //已使用左边灰色背景
          //   background: url('../../../assets/disableBg.png') no-repeat center;
          //   background-size: 100% 100%;
          // }
          .right{
            width: 66.2%;
            height: 200px;
            float: left;
            background: #fdfdfd;
            // border: 1px solid red;
            padding-left: 20px;
            position: relative;
            .title{
              width: 360px;
              height: 57px;
              .tip{
                width: 90px;
                height: 30px;
                border-radius: 3px;
                background: #5997d7;
                text-align: center;
                line-height: 30px;
                font-size: 20px;
                color: #fff;
                float: left;
                margin-top: 28px;
              }
              .alreadyUsedTip{  //已使用标题
                background: #c6c6c6;
              }
              .titleText{
                float: left;
                font-size: 24px;
                height: 57px;
                padding-top: 20px;
                margin-left: 11px;
              }
            }
            .dateRange{
              font-size: 21px;
              line-height: 18px;
              margin-top: 70px;
            }
            .radiuBox{
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #d4d4d4;
              border-radius: 50%;
              position: absolute;
              top: 80px;
              right: 25px;
              span{
                color: #5997d7;
                font-size: 26px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .bottomBox{
      width: 100%;
      height: 166px;
      position: fixed;
      bottom: 0;
      z-index: 9;
      background: #f7f7f7;
      .sureBtn{
        width: 524px;
        height: 86px;
        border-radius: 43px;
        font-size: 32px;
        line-height: 86px;
        text-align: center;
        background: #ffbf1f;
        color: #fff;
        margin: 0 auto;
        margin-top: 40px;
      }
    }
  }
</style>