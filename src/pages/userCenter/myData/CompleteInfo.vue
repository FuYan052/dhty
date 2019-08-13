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
      <li @click="show1">
        昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称
        <input type="text" ref="input1" @blur="inputBlur" v-show="isShowInput" v-model="input1Value">
        <span class="right">{{value1}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="show2">
        性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
        <span class="right">{{sexValue}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="show3">
        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高
        <span class="right">{{heightValue}}cm<i class="el-icon-arrow-right"></i></span>
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
    <!-- 选择器 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true" 
      position="bottom"
      >
      <mt-picker 
        :slots="currSlots" 
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="currChange"
        >
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure" @click="sure">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: 'CompleteInfo',
  data() {
    return {
      imageUrl: '',
      value1: '', 
      input1Value:'',
      isShowInput: false,
      sex: '男',
      sexValue: '',
      height: '160',
      heightValue: '',
      currSlots: this.slots1,
      currChange: this.change1,
      slots1: [
        {
          flex: 1,
          values: ['男', '女'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ['100', '101','102','103','104', '105','106','107','108', '109','110','111','112'
          , '113','114','115','116', '117','118','119','120', '121','122','123','124', '125','126'
          ,'127', '128','129','130', '131','132','133','134', '135','136','137', '138','139','140'
          ,'150', '151','152','153','154', '155','156','157', '158','159','160', '161','162','163'
          ,'164', '165','166','167', '168','169','170', '171','172','173','174', '175','176','177'
          , '178','179','180', '181','182','183','184', '185','186','187', '188','189','190', '191'
          ,'192','193','194', '195','196','197', '198','199','200'],
          className: 'slot1',
          defaultIndex: 51,
          textAlign: 'center'
        }
      ],
      showToolbar: true,
      popupVisible: false,
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
    show1() {
      this.isShowInput = true
      this.$refs.input1.autofocus = true
      console.log(this.$refs)
      if(this.isShowInput) {
        this.value1 = ''
      }
    },
    inputBlur() {
      this.isShowInput = false
      this.value1 = this.input1Value
    },
    show2() {
      this.popupVisible = true
      this.currSlots = this.slots1
      this.currChange = this.change1
    },
    show3() {
      this.popupVisible = true
      this.currSlots = this.slots2
      this.currChange = this.change2
    },
    change1(picker, values) {
      this.sex = values[0]
      console.log(this.sex)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    change2(picker, values) {
      this.height = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    // onValuesChange(picker, values) {
    //   console.log(values)
    //   this.sex = values[0]
    //   if (values[0] > values[1]) {
    //     picker.setSlotValue(1, values[0]);
    //   }
    // },
    sure() {
      console.log("ok1")
      console.log(this.sex)
      if(this.currChange == this.change1){
        console.log("ok2")
        this.sexValue = this.sex
        console.log(this.sex)
      }
      if(this.currChange == this.change2){
        console.log("ok3")
        this.heightValue = this.height
      }
      this.popupVisible = false
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
        input{
          width: 70%;
          height: 60px;
          line-height: 40px;
          padding-left: 10px;
          font-size: 24px;
          border: none;
          color: #868686;
        }
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
  .mint-popup{
  width: 100%;
  transition: .3s ease-out;
}
.picker{
  width: 100%;
  background: #fff;
}
.picker-toolbar{
  height: 70px;
  padding: 0 60px;
}
.picker-toolbar-title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
}
.picker-slot{
  font-size: 27px;
}
.usi-btn-cancel,
.usi-btn-sure {
  text-align: center;
  color: #fac31e
}
</style>

