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
      <ul>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
          <div class="role">群主</div>
        </li>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
          <div class="role">管理员</div>
        </li>
      </ul>
    </div>
    <!-- 群员 -->
    <div class="memberList">
      <div class="title">群员</div>
      <ul>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
        </li>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
        </li>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
        </li>
        <li>
          <img src="../../assets/touxiang.jpg" alt="">
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
    }
  }
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
          .role{
            width: 105px;
            height: 38px;
            line-height: 35px;
            text-align: center;
            font-size: 22px;
            color: #a5a5a5;
            border: 1px solid #fac31e;
            border-radius: 20px;
            float: right;
            margin-top: 35px;
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
