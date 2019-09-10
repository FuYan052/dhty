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
           <img @click="toDetail(item.id)" class="g_img" :src="item.image" alt="">
           <div class="g_bottom g_admin">
             <img :src="item.userImage" alt="">
             <p>{{item.userType}}<span>{{item.userName}}</span></p>
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
      // currLon: '',
      // currLat: '',
      currLon: '104.057150',
      currLat: '30.5702',
      type: 'sportsKinds_01',
      playGroungList: [],
      geolocation: '',
      latitude: "",
      longitude: '',
      isGetLocation: ''
    }
  },
  created() {
    // 获取用户当前位置
    // var myLatLng = new qq.maps.LatLng(myLatitude, myLongitude);
    // console.log(myLatLng)
    // this.geolocation = new qq.maps.Geolocation("ECMBZ-7HAK4-I3ZUO-D4BX7-WMD25-NSB6S", "公众号-体育"); 
    // var positionNum = 0;
    // var options = {timeout: 8000};
    // geolocation.getLocation(this.showPosition, this.showErr, options);
    // geolocation.getLocation(this.showPosition, this.showErr);
    this.getMyLocation();
    //   // 获取场馆列表
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
  // beforeMount() {
  //   // 获取场馆列表
  //   const params = {
  //     type: this.type,
  //     name:'',
  //     lon: this.currLon,
  //     lat: this.currLat
  //   }
  //   this.$http.getPlaygroundList(params).then(resp => {
  //     console.log(resp)
  //     if(resp.status == 200) {
  //       this.playGroungList = resp.data
  //       // console.log(this.playGroungList)
  //     }
  //   })
  // },
  mounted() {
    // this.geolocation.getLocation(this.showPosition, this.showErr);
    // this.getMyLocation();

  },
  methods: {
//     showPosition(position) {
//       console.log(position)
//       console.log("ok")
//       this.currLon = position.lng
//       this.currLat = position.lat
//      },
//      showErr() { 
//         //TODO 如果出错了调用此方法 
//     // this.$toast('无法获取您的地理位置！')
//     },
 


getMyLocation() {                
  var geolocation = new qq.maps.Geolocation("ECMBZ-7HAK4-I3ZUO-D4BX7-WMD25-NSB6S", "公众号-体育");
  geolocation.getIpLocation(this.showPosition, this.showErr);
},

showPosition(position) {                
  console.log(position);  
  console.log("已获取") 
  this.isGetLocation = true             
  this.latitude = position.lat;                
  this.longitude = position.lng;                
  // this.city = position.city;                
  // this.setMap();
},
showErr() {                
  console.log("定位失败"); 
   this.isGetLocation = false
  // this.$toast              
  this.getMyLocation();//定位失败再请求定位，测试使用
},//第二部分

//位置信息在地图上展示
  setMap() {                
    //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
    //设置地图中心点
    // var myLatlng = new qq.maps.LatLng(this.latitude,this.longitude); //定义工厂模式函数
    // var myOptions = {                  
    //   zoom: 13,     //设置地图缩放级别
    //   // center: myLatlng,    //设置中心点样式
    //   // mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
    // }                // //获取dom元素添加地图信息
    // var map = new qq.maps.Map(document.getElementById("container"), myOptions);
  //第三部分
  //给定位的位置添加图片标注
    // var marker = new qq.maps.Marker({                    
    //   position: myLatlng,                    
    //   map: map
    // });                //给定位的位置添加文本标注
    // var marker = new qq.maps.Label({                    
    //   position: myLatlng,                    
    //   map: map,                    
    //   content:'这是我当前的位置，偏差有点大，哈哈'
    // });
  },



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
      if(this.isGetLocation) {
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
      }else{
        this.$toast('获取位置信息中...')
      }
    }
  }
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
            font-size: 22px;
          }
          .g_top_left{
            color: #6989a6;
            position: relative;
          }
          .g_top_left::after{
            display: inline-block;
            content: '';
            width: 4px;
            height: 34px;
            border-right: 1px solid #cfcfcf;
            position: absolute;
            right: 0;
            top: 25px;
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
            font-size: 30px;
            color: #161616;
            margin: 25px 0;
            span{
              color: #989898;
              float: right;
              font-weight: normal;
            }
          }
          .g_img{
            width: 100%;
            height: 255px;
          }
          .g_bottom{
            width: 100%;
            height: 73px;
            padding-left: 10px;
            padding-right: 3px;
            img{
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 12px;
            }
            p{
              width: 80%;
              font-size: 23px;
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
              font-size: 30px;
              color: #fac51d;
              margin-top: 13px;
              margin-right: 10px;
            }
          }
          .g_admin{
            border-bottom: 1px solid #f3f3f3;
            img{
              border-radius: 50%;
            }
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
