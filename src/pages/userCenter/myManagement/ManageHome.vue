<template>
  <div class="manageHome" v-title data-title="个人中心">
    <div class="topBox">
      <div class="headImg">
        <img :src="info.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
      </div>
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
    <ul class="menu1" v-show="userType == '200'">
      <li @click="toDetail">
        <div class="icon"><img src="../../../assets/user_icon7.png" style="width: 100%; height: 100%;" alt=""></div>
        <div class="title">账户明细</div>
        <div class="right">
          <span class="money"><b>{{info.accumulatedIncome}}</b>元</span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </li>
      <!-- <li>
        <p>累计收入</p>
        <p><span>{{info.accumulatedIncome}}</span>元</p>
      </li>
      <li>
        <p>即将到账</p>
        <p><span>{{info.upcomingAccount}}</span>元</p>
      </li> -->
    </ul>
    <ul class="menu2">
      <li v-for="(item,index) in currMenuList" :key="index" @click="handleMenu(index,item.routerPath)">
        <div class="icon"><img :src="item.icon" style="width: 100%; height: 100%;" alt=""></div>
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
      currMenuList: [],
      menu1List: [  //普通用户展示菜单
        {
          icon: require("../../../assets/user_icon3.png"),
          title: '我的活动',
          routerPath: '/userCenter/myActivities'
        },
        {
          icon: require("../../../assets/user_icon5.png"),
          title: '我的数据',
          routerPath: '/userCenter/myData'
        },
        {
          icon: require("../../../assets/user_icon6.png"),
          title: '我的优惠券',
          routerPath: '/userCenter/Coupon'
        },
        // {
        //   icon: require("../../../assets/user_icon7.png"),
        //   title: '马上推广',
        //   routerPath: '/userCenter/popularize'
        // },
        {
          icon: require("../../../assets/user_icon9.png"),
          title: '常见问题',
          routerPath: '/userCenter/commonProblem'
        },
        {
          icon: require("../../../assets/user_icon4.png"),
          title: '修改密码',
          routerPath: '/home/forgetPassword'
        },
        {
          icon: require("../../../assets/user_icon8.png"),
          title: '退出登录',
          routerPath: ''
        },
      ],
      menu2List: [  //管理员展示菜单
        {
          icon: require("../../../assets/user_icon3.png"),
          title: '发布活动',
          routerPath: '/organization'
        },{
          icon: require("../../../assets/user_icon5.png"),
          title: '我的活动',
          routerPath: '/userCenter/myActivities'
        },
        // {
        //   icon: require("../../../assets/user_icon7.png"),
        //   title: '马上推广',
        //   routerPath: '/userCenter/popularize'
        // },
        {
          icon: require("../../../assets/user_icon9.png"),
          title: '常见问题',
          routerPath: '/userCenter/commonProblem'
        },
        {
          icon: require("../../../assets/user_icon4.png"),
          title: '修改密码',
          // routerPath: '/home/forgetPassword'
        },
        {
          icon: require("../../../assets/user_icon8.png"),
          title: '退出登录',
          routerPath: ''
        },
      ],
      info: '',
      _id: '',
      userType: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  beforeRouteEnter(to, from, next) {
    // 先清除改版之前的登录状态
    if(!window.localStorage.getItem('userType')) {
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('userPhone')
      window.localStorage.removeItem('ty-token')
      next('/home')
    }else { 
      next()
    } 
  },
  created() {
    this.userType = window.localStorage.getItem('userType')
    if(this.userType == '100') {  //普通会员,后端约定
      this.currMenuList = this.menu1List
    }else if(this.userType == '200') {  //来虎管理员,后端约定
      this.currMenuList = this.menu2List
    }

    this._id = window.localStorage.getItem('userId')
    // if(this._id == null) {
    //   this._id = this.$route.params._userId
    // }
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
    // 账户明细
    toDetail() {
      this.$router.push({
        path: '/userCenter/cash/accountDetails'
      })
    },
    handleMenu(index,path) {
      // console.log(index,path)
      if(this.userType == '100') {
        if(index === 4){
          this.$router.push({
            path: '/home/forgetPassword'
          })
          window.sessionStorage.setItem('routerPath','/userCenter/manageHome')
          window.sessionStorage.setItem('routerPathName','ManageHome')
        }else if(index === 5) {
          const isSure = confirm('确定退出登录?')
          if(isSure) {
            window.localStorage.removeItem('ty-token')
            window.localStorage.removeItem('userId')
            window.localStorage.removeItem('userPhone')
            window.localStorage.removeItem('userType')
            this.$router.replace({
              path: '/home'
            })
            window.sessionStorage.setItem('routerPath','/userCenter/manageHome')
            window.sessionStorage.setItem('routerPathName','ManageHome')
          }
        }else{
          this.$router.push({
            path: path
          })
        }
      }
      if(this.userType === '200') {
        if(index === 3){
          this.$router.push({
            path: '/home/forgetPassword'
          })
          window.sessionStorage.setItem('routerPath','/userCenter/manageHome')
          window.sessionStorage.setItem('routerPathName','ManageHome')
        }else if(index === 4) {
          const isSure = confirm('确定退出登录?')
          if(isSure) {
            window.localStorage.removeItem('ty-token')
            window.localStorage.removeItem('userId')
            window.localStorage.removeItem('userPhone')
            window.localStorage.removeItem('userType')
            this.$router.replace({
              path: '/home'
            })
            window.sessionStorage.setItem('routerPath','/userCenter/manageHome')
            window.sessionStorage.setItem('routerPathName','ManageHome')
          }
        }else{
          this.$router.push({
            path: path
          })
        }
      }
    }
  },
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
        border: 1px solid #fff;
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
        width: 100px;
        height: 122px;
        float: right;
        margin-top: 75px;
        margin-right: -20px;
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
      height: 102px;
      li{
        width: 100%;
        height: 102px;
        padding-right: 15px;
        border-top: 2px solid #efefef;
        .icon{
          width: 35px;
          height: 35px;
          float: left;
          margin-left: 5px;
          margin-top: 35px;
        }
        .title{
          width: 300px;
          height: 102px;
          margin-left: 45px;
          line-height: 102px;
          font-size: 28px;
          color: #3d3d3d;
          float: left;
        }
        .right{
          width: 200px;
          height: 102px;
          float: right;
          text-align: right;
          span{
            line-height: 102px;
            font-size: 40px;
            color: #5e5d5b;
          }
          span:nth-of-type(1){
            display: inline-block;
            line-height: 102px;
            font-size: 28px;
            color: #5e5d5b;
            margin-right: 10px;
            vertical-align: top;
          }
          .money{
            b{
              font-weight: normal;
              color: #ffb200;
              font-size: 32px;
              padding-right: 8px;
            }
          }
        }
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
          width: 35px;
          height: 35px;
          float: left;
          margin-left: 5px;
          margin-top: 35px;
          // img{
          //   width: 100%;
          //   height: 100%;
          // }
        }
        .title{
          width: 450px;
          height: 102px;
          margin-left: 45px;
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
    }
  }
</style>
<style>
  .manageHome .mint-msgbox {
    width: 70%;
  }
  .manageHome .mint-msgbox-title{
    font-size: 26px;
  }
  .manageHome .mint-msgbox-message{
    color: rgb(22, 21, 21);
    font-size: 30px;
  }
  .manageHome .mint-msgbox-content{
    padding: 60px 10px !important;
  }
  .manageHome .mint-msgbox-btns{
    height: 85px;
    font-size: 30px;
  }
</style>