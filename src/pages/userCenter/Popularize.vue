<template>
  <!-- 推广加群 -->
  <div class="popularize" v-title data-title="扫码进群">
    <div class="imgBox">
      <img ref="codeImg" id="img" :src="imgUrl" alt="">
    </div>
    <div class="saveBtn"></div>
  </div>
</template>

<script>
export default {
  name: 'Popularize',
  data() {
    return {
      imgUrl: require("../../assets/code.png"),
      downloadImg: ''
    }
  },
  mounted () {
    console.log(this.$refs.codeImg)
    this.downloadImg = this.$refs.codeImg
  },
  methods: {
    // downloadIamge(downloadImg, name) {
    //   var image = new Image()
    //   // 解决跨域 Canvas 污染问题
    //   // image.setAttribute('crossOrigin', 'anonymous')
    //   image.onload = function () {
    //       var canvas = document.createElement('canvas')
    //       canvas.width = image.width
    //       canvas.height = image.height
  
    //       var context = canvas.getContext('2d')
    //       context.drawImage(image, 0, 0, image.width, image.height)
    //       var url = canvas.toDataURL('image/png')
  
    //       // 生成一个a元素
    //       var a = document.createElement('a')
    //       // 创建一个单击事件
    //       var event = new MouseEvent('click')
  
    //       // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    //       a.download = name || '扫码进群'
    //       // 将生成的URL设置为a.href属性
    //       a.href = url

    //       // 触发a的单击事件
    //       a.dispatchEvent(event)
    //     }
    //   image.src = this.downloadImg.src
    //   console.log(image)
    //   // this.$toast({
    //   //   message: '下载成功',
    //   //   iconClass: 'icon icon-success'
    //   // });
    // },
  }
}
</script>

<style lang="scss" scoped>
  .popularize{
    width: 100%;
    min-height: 100vh;
    // background: rgba(79, 136, 131, 0.315);
    background: url("../../assets/saomaBg.jpg") no-repeat center;
    background-size: cover;
    overflow: hidden;
    // p{
    //   font-size: 40px;
    //   line-height: 40px;
    //   color: #fff;
    //   text-align: center;
    //   margin-top: 180px;
    // }
    .imgBox{
      width: 420px;
      height: 420px;
      background: #fff;
      margin: 0 auto;
      margin-top: 380px;
      overflow: hidden;
      img{
        width: 380px;
        height: 380px;
        margin: 20px auto;
      }
    }
    .saveBtn{
      width: 520px;
      height: 100px;
      margin: 155px auto;
      background: url("../../assets/saveBtn.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
