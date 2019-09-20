<template>
  <!-- 活动页 -->
  <div class="activityHome">
    <div class="fixedBox">
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
        <div class="searchWrap">
          <!-- 搜索框 -->
          <div class="searchBox" v-show="isShowSearch">
            <el-input
              @change="search1"
              v-model="inputText">
            </el-input>
          </div>
        </div>
        <div class="showSearch" @click="showSearch"><span class="el-icon-search"></span></div>
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
      <div class="huise"></div>
    </div>
    <!-- 活动详情 -->
    <div class="contentBg">
      <div class="content">
        <div class="activItem" v-for="(item,index) in activList" :key="index">
          <div class="address" @click="toClub(item.groupId)">
            {{item.groupName}}<span class="span2 el-icon-arrow-right"></span>
          </div>
          <div class="top" @click="toSignUp(item.id)">
            <div class="title">
              <p class="text">{{item.type}}<span class="name">{{item.nickName}}</span></p>
              <div class="rightBtn" :class="'rightColor' + item.osStateId">{{item.timeStart}}</div>
            </div>
            <div class="detailBox">
              <img :src="item.venueImage" alt="">
              <div class="p1 venueName">{{item.venueName}}<span>{{item.distance}}km</span></div>
              <div class="p1 tit">{{item.title}}</div>
              <div class="p1">{{item.cost}}元/人</div>
            </div>
          </div>
          <div class="peopleList">
            <img class="icon" src="../../assets/peoIcon.png" alt="">
            <!-- 报名头像列表 -->
            <div class="imgBox">
              <img class="headImg"  v-for="(it,ind) in item.enrolledVoList" :key="ind"  :src="it.image" alt="">
            </div>
            <div class="detailText">
              <span class="num">{{item.enrolledVoList.length}}/{{item.people}}</span>
              <span class="status" :class="'color' + item.osStateId">{{item.osState}}</span>
            </div>
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
      isShowSearch: false,
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
      activList: [],
      timestamp: '',
      nonceStr: '',
      signature: '',
    }
  },
  created() {
    const url = location.href
    // url = ' + encodeURIComponent(that.isIosOrAndroid() === 'android' ? location.href.split('#')[0] : window.initUrl)'
    console.log(this.$isIosOrAndroid())

    console.log(url.substr(0, url.indexOf(location.hash)))
    this.$http.getSignature(url.substr(0, url.indexOf(location.hash))).then(resp => {
      console.log(resp)
      if(resp.status = 200) {
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature
        const that = this
        wx.config({
          debug: true,
          appId: 'wxd3d4d3045a1213a1',
          timestamp: '1568982632',
          nonceStr: '1f1a415c-a272-426f-84d2-7237d81519b0',
          signature: '53ee80f7bf5b8fe27a32415dbd85d5d2692d67db',
          // timestamp: this.timestamp,
          // nonceStr: this.nonceStr,
          // signature: this.signature,
          jsApiList: [
            'getLocation',
          ]
        });
        
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
          }
        });
      }
    })
    

    




    for(let i = 0; i< 4; i++){
      const result = this.findDate(i)
      this.dateList[i].date1 = result
    }
    // console.log(this.dateList)
    // 获取活动列表
    this.time = this.dateList[0].date1.year + '-' + this.dateList[0].date1.month +'-'+ this.dateList[0].date1.day  //实际动态日期
    const params = {
      // activityType: this.activityType,
      type: this.type,
      time: this.time,
      keyWord: '',
      isTwoDaysLater: this.isTwoDaysLater,
      lat: '30.67994285',
      lon: '104.06792346'
    }
    console.log(params)
    this.$http.activitiesList(params).then(resp => {
      if(resp.status == 200) {
        this.activList = resp.data
        if(this.activList.length == 0) {
          this.$toast({
            message: '没有活动哦！',
            duration: 2000
          });
        }
      }else{
        this.$toast({
          message: '获取列表失败！',
          duration: 2000
        });
        this.activList = []
      }
      console.log(resp)
    })
  },
  methods: {
    showSearch() {
      this.isShowSearch = !this.isShowSearch
      this.inputText = ''
    },
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
          if(this.activList.length == 0) {
            this.$toast({
              message: '没有活动哦！',
              duration: 2000
            });
          }
        }else{
          this.$toast({
            message: '获取列表失败！',
            duration: 2000
          });
          this.activList = []
        }
        console.log(resp)
      })
    },
    // 切换分类
    changeCate(index) {
      this.currIndex = index
      this.isShowSearch = false
      if(index === 0) {
        this.type = 'sportsKinds_01'
      }
      if(index === 1) {
        this.type = 'sportsKinds_02'
      }
      const params = {
        // activityType: this.activityType,
        type: this.type,
        time: this.time,
        keyWord: '',
        isTwoDaysLater: this.isTwoDaysLater,
        lat: '30.67994285',
        lon: '104.06792346'
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data
          if(this.activList.length == 0) {
            this.$toast({
              message: '没有活动哦！',
              duration: 2000
            });
          }
        }else{
          this.$toast({
            message: '获取列表失败！',
            duration: 2000
          });
          this.activList = []
        }
      })
    },
    // 切换日期
    changeDate(index,clickDate) {
      this.isShowSearch = false
      if(index === 3){
        this.isTwoDaysLater = true
      }else{
        this.isTwoDaysLater = false
      }
      this.currDateIndex = index
      this.time = clickDate.year + '-' + clickDate.month +'-'+ clickDate.day   //实际动态日期
      const params = {
        // activityType: this.activityType,
        type: this.type,
        time: this.time,
        keyWord: '',
        isTwoDaysLater: this.isTwoDaysLater,
        lat: '30.67994285',
        lon: '104.06792346'
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data
          if(this.activList.length == 0) {
            this.$toast({
              message: '没有活动哦！',
              duration: 2000
            });
          }
        }else{
          this.$toast({
            message: '获取列表失败！',
            duration: 2000
          });
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
      if(id == '1') {
        this.$toast({
          message: '这是临时组队哦！',
          duration: 2000
        });
      }else{
        window.sessionStorage.setItem('groupDetailId',id)
        this.$router.push({
          path: `/club/clubInfo/${id}`,
        })
      }
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
    padding-bottom: 40px;
    .fixedBox{
      width: 100%;
      height: 214px;
      background: #fff;
      position: fixed;
      top: 0;
      z-index: 9;
    }
    .cateNav{
      width: 100%;
      height: 94px;
      background: #fff;
      position: relative;
      .content{
        width: 100%;
        height: 94px;
        padding-left: 10px;
        .cateItem{
          padding-top: 40px;
          font-size: 28px;
          color: #9e9e9e;
          display: inline-block;
          vertical-align: bottom;
          margin: 0 20px;
        }
        .activeCate{
          color: #000000;
          font-size: 44px;
          border-bottom: 3px solid #fff;
          font-weight: 600;
          line-height: 40px;
        }
      }
      .searchWrap{
        width: 60%;
        height: 80px;
        position: absolute;
        right: 0;
        top: 20px;
        .searchBox{
          width: 100%;
          height: 80px;
          padding-right: 20px;
          margin-top: 8px;
        }
      }
      .showSearch{
        width: 50px;
        height: 50px;
        position: absolute;
        right: 30px;
        top: 40px;
        span{
          font-size: 40px;
        }
      }
    }
    .dateList{
      width: 100%;
      height: 120px;
      background: #fff;
      .dateItem{
        width: 25%;
        height: 120px;
        padding-top: 22px;
        float: left;
        text-align: center;
        position: relative;
        .p{
          color: #000000;
        }
        .p1{
          font-size: 24px;
          line-height: 34px;
        }
        .p2{
          font-size: 26px;
          line-height: 45px;
        }
      }
      .dateItem::after{
        display: block;
        content: '';
        width: 4px;
        height: 50px;
        border-right: 1px solid #e6e6e6;
        position: absolute;
        top: 40px;
        right: 0;
      }
      .dateItem:nth-of-type(4)::after{
        display: none;
      }
      .activeDate::before{
        display: block;
        content: '';
        width: 100%;
        height: 5px;
        background: #ff9c00;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .huise{
      width: 100%;
      height: 20px;
      background: #f2f2f2;
    }
    .contentBg{
      width: 100%;
      // padding: 0 25px;
      margin-top: 234px;
      position: relative;
      .content{
        width: 100%;
        height: auto;
        .activItem{
          width: 100%;
          height: 441px;
          background: #fff;
          box-shadow: 0 -1px 5px rgb(216, 215, 215);
          margin-top: 20px;
          .top{
            width: 100%;
            height: auto;
            padding-left: 20px;
            padding-right: 20px;
            .title{
              width: 100%;
              height: 84px;
              padding-left: 10px;
              border-top: 1px solid #efefef;
              position: relative;
              .text{
                height: 84;
                font-size: 27px;
                line-height: 84px;
                color: #757575;
                float: left;
                span{
                  padding-left: 30px;
                }
              }
              .rightBtn{
                width: 130px;
                height: 50px;
                line-height: 50px;
                font-size: 48px;
                color: #fff;
                text-align: center;
                background: #ff9c00;
                float: right;
                margin-top: 14px;
                margin-right: -15px;
              }
              .rightColor1{  //正在报名
                background: #ff9c00;
              }
              .rightColor2{  //名额已满
                background: #ff9c00;
              }
              .rightColor3{  //报名结束
                background: #ff9c00;
              }
              .rightColor4{  //正在进行
                background: #ff9c00;
              }
            }
            .detailBox{
              width: 100%;
              height: 194px;
              margin: 0 auto;
              border-top: 1px solid #eeeeee;
              img{
                width: 129px;
                height: 129px;
                margin-top: 32px;
                float: left;
                border-radius: 5px;
                margin-left: 23px;
              }
              .p1{
                width: 500px;
                float: right;
                line-height: 22px;
                color: #838383;
                font-size: 24px;
                line-height: 26px;
                margin-bottom: 10px;
              }
              .venueName{
                font-size: 24px;
                line-height: 26px;
                color: #444444;
                margin-bottom: 30px;
                span{
                  float: right;
                  font-size: 18px;
                  color: #808080;
                  padding-right: 18px;
                }
              }
              .tit{
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
          .peopleList{
            width: 100%;
            height: 80px;
            background: #fafafa;
            padding-left: 42px;
            overflow-x: auto;
            border-top: 1px solid #eeeeee;
            .icon{
              width: 36px;
              height: 36px;
              display: block;
              float: left;
              line-height: 80px;
              margin-top: 22px;
              margin-right: 45px;
            }
            .imgBox{
              height: 80px;
              width: 285px;
              float: left;
              overflow: hidden;
              .headImg{
                width: 57px;
                height: 57px;
                display: inline-block;
                border-radius: 50%;
                margin-top: 12px;
                margin-right: 10px;
              }
            }
            .detailText{
              width: 220px;
              height: 80px;
              float: right;
              line-height: 80px;
              .num{
                font-size: 22px;
                color: #707070;
                display: block;
                line-height: 80px;
                float: left;
              }
              .status{
                font-size: 23px;
                display: block;
                color: #ffb200;
                float: left;
                line-height: 80px;
                margin-left: 45px;
              }
              .color1{  //正在报名
                color: #20c9ac;
              }
              .color2{  //名额已满
                color: #494642;
              }
              .color3{  //报名结束
                color: #000;
              }
              .color4{  //正在进行
                color: #000;
              }
            }
          }
          .address{
            width: 100%;
            height: 84px;
            font-size: 30px;
            padding-left: 30px;
            padding-right: 20px;
            line-height: 84px;
            .span2{
              float: right;
              line-height: 84px;
              font-size: 32px;
              color: #939393;
            }
          }
        }
      }
    }
  }
</style>
<style>
  @font-face {
    font-family: 'UnidreamLED';
    src:url("../../assets/UnidreamLED.woff");/***默认使用本地的***/
  }
  .activityHome .rightBtn{
    font-family: 'UnidreamLED';
    text-align: center;
  }
  .activityHome .searchBox .el-input__inner{
    height: 60px !important;
    border-radius: 10px;
    padding-left: 20px;
    font-size: 26px;
    border: 1px solid #ccc;
  }
  .activityHome .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .activityHome .searchBox .el-input__icon{
    font-size: 35px;
    /* font-weight: bold; */
    color: #767676;
  }
</style>
