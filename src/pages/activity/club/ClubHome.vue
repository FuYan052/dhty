<template>
  <!-- 俱乐部 -->
  <div class="clubHome" v-title data-title="俱乐部">
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
  name: 'ClubHome',
  data() {
    return {
      tabList: ['首页','活动','群员'],
      currtabIndex: 0,
    }
  },
  methods: {
    changeTab(index) {
      this.currtabIndex = index
      if(index === 0) {
        this.$router.push({
          path: '/club/clubInfo'
        })
      }
      if(index === 1) {
        this.$router.push({
          path: '/club/clubActivities'
        })
      }
      if(index === 2) {
        this.$router.push({
          path: '/club/members'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .clubHome{
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;
    .tabbar{
      width: 100%;
      height: 90px;
      background: #fff;
      border-top: 2px solid #cecece;
      position: fixed;
      bottom: 0;
      ul{
        width: 100%;
        height: 90px;
        padding: 10px 4%;
        li{
          width: 33.3%;
          height: 70px;
          float: left;
          line-height: 70px;
          text-align: center;
          color: #999999;
        }
        li:nth-child(2) {
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .currTab{
          color: #000;
        }
      }
    }
  }
</style>

