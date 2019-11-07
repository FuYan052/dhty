<template>
  <!-- 常见问题 -->
  <div class="commonProblem" v-title data-title="常见问题">
    <div class="problemItem" v-for="(item,index) in problemList" :key="index">
      <div class="title" @click="showText(item,index)">
        {{item.title}}
        <span class="el-icon-arrow-down"></span>
      </div>
      <div class="detail" v-show="index === i">
        {{item.detail}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonProblem',
  data() {
    return {
      problemList: [
        {
          title: `1.如何注册\登录？`,
          detail: `未注册的用户点击个人中心“我的管理”后会要求注册\登录。`
        },{
          title: `2.如何参与活动？`,
          detail: `点击微信公众号-【活动】菜单，弹出活动页面（如果没登录，会提示要求登录）。浏览列表，点击活动卡片，进入报名详情页面，勾选“免责协议”，点击“报名”按钮，进入支付页面，支付完成即报名成功。报名成功后点击菜单【个人中心】-【我的管理】，进入【我的活动】-【我参与的】查看，如因特殊原因无法参加，可以取消活动。`
        },{
          title: `3.如何在微信报名？`,
          detail: `打开报名活动详情页面，点击右上角的“...”，分享给微信好友，微信好友点开链接，填入信息并支付即可报名。`
        },{
          title: `4.客服服务`,
          detail: `如需商务合作，加盟成为领队或其它疑问，欢迎添加客服微信：18616777604，进行咨询。`
        }
      ],
      isShowDetail: false,
      i: -1,
    }
  },
  methods:{
    showText(item,index) {
      this.isShowDetail = !this.isShowDetail
      if(this.isShowDetail){
        this.i = index
      }else{
        this.i = -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .commonProblem{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .problemItem{
      width: 100%;
      height: auto;
      .title{
        width: 100%;
        height: 94px;
        font-size: 28px;
        line-height: 94px;
        color: #535151;
        padding: 0 30px;
        border-top: 1px solid #f1f0f0;
        border-bottom: 1px solid #f1f0f0;
        background: #fff;
        span{
          color: #cbcbcb;
          line-height: 94px;
          float: right;
          color: #a09c9c;
        }
      }
      .detail{
        width: 100%;
        height: auto;
        // height: 200px;
        font-size: 26px;
        line-height: 40px;
        padding: 20px 35px;
        padding-bottom: 30px;
      }
    }
  }
</style>
