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
    <!-- 无数据时缺省页 -->
    <div class="noList" v-show="noList"></div>
    <!-- 有数据时 -->
    <ul class="listBox" v-show="!noList">
      <li v-for="(item,index) in coupList" :key="index">
        <div class="couItem">
          <!-- 优惠券左边 -->
          <div class="left" :class="{alreadyUsed : currCateIndex === 1 || currCateIndex === 2}">
            <p class="p1"><span>￥</span>{{item.money}}</p>
            <p class="p2">无门槛优惠券</p>
          </div>
          <!-- 优惠券右边 -->
          <div class="right">
            <div class="title">
              <div class="tip" :class="{alreadyUsedTip : currCateIndex === 1 || currCateIndex === 2}">优惠券</div>
              <div class="titleText">{{item.name}}</div>
            </div>
            <p class="dateRange" v-show="currCateIndex === 0 || currCateIndex === 2">{{item.startTime}}-{{item.endTime}}</p>
            <p class="dateRange" v-show="currCateIndex === 1">{{item.useTime}}</p>
            <div class="Instructions">
              <span class="span1"></span>
              <span class="span2" @click="showUseDetail(index)">使用说明</span>
            </div>
          </div>
          <!-- 快过期 -->
          <!-- <div class="ExpireSoon"></div> -->
          <!-- 已过期 -->
          <div class="Expired" v-show="currCateIndex === 2"></div>
          <!-- 立即使用 -->
          <div class="couBtn ImmediateUse" v-show="currCateIndex === 0" @click="toUse">立即使用</div>
          <div class="couBtn alreadyUsedBtn" v-show="currCateIndex === 1">已使用</div>
          <!-- 箭头朝上 -->
          <div class="arrow arrowUp" @click="showUseDetail(index)" v-show="index === i"></div>
          <!-- 箭头朝下 -->
          <div class="arrow arrowDown" @click="showUseDetail(index)" v-show="!(index === i)"></div>
        </div>
        <!-- 使用说明 -->
        <div class="InstrDetail" v-show="index === i">{{item.content}}</div>
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
      coupList: [],
      isShowDetail: false,
      i: -1,
      noList: false,
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
        if(resp.status == 200) {
          this.coupList = resp.data
          if(this.coupList.length == 0) {
            this.noList = true
          }else{
            this.noList = false
          }
        }
      })
    },
    // 切换分类
    changeCate(index) {
      this.currCateIndex = index
      if(index === 0) {  //未使用
        window.scrollTo(0,0)
        this.getCoupon()
      }
      if(index === 1) {  //已使用
        window.scrollTo(0,0)
        this.getCoupon()
      }
      if(index === 2) {  //已过期
        window.scrollTo(0,0)
        this.getCoupon()
      }
    },
    // 立即使用
    toUse() {
      this.$router.push({
        path: '/intelligenceTreatyBall'
      })
    },
    // 点击使用说明
    showUseDetail(index) {
      this.isShowDetail = !this.isShowDetail
      if(this.isShowDetail){
        this.i = index
      }else{
        this.i = -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon{
    width: 100%;
    min-height: 100vh;
    background: #fff;
    position: relative;
    padding-top: 96px;
    .noList{
      width: 100%;
      height: 93vh;
      background: url('../../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    .cate{
      width: 100%;
      height: 96px;
      background: #fff;
      padding: 0 55px;
      z-index: 9;
      position: fixed;
      top: 0;
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
      padding-bottom: 40px;
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
          .alreadyUsed{  //已使用左边灰色背景
            background: url('../../../assets/disableBg.png') no-repeat center;
            background-size: 100% 100%;
          }
          .right{
            width: 66.2%;
            height: 200px;
            float: left;
            background: #fdfdfd;
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
          .Expired{
            width: 110px;
            height: 120px;
            background: url('../../../assets/ExpiredBg.png') no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 0;
          }
          .couBtn{
            width: 118px;
            height: 40px;
            text-align: center;
            line-height: 39px;
            font-size: 20px;
            color: #fec013;
            border: 1px solid #fec013;
            border-radius: 20px;
            position: absolute;
            top: 95px;
            right: 45px;
          }
          .ImmediateUse{
            color: #fec013;
            border: 1px solid #fec013;
          }
          .alreadyUsedBtn{
            color: #c6c6c6;
            border: 1px solid #c6c6c6;
          }
          .arrow{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            transform: scale(.5);
            background: url('../../../assets/upIcon.png') no-repeat center;
            background-size: 100% 100%;
            border: 1px solid #dddddd;
            position: absolute;
            top: 152px;
            right: 20px;
          }
          .arrowDown{
            background: url('../../../assets/downIcon.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
        .InstrDetail{
          width: 100%;
          height: auto;
          padding: 0 22px;
          border-top: 3px dashed #f8f6f6;
          font-size: 20px;
          line-height: 35px;
          padding-top: 10px;
          padding-bottom: 15px;
          color: rgb(88, 87, 87);
        }
      }
    }
  }
</style>