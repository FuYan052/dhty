<template>
  <!-- ta的所属社群列表 -->
  <div class="attendGroupList" v-title data-title="所属社群">
    <ul>
      <li v-for="(item,index) in groupList" :key="index" @click="toGroupDetail(item)">
        <div class="logoImg">
          <img :src="item.logo" style="width: 100%; height: 100%; border-radius: 5px;" alt="">
        </div>
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
        if(resp.data.length == 0) {
          this.$toast({
            message: '暂无社群！',
            duration: 2000
          });
        }
      }
    })
  },
  methods: {
    toGroupDetail(item) {
      console.log(item)
      window.sessionStorage.setItem('groupDetailId',item.id)
      this.$router.push({
        path: `/club/clubInfo/${item.id}`
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
      li{
        width: 100%;
        height: 150px;
        // border-bottom: 1px solid #eee8e8;
        background: #fff;
        padding: 0 40px;
        margin-bottom: 20px;
        .logoImg{
          width: 100px;
          height: 100px;
          border-radius: 10px;
          float: left;
          margin-top: 23px;
          // img{
          //   width: 100%;
          //   height: 100%;
          //   border-radius: 10px;
          // }
        }
        .text{
          width: 76%;
          height: 150px;
          float: left;
          padding-top: 18px;
          p{
            font-size: 31px;
            padding-left: 20px;
            line-height: 70px;
          }
          p:nth-child(2){
            font-size: 26px;
            color: #9f9f9f;
            line-height: 20px;
            padding-left: 20px;
          }
        }
        span{
          float: right;
          line-height: 150px;
          font-size: 38px;
          // font-weight: bold;
          color: #504f4f;
        }
      }
    }
  }
</style>

    