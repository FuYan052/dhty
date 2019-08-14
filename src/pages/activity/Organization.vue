<template>
  <!-- 组织活动 -->
  <div class="organization" v-title data-title="组织活动">
    <ul>
      <li @click="show1">
        选择运动种类<span class="el-icon-arrow-right"></span><span class="value">{{typeValue}}</span>
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
      <li>
        填写地点<span class="el-icon-arrow-right"></span>
      </li>
      <li @click="inputNumber">
        填写人数<span class="el-icon-arrow-right"></span><span class="value">{{number}}</span>
      </li>
      <li @click="inputPhone">
        填写联系方式<span class="el-icon-arrow-right"></span><span class="value">{{phone}}</span>
      </li>
    </ul>
    <div class="cost" @click="inputCost">填写参加费用 <span class="el-icon-arrow-right"></span><span class="value">{{cost}}</span></div>
    <div class="notes">
      <span>参与须知</span>
      <el-input
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
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="onValuesChange1">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure"  @click="sure1">确定</div>
        </div>
      </mt-picker>
      <!-- 选择所属群组 -->
      <mt-picker 
        v-show="picker2"
        :slots="currSlots" 
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
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      textarea1: '',  //参与须知
      picker1: false,
      picker2: false,
      datePicker: false,
      startTimePicker: false,
      endTimePicker: false,
      type: '羽毛球', //默认运动类型
      typeValue: '', //选择的运动类型
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
      number: '',  //人数
      phone: '',  //联系方式
      cost: '',  //费用
      currSlots: this.slots1,
      slots1: [
        {
          flex: 1,
          values: ['羽毛球', '跑步','儿童活动'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ['大虎管理员', '个人'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      showToolbar: true,
      popupVisible: false,
      isCkecked: false,   //是否为周活动
    }
  },
  created() {
    this.startDate = new Date()  //当天日期
  },
  methods: {
    onValuesChange1(picker, values) {
      this.type = values[0]
      // console.log(this.type)
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
      this.picker2 = false
      this.picker3 = false
      this.currSlots = this.slots1
    },
    //显示所属群组选择项
    show2() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = true
      this.picker3 = false
      this.currSlots = this.slots2
    },
    //显示标题填写框
    show3() {
      this.$messagebox.prompt('请填写标题').then(({ value, action }) => {
        // console.log(value)
        this.titleValue = value
      })
    },
    showDate() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = false
      this.datePicker = true
      this.endTimePicker = false
      this.startTimePicker = false
    },
    // 显示开始时间选择项
    showStartTime() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = false
      this.datePicker = false
      this.endTimePicker = false
      this.startTimePicker = true
    },
    // 显示结束时间选择项
    showEndTime() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = false
      this.datePicker = false
      this.startTimePicker = false
      this.endTimePicker = true
    },
    sure1() {
      this.popupVisible = !this.popupVisible
      this.typeValue = this.type
      if(this.typeValue !== '跑步' && this.typeValue !== '儿童活动'){
        this.typeValue = '羽毛球'
      }
    },
    sure2() {
      // console.log(this.groupType)
      this.popupVisible = !this.popupVisible
      this.groupTypeValue = this.groupType
      if(this.groupTypeValue !== '个人'){
        this.groupTypeValue = '大虎管理员'
      }
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
    handleConfirmDate(v) {
      this.dateValue = this.formatDate(v)
      this.formatDateValue = this.dateValue
      this.popupVisible = !this.popupVisible
      // console.log(this.dateValue)
    },
    handleConfirmStart(v) {
      this.popupVisible = !this.popupVisible
      this.startTime = v
      this.startTimeValue = this.startTime
      // console.log(this.startTimeValue)
    },
    handleConfirmEnd(v) {
      this.popupVisible = !this.popupVisible
      this.endTime = v
      this.endTimeValue = '~' + this.endTime
      // console.log(v)
    },
    // 填写人数
    inputNumber() {
      this.$messagebox.prompt('请填写人数').then(({ value, action }) => {
        // console.log(value)
        this.number = value
      })
    },
    // 填写人数
    inputPhone() {
      this.$messagebox.prompt('请填写联系方式').then(({ value, action }) => {
        // console.log(value)
        this.phone = value
      })
    },
    // 填写费用
    inputCost() {
      this.$messagebox.prompt('请填写费用').then(({ value, action }) => {
        // console.log(value)
        this.cost = value
      })
    },
    // 确认发布按钮
    submit() {
      console.log("ok")
      const params = {
        type: this.typeValue,
        group: this.groupTypeValue,
        title: this.titleValue,
        date: this.dateValue,
        startTime: this.startTimeValue,
        endTime: this.endTimeValue,
        place: '',
        number: this.number,
        phone: this.phone,
        cost: this.cost,
        notes: this.textarea1,
        isWeekly: this.isCkecked
      }
      console.log(params)
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
</style>
