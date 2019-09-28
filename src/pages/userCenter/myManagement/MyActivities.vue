<template>
  <!-- 我的活动 -->
  <div class="myActivities" v-title data-title="我的活动">
    <!-- 活动分类 -->
    <div class="topCate1">
      <div 
        class="wrap"
        :class="{currStyle : currIndex === index}" 
        v-for="(item,index) in cateList1" 
        :key="index"
        @click="changeCate(item,index)"
        >{{item}}</div>
    </div>
    <!-- 我参加的活动 -->
    <div v-show="isjion">
      <!-- 参加状态 -->
      <div class="cate2">
        <div 
        class="cateItem"
        :class="{currStyle2 : currIndex2 === index}" 
        v-for="(item,index) in cateList2" 
        :key="index"
        @click="changeCate2(item,index)"
        >{{item}}</div>
      </div>
      <!-- 活动列表 -->
      <div class="noActList" v-show="noActList"></div>
      <div class="actList" v-show="!noActList">
        <div class="actiItem" v-for="(item,index) in actList" :key="index">
          <div class="title" @click="toDetail(item.id)">
            <div class="Img1">
              <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
            </div>
            <p class="role">{{item.type}}</p>
            <p class="text">{{item.nickName}}</p>
          </div>
          <div class="left" @click="toDetail(item.id)">
            <div class="venueImage">
              <img :src="item.venueImage" style="width: 100%; height: 100%; border-radius: 5px;" alt="">
            </div>
          </div>
          <div class="right">
            <p class="p1" @click="toDetail(item.id)">{{item.title}}</p>
            <div class="text text1" @click="toDetail(item.id)">
              <span class="el-icon-house"></span>{{item.groupName}}
            </div>
            <div class="text text2" @click="toDetail(item.id)">
              <span class="el-icon-location-information"></span>{{item.venueName}}
            </div>
            <div class="text text2" @click="toDetail(item.id)">
              <span class="el-icon-date"></span>{{item.time}}
            </div>
            <div class="text text3" @click="toDetail(item.id)">
              <span class="sp1 el-icon-time"></span>{{item.timeStart}}~{{item.timeEnd}}
              <span class="sp2 el-icon-coin"></span>{{item.cost}}元
              <!-- <span class="sp3 el-icon-user"></span>8/12 -->
            </div>
          </div>
          <div class="cancle" v-show="item.osStateId == '1'" @click="cancelAct(item.orderNo)">取消活动</div>
          <!-- <div class="complete">完成</div> -->
          <div class="see">{{item.osState}}</div>
          
        </div>
      </div>
    </div>
    <!-- 我组织的活动 -->
    <div v-show="!isjion">
      <!-- 参加状态 -->
      <div class="cate2">
        <div 
          class="cateItem cateItem2"
          :class="{currStyle2 : currIndex3 === index}" 
          v-for="(item,index) in cateList3" 
          :key="index"
          @click="changeCate3(item,index)"
          >{{item}}</div>
      </div>
      <!-- 活动列表 -->
      <div class="noActList" v-show="noActList2"></div>
      <div class="actList actList2" v-show="!noActList2">
        <div class="actiItem" v-for="(item,index) in actList" :key="index">
          <div class="left" @click="toDetail(item.id)">
            <div class="imgwrap">
              <img :src="item.venueImage" style="width: 100%; height: 100%; border-radius: 5px;" alt="">
            </div>
          </div>
          <div class="right" @click="toDetail(item.id)">
            <p class="p1">{{item.title}}</p>
            <div class="text text1">
              <span class="el-icon-house"></span>{{item.groupName}}
            </div>
            <div class="text text2">
              <span class="el-icon-location-information"></span>{{item.venueName}}
            </div>
            <div class="text text2">
              <span class="el-icon-date"></span>{{item.time}}
            </div>
            <div class="text text3">
              <span class="sp1 el-icon-time"></span>{{item.timeStart}}~{{item.timeEnd}}
              <span class="sp2 el-icon-coin"></span>{{item.cost}}元
              <!-- <span class="sp3 el-icon-user"></span>8/12 -->
            </div>
          </div>
          <div class="btnWrap">
            <div class="btn" v-show="isPublish" @click="publishSignUp(item.id)">查看报名</div>
            <div class="btn" v-show="isPublish" @click="editActivies(item.id)">修改</div>

            <div class="btn" v-show="!isPublish" @click="completeSignUp(item.id)">查看报名</div>
            <!-- <div class="btn" v-show="!isPublish">填写成绩</div> -->
          </div>
          <!-- <div class="cancle">取消 complete</div>  
          <div class="complete">完成</div>
          <div class="see">查看成绩</div> -->
        </div>
      </div>
    </div>
    
    
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'MyActivities',
  data() {
    return {
      isjion: true,
      isPublish: true,
      cateList1: ['我参加的','我组织的'],
      currIndex: 0,
      cateList2: ['全部','已预约','进行中','已完成','取消'],
      cateList3: ['已发布','已完成'],
      currIndex2: 0,
      currIndex3: 0,
      noActList: false,  //缺省页
      noActList2: false,  //缺省页
      state: '0', //我参加的活动传给后端的状态标识
      state2: '1', //我组织的活动传给后端的状态标识
      actList: [],
      userId: '',
    }
  },
  computed: {
    // 用户id
    // ...mapState(['userId']),
  },
  created() {
    this.userId = window.localStorage.getItem('userId')
    this.getList1()
  },
  methods:{
    // 取消活动
    cancelAct(orderNo) {
      const isCancel = window.confirm('确定要取消活动吗？')
      if(isCancel) {
        this.$http.cancelActive(orderNo).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast('取消成功！')
          }
        })
      }
    },
    getList1() {
      // 我参加的活动
      const params = {
        state: this.state,
        userId: this.userId
      }
      this.$http.participatedActivity(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
          this.actList = resp.data
          if(this.actList.length == 0) {
            this.noActList = true
          }else{
            this.noActList = false
          }
        }
        console.log(this.actList)
      })
    },
    getList2() {
      // 我组织的活动
      const params = {
        state: this.state2,
        userId: this.userId
      }
      this.$http.myOrganization(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
          this.actList = resp.data
          if(this.actList.length == 0) {
            this.noActList2 = true
          }else{
            this.noActList2 = false
          }
        }
        console.log(this.actList)
      })
    },
    // 切换分类
    changeCate(item,index) {
      this.currIndex = index
      if(item === '我参加的') {
        this.isjion = true
        this.state = '0'
        this.getList1()
      }
      if(item === '我组织的') {
        this.isjion = false
        this.state2 = '1'
        this.getList2()
      }
    },
    changeCate2(item,index) {
      this.currIndex2 = index
      if(index == 0) {
        this.state = '0'
        this.getList1()
      }
      if(index == 1) {
        this.state = '1'
        this.getList1()
      }
      if(index == 2) {
        this.state = '2'
        this.getList1()
      }
      if(index == 3) {
        this.state = '3'
        this.getList1()
      }
      if(index == 4) {
        this.state = '4'
        this.getList1()
      }

    },
    changeCate3(item,index) {
      this.currIndex3 = index
      if(item === '已发布') {
        this.isPublish = true
        this.state2 = '1'
        this.getList2()
      }
      if(item === '已完成') {
        this.isPublish = false
        this.state2 = '5'
        this.getList2()
      }
    },
    // 查看活动详情
    toDetail(id) {
      window.sessionStorage.setItem('activityDetailId',id)
      this.$router.push({
        path: '/activityDetail',
      })
    },
    // 修改活动
    editActivies(id) {
      window.sessionStorage.setItem('editGroupId',id)
      this.$router.push({
        path: '/userCenter/editActiviesInfo'
      })
    },
    // 已发布的活动查看报名
    publishSignUp(id) {
      window.sessionStorage.setItem('myOrangActId',id)  //活动id
      this.$router.push({
        path: '/userCenter/checkPublishSignUp'
      })
    },
    // 已完成的活动查看报名
    completeSignUp(id) {
      window.sessionStorage.setItem('myOrangActId',id)  //活动id
      this.$router.push({
        path: '/userCenter/checkCompleteSignUp'
      })
    },
  }
}  
</script>

<style lang="scss" scoped>
  .myActivities{
    width: 100%;
    min-height: 100vh;
    background: #f7f8fa;
    .topCate1{
      width: 100%;
      height: 96px;
      background: #fff;
      border-bottom: 1px solid #dfe0e2;
      .wrap{
        width: 50%;
        height: 96px;
        float: left;
        line-height: 96px;
        text-align: center;
        font-size: 28px;
        color: #454545;
        position: relative;
      }
      .wrap:nth-of-type(1)::after{
        display: block;
        content: '';
        width: 4px;
        height: 60px;
        border-right: 1px solid #e1e1e1;
        position: absolute;
        right: 0;
        top: 19px;
      }
      .currStyle{
        color: #ffbc00;
        border-bottom: 4px solid #ffbc00;
      }
    }
    .cate2{
      width: 100%;
      height: 72px;
      line-height: 73px;
      // background: #f7f8fa;
      .cateItem{
        height: 72px;
        line-height: 73px;
        text-align: center;
        padding: 0 39px;
        float: left;
        color: #9fa0a2;
        font-size: 26px;
      }
      .cateItem2{
        width: 50%;
      }
      .currStyle2{
        color: #1f1b10;
        // background: #ffbc00;
        background: rgba(250,195,30,0.5);
      }
    }
    .noActList{
      width: 100%;
      height: 90vh;
      background: url('../../../assets/noListPage.jpg') no-repeat center;
      background-size: cover;
    }
    .actList{
      width: 100%;
      height: auto;
      .actiItem{
        width: 100%;
        // height: 308px;
        min-height: 270px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        background: #fff;
        padding-left: 40px;
        border-top: 1px solid #f5f2f2;
        border-bottom: 1px solid #f5f2f2;
        position: relative;
        font-size: 0;
        .title{
          width: 100%;
          height: 90px;
          border-bottom: 1px solid #f0eded;
          .Img1{
            width: 60px;
            height: 60px;
            float: left;
            margin-top: 12px;
            // border-radius: 50%;
            // border: 1px solid red;
            // img{
            //   width: 100%;
            //   height: 100%;
            //   border-radius: 50%;
            // }
          }
          .text{
            display: block;
            float: left;
            font-size: 26px;
            line-height: 30px;
            color: #161616;
            margin-top: 33px;
            margin-left: 18px;
          }
          .role{
            float: left;
            width: 135px;
            height: 35px;
            line-height: 30px;
            text-align: center;
            color: #73bbf5;
            border: 1px solid #259ff2;
            font-size: 20px;
            border-radius: 20px;
            margin-top: 30px;
            margin-left: 18px;
          }
        }
        .left{
          width: 165px;
          height: 230px;
          // float: left;
          display: inline-block;
          vertical-align: top;
          .venueImage{
            width: 150px;
            height: 150px;
            float: left;
            margin-top: 40px;
            // border-radius: 10px;
            // border: 1px solid red;
            // img{
            //   width: 100%;
            //   height: 100%;
            //   border-radius: 10px;
            // }
          }
        }
        .right{
          width: 514px;
          height: 230px;
          // float: left;
          padding-left: 30px;
          display: inline-block;
          vertical-align: top;
          .p1{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 26px;
            color: #323232;
            font-weight: bold;
            margin-top: 15px;
          }
          .text{
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #6f6f6f;
            span{
              color: #f9c72a;
              padding: 0 10px;
              font-size: 26px;
            }
          }
        }
        .cancle{
          width: 100px;
          height: 40px;
          font-size: 20px;
          line-height: 38px;
          text-align: center;
          color: #fff;
          border: 1px solid #ff8c2f;
          background: #ff8c2f;
          border-radius: 20px;
          position: absolute;
          top: 240px;
          right: 40px;
          z-index: 9;
        }
        .complete{
          width: 78px;
          height: 34px;
          font-size: 18px;
          line-height: 34px;
          text-align: center;
          color: #9fa1a0;
          position: absolute;
          top: 110px;
          right: 40px;
        }
        .see{
          width: 120px;
          height: 40px;
          // background: #ff9036;
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          color: #ff9036;
          border-radius: 20px;
          position: absolute;
          top: 180px;
          right: 35px;
        }
      }
      .actiItem:nth-of-type(1){
        border-top: none;
      }
    }
    .actList2{
      .actiItem{
        margin-bottom: 20px;
        border: none;
      }
      .left{
        width: 165px;
        height: 230px;
        display: inline-block;
        .imgwrap{
          width: 165px;
          height: 165px;
          margin-top: 32px;
        }
      }
      .btnWrap{
        width: 100%;
        height: 90px;
        padding-right: 40px;
        // position: absolute;
        // bottom: 0;
        // right: 0;
        border-top: 1px solid #f0eded;
        .btn{
          width: 140px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-size: 24px;
          background: #fddf86;
          color: #6f6f6f;
          float: right;
          margin-top: 20px;
          border-radius: 10px;
        }
        .btn:nth-child(2) {
          background: #fabd8c;
          margin-right: 30px;
        }
      }
    }
  }
</style>

