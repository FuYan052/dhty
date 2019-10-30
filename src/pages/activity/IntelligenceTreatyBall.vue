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
    <!-- 当没有活动时显示缺省页 -->
    <div class="nolist" v-show="isNoData"></div>
    <div class="contentBg" v-show="!isNoData">
      <!-- 活动列表 -->
      <ul class="activeList content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isMoreLoading"
        :infinite-scroll-immediate-check="true"
        infinite-scroll-distance="10">
        <li v-for="(item,index) in activList" :key="index">
          <div class="topBox">
            <!-- 标题 -->
            <div class="title" @click="toSignUp(item.id)">
              <p>{{item.title}}</p>
              <span class="el-icon-arrow-right"></span>
            </div>
            <!-- 时间 -->
            <div class="dateTime" @click="toSignUp(item.id)">
              {{item.time}}
              <span class="timeRange">{{item.timeStart}}-{{item.timeEnd}}</span>
              <span class="distance">{{item.distance}}km</span>
              <span></span>
            </div>
            <!-- 场地 -->
            <div class="place" @click="toSignUp(item.id)">
              {{item.venueName}}<span>￥<b>{{item.cost}}</b>/人</span>
            </div>
            <!-- 规则 -->
            <div class="ruler">
              <div class="wrap1">LI-NING&nbsp;&nbsp;A6(来虎专用球)</div>
              <div class="wrap2" @click="leader(item.id)">临时领队</div>
              <div class="wrap3" @click="rule(item.id)">规则</div>
            </div>
            <!-- 正在报名 -->
            <div class="signUp">
              <div class="imgBox" @click="toSignUp(item.id)">
                <div 
                  class="imgItem" 
                  v-for="(it,ind) in item.enrolledVoList" 
                  :key="ind"
                  :class="{groupOwner : it.group}"
                  >
                  <img :src="it.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
                </div>
              </div>
              <div class="peopleNUm">{{item.enrolled}}/{{item.people}}</div>
              <div class="signUpBtn" @click="toSignUp(item.id)" :class="'currbtnBg' + item.osStateId">{{item.osState}}</div>
            </div>
          </div>
          <div class="bottom">
            <ul class="muneList">
              <li>客服</li>
              <li @click="handleAlert">聚会</li>
              <li @click="handleAlert">装备</li>
              <li @click="handleAlert">活动</li>
            </ul>
          </div>
          <div class="bottomBg"></div>
        </li>
      </ul>
      <!--显示加载中转菊花-->
      <div class="showLoading" v-show="showLoading">
        <div class="loading-box tc" v-if="isLoading">
          <mt-spinner type="snake" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中...</span>
        </div>
        <div class="no-more" v-if="noMore">没有更多了~</div>
      </div>
      <!-- 提示优惠券 -->
    <div class="coupon" v-show="showCoupon">
      <div class="wraper">
        <div class="content"><span>{{couNum}}</span>张<span class="redText">{{couMoney}}</span>元优惠券已经存入您的账户~</div>
        <div class="toCheck" @click="toCheck">点击查看</div>
        <div class="closeBox" @click="know"></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntelligenceTreatyBall',
  data() {
    return {
      isNoData: false,
      dateCateList: ['今天','明天','后天'],
      currIndex: 0,
      clickDate: '',
      type: 'sportsKinds_01',  //运动类型
      timestamp: '',  //微信接口后台签名返回参数
      nonceStr: '',  //微信接口后台签名返回参数
      signature: '',  //微信接口后台签名返回参数
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
      showCoupon: false,  //优惠券
      couNum: null, //优惠券数量
      couMoney: null,  //优惠券金额
      activList: [],  //活动列表
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
    // 默认日期为当天日期
    this.clickDate = this.findDate(0)
    // 先加载活动列表
    const params = {
      type: this.type,
      time: this.clickDate,
      keyWord: '',
      // isTwoDaysLater: this.isTwoDaysLater,
      lat: '30.5702',
      lon: '104.06476',
      page: 1,
      userId: window.localStorage.getItem('userId')
    }
    this.$http.activitiesList(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        // _this.$toast('获取地理位置失败，当前距离为平台默认距离！')
        this.activList = resp.data.rows
        // 分页信息
        this.pageInfo.totalPage = resp.data.pageNum
        this.pageInfo.page = resp.data.prePage
        // 判断是否提示优惠券
        this.showCoupon = resp.data.noRead
        this.couNum = resp.data.howMany
        this.couMoney = resp.data.money
      }else{
        this.$toast({
          message: '获取列表失败！',
          duration: 2000
        });
        this.activList = []
      }
    })

    // 获取用户当前经纬度，计算距离场馆的距离
    const that = this
    this.$http.getSignature().then(resp => {
      // console.log(resp)
      if(resp.status = 200) {
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature

        const configData = {
          timestamp: this.timestamp,
          nonceStr: this.nonceStr,
          signature: this.signature,
        }
        window.sessionStorage.setItem('config',JSON.stringify(configData))  //存sessionStorage给详情页调微信位置接口

        wx.config({
          // debug: true,
          appId: 'wxd3d4d3045a1213a1',
          // appId: 'wxf1894ca38c849d17',  //测试号
          timestamp: that.timestamp, 
          nonceStr: that.nonceStr,
          signature: that.signature,
          jsApiList: [
            'getLocation',
          ]
        });
        // 获取经纬度
        wx.ready(function(){
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              // console.log(res)
              that.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              that.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              
              const params = {
                type: that.type,
                time: that.clickDate,
                keyWord: that.inputText,
                lat: that.latitude,
                lon: that.longitude,
                page: 1
              }
              console.log(params)
              that.$http.activitiesList(params).then(resp => {
                if(resp.status == 200) {
                  that.activList = resp.data.rows
                  // 分页信息
                  that.pageInfo.totalPage = resp.data.pageNum
                  that.pageInfo.page = resp.data.prePage
                }else{
                  that.$toast({
                    message: '获取列表失败！',
                    duration: 2000
                  });
                  that.activList = []
                }
                console.log(resp)
              })
            },
            // 当获取经纬度失败
            cancel: function (res) {
              that.$toast({
                message: '获取地理位置失败，当前距离为平台默认距离！',
                duration: 2500
              });
            }
          });
        });
        // 当微信获取位置配置失败
        wx.error(function(res){
          that.$toast({
            message: '获取地理位置失败，当前距离为平台默认距离！',
            duration: 2500
          });
        });
      }
    })
  },
  methods: {
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
      var time = _year + '-' + _month + "-"+ _day
      
      return time;
    },
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
          type: this.type, 
          time: this.clickDate,
          keyWord: '',
          // isTwoDaysLater: this.isTwoDaysLater,
          lat: this.latitude,
          lon: this.longitude,
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
              this.pageInfo.totalPage = resp.data.pageNum
              this.pageInfo.page = resp.data.prePage
            }
          })
        },1000)
      }
    },
    // 切换日期
    changeDateCate(index) {
      this.currIndex = index
      if(index === 0) {
        this.clickDate = this.findDate(0)
      }
      if(index === 1) {
        this.clickDate = this.findDate(1)
      }
      if(index === 2) {
        this.clickDate = this.findDate(2)
      }
      console.log(this.clickDate)
      this.showLoading = false
      this.isLoading = false // 加载中转菊花
      this.isMoreLoading = false // 加载更多中
      this.noMore = false// 是否还有更多
      this.isShowSearch = false
      const params = {
        // activityType: this.activityType,
        type: this.type,
        time: this.clickDate,
        keyWord: '',
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
    // 点击临时领队
    leader(id) {
      window.sessionStorage.setItem('clickType', '领队')
      this.$router.push({
        path: `/activityDetail/${id}`,
      })
    },
    // 点击规则
    rule(id) {
      window.sessionStorage.setItem('clickType', '规则')
      this.$router.push({
        path: `/activityDetail/${id}`,
      })
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
        path: `/activityDetail/${id}`,
      })
    },
    // 查看优惠券
    toCheck() {
      this.$router.push({
        path: '/userCenter/manageHome'
      })
      const user_id = window.localStorage.getItem('userId')
      if(user_id) {
        this.$http.isShowCoupon(user_id).then(resp => {
          console.log(resp)
        })
      }
    },
    // 优惠券，点击关闭
    know() {
      this.showCoupon = false
      const user_id = window.localStorage.getItem('userId')
      if(user_id) {
        this.$http.isShowCoupon(user_id).then(resp => {
          console.log(resp)
        })
      }
    },
    handleAlert() {
      alert('暂未开通，敬请期待！')
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
        width: 256px;
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
        margin-left: 38px;
      }
      .date:nth-of-type(3){
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
        bottom: -18px;
        left: 2px;
        background: url('../../assets/yelloCircle.png') no-repeat center bottom;
        background-size: auto 60%;
      }
    }
    .nolist{
      width: 100%;
      height: 91.5vh;
      background: url('../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
      background-position: 0 10%;
    }
    .contentBg{
      width: 100%;
      margin-top:5px;
      position: relative;
      .activeList{
        width: 100%;
        max-height: 90.5vh;
        padding: 0 34px;
        margin-top: 10px;
        overflow: auto;
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
                padding-left: 18px;
                padding-right: 35px;
                overflow: hidden;
                .imgItem{
                  width: 44px;
                  height: 44px;
                  border: 1px solid #fff;
                  border-radius: 50%;
                  float: left;
                  margin-left: -18px;
                }
                .groupOwner{
                  border: 2px solid #fac31e;
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
    .coupon{
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      background: rgba(0,0,0,0.5);
      .wraper{
        width: 100%;
        height: 66vh;
        padding-left: 3%;
        background: url('../../assets/couponBg.png') no-repeat;
        background-size: 97% auto;
        background-position-y: -3%;
        background-position-y: 0;
        z-index: 100;
        position: absolute;
        top: 8.2vh;
        left: 0;
        .content{
          width: 470px;
          height: auto;
          margin: 0 auto;
          font-size: 45px;
          line-height: 55px;
          margin-top: 485px;
          text-align: center;
          color: #000;
          .redText{
            color: #cd0a09;
          }
        }
        .toCheck{
          width: 560px;
          height: 73px;
          margin: 0 auto;
          background: #f05a4c;
          color: #fefffd;
          font-size: 46px;
          line-height: 74px;
          text-align: center;
          border-radius: 10px;
          margin-top:40px;
        }
        .closeBox{
          width: 68px;
          height: 68px;
          margin-left: 46.1%;
          margin-top: 193px;
          background: url('../../assets/closeBtn.png') no-repeat center;
          background-size: contain;
        }
      }
    }
  }
</style>
<style>
  .intelligenceTreatyBall .loading-box{
    text-align: center;
    margin-bottom: 20px;
  }
  .loading-more div{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .no-more{
    margin-bottom: 20px;
    text-align: center;
  }
</style>