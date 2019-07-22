<template>
  <!-- 羽毛球活动信息 -->
  <div class="activitiesDetail">
    <router-view></router-view>
    <div class="tabbar">
      <ul>
        <li 
          v-for="(item,index) in tabList" 
          :key="index"
          :class="{currTab : index === currtabIndex}"
          @click="changeTab(index)"
          >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivitiesDetail',
  data() {
    return {
      tabList: ['首页','活动','排名','风采墙'],
      currtabIndex: 0,
    }
  },
  methods: {
    changeTab(index) {
      this.currtabIndex = index
      // if(index === 0) {
      //   this.$router.push({
      //     path: ''
      //   })
      // }
      // if(index === 1) {
      //   this.$router.push({
      //     path: ''
      //   })
      // }
      // if(index === 2) {
      //   this.$router.push({
      //     path: ''
      //   })
      // }
      if(index === 3) {
        this.$router.push({
          path: '/badminton/activitiesDetail/bShow'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .activitiesDetail{
    width: 100%;
    min-height: 100vh;
    .tabbar{
      width: 100%;
      height: 70px;
      background: #fff;
      border-top: 2px solid #cecece;
      position: fixed;
      bottom: 0;
      ul{
        width: 100%;
        height: 70px;
        padding: 0 4%;
        li{
          width: 25%;
          height: 70px;
          float: left;
          line-height: 70px;
          text-align: center;
          color: #999999;
        }
        .currTab{
          color: #000;
        }
      }
    }
  }
</style>
