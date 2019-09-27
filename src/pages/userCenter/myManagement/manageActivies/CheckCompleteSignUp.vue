<template>
  <!-- 已完成活动查看报名 -->
  <div class="checkCompleteSignUp" :class="{noData : isnoData}" v-title data-title="查看报名">
    <div class="noData" v-show="isnoData"></div>
    <ul class="memberItem" v-show="!isnoData">
        <li v-for="(item,index) in memberList" :key="index">
          <div class="iteImg">
            <img :src="item.imgPath" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
          </div>
          <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
          <div class="btn">确认收款</div>
          <div class="btn sure">退费</div>
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
      isnoData: false
    }
  },
  created() {
    this.memberList = [
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
    ]
    if(this.memberList.length == 0) {
      this.isnoData = true
    }else{
      this.isnoData = false
    }
  },
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
          line-height: 130px;
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
 