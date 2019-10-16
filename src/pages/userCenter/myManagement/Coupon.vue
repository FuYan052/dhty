<template>
  <!-- 我的优惠券 -->
  <div class="coupon" v-title data-title="我的优惠券">
    <!-- 分类 -->
    <ul class="cate">
      <li 
        v-for="(item,index) in cateList" 
        :key="index"
        @click="changeCate(index)"
        :class="{actCate: index === currCateIndex}"
        >{{item}}</li>
    </ul>
    <!-- 未使用列表 -->
    <ul class="listBox">
      <li v-for="(item,index) in 3" :key="index">
        <div class="couItem">
          <!-- 优惠券左边 -->
          <div class="left">
            <p class="p1"><span>￥</span>5</p>
            <p class="p2">无门槛优惠券</p>
          </div>
          <!-- 优惠券右边 -->
          <div class="right">
            <div class="title">
              <div class="tip">优惠券</div>
              <div class="titleText">双十一嘉年华5元券</div>
            </div>
            <p class="dateRange">2019.09.17-2019.10.19</p>
            <div class="Instructions">
              <span class="span1"></span>
              <span class="span2">使用说明</span>
            </div>
          </div>
          <!-- 快过期 -->
          <!-- <div class="ExpireSoon"></div> -->
          <!-- 立即使用 -->
          <div class="ImmediateUse">立即使用</div>
          <!-- 箭头朝上 -->
          <div class="arrow arrowUp" v-show="isUp"></div>
          <!-- 箭头朝下 -->
          <div class="arrow arrowDown" v-show="!isUp"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Coupon',
  data() {
    return {
      cateList: ['未使用',"已使用","已过期"],
      currCateIndex: 0,
      isUp: true,
    }
  },
  created() {
    // 查询优惠券，默认先查未使用
    this.getCoupon()
  },
  methods: {
    // 查询优惠券
    getCoupon() {
      const params = {
        userId: window.localStorage.getItem('userId'),
        state: this.currCateIndex
      }
      this.$http.findCouponInfo(params).then(resp => {
        console.log(resp)
      })
    },
    // 切换分类
    changeCate(index) {
      this.currCateIndex = index
      if(index === 0) {  //未使用
        this.getCoupon()
      }
      if(index === 1) {  //已使用
        this.getCoupon()
      }
      if(index === 2) {  //已过期
        this.getCoupon()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon{
    width: 100%;
    min-height: 100vh;
    background: #fdfdfd;
    .cate{
      width: 100%;
      height: 96px;
      background: #fff;
      padding: 0 55px;
      li{
        width: 140px;
        height: 96px;
        line-height: 96px;
        font-size: 26px;
        float: left;
        text-align: center;
      }
      li:nth-of-type(2) {
        margin-left: 110px;
        margin-right: 110px;
      }
      .actCate{
        border-bottom: 4px solid #fea406;
      }
    }
    .listBox{
      width: 100%;
      height: auto;
      padding: 0 18px;
      li{
        width: 100%;
        height: auto;
        margin-top: 18px;
        .couItem{
          width: 100%;
          height: 200px;
          position: relative;
          .left{
            width: 33.8%;
            height: 200px;
            background: url('../../../assets/couBg.png') no-repeat center;
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
          .right{
            width: 66.2%;
            height: 200px;
            float: left;
            background: #fff;
            // border: 1px solid red;
            padding-left: 20px;
            .title{
              width: 360px;
              height: 57px;
              .tip{
                width: 90px;
                height: 30px;
                border-radius: 15px;
                background: #ffc114;
                text-align: center;
                line-height: 30px;
                font-size: 20px;
                color: #fff;
                float: left;
                margin-top: 28px;
              }
              .titleText{
                float: left;
                font-size: 22px;
                height: 57px;
                padding-top: 23px;
                margin-left: 11px;
              }
            }
            .dateRange{
              font-size: 18px;
              line-height: 18px;
              margin-top: 50px;
            }
            .Instructions{
              width: 265px;
              height: 45px;
              border-top: 2px dashed #f5f5f5;
              margin-top: 20px;
              line-height: 45px;
              .span1{
                display: inline-block;
                width: 25px;
                height: 25px;
                background: url('../../../assets/markIcon.png') no-repeat center;
                background-size: contain;
                vertical-align: middle;
              }
              .span2{
                font-size: 19px;
                line-height: 44px;
              }
            }
          }
          .ExpireSoon{
            width: 90px;
            height: 65px;
            background: url('../../../assets/ExpireSoon.png') no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 0;
          }
          .ImmediateUse{
            width: 118px;
            height: 40px;
            text-align: center;
            line-height: 39px;
            font-size: 18px;
            color: #fec013;
            border: 1px solid #fec013;
            border-radius: 20px;
            position: absolute;
            top: 95px;
            right: 45px;
          }
          .arrow{
            width: 25px;
            height: 25px;
            border: 1px solid red;
            // border-radius: 50%;
            background: url('../../../assets/upIcon.png') no-repeat center;
            background-size: contain;
            position: absolute;
            top: 160px;
            right: 20px;
          }
          .arrowDown{
            background: url('../../../assets/downIcon.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>