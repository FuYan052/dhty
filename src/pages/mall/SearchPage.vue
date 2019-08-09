<template>
  <!-- 商城搜索 -->
  <div class="search" v-title data-title="搜索">
    <div class="searchBox">
      <el-input
        placeholder="李宁"
        prefix-icon="el-icon-search"
        v-model="input">
      </el-input>
      <span class="el-icon-close" @click="clear"></span>
      <span class="text">搜索</span>
    </div>
    <ul class="productList">
      <li v-for="(item,index) in 3" :key="index">
        <img src="../../assets/g-img.png" alt="">
        <div class="right">
          <div class="title">
          李宁官方正品羽毛球拍李宁官方正品羽毛球拍李宁官方正品羽毛球拍李宁官方正品羽毛球拍
          </div>
          <div class="by">包邮</div>
          <div class="price"><span class="span1">￥</span>430<span class="span2">34人付款</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      input: ''
    }
  },
  methods: {
    clear() {
      this.input = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .search{
    width: 100%;
    min-height: 100vh;
    background: #f9f9f9;
    .searchBox{
      width: 100%;
      height: 86px;
      background: #fff;
      padding: 0 37px;
      padding-top: 11px;
      position: relative;
      .el-icon-close{
        font-size: 26px;
        color: #9f9f9f;
        position: absolute;
        top: 34px;
        right: 23%;
      }
      .text{
        font-size: 25px;
        color: #9b9b9b;
        position: absolute;
        top: 22px;
        right: 7%;
      }
    }
    .productList{
      width: 100%;
      height: auto;
      background: #fff;
      padding-left: 25px;
      margin-top: 20px;
      li{
        width: 100%;
        height: 294px;
        img{
          width: 270px;
          height: 270px;
          float: left;
          margin-top: 12px;
          border-radius: 15px;
        }
        .right{
          width: 434px;
          height: 294px;
          border: 1px solid red;
          float: right;
          padding-left: 10px;
          .title{
            width: 376px;
            height: 90px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            padding-top: 10px;
            line-height: 40px;
            font-size: 25px;
            color: #09161e;
          }
          .by{
            width: 48px;
            height: 25px;
            color: #fac72e;
            border: 1px solid #fac72e;
            float: left;
            line-height: 22.5px;
            text-align: center;
            font-size: 15px;
            border-radius: 5px;
            margin-top: 50px;
          }
          .price{
            margin-top: 24px;
            font-size: 26px;
            
          }
        }
      }
    }
  }
</style>
<style>
  .search .searchBox .el-input__inner{
    width: 85%;
    height: 60px !important;
    border-radius: 10px;
    padding-left: 90px;
    font-size: 26px;
    color: #403d3d;
    background: #eaeaea;
    border: none;
    float: left;
  }
  .search .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .search .searchBox .el-input__icon{
    font-size: 35px;
    color: #9e9e9e;
  }
</style>

