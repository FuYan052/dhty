<template>
  <!-- 活动场地 -->
  <div class="playground">
    <!-- 头部菜单栏 -->
    <div class="cateNav">
      <div class="content">
        <div 
          class="cateItem"
          v-for="(item,index) in cateList" 
          :key="index"
          @click="changeCate(item,index)"
          :class="{activeCate : currIndex === index}"
          >{{item}}</div>
      </div>
      <div class="secrachBtn" @click="showSearch"><span class="el-icon-search"></span></div>
    </div>
    <!-- 搜索框 -->
    <div class="serchBox" v-show="ishowSearch">
      <el-input
        placeholder="搜索场地"
        prefix-icon="el-icon-search"
        v-model="searchInput">
      </el-input>
      <div class="serchText" @click="handleSearchBtn">搜索</div>
    </div>
    <!-- 没有场地时显示缺省页 -->
    <div class="noList" v-show="noData"></div>
    <!-- 场地列表 -->
    <div class="contentWrap" 
        v-show="!noData"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isMoreLoading"
        :infinite-scroll-immediate-check="true"
        infinite-scroll-distance="10">
      <div class="groundItem" v-for="(item,index) in playGroungList" :key="index">
         <div class="g_top" @click="toDetail(item.id)">
           <div class="g_top_left">
             {{item.time}}
           </div>
           <div class="g_top_right">
             <span class="el-icon-coin"></span>{{item.cost}}元/小时
           </div>
         </div>
         <div class="g_detail">
           <p class="g_name" @click="toDetail(item.id)">
             {{item.name}}<span>{{item.distance}}km</span>
           </p>
           <div class="playGroundImg" @click="toDetail(item.id)" >
             <img :src="item.image" style="width: 100%; height: 100%;" alt="">
           </div>
           <div class="g_bottom g_admin">
             <div class="userImg">
                <img :src="item.userImage" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
             </div>
             <p>{{item.userType}}<span>&nbsp;&nbsp;&nbsp;{{item.userName}}</span></p>
             <div class="icon"><a :href="'tel:' + item.userPhone"><span class="el-icon-phone"></span></a></div>
           </div>
           <div class="g_bottom g_address">
             <div class="img"><span class="el-icon-s-home"></span></div>
             <p>{{item.address}}</p>
             <div class="icon" @click="toMap(item.lat,item.lon,item.name,item.address)"><span class="el-icon-location"></span></div>
           </div>
         </div>
      </div>
    </div>
    <!--显示加载中转菊花-->
    <!-- 当只有一页数据时不显示  由showLoading控制-->
    <div class="showLoading" v-show="showLoading">  
      <div class="loading-box tc" v-if="isLoading">
        <mt-spinner type="snake" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="no-more" v-if="noMore">没有更多了~</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playground',
  data() {
    return {
      noData: false,  //缺省页控制
      cateList: ['羽毛球', '跑步'],
      currIndex: 0,
      address: '',
      zoom: 3,
      currLon: '104.057150',
      currLat: '30.5702',
      type: 'sportsKinds_01',
      playGroungList: [],
      timestamp: '',
      nonceStr: '',
      signature: '',
      latitude: '',
      longitude: '',
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
      searchInput: '',  //搜索输入
      ishowSearch: false,  //默认不显示搜索
      timer1: null,  //计时器
      timer2: null,  //计时器
    }
  },
  created() {
    // 获取用户当前位置
    const url = location.href
    this.$http.getSignature(url.substr(0, url.indexOf(location.hash))).then(resp => {
      if(resp.status = 200) {
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
          // timestamp: '1568982632',
          // nonceStr: '1f1a415c-a272-426f-84d2-7237d81519b0',
          // signature: '53ee80f7bf5b8fe27a32415dbd85d5d2692d67db',
          timestamp: that.timestamp,
          nonceStr: that.nonceStr,
          signature: that.signature,
          jsApiList: ['getLocation','openLocation']
        });
        // 获取经纬度
        wx.ready(function() {
          that.$indicator.close()
          wx.getLocation({
            type: 'wgs84', 
            success: function (res) {
              // console.log(res)
              that.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              that.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              const params = {
                type: that.type,
                keyWord:'',
                lon: that.longitude,
                lat: that.latitude,
                page: 1
              }
              that.$http.getPlaygroundList(params).then(resp => {
                console.log(resp)
                if(resp.status == 200) {
                  that.playGroungList = resp.data.rows
                  if(that.playGroungList.length == 0) {
                    that.noData = true
                  }else{
                    that.noData = false
                  }
                  // 分页信息
                  that.pageInfo.totalPage = resp.data.pageNum
                  that.pageInfo.page = resp.data.prePage

                  // console.log(this.playGroungList)
                }
              })
            },
            cancel: function (res) {
              const params = {
                type: that.type,
                keyWord:'',
                lon: that.currLon,
                lat: that.currLat,
                page: 1
              }
              that.$http.getPlaygroundList(params).then(resp => {
                console.log(resp)
                if(resp.status == 200) {
                  that.$toast('获取地理位置失败，当前距离为平台默认距离！')
                  that.playGroungList = resp.data.rows
                  if(that.playGroungList.length == 0) {
                    that.noData = true
                  }else{
                    that.noData = false
                  }
                  // console.log(this.playGroungList)
                  that.pageInfo.totalPage = resp.data.pageNum
                  that.pageInfo.page = resp.data.prePage
                }
              })
            }
          })
        });
        // 调取微信接口失败
        wx.error(function(res){
          const params = {
            type: that.type,
            keyWord:'',
            lon: that.currLon,
            lat: that.currLat,
            page: 1
          }
          that.$http.getPlaygroundList(params).then(resp => {
            console.log(resp)
            if(resp.status == 200) {
              that.$toast('获取地理位置失败，当前距离为平台默认距离！')
              that.playGroungList = resp.data.rows
              // console.log(this.playGroungList)
              that.pageInfo.totalPage = resp.data.pageNum
              that.pageInfo.page = resp.data.prePage
            }
          })
        })
      }
    })

  },
methods: {
  // 搜索
  showSearch() {
    this.ishowSearch = !this.ishowSearch
  },
  handleSearchBtn() {
    const params = {
      type: this.type,
      keyWord: this.searchInput,
      lon: this.currLon,
      lat: this.currLat,
      page: this.pageInfo.page
    }
    console.log(params)
    this.playGroungList = []
    this.timer1 = setTimeout(() =>{
      this.ishowSearch = false
    },200)
    this.$http.getPlaygroundList2(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.isLoading = false
        this.isMoreLoading = false
        this.playGroungList = this.playGroungList.concat(resp.data.rows)
        if(this.playGroungList.length == 0) {
          this.noData = true
        }else{
          this.noData = false
        }
        // console.log(this.playGroungList)
        this.pageInfo.totalPage = resp.data.pageNum
        this.pageInfo.page = resp.data.prePage
      }
    })
  },
  loadMore () { // 加载更多
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
        keyWord:this.searchInput,
        lon: this.currLon,
        lat: this.currLat,
        page: this.pageInfo.page
      }
      // console.log(params)
      this.timer2 = setTimeout(() => {
        this.$http.getPlaygroundList2(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.isLoading = false
            this.isMoreLoading = false
            this.playGroungList = this.playGroungList.concat(resp.data.rows)
            if(this.playGroungList.length == 0) {
              this.noData = true
            }else{
              this.noData = false
            }
            // console.log(this.playGroungList)
            this.pageInfo.totalPage = resp.data.pageNum
            this.pageInfo.page = resp.data.prePage
          }
        })
      },1000)
    }
  },
  // 切换分类
  changeCate(item,index) {
    this.currIndex = index
    if(index === 0) {
      this.type = 'sportsKinds_01'
    }
    if(index === 1) {
      this.type = 'sportsKinds_02'
    }
    const params = {
      type: this.type,
      keyWord: this.searchInput,
      lon: this.currLon,
      lat: this.currLat,
      page: 1
    }
    this.$http.getPlaygroundList(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.playGroungList = resp.data.rows
        if(this.playGroungList.length == 0) {
          this.noData = true
        }else{
          this.noData = false
        }
        // console.log(this.playGroungList)
        this.pageInfo.totalPage = resp.data.pageNum
        this.pageInfo.page = resp.data.prePage
      }
    })
  },
  toDetail(id) {
    const configData = {
      timestamp: this.timestamp,
      nonceStr: this.nonceStr,
      signature: this.signature,
    }
    window.sessionStorage.setItem('playGroundDetail',id)
    window.sessionStorage.setItem('config',JSON.stringify(configData))  //详情页调微信接口的配置
    this.$router.push({
      path: '/playgroundDetail',
    })
  },
  toMap(lat,lon,name,address) {
    const location = {
      lat: lat,
      lng: lon
    }
    const that = this
    wx.openLocation({
      longitude: Number(lon),
      latitude: Number(lat),
      scale: 13,
      name: name,
      address: address,
      fail: function() {
        that.$toast('抱歉，调起导航失败！')
      }
    })
    // this.$router.push({
    //   path: '/mapPage',
    //   name: 'MapPage',
    //   params: location
    // })
    // window.sessionStorage.setItem('location',JSON.stringify(location))
  }
},
  beforeDestroy() {
    clearTimeout(this.timer1)
    this.timer1 = null
    clearTimeout(this.timer2)
    this.timer2 = null
  }  
}
</script>

<style lang="scss" scoped>  
  .playground{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 20px;
    position: relative;
    padding-top: 124px;
    .noList{
      width: 100%;
      height: 100vh;
      background: url('../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    .cateNav{
      width: 100%;
      height: 94px;
      background: #fac31e;
      position: fixed;
      top: 0;
      z-index: 3;
      .content{
        width: 246px;
        height: 94px;
        margin: 0 auto;
        padding-top: 20px;
        .cateItem{
          width: 40%;
          height: 62px;
          line-height: 62px;
          text-align: center;
          color: #f3fbf9;
          font-size: 32px;
        }
        .cateItem:nth-child(1){
          float: left;
        }
        .cateItem:nth-child(2){
          float: right;
        }
        .activeCate{
          color: #000;
          border-bottom: 3px solid #000;
        }
      }
      .secrachBtn{
        width: 60px;
        height: 94px;
        // border: 1px solid red;
        position: absolute;
        top: 0;
        right: 0;
        span{
          font-size: 34px;
          // color: #fff;
          line-height: 100px;
        }
      }
    }
    .serchBox{
      width: 100%;
      height: 90px;
      // background-color: #e4e9e1;
      padding: 10px;
      padding-left: 20px;
      margin-top: -20px;
      .serchText{
        width: 11%;
        height: 70px;
        // border: 1px solid red;
        line-height: 70px;
        text-align: right;
        float: right;
        font-size: 30px;
        color: #000;
      }
    }
    .contentWrap{
      width: 100%;
      padding: 0 20px;
      max-height: 98vh;
      overflow-y: auto;
      // border: 1px solid red;
      .groundItem{
        width: 100%;
        min-height: 572px;
        background: #fff;
        margin-bottom: 30px;
        .g_top{
          width: 100%;
          height: 80px;
          border-bottom: 1px solid #f4f4f4;
          div{
            width: 220px;
            height: 100%;
            float: left;
            line-height: 78px;
            padding-left: 25px;
            font-size: 27px;
          }
          .g_top_left{
            color: #6989a6;
            position: relative;
          }
          .g_top_left::after{
            display: inline-block;
            content: '';
            width: 4px;
            height: 40px;
            border-right: 1px solid #cfcfcf;
            position: absolute;
            right: 0;
            top: 20px;
          }
          .g_top_right{
            color: #5d5d5d;
            span{
              color: #2f9f87;
              font-weight: bold;
              padding-right: 15px;
            }
          }
        }
        .g_detail{
          width: 100%;
          padding: 0 20px;
          .g_name{
            font-size: 31px;
            color: #161616;
            margin: 25px 0;
            span{
              color: #989898;
              float: right;
              font-weight: normal;
            }
          }
          .playGroundImg{
            width: 100%;
            height: 255px;
            // img{
            //   width: 100%;
            //   height: 100%;
            // }
          }
          .g_bottom{
            width: 100%;
            height: 73px;
            padding-left: 10px;
            padding-right: 3px;
            .userImg{
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 12px;
              // img{
              //   width: 100%;
              //   height: 100%;
              // }
            }
            p{
              width: 80%;
              font-size: 27px;
              line-height: 73px;
              float: left;
              margin-left: 25px;
              color: #2b2b2b;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            .icon{
              width: 25px;
              height: 30px;
              float: right;
              font-size: 34px;
              color: #fac51d;
              margin-top: 12px;
              margin-right: 10px;
            }
          }
          .g_admin{
            border-bottom: 1px solid #f3f3f3;
            // .userImg{
            //   // img{
            //   //   border-radius: 50%;
            //   // }
            // }
            .icon{
              a{
                color: #fac51d;
              }
            }
          }
          .g_address{
            .img{
              border-radius: 25%;
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 12px;
              span{
                font-size: 40px;
                color: #2f9f87;
                line-height: 50px;
                text-align: center;
              }
            }
          }
          .mapBox{
            width: 100%;
            height: 500px;
            // border: 1px solid red;
            margin: 10px 0;
            .bm-view{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    
  }
</style>
<style>
  .loading-box{
    text-align: center;
  }
  .loading-more div{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .no-more{
    text-align: center;
  }
  .playground .serchBox .el-input {
    width: 88%;
    height: 70px;
    margin-top: 5px;
  }
  .playground .el-input--prefix .el-input__inner{
    height: 60px;
    line-height: 60px;
    border: none;
    outline: none;
    font-size: 28px;
    padding-left: 60px;
  }
  .playground .el-input__prefix{
    padding: 0 7px;
    font-size: 30px;
  }
  .playground .el-input__icon{
    line-height: 60px;
  }
</style>