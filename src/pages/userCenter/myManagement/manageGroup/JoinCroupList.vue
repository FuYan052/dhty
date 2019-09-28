<template>
  <!-- 参加的群列表 -->
  <div class="joinCroupList" v-title data-title="我参加的群">
    <!-- 当列表为空 -->
    <div class="noJionGroup" v-show="noJionGroup"></div>
    <!-- 当列表不为空 -->
    <ul v-show="!noJionGroup">
      <li v-for="(item,index) in groupList" :key="index" @click="handle(item.id)">
        <div class="image">
          <img :src="item.logo" style="width: 100%; height: 100%; border-radius: 5px;" alt="">
        </div>
        <div class="text">
          <p>{{item.name}}</p>
          <p>共参加过{{item.count}}次活动</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'JoinCroupList',
  data() {
    return{
      groupList: [],
      noJionGroup: false,
      userId: ''
    }
  },
  // computed: {
  //   // 用户id
  //   ...mapState(['userId']),
  // },
  created() {
    this.userId = window.localStorage.getItem('userId')
    // 获取参加的群列表
    this.$http.getJoinedGroup(this.userId).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.groupList = resp.data
        if(this.groupList.length == 0) {
          this.noJionGroup = true
        }else{
          this.noJionGroup = false
        }
      }else{
        this.$toast({
          message: '获取列表失败！',
          duration: 2000
        });
      }
    })
  },
  methods: {
    handle(groupId) {
      window.sessionStorage.setItem('groupDetailId',groupId)
      this.$router.push({
        path: `/club/clubInfo/${groupId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .joinCroupList{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .noJionGroup{
      width: 100%;
      height: 100vh;
      background: url("../../../../assets/noListPage.jpg") no-repeat center;
      background-size: cover;
    }
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
        .image{
          width: 80px;
          height: 80px;
          // border-radius: 10px;
          float: left;
          margin-top: 15px;
          // img{
          //   width: 100%;
          //   height: 100%;
          //   border-radius: 10px;
          // }
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
      }
    }
  }
</style>

