<template>
  <!-- ta的运动数据 -->
  <div class="motionData" v-title data-title="运动参数">
    <div class="cate">
      <div class="cateItem" 
        v-for="(item,index) in cateList" 
        :key="index"
        :class="{activeCate : currIndex === index}"
        @click="changeCate(item,index)"
        > 
        {{item.name}}
      </div>
    </div>
    <div class="top">
      <div class="data1">
        <div class="title">
          <div class="icon"></div>
          <p class="titleText">{{currtitle.title1}}</p>
        </div>
        <p class="value1">{{dataInfo.totalTime}}<span>分钟</span></p>
        <p class="total">累计消耗</p>
        <p class="value1_2">{{dataInfo.cumulativeConsumption}}<span>千卡</span></p>
      </div>
      <div class="right">
        <div class="data_sm data2">
          <div class="title">
            <div class="icon"></div>
            <p class="titleText">{{currtitle.title2}}</p>
          </div>
          <p v-show="!isRun" class="value_sm">{{dataInfo.maximum}}<span>公里/小时</span></p>
          <p v-show="isRun" class="value_sm">{{dataInfo.bestPace}}</p>
          <!-- <p v-show="isRun" class="value_sm">3′48″</p> -->
        </div>
        <div class="data_sm data3">
          <div class="title">
            <div class="icon"></div>
            <p class="titleText">{{currtitle.title3}}</p>
          </div>
          <p v-show="!isRun" class="value_sm">{{dataInfo.heartRate}}<span>次/分钟</span></p>
          <p v-show="isRun" class="value_sm">{{dataInfo.averageSpeed}}</p>
          <!-- <p v-show="isRun" class="value_sm">5′49″</p> -->
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="data_sm data4">
        <div class="title">
          <div class="icon"></div>
          <p class="titleText">{{currtitle.title4}}</p>
        </div>
        <p v-show="!isRun" class="value_sm">{{dataInfo.totalNumber}}<span>场</span></p>
        <p v-show="isRun" class="value_sm">{{dataInfo.cumulatiVemileage}}<span>千米</span></p>
      </div>
      <div class="data_sm data5">
        <div class="title">
          <div class="icon"></div>
          <p class="titleText">{{currtitle.title5}}</p>
        </div>
        <p v-show="!isRun" class="value_sm _empty">暂无</p>
        <p v-show="isRun" class="value_sm">{{dataInfo.averageFrequency}}<span>步/分钟</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MotionData',
  data() {
    return {
      cateList: [],
      currIndex: 0,
      dataInfo: '',
      badmintonDataTitle:{
        title1: '运动总时长',
        title2: '最大挥拍速度',
        title3: '心率',
        title4: '参加总场次',
        title5: '胜率',
      },
      runDataTitle:{
        title1: '跑步总时长',
        title2: '最佳配速',
        title3: '平均配速',
        title4: '累计里程',
        title5: '平均步频',
      },
      currtitle:'',
      isRun: false
    }
  },
  created() {
    // 获取活动类型
    this.$http.findDictList('sportsKinds').then(resp => {
      // console.log(resp)
      if(resp.status == 200) {
        this.cateList = resp.data

        const params = {
          id: window.sessionStorage.getItem('userInfoId'),
          type: this.cateList[0].skey
        }
        // 运动参数
        this.$http.motionParameters(params).then(resp => {
          // console.log(resp)
          if(resp.status == 200){
            this.dataInfo = resp.data[0]
            console.log(this.dataInfo)
          }else{
            this.$toast('获取数据失败！')
          }
        })
      }else{
        this.$toast('获取分类失败！')
      }
    })

    this.currtitle = this.badmintonDataTitle
    
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
      if(index === 0) {
        this.currtitle = this.badmintonDataTitle
        this.isRun = false
      }
      if(index === 1) {
        this.currtitle = this.runDataTitle
        this.isRun = true
      }
      const params = {
        id: window.sessionStorage.getItem('userInfoId'),
        type: item.skey
      }
      // 运动参数
      this.$http.motionParameters(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200){
          this.dataInfo = resp.data[0]
          console.log(this.dataInfo)
        }else{
          this.$toast('获取数据失败！')
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .motionData{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cate{
      width: 100%;
      height: 86px;
      background: #fff;
      padding: 0 50px;
      border-bottom: 1px solid #f5f5f5;
      .cateItem{
        width: 50%;
        height: 86px;
        float: left;
        line-height: 86px;
        text-align: center;
        color: #838383;
        position: relative;
      }
      .activeCate{
        color: #000;
      }
      .activeCate::before{
        display: block;
        content: '';
        width: 48px;
        height: 3px;
        background: #22a1f2;
        position: absolute;
        bottom: 1px;
        left: 42.5%;
      }
    }
    .data_sm{
      width: 334px;
      height: 205px;
      background: #fff;
      border-radius: 20px;
      padding-left: 27px;
      padding-top: 30px;
      .title{
        width: 100%;
        height: 50px;
        .icon{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          float: left;
          background: #f8fcfb;
        }
        p{
          float: left;
          line-height: 50px;
          margin-left: 22px;
          font-size: 24px;
        }
      }
      .value_sm{
        font-size: 36px;
        line-height: 36px;
        color: #252525;
        font-weight: bold;
        margin-top: 58px;
        span{
          font-size: 22px;
          padding-left: 20px;
          font-weight: normal;
          color: #616161;
        }
      }
      ._empty{
        font-size: 22px;
        padding-left: 20px;
        font-weight: normal;
        color: #616161;
      }
    }
    .top{
      width: 100%;
      height: 440px;
      margin-top: 47px;
      padding: 0 28px;
      .data1{
        width: 334px;
        height: 440px;
        float: left;
        background: #91b9f7;
        color: #fff;
        border-radius: 20px;
        padding-left: 27px;
        padding-top: 30px;
        .title{
          width: 100%;
          height: 50px;
          .icon{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            float: left;
            background: url("../../../../assets/icon1.png") no-repeat center;
            background-size: contain;
          }
          p{
            float: left;
            line-height: 50px;
            margin-left: 22px;
            font-size: 24px;
          }
        }
        .value1{
          font-size: 48px;
          line-height: 50px;
          font-weight: bold;
          margin-top: 60px;
          span{
            font-size: 22px;
            padding-left: 20px;
            font-weight: normal;
          }
        }
        .total{
          font-size: 24px;
          line-height: 24px;
          margin-top: 90px;
        }
        .value1_2{
          font-size: 38px;
          line-height: 40px;
          font-weight: bold;
          margin-top: 50px;
          span{
            font-size: 22px;
            padding-left: 20px;
            font-weight: normal;
          }
        }
      }
      .right{
        width: 334px;
        height: 440px;
        float: right;
        .data2{
          .title{
            .icon{
              background: url("../../../../assets/icon2.png") no-repeat center;
              background-size: contain;
            }
          }
        }
        .data3{
          margin-top: 30px;
          .title{
            .icon{
              background: url("../../../../assets/icon3.png") no-repeat center;
              background-size: contain;
            }
          }
        }
      }
    }
    .bottom{
      width: 100%;
      height: 205px;
      margin-top: 25px;
      padding: 0 28px;
      .data4{
        float: left;
        .title{
          .icon{
            background: url("../../../../assets/icon4.png") no-repeat center;
              background-size: contain;
          }
        }
      }
      .data5{
        float: right;
        .title{
          .icon{
            background: url("../../../../assets/icon5.png") no-repeat center;
              background-size: contain;
          }
        }
      }
    }
  }
</style>