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
      <li @click="showInput">
        昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称
        <span class="right">{{value1}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="showSexPicker">
        性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
        <span class="right">{{sexValue}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="showHeightPicker">
        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高
        <span class="right">{{heightValue}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="showBirthdayPicker">
        生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
        <span class="right">{{birthdayValue}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="showprofessionPicker">
        职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业
        <span class="right">{{professionValue}}<i class="el-icon-arrow-right"></i></span>
      </li>
      <li @click="showLocation">
        所在地区
        <span class="right">{{addressValue}}<i class="el-icon-arrow-right"></i></span>
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
      <!-- 自定义选择 -->
      <mt-picker 
        v-show="commonPicker"
        :slots="currSlots" 
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="currChange"
        >
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure" @click="currSure">确定</div>
        </div>
      </mt-picker>
      <!-- 日期选择 -->
      <mt-datetime-picker
        v-show="!commonPicker"
        ref="picker"
        type="date"
        :startDate='birthdayStartDate'
        :endDate ='birthdayEndDate'
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        v-model="birthday">
      </mt-datetime-picker>

    </mt-popup>

  </div>
</template>

<script>
// 省份城市数据
import {city, privinceList, cityList} from '../../../../static/js/region'
export default {
  name: 'CompleteInfo',
  data() {
    return {
      imageUrl: '',
      commonPicker: true,
      value1: '',  //昵称
      currSlots: this.slots1,
      currChange: this.changeSex,
      currSure: this.sureSex,
      sex: '男',
      sexValue: '',  //确定后的性别选择
      height: '160',
      heightValue: '',  //  确定后的身高选择
      birthdayStartDate: new Date('1930/1/1'),  //生日最小可选择
      birthdayEndDate: new Date(),  //生日最大可选择
      birthday: new Date('2000,6,15'),  //默认
      birthdayValue: '',  //确定后的生日选择
      profession: '公职人员',
      professionValue: '',  //确定后职业选择
      myprivinceList: [],    //省的数组
      mycityList: [],        //省对应城市的数组
      mydistrictList:[],     //区或者县的数组
      areapicker:'',
      myAddressPrivince:'',  //最后选中的省或直辖市
      myAddressCity:'',      //最后选中的城市
      myAddressDistrict:'',   //最后选中的区或者县
      addressValue: '',
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
      professionSlots: [
        {
          flex: 1,
          values: ['公职人员', '专职技术人员','办事人员', '商业、服务人员','农林牧渔水利生产人员',
                   '生产运输人员','军人', '自由职业','创业','学生'],
          className: 'slotP',
          textAlign: 'center'
        }
      ],
      addressSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values:privinceList, //省份数组
          className: '_slot1',
          textAlign: 'center'
        },
        {
          pider: true,
          content: '-',
          className: '_slot2'

        }, {
          flex: 1,
          defaultIndex: 0,
          values: cityList,  //城市数据
          className: '_slot3',
          textAlign: 'center'
        },
      ],
      showToolbar: true,
      popupVisible: false,
      labelList: []
    }
  },
  created() {
    this.labelList =JSON.parse(window.sessionStorage.getItem('labels')) 
  },
  watch: {
    myAddressPrivince(oldval,newval){  //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2,this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
      // console.log('选中的省是'+this.myAddressPrivince);
    },
    myAddressCity(oldval,newval){    //城市的值改变后，重置区县的数据
      this.areapicker.setSlotValues(4,this.mydistrictList);
      this.areapicker.setSlotValue(4,this.mydistrictList[0]);
      // console.log('选中的市是'+this.myAddressCity);
    },
    myAddressDistrict(oldval,newval){
      // console.log('选中的区是'+this.myAddressDistrict);
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
      this.$indicator.close();
    },
    // 昵称输入
    showInput() {
      this.$messagebox.prompt('请填写昵称').then(({ value, action }) => {
        // console.log(value)
        this.value1 = value
      })
    },
    // 性别选择
    showSexPicker() {
      this.popupVisible = true
      this.commonPicker = true
      this.currSlots = this.slots1
      this.currChange = this.changeSex
      this.currSure = this.sureSex
    },
    changeSex(picker, values) {
      this.sex = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureSex() {
      this.popupVisible = !this.popupVisible
      this.sexValue = this.sex
      if(this.sexValue !== '女') {
        this.sexValue = '男'
      }
    },
    // 显示身高选择
    showHeightPicker() {
      this.popupVisible = true
      this.commonPicker = true
      this.currSlots = this.slots2
      this.currChange = this.changeHeight
      this.currSure = this.sureHeight
    },
    changeHeight(picker, values) {
      this.height = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureHeight() {
      this.popupVisible = !this.popupVisible
      this.heightValue = this.height + 'cm'
      // console.log(this.heightValue)
    },
    // 显示生日选择
    showBirthdayPicker() {
      this.popupVisible = true
      this.commonPicker = false
      // console.log(this.birthdayStartDate)
    },
    // 格式化选择的日期
    formatDate(Time) {
      var date = Time;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '年' + m + '月' + d+ '日';
    },
    handleConfirm(v) {
      this.popupVisible = !this.popupVisible
      this.birthday = this.formatDate(v)
      this.birthdayValue = this.birthday
      // console.log(this.birthdayValue)
    },
    //显示职业选择
    showprofessionPicker() {
      this.popupVisible = true
      this.commonPicker = true
      this.currSlots = this.professionSlots
      this.currChange = this.changeProfession
      this.currSure = this.sureProfession
    },
    changeProfession(picker, values) {
      this.profession = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureProfession() {
      this.popupVisible = !this.popupVisible
      this.professionValue = this.profession
      // console.log(this.professionValue)
    },
    // 显示地区选择
    showLocation() {
      this.popupVisible = true
      this.commonPicker = true
      this.currSlots = this.addressSlots
      this.currChange = this.onAddressChange
      this.currSure = this.sureAddress
    },
    onAddressChange:function(picker, values){
      this.areapicker = picker;
      this.mycityList = [];
      var chooseList = city.filter(function(item){
        return item.name == values[0];
      });
      if(chooseList[0].sub){
        for(var item of chooseList[0].sub){
          this.mycityList.push(item.name);
        }
        //获取非直辖市数据
        if(chooseList[0].sub.length>1){
          var choosedisList=[];
          if(this.mycityList.indexOf(values[2])>-1 && values[2]!= '其他'){
            choosedisList = chooseList[0].sub.filter(function(item){
              return item.name == values[2];
            });
              for(var item of choosedisList[0].sub){
                this.mydistrictList.push(item.name);
              }
          }else{
              this.mydistrictList=[];
          }
        }
        //获取直辖市数据
        else{
          for(var item of chooseList[0].sub[0].sub){
            this.mydistrictList.push(item.name);
          }
        }
      }
      this.myAddressPrivince = values[0];
      this.myAddressCity = values[2];
      this.myAddressDistrict = values[4];
    },
    sureAddress() {
      this.popupVisible = !this.popupVisible
      this.addressValue = this.myAddressPrivince + this.myAddressCity
    },
    // 选择标签
    selectLabel() {
      this.$router.push({
        path: '/userCenter/selectLabels'
      })
    },
    // 提交信息
    submit() {
      // this.$http.completeInfo(params).then(resp => {
      //   console.log(resp)
      // })
    }
  },  
  mounted() {
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.addressSlots[0].defaultIndex = 0
    })
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
      height: 210px;
      background: #fff;
      overflow: hidden;
      padding-top: 15px;
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
  .mint-msgbox-btns{
  height: 70px;
  line-height: 70px;
}
.mint-msgbox-input{
  padding-top: 40px;
  padding-bottom: 10px;
}
.mint-msgbox-message{
  font-size: 22px;
}
.mint-msgbox-confirm{
  color: #fac31e
}
.mint-msgbox-input input{
  height: 70px;
  width: 90%;
  margin-left: 5%;
  font-size: 26px;
}
.mint-msgbox-header{
  padding: 20px 0;
}
.mint-msgbox-title{
  font-size: 24px;
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
  padding: 0 100px;
}
.picker-toolbar-title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
}
.picker-slot{
  font-size: 26px;
}
.usi-btn-cancel,
.usi-btn-sure {
  text-align: center;
  color: #fac31e
}
._slot1 .picker-item{
  padding-left: 80px;
}
._slot3 .picker-item{
  padding-right: 80px;
}
.mint-datetime-action{
  line-height: 70px;
  color: #fac31e;
  font-size: 24px;
}
.mint-datetime-picker .picker-toolbar{
  padding: 0;
}
.mint-indicator-wrapper{
  padding: 20px 40px !important;
}
.mint-indicator-text{
  font-size: 20px;
}
</style>

