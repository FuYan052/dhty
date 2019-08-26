<template>
  <!-- 场馆详情 -->
  <div class="playgroundDetail" v-title data-title="场馆详情">
    <div class="topImg">
      <img :src="playgroundInfo.image" alt="">
    </div>
    <div class="wrap1">
      <div class="title">
        {{playgroundInfo.name}}
        <span>
          <img src="../../assets/crown.png" alt="">
        </span>
      </div>
      <!-- 地址 -->
      <div class="address">
        <div class="left">
          {{playgroundInfo.address}}
        </div>
        <div class="right" @click="toMap(playgroundInfo.lat,playgroundInfo.lon)">
          <span class="el-icon-map-location"></span>
          <p>地图/导航</p>
        </div>
      </div>
    </div>
    <!-- 开放时间 -->
    <div class="wrap2">
      <p>开放时间：{{playgroundInfo.time}}</p>
      <p>费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用：{{playgroundInfo.cost}}元/人</p>
    </div>
    <!-- 活动 -->
    <div class="wrap3">
      <p class="title">活动</p>
      <div class="actItem" v-for="(item,index) in actiList" :key="index" @click="toActDetail">
        <img :src="playgroundInfo.image" alt="">
        <div class="right">
          <p class="p1">{{item.title}}</p>
          <p class="p2">{{item.groupName}}<span></span></p>
        </div>
      </div>
    </div>
    <!-- 立即联系 -->
    <a class="contact" :href="'tel:' + playgroundInfo.userPhone">立即联系</a>
  </div>
</template>

<script>
export default {
  name: 'PlaygroundDetail',
  data() {
    return {
      id: '',
      playgroundInfo: '',
      actiList: []
    }
  },
  created() {
    // 获取场馆id
    this.id = window.sessionStorage.getItem("playGroundDetail")

    // 获取场馆详情
    this.$http.getPlaygroundDetail(this.id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.playgroundInfo = resp.data
        this.actiList = this.playgroundInfo.venueActivitiesVoList
      }
      console.log(this.playgroundInfo)
    })
  },
  methods: {
    toMap(lat,lon) {
      const location = {
        lat: lat,
        lng: lon
      }
      this.$router.push({
        path: '/mapPage',
        name: 'MapPage',
        params: location
      })
      window.sessionStorage.setItem('location',JSON.stringify(location))
    },
    toActDetail() {
       this.$router.push({
        path: '/activityDetail',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .playgroundDetail{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 50px;
    .topImg{
      width: 100%;
      height: 440px;
      img{
        width: 100%;
        height: 440px;
      }
    }
    .wrap1{
      width: 100%;
      height: 225px;
      background: #fff;
      .title{
        width: 100%;
        height: 96px;
        line-height: 96px;
        padding-left: 30px;
        color: #161616;
        span{
          display: inline-block;
          width: 30px;
          height: 30px;
          padding-left: 15px;
          img{
            width: 30px;
            height: 30px;
            float: left;
          }
        }
      }
      .address{
        width: 100%;
        height: 125px;
        .left{
          width: 460px;
          height: 125px;
          padding-left: 30px;
          padding-top: 5px;
          float: left;
          font-size: 24px;
          line-height: 38px;
          color: #151515;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .right{
          width: 200px;
          height: 70px;
          float: right;
          margin-top: 30px;
          border-left: 1px solid #eae8e8;
          padding-left: 20px;
          span{
            display: inline-block;
            width: 100%;
            font-size: 32px;
            color: #259fe2;
            text-align: center;
          }
          p{
            font-size: 20px;
            line-height: 20px;
            color: #259fe2;
            text-align: center;
          }
        }
      }
    }
    .wrap2{
      width: 100%;
      height: 165px;
      background: #fff;
      margin-top: 22px;
      padding-top: 20px;
      p{
        font-size: 26px;
        color: #595959;
        line-height: 60px;
        padding-left: 30px;
      }
    }
    .wrap3{
      width: 100%;
      min-height: 260px;
      background: #fff;
      margin-top: 22px;
      padding: 0 25px;
      .title{
        font-size: 26px;
        color: #141414;
        line-height: 26px;
        padding-top: 30px;
      }
      .actItem{
        width: 100%;
        height: 200px;
        border-bottom: 1px solid #e7e7e7;
        img{
          width: 180px;
          height: 112px;
          float: left;
          margin-top: 44px;
        }
        .right{
          width: 490px;
          height: 112px;
          float: right;
          margin-top: 44px;
          .p1{
            width: 100%;
            font-size: 24px;
            color: #151515;
            line-height: 24px;
            margin-top: 15px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .p2{
            font-size: 20px;
            color: #5b5b5b;
            line-height: 20px;
            margin-top: 38px;
            span{
              float: right;
            }
          }
        }
      }
    }
    .contact{
      display: block;
      width: 590px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-size: 30px;
      background: #29cb90;
      margin: 0 auto;
      margin-top: 50px;
      border-radius: 50px;
    }
  }
</style>
