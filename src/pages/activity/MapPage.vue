<template>
  <div class="mapBox" id="mapBox">
    <iframe id="mapPage"
      width="100%"
      height="100%"
      frameborder=0
      :src="`https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${long}&referer=体育-公众号`">
    </iframe>
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
    }
  },
  created() {
    this.long = JSON.parse(window.sessionStorage.getItem('location')).lng
    this.lat = JSON.parse(window.sessionStorage.getItem('location')).lat
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
