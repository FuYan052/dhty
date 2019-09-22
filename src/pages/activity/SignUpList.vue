<template>
  <!-- 报名列表 -->
  <div class="signUpList" v-title data-title="报名列表">
    <div class="memberList">
        <ul class="memberItem">
          <li v-for="(item,index) in memberList" :key="index" @click="memberInfo">
            <div class="listItemImg">
              <img :src="item.imgPath" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
            </div>
            <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
            <div class="grade">{{item.grade}}</div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpList',
  data() {
    return {
      input3: '',
      memberList: [],
    }
  },
  created() {
    this.memberList = [
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '张三',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '李四',
        sex: '男',
        grade: 'Lv.11'
      },
      {
        imgPath: require('../../assets/touxiang.jpg'),
        name: '小丸子',
        sex: '女',
        grade: 'Lv.11'
      },
    ]
  },
  methods: {
    memberInfo() {
      this.$router.push({
        path: '/club/member/memberData'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .signUpList{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .memberList{
      width: 100%;
      height: auto;
      background: #fff;
      border-bottom: 1px solid #e0dfe4;
      margin-top: 20px;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 130px;
          padding: 0 20px;
          border-top: 1px solid #f6f6f6;
          .listItemImg{
            width: 75px;
            height: 75px;
            float: left;
            margin-top: 20px;
            // img{
            //   width: 100%;
            //   height: 100%;
            //   // float: left;
            //   border-radius: 50%;
            //   // margin-top: 20px;
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
  .signUpList .searchBox .el-input__inner{
    height: 60px !important;
    border-radius: 10px;
    padding-left: 70px;
    font-size: 26px;
    border: 2px solid #dcdcdc;
  }
  .signUpList .searchBox .el-input__prefix{
    left: 18px;
    top: 12px;
  }
  .signUpList .searchBox .el-input__icon{
    font-size: 35px;
    font-weight: bold;
    color: #767676;
  }
</style>
