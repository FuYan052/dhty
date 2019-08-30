<template>
  <!-- 用户协议 -->
  <div class="userAgreement" v-title data-title="注册">
    <p class="title">来虎体育用户协议</p>
    <p class="content">
      北京蓝莓时节科技有限公司（以下简称“蓝莓科技”）在此特别提醒您在注册使用“积目”软件及服务成为用户时，请认真阅读并遵守《用户隐私协议》（以下简称“协议”），并确保您已经充分理解协议各条款内容，特别免除或者限制责任的条款。请您审慎阅读并选择接受或不接受本协议。在您选择接受本协议所有条款前，您可以选择游客模式登录进行体验试用本软件。您的注册、登录、使用等行为将视为您已阅读、充分理解协议，并接受协议各项条款的约束。否则，您无权注册、登录或使用本协议所涉服务。
本协议约定蓝莓科技与用户之间关于“积目”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由蓝莓科技随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在蓝莓科技修改协议条款后，如果用户不接受修改后的条款，请立即停止使用蓝莓科技提供的服务，用户继续使用蓝莓科技提供的服务将被视为接受修改后的协议。
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserAgreement'
}
</script>

<style lang="scss" scoped>
  .userAgreement{
    width: 100%;
    min-height: 100vh;
    padding: 0 40px;
    padding-top: 20px;
    .title{
      text-align: center;
      font-size: 30px;
      line-height: 50px;
      // font-weight: bold;
    }
    .content{
      font-size: 24px;
      line-height: 40px;
      padding-top: 20px;
      text-indent: 2em;
    }
  }
</style>