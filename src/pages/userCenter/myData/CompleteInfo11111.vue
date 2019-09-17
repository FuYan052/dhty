<template>
  <div class="completeInfo" v-title data-title="基本信息">
    <div class="touxiang">
      <span class="text">头像</span>
      <span class="el-icon-arrow-right"></span>
      <el-upload
        class="avatar-uploader"
        action="none"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        ref="upload"
        :http-request="uploadSectionFile">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <ul>
      <li></li>
      <li @click="showInputName">
        <span class="text">昵称</span>
        <el-input v-model="inputNickName" @blur="blurInputName" v-show="isShowInputName"></el-input>
        <span class="el-icon-arrow-right"></span>
        <span class="value">{{inputNickNameValue}}</span>
      </li>
      <li>
        <span class="text">性别</span>
        <span class="el-icon-arrow-right"></span>
        <span class="value">{{sexValue}}</span>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CompleteInfo',
  data() {
    return {
      imageUrl: '',
      isShowInputName: false,
      inputNickName: '',
      inputNickNameValue: '111',
      sexValue: '',
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      if(isJPG && isLt2M) {
        this.$indicator.open('上传中...');
      }
      return isJPG && isLt2M;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadSectionFile(file) {
      this.formData = new FormData()
      this.formData.append('file', file.file);
      // console.log(file)
      this.$http.postUpolad(this.formData).then((resp) => {
        // console.log(resp);
        // console.log('上传成功');
        if (resp.status == 200) {
          this.imageUrl = resp.data[0]; // 请求成功之后赋给头像的URL
          this.$indicator.close();
          this.$toast({
            message: '头像上传成功！',
            duration: 2000
          });
        } else {
          this.$toast({
            message: '头像上传失败！',
            duration: 2000
          });
        }
      });
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      console.log(imageUrl)
    },
    // 昵称
    showInputName() {
      this.isShowInputName = true
      this.inputNickName = this.inputNickNameValue
      this.inputNickNameValue = ''
    },
    blurInputName() {
      this.isShowInputName = false
      this.inputNickNameValue = this.inputNickName
    }
  }
}
</script>

<style lang="scss" scoped>
  .completeInfo{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding: 0 47px;
    padding-top: 37px;
    .touxiang{
      width: 100%;
      height: 140px;
      background: #fff;
      padding: 0 33px;
      line-height: 140px;
      font-size: 24px;
      color: #6d6d6d;
      border-bottom: 1px solid #dddddd;
      box-shadow: 0 2px 3px #dddddd;
      .el-icon-arrow-right{
        width: 20px;
        height: 140px;
        line-height: 140px;
        font-size: 30px;
        display: block;
        float: right;
      }
      .avatar-uploader{
        width: 94px;
        height: 94px;
        float: right;
        margin-top: 20px;
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    ul{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 96px;
        padding: 0 33px;
        background: #fff;
        border-top: 2px solid #f2f2f2;
        box-shadow: 0 -1px 2px #f2f2f2;
        border-radius: 5px;
        .text{
          line-height: 96px;
          font-size: 24px;
          color: #6d6d6d;
          display: block;
          float: left;
        }
        .el-icon-arrow-right{
          width: 20px;
          height: 96px;
          line-height: 98px;
          font-size: 30px;
          display: block;
          float: right;
        }
        .value{
          display: block;
          float: right;
          line-height: 96px;
          font-size: 25px;
          color: #7b7b7b;
          margin-right: 15px;
        }
      }
    }
  }
</style>
<style>
  .avatar-uploader .el-upload{
    width: 94px;
    height: 94px;
    font-size: 0;
    border-radius: 50%;
  }
  .avatar-uploader .el-upload .avatar-uploader-icon{
    width: 94px;
    height: 94px;
    font-size: 32px;
    text-align: center;
    vertical-align: middle;
  }
  .completeInfo .avatar{
    width: 94px;
    height: 94px;
    display: block;
    border-radius: 50%;
  }
  li .el-input{
    width: 300px;
    float: left;
    font-size: 25px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    margin-top: 23px;
    border: none;
    outline: none;
  }
  li .el-input .el-input__inner{
    width: 300px;
    float: left;
    font-size: 25px;
    height: 50px;
    line-height: 50px;
    border: none;
    outline: none;
  }
</style>