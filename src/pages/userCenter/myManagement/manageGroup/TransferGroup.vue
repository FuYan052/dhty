<template>
  <!-- 转让群 -->
  <div class="transferGroup" v-title data-title="转让群">
    <ul class="memberItem">
      <li v-for="(item,index) in memberList" :key="index" @click="selected(item,index)">
        <span class="checkWrap" :class="{selected : clickIndex === index}"><i class="el-icon-check"></i></span>
        <img :src="item.imgPath" alt="">
        <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
        <div class="grade">{{item.grade}}</div>
      </li>
    </ul>
    <div class="sureBtn">确定</div>
  </div>
</template>

<script>
export default {
  name: 'TransferGroup',
  data() {
    return {
      memberList: [],
      clickIndex: -1,
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
  },
  methods: {
    selected(item,index) {
      this.clickIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .transferGroup{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .memberItem{
      width: 100%;
      height: auto;
      background: #fff;
      border-top: 1px solid #e4e3e8;
      li{
        width: 100%;
        height: 128px;
        border-top: 1px solid #f4f4f4;
        padding: 0 40px;
        .checkWrap{
          display: block;
          width: 25px;
          height: 25px;
          border: 1px solid #a9a9a9;
          float: left;
          margin-top: 55px;
          i{
            display: block;
            width: 23px;
            height: 23px;
            margin-top: 2px;
            margin-left: -1px;
            float: left;
            font-size: 23px;
            font-weight: bolder;
            color: #fff;
          }
        }
        .selected{
          background: #fac31e;
          border: 1px solid #fac31e;
        }
        img{
          width: 75px;
          height: 75px;
          border-radius: 50%;
          float: left;
          margin-top: 30px;
          margin-left: 35px;
        }
        .name{
          float: left;
          margin-left: 50px;
          margin-top: 45px;
          .el-icon-male{
            color: #0683ff;
            padding-left: 10px;
            font-weight: bold;
          }
          .el-icon-female{
            color: #ff7e78;
            padding-left: 10px;
            font-weight: bold;
          }
        }
        .grade{
          width: 50px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background: #f7c21a;
          float: right;
          font-size: 16px;
          border-radius: 6px;
          margin-top: 50px;
        }
      }
    }
    .sureBtn{
      width: 222px;
      height: 75px;
      line-height: 75px;
      text-align: center;
      color: #fff;
      background: #ff8d30;
      border-radius: 15px;
      margin: 0 auto;
      margin-top: 150px;
    }
  }
</style>