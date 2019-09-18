<template>
  <div class="organization" v-title data-title="组织活动">
    <div class="maxHeightBox">
    <ul>
      <li @click="showPicker1">
        <span class="title">运动种类</span>
        <input type="text" readonly class="inputValue" placeholder="填写种类" v-model="type.name"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li @click="showPicker2">
        <span class="title">所属群组</span>
        <input type="text" readonly class="inputValue" placeholder="填写群组" v-model="groupType.name">
        <span class="el-icon-arrow-right"></span>
      </li>
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
      <li @click="showDeadline ">
        <span class="title">报名截止</span>
        <input type="text" readonly class="inputValue" v-model="deadlineValue" placeholder="填写时间"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li @click="showMap">
        <span class="title">活动地点</span>
        <input type="text" class="inputValue inputPlaceValue" readonly v-model="placeName" placeholder="填写位置"/>
        <span class="el-icon-location-outline"></span>
      </li>
      <li>
        <span class="title">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数</span>
        <input type="text" class="inputValue inputNumber" v-model="peopleNum" placeholder="填写人数"/>
        <div class="numberInputBox">
          <span class="btn desc" @click="descBtn"><i class="el-icon-minus"></i></span><input type="number" v-model="peopleNum" name="" id=""/><span class="btn add" @click="addBtn"><i class="el-icon-plus"></i></span>
        </div>
      </li>
      <li>
        <!-- <span class="title">费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</span> -->
        <span class="title">费用&nbsp;/&nbsp;人</span>
        <input type="text" class="inputValue" v-model="cost" placeholder="填写费用，如:60"/>
      </li>
      <li>
        <span class="title">联系方式</span>
        <input type="text" class="inputValue" v-model="phone" placeholder="填写电话"/>
      </li>
    </ul>
    <div class="inputTitleBox">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        v-model="title"
        placeholder="时间+地点+活动类型"
        />
    </div>
    <div class="inputTitleBox noteTitle">参与须知</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        v-model="notes"
        placeholder="请填写活动须知"
        />
    </div>
    </div>
    <div class="bottomWrap">
      <div class="sureBtn" @click="submit">
        提交
      </div>
      <div class="bottom">
        <span class="box" :class="{activeBox:isCkecked}" @click="isWeekActivie"><b class="el-icon-check" v-show="isCkecked"></b></span>
        <p class="bottomText">作为群组内周循环活动发布</p>
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
        type="date"
        :startDate="startDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirmDate">
      </mt-datetime-picker>
      <mt-datetime-picker
        v-show="startTimePicker"
        ref="picker"
        type="time"
        @confirm="handleConfirmStart">
      </mt-datetime-picker>
      <!-- 选择结束时间 -->
      <mt-datetime-picker
        v-show="endTimePicker"
        ref="picker"
        type="time"
        @confirm="handleConfirmEnd">
      </mt-datetime-picker>
      <!-- 报名截止 -->
      <mt-datetime-picker
        v-show="deadlinePicker"
        type="datetime"
        :startDate="startDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        hour-format="{value} 时"
        minute-format="{value} 分"
        @confirm="handleConfirmDeadline">
      </mt-datetime-picker>
    </mt-popup>
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
      deadlinePicker: false,
      textarea_1: '',
      textarea_2: '',
      currSlots: [], //渲染
      typeValues: [],  //运动类型slots
      type: {
        name: '',
        skey: ''
      },  //运动类型选择的值
      groupSlots: [],  //所属群组slots
      groupType: {
        id: '',
        name: ''
      },
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
      deadlineValue: '',  //报名截止时间
      placeName: '',   //活动地点名称
      placeId: '',  //活动地点id
      cost: null,  //费用
      phone: '',  //联系方式
      title: '',  //标题
      notes: '',   //参与须知
      isCkecked: false,   //是否为周活动
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
    slotsGroup() {
      let slots2 = [
        {
          flex: 1,
          values: this.groupSlots,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0
        }
      ]
      return slots2
    },
  },
  watch: {
    $route(to, from) {
      if(from.path == '/mapSelection') {
        console.log(this.$route)
        this.placeName = this.$route.params.placeName || ''
        this.placeId = this.$route.params.placeId || ''
      }
    },
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
    // 获取所属群组
    this.$http.getGroupList(this.userId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.groupSlots = resp.data
      }
    })
    //当天日期
    this.startDate = new Date()  
  },
  methods: {
    // 运动类型
    showPicker1() {
      this.isShowPicker = true
      this.isShowDatePicker = false
      this.popupVisible = true
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
      this.isShowPicker = false 
      if(this.type.name == '') {
        this.type.name = this.typeValues[0].name
        this.type.skey = this.typeValues[0].skey
      }
      window.sessionStorage.setItem('typeValue',this.type.name)
      window.sessionStorage.setItem('typeId',this.type.skey)
    },
    // // 所属群组
    showPicker2() {
      this.isShowPicker = true
      this.isShowDatePicker = false
      this.popupVisible = true
      this.currSlots = this.slotsGroup
      this.currChange = this.onChangeGroup
      this.currSure = this.sureGroup
    },
    onChangeGroup(picker, values) {
      this.groupType = values[0]
      console.log(this.groupType)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sureGroup() {
      this.popupVisible = !this.popupVisible
      this.isShowPicker = false
      if(this.groupType.name == '') {
        this.groupType.name = this.groupSlots[0].name
        this.groupType.id = this.groupSlots[0].id
      }
      if(this.groupType.id == '1') {  //临时组队
        this.isCkecked = false
      }
    },
    // 日期选择
    showDate() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = true
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = false
    },
    handleConfirmDate(v) {
      this.sureDateValue = this.formatDate(v)
      this.popupVisible = !this.popupVisible
      this.isShowDatePicker = false
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
    },
    handleConfirmStart(v) {
      this.popupVisible = !this.popupVisible
      this.startTimePicker = false
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = false
      this.startTime = v
    },
    // 结束时间
    showEndTime() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = true
      this.startTimePicker = false
    },
    handleConfirmEnd(v) {
      this.popupVisible = !this.popupVisible
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.endTime = v
      const tStart = Number(this.startTime.substring(0,2)) * 60 + Number(this.startTime.substring(4,6))
      const tEnd = Number(this.endTime.substring(0,2)) * 60 + Number(this.endTime.substring(4,6))
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
    // 报名截止
    formatDate2(Time) {
      var date = Time;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second = date.getSeconds();
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + " " +  h + ":" + minute;
    },
    showDeadline() {
      this.popupVisible = true
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = true
    },
    handleConfirmDeadline(v) {
      this.popupVisible = !this.popupVisible
      this.isShowPicker = false
      this.isShowDatePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.deadlinePicker = false
      console.log(v)
      this.deadlineValue = this.formatDate2(v)
      // 判断选的时间是否大于活动结束时间
      const maxDateTime = new Date(this.sureDateValue + ' ' + this.endTime).getTime()
      const last = new Date(this.deadlineValue).getTime()
      if(last > maxDateTime) {
        this.$toast({
          message: '报名截止时间不得大于活动结束时间！',
          duration: 3000
        });
        console.log(this.endTime)
        this.deadlineValue = this.sureDateValue + ' ' + this.endTime
        
      }
      console.log(this.deadlineValue)

    },
    // 活动地点
    showMap() {
      this.$router.push({
        path: '/mapSelection'
      })
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
    // 是否为周活动
    isWeekActivie() {
      if(this.groupType.id == '1') {  //临时组队
        this.isCkecked = false
        this.$toast({
          message: '临时组队不可作为周活动发布！',
          duration: 3000
        });
      } else{
        this.isCkecked = !this.isCkecked
      }
    },
    // 确认发布按钮
    submit() {
      const params = {
        id: '',
        userId: window.localStorage.getItem('userId'),
        type: this.type.skey,
        groupId: this.groupType.id,
        title: this.title,
        time: this.sureDateValue,
        timeStart: this.startTime,
        timeEnd: this.endTime,
        venueId: this.placeId,
        people: this.peopleNum,
        phone: this.phone,
        cost: this.cost,
        content: this.notes,
        endTime: this.deadlineValue,
        flag: this.isCkecked
      }
      console.log(params)
      // 提交后台
      this.$http.organizingActivities(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.$toast({
            message: '提交成功！',
            duration: 2000
          });
          this.$router.replace({
            path: '/userCenter/myActivities'
          })
          // 清除sessionStorage里的字段
          window.sessionStorage.removeItem("typeId")
          window.sessionStorage.removeItem("typeValue")
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .maxHeightBox{
      width: 100%;
      height: 82vh;
      overflow: auto;
      padding: 20px 14px;
      padding-bottom: 40px;
    }
    ul{
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
          width: 130px;
          line-height: 97px;
          font-size: 32px;
          color: #676767;
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
          margin-left: 84px;
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
      color: #676767;
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
      height: 18vh;
      background: #fff;
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
      width: 100%;
      height: 60px;
      margin-top: 10px;
      position: relative;
      .box{
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #f9c732;
        border-radius: 50%;
        position: absolute;
        left: 210px;
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
  }
</style>
<style>
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
  textarea:-ms-input-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
  }
  textarea::-moz-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
  }
  textarea::-webkit-input-placeholder{
    font-size: 32px;
    line-height: 60px;
    color: #909090 !important;
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
  .mint-datetime-action{
    width: 20%;
    line-height: 70px;
    color: #fac31e;
    font-size: 30px;
  }
</style>