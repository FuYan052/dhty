<template>
  <!-- 组织活动-地图选择地点 -->
  <div class="mapSelection" id="mapSelection" v-title data-title="选择地点">
    <div class="mapBox">
        <div id="mapBox">
            <p id="mapInfo"></p>
        </div>
    </div>
    <div class="sureBtn" @click="sure">确&nbsp;&nbsp;&nbsp;定</div>
  </div>
</template>

<script>
export default {
  name: 'MapPage',
  data() {
    return {
      longitude:104.065840,//经度
      latitude:30.657420,//纬度
      long: '',
      lat: '',
      list: [],
      selectedPoint: ''
    }
  },
  created() {
    // const typeId = window.sessionStorage.getItem('typeId')
    // this.$http.getVenueInfo(typeId).then(resp => {
    //   console.log(resp)
    //   if(resp.status == 200) {
    //     this.list = resp.data
    //   }
    // })

    // this.long = JSON.parse(window.sessionStorage.getItem('location')).lng
    // this.lat = JSON.parse(window.sessionStorage.getItem('location')).lat
  },
  // beforeMount() {
  //   this.showMap(30.657420,104.065840);
  // },
  mounted() {
    this.showMap(30.657420,104.065840);
  },
  methods:{
    // 获取当前位置经纬度
    // getLocation() {
    //   var geocoder = new qq.maps.Geocoder();
    //   geocoder.getLocation("中国四川省成都市武侯区益州大道中段555号");
    //   geocoder.setComplete(function(result) {
    //     //获取到的经纬度存储在result.detail.location对象中
    //       var latitude = result.detail.location.lat;
    //       var longitude = result.detail.location.lng;
    //       // console.log(latitude,longitude)
    //   });
    //   geocoder.setError(function() {
    //     console.log("获取定位失败！")
    //       //获取经纬度失败（可能是因为输入的地址不对）
    //   });
    // },


      // 调用腾讯地图
      showMap(latitude, longitude){
        var map = new qq.maps.Map(document.getElementById("mapBox"),{    //地图部分初始化
            zoom: 12,               //设置地图缩放级别
            center: new qq.maps.LatLng(latitude, longitude),     //设置中心点
            zoomControl: false,    //不启用缩放控件
            mapTypeControlOptions: {  //设置控件的地图类型为普通街道地图
                mapTypeIds: qq.maps.MapTypeId.ROADMAP
            }
        });
        var info = new qq.maps.InfoWindow({ map: map });      //添加提示窗

        const typeId = window.sessionStorage.getItem('typeId')
        this.$http.getVenueInfo(typeId).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.list = resp.data

            const that = this
            for(let i=0; i<this.list.length; i++){
                let data = this.list[i];
                let marker = new qq.maps.Marker({ 
                  position: new qq.maps.LatLng(data.lat, data.lon), 
                  map: map });    //创建标记
                  // console.log(marker)
                  //***将必要的数据存入每一个对应的marker对象
                  marker.id = data.id;
                  marker.name = data.name;
                  marker.locate = data.address;
                  
                  qq.maps.event.addListener(marker, 'click', function() {    //获取标记的点击事件
                    let _this = marker
                    // console.log(_this.name)
                    that.selectedPoint = {
                      id: _this.id,
                      name: _this.name
                    }
                    // console.log(that.selectedPoint)
                    info.open();  //点击标记打开提示窗
                    info.setContent('<div class="mapInfo"><p class="center">'+_this.name+'</p><p>'+_this.locate+'</p></div>');  //***设置提示窗内容（这里用到了marker对象中保存的数据）
                    // info.setContent('<div class="mapInfo"><p class="center">'+_this.name+'</p><p>'+_this.locate+'</p><span type="button" onlick="bindShop(\''+_this.id+','+_this.position.lat+','+_this.position.lng+'\')">确定</span></div>');  //***设置提示窗内容（这里用到了marker对象中保存的数据）
                    info.setPosition(new qq.maps.LatLng(_this.position.lat, _this.position.lng));  //提示窗位置
                });
                
            }
          }else{
            this.$toast('获取列表失败！')
          }
        })
        // console.log(this.list)
        
        // var result = { 
        //   "code":0, 
        //   "msg":"success", 
        //   "data": this.list,
        //   "data":[ 
        //     {"id":1,"name":"蛟龙羽毛球馆","locate":"四川省成都市双流区双楠大道下段22号","latitude":"30.603260", "longitude":"103.914230"}, 
        //     {"id":2,"name":"凌飞羽毛球馆","locate":"四川省成都市双流区华阳镇华府大道二段748号附15号","latitude":"30.526540", "longitude":"104.032990"},
        //     {"id":3,"name":"百灵鸟吉翔羽毛球馆","locate":"四川省成都市武侯区武兴五路219号","latitude":"30.626650", "longitude":"103.974780"}, 
        //     {"id":4,"name":"中航工业成飞体育馆","locate":"四川省成都市武侯区高攀路26号","latitude":"30.698750", "longitude":"103.960240"}, 
        //     {"id":5,"name":"先锋羽毛球馆","locate":"四川省成都市成华区一环路东三段170号附17","latitude":"30.660762", "longitude":"104.101340"}, 
        //     {"id":6,"name":"1906羽毛球馆","locate":"四川省成都市武侯区高攀路26号","latitude":"30.613970", "longitude":"104.083350"}]};
        // result中数据 用于显示标记、和标记点击时的提示信息
          // const that = this
            
      },
      sure() {
        if(this.selectedPoint !== '') {
          // console.log(this.selectedPoint)
          window.sessionStorage.setItem('placeId',this.selectedPoint.id)
          window.sessionStorage.setItem('placeName',this.selectedPoint.name)
          
          // this.$router.push({
          //   path: '/organization',
          //   // name: 'Organization',
          //   // params: this.selectedPoint
          // })
          this.$router.go(-1)
          
        }else{
          this.$toast({
            message: '请选择地点',
            duration: 1000
          });
        }
      }
  }
}
</script>

<style lang="scss" scoped>
  .mapSelection{
    width: 100%;
    height: 100vh;
    .map{
      width: 100%;
      height: 80%;
    }
    .mapBox {
      width: 100%; 
      font-size: 20px; 
      height: 93vh;
      #mapInfo{
        padding: 20px;
      }
      div{
        width: 100%;
        height: 100%;
      }
    }
    .sureBtn{
      width: 100%;
      height: 7vh;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-size: 30px;
      background: #44c294;
    }
  }
</style>
<style>
  .mapInfo .center{
    color: #0e0e0e;
    font-weight: bold;
  }
  .mapBox p{
    line-height: 36px;
    color: #595959;
  }
  /* .mapInfo span{
    display: block; 
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #0c9; 
    background: #fafafb; 
    border: 1px solid #0c9; 
    border-radius: 12px;
    margin-top: 10px;
  } */
</style>