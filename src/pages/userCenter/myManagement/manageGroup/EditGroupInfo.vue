<template>
  <!-- 修改群资料 -->
  <div class="editGroupInfo" v-title data-title="修改群资料">
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
        <el-form-item label="社群名称" prop="introd">
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditGroupInfo',
  data() {
    return {
      ruleForm: {
        name: '',
        introd: ''
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
  .editGroupInfo{
    width: 100%;
    min-height: 100vh;
    background: #f1f1f1;
    overflow: hidden;
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
  }
</style>
<style>
  .editGroupInfo .el-form-item__error{
    left: 15px;
  }
  .editGroupInfo .groupName .el-form-item__label{
    font-size: 26px;
    margin-top: 28px;
    color: #3b3b3b;
  }
  .editGroupInfo .groupName .el-input{
    width: 74%;
  }
  .editGroupInfo .groupName .el-input__inner{
    height: 50px;
    margin-top: 25px;
    font-size: 26px;
    border: none;
  }
  .editGroupInfo .groupName .el-form-item__error{
    top: 86%;
  }
  .editGroupInfo .introduction .el-form-item__label{
    font-size: 26px;
    color: #3b3b3b;
    padding-bottom: 30px;
  }
  .editGroupInfo .introduction .el-textarea__inner{
    font-size: 26px;
    min-height: 140px !important;
    margin-left: 15px;
    border: 1px solid #f0f0f0;
  }
  .editGroupInfo .avatar-uploader{
    display: block;
    width: 100px;
    height: 100px;
    margin-top: 60px;
    margin-left: 10px;
  }
  .editGroupInfo .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .editGroupInfo .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .editGroupInfo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .editGroupInfo .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
