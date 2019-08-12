<template>
  <!-- 完善个人信息 -->
  <div class="completeInfo" v-title data-title="基本信息">
    <div class="touxiang">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
      </el-upload>
      <p>点击添加头像</p>
    </div>
    <ul>
      <li>
        昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称
        <span class="right">忌口先生<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
        <span class="right">男<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高
        <span class="right">176cm<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
        <span class="right">1990-01-08<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业
        <span class="right">IT技术<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        所在地区
        <span class="right">成都<i class="el-icon-arrow-right"></i></span>
      </li>
    </ul>
    <div class="label">
      <p>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签</p>
      <div class="itemBox">
        <div class="addBtn" @click="selectLabel"><span class="el-icon-plus"></span></div>
        <div class="itemLabel" v-for="(item,index) in labelList" :key="index">
          {{item}}
        </div>
      </div>
    </div>
    <div class="submit">提交</div>
  </div>
</template>

<script>
export default {
  name: 'CompleteInfo',
  data() {
    return {
      imageUrl: '',
      labelList: []
    }
  },
  created() {
    this.labelList =JSON.parse(window.sessionStorage.getItem('labels')) 
    
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    selectLabel() {
      this.$router.push({
        path: '/userCenter/selectLabels'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .completeInfo{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .touxiang{
      width: 100%;
      height: 185px;
      background: #fff;
      overflow: hidden;
      p{
        font-size: 24px;
        line-height: 60px;
        color: #a9a9a9;
        text-align: center;
      }
    }
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      padding-left: 20px;
      li{
        width: 100%;
        height: 94px;
        line-height: 94px;
        color: #a9a9a9;
        padding: 0 10px;
        border-top: 2px solid #f6f6f6;
        span{
          line-height: 94px;
          float: right;
          color: #545454;
          i{
            font-weight: bold;
            padding-left: 15px;
            color: #cbcbcb;
          }
        }
      }
    }
    .label{
      width: 100%;
      min-height: 200px;
      margin-top: 40px;
      background: #fff;
      p{
        width: 100%;
        height: 94px;
        line-height: 94px;
        color: #a9a9a9;
        border-top: 2px solid #f6f6f6;
        padding-left: 30px;
      }
      .itemBox{
        width: 100%;
        height: auto;
        padding-left: 40px;
        .addBtn{
          width: 100px;
          height: 46px;
          line-height: 42px;
          text-align: center;
          font-size: 26px;
          color: #aaaaaa;
          border: 1px solid #aaaaaa;
          border-radius: 25px;
          font-weight: bold;
          display: inline-block;
          margin-right: 18px;
          margin-bottom: 30px;
        }
        .itemLabel{
          display: inline-block;
          height: 46px;
          line-height: 42px;
          border: 1px solid #f9c31b;
          color: #f9c21f;
          background: #fcebb8;
          border-radius: 25px;
          text-align: center;
          font-size: 22px;
          padding: 0 40px;
          margin-right: 18px;
          margin-bottom: 30px;
        }
      }
    }
    .submit{
      width: 710px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      text-align: center;
      background: #fac31e;
      margin: 0 auto;
      margin-top: 210px;
      border-radius: 10px;
      letter-spacing: 1px;
    }
  }
</style>
<style>
   .completeInfo .avatar-uploader{
    display: block;
    width: 94px;
    height: 94px;
    position: relative;
    margin: 0 auto;
    margin-top: 25px;
  }
  .completeInfo .avatar-uploader .el-upload {
    width: 94px;
    height: 94px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .completeInfo .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .completeInfo .avatar-uploader-icon {
    font-size: 32px;
    color: #9d9b9e;
    width: 94px;
    height: 94px;
    line-height: 94px;
    text-align: center;
  }
  .completeInfo .avatar {
    width: 94px;
    height: 94px;
    display: block;
  }
</style>

