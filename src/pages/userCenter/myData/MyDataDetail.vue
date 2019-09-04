<template>
  <!-- 更多数据统计 -->
  <div class="myDataDetail" v-title data-title="更多">
    <!-- 统计分类 -->
    <div class="cateBox">
      <div class="cateItem" 
        v-for="(item,index) in cateList" 
        :key="index"
        :class="{activeCate : currIndex === index}"
        @click="changeCate(item,index)"
        > 
        {{item}}
      </div>
    </div>
    <!-- 当前信息 -->
    <div class="currData">
      <p class="time">{{time}}</p>
      <p class="name" v-show="isclick">{{name}}</p>
      <p class="value" v-show="isclick"><span>{{value}}</span>h</p>
    </div>
    <!-- 统计图 -->
    <div class="box" id="box">

    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
export default {
  name: 'MyDataDetail',
  data() {
    return {
      isclick: false,
      isYear: false,
      time: '',
      name: '',
      value: '',
      cateList: ['日','周','月','年'],
      currIndex: 0,
      // dayList: [],
      dayList: ['06:00','07:00','08:00','09:00','10:00','11:00','12:00',
                '13:00','14:00','15:00','16:00','17:00','18:00','19:00',
                '20:00','21:00','22:00','23:00','00:00'],
      dayData: [0, 1.2, 0, 0, 0, 0, 0, 1.7, 0, 0, 0, 0, 1.2, 0, 1.7, 1.7, 0, 1.2, 0],
      weekList: ['周一','周二','周三','周四','周五','周六','周日'],
      weekData: [0.8, 1.2, 0.2, 1.7, 0.6, 2.3, 0.7],
      monthList: ['7/1','7/2','7/3','7/4','7/5','7/6','7/7','7/8','7/9','7/10','7/11',
                  '7/12','7/13','7/14','7/15','7/16','7/17','7/18','7/19','7/20','7/21',
                  '7/22','7/23','7/24','7/25','7/26','7/27','7/28','7/29','7/30','7/31'],
      monthData: [0.2, 1.7, 0.6, 2.3, 0.7,1.5, 1.7, 0.6, 2.3, 0.7,1.5, 1.7, 0.6, 2.3, 0.7,1.5
                  , 1.7, 0.6, 2.3, 0.7,1.5, 1.7, 0.6, 2.3, 0.7,1.5, 1.7, 0.6, 2.3, 0.7,1.5],
      yearList: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      yearData: [],
      yearData: [0.8, 1.2, 0.2, 1.7, 0.6, 2.3,0.8, 1.2, 0.2, 1.7, 0.6, 2.3],
      currList: [],
      currData: []
    }
  },
  created() {
    // 当前日期
    this.time = this.formatDate(new Date())
  },
  mounted() {
    this.currList = this.dayList
    this.currData = this.dayData
    this.chart()
  },
  methods: {
    // 格式化日期
    formatDate(date) { 
      var myyear = date.getFullYear(); 
      var mymonth = date.getMonth()+1; 
      var myweekday = date.getDate(); 
      if(mymonth < 10){ 
          mymonth = "0" + mymonth; 
        } 
      if(myweekday < 10){ 
          myweekday = "0" + myweekday; 
      } 
      return (myyear+"年"+mymonth + "月" + myweekday + '日'); 
    },
    // 获取当前周的周一
    getWeekStartDate() { 
      var date1 = new Date() //当前日期 
      var nowDayOfWeek = date1.getDay(); //今天本周的第几天 
      var date2 = new Date(date1)
      date2.setDate(date1.getDate()+(0 - nowDayOfWeek + 1))
      var _year = date2.getFullYear()
      var _month = date2.getMonth()+1
      var _day = date2.getDate()
      if(_month < 10){
        _month = "0" + _month
      }else{
         _month = date2.getMonth()+1
      }
      if(_day < 10){
        _day = "0" + _day
      }else{
         _day = date2.getDate()
      }
      var time = _year + '年' + _month + "月" +  _day + "日"
      return time;
    },
    // 获取当前周的周日
    getWeekEndDate() {
      var date1 = new Date() //当前日期 
      var nowDayOfWeek = date1.getDay(); //今天本周的第几天 
      var date2 = new Date(date1)
      date2.setDate(date1.getDate()+(7 - nowDayOfWeek))
      var _year = date2.getFullYear()
      var _month = date2.getMonth()+1
      var _day = date2.getDate()
      if(_month < 10){
        _month = "0" + _month
      }else{
         _month = date2.getMonth()+1
      }
      if(_day < 10){
        _day = "0" + _day
      }else{
         _day = date2.getDate()
      }
      var time = '至' + _day + "日"
      return time;
    },
    // 获取当前月
    getCurrMonth() {
      var date1  = new Date()
      var _year = date1.getFullYear()
      var _month = date1.getMonth()+1
      if(_month < 10){
        _month = "0" + _month
      }else{
         _month = date1.getMonth()+1
      }
      return _year + '年' + _month + "月"
    },
    // 统计图
    chart() {
      var dataAxis = this.currList;
      var data = this.currData;
      var yMax = 0;
      var dataShadow = [];
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      var myChart = echarts.init(document.getElementById('box'));
      myChart.setOption({
        grid: {
          left: '7%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type : 'category',
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#737272'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          name : '时长 (/h)',
          nameLocation: 'end',
          nameTextStyle:{
            color: '#737272',
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-95%',
            barCategoryGap:'77%',
            data: dataShadow,
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0.1, color: '#b3d5f2'},
                    {offset: 0.5, color: '#67b7fa'},
                    {offset: 1, color: '#b1d4f4'}
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#6fa1ed'},
                    {offset: 0.7, color: '#6ca3f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: data
          }
        ]
      })
      // 点击柱状图
      const that = this
      that.name = ''
      that.value = ''
      myChart.on('click',function(params) {
        that.isclick = true
        // console.log(params)
        that.name = params.name
        that.value = params.value 
        if(that.isYear) {
          that.name = params.name + '月'
        }
      })
    },
    changeCate(item,index) {
      this.isclick = false
      this.currIndex = index
      if(index === 0) {
        this.isYear = false
        this.time = this.formatDate(new Date())
        this.currList = this.dayList
        this.currData = this.dayData
        this.chart()
      }
      if(index === 1) {
        this.isYear = false
        this.time = this.formatDate(new Date())
        this.time = this.getWeekStartDate() + this.getWeekEndDate()
        this.currList = this.weekList
        this.currData = this.weekData
        this.chart()
      }
      if(index === 2) {
        this.isYear = false
        this.time = this.getCurrMonth()
        this.currList = this.monthList
        this.currData = this.monthData
        this.chart()
      }
      if(index === 3) {
        this.isYear = true
        this.time = new Date().getFullYear() + '年'
        this.currList = this.yearList
        this.currData = this.yearData
        this.chart()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .myDataDetail{
    width: 100%;
    min-height: 100vh;
    .cateBox{
      width: 400px;
      height: 86px;
      margin: 0 auto;
      .cateItem{
        width: 21%;
        height: 86px;
        float: left;
        line-height: 86px;
        text-align: center;
        margin-left: 5%;
      }
      .cateItem:nth-of-type(1){
        margin-left: 0;
      }
      .activeCate{
        border-bottom: 3px solid #f96e35;
      }
    }
    .currData{
      width: 100%;
      height: auto;
      // border: 1px solid red;
      margin-top: 20px;
      padding-top: 10px;
      p{
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        color: rgb(107, 105, 105);
        span{
          font-size: 30px;
          padding-right: 10px;
          color: #539ee0;
        }
      }
    }
    .box{
      width: 100%;
      height: 430px;
      // border: 1px solid red;
      // margin-top: 20px;
    }
  }
</style>