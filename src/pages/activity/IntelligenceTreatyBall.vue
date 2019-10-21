<template>
  <!-- 智能约球 -->
  <div class="intelligenceTreatyBall" v-title data-title="智能约球">
    <!-- 日期 -->
    <div class="dateCate">
      <div class="wrap">
        <div class="date" 
        v-for="(item,index) in dateCateList" 
        :key="index"
        @click="changeDateCate(index)"
        :class="{currDate: currIndex === index}"
        >{{item}}</div>
      </div>
    </div>
    <!-- 活动列表 -->
    <ul class="activeList">
      <li v-for="(item,index) in 3" :key="index">
        <div class="topBox">
          <!-- 标题 -->
          <div class="title">
            <p>智能群主A01—中高级</p>
            <span class="el-icon-arrow-right"></span>
          </div>
          <!-- 时间 -->
          <div class="dateTime">
            9月20日
            <span class="timeRange">13:00-15:00</span>
            <span class="distance">1.9km</span>
            <span></span>
          </div>
          <!-- 场地 -->
          <div class="place">
            波力羽毛球馆<span>￥<b>20</b>/人</span>
          </div>
          <!-- 规则 -->
          <div class="ruler">
            <div class="wrap1">LI-NING&nbsp;&nbsp;A6(来虎专用球)</div>
            <div class="wrap2">临时领队</div>
            <div class="wrap3">规则</div>
          </div>
          <!-- 正在报名 -->
          <div class="signUp">
            <div class="imgBox">
              <div class="imgItem" v-for="(it,ind) in 6" :key="ind">
                <img src="../../assets/touxiang.jpg" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
              </div>
            </div>
            <div class="peopleNUm">15/20</div>
            <div class="signUpBtn" :class="'currbtnBg' + index">正在报名</div>
          </div>
        </div>
        <div class="bottom">
          <ul class="muneList">
            <li>客服</li>
            <li>聚会</li>
            <li>装备</li>
            <li>活动</li>
          </ul>
        </div>
        <div class="bottomBg"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IntelligenceTreatyBall',
  data() {
    return {
      dateCateList: ['今天','明天'],
      currIndex: 0,
    }
  },
  methods: {
    changeDateCate(index) {
      this.currIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .intelligenceTreatyBall{
    width: 100%;
    min-height: 100vh;
    background: #f4f4f4;
    padding-top: 112px;
    .dateCate{
      width: 100%;
      height: 112px;
      background: #f4f4f4;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      .wrap{
        width: 158px;
        height: 112px;
        margin: 0 auto;
        .date{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          line-height: 60px;
          text-align: center;
          float: left;
          color: #000;
          font-size: 25px;
          margin-top: 16px;
        }
      }
      .date:nth-of-type(2){
        float: right;
      }
      .currDate{
        background: #ffb200;
        color: #fff;
        position: relative;
      }
      .currDate::before{
        content: '';
        display: block;
        width: 60px;
        height: 15px;
        position: absolute;
        bottom: -15px;
        left: 0;
        background: url('../../assets/yelloCircle.png') no-repeat center bottom;
        background-size: auto 60%;
      }
    }
    .activeList{
      width: 100%;
      height: auto;
      padding: 0 34px;
      margin-top: 10px;
      li{
        width: 100%;
        height: 492px;
        margin-bottom: 22px;
        position: relative;
        .topBox{
          width: 100%;
          height: 406px;
          border-radius: 20px;
          padding: 0 30px;
          padding-top: 17px;
          background: url('../../assets/actItemBg.png') no-repeat center;
          background-size: 100% 100%;
          position: relative;
          z-index: 9;
          .title{
            width: 100%;
            height: 68px;
            border-bottom: 1px solid #525251;
            position: relative;
            p{
              width: 94%;
              height: 68px;
              line-height: 68px;
              color: #fff;
              font-size: 32px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            span{
              display: block;
              color: #b7b7b7;
              width: 50px;
              height: 68px;
              font-size: 32px;
              text-align: right;
              line-height: 68px;
              position: absolute;
              top: 0;
              right: -6px;
            }
          }
          .dateTime{
            width: 100%;
            height: 44px;
            line-height: 44px;
            font-size: 26px;
            color: #eceaea;
            margin-top: 30px;
            .timeRange{
              padding-left: 30px;
            }
            .distance{
              float: right;
              color: #e0dfdf;
            }
          }
          .place{
            width: 100%;
            height: 82px;
            line-height: 82px;
            color: #eceaea;
            font-size: 26px;
            span{
              padding-left: 30px;
              color: #ffaf01;
              font-size: 24px;
              b{
                font-weight: bold;
                font-size: 32px;
              }
            }
          }
          .ruler{
            width: 100%;
            height: 68px;
            padding-bottom: 6px;
            line-height: 62px;
            font-size: 26px;
            color: #eceaea;
            border-bottom: 1px solid #525251;
            .wrap1{
              width: 356px;
              float: left;
            }
            .wrap2{
              width: 172px;
              float: left;
              padding-left: 32px;
              background: url('../../assets/badmintonIcon.png') no-repeat left center;
              background-size: 28px auto;
            }
            .wrap3{
              float: right;
              padding-left: 36px;
              background: url('../../assets/ruleIcon.png') no-repeat left center;
              background-size: 30px auto;
            }
          }
          .signUp{
            width: 100%;
            height: 96px;
            padding-left: 5px;
            .imgBox{
              width: 346px;
              height: 44px;
              float: left;
              margin-top: 25px;
              padding-left: 23px;
              padding-right: 35px;
              overflow: hidden;
              .imgItem{
                width: 44px;
                height: 44px;
                border: 1px solid #fff;
                border-radius: 50%;
                float: left;
                margin-left: -23px;
              }
            }
            .peopleNUm{
              width: 102px;
              height: 96px;
              line-height: 96px;
              color: #e0dede;
              float: left;
            }
            .signUpBtn{
              width: 164px;
              height: 68px;
              border-radius: 8px;
              float: right;
              text-align: center;
              line-height: 66px;
              color: #fff;
              font-style: 30px;
              margin-top: 15px;
              background: url('../../assets/btnBg1.png') no-repeat center;
              background-size: 100% 100%;
            }
            .currbtnBg0{
              background: url('../../assets/btnBg1.png') no-repeat center;
              background-size: 100% 100%;
            }
            .currbtnBg1{
              background: url('../../assets/btnBg2.png') no-repeat center;
              background-size: 100% 100%;
            }
            .currbtnBg2{
              background: url('../../assets/btnBg3.png') no-repeat center;
              background-size: 100% 100%;
            }
          }
        }
        .bottom{
          width: 96%;
          height: 100px;
          margin: 0 auto;
          margin-top: -22px;
          border-radius: 20px;
          background: url('../../assets/bottomBg.png') no-repeat center;
          background-size: 100% auto;
          position: relative;
          z-index: 5;
          .muneList{
            width: 100%;
            height: 72px;
            position: absolute;
            left: 0;
            bottom: 2px;
            li{
              width: 25%;
              height: 72px;
              padding-left: 40px;
              float: left;
              color: #e4e3e3;
              line-height: 72px;
              text-align: center;
              font-size: 28px;
            }
            li:nth-of-type(1){
              background: url('../../assets/menuIcon1.png') no-repeat left center;
              background-size: 34px 34px;
              background-position: 34px 21px;
            }
            li:nth-of-type(2){
              background: url('../../assets/menuIcon2.png') no-repeat left center;
              background-size: 34px 34px;
              background-position: 34px 21px;
            }
            li:nth-of-type(3){
              background: url('../../assets/menuIcon3.png') no-repeat left center;
              background-size: 34px 34px;
              background-position: 34px 21px;
            }
            li:nth-of-type(4){
              background: url('../../assets/menuIcon4.png') no-repeat left center;
              background-size: 34px 34px;
              background-position: 34px 21px;
            }
          }
        }
        .bottomBg{
          width: 92%;
          height: 40px;
          border-radius: 15px;
          position: absolute;
          left: 4%;
          bottom: 0px;
          background: #c2c1c1;
        }
      }
    }
  }
</style>