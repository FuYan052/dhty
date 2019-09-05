<template>
  <!-- 活动页 -->
  <div class="activityHome">
    <!-- 头部菜单栏 -->
    <div class="cateNav">
      <div class="content">
        <div 
          class="cateItem"
          v-for="(item,index) in cateList" 
          :key="index"
          :class="{activeCate : currIndex === index}"
          @click="changeCate(index)"
          >{{item}}</div>
      </div>
    </div>
    <!-- 日期切换 -->
    <div class="dateList">
      <div class="dateItem" 
        v-for="(item,index) in dateList" 
        :key="index"
        :class="{activeDate : currDateIndex === index}"
        @click="changeDate(index,item.date1)"
        >
        <p class="p p1">{{item.date2}}</p>
        <p class="p p2">{{item.date1.month}}月{{item.date1.day}}日<span v-show="index === 3">~</span></p>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="searchBox">
      <el-input
        prefix-icon="el-icon-search"
        @change="search1"
        v-model="inputText">
      </el-input>
    </div>
    <!-- 活动详情 -->
    <div class="contentBg">
      <div class="content">
        <div class="activItem" v-for="(item,index) in activList" :key="index">
          <div class="top">
            <div class="title">
              <img :src="item.image" alt="">
              <p class="text">{{item.nickName}}</p>
              <p class="role">{{item.type}}</p>
              <div class="rightBtn" @click="toSignUp(item.id)">{{item.osState}}</div>
            </div>
            <!-- <p class="address">金地羽毛球馆1<span>16km</span></p> -->
            <div class="detailBox">
              <img src="../../assets/g-img.png" alt="">
              <div class="p1 title"><span><i class="el-icon-house"></i></span>{{item.title}}</div>
              <div class="p1"><span><i class="el-icon-time"></i></span>{{item.time}}&nbsp;&nbsp;{{item.timeStart}}-{{item.timeEnd}}</div>
              <div class="p1"><span><i class="el-icon-coin"></i></span>{{item.cost}}元/人</div>
            </div>
          </div>
          <div class="address" @click="toClub(item.groupId)">
            <span class="span1 el-icon-location"></span>{{item.groupName}}<span class="span2 el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityHome',
  data() {
    return {
      inputText: '',
      activityType: '1',
      cateList: ['羽毛球', '跑步'],
      currIndex: 0,
      currDateIndex: 0,
      dateList: [
        {
          date1: '',
          date2: '今天'
        },
        {
          date1: '',
          date2: '明天'
        },
        {
          date1: '',
          date2: '后天'
        },
        {
          date1: '',
          date2: '两天后'
        },
      ],
      type: 'sportsKinds_01',
      time: '2019-06-28',
      isTwoDaysLater: false,  //是否为两天后的日期，传给后端做判断标识
      activList: []
    }
  },
  created() {
    for(let i = 0; i< 4; i++){
      const result = this.findDate(i)
      this.dateList[i].date1 = result
    }
    // console.log(this.dateList)
    // 获取活动列表
    this.time = this.dateList[0].date1.year + '-' + this.dateList[0].date1.month +'-'+ this.dateList[0].date1.day  //实际动态日期
    const params = {
      activityType: this.activityType,
      type: this.type,
      time: this.time,
      keyWord: '',
      isTwoDaysLater: this.isTwoDaysLater
    }
    console.log(params)
    this.$http.activitiesList(params).then(resp => {
      if(resp.status == 200) {
        this.activList = resp.data
      }else{
        this.$toast("获取列表失败!")
        this.activList = []
      }
      console.log(resp)
    })
  },
  methods: {
    // 搜索
    search1() {
      console.log(this.inputText)
        const params = {
        type: this.type,
        activityType: this.activityType,
        time: this.time,
        keyWord: this.inputText,
        isTwoDaysLater: this.isTwoDaysLater
      }
      console.log(params)
      this.$http.activitiesList(params).then(resp => {
        if(resp.status == 200) {
          this.activList = resp.data
        }else{
          this.$toast("获取列表失败!")
          this.activList = []
        }
        console.log(resp)
      })
    },
    // 切换分类
    changeCate(index) {
      this.currIndex = index
      if(index === 0) {
        this.type = 'sportsKinds_01'
      }
      if(index === 1) {
        this.type = 'sportsKinds_02'
      }
      const params = {
        type: this.type,
        activityType: this.activityType,
        time: this.time,
        keyWord: '',
        isTwoDaysLater: this.isTwoDaysLater
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data
        }else{
          this.$toast("获取列表失败!")
          this.activList = []
        }
      })
    },
    changeDate(index,clickDate) {
      if(index === 3){
        this.isTwoDaysLater = true
      }else{
        this.isTwoDaysLater = false
      }
      this.currDateIndex = index
      this.time = clickDate.year + '-' + clickDate.month +'-'+ clickDate.day   //实际动态日期
      const params = {
        type: this.type,
        activityType: this.activityType,
        time: this.time,
        keyWord: '',
        isTwoDaysLater: this.isTwoDaysLater
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data
        }else{
          this.$toast("获取列表失败!")
          this.activList = []
        }
      })
    },
    // 获取当前日期及后面范围内的日期
    findDate(aa) {
      var date1 = new Date()
      var time1 = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate()
      var date2 = new Date(date1)
      date2.setDate(date1.getDate()+aa)
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
      var time = _month + "-"+ _day+ ""
      var _dateObj = {
        year: _year,
        month: _month,
        day: _day
      }
      return _dateObj;
    },
    toClub(id) {
      console.log(id)
      window.sessionStorage.setItem('groupDetailId',id)
      this.$router.push({
        path: `/club/clubInfo/:${id}`,
        name: 'ClubHome',
      })
    },
    // 去报名
    toSignUp(id) {
      window.sessionStorage.setItem('activityDetailId',id)
      this.$router.push({
        path: '/activityDetail',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .activityHome{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 20px;
    .cateNav{
      width: 100%;
      height: 94px;
      background: #fff;
      .content{
        width: 100%;
        height: 94px;
        padding-left: 10px;
        .cateItem{
          padding-top: 30px;
          font-size: 28px;
          color: #9e9e9e;
          display: inline-block;
          vertical-align: bottom;
          margin: 0 20px;
        }
        .activeCate{
          color: #3d3d3d;
          font-size: 42px;
          border-bottom: 3px solid #fff;
        }
      }
    }
    .dateList{
      width: 100%;
      height: 130px;
      background: #fff;
      .dateItem{
        width: 25%;
        height: 130px;
        padding-top: 30px;
        float: left;
        text-align: center;
        position: relative;
        .p{
          color: #928d93;
        }
        .p1{
          font-size: 20px;
          padding-bottom: 15px;
        }
        .p2{
          font-size: 18px;
          line-height: 26px;
        }
      }
      .activeDate::before{
        display: block;
        content: '';
        width: 37px;
        height: 5px;
        background: #23a0f2;
        position: absolute;
        bottom: 1px;
        left: 78px;
      }
    }
    .searchBox{
      width: 100%;
      height: 104px;
      padding: 20px;
    }
    .contentBg{
        width: 100%;
        padding: 0 25px;
        .content{
          width: 100%;
          height: auto;
          .activItem{
            width: 100%;
            height: 378px;
            // background: #fff;
            background: url("../../assets/bg222.png") no-repeat center;
            background-size: contain;
            border-top-right-radius: 25px;
            .top{
              width: 100%;
              height: auto;
              .title{
                width: 100%;
                height: 128px;
                position: relative;
                img{
                  width: 50px;
                  height: 50px;
                  float: left;
                  margin-top: 23px;
                  margin-left: 30px;
                  border-radius: 50%;
                }
                .text{
                  display: inline-block;
                  font-size: 26px;
                  line-height: 30px;
                  color: #161616;
                  margin-top: 22px;
                  margin-left: 18px;
                }
                .role{
                  width: 135px;
                  height: 35px;
                  line-height: 30px;
                  text-align: center;
                  color: #73bbf5;
                  border: 1px solid #259ff2;
                  font-size: 20px;
                  border-radius: 20px;
                  position: absolute;
                  top: 71px;
                  left: 95px;
                }
                .rightBtn{
                  width: 150px;
                  height: 60px;
                  line-height: 60px;
                  background: #72cad8;
                  font-size: 23px;
                  color: #fff;
                  text-align: center;
                  border-top-right-radius: 25px;
                  border-bottom-left-radius: 25px;
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
              .detailBox{
                width: 636px;
                height: 168px;
                margin: 0 auto;
                border-top: 1px solid #eeeeee;
                border-bottom: 1px solid #eeeeee;
                img{
                  width: 126px;
                  height: 126px;
                  margin-top: 22px;
                  float: left;
                  border-radius: 10px;
                }
                .p1{
                  width: 480px;
                  float: right;
                  line-height: 37px;
                  color: #838383;
                  font-size: 23px;
                  span{
                    display: inline-block;
                    background: #fff;
                    padding-right: 15px;
                    i{
                      color: #b7ab71;
                      font-size: 22px;
                      vertical-align: middle;
                      text-align: center;
                      float: left;
                    }
                  }
                }
                .title{
                  height: 37px;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                }
                .p1:nth-of-type(1){
                  margin-top: 30px;
                }
              }
            }
            .address{
              width: 100%;
              height: 78px;
              padding-left: 45px;
              padding-right: 40px;
              line-height: 78px;
              .span1{
                font-size: 31px;
                color: #b5ab70;
                padding-right: 15px;
              }
              .span2{
                float: right;
                line-height: 78px;
                font-size: 27px;
                color: #b2b2b2;
                font-weight: bold;
              }
            }
          }
        }
      }
  }
</style>
<style>
  .activityHome .searchBox .el-input__inner{
    height: 60px !important;
    border-radius: 10px;
    padding-left: 70px;
    font-size: 26px;
    border: 2px solid #dcdcdc;
  }
  .activityHome .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .activityHome .searchBox .el-input__icon{
    font-size: 35px;
    font-weight: bold;
    color: #767676;
  }
</style>
