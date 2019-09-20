<template>
  <!-- 我的数据 -->
  <div class="myData" v-title data-title="我的数据">
    <div class="bgBox">
      <div class="userBox">
        <img :src="myInfo.image" alt="">
        <div class="name">{{myInfo.nickName}}</div>
        <div class="level">Lv.{{myInfo.level}}</div>
      </div>
      <div class="topBox">
        <div class="top">
          <div class="peopleBox"></div>
          <div class="left">
            <h6>{{total}}</h6>
            <p>运动0分，消耗0千卡</p>
            <p>距离达成目标还差8000步</p>
          </div>
          <div class="right" ref="circle" id="circle1"></div>
        </div>
        <div class="bottom">
          <div>
            <p class="p1">运动时间</p>
            <p class="p2">1705.95<span>分钟</span></p>
          </div>
          <div>
            <p class="p1">运动步数</p>
            <p class="p2">4800</p>
          </div>
          <div>
            <p class="p1">消耗卡路里</p>
            <p class="p2">133<span>KJ</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 切换运动类型 -->
    <div class="cate">
      <div class="cateItem" 
        v-for="(item,index) in cateList" 
        :key="index"
        :class="{activeCate : currIndex === index}"
        @click="changeCate(item,index)"
        > 
        {{item}}
      </div>
    </div>
    <!-- 运动统计图 -->
    <div class="wrap">
      <div class="more" @click="toMore">更多<span class="el-icon-arrow-right"></span></div>
      <div class="chartWrap" id="chartWrap">
      
      </div>
    </div>
    <!-- 健康数据 -->
    <p class="healthTitle">健康数据</p>
    <ul class="healthData">
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/shuimian.png" alt="">
        </div>
        <p>睡眠</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/tizhong.png" alt="">
        </div>
        <p>体重</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/xueya.png" alt="">
        </div>
        <p>压力</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/xinlv.png" alt="">
        </div>
        <p>心率</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/xybhd.png" alt="">
        </div>
        <p>血氧饱和度</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/xy.png" alt="">
        </div>
        <p>血压</p>
      </li>
      <li>
        <div class="iconBox" @click="toDetail">
          <img src="../../../assets/xt.png" alt="">
        </div>
        <p>血糖</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入饼状图
require('echarts/lib/chart/pie');
// 引入柱状图
require('echarts/lib/chart/bar');
export default {
  name: 'MyData',
  data() {
    return {
      total: 3306, //步数
      cateList: ['跑步','羽毛球'],
      currIndex: 0,
      dateList: [],
      myInfo: '',
      _id: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    // // 获取信息
    // this.$http.informationOthers(this.userId).then(resp => {
    //   console.log(resp)
    //   if(resp.status == 200) {
    //     this.myInfo = resp.data
    //   }
    // })
    // // 计算日期
    // for(let i = -6; i<=0; i++){
    //   const result = this.findDate(i)
    //   this.dateList.push(result) 
    // }
    // console.log(this.dateList)
  },
  mounted() {
    // 获取信息
    this._id = this.userId
    // console.log(this._id)
    if(this._id == null) {
      this._id = this.$route.params._userId
    }
    // console.log(this._id)
    this.$http.informationOthers(this._id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.myInfo = resp.data
      }
    })
    // 计算日期
    for(let i = -6; i<=0; i++){
      const result = this.findDate(i)
      this.dateList.push(result) 
    }
    // 环形进度条
    var myChart = echarts.init(document.getElementById('circle1'));
      var e = (this.total / 8000) * 100
      myChart.setOption({
      // tooltip: {},
      legend: {
        orient: 'vertical',
        x: 'left',
        show:false
      },
      color: ["#fd6905","#e9e9e9"],
      series: [
        {
          name:'',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: true,
          hoverAnimation:false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:e, name:''},
            {value:100-e, name:''}
          ]
        }
      ]
    });
    // 条形统计图
    var myChart2 = echarts.init(document.getElementById('chartWrap'));
    var dataAxis = this.dateList;
    var data = [0.8, 1.2, 0.2, 1.7, 0.6, 2.3, 0.7];
    var yMax = 0;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    // 条形统计图配置
    myChart2.setOption({
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
    // 查看更多统计
    toMore() {
      this.$router.push({
        path: '/userCenter/myData/more'
      })
    },
    // 查看健康数据
    toDetail() {
      this.$messagebox({
        title: '提示',
        message: '抱歉，暂时没有数据！',
        showCancelButton: false,
        confirmButtonText: '知道了'
      });
      // this.$messagebox.alert("抱歉，暂时没有数据！");
    }
  }
}
</script>

<style lang="scss" scoped>
  .myData{
    width: 100%;
    min-height: 100vh;
    background: #fdfbfc;
    overflow: hidden;
    padding-bottom: 80px;
    .userBox{
      width: 100%;
      height: 70px;
      margin-top: 60px;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        float: left;
        margin-left: 17px;
      }
      .name{
        font-size: 23px;
        line-height: 70px;
        float: left;
        margin-left: 20px;
        color: #fff6e9;
      }
      .level{
        width: 40px;
        height: 20px;
        font-size: 14px;
        background: #fec602;
        color: #fffef9;
        line-height: 20px;
        text-align: center;
        float: left;
        margin-top: 25px;
        margin-left: 15px;
        border-radius: 10px;
      }
    }
    .bgBox{
      width: 100%;
      height: auto;
      background: url("../../../assets/originBg.png") no-repeat center;
      background-size: 100% 80%;
      background-position: 0 0;
      overflow: hidden;
      .topBox{
        width: 715px;
        height: 424px;
        background: #fff;
        margin: 0 auto;
        margin-top: 30px;
        border-radius: 18px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .top{
          width: 100%;
          height: 232px;
          border-bottom: 1px solid #efefef;
          position: relative;
          .peopleBox{
            width: 35px;
            height: 55px;
            float: right;
            background: url("../../../assets/people.png") no-repeat center;
            background-size: contain;
            position: absolute;
            top: 40%;
            right: 15%;
            z-index: 99;
          }
          .left{
            width: 60%;
            float: left;
            padding-left: 55px;
            padding-top: 40px;
            h6{
            font-size: 60px;
            line-height: 60px;
            color: #fb6801;
            }
            p{
              font-size: 22px;
              line-height: 40px;
              color: #969696;
            }
            p:nth-of-type(1){
              margin-top: 20px;
            }
          }
          .right{
            width: 220px;
            height: 220px;
            padding-top: 20px;
            padding-right: 30px;
            float: right;
          }
        }
        .bottom{
          width: 100%;
          height: 180px;
          div{
            width: 33%;
            height: 70px;
            float: left;
            text-align: center;
            margin-top: 50px;
            p{
              span{
                font-size: 18px;
                line-height: 24px;
                color: #302f30;
                font-weight: normal;
                padding-left: 5px;
              }
            }
            .p1{
              font-size: 22px;
              line-height: 22px;
              color: #8d888e;
            }
            .p2{
              font-size: 24px;
              line-height: 24px;
              font-weight: bold;
              color: #181b20;
              margin-top: 25px;
            }
          }
          div:nth-of-type(2){
            border-left: 2px solid #f1f1f1;
            border-right: 2px solid #f1f1f1;
          }
        }
      }
    }
    .cate{
      width: 100%;
      height: 86px;
      margin-top: 12px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .cateItem{
        width: 50%;
        height: 86px;
        float: left;
        line-height: 86px;
        text-align: center;
        color: #313131;
        background: #f2f2f2;
      }
      .activeCate{
        color: #209ed1;
        background: #fff;
      }
    }
    .wrap{
      width: 710px;
      height: 445px;
      margin: 0 auto;
      margin-top: 27px;
      background: #fff;
      position: relative;
      .more{
        width: 100px;
        height: 50px;
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 24px;
        color: #ababab;
        z-index: 99;
        span{
          padding-left: 10px;
        }
      }
      .chartWrap{
        width: 710px;
        height: 445px;
        border-radius: 18px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      }
    }
    .healthTitle{
      font-size: 27px;
      line-height: 90px;
      padding-left: 60px;
    }
    .healthData{
      width: 710px;
      height: 165px;
      padding: 0 20px;
      overflow-x: auto;
      white-space:nowrap;
      background: #fff;
      margin: 0 auto;
      border-radius: 18px;
      font-size: 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      li{
        width: 158px;
        height: 163px;
        display: inline-block;
        text-align: left;
        text-align: center;
        .iconBox{
          width: 74px;
          height: 74px;
          margin: 0 auto;
          margin-top: 25px;
          img{
            width: 74px;
            height: 74px;
          }
        }
        p{
          font-size: 26px;
          line-height: 26px;
          color: #3b3b3b;
          text-align: center;
          margin-top: 22px;
        }
      }
    }
  }
</style>
<style>
 .mint-msgbox{
   width: 70%;
 }
 .mint-msgbox-content{
   padding: 40px 0;
 }
 .mint-msgbox-title{
    font-size: 26px;
  }
 .mint-msgbox-message{
   font-size: 30px;
   color: rgb(122, 120, 120);
 }
 .mint-msgbox-btns{
   height: 80px;
 }
</style>