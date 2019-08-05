<template>
  <!-- 完善个人信息 -->
  <div class="completeInfo" v-title data-title="基本信息">
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
        职业类型
        <span class="right">IT技术<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        婚姻状态
        <span class="right">未婚<i class="el-icon-arrow-right"></i></span>
      </li>
      <li>
        兴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;趣
        <span class="right">羽毛球<i class="el-icon-arrow-right"></i></span>
      </li>
    </ul>
    <div class="touxiang">
      <p>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
      </el-upload>
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
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="scss" scoped>
  .completeInfo{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
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
          color: #a8a8a8;
          i{
            font-weight: bold;
            padding-left: 15px;
          }
        }
      }
    }
    .touxiang{
      width: 100%;
      height: 202px;
      background: #fff;
      margin-top: 38px;
      p{
        line-height: 60px;
        color: #a9a9a9;
        padding-left: 30px;
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
    width: 75px;
    height: 75px;
    margin-top: 20px;
    margin-left: 30px;
  }
  .completeInfo .avatar-uploader .el-upload {
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
    width: 75px;
    height: 75px;
    line-height: 75px;
    text-align: center;
  }
  .completeInfo .avatar {
    width: 75px;
    height: 75px;
    display: block;
  }
</style>

