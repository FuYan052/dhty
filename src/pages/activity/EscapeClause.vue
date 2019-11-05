<template>
  <!-- 免责条款 -->
  <div class="escapeClause" v-title data-title="免责协议">
    <p class="title">免责协议</p>
    <p class="pList">1.本次活动具有潜在的危险性和不可预知性，参与者须对自身到的安全和行为负责。</p>
    <p class="pList">2.报名参加本次活动者应当对自身的身体条件有全面了解，并科学评估是否适宜参加本次活动。</p>
    <p class="pList">3.报名参加本次活动者视为年满18周岁的完全民事行为人，未满18周岁的限制民事行为能力人和无民事行为人应当在监护人的陪同下参加。</p>
    <p class="pList">4.参加者在本次挥动中（包括来往活动地点的途中）遭受人身伤害或造成他人人身损害的，由侵害人或参加者承担法律责任，与来虎和组织者无关。</p>
    <p class="pList">5.参加活动者应当妥善管理自身财务，不应轻信他人，包括其他活动参加者。来虎及活动组织者不承担保管参加者财务的义务，若发生财务失窃，损毁等情形，其损失由参加者自行承担，与来虎和组织者无关。</p>
    <p class="pList">6.来虎和活动组织者对上述条款规定的人身和财产损失概不承担任何法律责任。</p>
    <p class="pList">7.本次活动的报名者须确定已知晓并理解上述条款。</p>
    <p class="wxts">温馨提示：</p>
    <p class="pList">1.请参与者自带球拍，穿运动装和羽毛球球鞋（如果没有球拍或球鞋可提前到来虎小店购买，我们将免费给你配送到场地）。运动前可吃少许易消化食物，不宜空腹或者饱胀进行剧烈活动，可自带温水</p>
    <p class="pList">2.所有活动均属个人自愿自主参与，确认报名前请仔细阅读《免责声明》，所有参与者都是独立的责任人，户外及体育活动具有一定的危险性，可能发生危及生命的意外事故和疾病，活动参与者应特别注意安全并自己购买意外保险，没有人对活动中发生的意外事故负责。</p>
    <p class="pList">3.因活动本身属于低价半自助打球行为，所以羽毛球会由本次活动的临时群主在活动开始前领取并分配给球友，若活动开始前发现临时群主还未发放羽毛球的，可与客服联系，客服电话：18113011911.（临时群主的资格获取、福利、责任等，详见“临时群主的福利与义务”）。</p>
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
      font-size: 30px;
    }
    .wxts{
      margin-top: 20px;
      font-size: 38px;
    }
  }
</style>