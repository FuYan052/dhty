<template>
  <!-- 修改群资料 -->
  <div class="editGroupInfo" v-title data-title="修改群资料">
    <!-- 社群名称 -->
    <div class="groupname" id="groupname">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="社群名称" prop="introd">
          <!-- <el-input v-model="ruleForm.name"></el-input> -->
          <el-input
            type="textarea"
            autosize
            v-model="ruleForm.name">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 社群简介 -->
    <div class="introduction">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
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
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="社群LOGO" prop="introd">
          <el-upload
            class="avatar-uploader"
            action="none"
            :multiple='false'
            accept="image/png,image/jpg,image/jpeg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
            :http-request="uploadSectionFile">
            <div class="avatar" v-if="imageUrl">
              <img :src="imageUrl" style="width: 100%; height: 100%;">
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <div @click="save">保存</div>
      <div @click="transferGroup">转让群</div>
      <div @click="disbandment">解散群</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditGroupInfo',
  data() {
    return {
      groupId: '',
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
  created() {
    // 获取待修改的信息
    this.groupId = window.sessionStorage.getItem('handleGroupId')
    this.$http.updateGroupInfo(this.groupId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.ruleForm.name = resp.data.name
        this.ruleForm.introd = resp.data.content
        this.imageUrl = resp.data.logo
      }
    })
  },
  methods: {
    // 上传图片
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }else if(isLt2M) {
        this.$indicator.open('上传中...');
      }else{
        this.$toast({
          message: '头像上传成功！',
          duration: 2000
        });
      }
      return isLt2M;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadSectionFile(file) {
      this.formData = new FormData()
      this.formData.append('file', file.file);
      // console.log("1111")
      console.log(file)
      this.$http.postUpolad(this.formData).then((resp) => {
        // console.log(resp);
        // console.log('上传成功');
        if (resp.status == 200) {
          this.imageUrl = resp.data[0]; // 请求成功之后赋给头像的URL
          window.sessionStorage.setItem('imgUrl',this.imageUrl)
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
      // console.log(imageUrl)
    },
    // 保存
    save() {
       if(this.ruleForm.name == '') {
        this.$toast({
          message: '请填写社群名称！',
          duration: 2000
        })
      }else if(this.ruleForm.introd == '') {
        this.$toast({
          message: '请填写社群简介！',
          duration: 2000
        })
      }else if(this.imageUrl == '') {
        this.$toast({
          message: '请上传社群头像！',
          duration: 2000
        })
      }else{
        const params = {
          userId: this.userId,
          id: this.groupId,
          name: this.ruleForm.name,
          content: this.ruleForm.introd,
          logo: this.imageUrl
        }
        this.$http.createGroup(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast({
              message: '修改成功！',
              duration: 2000
            });
          }
        })
      }
    },
    // 解散群
    disbandment() {
      const isSure = confirm('确定要解散此群?')
      if(isSure) {
        this.$http.disbandmentGroup(this.groupId).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast({
              message: '解散成功！',
              duration: 2000
            });
            this.$router.push({
              path: '/userCenter/createdGroupList'
            })
          }else{
            this.$toast({
              message: '操作失败！',
              duration: 2000
            });
          }
        })
      }
    },
    // 转让群
    transferGroup() {
      this.$router.push({
        path: '/userCenter/groupManagement/transferGroup'
      })
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
    .introduction{
      width: 100%;
      min-height: 240px;
      background: #fff;
      margin-bottom: 25px;
      padding-left: 30px;
      padding-top: 35px;
      padding-bottom: 35px;
      padding-right: 50px;
    }
    .groupname{
      min-height: 80px;
      width: 100%;
      background: #fff;
      margin-bottom: 25px;
      padding-left: 30px;
      padding-top: 35px;
      padding-bottom: 35px;
      padding-right: 50px;
    }
    .groupLogo{
      width: 100%;
      height: 238px;
      background: #fff;
      // margin-top: 25px;
      padding-top: 35px;
      padding-left: 30px;
    }
    .btnBox{
      width: 100%;
      height: 205px;
      margin-top: 60px;
      div{
        width: 210px;
        height: 75px;
        line-height: 75px;
        text-align: center;
        color: #fff;
        font-size: 30px;
        float: left;
        background: #0bb090;
        margin-left: 30px;
        margin-top: 60px;
        border-radius: 10px;
      }
      div:nth-child(2){
        background: #f3da1d;
      }
      div:nth-child(3){
        background: #ff8d30;
      }
    }
  }
</style>
<style scpoed>
  .editGroupInfo .el-form-item__error{
    left: 15px;
  }
  .editGroupInfo .introduction .el-form-item__label{
    font-size: 28px;
    color: #3b3b3b;
    padding-bottom: 30px;
  }
  .editGroupInfo .introduction .el-textarea__inner{
    font-size: 28px;
    min-height: 140px !important;
    margin-left: 15px;
    border: 1px solid #f0f0f0;
  }
  .editGroupInfo .groupLogo .el-form-item__label{
    font-size: 28px;
    color: #3b3b3b;
    padding-bottom: 30px;
  }
  #groupname .el-form-item__label{
    font-size: 28px;
    color: #3b3b3b;
    padding-bottom: 30px;
  }
  #groupname .el-textarea__inner{
    font-size: 28px;
    min-height: 80px !important;
    margin-left: 15px;
    border: 1px solid #f0f0f0;
  }
  .editGroupInfo .groupLogo .el-textarea__inner{
    font-size: 28px;
    margin-left: 15px;
    /* border: 1px solid #f0f0f0; */
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
  /* .editGroupInfo .avatar img{
    width: 100%;
    height: 100%;
  } */
  .mint-msgbox {
    width: 70%;
  }
  .mint-msgbox-title{
    font-size: 24px;
  }
  .mint-msgbox-message{
    color: rgb(22, 21, 21);
    font-size: 30px;
  }
  .mint-msgbox-content{
    padding: 40px 10px;
  }
  .mint-msgbox-btns{
    height: 85px;
  }
</style>
