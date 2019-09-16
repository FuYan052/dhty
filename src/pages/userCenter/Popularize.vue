<template>
  <!-- 推广加群 -->
  <div class="popularize" v-title data-title="扫码进群">
    <div class="bgBox">
      <div class="info">
          <img :src="groupInfo.logo" alt="">
          <span class="name">{{groupInfo.name}}</span>
      </div>
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
      <p>长按二维码保存为图片</p>
    </div>
    <!-- <div class="saveBtn"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Popularize',
  data() {
    return {
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
    background: url("../../assets/tuiguang.jpg") no-repeat center;
    background-size: cover;
    overflow: hidden;
    position: relative;
    .bgBox{
      width: 561px;
      height: 742px;
      // border: 1px solid red;
      margin: 0 auto;
      margin-top: 265px;
      padding: 0 78px;
      // border: 1px solid red;
      background: rgba(0,0,0,0.6);
      border-radius: 10px;
      overflow: hidden;
      .info{
        width: 100%;
        height: 100px;
        margin-top: 47px;
        img{
          width: 98px;
          height: 98px;
          float: left;
          border-radius: 50%;
        }
        .name{
          display: inline-block;
          width: 272px;
          margin-left: 20px;
          font-size: 30px;
          line-height: 100px;
          color: #fff;
          font-size: 33px;
        }
      }
      .imgBox{
        width: 400px;
        height: 400px;
        // border: 1px solid red;
        // padding: 0 20px;
        background: #fff;
        // margin: 0 auto;
        margin-top: 60px;
        overflow: hidden;
        img{
          width: 400px;
          height: 400px;
        }
      }
      p{
        font-size: 32px;
        line-height: 32px;
        color: #fff;
        padding-left: 13px;
        text-align: center;
        margin-top: 45px;
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
    /* margin-top: 20px; */
    height: 400px !important;
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
    width: 23px;
    height: 23px;
    border-radius: 50%;
    background-color: rgba(0,0,0);
    /* background-color: #000; */
  }
  .el-carousel__indicators{
    width: 100%;
    height: 60px;
    position: absolute; 
    top: 1060px;
    left: 0;
    bottom: 0;
  }
  .el-carousel__indicator{
    margin: 0 25px;
  }
  .el-carousel__indicator.is-active button{
    opacity: 0.6;
  }
  .el-carousel__indicators--outside button{
    background: #000;
    opacity: 0.4;
  }
  .el-carousel__indicators--outside .el-carousel__indicator:hover button{
    opacity: 0.7;
  }
</style>