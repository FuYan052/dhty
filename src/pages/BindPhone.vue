<template>
  <div class="bindPhone" v-title data-title="绑定手机号">

  </div>
</template>

<script>
export default {
  name: 'BindPhone',
  data() {
    return {
      // appid: 'Dwxf1894ca38c849d17',
      // redirectUrl: ''
      code: ''
    }
  },
  created() {
    // console.log(window.location.href)
    // console.log(location.search)
    const url = location.search
    const requertUrl = new Object()
    console.log(url.indexOf("?"))
    if(url.indexOf("?") != -1) {
      var str = url.substr(1);
      console.log(str)
      var strs = str.split("&");
      console.log(strs)
      for(var i = 0; i < strs.length; i ++) {
      requertUrl[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
    }
    console.log(requertUrl)
    this.code = requertUrl.code
    console.log(decodeURIComponent(requertUrl.state))
  },
  mounted() {
    this.$http.getWXLogin(this.code).then(resp => {
      console.log(resp)
    })
  }
}
</script>

<style lang="scss" scoped>
  .bindPhone{

  }
</style>