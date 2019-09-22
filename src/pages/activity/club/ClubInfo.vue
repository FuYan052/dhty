<template>
  <div class="clubInfo">
    <div class="top">
      <div class="clubLogo">
        <img :src="clubInfo.logo" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
      </div>
      <p>{{clubInfo.name}}</p>
    </div>
    <div class="join">
      <div class="joinBtn" @click="toJoin">申请加入社群</div>
    </div>
    <!-- 活动时刻表 -->
    <div class="activList">
      <div class="title">活动时刻表</div>
      <div class="title2">
        <span>星期</span>
        <span>活动时段</span>
        <span>场馆</span>
      </div>
      <ul>
        <li  v-for="(item,index) in activiList" :key="index">
          <div class="week">{{item.weekName}}</div>
          <div class="actItem" v-for="(it,ind) in item.sub" :key="ind">{{it.timeStart}}-{{it.timeEnd}}<span>{{it.name}}</span></div>
        </li>
      </ul>
    </div>
    <!-- 俱乐部简介 -->
    <div class="introd">
      <div class="title">俱乐部简介</div>
      <p>{{clubInfo.content}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ClubInfo',
  data() {
    return {
      clubInfo: '',
      activiList: [],  //群活动列表
      groupId: ''
    }
  },
  created() {
    // 群id
    // this.groupId = window.sessionStorage.getItem('groupDetailId')
    this.groupId = this.$route.params.id
    window.sessionStorage.setItem('groupDetailId',this.$route.params.id)
    // console.log(this.groupId)
    // 群详情
    this.$http.groupDetailInfo(this.groupId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.clubInfo = resp.data
        this.activiList = resp.data.oavoList
      }
    })
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  methods: {
    // 申请加入俱乐部
    toJoin() {
      // 判断是否登录
      const hasToken = localStorage.getItem('ty-token');
      if(hasToken) {
        const params = {
          groupId: this.groupId,
          userId: this.userId
        }
        this.$http.applyJoinGroup(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast({
            message: resp.info,
            duration: 2000
          });
          }
        })
      }else{
        this.$router.push({
          path: '/home'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .clubInfo{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .top{
      width: 100%;
      height: 250px;
      background:url("../../../assets/clubBg.png") no-repeat center;
      background-size: contain;
      border-bottom: 3px solid #06a182;
      overflow: hidden;
      .clubLogo{
        width: 115px;
        height: 115px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 32px;
        // img{
        //   width: 100%;
        //   height: 100%;
        //   border-radius: 50%;
        // }
      }
      p{
        color: #fff;
        font-size: 34px;
        margin-top: 28px;
        text-align: center;
      }
    }
    .member{
      width: 100%;
      height: 143px;
      background: #fff;
      margin-top: 10px;
      padding-left: 35px;
      padding-right: 65px;
      overflow: hidden;
      position: relative;
      border-bottom: 1px solid #f4f4f4;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
        margin: 40px 10px;
      }
      span{
        display: block;
        font-size: 28px;
        color: #b8b8b8;
        font-weight: bold;
        position: absolute;
        right: 25px;
        top: 58px;
      }
    }
    .member::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 46px;
    }
    .join{
      width: 100%;
      height: 160px;
      background: #fff;
      padding: 0 20px;
      padding-top: 35px;
      .joinBtn{
        width: 100%;
        height: 75px;
        background: #ff8d30;
        color: #fff;
        line-height: 75px;
        text-align: center;
        border-radius: 10px;
        font-size: 30px;
      }
    }
    .activList{
      width: 100%;
      height: auto;
      background: #fff;
      margin-top: 28px;
      padding: 0 20px;
      position: relative;
      .title{
        width: 100%;
        height: 85px;
        line-height: 110px;
        font-size: 30px;
        color: #767676;
        padding-left: 15px;
      }
      .title2{
        width: 100%;
        height: 60px;
        // border: 1px solid red;
        background: #f8f8f8;
        color: #272727;
        margin-top: 10px;
        // padding-top: 5px;
        span{
          display: inline-block;
          // border: 1px solid red;
          text-align: center;
          height: 60px;
          line-height: 60px;
          font-size: 26px;
        }
        span:nth-child(1){
          width: 135px;
        }
        span:nth-child(2){
          width: 200px;
          border-left: 1px solid #ececec;
          border-right: 1px solid #ececec;
        }
        span:nth-child(3){
          width: 330px;
        }
      }
      ul{
        width: 100%;
        height: auto;
        padding-bottom: 35px;
        li{
          width: 100%;
          min-height: 100px;
          border-top: 1px solid #f2f2f2;
          .week{
            width: 68px;
            height: 40px;
            line-height: 36px;
            text-align: center;
            font-size: 25px;
            color: #54a596;
            border: 1px solid #a3c7bd;
            border-radius: 10px;
            float: left;
            margin-top: 27px;
            margin-left: 30px;
          }
          .actItem{
            width: 580px;
            height: 99px;
            line-height: 96px;
            margin-left: 130px;
            border-top: 1px dashed #e7e7e7;
            font-size: 25px;
            padding-left: 40px;
            span{
              display: block;
              width: 350px;
              height: 96px;
              float: right;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
          }
          .actItem:nth-of-type(2){
            border-top: none;
          }
        }
      }
    }
    .activList::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 30px;
    }
    .introd{
      width: 100%;
      min-height: 370px;
      background: #fff;
      margin-top: 20px;
      position: relative;
      padding: 0 20px;
      padding-bottom: 40px;
      .title{
        width: 100%;
        height: 60px;
        line-height: 110px;
        font-size: 30px;
        color: #767676;
        padding-left: 15px;
      }
      p{
        line-height: 42px;
        margin-top: 30px;
      }
      img{
        width: 150px;
        height: 150px;
        margin-top: 25px;
      }
    }
    .introd::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 30px;
    }
  }
</style>
