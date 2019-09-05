<template>
  <!-- 推广加群 -->
  <div class="popularize" v-title data-title="扫码进群">
    <div class="imgBox">
      <el-carousel 
        trigger="click" 
        height="150px"
        :autoplay="false"
        indicator-position="outside"
        @change='changeGroup'
        >
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">
            <img ref="codeImg" id="img" :src="imgUrl" alt="">
          </h3>
        </el-carousel-item>
    </el-carousel>
    </div>
    <div class="info">
      <img src="../../assets/touxiang.jpg" alt="">
      <p>飞羽社区</p>
    </div>
    <div class="saveBtn"></div>
  </div>
</template>

<script>
export default {
  name: 'Popularize',
  data() {
    return {
      imgUrl: require("../../assets/code.png"),
      downloadImg: ''
    }
  },
  mounted () {
    // console.log(this.$refs.codeImg)
    // this.downloadImg = this.$refs.codeImg
  },
  methods: {
    changeGroup(v) {
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
  .popularize{
    width: 100%;
    min-height: 100vh;
    background: url("../../assets/saomaBg.jpg") no-repeat center;
    background-size: cover;
    overflow: hidden;
    position: relative;
    .imgBox{
      width: 420px;
      height: 420px;
      padding: 0 20px;
      background: #fff;
      margin: 0 auto;
      margin-top: 340px;
      overflow: hidden;
      img{
        width: 380px;
        height: 380px;
      }
    }
    .info{
      width: 420px;
      height: 80px;
      margin: 0 auto;
      margin-top: 130px;
      padding-left: 8%;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        float: left;
      }
      p{
        font-size: 30px;
        float: left;
        line-height: 80px;
        color: #fff;
        margin-left: 30px;
      }
    }
    .saveBtn{
      width: 520px;
      height: 100px;
      margin: 0 auto;
      margin-top: 60px;
      background: url("../../assets/saveBtn.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
<style>
  .el-carousel--horizontal{
    position: static;
  }
  .el-carousel__item h3 {
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__container{
    margin-top: 20px;
    height: 380px !important;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__arrow{
    display: none;
  }
  .el-carousel__button{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #fff;
  }
  .el-carousel__indicators{
    width: 100%;
    height: 60px;
    position: absolute; 
    top: 800px;
    left: 0;
    bottom: 0;
  }
  .el-carousel__indicator{
    margin: 0 25px;
  }
  .el-carousel__indicators--outside button{
    background: #fff;
    opacity: 0.3;
  }
  .el-carousel__indicators--outside .el-carousel__indicator:hover button{
    opacity: 1;
  }
</style>