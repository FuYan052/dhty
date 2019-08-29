<template>
  <!-- 创建新社群页面 -->
  <div class="createGroup" v-title data-title="创建社群">
    <!-- 社群名称 -->
    <div class="groupName">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="社群名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 社群简介 -->
    <div class="introduction">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="社群简介" prop="introd">
          <!-- <el-input v-model="ruleForm.introd"></el-input> -->
          <el-input
            type="textarea"
            autosize
            v-model="ruleForm.introd">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 社群LOGO -->
    <div class="groupLogo">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="社群LOGO" prop="introd">
          <el-upload
            class="avatar-uploader"
            action="none"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
            :http-request="uploadSectionFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <!-- 确认按钮 -->
    <div class="submitBtn" @click="create">完成创建</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CreateGroup',
  data() {
    return {
      ruleForm: {
        name: '',
        introd: '',
      },
      imageUrl: '',
      rules: {
          name: [
            { required: true, message: '请输入社群名字!', trigger: 'blur' },
          ],
          introd: [
            { required: true, message: '请输入社群简介！', trigger: 'blur' }
          ],
        }
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  methods: {
    // 上传图片
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
      // console.log("1111")
      // console.log(file)
      this.$http.postUpolad(this.formData).then((resp) => {
        // console.log(resp);
        // console.log('上传成功');
        if (resp.status == 200) {
          this.imageUrl = resp.data[0]; // 请求成功之后赋给头像的URL
          window.sessionStorage.setItem('imgUrl',this.imageUrl)
          this.$indicator.close();
          this.$toast('头像上传成功');
        } else {
          this.$toast('头像上传失败');
        }
      });
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      // console.log(imageUrl)
    },
    // 创建
    create() {
      const params = {
        id: '',
        userId: this.userId,
        name: this.ruleForm.name,
        content: this.ruleForm.introd,
        logo: this.imageUrl
      }
      this.$http.createGroup(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.$toast('创建成功！')
          this.$router.push({
            path: '/userCenter/createdGroupList'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .createGroup{
    width: 100%;
    min-height: 100vh;
    background: #f1f1f1;
    .groupName{
      width: 100%;
      height: 98px;
      background: #fff;
      margin-top: 20px;
      padding-left: 30px;
    }
    .introduction{
      width: 100%;
      min-height: 240px;
      background: #fff;
      margin-top: 40px;
      padding-left: 30px;
      padding-top: 35px;
      padding-bottom: 35px;
      padding-right: 50px;
    }
    .groupLogo{
      width: 100%;
      height: 238px;
      background: #fff;
      margin-top: 40px;
      padding-top: 35px;
      padding-left: 30px;
    }
    .submitBtn{
      width: 94.66%;
      height: 76px;
      line-height: 76px;
      margin: 55px auto;
      background: #ff8d30;
      text-align: center;
      border-radius: 10px;
      color: #fff8f5;
      letter-spacing: 1px;
    }
  }
</style>
<style>
  .createGroup .el-form-item__error{
    left: 15px;
  }
  .createGroup .groupName .el-form-item__label{
    font-size: 26px;
    margin-top: 25px;
    color: #3b3b3b;
  }
  .createGroup .groupName .el-input{
    width: 74%;
  }
  .createGroup .groupName .el-input__inner{
    height: 50px;
    margin-top: 25px;
    font-size: 26px;
    border: none;
  }
  .createGroup .groupName .el-form-item__error{
    top: 86%;
  }
  .createGroup .introduction .el-form-item__label{
    font-size: 26px;
    color: #3b3b3b;
    padding-bottom: 30px;
  }
  .createGroup .introduction .el-textarea__inner{
    font-size: 26px;
    min-height: 140px !important;
    margin-left: 15px;
    border: 1px solid #f0f0f0;
  }
  .createGroup .avatar-uploader{
    display: block;
    width: 100px;
    height: 100px;
    margin-top: 60px;
    margin-left: 10px;
  }
  .createGroup .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .createGroup .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .createGroup .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .createGroup .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
