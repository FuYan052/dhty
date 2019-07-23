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
      tabList: ['首页','活动','群员'],
      currtabIndex: 0,
    }
  },
  methods: {
    changeTab(index) {
      this.currtabIndex = index
      if(index === 0) {
        this.$router.push({
          path: '/badminton/activitiesDetail/bActivities'
        })
      }
      if(index === 1) {
        this.$router.push({
          path: ''
        })
      }
      if(index === 2) {
        this.$router.push({
          path: '/badminton/activitiesDetail/bMember'
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
        padding: 10px 4%;
        li{
          width: 33.3%;
          height: 50px;
          float: left;
          line-height: 50px;
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
