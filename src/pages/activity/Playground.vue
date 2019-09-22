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
    </div>
    <div class="contentWrap">
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
                <img :src="item.userImage" style="width: 100%; height: 100%;" alt="">
             </div>
             <p>{{item.userType}}<span>&nbsp;&nbsp;&nbsp;{{item.userName}}</span></p>
             <div class="icon"><a :href="'tel:' + item.userPhone"><span class="el-icon-phone"></span></a></div>
           </div>
           <div class="g_bottom g_address">
             <div class="img"><span class="el-icon-s-home"></span></div>
             <p>{{item.address}}</p>
             <div class="icon" @click="toMap(item.lat,item.lon)"><span class="el-icon-location"></span></div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playground',
  data() {
    return {
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
    }
  },
  created() {
    // 获取用户当前位置
    const url = location.href
    this.$http.getSignature(url.substr(0, url.indexOf(location.hash))).then(resp => {
      if(resp.status = 200) {
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
          timestamp: this.timestamp,
          nonceStr: this.nonceStr,
          signature: this.signature,
          jsApiList: [
            'getLocation',
          ]
        });
        // 获取经纬度
        wx.ready(function() {
          wx.getLocation({
            type: 'wgs84', 
            success: function (res) {
              // console.log(res)
              that.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              that.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              const params = {
                type: that.type,
                name:'',
                lon: that.longitude,
                lat: that.latitude
              }
              that.$http.getPlaygroundList(params).then(resp => {
                console.log(resp)
                if(resp.status == 200) {
                  that.playGroungList = resp.data
                  // console.log(this.playGroungList)
                }
              })
            },
            cancel: function (res) {
              const params = {
                type: that.type,
                name:'',
                lon: that.currLon,
                lat: that.currLat
              }
              that.$http.getPlaygroundList(params).then(resp => {
                console.log(resp)
                if(resp.status == 200) {
                  that.$toast('获取地理位置失败，当前距离为平台默认距离！')
                  that.playGroungList = resp.data
                  // console.log(this.playGroungList)
                }
              })
            }
          })
        });
        // 调取微信接口失败
        wx.error(function(res){
          const params = {
            type: that.type,
            name:'',
            lon: that.currLon,
            lat: that.currLat
          }
          that.$http.getPlaygroundList(params).then(resp => {
            console.log(resp)
            if(resp.status == 200) {
              that.$toast('获取地理位置失败，当前距离为平台默认距离！')
              that.playGroungList = resp.data
              // console.log(this.playGroungList)
            }
          })
        })
      }
    })

  },
methods: {
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
      name:'',
      lon: this.currLon,
      lat: this.currLat
    }
    this.$http.getPlaygroundList(params).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.playGroungList = resp.data
        // console.log(this.playGroungList)
      }
    })
  },
  toDetail(id) {
    window.sessionStorage.setItem('playGroundDetail',id)
    this.$router.push({
      path: '/playgroundDetail',
    })
  },
  toMap(lat,lon) {
    console.log('去地图')
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
  }
},
    
}
</script>

<style lang="scss" scoped>  
  .playground{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cateNav{
      width: 100%;
      height: 94px;
      background: #fac31e;
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
    }
    .contentWrap{
      width: 100%;
      padding: 0 20px;
      .groundItem{
        width: 100%;
        min-height: 572px;
        background: #fff;
        margin-top: 30px;
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
              margin-top: 4px;
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
            border: 1px solid red;
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
