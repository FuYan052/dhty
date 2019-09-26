<template>
  <!-- 创建的群管理 -->
  <div class="createdGroupManage">
    <ul>
      <li @click="choice1">管理群成员<span class="el-icon-arrow-right"></span></li>
      <li @click="choice2">修改群设置<span class="el-icon-arrow-right"></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CreatedGroupManage',
  methods: {
    choice1() {
      this.$router.push({
        path: '/userCenter/groupManagement/manageGroupMembers'
      })
    },
    choice2() {
      this.$router.push({
        path: '/userCenter/groupManagement/editGroupInfo'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .createdGroupManage{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    ul{
      width: 100%;
      height: auto;
      li{
        background: #fff;
        width: 100%; 
        height: 110px;
        padding: 0 40px;
        line-height: 109px;
        font-size: 30px;
        color: #343434;
        // border-bottom: 1px solid #dfdede;
        margin-bottom: 10px;
        span{
          float: right;
          // font-weight: bold;
          font-size: 34px;
          color: #504f4f;
          line-height: 110px;
        }
      }
    }
  }
</style>

