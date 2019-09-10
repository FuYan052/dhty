<template>
  <!-- 组织活动 -->
  <div class="organization" v-title data-title="组织活动">
    <ul>
      <li @click="show1">
        选择运动种类<span class="el-icon-arrow-right"></span><span class="value">{{typeValue}}</span>
      </li>
      <li @click="showActivityType">
        选择活动类型<span class="el-icon-arrow-right"></span><span class="value">{{activityTypeValue}}</span>
      </li>
      <li @click="show2">
        选择所属群组<span class="el-icon-arrow-right"></span><span class="value">{{groupTypeValue}}</span>
      </li>
      <li class="title" @click="show3">
        填写标题<span class="el-icon-arrow-right"></span><span class="value">{{titleValue}}</span>
      </li>
      <li class="title" @click="showDate">
        填写日期<span class="el-icon-arrow-right"></span><span class="value">{{formatDateValue}}</span>
      </li>
      <li class="selectTime">
        <div @click="showStartTime">开始时间<span class="el-icon-date"></span></div>
        <div @click="showEndTime">结束时间<span class="el-icon-date"></span></div>
        <span class="el-icon-arrow-right"></span>
        <span class="value">{{startTimeValue}}{{endTimeValue}}</span>
      </li>
      <li @click="selectPlace">
        填写地点<span class="el-icon-arrow-right"></span><span class="value">{{placeName}}</span>
      </li>
      <li @click="inputNumber">
        填写人数<span class="el-icon-arrow-right"></span><span class="value">{{number}}</span>
      </li>
      <li @click="inputPhone">
        填写联系方式<span class="el-icon-arrow-right"></span><span class="value">{{phone}}</span>
      </li>
      <li @click="lastTime">
        报名截止时间<span class="el-icon-arrow-right"></span><span class="value">{{showLastTimeValue}}</span>
      </li>
    </ul>
    <div class="cost" @click="inputCost">填写参加费用 <span class="el-icon-arrow-right"></span><span class="value">{{cost}}</span></div>
    <div class="notes">
      <span>参与须知</span>
      <el-input
        class="textarea1"
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
      </el-input>
    </div>
    <div class="submit" @click="submit">确认发布</div>
    <div class="bottom">
      <span class="box" @click="isWeekActivie"><b class="el-icon-check" v-show="isCkecked"></b></span>
      <p class="bottomText">作为俱乐部每周活动安排发布</p>
    </div>
    
    <!-- 弹框 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true" 
      position="bottom"
      >
      <!-- 选择运动种类 -->
      <mt-picker 
        v-show="picker1"
        :slots="currSlots" 
        value-key="name"
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="onValuesChange1">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure"  @click="sure1">确定</div>
        </div>
      </mt-picker>
      <!-- 选择活动类型 -->
      <mt-picker 
        v-show="activityTypePicker"
        :slots="activityTypeSlots" 
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="ChangeactivityType">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure"  @click="sureActivityType">确定</div>
        </div>
      </mt-picker>
      <!-- 选择所属群组 -->
      <mt-picker 
        v-show="picker2"
        :slots="currSlots" 
        value-key="name"
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="onValuesChange2">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure"  @click="sure2">确定</div>
        </div>
      </mt-picker>
      <!-- 选择日期 -->
      <mt-datetime-picker
        v-show="datePicker"
        ref="picker"
        type="date"
        :startDate="startDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-model="dateValue"
        @confirm="handleConfirmDate">
      </mt-datetime-picker>
      <!-- 选择开始时间 -->
      <mt-datetime-picker
        v-show="startTimePicker"
        ref="picker"
        type="time"
        v-model="startTime"
        @confirm="handleConfirmStart">
      </mt-datetime-picker>
      <!-- 选择结束时间 -->
      <mt-datetime-picker
        v-show="endTimePicker"
        ref="picker"
        type="time"
        v-model="endTime"
        @confirm="handleConfirmEnd">
      </mt-datetime-picker>
      <!-- 报名截止时间 -->
      <mt-datetime-picker
        v-show="lastTimePicker"
        ref="picker"
        type="datetime"
        :startDate="startDate"
        v-model="lastTimeValue"
        @confirm="handleConfirmLastTime">
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
      textarea1: '',  //参与须知
      picker1: false,
      activityTypePicker: false,
      picker2: false,
      datePicker: false,
      startTimePicker: false,
      endTimePicker: false,
      lastTimePicker: false,
      type: '羽毛球', //默认运动类型
      typeValue: '', //选择的运动类型
      activityType: '', //默认活动类型
      activityTypeValue: '', //选择的活动类型
      activityTypeId: '',
      groupType: '大虎管理员', //默认所属群组
      groupTypeValue: '', //选择的所属群组
      titleValue:'',  //标题内容
      dateValue: '',  //选择日期
      formatDateValue: '',  //格式化选择的日期并显示
      startTime: '',  //选择的开始时间
      startTimeValue: '',  //显示的格式化的开始时间
      endTime: '',  //选择的结束时间
      endTimeValue: '',  //显示的格式化的结束时间
      startDate: '',  //可选日期当天以后
      placeId: '',  //选择的地点id
      placeName: '',  //选择的地点名字
      number: '',  //人数
      phone: '',  //联系方式
      lastTimeValue: '',  //报名截止时间  //此格式传给后端
      showLastTimeValue: '',  //报名截止时间  //此格式用于前端显示
      cost: '',  //费用
      currSlots: this.slots1,
      slotsValues1: [],
      slotsValues2: [],
      showToolbar: true,
      popupVisible: false,
      isCkecked: false,   //是否为周活动
      activityTypeSlots: [{
        flex: 1,
        values: ['成人活动', '儿童活动','亲子活动'],
        className: 'slot6',
        textAlign: 'center',
        // defaultIndex: -1
      }]
    }
  },
  created() {
    // 获取运动类型
    this.$http.findDictList('sportsKinds').then(resp => {
      // console.log(resp)
      if(resp.status == 200) {
        this.slotsValues1 = resp.data
      }
    })
    // 获取群组列表
    this.$http.getGroupList(this.userId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.slotsValues2 = resp.data
      }
    })

    this.startDate = new Date()  //当天日期
    // this.typeValue = window.sessionStorage.getItem('typeValue')  //存sessionStorage是为了防止选择场地后返回页面被刷新，之前选择项被清空
    // this.activityTypeValue = window.sessionStorage.getItem('activityType')  
    // this.groupTypeValue = window.sessionStorage.getItem('groupTypeValue')
    // this.titleValue = window.sessionStorage.getItem('titleValue')
    // this.formatDateValue = window.sessionStorage.getItem('formatDateValue')
    // this.startTimeValue = window.sessionStorage.getItem('startTimeValue')
    // this.endTime = window.sessionStorage.getItem('endTime')
    // if(this.endTime !== null) {
    //   this.endTimeValue = '~' + this.endTime
    // }
    // this.placeId = window.sessionStorage.getItem('placeId')
    // this.placeName = window.sessionStorage.getItem('placeName')
    // this.number = window.sessionStorage.getItem('number')
    // this.phone = window.sessionStorage.getItem('phone')
    // this.showLastTimeValue = window.sessionStorage.getItem('lastTimeValue')
    // this.cost = window.sessionStorage.getItem('cost')
  },
  computed: {
    // 用户id
    ...mapState(['userId']),

    dataList1() {
      let slots1 = [
        {
          flex: 1,
          // values: ['羽毛球', '跑步','儿童活动'],
          values: this.slotsValues1,
          className: 'slot1',
          textAlign: 'center',
          // defaultIndex: -1
        }
      ]
      return slots1
    },
    dataList2() {
      let slots2 = [
        {
          flex: 1,
          values: this.slotsValues2,
          className: 'slot1',
          textAlign: 'center',
          // defaultIndex: -1
        }
      ]
      return slots2
    },

  },
  methods: {
    onValuesChange1(picker, values) {
      this.type = values[0]
      // console.log(this.type)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    ChangeactivityType(picker, values) {
      this.activityType = values[0]
      // console.log(this.activityType)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    onValuesChange2(picker, values) {
      this.groupType = values[0]
      // console.log(this.groupType)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    //显示运动类型选择项
    show1() {
      this.popupVisible = true
      this.picker1 = true
      this.activityTypePicker = false
      this.picker2 = false
      this.picker3 = false
      this.datePicker = false
      this.startTimePicker = false
      this.endTimePicker = false
      this.currSlots = this.dataList1
    },
    //显示活动类型选择项
    showActivityType() {
      this.popupVisible = true
      this.activityTypePicker = true
      this.picker1 = false
      this.picker2 = false
      this.picker3 = false
      this.datePicker = false
      this.startTimePicker = false
      this.endTimePicker = false
    },
    //显示所属群组选择项
    show2() {
      this.popupVisible = true
      this.picker1 = false
      this.activityTypePicker = false
      this.picker2 = true
      this.picker3 = false
      this.datePicker = false
      this.startTimePicker = false
      this.endTimePicker = false
      this.currSlots = this.dataList2
    },
    //显示标题填写框
    show3() {
      this.$messagebox.prompt('请填写标题').then(({ value, action }) => {
        // console.log(value)
        this.titleValue = value
        window.sessionStorage.setItem('titleValue',this.titleValue)
      })
    },
    showDate() {
      this.popupVisible = true
      this.picker1 = false
      this.activityTypePicker = false
      this.picker2 = false
      this.datePicker = true
      this.endTimePicker = false
      this.startTimePicker = false
    },
    // 显示开始时间选择项
    showStartTime() {
      this.popupVisible = true
      this.picker1 = false
      this.activityTypePicker = false
      this.picker2 = false
      this.datePicker = false
      this.endTimePicker = false
      this.startTimePicker = true
    },
    // 显示结束时间选择项
    showEndTime() {
      this.popupVisible = true
      this.picker1 = false
      this.activityTypePicker = false
      this.picker2 = false
      this.datePicker = false
      this.startTimePicker = false
      this.endTimePicker = true
    },
    sure1() {
      this.popupVisible = !this.popupVisible
      if(this.type === undefined){
        this.type = this.dataList1[0].values[0]
        this.typeValue = this.type.name
      }else{
        this.typeValue = this.type.name
      }
      console.log(this.type)
      window.sessionStorage.setItem('typeValue',this.typeValue)
      window.sessionStorage.setItem('typeId',this.type.skey)
    },
    sureActivityType() {
      this.popupVisible = !this.popupVisible
      this.activityTypeValue = this.activityType
      // console.log(this.activityType)
      
      // console.log(this.type)
      if(this.activityTypeValue === '成人活动'){
        this.activityTypeId = '1'
      }
      if(this.activityTypeValue === '儿童活动'){
        this.activityTypeId = '2'
      }
      if(this.activityTypeValue === '亲子活动'){
        this.activityTypeId = '3'
      }
      window.sessionStorage.setItem('activityType',this.activityType)
      window.sessionStorage.setItem('activityTypeId',this.activityTypeId)
    },
    sure2() {
      this.popupVisible = !this.popupVisible
      if(this.groupType === undefined){
        this.groupType = this.dataList2[0].values[0]
        this.groupTypeValue = this.groupType.name
      }else{
        this.groupTypeValue = this.groupType.name
      }
      console.log(this.groupType)
      window.sessionStorage.setItem('groupTypeValue',this.groupTypeValue)
      window.sessionStorage.setItem('groupTypeId',this.groupType.id)
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
    // 转化日期时间
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
      // return y + '-' + m + '-' + d + " " +  h + ":" + minute + ":" + second;
    },
    handleConfirmDate(v) {
      this.dateValue = this.formatDate(v)
      this.formatDateValue = this.dateValue
      this.popupVisible = !this.popupVisible
      // console.log(this.dateValue)
      window.sessionStorage.setItem('formatDateValue',this.formatDateValue)
    },
    handleConfirmStart(v) {
      this.popupVisible = !this.popupVisible
      this.startTime = v
      this.startTimeValue = this.startTime
      // console.log(this.startTimeValue)
      window.sessionStorage.setItem('startTimeValue',this.startTime)
    },
    handleConfirmEnd(v) {
      this.popupVisible = !this.popupVisible
      this.endTime = v
      this.endTimeValue = '~' + this.endTime
      // console.log(v)
      window.sessionStorage.setItem('endTime',this.endTime)
    },
    // 填写地点
    selectPlace() {
      this.$router.push({
        path: '/mapSelection'
      })
    },
    // 填写人数
    inputNumber() {
      this.$messagebox.prompt('请填写人数').then(({ value, action }) => {
        // console.log(value)
        this.number = value
        window.sessionStorage.setItem('number',this.number)
      })
    },
    // 填写联系方式
    inputPhone() {
      this.$messagebox.prompt('请填写联系方式').then(({ value, action }) => {
        // console.log(value)
        this.phone = value
        window.sessionStorage.setItem('phone',this.phone)
      })
    },
    // 报名截止时间
    lastTime() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = false
      this.datePicker = false
      this.endTimePicker = false
      this.startTimePicker = false
      this.lastTimePicker = true
    },
    handleConfirmLastTime(v) {
      console.log(v)
      this.showLastTimeValue = this.formatDate2(v)
      this.popupVisible = !this.popupVisible
      this.lastTimeValue = this.formatDate2(v)
      console.log(this.lastTimeValue)
      const maxDateTime = new Date(this.formatDateValue + ' ' + this.endTime).getTime()
      const last = new Date(this.lastTimeValue).getTime()
      if(last > maxDateTime) {
        this.$toast("报名截止时间不得大于活动结束时间！")
        this.showLastTimeValue = this.formatDateValue + ' ' + this.endTime
        this.lastTimeValue = this.formatDateValue + ' ' + this.endTime
        // console.log(this.lastTimeValue)
      }
      window.sessionStorage.setItem('lastTimeValue',this.lastTimeValue)
    },
    // 填写费用
    inputCost() {
      this.$messagebox.prompt('请填写费用').then(({ value, action }) => {
        // console.log(value)
        this.cost = value
        window.sessionStorage.setItem('cost',this.cost)
      })
    },
    // 确认发布按钮
    submit() {
      const params = {
        id: '',
        userId: this.userId,
        type: window.sessionStorage.getItem('typeId'),
        groupId: window.sessionStorage.getItem('groupTypeId'),
        activityType: window.sessionStorage.getItem('activityTypeId'),
        title: this.titleValue,
        time: this.formatDateValue,
        timeStart: this.startTimeValue,
        timeEnd: this.endTime,
        venueId: this.placeId,
        people: this.number,
        phone: this.phone,
        cost: this.cost,
        content: this.textarea1,
        // endTime: this.lastTimeValue.getTime(),
        endTime: window.sessionStorage.getItem('lastTimeValue'),
        // endTime: this.lastTimeValue,
        flag: this.isCkecked
      }
      console.log(params)
      // 提交后台
      this.$http.organizingActivities(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.$toast("提交成功！")
          this.$router.push({
            path: '/userCenter/myActivities'
          })
          // 清除sessionStorage里的字段
          window.sessionStorage.removeItem("cost")
          window.sessionStorage.removeItem("endTime")
          window.sessionStorage.removeItem("formatDateValue")
          window.sessionStorage.removeItem("groupTypeValue")
          window.sessionStorage.removeItem("typeId")
          window.sessionStorage.removeItem("groupTypeId")
          window.sessionStorage.removeItem("number")
          window.sessionStorage.removeItem("phone")
          window.sessionStorage.removeItem("placeId")
          window.sessionStorage.removeItem("placeName")
          window.sessionStorage.removeItem("startTimeValue")
          window.sessionStorage.removeItem("lastTimeValue")
          window.sessionStorage.removeItem("titleValue")
          window.sessionStorage.removeItem("typeValue")
          window.sessionStorage.removeItem("activityType")
          window.sessionStorage.removeItem("activityTypeId")
        }
      })
    },
    // 是否为周活动
    isWeekActivie() {
      this.isCkecked = !this.isCkecked
    }
  },
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 40px;
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%;
        height: 94px;
        line-height: 94px;
        color: #a9a9a9;
        padding: 0 20px;
        border-top: 2px solid #f6f6f6;
        span{
          float: right;
          font-weight: bold;
          line-height: 94px;
          color: #cdcdcd;
        }
        .value{
          font-weight: normal;
          padding-right: 15px;
          color: #868686;
        }
      }
      .title{
        input{
          width: 70%;
          height: 60px;
          padding-left: 10px;
          font-size: 24px;
          border: none;
          color: #868686;
        }
      }
      .selectTime{
        div{
          width: 25%;
          height: 94px;
          line-height: 94px;
          float: left;
          span{
            float: left;
            padding-right: 10px;
            color: #f8c31b;
            font-weight: normal;
          }
        }
      }
    }
    .cost{
      width: 100%;
      height: 94px;
      line-height: 94px;
      padding: 0 20px;
      margin: 30px 0;
      background: #fff;
      color: #a9a9a9;
      span{
        float: right;
        font-weight: bold;
        line-height: 94px;
        color: #cdcdcd;
      }
      .value{
        font-weight: normal;
        padding-right: 15px;
        color: #868686;
      }
    }
    .notes{
      width: 100%;
      min-height: 200px;
      background: #fff;
      padding: 0 20px;
      span{
        display: block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #a9a9a9;
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
      margin-top: 87px;
      border-radius: 10px;
      letter-spacing: 1px;
    }
    .bottom{
      width: 100%;
      height: 60px;
      position: relative;
      .box{
        display: block;
        width: 28px;
        height: 28px;
        border: 1px solid #f9c732;
        border-radius: 50%;
        position: absolute;
        left: 180px;
        top: 15px;
        b{
          font-size: 22px;
          line-height: 26px;
          color: #f9c732;
          position: absolute;
          top: 0px;
          left: 2px;
        }
      }
      .bottomText{
        font-size: 26px;
        color: #c3c2c2;
        text-align: center;
        line-height: 60px;
        padding-left: 30px;
      }
    }
  }
</style>
<style>
.organization .notes .el-textarea__inner{
  min-height: 110px !important;
  outline: none !important;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
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
.mint-datetime-action{
  line-height: 70px;
  color: #fac31e;
  font-size: 24px;
}
.textarea1{
  font-size: 23px;
}
</style>
