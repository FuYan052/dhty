<template>
  <!-- 组织活动-地图选择地点 -->
  <div class="mapSelection" id="mapSelection" v-title data-title="选择地点">
    <div class="serchBox">
      <el-input
        placeholder="搜索场地"
        prefix-icon="el-icon-search"
        v-model="value">
      </el-input>
      <div class="serchBtn" @click="handleSearch">搜索</div>
    </div>
    <div class="mapBox">
        <div id="mapBox">
            <p id="mapInfo"></p>
        </div>
    </div>
    <div class="sureBtn" v-show="isOriginHei" @click="sure">确&nbsp;&nbsp;&nbsp;定</div>
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
      selectedPoint: '',
      value: '',
      isOriginHei: true,
      screenHeight: document.documentElement.clientHeight, 
      originHeight: document.documentElement.clientHeight,
      toPath: '',
      toPathName: ''
    }
  },
  watch: {
    screenHeight (val) {
      if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
          this.isOriginHei = false;
      }else{
          this.isOriginHei = true;
      }
    }
  },
  beforeRouteEnter(to, from, next)  {
    window.sessionStorage.setItem('mapToPath',from.fullPath)
    window.sessionStorage.setItem('mapToPathName',from.name)
    next()
  },
  created() {
  },
  // beforeMount() {
  //   this.showMap(30.657420,104.065840);
  // },
  mounted() {
    // 显示地图
    this.showMap(30.657420,104.065840);
    
    // 检测浏览器变化
    let self = this;
    window.onresize = function() {
      return (function(){
          self.screenHeight = document.documentElement.clientHeight;
      })()
    }
  },
  methods:{
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

        const params = {
          type: window.sessionStorage.getItem('typeId'),
          name: ''
        }
        this.$http.getVenueInfo(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.list = resp.data
            if(this.list.length == 0) {
              this.$toast({
              message: '暂时没有场地哦！',
              duration: 3000
              });
            }
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
            this.$toast({
              message: '获取列表失败！',
              duration: 2000
            });
          }
        })
      },
      // 搜索调用地图
      showMap2(latitude, longitude){
        var map = new qq.maps.Map(document.getElementById("mapBox"),{    //地图部分初始化
            zoom: 12,               //设置地图缩放级别
            center: new qq.maps.LatLng(latitude, longitude),     //设置中心点
            zoomControl: false,    //不启用缩放控件
            mapTypeControlOptions: {  //设置控件的地图类型为普通街道地图
                mapTypeIds: qq.maps.MapTypeId.ROADMAP
            }
        });
        var info = new qq.maps.InfoWindow({ map: map });      //添加提示窗
        
        const params = {
          type: window.sessionStorage.getItem('typeId'),
          name: this.value	
        }
        this.$http.getVenueInfo(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.list = resp.data
            if(this.list.length == 0) {
              this.$toast({
              message: '暂时没有场地哦！',
              duration: 3000
            });
            }
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
            this.$toast({
              message: '获取列表失败！',
              duration: 2000
            });
          }
        })
      },
      // 搜索
      handleSearch() {
        this.showMap2(30.657420,104.065840)
      },
      sure() {
        if(this.selectedPoint !== '') {
          this.$router.push({
            path: window.sessionStorage.getItem('mapToPath'),
            name: window.sessionStorage.getItem('mapToPathName'),
            params: {
              placeId: this.selectedPoint.id,
              placeName : this.selectedPoint.name
            }
          })
        }else{
          this.$toast({
            message: '请选择地点',
            duration: 1000
          });
        }
      }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('mapToPath')
    window.sessionStorage.removeItem('mapToPathName')
  }
}
</script>

<style lang="scss" scoped>
  .mapSelection{
    width: 100%;
    height: 100vh;
    position: relative;
    .serchBox{
      width: 100%;
      height: 110px;
      background-color: #e4e9e1;
      padding: 20px;
      .serchBtn{
        width: 11%;
        height: 70px;
        // border: 1px solid red;
        line-height: 70px;
        text-align: right;
        float: right;
        font-size: 32px;
        color: #44c294;
      }
    }
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
      position: fixed;
      bottom: 0;
    }
  }
</style>
<style>
  .mapSelection .mapInfo .center{
    color: #0e0e0e;
    font-weight: bold;
  }
  .mapSelection .mapBox p{
    line-height: 36px;
    color: #595959;
  }
  .mapSelection .serchBox .el-input {
    width: 88%;
    height: 70px;
    margin-top: 5px;
  }
  .mapSelection .el-input--prefix .el-input__inner{
    height: 60px;
    line-height: 60px;
    border: none;
    outline: none;
    font-size: 28px;
    padding-left: 60px;
  }
  .mapSelection .el-input__prefix{
    padding: 0 7px;
    font-size: 30px;
  }
  .mapSelection .el-input__icon{
    line-height: 60px;
  }
  /* .mint-searchbar{
    height: 110px;
    padding: 10px 30px;
    background-color: #e8e9e8;
  }
  .mint-searchbar-inner {
    height: 70px;
    font-size: 28px;
  }
  .mint-searchbar-inner .mintui-search {
    font-size: 30px;
    padding-left: 10px;
    padding-right: 15px;
  }
  .mint-searchbar-core{
    font-size: 27px;
  } */
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