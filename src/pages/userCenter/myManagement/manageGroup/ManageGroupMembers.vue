<template>
  <!-- 管理群成员 -->
  <div class="manageGroupMembers" v-title data-title="管理群成员">
    <div class="searchBox">
      <el-input
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
    </div>
    <ul class="memberItem">
      <li v-for="(item,index) in memberList" :key="index" @click="selected(item,index)">
        <span class="checkWrap" :class="{selected:selectedList.indexOf(index)>=0}"><i class="el-icon-check"></i></span>
        <img :src="item.imgPath" alt="">
        <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
        <div class="grade">{{item.grade}}</div>
      </li>
    </ul>
    <div class="btnBox">
      <div>设为群助理</div>
      <div>移除</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageGroupMembers',
  data() {
    return {
      input2: '',
      memberList: [],
      selectedList: [],
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
      let selectedIndex = this.selectedList.indexOf(index)
      if(selectedIndex >= 0) {
        this.selectedList.splice(selectedIndex, 1)
      }else{
        this.selectedList.push(index)
      }
      console.log(this.selectedList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .manageGroupMembers{
    width: 100%;
    min-height: 100vh;
    background: #f0eff5;
    .searchBox{
      width: 100%;
      height: 104px;
      padding: 20px;
    }
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
          border: 1px solid #ff8d30;
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
    .btnBox{
      width: 100%;
      height: 130px;
      padding: 0 50px;
      margin-top: 80px;
      div{
        width: 222px;
        height: 75px;
        line-height: 75px;
        text-align: center;
        color: #fff;
        background: #fac31e;
        float: left;
        border-radius: 15px;
      }
      div:nth-child(2){
        float: right;
        background: #ff8d30;
      }
    }
  }
</style>
<style>
  .manageGroupMembers .searchBox .el-input__inner{
    height: 60px !important;
    border-radius: 10px;
    padding-left: 70px;
    font-size: 26px;
    border: 2px solid #dcdcdc;
  }
  .manageGroupMembers .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .manageGroupMembers .searchBox .el-input__icon{
    font-size: 35px;
    font-weight: bold;
    color: #767676;
  }
</style>

