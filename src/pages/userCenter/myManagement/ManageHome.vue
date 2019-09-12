<template>
  <!-- 我的管理 -->
  <div class="manageHome">
    <div class="topBox">
      <p class="userName">{{info.nickName}}</p>
      <div class="editIcon" @click="toCompleteInfo"><span class="el-icon-edit"></span></div>
      <img class="tx" :src="info.image" alt="">
      <p class="info">
        身份：{{info.type}}
        <span @click="toCash">账户余额(元)：{{info.accountBalance}} <b class="el-icon-arrow-right"></b></span>
      </p>
    </div>
    <div class="middleBox">
      <div>累计收益：{{info.accumulatedIncome}}元</div>
      <div>即将到账：{{info.upcomingAccount}}元</div>
    </div>
    <div class="emptyBg"></div>
    <ul>
      <router-link tag="li" v-for="(item,index) in menuList" :key="index" :to="item.path">{{item.name}}<span class="el-icon-arrow-right"></span></router-link>
    </ul>
    <div class="emptyBg2"></div>
    <p class="commonProblem" @click="toProblem">常见问题<span class="el-icon-arrow-right"></span></p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ManageHome',
  data() {
    return {
      info: '',
      menuList: [
        {
          name: '群组管理',
          path: '/userCenter/groupManagement'
        },
        {
          name: '我的活动',
          path: '/userCenter/myActivities'
        },
        // {
        //   name: '我的订单',
        //   path: '/userCenter/MyOrder'
        // },
        // {
        //   name: '地址管理',
        //   path: '/userCenter/addressManagement' 
        // },
      ],
      _id: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    // 获取信息
    // this.$http.myManagementInfo(this.userId).then(resp => {
    //   console.log(resp)
    //   if(resp.status == 200) {
    //     this.info = resp.data
    //   }else{
    //     this.$toast("获取信息失败！")
    //   }
    // })
  },
  mounted() {
    // 获取信息
    // console.log("id:" + this.userId)
    // console.log("id2:" + this.$route.params._userId)
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
    toProblem() {
      this.$router.push({
        path: '/userCenter/commonProblem'
      })
    },
    // 提现
    toCash() {
      this.$router.push({
        path: '/userCenter/cash'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .manageHome{
    width: 100%;
    min-height: 100vh;
    .topBox{
      width: 100%;
      height: 356px;
      border-bottom: 2px solid #e5aa64;
      // background: #fac31e;
      background: url("../../../assets/bg111.png") no-repeat center;
      background-size: contain;
      overflow: hidden;
      padding-right: 30px;
      position: relative;
      .userName{
        color: #fff;
        font-size: 31px;
        margin-top: 110px;
        margin-left: 120px;
      }
      .editIcon{
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #ff5227;
        padding-left: 12px;
        position: absolute;
        top: 115px;
        right: 80px;
        span{
          font-size: 42px;
          line-height: 68px;
          color: #fff;
        }
      }
      .tx{
        width: 140px;
        height: 140px;
        border-radius: 50%;
        float: left;
        margin-left: 100px;
        margin-top: 26px;
      }
      .info{
        width: 460px;
        float: right;
        margin-top: 120px;
        color: #656565;
        font-size: 22px;
        span{
          float: right;
          b{
            padding-left: 5px;
          }
        }
      }
    }
    .middleBox{
      width: 100%;
      height: 89px;
      div{
        width: 50%;
        height: 89px;
        line-height: 89px;
        text-align: center;
        float: left;
        font-size: 25px;
      }
      div:nth-child(1){
        color: #ff512a;
        border-right: 1px solid #e8e8e8;
      }
    }
    .emptyBg{
      width: 100%;
      height: 18px;
      background: #f9fafc;
      border-top: 2px solid #d5d5d5;
      border-bottom: 1px solid #d5d5d5;
    }
    ul{
      width: 100%;
      height: auto;
      padding: 0 35px;
      li{
        width: 658px; 
        height: 80px;
        line-height: 80px;
        color: #343434;
        border-top: 1px solid #f0f0f0;
        span{
          float: right;
          font-weight: bold;
          display: block;
          margin-top: 30px;
          margin-right: -26px;
          color: #b3b3b3;
        }
      }
    }
    .emptyBg2{
      width: 100%;
      height: 20px;
      background: #f9fafc;
    }
    .commonProblem{
      width: 100%;
      height: 80px;
      line-height: 80px;
      padding: 0 35px;
      color: #343434;
      span{
        float: right;
        font-weight: bold;
        display: block;
        margin-top: 30px;
        color: #b3b3b3;
      }
    }
  }
</style>

