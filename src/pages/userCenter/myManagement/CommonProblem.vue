<template>
  <!-- 常见问题 -->
  <div class="commonProblem">
    <ul>
      <li v-for="(item,index) in problemList" :key="index">
        {{item}}
      </li>
    </ul>
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .commonProblem{
    width: 100%;
    min-height: 100vh;
    background: #e4e4e4;
    overflow: hidden;
    ul{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 70px;
        line-height: 70px;
        border-top: 1px solid #cfcfcf;
        border-bottom: 1px solid #cfcfcf;
        margin-top: 20px;
        background: #fff;
        padding-left: 5px;
      }
    }
  }
</style>
