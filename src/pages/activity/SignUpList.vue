<template>
  <!-- 报名列表 -->
  <div class="signUpList" v-title data-title="报名列表">
    <!-- 没有活动时显示缺省页 -->
    <div class="noList" v-show="noData"></div>
    <!-- 有活动 -->
    <div class="memberList" v-show="!noData">
        <ul class="memberItem">
          <li v-for="(item,index) in memberList" :key="index">
            <div class="listItemImg">
              <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
            </div>
            <p class="name">{{item.nickName}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
            <div class="signNum">报名：<span v-show="item.mNumber > 0">男{{item.mNumber}}人</span><span v-show="item.mNumber > 0 && item.gNumber > 0">&nbsp;|&nbsp;</span><span v-show="item.gNumber > 0">女{{item.gNumber}}人</span></div>
            <div class="grade">Lv.{{item.level}}</div>
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
      noData: false,
    }
  },
  created() {
    const _id = window.sessionStorage.getItem('activityDetailId')
    // 获取报名列表
    this.$http.getSignUpList(_id).then(resp => {
      console.log(resp)
      if(resp.status = 200) {
        this.memberList = resp.data
        if(this.memberList == 0) {
          this.noData = true
        }else{
          this.noData = false
        }
      }else{
        this.$toast('获取数据失败！')
      }
    })
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .signUpList{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .noList{
      width: 100%;
      height: 100vh;
      background: url('../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    .memberList{
      width: 100%;
      height: auto;
      background: #fff;
      border-bottom: 1px solid #e0dfe4;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 130px;
          padding: 0 20px;
          border-top: 1px solid #f6f6f6;
          position: relative;
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
            font-size: 26px;
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
          .grade{
            width: 65px;
            height: 28px;
            line-height: 30px;
            text-align: center;
            font-size: 15px;
            color: #fff;
            background: #f04040;
            border-radius: 20px;
            float: right;
            margin-top: 45px;
          }
          .signNum{
            font-size: 23px;
            margin-right: 60px;
            color: rgb(122, 122, 122);
            position: absolute;
            top: 70px;
            left: 120px;
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
