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
        <el-carousel-item v-for="(item,index) in groupList" :key="index">
          <h3 class="small">
            <img ref="codeImg" id="img" :src="item.path" alt="">
          </h3>
        </el-carousel-item>
    </el-carousel>
    </div>
    <div class="info">
      <p>
        <span class="img"><img :src="groupInfo.logo" alt=""></span>
        <span class="name">{{groupInfo.name}}</span>
      </p>
    </div>
    <div class="saveBtn"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Popularize',
  data() {
    return {
      imgUrl: require("../../assets/code.png"),
      downloadImg: '',
      groupList: '',
      groupIndex: '',
      groupInfo: '',
      _id: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    // this.$http.getPopularize(this.userId).then(resp => {
    //   console.log(resp)
    //   if(resp.status == 200) {
    //     this.groupList = resp.data
    //   }
    // })
  },
  mounted () {
    this._id = this.userId
    if(this._id == null) {
      this._id = this.$route.params._userId
    }
    this.$http.getPopularize(this._id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.groupList = resp.data
      }
    })
  },
  methods: {
    changeGroup(v) {
      // console.log(v)
      this.groupIndex = v
      this.groupInfo = this.groupList[this.groupIndex]
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
      width: 100%;
      height: 80px;
      margin: 0 auto;
      margin-top: 130px;
      padding-left: 7%;
      p{
        width: 100%;
        font-size: 0;
        text-align: center;
        padding-right: 10%;
        color: #fff;
        .img{
          width: 80px;
          height: 80px;
          display: inline-block;
          margin-right: 15px;
          img{
            width: 80px;
            height: 80px;
            float: left;
            border-radius: 50%;
          }
        }
        .name{
          font-size: 30px;
          line-height: 80px;
          vertical-align: top;
        }
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