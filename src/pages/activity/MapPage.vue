<template>
  <div class="mapBox" id="mapBox">
    <!-- <iframe id="mapPage"
      width="100%"
      height="100%"
      frameborder=0
      :src="`https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${long}&referer=体育-公众号`">
    </iframe> -->
  </div>
</template>

<script>
export default {
  name: 'MapPage',
  data() {
    return {
      longitude:0,//经度
      latitude:0,//纬度
      long: '',
      lat: '',
      timestamp: '',
      nonceStr: '',
      signature: ''
    }
  },
  created() {
    this.long = JSON.parse(window.sessionStorage.getItem('location')).lng
    this.lat = JSON.parse(window.sessionStorage.getItem('location')).lat
    // const url = location.href
    const that = this
    this.$http.getSignature().then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.timestamp = resp.data.timestamp
        this.nonceStr = resp.data.nonceStr
        this.signature = resp.data.signature
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxd3d4d3045a1213a1', // 必填，公众号的唯一标识
          timestamp: that.timestamp,
          nonceStr: that.nonceStr,
          signature: that.signature,
          jsApiList: [
            'openLocation',
          ]
        });
      }
    })
    wx.ready(function() {
      wx.openLocation({
        longitude: that.long,
        latitude: that.lat,
        scale: 15,
        name: '111111111',
        address: '111111111'
      })
    })
  },
  mounted() {
    
  },
  methods:{
    
    
  }
}
</script>

<style lang="scss" scoped>
  .mapBox{
    width: 100%;
    height: 100vh;
    .map{
      width: 100%;
      height: 100%;
    }
  }
</style>
