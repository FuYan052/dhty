<template>
  <div class="memberData" v-title data-title="Ta人资料">
    <ul>
      <li @click="toGroupList">所属社群</li>
      <li @click="toOrgActivies" >组织的活动</li>
      <li @click="toAttendedActivies" >ta参加过的活动</li>
      <li @click="toMotionData" >ta的运动参数</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MemberData',
  methods: {
    toGroupList() {
      this.$router.push({
        path: '/club/member/attendGroupList'
      })
    },
    toOrgActivies() {
      this.$router.push({
        path: '/club/member/organActivies'
      })
    },
    toAttendedActivies() {
      this.$router.push({
        path: '/club/member/attendedActivies'
      })
    },
    toMotionData() {
      this.$router.push({
        path: '/club/member/motionData'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberData{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
  }
</style>