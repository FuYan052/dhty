<template>
  <div>
    <!-- 完善个人信息 -->
    <div v-show="isInfoPage" class="completeInfo" v-title data-title="基本信息">
      <div class="touxiang">
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
          <div class="itemLabel" v-for="(item,index) in showlabelList" :key="index">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="submit" @click="submit">提交</div>
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

    <!-- 显示选择标签 -->
    <div v-show="!isInfoPage" class="selectLabels" v-title data-title="基本信息">
    <ul>
      <li v-for="(item,index) in resultList2" :key="index">
        <span 
          v-for="(it,ind) in item" 
          :key="ind" @click="selected(it,ind)"
          :class="{selected:selectedListIds.indexOf(it.id)>=0}"
        >{{it.name}}</span>
      </li>
    </ul>
    <div class="btnBox">
      <div class="btn createNew" @click="showAddBox">创建新标签</div>
      <div class="btn save" @click="saveSelectLabels">保存</div>
    </div>
    <div class="addLabel" v-show="isShow">
      <input type="text" v-model="addValue" ref="input" placeholder="请输入标签">
      <span @click="toAdd">添加</span>
    </div>
  </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
// 省份城市数据
import {city, privinceList, cityList} from '../../../../static/js/region'
export default {
  name: 'CompleteInfo',
  data() {
    return {
      isInfoPage: true,  //控制显示基本信息还是标签
      imageUrl: '',
      formData: '',
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
      showlabelList: [],
      labelsId: [],
      infoId: '',  //个人信息id,传给后端做标识


      labelList: [],  //请求回来的一维数组
      resultList1: [], 
      resultList2: [], //变成二维数组渲染,用于渲染
      selectedList: [],
      selectedListIds: [],
      isShow: false,
      addValue: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    this.getInfo()
    this.getAllList()
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
    getInfo() {
      this.showlabelList = []
      this.selectedListIds = []
      // 获取信息
      this.$http.findPersonalInformation(this.userId).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.infoId = resp.data.id
          this.imageUrl = resp.data.image
          this.value1 = resp.data.name
          this.sexValue = resp.data.sex
          if(resp.data.height !== null) {
            this.heightValue = resp.data.height + 'cm'
          }else{
            this.heightValue = resp.data.height
          }
          this.birthdayValue = resp.data.birthday
          this.professionValue = resp.data.occupation
          this.addressValue = resp.data.region
          this.showlabelList = resp.data.labelVoList

          this.selectedList = resp.data.labelVoList
          var _Ids = resp.data.labelVoList
          for(let i=0; i<_Ids.length; i++) {
            let currLab = _Ids[i]
            this.selectedListIds.push(currLab.id)
          }
          // this.labelsId = this.selectedListIds
          this.labelsId = this.selectedListIds.join(',')
        }
      })
    },
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
      return y + '-' + m + '-' + d;
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
      this.isInfoPage = false
    },
    // 提交信息
    submit() {
      const params = {
        id: this.infoId,
        userId: this.userId,
        image: this.imageUrl,
        name: this.value1,
        sex: this.sexValue,
        height: this.height,
        birthday: this.birthdayValue,
        occupation: this.professionValue,
        region: this.addressValue,
        labelId: this.labelsId
      }
      console.log(params)
      this.$http.completeInfo(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.$toast({
            message: '保存成功！',
            duration: 2000
          });
          this.getInfo()
          const _this = this
          setTimeout(function() {
            _this.$router.push({
              path: '/userCenter/manageHome'
            })
          },2000)
        }
      })
    },


    //选择标签界面相关方法

    // 获取所有标签
    getAllList() {
      // this.labelList = []
      this.resultList1 = []
      this.resultList2 = []
      this.$http.findAllLabel(this.userId).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.labelList = resp.data
          this.sliceArr1()
          this.sliceArr2()
        }
      })
    },
    sliceArr1() {
      let n = 7
      let len = this.labelList.length
      let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      let result = []
      for (let i = 0; i < lineNum; i++) {
        let newList = this.labelList.slice(i*n ,i*n+n)
        result.push(newList)
        this.resultList1 = result
      }
    },
    sliceArr2 () {
      for(let i = 0; i < this.resultList1.length; i++) {
        let n = 4
        let len = this.resultList1[i].length
        let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
        let result2 = []
        for (let j = 0; j < lineNum; j++) {
          let newList = this.resultList1[i].slice(j*n ,j*n+n)
          result2.push(newList)
        }
        this.resultList2.push(result2)
      }
      this.resultList2 = this.resultList2.reduce(function (a, b) { return a.concat(b)} )
      // console.log(this.resultList2)
    },
    //选择标签
    selected(it,ind) {
      // 选中的标签集合
      let selectedIndex = this.selectedList.indexOf(it)
      if(selectedIndex >= 0) {
        this.selectedList.splice(selectedIndex, 1)
      }else{
        this.selectedList.push(it)
      }

      // 选中的标签id集合
      let selectedIdIndex = this.selectedListIds.indexOf(it.id)
      if(selectedIdIndex >= 0) {
        this.selectedListIds.splice(selectedIdIndex, 1)
      }else{
        this.selectedListIds.push(it.id)
      }
      console.log(this.selectedListIds)
      
    },
    //创建新标签
    showAddBox() {
      this.isShow = true
      this.$refs.input.focus()
    },
    toAdd() {
      // 创建并提交后台
      const params = {
        labelName: this.addValue,
        userId: this.userId
      }
      this.$http.createLabel(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
          this.isShow = false
          this.$toast({
            message: '创建成功！',
            duration: 2000
          });
        }
        if(!this.isShow) {  //创建标签成功之后获取新的标签列表
          this.getAllList()
        }
      })
      // this.selectedList = []
    },
    //保存选择的标签
    saveSelectLabels() {
      this.isInfoPage = true
      this.showlabelList = []
      for(let i=0; i<this.selectedList.length; i++){
        let currLabel = this.selectedList[i]
        for(let j=0; j<this.selectedListIds.length; j++) {
          if(currLabel.id === this.selectedListIds[j]) {
            this.showlabelList.push(currLabel)
          }
        }
      }
      this.labelsId = this.selectedListIds.join(',')  //用逗号隔开连成字符串传给后端
      // this.labelsId = this.selectedListIds  //用逗号隔开连成字符串传给后端
      // this.showlabelList = this.selectedList
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
        font-size: 0;
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
          vertical-align: top;
        }
        .itemLabel{
          display: inline-block;
          width: 120px;
          height: 46px;
          line-height: 42px;
          border: 1px solid #f9c31b;
          color: #f9c21f;
          background: #fcebb8;
          border-radius: 25px;
          text-align: center;
          font-size: 22px;
          // padding: 0 40px;
          margin-right: 18px;
          margin-bottom: 30px;
          vertical-align: top;
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
      margin-top: 100px;
      border-radius: 10px;
      letter-spacing: 1px;
    }
  }
  .selectLabels{
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    ul{
      width: 100%;
      height: auto;
      padding-left: 38px;
      margin-top: 40px;
      li{
        width: 100%;
        height: 80px;
        span{
          display: inline-block;
          width: 160px;
          height: 48px;
          line-height: 46px;
          text-align: center;
          font-size: 21px;
          border-radius: 20px;
          color: #272727;
          border: 1px solid #313131;
          margin-right: 12px;
        }
        .selected{
          background: #fffaec;
          border: 1px solid #fac41c;
          color: #f9c31b;
        }
      }
      li:nth-child(even){
        padding-left: 60px;
        span{
          margin-right: 37px;
        }
      }
    }
    .btnBox{
      width: 100%;
      height: 170px;
      padding-left: 38px;
      .btn{
        width: 325px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 25px;
        border-radius: 10px;
        float: left;
        margin-top: 50px;
      }
      .createNew{
        color: #272727;
        border: 1px solid #313131;
      }
      .save{
        color: #fff;
        background: #fac31e;
        margin-left: 25px;
      }
    }
    .addLabel{
      width: 100%;
      height: 100px;
      background: #fff;
      padding: 0 38px;
      position: fixed;
      bottom: 0;
      z-index: 9;
      position: relative;
      input{
        width: 100%;
        height: 70px;
        border: 1px solid #313131;
        border-radius: 40px;
        padding-left: 25px;
        font-size: 21px;
      }
      span{
        width: 90px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        color: #fff;
        background: #fac31e;
        display: block;
        font-size: 25px;
        border-radius: 25px;
        position: absolute;
        top: 7px;
        right: 50px;
      }
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

