<template>
  <!-- 群组管理 -->
  <div class="groupManagement" v-title data-title="群组管理">
    <ul>
      <li @click="choice1">创建我的新社区<span class="el-icon-arrow-right"></span></li>
      <li @click="choice2">我创建的群<span class="el-icon-arrow-right"></span></li>
      <li @click="choice3">我参加的群<span class="el-icon-arrow-right"></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GroupManagement',
  methods: {
    choice1() {
      this.$router.push({
        path: '/userCenter/groupManagement/createGroup'
      })
    },
    choice2() {
      this.$router.push({
        path: '/userCenter/createdGroupList'
      })
    },
    choice3() {
      this.$router.push({
        path: '/userCenter/joinCroupList'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .groupManagement{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%; 
        height: 90px;
        padding: 0 40px;
        line-height: 89px;
        color: #343434;
        border-bottom: 1px solid #dfdede;
        span{
          float: right;
          font-weight: bold;
          line-height: 90px;
          color: #b3b3b3;
        }
      }
    }
  }
</style>
