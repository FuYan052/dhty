<template>
  <!-- 免责条款 -->
  <div class="escapeClause" v-title data-title="免责条款">
    <p class="title">免责协议</p>
    <p class="pList">1.本次活动具有潜在的危险性和不可预知性，参与者须对自身到的安全和行为负责。</p>
    <p class="pList">2.报名参加本次活动者应当对自身的身体条件有全面了解，并科学评估是否适宜参加本次活动。</p>
    <p class="pList">3.报名参加本次活动者视为年满18周岁的完全民事行为人，未满18周岁的限制民事行为能力人和无民事行为人应当在监护人的陪同下参加。</p>
    <p class="pList">4.参加者在本次挥动中（包括来往活动地点的途中）遭受人身伤害或造成他人人身损害的，由侵害人或参加者承担法律责任，与来虎和组织者无关。</p>
    <p class="pList">5.参加活动者应当妥善管理自身财务，不应轻信他人，包括其他活动参加者。来虎及活动组织者不承担保管参加者财务的义务，若发生财务失窃，损毁等情形，其损失由参加者自行承担，与来虎和组织者无关。</p>
    <p class="pList">6.来虎和活动组织者对上述条款规定的人身和财产损失概不承担任何法律责任。</p>
    <p class="pList">7.本次活动的报名者须确定已知晓并理解上述条款。</p>
  </div>
</template>

<script>
export default {
  name: 'EscapeClause'
}
</script>

<style lang="scss" scoped>
  .escapeClause{
    width: 100%;
    min-height: 100vh;
    padding: 20px 30px;
    padding-bottom: 50px;
    .title{
      text-align: center;
      font-size: 38px;
      line-height: 50px;
    }
    .pList{
      margin-top: 10px;
      padding-left: 10px;
      line-height: 45px;
    }
  }
</style>