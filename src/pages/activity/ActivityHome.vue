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
    <!-- 当没有活动时显示缺省页 -->
    <div class="nolist" v-show="isNoData"></div>
    <!-- 活动详情 -->
    <div class="contentBg" v-show="!isNoData">
      <div class="content" 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isMoreLoading"
        :infinite-scroll-immediate-check="true"
        infinite-scroll-distance="10">
        <div class="activItem" v-for="(item,index) in activList" :key="index">
          <div class="address" @click="toClub(item.groupId)">
            {{item.groupName}}<span class="span2 el-icon-arrow-right"></span>
          </div>
          <div class="top" @click="toSignUp(item.id)">
            <div class="title">
              <p class="text">组织者<span class="name">{{item.nickName}}</span></p>
              <div class="rightBtn" :class="'rightColor' + item.osStateId">{{item.timeStart}}</div>
            </div>
            <div class="detailBox">
              <div class="homeImg1">
                <img :src="item.venueImage" style="width: 100%; height: 100%; float:left; border-radius: 5px;" alt="">
              </div>
              <div class="p1 venueName">{{item.venueName}}<span>{{item.distance}}km</span></div>
              <div class="p1 tit">{{item.title}}</div>
              <div class="p1 cost">{{item.cost}}元/人</div>
            </div>
          </div>
          <div class="peopleList" @click="toSignUp(item.id)">
            <div class="iconImg">
              <img src="../../assets/peoIcon.png" style="width: 100%; height: 100%;" alt="">
            </div>
            <!-- 报名头像列表 -->
            <div class="imgBox">
              <div class="headImg" v-for="(it,ind) in item.enrolledVoList" :key="ind">
                <img :src="it.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
              </div>
            </div>
            <div class="detailText">
              <span class="num">{{item.enrolledVoList.length}}/{{item.people}}</span>
              <span class="status" :class="'color' + item.osStateId">{{item.osState}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--显示加载中转菊花-->
      <div class="showLoading" v-show="showLoading">
        <div class="loading-box tc" v-if="isLoading">
          <mt-spinner type="snake" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中...</span>
        </div>

        <div class="no-more" v-if="noMore">没有更多了~</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityHome',
  data() {
    return {
      isNoData: false,
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
      latitude: '30.5702',
      longitude: '104.06476',
      showLoading: false,  //是否显示底部加载信息
      isLoading: false, // 加载中转菊花
      isMoreLoading: false, // 加载更多中
      noMore: false, // 是否还有更多
      pageInfo: { // 分页信息
        page: 1,
        page_size: 15,
        total: 0, // 总条数
        totalPage: 1 // 总分页数
      },
    }
  },
  watch: {
    activList(v) {
      if(v.length > 0) {
        this.isNoData = false
      }else{
        this.isNoData = true 
      }
    }
  },
  created() {
    this.isNoData = false
    // const url = location.href
    // console.log(url.substr(0, url.indexOf(location.hash)))
    this.$http.getSignature().then(resp => {
      // console.log(resp)
      if(resp.status = 200) {
        // this.$indicator.open()
        this.$indicator.open({
          text: '获取位置信息中...',
          spinnerType: 'fading-circle'
        });
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature

        const that = this
        wx.config({
          // debug: true,
          appId: 'wxd3d4d3045a1213a1',
          // appId: 'wxf1894ca38c849d17',  //测试号
          timestamp: this.timestamp,
          nonceStr: this.nonceStr,
          signature: this.signature,
          jsApiList: [
            'getLocation',
          ]
        });
        // 获取经纬度
        const _this = this
        wx.ready(function(){
          _this.$indicator.close()
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              // console.log(res)
              _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              const params = {
                // activityType: this.activityType,
                type: _this.type,
                time: _this.time,
                keyWord: '',
                isTwoDaysLater: _this.isTwoDaysLater,
                lat: _this.latitude,
                lon: _this.longitude,
                page: 1
              }
              // console.log(params)
              _this.$http.activitiesList(params).then(resp => {
                if(resp.status == 200) {
                  _this.activList = resp.data.rows
                  // 分页信息
                  _this.pageInfo.totalPage = resp.data.pageNum
                  _this.pageInfo.page = resp.data.prePage
                }else{
                  _this.$toast({
                    message: '获取列表失败！',
                    duration: 2000
                  });
                  _this.activList = []
                }
                console.log(resp)
              })
            },
            // 当获取经纬度失败
            cancel: function (res) {
              const params = {
                // activityType: this.activityType,
                type: _this.type,
                time: _this.time,
                keyWord: '',
                isTwoDaysLater: _this.isTwoDaysLater,
                lat: '30.5702',
                lon: '104.06476',
                page: 1
              }
              _this.$http.activitiesList(params).then(resp => {
                if(resp.status == 200) {
                  _this.$toast('获取地理位置失败，当前距离为平台默认距离！')
                  _this.activList = resp.data.rows
                  // 分页信息
                  _this.pageInfo.totalPage = resp.data.pageNum
                  _this.pageInfo.page = resp.data.prePage
                }else{
                  _this.$toast({
                    message: '获取列表失败！',
                    duration: 2000
                  });
                  _this.activList = []
                }
              })
            }
          });
        });
        // 当微信获取位置配置失败
        wx.error(function(res){
          const params = {
            // activityType: this.activityType,
            type: _this.type,
            time: _this.time,
            keyWord: '',
            isTwoDaysLater: _this.isTwoDaysLater,
            lat: '30.5702',
            lon: '104.06476',
            page: 1
          }
        _this.$http.activitiesList(params).then(resp => {
           _this.$toast('获取地理位置失败，当前距离为平台默认距离！')
          if(resp.status == 200) {
            _this.activList = resp.data.rows
            // 分页信息
            _this.pageInfo.totalPage = resp.data.pageNum
            _this.pageInfo.page = resp.data.prePage
          }else{
            _this.$toast({
              message: '获取列表失败！',
              duration: 2000
            });
            _this.activList = []
          }
        })
        });
      }
    })
    
    for(let i = 0; i< 4; i++){
      const result = this.findDate(i)
      this.dateList[i].date1 = result
    }
    // 计算日期
    this.time = this.dateList[0].date1.year + '-' + this.dateList[0].date1.month +'-'+ this.dateList[0].date1.day  //实际动态日期
    
  },
  methods: {
    // 加载等多
    loadMore() {
      if(this.pageInfo.totalPage > 1) {
        this.showLoading = true
      }else{
        // console.log("只有1页")
        this.showLoading = false
      }
      this.pageInfo.page += 1 // 增加分页
      // console.log(this.pageInfo.page, this.pageInfo.totalPage)
      if (this.pageInfo.page > this.pageInfo.totalPage) { // 超过了分页
          this.noMore = true // 显示没有更多了
          this.isLoading = false // 关闭加载中
          return false
      }else{
        // console.log("还有更多")
        this.isMoreLoading = true // 设置加载更多中
        this.isLoading = true // 加载中
        const params = {
          // activityType: this.activityType,
          type: this.type,
          time: this.time,
          keyWord: '',
          isTwoDaysLater: this.isTwoDaysLater,
          lat: '30.5702',
          lon: '104.06476',
          page: this.pageInfo.page
        }
        // console.log(params)
        setTimeout(() => {
          this.$http.activitiesList2(params).then(resp => {
            console.log(resp)
            if(resp.status == 200) {
              this.isLoading = false
              this.isMoreLoading = false
              this.activList = this.activList.concat(resp.data.rows)
              // console.log(this.playGroungList)
              this.pageInfo.totalPage = resp.data.pageNum
              this.pageInfo.page = resp.data.prePage
            }
          })
        },1000)
      }
    },
    // 搜索
    showSearch() {
      this.showLoading = false
      this.isLoading = false // 加载中转菊花
      this.isMoreLoading = false // 加载更多中
      this.noMore = false// 是否还有更多
      this.inputText = ''
    },
    search1() {
      console.log(this.inputText)
        const params = {
        type: this.type,
        // activityType: this.activityType,
        time: this.time,
        keyWord: this.inputText,
        isTwoDaysLater: this.isTwoDaysLater,
        lat: this.latitude,
        lon: this.longitude,
        page: 1
      }
      console.log(params)
      this.$http.activitiesList(params).then(resp => {
        if(resp.status == 200) {
          this.activList = resp.data.rows
          // 分页信息
          this.pageInfo.totalPage = resp.data.pageNum
          this.pageInfo.page = resp.data.prePage
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
      this.showLoading = false
      this.isLoading = false // 加载中转菊花
      this.isMoreLoading = false // 加载更多中
      this.noMore = false// 是否还有更多
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
        lat: this.latitude,
        lon: this.longitude,
        page: 1
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data.rows
          // 分页信息
          this.pageInfo.totalPage = resp.data.pageNum
          this.pageInfo.page = resp.data.prePage
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
      this.showLoading = false
      this.isLoading = false // 加载中转菊花
      this.isMoreLoading = false // 加载更多中
      this.noMore = false// 是否还有更多
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
        lat: this.latitude,
        lon: this.longitude,
        page: 1
      }
      console.log(params)
      // 活动列表
      this.$http.activitiesList(params).then(resp => {
        this.showLoading = false
        console.log(resp)
        if(resp.status == 200) {
          this.activList = resp.data.rows
          // 分页信息
          this.pageInfo.totalPage = resp.data.pageNum
          this.pageInfo.page = resp.data.prePage
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
      const configData = {
        timestamp: this.timestamp,
        nonceStr: this.nonceStr,
        signature: this.signature,
      }
      window.sessionStorage.setItem('config',JSON.stringify(configData))  //详情页调微信接口的配置
      window.sessionStorage.setItem('activityDetailId',id)
      this.$router.push({
        path: '/activityDetail',
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .activityHome{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 40px;
    padding-top: 214px;
    .nolist{
      width: 100%;
      height: 83vh;
      background: url('../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
      background-position: 0 10%;
    }
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
      // margin-top: 234px;
      margin-top:5px;
      position: relative;
      .content{
        width: 100%;
        max-height: 96vh;
        padding-bottom: 3px;
        overflow: auto;
        // border: 1px solid red;
        .activItem{
          width: 100%;
          height: 441px;
          background: #fff;
          box-shadow: 0 -1px 5px rgb(226, 225, 225);
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
              border-top: 1px solid #f7f7f7;
              position: relative;
              .text{
                height: 84;
                font-size: 27px;
                line-height: 84px;
                color: #646464;
                float: left;
                span{
                  padding-left: 30px;
                }
              }
              .rightBtn{
                width: 132px;
                height: 54px;
                line-height: 57px;
                letter-spacing: 1px;
                font-size: 50px;
                color: #fff;
                text-align: center;
                background: #ff9c00;
                float: right;
                margin-top: 14px;
                margin-right: -20px;
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
              border-top: 1px solid #f7f7f7;
              // border: 1px solid red;
              .homeImg1{
                width: 131px;
                height: 131px;
                margin-top: 30px;
                float: left;
                // border-radius: 5px;
                margin-left: 17px;
              }
              .p1{
                width: 540px;
                float: right;
                line-height: 22px;
                color: #838383;
                font-size: 24px;
                line-height: 26px;
                margin-bottom: 10px;
                // border: 1px solid red;
              }
              .venueName{
                font-size: 28px;
                line-height: 26px;
                color: #000;
                margin-bottom: 24px;
                margin-top: 33px;
                // border: 1px solid red;
                span{
                  float: right;
                  font-size: 24px;
                  color: #808080;
                  padding-right: 18px;
                }
              }
              .tit{
                height: 27px;
                line-height: 30px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
              .cost{
                margin-top: 13px;
              }
              .p1:nth-of-type(1){
                margin-top: 35px;
              }
            }
          }
          .peopleList{
            width: 100%;
            height: 80px;
            background: #fafafa;
            padding-left: 42px;
            overflow-x: auto;
            border-top: 1px solid #eeecec;
            box-shadow: 0 1px 5px rgb(226, 225, 225);
            .iconImg{
              width: 36px;
              height: 36px;
              display: block;
              float: left;
              margin-top: 22px;
              margin-right: 45px;
            }
            .imgBox{
              height: 80px;
              width: 340px;
              // border: 1px solid red;
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
                font-size: 25px;
                color: #707070;
                display: block;
                line-height: 80px;
                float: left;
              }
              .status{
                font-size: 25px;
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
                color: #ff9c00;
              }
            }
          }
          .address{
            width: 100%;
            height: 84px;
            font-size: 31px;
            letter-spacing: 1px;
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
  .activityHome .loading-box{
    margin-top: 20px;
    text-align: center;
  }
  .loading-more div{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .no-more{
    margin-top: 20px;
    text-align: center;
  }
  /* .showLoading{
    margin-top: 20px;
  } */
</style>
