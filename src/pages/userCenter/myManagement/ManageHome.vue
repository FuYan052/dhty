<template>
  <div class="manageHome" v-title data-title="个人中心">
    <div class="topBox">
      <img class="headImg" :src="info.image" alt="">
      <div class="levelIcon">Lv{{info.level}}</div>
      <div class="nickName">
        <p>{{info.nickName}}</p>
        <p>{{info.type}}</p>
      </div>
      <div class="right1" @click="toCompleteInfo">
        <span class="menu_icon"></span>
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <ul class="menu1">
      <li @click="toCash">
        <p>账户余额</p>
        <p><span>{{info.accountBalance}}</span>元</p>
      </li>
      <li>
        <p>累计收入</p>
        <p><span>{{info.accumulatedIncome}}</span>元</p>
      </li>
      <li>
        <p>即将到账</p>
        <p><span>{{info.upcomingAccount}}</span>元</p>
      </li>
    </ul>
    <ul class="menu2">
      <li v-for="(item,index) in menu2List" :key="index" @click="handleMenu(index,item.routerPath)">
        <div class="icon"><img :src="item.icon" alt=""></div>
        <div class="title">{{item.title}}</div>
        <div class="right">
          <span class="el-icon-arrow-right"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ManageHome',
  data() {
    return {
      menu2List: [
        {
          icon: require("../../../assets/user_icon3.png"),
          title: '我的活动',
          routerPath: '/userCenter/myActivities'
        },
        {
          icon: require("../../../assets/user_icon4.png"),
          title: '创建新群',
          routerPath: '/userCenter/groupManagement/createGroup'
        },
        {
          icon: require("../../../assets/user_icon5.png"),
          title: '管理我的群',
          routerPath: '/userCenter/createdGroupList'
        },
        {
          icon: require("../../../assets/user_icon6.png"),
          title: '我参加的群',
          routerPath: '/userCenter/joinCroupList'
        },
        {
          icon: require("../../../assets/user_icon7.png"),
          title: '马上推广',
          routerPath: '/userCenter/popularize'
        },
        {
          icon: require("../../../assets/user_icon9.png"),
          title: '常见问题',
          routerPath: '/userCenter/commonProblem'
        },
        {
          icon: require("../../../assets/user_icon8.png"),
          title: '退出登录',
          routerPath: ''
        },
      ],
      info: '',
      _id: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    this._id = this.userId
    if(this._id == null) {
      this._id = this.$route.params._userId
    }
    this.$http.myManagementInfo(this._id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.info = resp.data
      }else{
        this.$toast({
          message: '获取信息失败！',
          duration: 2000
        });
      }
    })
  },
  methods: {
    // 完善信息
    toCompleteInfo() {
      this.$router.push({
        path: '/userCenter/myData/completeInfo'
      })
    },
    // 提现
    toCash() {
      this.$router.push({
        path: '/userCenter/cash'
      })
    },
    handleMenu(index,path) {
      console.log(index,path)
      if(index === 6) {
        console.log(this)
        this.$messagebox.confirm('确定退出登录?').then(action => {
          window.localStorage.removeItem('ty-token')
          window.localStorage.removeItem('userId')
          window.localStorage.removeItem('userPhone')
          this.$router.go(0)
        });
      }else{
        this.$router.push({
          path: path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .manageHome{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    padding: 0 33px;
    .topBox{
      width: 100%;
      height: 290px;
      background: #494642;
      margin-top: 31px;
      border-radius: 10px;
      padding: 0 30px;
      position: relative;
      box-shadow: 0px 0px 10px rgba(73,70,66,0.9);
      .headImg{
        width: 122px;
        height: 122px;
        border-radius: 50%;
        float: left;
        margin-top: 75px;
      }
      .levelIcon{
        width: 42px;
        height: 43px;
        position: absolute;
        top: 162px;
        left: 115px;
        // color: #fff;
        font-size: 14px;
        line-height: 43px;
        text-align: center;
        background: url("../../../assets/user_icon2.png") no-repeat center;
        background-size: 100% 100%;
        z-index: 9;
      }
      .nickName{
        width: 360px;
        height: 122px;
        float: left;
        margin-top: 75px;
        color: #fff;
        margin-left: 30px;
        letter-spacing: 1px;
        font-size: 38px;
        line-height: 34px;
        padding-top: 20px;
        opacity: 0.95;
        p:nth-of-type(2){
          font-size: 26px;
          line-height: 24px;
          margin-top: 30px;
        }
      }
      .right1{
        width: 80px;
        height: 122px;
        float: right;
        margin-top: 75px;
        .menu_icon{
          display: inline-block;
          width: 33px;
          height: 33px;
          color: #fff;
          line-height: 122px;
          background: url("../../../assets/user_icon1.png") no-repeat center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .el-icon-arrow-right{
          font-size: 38px;
          color: #fff;
          opacity: 0.8;
          line-height: 122px;
          vertical-align: middle;
        }
      }
    }
    .menu1{
      width: 100%;
      height: 180px;
      padding: 0 15px;
      li{
        width: 33.3%;
        height: 176px;
        float: left;
        p:nth-of-type(1) {
          font-size: 22px;
          line-height: 22px;
          color: #7a7977;
          margin-top: 44px;
        }
        p:nth-of-type(2) {
          font-size: 24px;
          line-height: 34px;
          color: #4a4742;
          margin-top: 44px;
          span{
            font-size: 34px;
            color: #fd8100;
            padding-right: 12px;
            // font-weight: bold;
          }
        }
      }
      li:nth-of-type(2){
        text-align: center;
      }
      li:nth-of-type(3){
        text-align: right;
      }
    }
    .menu2{
      width: 100%;
      height: auto;
      margin-top: 7px;
      li{
        width: 100%;
        height: 102px;
        padding-right: 15px;
        border-top: 2px solid #efefef;
        .icon{
          width: 100px;
          height: 102px;
          float: left;
          img{
            display: inline-block;
            width: 32px;
            line-height: 100px;
            margin-left: 5px;
            margin-top: 32px;
          }
        }
        .title{
          width: 450px;
          height: 102px;
          line-height: 102px;
          font-size: 28px;
          color: #3d3d3d;
          float: left;
        }
        .right{
          width: 40px;
          height: 102px;
          float: right;
          text-align: right;
          span{
            line-height: 102px;
            font-size: 40px;
            color: #5e5d5b;
          }
        }
      }
      li:nth-of-type(1) {
        .icon{
          img{
            display: inline-block;
            width: 35px;
            line-height: 102px;
            margin-left: 5px;
            margin-top: 34px;
          }
        }
      }
      li:nth-of-type(4) {
        .icon{
          img{
            display: inline-block;
            width: 30px;
            line-height: 102px;
            margin-left: 5px;
            margin-top: 35px;
          }
        }
      }
      li:nth-of-type(6) {
        .icon{
          img{
            display: inline-block;
            width: 32px;
            line-height: 102px;
            margin-left: 5px;
            margin-top: 36px;
          }
        }
      }
    }
  }
</style>
<style>
  .mint-msgbox {
    width: 60%;
  }
  .mint-msgbox-title{
    font-size: 22px;
  }
  .mint-msgbox-message{
    color: rgb(22, 21, 21);
    font-size: 26px;
  }
  .mint-msgbox-content{
    padding: 40px 10px;
  }
  .mint-msgbox-btns{
    height: 70px;
  }
</style>