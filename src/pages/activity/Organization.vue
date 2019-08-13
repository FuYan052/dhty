<template>
  <!-- 组织活动 -->
  <div class="organization" v-title data-title="组织活动">
    <ul>
      <li @click="show1">
        选择运动种类<span class="el-icon-arrow-right"></span><span class="value">羽毛球</span>
      </li>
      <li @click="show1">
        选择所属群组<span class="el-icon-arrow-right"></span>
      </li>
      <li class="title" @click="show3">
        填写标题<span class="el-icon-arrow-right"></span><span class="value">{{value3}}</span>
        <input type="text" @blur="inputBlur" v-show="isShowInput" v-model="titleValue">
      </li>
      <li @click="show4">
        填写时间<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写地点<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写人数<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写联系方式<span class="el-icon-arrow-right"></span>
      </li>
    </ul>
    <div class="cost">填写参加费用 <span class="el-icon-arrow-right"></span></div>
    <div class="notes">
      <span>参与须知</span>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
      </el-input>
    </div>
    <div class="submit">确认发布</div>
    <!-- 选择器 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true" 
      position="bottom"
      >
      <mt-picker 
        v-show="picker1"
        :slots="currSlots" 
        :visibleItemCount='5'
        :itemHeight='50'
        showToolbar
        @change="onValuesChange">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
        </div>
      </mt-picker>
      <!-- 选择时间 -->
      <mt-datetime-picker
        v-show="picker2"
        ref="picker"
        type="datetime"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-model="picker2Value">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
        </div>
      </mt-datetime-picker>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      textarea1: '',
      titleValue:'',
      picker1: false,
      picker2: false,
      picker2Value: '',
      value3: '', 
      isShowInput: false,
      currSlots: this.slots1,
      slots1: [
        {
          flex: 1,
          values: ['羽毛球', '跑步'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots4: [
        
      ],
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '—',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      showToolbar: true,
      popupVisible: false,
    }
  },
  methods: {
    onValuesChange(picker, values) {
      // console.log(values)
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    show1() {
      this.popupVisible = true
      this.picker1 = true
      this.picker2 = false
      this.currSlots = this.slots1
    },
    show3() {
      this.isShowInput = true
      if(this.isShowInput) {
        this.value3 = ''
      }
    },
    show4() {
      this.popupVisible = true
      this.picker1 = false
      this.picker2 = true
      this.currSlots = this.slots4
    },
    inputBlur() {
      this.isShowInput = false
      this.value3 = this.titleValue
    }
  },
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
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
    .bg{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 20;
      outline: none;
      background: rgba(0,0,0,0.5)
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
</style>
