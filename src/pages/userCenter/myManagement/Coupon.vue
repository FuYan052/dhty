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
    <!-- 优惠券列表 -->
    <ul class="listBox">
      <li v-for="(item,index) in 3" :key="index">

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
    }
  },
  methods: {
    // 切换分类
    changeCate(index) {
      this.currCateIndex = index
      if(index === 0) {  //未使用

      }
      if(index === 1) {  //已使用

      }
      if(index === 2) {  //已过期

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cate{
      width: 100%;
      height: 90px;
      background: #fff;
      li{
        width: 33.3%;
        height: 90px;
        line-height: 90px;
        font-size: 30px;
        float: left;
        text-align: center;

      }
      li:nth-of-type(2) {
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
      }
      .actCate{
        background: rgb(221, 221, 221);
      }
    }
    .listBox{
      width: 100%;
      height: auto;
      li{
        width: 86%;
        height: 200px;
        background: #fff;
        margin: 20px auto;
        border-radius: 15px;
      }
    }
  }
</style>