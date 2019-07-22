<template>
  <!-- 我的管理 -->
  <div class="manageHome">
    <h4>我的管理</h4>
    <ul>
      <router-link tag="li" v-for="(item,index) in menuList" :key="index" :to="item.path">{{item.name}}</router-link>
      <!-- <li>群组管理</li>
      <li>我的活动</li>
      <li>我的订单</li>
      <li>常见问题</li>
      <li>地址管理</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ManageHome',
  data() {
    return {
      menuList: [
        {
          name: '群组管理',
          path: '/userCenter/groupManagement'
        },
        {
          name: '我的活动',
          path: '/userCenter/myActivities'
        },
        {
          name: '我的订单',
          path: '/userCenter/MyOrder'
        },
        {
          name: '常见问题',
          path: '/userCenter/commonProblem'
        },
        {
          name: '地址管理',
          path: '/userCenter/addressManagement'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .manageHome{
    width: 100%;
    min-height: 100vh;
    ul{
      li{
        margin: 20px 0;
      }
    }
  }
</style>

