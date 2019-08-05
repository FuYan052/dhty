<template>
  <!-- 我的活动 -->
  <div class="myActivities" v-title data-title="我的活动">
    <!-- 活动分类 -->
    <div class="topCate1">
      <div 
        class="wrap"
        :class="{currStyle : currIndex === index}" 
        v-for="(item,index) in cateList1" 
        :key="index"
        @click="changeCate(item,index)"
        >{{item}}</div>
    </div>
    <!-- 参加状态 -->
    <div class="cate2">
      <div 
      class="cateItem"
      :class="{currStyle2 : currIndex2 === index}" 
      v-for="(item,index) in cateList2" 
      :key="index"
      @click="changeCate2(item,index)"
      >{{item}}</div>
    </div>
    <!-- 活动列表 -->
    <div class="actList">
      <div class="actiItem" v-for="(item,index) in 2" :key="index">
        <div class="left">
          <img src="../../../assets/123.jpg" alt="">
        </div>
        <div class="right">
          <p class="p1"></p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'MyActivities',
  data() {
    return {
      cateList1: ['我参加的','我组织的'],
      currIndex: 0,
      cateList2: ['全部','已预约','进行中','已完成','未能参加'],
      currIndex2: 0,
    }
  },
  methods:{
    changeCate(item,index) {
      this.currIndex = index
    },
    changeCate2(item,index) {
      this.currIndex2 = index
    },
  }
}  
</script>

<style lang="scss" scoped>
  .myActivities{
    width: 100%;
    min-height: 100vh;
    background: #f7f8fa;
    .topCate1{
      width: 100%;
      height: 96px;
      background: #fff;
      border-bottom: 1px solid #dfe0e2;
      .wrap{
        width: 50%;
        height: 96px;
        float: left;
        line-height: 96px;
        text-align: center;
        font-size: 28px;
        color: #454545;
        position: relative;
      }
      .wrap:nth-of-type(1)::after{
        display: block;
        content: '';
        width: 4px;
        height: 60px;
        border-right: 1px solid #e1e1e1;
        position: absolute;
        right: 0;
        top: 19px;
      }
      .currStyle{
        color: #f8c633;
        border-bottom: 4px solid #f8c633;
      }
    }
    .cate2{
      width: 100%;
      height: 70px;
      line-height: 70px;
      // background: #f7f8fa;
      .cateItem{
        height: 70px;
        line-height: 70px;
        text-align: center;
        padding: 0 39px;
        float: left;
        color: #9fa0a2;
        font-size: 24px;
      }
      .currStyle2{
        color: #1f1b10;
        background: #fdeab0;
      }
    }
    .actList{
      width: 100%;
      height: auto;
      background: #fff;
      padding-left: 40px;
      .actiItem{
        width: 100%;
        height: 218px;
        border-top: 1px solid #e2e2e2;
        .left{
          width: 165px;
          height: 218px;
          float: left;
          img{
            width: 142px;
            height: 142px;
            float: left;
            margin-top: 40px;
          }
        }
        .right{
          width: 514px;
          height: 218px;
          float: left;
        }
      }
      .actiItem:nth-of-type(1){
        border-top: none;
      }
    }
  }
</style>

