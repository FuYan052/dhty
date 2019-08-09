<template>
  <!-- 群组成员 -->
  <div class="members" v-title data-title="群组成员">
    <div class="searchBox">
      <el-input
        prefix-icon="el-icon-search"
        v-model="input3">
      </el-input>
    </div>
    <!-- 管理员 -->
    <div class="admin">
      <div class="title">管理员</div>
      <ul class="ul1">
        <li>
          <img src="../../../assets/touxiang.jpg" alt="">
          <div class="name">无名之辈<span class="el-icon-male"></span></div>
          <div class="role">群主</div>
          <div class="dj">Lv.11</div>
        </li>
        <li>
          <img src="../../../assets/touxiang.jpg" alt="">
          <div class="name">无名之辈<span class="el-icon-female"></span></div>
          <div class="role">管理员</div>
          <div class="dj">Lv.11</div>
        </li>
      </ul>
    </div>
    <!-- 群员 -->
    <div class="memberList">
      <div class="title">群员</div>
        <ul class="memberItem">
          <li v-for="(item,index) in memberList" :key="index" >
            <img :src="item.imgPath" alt="">
            <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
            <div class="grade">{{item.grade}}</div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Members',
  data() {
    return {
      input3: '',
      memberList: [],
    }
  },
  created() {
    this.memberList = [
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
    ]
  },
}
</script>

<style lang="scss" scoped>
  .members{
    width: 100%;
    min-height: 100vh;
    background: #efeef6;
    .searchBox{
      width: 100%;
      height: 104px;
      padding: 20px;
    }
    .admin{
      width: 100%;
      height: auto;
      background: #fff;
      border-bottom: 1px solid #e0dfe4;
      .title{
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 30px;
        padding-left: 40px;
        border-top: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
      }
      .ul1{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 130px;
          padding: 0 20px;
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
          .role{
            float: left;
            font-size: 24px;
            line-height: 130px;
            color: #a4a4a4;
            margin-left: 40px;
          }
          .dj{
            width: 65px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 15px;
            color: #fff;
            background: #f04040;
            border-radius: 20px;
            float: right;
            margin-top: 45px;
          }
        }
        li:nth-child(1){
          border-top: none;
        }
      }
    }
    .memberList{
      width: 100%;
      height: auto;
      background: #fff;
      border-bottom: 1px solid #e0dfe4;
      margin-top: 20px;
      .title{
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 30px;
        padding-left: 40px;
        border-top: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
      }
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 130px;
          padding: 0 20px;
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
          .grade{
            width: 65px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 15px;
            color: #fff;
            background: #f04040;
            border-radius: 20px;
            float: right;
            margin-top: 45px;
          }
        }
        li:nth-child(1){
          border-top: none;
        }
      }
    }
  }
</style>
<style>
  .members .searchBox .el-input__inner{
    height: 60px !important;
    border-radius: 10px;
    padding-left: 70px;
    font-size: 26px;
    border: 2px solid #dcdcdc;
  }
  .members .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .members .searchBox .el-input__icon{
    font-size: 35px;
    font-weight: bold;
    color: #767676;
  }
</style>
