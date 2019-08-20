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

export default {
  name: 'MyDataDetail',
  data() {
    return {
      cateList: ['日','周','月','年'],
      currIndex: 0,
      dateList: []
    }
  },
  created() {
    for(let i = -6; i<=0; i++){
      const result = this.findDate(i)
      this.dateList.push(result) 
    }
  },
  mounted() {
    var dataAxis = this.dateList;
    var data = [0.8, 1.2, 0.2, 1.7, 0.6, 2.3, 0.7];
    var yMax = 0;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    var myChart = echarts.init(document.getElementById('box'));
    myChart.setOption({
      grid: {
        left: '8%',
        right: '10%',
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
                  // {offset: 0, color: '#83bff6'},
                  // {offset: 0.5, color: '#188df0'},
                  // {offset: 1, color: '#188df0'}
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
                  // {offset: 0, color: '#2378f7'},
                  // {offset: 0.7, color: '#2378f7'},
                  // {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: data
        }
      ]
    })
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
    },
    // 获取当前日期及后面范围内的日期
    findDate(aa) {
      var date1 = new Date()
      var time1 = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate()
      var date2 = new Date(date1)
      date2.setDate(date1.getDate()+aa)
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
      var time = _month + "/"+ _day
      return time;
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
    .box{
      width: 100%;
      height: 430px;
      // border: 1px solid red;
      margin-top: 40px;
    }
  }
</style>