<template>
  <!-- 我的数据 -->
  <div class="myData" v-title data-title="我的数据">
    <div class="topBox">
       <div class="top">
         <div class="left">
           <h6>8901.2</h6>
           <p>运动0分，消耗0千卡</p>
           <p>距离达成目标还差8000步</p>
         </div>
         <div class="right" ref="circle" id="circle1">
           
         </div>
       </div>
       <div class="bottom">
         <div>
           <p class="p1">运动时间</p>
           <p class="p2">1705.95</p>
         </div>
         <div>
           <p class="p1">运动步数</p>
           <p class="p2">4800.00</p>
         </div>
         <div>
           <p class="p1">消耗卡路里</p>
           <p class="p2">13</p>
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
    <div class="chartWrap">

    </div>
    <!-- 健康数据 -->
    <p class="healthTitle">健康数据</p>
    <ul class="healthData">
      <li>
        <div class="iconBox">
          <img src="../../../assets/shuimian.png" alt="">
        </div>
        <p>睡眠</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/tizhong.png" alt="">
        </div>
        <p>体重</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/xueya.png" alt="">
        </div>
        <p>压力</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/xinlv.png" alt="">
        </div>
        <p>心率</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/tizhong.png" alt="">
        </div>
        <p>血氧饱和度</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/shuimian.png" alt="">
        </div>
        <p>血压</p>
      </li>
      <li>
        <div class="iconBox">
          <img src="../../../assets/xinlv.png" alt="">
        </div>
        <p>血糖</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyData',
  data() {
    return {
      cateList: ['跑步','羽毛球'],
      currIndex: 0,
    }
  },
  mounted() {
    
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
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
    .topBox{
      width: 715px;
      height: 424px;
      background: #fff;
      margin: 0 auto;
      margin-top: 214px;
      border-radius: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .top{
        width: 100%;
        height: 232px;
        border-bottom: 1px solid #efefef;
        padding: 0 55px;
        padding-top: 40px;
        .left{
          width: 70%;
          float: left;
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
          width: 130px;
          height: 130px;
          float: right;
          border: 1px solid red;
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
          .p1{
            font-size: 22px;
            line-height: 22px;
            color: #8d888e;
          }
          .p2{
            font-size: 22px;
            line-height: 22px;
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
    .chartWrap{
      width: 710px;
      height: 445px;
      margin: 0 auto;
      border-radius: 18px;
      margin-top: 27px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
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
