<template>
  <div class="organization">
    <ul>
      <li>
        <span class="title">运动种类</span>
        <input type="text" class="inputValue" placeholder="填写种类" v-model="type.name" @click="showPicker1"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li>
        <span class="title">所属群组</span>
        <input type="text" class="inputValue" placeholder="填写群组" />
        <span class="el-icon-arrow-right"></span>
      </li>
      <li>
        <span class="title">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</span>
        <input type="text" class="inputValue" placeholder="填写日期"/>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li class="timeLi">
        <span class="title">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</span>
        <input type="text" class="timeInput time1" placeholder="几点"><span class="range">至</span><input type="text" class="timeInput time2" placeholder="几点">
      </li>
      <li>
        <span class="title">活动地点</span>
        <input type="text" class="inputValue" placeholder="填写位置"/>
        <span class="el-icon-location-outline"></span>
      </li>
      <li>
        <span class="title">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数</span>
        <input type="text" class="inputValue" placeholder="填写人数"/>
        <div class="numberInputBox">
          <span class="btn desc">-</span><input type="number" name="" id=""/><span class="btn add">+</span>
        </div>
      </li>
      <li>
        <span class="title">费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</span>
        <input type="text" class="inputValue" placeholder="填写费用"/>
      </li>
      <li>
        <span class="title">联系方式</span>
        <input type="text" class="inputValue" placeholder="填写电话"/>
      </li>
    </ul>
    <div class="inputTitleBox">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        placeholder="时间+地点+活动类型"
        />
    </div>
    <div class="inputTitleBox noteTitle">参与须知</div>
    <div class="textAreaBox">
      <textarea
        class="textareaTitle"
        placeholder="请填写活动须知"
        />
    </div>
    <div class="sureBtn">
      提交
    </div>
    <!-- 选择弹框 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true" 
      position="bottom"
      >
      <!-- 选择运动种类 -->
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
          <div class="usi-btn-sure"  @click="sureType">确定</div>
        </div>
      </mt-picker>
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
      currChange: function(){}
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),

    slotsType() {
      let slots1 = [
        {
          flex: 1,
          values: this.typeValues,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0
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
  created() {
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
  },
  methods: {
    // 运动类型
    showPicker1() {
      this.isShowPicker = true
      this.popupVisible = true
      this.currSlots = this.slotsType
      this.currChange = this.onChangeType
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
      if(this.type.name == '') {
        this.type.name = this.typeValues[0].name
        this.type.skey = this.typeValues[0].skey
      }
    },
    // // 所属群组
    // showPicker2() {
    //   this.isShowPicker = true
    //   this.popupVisible = true
    //   this.currSlots = this.slotsGroup
    //   this.currChange = this.onChangeGroup
    // },
    // onChangeGroup(picker, values) {
    //   this.groupType = values[0]
    //   // console.log(this.groupType)
    //   if (values[0] > values[1]) {
    //     picker.setSlotValue(1, values[0]);
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding: 20px 14px;
    padding-bottom: 60px;
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
          width: 115px;
          height: 97px;
          display: inline-block;
          vertical-align: top;
          font-size: 32px;
          line-height: 99px;
        }
        .time2{
          float: right;
          vertical-align: top;
        }
        .numberInputBox{
          width: 160px;
          height: 97px;
          line-height: 97px;
          float: right;
          // border: 1px solid red;
          .btn{
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 22px;
            line-height: 40px;
            text-align: center;
            background: #ffb401;
            color: #000;
            vertical-align: middle;
          }
          .desc{
            background: #f3f1f4;
          }
          input{
            width: 60px;
            height: 35px;
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
    .sureBtn{
      width: 100%;
      height: 94px;
      background: #fac31e;
      color: #fff;
      line-height: 94px;
      text-align: center;
      margin-top: 68px;
      letter-spacing: 2px;
      border-radius: 14px;
      padding-left: 15px;
      font-size: 32px;
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
</style>
<style>
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