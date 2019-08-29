<template>
  <!-- ta的所属社群列表 -->
  <div class="attendGroupList" v-title data-title="所属社群">
    <ul>
      <li v-for="(item,index) in groupList" :key="index" @click="toGroupDetail(item)">
        <img :src="item.logo" alt="">
        <div class="text">
          <p>{{item.name}}</p>
          <p>共参加过{{item.count}}次活动</p>
        </div>
        <span class="el-icon-arrow-right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AttendGroupList',
  data() {
    return {
      groupList: ''
    }
  },
  created() {
    const userInfoId = window.sessionStorage.getItem('userInfoId')
    this.$http.groupList(userInfoId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.groupList = resp.data
      }
    })
  },
  methods: {
    toGroupDetail(item) {
      console.log(item)
      window.sessionStorage.setItem('groupDetailId',item.id)
      this.$router.push({
        path: '/clubHome'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .attendGroupList{
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

    