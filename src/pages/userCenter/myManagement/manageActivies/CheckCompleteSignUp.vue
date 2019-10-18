<template>
  <!-- 已完成活动查看报名 -->
  <div class="checkCompleteSignUp" :class="{noData : isnoData}" v-title data-title="查看报名">
    <div class="noData" v-show="isnoData"></div>
    <ul class="memberItem" v-show="!isnoData">
        <li v-for="(item,index) in memberList" :key="index">
          <div class="iteImg">
            <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
          </div>
          <p class="name">{{item.nickName}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
          <div class="signNum">报名：<span v-show="item.mNumber > 0">男{{item.mNumber}}人</span><span v-show="item.mNumber > 0 && item.gNumber > 0">&nbsp;|&nbsp;</span><span v-show="item.gNumber > 0">女{{item.gNumber}}人</span></div>
          <!-- <div class="btn">确认收款</div>
          <div class="btn sure">退费</div> -->
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CheckCompleteSignUp',
  data() {
    return {
      memberList: [],
      isnoData: false,
      id: ''
    }
  },
  created() {
    this.id = window.sessionStorage.getItem('myOrangActId')
    // 报名列表
    this.$http.getSignUpList(this.id).then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.memberList = resp.data
        if(this.memberList.length == 0) {
          this.isnoData = true
        }else{
          this.isnoData = false
        }
      }
    })
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('myOrangActId')
  }
}
</script>

<style lang="scss" scoped>
  .checkCompleteSignUp{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .noData{
      width: 100%;
      height: 100vh;
      background: url('../../../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%;
        height: 130px;
        padding: 0 40px;
        border-top: 1px solid #f6f6f6;
        position: relative;
        .iteImg{
          width: 75px;
          height: 75px;
          float: left;
          border-radius: 50%;
          margin-top: 20px;
          // img{
          //   width: 100%;
          //   height: 100%;
          //   border-radius: 50%;
          // }
        }
        .name{
          float: left;
          font-size: 25px;
          line-height: 90px;
          margin-left: 28px;
          span{
            padding-left: 12px;
            font-weight: bold;
          }
          .el-icon-male{
            color: #0381fc;
          }
          .el-icon-female{
            color: #ff756b;
          }
        }
        .signNum{
          font-size: 23px;
          margin-right: 60px;
          color: rgb(122, 122, 122);
          position: absolute;
          top: 70px;
          left: 120px;
        }
        .btn{
          width: 130px;
          height: 45px;
          line-height: 42px;
          text-align: center;
          font-size: 24px;
          border: 1px solid #95d86f;
          color: rgb(105, 104, 104);
          float: right;
          margin-top: 40px;
          border-radius: 10px;
        }
        .sure{
          margin-right: 20px;
          border: 1px solid #f1cc7a;
        }
      }
      li:nth-child(1){
        border-top: none;
      }
    }
  }
</style>
 