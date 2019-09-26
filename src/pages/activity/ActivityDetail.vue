<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <div class="topTitle">
      <p class="p1">活动主题：</p>
      <p class="p2">{{theDetail.title}}</p>
    </div>
    <!-- 俱乐部 -->
    <div class="clubBox" @click="toClub">
      <div class="imgWrap">
        <img :src="imgurl" style="width: 100%; hight: 100% border-radius: 5px;" alt="">
      </div>
      <div class="text">
        {{theDetail.groupName}}
      </div>
      <div class="spanBox"><span class="span2 el-icon-arrow-right"></span></div>
    </div>
    <ul>
      <li>
        <span class="span1">活动时间：</span>{{theDetail.time}}&nbsp;&nbsp;{{theDetail.timeStart}}-{{theDetail.timeEnd}}
      </li>
      <li>
        <span class="span1">报名费用：</span>￥{{theDetail.cost}}
      </li>
      <li>
        <span class="span1">活动地点：</span>{{theDetail.venueName}}<span class="span2 spanLocat el-icon-location-information" @click="toMap"></span>
      </li>
      <li>
        <span class="span1">组&nbsp;&nbsp;织&nbsp;&nbsp;者：</span>{{theDetail.phone}}({{theDetail.nickName}})<a :href="'tel:' + theDetail.phone"><span class="span2 el-icon-phone-outline"></span></a>
      </li>
      <!-- <li>
        <span class="span1">俱&nbsp;&nbsp;乐&nbsp;&nbsp;部：</span>{{theDetail.groupName}}<span class="span2 el-icon-house" @click="toClub"></span>
      </li> -->
      <li>
        <span class="span1">报名人数：</span>{{peopleLength}}/{{theDetail.people}}
      </li>
      <li class="list" @click="toList">
        <span class="span1">已&nbsp;&nbsp;报&nbsp;&nbsp;名：</span><span class="span2 el-icon-arrow-right"></span>
        <div class="imgBox">
          <div class="imgitem" v-for="(it,ind) in theDetail.enrolledVoList" :key="ind" >
            <img :src="it.image" style="width: 100%; height: 100%; float: left; border-radius: 50%;" alt="">
          </div>
        </div>
      </li>
    </ul>
    <!-- 活动描述 -->
    <div class="descr">
      <div class="tiltle">
        活动详情：
      </div>
      <div class="text">
        {{theDetail.content}}
      </div>
    </div>
    <!-- 报名截止 -->
    <div class="time">
      <p class="p1">报名截止还有：<span>{{content}}</span></p>
      <div class="p2">
        <div class="checkbox" @click="checked" :class="{checked:isChecked}"><span v-show="isChecked" class="span1 el-icon-check"></span></div>
        <div class="span2">我已阅读并同意<span class="span3" @click="toEscapeClause">《免责条款》</span></div>
      </div>
      <el-button @click="submit">立即报名</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDetail',
  data() {
    return {
      theDetail: '',
      imgurl: '',
      lat: '',
      lon: '',
      groupId: '',
      peopleLength: '',  //已报名人数
      isChecked: false,  //是否勾选免责条款
      disabled: false,  //报名按钮是否能点击
      content: '',  //倒计时内容
      endTime: '',
      isTosignUp: '',
      state: ''  //后端传过来为2时，则表示人员已满，不能报名
    }
  },
  created() {
    const activityDetailId = window.sessionStorage.getItem('activityDetailId')
    this.$http.activitiesDetail(activityDetailId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.theDetail = resp.data
        this.lat = resp.data.lat
        this.lon = resp.data.lon
        this.state = resp.data.state
        this.peopleLength = resp.data.enrolledVoList.length
        this.groupId = resp.data.groupId
        this.imgurl = resp.data.image
        this.endTime = (new Date(resp.data.endTime.replace(/-/g,'/')).getTime()) / 1000
        this.countdowm(this.endTime) //执行倒计时函数
      }
    })
    // console.log(this.content)
    // console.log(this.isTosignUp)
  },
  methods: {
    // 免责条款
    toEscapeClause() {
      this.$router.push({
        path: '/escapeClause'
      })
    },
    toMap() {
      const location = {
        lat: this.lat,
        lng: this.lon
      }
      this.$router.push({
        path: '/mapPage',
        name: 'MapPage',
        params: location
      })
      window.sessionStorage.setItem('location',JSON.stringify(location))
    },
    toClub() {
      window.sessionStorage.setItem("groupDetailId",this.groupId)
      this.$router.push({
        path: `/club/clubInfo/${this.groupId}`,
      })
    },
    // 报名列表
    toList() {
      this.$router.push({
        path: '/signUpList',
      })
    },
    checked() {
      this.isChecked = !this.isChecked
      // console.log(this.isChecked)
    },
    submit() {
      console.log(this.isTosignUp)
      if(this.state == 2) {
        this.$toast({
          message: '抱歉，人员已满！',
          duration: 2000
        });
      }else{
        if(this.isTosignUp && this.state !== 2) {
          if(this.isChecked) {
            // this.$router.push({
            //   path: '/activitySignUp'
            // })
            const redirectUrl = encodeURIComponent(`https://laihu.baogongxia.com/#/activitySignUp`)
            // const appid = 'wxf1894ca38c849d17'  //测试号
            const appid = 'wxd3d4d3045a1213a1'  
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state='1'#wechat_redirect`
          }else{
            this.$toast({
              message: '未同意《免责条款》！',
              duration: 2000
            });
          }
        }else{
          this.$toast({
            message: '报名已结束！',
            duration: 2000
          });
        }
      }
    },
    // 倒计时
    countdowm(timestamp) {
      console.log(timestamp)
      let self = this
      let timer = setInterval(function() {
        let nowTime = new Date();
        // let endTime = new Date(timestamp * 1000);
        let endTime = timestamp * 1000;
        // console.log(endTime)
        let t = endTime - nowTime.getTime();
        if(t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          if(day > 0){
            format = `${day}天${hour}小时${min}分${sec}秒`;
          } 
          if(day <= 0 && hour > 0 ){
            format = `${hour}小时${min}分${sec}秒`; 
          }
          if(day <= 0 && hour <= 0){
            format =`${min}分${sec}秒`;
          }
          self.content = format;
          self.isTosignUp = true
        } else{
          self.isTosignUp = false
          clearInterval(timer);
          self.content = '报名结束';
          self._callback();
        }
        // if(self.content == '') {
        //   self.content = '报名结束'
        // }
      },1000)
    },
    _callback(){
      if(this.callback && this.callback instanceof Function){
        console.log(...this)
        this.callback(...this);
      }
    }
  }
}
</script>  

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 210px;
    .topTitle{
      width: 100%;
      min-height: 180px;
      background: #fff;
      // border-bottom: 1px solid #dfdfdf;
      overflow: hidden;
      padding: 0 35px;
      .p1{
        width: 100%;
        color: #000;
        font-size: 28px;
        line-height: 60px ;
        // font-weight: bold;
      }
      .p2{
        font-size: 32px;
        color: #ffa302;
        // float: right;
        line-height: 42px;
        padding-left: 115px;
      }
    }
    .clubBox{
      width: 100%;
      height: 120px;
      background: #fff;
      border-top: 1px solid #f5f2f2;
      .imgWrap{
        width: 80px;
        height: 80px;
        // border: 1px solid red;
        float: left;
        margin-top: 20px;
        margin-left: 40px;
      }
      .text{
        height: 120px;
        line-height: 120px;
        float: left;
        margin-left: 70px;
        font-size: 30px;
      }
      .spanBox{
        width: 50px;
        height: 120px;
        float: right;
        margin-right: 15px;
        line-height: 120px;
        color: #b1b1b1;
        font-size: 36px;
      }
    }
    ul{
      width: 100%;
      height: auto;
      margin-top: 30px;
      background: #fff;
      // border-bottom: 1px solid #e2e2e2;
      padding-left: 35px;
      li{
        width: 100%;
        height: 112px;
        line-height: 112px;
        font-size: 30px;
        color: #000;
        border-top: 1px solid #f5f2f2;
        .span1{
          padding-right: 20px;
          color: #000;
          // font-weight: bold;
          font-size: 28px;
        }
        .span2{
          width: 100px;
          height: 52px;
          font-size: 38px;
          line-height: 112px;
          float: right;
          // font-weight: bold;
          display: block;
          color: #2ebda1;
          text-align: center;
          b{
            display: block;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
          }
        }
        .spanLocat{
          color: #02aee6;
        }
      }
      li:nth-of-type(1) {
        border-top: none;
      }
      li:nth-of-type(2) {
        color: #ffa302;
      }
      .list{
        .imgBox{
          width: 66%;
          height: 100px;
          float: right;
          // border: 1px solid red;
          overflow: hidden;
          padding-right: 15px;
          padding-left: 12px;
          .imgitem{
            width: 62px;
            height: 62px;
            border-radius: 50%;
            float: left;
            margin-left: -10px;
            margin-top: 22px;
          }
        }
        .span2{
          width: 70px;
          // margin-top: 40px;
          margin-right: 10px;
          color: #b1b1b1;
        }
      }
    }
    .descr{
      width: 100%;
      min-height: 292px;
      // border-bottom: 1px solid #e2e2e2;
      padding-left: 38px;
      background: #fff;
      margin-top: 30px;
      .tiltle{
        width: 100%;
        height: 90px;
        line-height: 90px;
        color: #000;
        font-size: 28px;
      }
      .text{
        width: 100%;
        height: auto;
        padding-right: 40px;
        font-size: 30px;
        font-weight: bold;
        line-height: 40px;
        color: #000;
        padding-bottom: 35px;
      }
    }
    .time{
      width: 100%;
      height: 146px;
      background: #fff;
      margin-top: 45px;
      border-top: 1px solid #f5f2f2;
      border-bottom: 1px solid #f5f2f2;
      position: fixed;
      bottom: 0;
      // position: relative;
      .p1{
        font-size: 25px;
        padding-left: 20px;
        color: #636468;
        margin-top: 25px;
        span{
          font-size: 25px;
          color: #ee5e39;
        }
      }
      .p2{
        width: 490px;
        height: 60px;
        position: relative;
        // padding-top: 20px;
        line-height: 60px;
        padding-left: 20px;
        position: relative;
        .checkbox{
          width: 35px;
          height: 35px;
          margin-top: 12px;
          float: left;
          line-height: 32px;
          text-align: center;
          border: 2px solid #c8c8ca;
          border-radius: 50%;
          .span1{
            font-size: 25px;
            text-align: center;
            color: #fff;
          }
        }
        .checked{
          border: 2px solid #ffd200;
          background: #ffd200;
        }
        .span2{
          height: 60px;
          line-height: 60px;
          float: left;
          padding-left: 10px;
          font-size: 22px;
          color: #4a5157;
          // position: absolute;
          // top: 13px;
          // .span3{
          //   color: #6a9cbf;
          // }
        }
      }
    }
  }
</style>
<style>
  .activityDetail .el-button{
    width: 160px;
    height: 80px;
    color: #fff;
    background: #ee5e39;
    float: right;
    border-radius: 10px;
    position: absolute;
    top: 28px;
    right: 15px;
    outline: none;
    border: none;
    font-size: 28px;
  }
</style>
