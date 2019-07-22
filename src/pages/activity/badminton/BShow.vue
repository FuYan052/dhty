<template>
  <!-- 羽毛球风采墙 -->
  <div class="bShow">
    <ul>
      <li v-for="(item,index) in 6" :key="index">
        <img src="../../../assets/123.jpg" alt="">
        <p>羽毛球羽毛球</p>
        <div class="wrap">
          <img src="../../../assets/touxiang.jpg" alt="">
          <span>小王子</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BShow'
}
</script>

<style lang="scss" scoped>
  .bShow{
    width: 100%;
    min-height: 100vh;
    background: #e4e4e4;
    padding-bottom: 90px;
    ul{
      width: 100%;
      height: auto;
      li{
        width: 335px;
        height: 450px;
        background: #fff;
        display: inline-block;
        vertical-align: top;
        margin-top: 20px;
        margin-left: 27px;
        img{
          width: 100%;
          height: 312px;
          margin-top: 15px;
        }
        p{
          width: 330px;
          margin-top: 25px;
          line-height: 30px;
          padding-left: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .wrap{
          width: 100%;
          height: 50px;
          margin-top: 10px;
          padding-left: 20px;
          img{
            width: 50px;
            height: 50px;
            display: inline-block;
            border-radius: 50%;
            margin: 0;
            vertical-align: top;
          }
          span{
            display: inline-block;
            color: #9a9a9a;
            font-size: 22px;
            vertical-align: middle;
            line-height: 50px;
            padding-left: 30px;    
          }
        }
      }
    }
  }
</style>

