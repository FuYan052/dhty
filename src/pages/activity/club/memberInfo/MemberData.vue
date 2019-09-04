<template>
  <div class="memberData" v-title data-title="Ta人资料">
    <div class="topBox">
      <img :src="infoData.image" alt="">
      <div class="right">
        <p class="name">{{infoData.nickName}}<span>{{infoData.region}}&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;{{infoData.sex}}</span></p>
        <div class="dj">Lv.{{infoData.level}}</div>
      </div>
    </div>
    <div class="labelBox">
      <div class="itemLabel" v-for="(item,index) in labelList" :key="index">
        {{item.name}}
      </div>
    </div>
    <ul class="menu">
      <li @click="toGroupList">所属社群<span class="el-icon-arrow-right"></span></li>
      <li @click="toOrgActivies" >组织的活动<span class="el-icon-arrow-right"></span></li>
      <li @click="toAttendedActivies" >ta参加过的活动<span class="el-icon-arrow-right"></span></li>
      <li @click="toMotionData" >ta的运动参数<span class="el-icon-arrow-right"></span></li>
    </ul>
    <!-- ta的装备 -->
    <div class="equipment">
      <p class="title">ta的装备<span class="el-icon-arrow-right"></span></p>
      <ul class="equListBox">
        <li v-for="(item,index) in 6" :key="index">
          <img src="../../../../assets/touxiang.jpg" alt="">
        </li>
      </ul>
      <div class="buyUrl">
        <img src="../../../../assets/touxiang.jpg" alt="">
        <div class="_right">
          <p class="_title">实用的实用的实用的实用的用的实用的</p>
          <p class="price"><span class="span1">￥</span>5190<span class="span2">￥8190</span></p>
        </div>
        <div class="moreBtn"><span class="el-icon-arrow-right"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberData',
  data() {
    return {
      infoData: '',
      labelList: [],
      userInfoId: ''
    }
  },
  created() {
    this.userInfoId = window.sessionStorage.getItem('userInfoId')
    // ta人资料
    this.$http.informationOthers(this.userInfoId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.infoData = resp.data
        this.labelList = resp.data.labelVoList
      }
    })
  },
  methods: {
    toGroupList() {
      this.$router.push({
        path: '/club/member/attendGroupList'
      })
    },
    toOrgActivies() {
      this.$router.push({
        path: '/club/member/organActivies'
      })
    },
    toAttendedActivies() {
      this.$router.push({
        path: '/club/member/attendedActivies'
      })
    },
    toMotionData() {
      this.$router.push({
        path: '/club/member/motionData'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberData{
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
    .topBox{
      width: 100%;
      height: 215px;
      background: #fff;
      img{
        width: 145px;
        height: 145px;
        border-radius: 50%;
        float: left;
        margin-top: 35px;
        margin-left: 25px;
      }
      .right{
        width: 550px;
        height: 130px;
        float: right;
        // border: 1px solid red;
        margin-top: 65px;
        .name{
          width: 100%;
          padding-right: 45px;
          font-size: 33px;
          color: #373737;
          line-height: 33px;
          span{
            font-size: 20px;
            line-height: 33px;
            color: #545454;
            float: right;
            b{
              color: #b6b6b6;
              font-weight: normal;
            }
          }
        }
        .dj{
          width: 130px;
          height: 40px;
          padding-left: 15px;
          margin-left: 10px;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          margin-top: 30px;
          background: #7974d2;
          border-radius: 20px;
          position: relative;
        }
        .dj::before{
          content: '';
          display: block;
          width: 42px;
          height: 48px;
          position: absolute;
          top: -4px;
          left: -12px;
          z-index: 9;
          background: url("../../../../assets/level.png") no-repeat center;
          background-size: contain;
        }
      }
    }
    .labelBox{
      width: 100%;
      min-height: 20px;
      // min-height: 180px;
      background: #fff;
      margin-top: 1px;
      padding-top: 20px;
      .itemLabel{
        display: inline-block;
        width: 135px;
        height: 48px;
        line-height: 46px;
        text-align: center;
        border-radius: 25px;
        text-align: center;
        font-size: 22px;
        color: #272727;
        border: 1px solid #313131;
        margin-left: 40px;
        margin-bottom: 30px;
        background: #fff;
      }
    }
    .menu{
      width: 100%;
      min-height: 418px;
      li{
        width: 100%;
        height: 84px;
        background: #fff;
        margin-top: 20px;
        line-height: 84px;
        padding-left: 55px;
        padding-right: 50px;
        color: #282828;
        span{
          color: #a3a3a3;
          float: right;
          line-height: 84px;
          font-size: 27px;
          font-weight: bold;
        }
      }
    }
    .equipment{
      width: 100%;
      height: 500px;
      background: #fff;
      .title{
        width: 100%;
        height: 84px;
        background: #fff;
        line-height: 84px;
        padding-left: 55px;
        padding-right: 50px;
        color: #282828;
        span{
          color: #a3a3a3;
          float: right;
          line-height: 84px;
          font-size: 27px;
          font-weight: bold;
        }
      }
      .equListBox{
        width: 87.3%;
        height: 225px;
        margin: 0 auto;
        overflow-x: auto;
        white-space:nowrap;
        // border: 1px solid red;
        font-size: 0;
        li{
          width: 215px;
          height: 215px;
          display: inline-block;
          margin-left: 5px;
          text-align: left;
          img{
            width: 215px;
            height: 215px;
            border-radius: 15px;
          }
        }
        li:nth-child(1){
          margin-left: 0px;
        }
      }
      .buyUrl{
        width: 490px;
        height: 86px;
        background: #f9f9f9;
        margin-left: 57px;
        margin-top: 20px;
        border-radius: 10px;
        position: relative;
        img{
          width: 60px;
          height: 60px;
          float: left;
          margin-top: 12px;
          margin-left: 25px;
          border-radius: 5px;
        }
        ._right{
          width: 380px;
          height: 86px;
          float: right;
          padding-right: 12px;
          ._title{
            width: 306px;
            line-height: 50px;
            font-size: 22px;
            color: #727272;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .price{
            font-size: 22px;
            font-weight: bold;
            color: #f53930;
            line-height: 30px;
            .span1{
              font-size: 18px;
            }
            .span2{
              font-size: 18px;
              color: #a2a2a4;
              text-decoration: line-through;
              padding-left: 10px;
            }
          }
        }
        .moreBtn{
          width: 30px;
          height: 30px;
          background: #b9b8b8;
          color: #fff;
          font-size: 20px;
          line-height: 30px;
          border-radius: 50%;
          text-align: center;
          position: absolute;
          right: 12px;
          top: 25px;
        }
      }
    }
  }
</style>