<template>
  <!-- 我创建的群列表 -->
  <div class="createdGroupList" v-title data-title="我创建的群">
    <ul>
      <li v-for="(item,index) in 3" :key="index" @click="handle">
        <img src="../../../../assets/g-img.png" alt="">
        <div class="text">
          <p>飞羽羽毛球社区</p>
          <p>共参加过5次活动</p>
        </div>
        <span class="el-icon-arrow-right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CreatedGroupList',
  methods: {
    handle() {
      this.$router.push({
        path: '/userCenter/groupManagement/createdGroupManage'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .createdGroupList{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      padding: 0 20px;
      li{
        width: 100%;
        height: 110px;
        border-bottom: 1px solid #eee8e8;
        padding: 0 20px;
        img{
          width: 80px;
          height: 80px;
          border-radius: 10px;
          float: left;
          margin-top: 15px;
        }
        .text{
          width: 80%;
          height: 110px;
          float: left;
          p{
            font-size: 27px;
            padding-left: 20px;
            line-height: 70px;
          }
          p:nth-child(2){
            font-size: 20px;
            color: #9f9f9f;
            line-height: 20px;
            padding-left: 30px;
          }
        }
        span{
          float: right;
          line-height: 110px;
          font-weight: bold;
          color: #ddd9d9;
        }
      }
    }
  }
</style>

