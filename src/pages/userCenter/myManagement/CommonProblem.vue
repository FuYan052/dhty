<template>
  <!-- 常见问题 -->
  <div class="commonProblem" v-title data-title="常见问题">
    <div class="problemItem" v-for="(item,index) in problemList" :key="index">
      <div class="title" @click="showText(item,index)">
        {{item}}
        <span class="el-icon-arrow-down"></span>
      </div>
      <div class="detail" v-show="index === i">
        物流服务 无忧物流 菜鸟网络与速卖通联合推出的官方物流,提供揽收、配送、物流追踪、物流纠纷处理、赔付一站式物流解决方案 线上发货 发货不操心,物流有保障!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonProblem',
  data() {
    return {
      problemList: [
        '1.如何查询订单？',
        '2.如何查询场地？',
        '3.如何加入社群？',
        '4.如何查询商品的物流信息？',
      ],
      isShowDetail: false,
      i: -1,
    }
  },
  methods:{
    showText(item,index) {
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
  .commonProblem{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .problemItem{
      width: 100%;
      height: auto;
      .title{
        width: 100%;
        height: 94px;
        font-size: 28px;
        line-height: 94px;
        color: #535151;
        padding: 0 30px;
        border-top: 1px solid #f1f0f0;
        border-bottom: 1px solid #f1f0f0;
        background: #fff;
        span{
          color: #cbcbcb;
          line-height: 94px;
          float: right;
          color: #a09c9c;
        }
      }
      .detail{
        width: 100%;
        height: auto;
        // height: 200px;
        font-size: 26px;
        line-height: 40px;
        padding: 20px 35px;
        padding-bottom: 30px;
      }
    }
  }
</style>
