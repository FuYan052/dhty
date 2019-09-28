<template>
  <!-- 我创建的群列表 -->
  <div class="createdGroupList" v-title data-title="我创建的群">
    <!-- 当列表为空 -->
    <div class="noGroup" v-show="noGroup"></div>
    <!-- 当列表不为空 -->
    <ul v-show="!noGroup">
      <li v-for="(item,index) in createdGroupList" :key="index" @click="handle(item,index)">
        <div class="imgLogo">
          <img :src="item.logo" style="width: 100%; height: 100%; border-radius: 5px" alt="">
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
import { mapState } from 'vuex'
export default {
  name: 'CreatedGroupList',
  data() {
    return {
      createdGroupList: [],
      noGroup: false,
      userId:''
    }
  },
  // computed: {
  //   // 用户id
  //   ...mapState(['userId']),
  // },
  created() {
    this.userId = window.localStorage.getItem('userId')
    // 获取创建的群
    this.$http.createGroupList(this.userId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.createdGroupList = resp.data
        if(this.createdGroupList.length == 0) {
          this.noGroup = true
        }else{
          this.noGroup = false
        }
      }
    })
  },
  methods: {
    handle(item,index) {
      window.sessionStorage.setItem('handleGroupId',item.id)
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
    .noGroup{
      width: 100%;
      height: 100vh;
      background: url("../../../../assets/noListPage.jpg") no-repeat center;
      background-size: cover;
    }
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
        .imgLogo{
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

