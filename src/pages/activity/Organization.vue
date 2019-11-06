<template>
  <div class="organization" v-title data-title="组织活动">
    <div class="maxHeightBox" :class="{upKeyBord : isInput}">
    <ul class="ul1">
      <!-- <li @click="showPicker1">   -->
      <li>
        <span class="title">运动种类</span>
        <input type="text" readonly class="inputValue" placeholder="填写种类" v-model="type.name"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <!-- <li @click="showPicker2">
        <span class="title">所属群组</span>
        <input type="text" readonly class="inputValue" placeholder="填写群组" v-model="groupType.name">
        <span class="el-icon-arrow-right"></span>
      </li> -->
      <li @click="showDate">
        <span class="title">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</span>
        <input type="text" readonly class="inputValue" v-model="sureDateValue" placeholder="填写日期"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li class="timeLi">
        <span class="title">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</span>
        <input type="text" readonly class="timeInput time1" @click="showStartTime" v-model="startTime" placeholder="几点">
        <span class="range">至</span>
        <input readonly type="text" class="timeInput time2" @click="showEndTime" v-model="endTime" placeholder="几点">
      </li>
      <!-- <li @click="showDeadline ">
        <span class="title">报名截止</span>
        <input type="text" readonly class="inputValue" v-model="deadlineValue" placeholder="填写时间"/>
        <span class="el-icon-arrow-right"></span>
      </li> -->
      <li @click="showMap">
        <span class="title">活动地点</span>
        <input type="text" class="inputValue inputPlaceValue" readonly v-model="placeName" placeholder="填写位置"/>
        <span class="el-icon-location-outline"></span>
      </li>
      <li>
        <span class="title">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数</span>
        <input type="text" class="inputValue inputNumber" @blur="blur" v-model="peopleNum" placeholder="填写人数"/>
        <div class="numberInputBox">
          <span class="btn desc" @click="descBtn"><i class="el-icon-minus"></i></span><input type="number" v-model="peopleNum" name="" id=""/><span class="btn add" @click="addBtn"><i class="el-icon-plus"></i></span>
        </div>
      </li>
      <li>
        <span class="title">候补人数</span>
        <input type="text" class="inputValue inputNumber" @blur="blur" v-model="HBpeopleNum" placeholder="填写人数"/>
        <div class="numberInputBox">
          <span class="btn desc" @click="HBdescBtn"><i class="el-icon-minus"></i></span><input type="number" v-model="HBpeopleNum" name="" id=""/><span class="btn add" @click="HBaddBtn"><i class="el-icon-plus"></i></span>
        </div>
      </li>
      <li>
        <!-- <span class="title">费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</span> -->
        <span class="title">费用&nbsp;/&nbsp;人</span>
        <input type="text" class="inputValue" @blur="blur" v-model="cost" placeholder="填写费用，如:60"/>
      </li>
      <li @click="showLevelList = !showLevelList">
        <span class="title">选择水平</span>
        <input type="text" readonly class="inputValue" placeholder="选择水平" v-model="showLevelName"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <!-- <li @click="selectService">
        <span class="title">选择客服</span>
        <input type="text" readonly class="inputValue" placeholder="选择客服" v-model="serviceType.name"/>
        <span class="el-icon-arrow-right"></span>
      </li> -->
    </ul>
    <div class="inputTitleBox">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        @blur="blur"
        v-model="title"
        placeholder="时间+地点"
      />
    </div>
    <!-- <div class="inputTitleBox noteTitle">参与须知</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        @blur="blur"
        v-model="notes"
        placeholder="请填写活动须知"
        />
    </div> -->
    </div>
    <div class="bottomWrap" v-show="!isInput">
      <div class="sureBtn" @click="submit">
        提交
      </div>
      <div class="bottom bottom1">
        <span class="box" :class="{activeBox:isCkecked}" @click="isWeekActivie"><b class="el-icon-check" v-show="isCkecked"></b></span>
        <p class="bottomText">作为周循环活动发布</p>
      </div>
      <div class="bottom bottom2">
        <span class="box" :class="{activeBox:isCkecked2}" @click="iscompActivie"><b class="el-icon-check" v-show="isCkecked2"></b></span>
        <p class="bottomText">作为比赛活动发布</p>
      </div>
    </div>
    <!-- 选择弹框 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true" 
      position="bottom"
      >
      <!-- 选择 -->
      <mt-picker 
        v-show="isShowPicker"
        :slots="currSlots" 
        value-key="name"
        :visibleItemCount='3'
        :itemHeight='50'
        showToolbar
        @change="currChange">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure"  @click="currSure">确定</div>
        </div>
      </mt-picker>
      <!-- 选择日期 -->
      <mt-datetime-picker
        v-show="isShowDatePicker"
        :visibleItemCount='5'
        type="date"
        :startDate="startDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirmDate">
      </mt-datetime-picker>
      <!-- 选择开始时间 -->
      <mt-datetime-picker
        v-show="startTimePicker"
        :visibleItemCount='5'
        ref="picker"
        type="time"
        @confirm="handleConfirmStart">
      </mt-datetime-picker>
      <!-- 选择结束时间 -->
      <mt-datetime-picker
        v-show="endTimePicker"
        :visibleItemCount='5'
        ref="picker"
        type="time"
        @confirm="handleConfirmEnd">
      </mt-datetime-picker>
    </mt-popup>
    <!-- 选择水平时弹框 -->
    <div class="levelBox" v-show="showLevelList">
      <div class="contentBox">
        <p>选择水平<span>(可多选)</span></p>
        <ul class="ul2">
          <li v-for="(item,index) in levelList" :key="index" @click="selectLevel(item)">
            <div class="checkBox"><span class="el-icon-check" v-show="selectedLevelList.indexOf(item.skey)>=0"></span></div>
            <div class="text">{{item.name}}</div>
          </li>
        </ul>
        <div class="btnWrap">
          <div class="cancel" @click="showLevelList = !showLevelList">取消</div>
          <div class="sure" @click="handleSelectLevel">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Organization',
  data() {
    return {
      isShowPicker: false,
      popupVisible: false,
      isShowDatePicker: false,
      startTimePicker: false,
      endTimePicker: false,
      textarea_1: '',
      textarea_2: '',
      currSlots: [], //渲染
      typeValues: [],  //运动类型slots
      type: {
        name: '羽毛球',
        skey: 'sportsKinds_01'
      },  //运动类型选择的值
      serviceList: [],  //客服slots
      serviceType: {
        id: '',
        name: ''
      },
      levelList: [],  //水平
      showLevelList: false,  //显示水平选择
      selectedLevelList: [],  //选中的水平id
      selectedLevelName: [],  //选中的水平名字
      showLevelName: '',  //显示选中的水平名字
      datePickerValue: '',  //日期选择
      startDate: '',  //可选日期当天以后
      // dateValue: '',  //选择日期
      sureDateValue: '',  //渲染日期
      startTime: '',  //活动开始时间
      endTime: '',  //活动结束时间
      startHour: null,  //控制结束时间大于开始时间
      currChange: function(){},
      currSure: function() {},
      peopleNum: '',  //人数
      HBpeopleNum: '',  //候补人数
      deadlineValue: '',  //报名截止时间
      defaultDeadline: '',  //默认显示的报名截止时间
      placeName: '',   //活动地点名称
      placeId: '',  //活动地点id
      cost: null,  //费用
      phone: '',  //联系方式
      title: '',  //标题
      notes: '',   //参与须知
      isCkecked: false,   //是否为周活动
      isCkecked2: false,   //是否为比赛活动
      timers: null,  //定时器
      isInput: false,  //当手机输入键盘弹起时不显示提交按钮
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      /*---------监听函数--------------*/
      handler:function(e){e.preventDefault();}
    }
  },
  computed: {
    // 用户id
    // ...mapState(['userId']),

    slotsType() {
      let slots1 = [
        {
          flex: 1,
          values: this.typeValues,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0,
        }
      ]
      return slots1
    },
    serviceSlots() {
      let slots2 = [
        {
          flex: 1,
          values: this.serviceList,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0,
        }
      ]
      return slots2
    }
  },
  watch: {
    $route(to, from) {
      if(from.path == '/mapSelection') {
        console.log(this.$route)
        this.placeName = this.$route.params.placeName || ''
        this.placeId = this.$route.params.placeId || ''
        // this.title = '【' + this.sureDateValue + '日' + this.startTime + this.placeName + '】'
      }
    },
    showHeight(newVal , oldVal) {
      // alert(newVal)
      if (newVal < oldVal) {
        this.isInput = true
      } else {
        this.isInput = false
      }
    },
    signReasonVisible:function(newvs,oldvs){//picker关闭没有回调函数，所以侦听该属性替代
        if(newvs){
            this.closeTouch();
        }else{
            this.openTouch();
        }
    }
  },
  created() {
    this.userId = window.localStorage.getItem('userId')
    // 获取运动类型
    this.$http.findDictList('sportsKinds').then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.typeValues = resp.data
      }
    })
    
    // 获取水平
    this.$http.findDictList('level').then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.levelList = resp.data
      }
    })
    // 获取客服人员
    // this.$http.customerService().then(resp => {
    //   console.log(resp)
    //   if(resp.status == 200) {
    //     this.serviceList = resp.data
    //   }
    // })

    //当天日期
    this.startDate = new Date()  
  },
  mounted() {
    const vm = this
    // window.resize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        vm.showHeight = document.body.clientHeight
      })()
    }
  },
  methods: {
    // 失去焦点事件
    blur() {
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        // window.scrollTo(0,0)
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    },
    /*解决iphone页面层级相互影响滑动的问题*/
    closeTouch:function(){
      document.getElementsByTagName("body")[0].addEventListener('touchmove',
        this.handler,{passive:false});//阻止默认事件
      // console.log("closeTouch haved happened.");
    },
    openTouch:function(){
      document.getElementsByTagName("body")[0].removeEventListener('touchmove',
        this.handler,{passive:false});//打开默认事件
      // console.log("openTouch haved happened.");
    },
    // 运动类型
    showPicker1() {
      this.isShowPicker = true
      this.popupVisible = true
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = false
      this.currSlots = this.slotsType
      this.currChange = this.onChangeType
      this.currSure = this.sureType
    },
    onChangeType(picker, values) {
      this.type.name = values[0].name
      this.type.skey = values[0].skey
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureType() {
      this.popupVisible = !this.popupVisible
      this.isShowPicker = false 
      if(this.type.name == '') {
        this.type.name = this.typeValues[0].name
        this.type.skey = this.typeValues[0].skey
      }
      window.sessionStorage.setItem('typeValue',this.type.name)
      window.sessionStorage.setItem('typeId',this.type.skey)
    },
    // 选择客服
    selectService() {
      this.isShowPicker = true
      this.popupVisible = true
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.currSlots = this.serviceSlots
      this.currChange = this.changeService
      this.currSure = this.sureService
    },
    changeService(picker, values) {
      this.serviceType.name = values[0].name
      this.serviceType.id = values[0].id
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureService() {
      this.popupVisible = !this.popupVisible
      this.isShowPicker = false 
      if(this.serviceType.name == '') {
        this.serviceType.name = this.serviceList[0].name
        this.serviceType.id = this.serviceList[0].id
      }
    },
    // 选择水平
    selectLevel(item) {
      this.closeTouch();//关闭默认事件
      // 选中的标签id集合
      let selectedIdIndex = this.selectedLevelList.indexOf(item.skey)
      if(selectedIdIndex >= 0) {
        this.selectedLevelList.splice(selectedIdIndex, 1)
        this.selectedLevelName.splice(selectedIdIndex, 1)
      }else{
        this.selectedLevelList.push(item.skey)
        this.selectedLevelName.push(item.name)
      }
    },
    // 确定选择的水平
    handleSelectLevel() {
      this.showLevelList = false
      this.showLevelName = this.selectedLevelName.join('、')
    },
    // 日期选择
    showDate() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = true
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = false
      this.closeTouch();//关闭默认事件
    },
    handleConfirmDate(v) {
      this.sureDateValue = this.formatDate(v)
      this.popupVisible = !this.popupVisible
      this.isShowDatePicker = false
      // this.title = '【' + this.sureDateValue + '日' + this.startTime + this.placeName + '】'
      this.openTouch();//打开默认事件
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
      // return y + '年' + m + '月' + d+ '日';
    },
    // 开始时间
    showStartTime() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = true
      this.deadlinePicker = false
      this.closeTouch();//关闭默认事件
    },
    handleConfirmStart(v) {
      this.popupVisible = !this.popupVisible
      this.startTime = v
      this.startTimePicker = false
      // this.title = '【' + this.sureDateValue + '日' + this.startTime + this.placeName + '】'
      // 开始时间作为报名截止时间的默认值
      console.log(this.sureDateValue + ' ' + this.startTime)
      this.defaultDeadline = new Date(this.sureDateValue + ' ' + this.startTime)
      this.openTouch();//打开默认事件
    },
    // 结束时间
    showEndTime() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = true
      this.startTimePicker = false
      this.deadlinePicker = false
      this.closeTouch();//关闭默认事件
    },
    handleConfirmEnd(v) {
      this.popupVisible = !this.popupVisible
      this.endTimePicker = false
      this.endTime = v
      const tStart = Number(this.startTime.substring(0,2)) * 60 + Number(this.startTime.substring(4,6))
      const tEnd = Number(this.endTime.substring(0,2)) * 60 + Number(this.endTime.substring(4,6))
      this.openTouch();//打开默认事件
      if(tStart > tEnd) {
        this.endTime = ''
        this.$toast({
          message: '不能小于开始时间！',
          duration: 3000
        });
      }else{
        this.endTime = v
      }
    },
    // 活动地点
    showMap() {
      window.sessionStorage.setItem('typeId',this.type.skey)
      if(this.type.skey == '') {
        this.$toast({
          message: '请先选择运动类型！',
          duration: 3000
        });
      }else{
        this.$router.replace({
          path: '/mapSelection'
        })
      }
    },
    // 人数减按钮
    descBtn() {
      if(this.peopleNum >= 0) {
        this.peopleNum--
        if(this.peopleNum <= 0) {
          this.peopleNum = 0
        }
      }else{
        this.peopleNu = 0
      }
    },
    // 人数加按钮
    addBtn() {
      this.peopleNum++
    },
    // 候补人数减按钮
    HBdescBtn() {
      if(this.HBpeopleNum >= 0) {
        this.HBpeopleNum--
        if(this.HBpeopleNum <= 0) {
          this.HBpeopleNum = 0
        }
      }else{
        this.HBpeopleNum = 0
      }
    },
    // 候补人数加按钮
    HBaddBtn() {
      this.HBpeopleNum++
    },
    // 是否为周活动
    isWeekActivie() {
      this.isCkecked = !this.isCkecked
      this.isCkecked2 = false
    },
    // 是否为比赛活动
    iscompActivie() {
      this.isCkecked2 = !this.isCkecked2
      this.isCkecked = false
    },
    // 确认发布按钮
    submit() {
      if(this.sureDateValue == '') {
        this.$toast({
          message: '请选择日期！',
          duration: 2000
        });
      }else if(this.startTime == '') {
        this.$toast({
          message: '请选择开始时间！',
          duration: 2000
        });
      }else if(this.endTime == '') {
        this.$toast({
          message: '请选择结束时间！',
          duration: 2000
        });
      }else if(this.placeId == '') {
        this.$toast({
          message: '请选择活动地点！',
          duration: 2000
        });
      }else if(this.selectedLevelList.length === 0){
        this.$toast({
          message: '请选择水平！',
          duration: 2000
        });
      }else if(this.peopleNum == '') {
        this.$toast({
          message: '请填写活动人数！',
          duration: 2000
        });
      }else if(!(/(^[0-9]*[1-9][0-9]*$)/.test(this.cost))) {
        this.$toast({
          message: '费用请填写整数！',
          duration: 2000
        });
      }else if(this.cost == '') {
        this.$toast({
          message: '请填写费用！',
          duration: 2000
        });
      }else{
        const params = {
          id: '',
          userId: window.localStorage.getItem('userId'),
          type: this.type.skey,
          // groupId: this.groupType.id,
          title: this.title,
          time: this.sureDateValue,
          timeStart: this.startTime,
          timeEnd: this.endTime,
          venueId: this.placeId,
          people: this.peopleNum,
          alternatePeople: this.HBpeopleNum,
          serviceId: '1',
          cost: this.cost,
          occupationLevel: this.selectedLevelList.join(','),
          // content: this.notes,
          // endTime: this.deadlineValue,
          flag: this.isCkecked,
          matchs: this.isCkecked2,
        }
        console.log(params)
        // 提交后台
        this.$http.organizingActivities(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast({
              message: '发布成功！',
              duration: 2000
            });
            const that = this
            this.timers = setTimeout(() => {
              that.$router.replace({
                path: '/userCenter/myActivities',
                name: 'MyActivities',
                params: {
                  type: '1'
                }
              })
            },300)
            // 清除sessionStorage里的字段
            window.sessionStorage.removeItem("typeId")
            window.sessionStorage.removeItem("typeValue")
          }else{
            this.$toast({
              message: '发布失败！',
              duration: 2000
            });
          }
        })
      }
    },
  },
  beforeDestroy () {
    clearTimeout(this.timers)
    this.timers = null
  }
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
    .maxHeightBox{
      width: 100%;
      height: auto;
      overflow: auto;
      padding: 20px 14px;
      padding-bottom: 310px;
      // padding-bottom: px;
    }
    .upKeyBord{
      padding-bottom: 2vh;
    }
    .ul1{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 97px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 10px;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 0;
        vertical-align: top;
        .title{
          width: 140px;
          line-height: 97px;
          font-size: 32px;
          // color: #676767;
          color: #000;
          display: inline-block;
          vertical-align: top;
        }
        .inputValue{
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: none;
          outline: none;
          // height: 97px;
          width: 280px;
          line-height: 97px;
          font-size: 32px;
          margin-left: 74px;
          vertical-align: top;
          color: #000;
        }
        .inputNumber{
          width: 230px;
        }
        .inputPlaceValue{
          width: 390px;
        }
        input:-ms-input-placeholder{
          font-size: 32px;
          color: #909090;
        }
        input::-moz-placeholder{
          font-size: 32px;
          color: #909090;
        }
        input::-webkit-input-placeholder{
          font-size:32px;
          color: #909090;
        }
        .timeInput{
          width: 150px;
          height: 97px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: none;
          outline: none;
          line-height: 97px;
          font-size: 32px;
          vertical-align: top;
        }
        .time1{
          margin-left: 84px;
          vertical-align: top;
        }
        .range{
          width: 80px;
          height: 97px;
          display: inline-block;
          vertical-align: top;
          font-size: 32px;
          line-height: 99px;
          text-align: center;
        }
        .time2{
          float: right;
          vertical-align: top;
        }
        .numberInputBox{
          width: 190px;
          height: 97px;
          line-height: 97px;
          float: right;
          // border: 1px solid red;
          .btn{
            display: inline-block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            
            line-height: 50px;
            text-align: center;
            background: #ffb401;
            
            vertical-align: middle;
            i{
              color: #fff;
              font-size: 26px;
              font-weight: bold;
              line-height: 50px;
            }
          }
          .desc{
            background: #ebeaec;
          }
          input{
            width: 70px;
            height: 40px;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            border: none;
            outline: none;
            line-height: 35px;
            font-size: 20px;
            border: 1px solid #aeaeae;
            border-radius: 3px;
            vertical-align: middle;
            margin: 0 10px;
            text-align: center;
          }
        }
        .el-icon-arrow-right{
          display: block;
          float: right;
          line-height: 97px;
          font-size: 34px;
          color: #333333;
          font-weight: bold;
        }
        .el-icon-location-outline{
          display: block;
          float: right;
          line-height: 97px;
          font-size: 36px;
          color: #000;
          // font-weight: bold;
        }
      }
    }
    .inputTitleBox{
      width: 100%;
      height: 87px;
      line-height: 65px;
      padding-left: 30px;
      font-size: 32px;
      color: #000;
    }
    .textAreaBox{
      width: 100%;
      min-height: 184px;
    }
    .noteTitle{
      margin-top: 20px;
    }
    .bottomWrap{
      width: 100%;
      padding: 10px 0;
      // padding-bottom: 30px;
      height: 290px;
      background: #fff;
      z-index: 9;
      position: fixed;
      // top: 82vh;
      bottom: 0;
      left: 0;
    }
    .sureBtn{
      width: 100%;
      height: 94px;
      background: #fac31e;
      color: #fff;
      line-height: 94px;
      text-align: center;
      margin-top: 38px;
      letter-spacing: 2px;
      border-radius: 14px;
      padding-left: 15px;
      font-size: 32px;
    }
    .bottom{
      width: 41%;
      height: 60px;
      margin-top: 10px;
      position: relative;
      float: left;
      margin-left: 20px;
      .box{
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #f9c732;
        border-radius: 50%;
        position: absolute;
        left: 25px;
        top: 16px;
        b{
          font-size: 22px;
          line-height: 30px;
          color: #f9c732;
          position: absolute;
          top: 0px;
          left: 1px;
        }
      }
      .activeBox{
        background: #f9c732;
        b{
          color: #fff;
        }
      }
      .bottomText{
        font-size: 24px;
        color: #000;
        text-align: center;
        letter-spacing: 1px;
        line-height: 60px;
        padding-left: 50px;
      }
    }
    .bottom2{
      width:50%;
      float: left;
      margin-left: 40px;
      .box{
        left: 73px;
      }
    }
    .levelBox{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgba(0,0,0,0.5);
      .contentBox{
        width: 76%;
        height: 570px;
        background: #fff;
        margin: 0 auto;
        margin-top: 30vh;
        padding: 0 40px;
        overflow: hidden;
        p{
          height: 80px;
          font-size: 32px;
          line-height: 80px;
          margin-top: 10px;
          border-bottom: 1px dashed #dedede;
          span{
            color: #f9c732;
          }
        }
        .ul2{
          padding-top: 40px;
          padding-left: 20px;
          li{
            width: 100%;
            height: 86px;
            font-size: 32px;
            // margin-to p: 30px;
            .checkBox{
              width: 40px;
              height: 40px;
              border: 1px solid #f9c732;
              float: left;
              vertical-align: middle;
              span{
                display: block;
                color: #f9c732;
                font-size: 36px;
                line-height: 40px;
              }
            }
            .text{
              float: left;
              line-height: 40px;
              margin-left: 15px;
            }
          }
        }
        .btnWrap{
          width: 100%;
          height: 100px;
          border-top: 1px dashed #dedede;
          div{
            width: 50%;
            height: 86px;
            float: left;
            text-align: center;
            line-height: 86px;
            font-size: 30px;
          }
          .sure{
            border-left: 1px dashed #dedede;
            color: #fac31e;
          }
        }
      }
    }
  }
</style>
<style>
  .focusState {
    position: absolute;
  }
  .organization .textAreaBox textarea{
    width: 100%;
    border: none;
    font-size: 32px;
    line-height: 60px;
    outline: none !important;
    border-radius: 10px;
    min-height: 184px !important;
    color: #000;
    padding: 0 30px;
    padding-top: 15px;
  }
  .organization textarea:-ms-input-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
  }
  .organization textarea::-moz-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
  }
  .organization textarea::-webkit-input-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
  }
  .organization .mint-popup{
    width: 100%;
    transition: .3s ease-out;
  }
  .organization .picker{
    width: 100%;
    background: #fff;
  }
  .organization .picker-toolbar{
    height: 70px;
    padding: 0 100px;
  }
  .organization .picker-toolbar-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
  }
  .organization .picker-slot{
    font-size: 27px;
  }
  .organization .usi-btn-cancel,
  .organization .usi-btn-sure {
    text-align: center;
    color: #fac31e
  }
  .organization .usi-btn-cancel{
    color: rgb(139, 138, 138)
  }
  .organization .mint-datetime-action{
    width: 20%;
    line-height: 70px;
    color: #fac31e;
    font-size: 30px;
  }
  .organization .mint-datetime-cancel{
    color: rgb(139, 138, 138)
  }
</style>