<template>
  <!-- 群组管理 -->
  <div class="groupManagement">
    <h4>群组管理</h4>
    <ul>
      <li @click="choice1">创建我的新社区</li>
      <li @click="choice2">我创建的群</li>
      <li @click="choice3">我参加的群</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GroupManagement',
  methods: {
    choice1() {
      this.$router.push({
        path: '/userCenter/createGroup'
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
    ul{
      li{
        margin: 30px 0;
      }
    }
  }
</style>
