<template>
  <!-- 已发布活动查看报名 -->
  <div class="checkPublishSignUp" v-title data-title="查看报名">
    <ul class="memberItem">
        <li v-for="(item,index) in memberList" :key="index">
          <img :src="item.imgPath" alt="">
          <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
          <div class="cancel">取消活动</div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CheckPublishSignUp',
  data() {
    return {
      memberList: [],
    }
  },
  created() {
    if(this.memberList.length == 0) {
      this.$toast("暂无人员报名！")
    }
    // this.memberList = [
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '张三',
    //     sex: '男',
    //     grade: 'Lv.11'
    //   },
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '李四',
    //     sex: '男',
    //     grade: 'Lv.11'
    //   },
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '小丸子',
    //     sex: '女',
    //     grade: 'Lv.11'
    //   },
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '张三',
    //     sex: '男',
    //     grade: 'Lv.11'
    //   },
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '李四',
    //     sex: '男',
    //     grade: 'Lv.11'
    //   },
    //   {
    //     imgPath: require('../../../../assets/touxiang.jpg'),
    //     name: '小丸子',
    //     sex: '女',
    //     grade: 'Lv.11'
    //   },
    // ]
  },
}
</script>

<style lang="scss" scoped>
  .checkPublishSignUp{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    ul{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%;
        height: 130px;
        padding: 0 40px;
        border-top: 1px solid #f6f6f6;
        img{
          width: 75px;
          height: 75px;
          float: left;
          border-radius: 50%;
          margin-top: 20px;
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
        .cancel{
          width: 130px;
          height: 45px;
          line-height: 42px;
          text-align: center;
          font-size: 24px;
          border: 1px solid #f0d071;
          color: rgb(105, 104, 104);
          float: right;
          margin-top: 40px;
          border-radius: 10px;
        }
      }
      li:nth-child(1){
        border-top: none;
      }
    }
  }
</style>
