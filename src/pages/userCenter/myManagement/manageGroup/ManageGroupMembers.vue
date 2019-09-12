<template>
  <!-- 管理群成员 -->
  <div class="manageGroupMembers" v-title data-title="管理群成员">
    <!-- <div class="searchBox">
      <el-input
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
    </div> -->
    <!-- 管理员 -->
    <div class="admin">
      <div class="title">管理员</div>
      <ul class="ul1">
        <li @click="memberInfo(item.id)" v-for="(item,index) in memberList1" :key="index">
          <img :src="item.image" alt="">
          <div class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></div>
          <div class="role">{{item.state}}</div>
          <div class="dj">Lv.{{item.level}}</div>
        </li>
      </ul>
    </div>
    <!-- 群员 -->
    <div class="memberList">
      <div class="title">群员</div>
      <ul class="memberItem">
        <li v-for="(item,index) in memberList2" :key="index" @click="selected(item,index)">
          <span class="checkWrap" :class="{selected:selectedMemberIds.indexOf(item.id)>=0}"><i class="el-icon-check"></i></span>
          <img :src="item.image" alt="">
          <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
          <div class="grade">Lv.{{item.level}}</div>
        </li>
      </ul>
    </div>
    <div class="btnBox">
      <div @click="handle1">设为管理员</div>
      <div @click="handle2">移除</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageGroupMembers',
  data() {
    return {
      input2: '',
      memberList1: [],
      memberList2: [],
      selectedList: [],
      selectedMemberIds: [],
      groupId: ''
    }
  },
  created() {
   this.getMemberList()
  },
  methods: {
    getMemberList() {
       // 获取群成员
      this.groupId = window.sessionStorage.getItem('handleGroupId')
      const params = {
        groupId: this.groupId,
        keyWord: ''
      }
      this.$http.groupMembers(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.memberList1 = resp.data.gMemersVo1One
          this.memberList2 = resp.data.gMemersVo1Two
        }
      })
    },
    selected(item,index) {
      let selectedIndex = this.selectedList.indexOf(index)
      if(selectedIndex >= 0) {
        this.selectedList.splice(selectedIndex, 1)
        this.selectedMemberIds.splice(selectedIndex, 1)
      }else{
        this.selectedList.push(index)
        this.selectedMemberIds.push(item.id)
      }
      // console.log(this.selectedMemberIds)
    },
    // 设为管理员
    handle1() {
      const params = {
        type: '1',  //根据后端约定的类型为1
        groupId: this.groupId,
        userId: this.selectedMemberIds
      }
      this.$http.setInfo(params).then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.getMemberList()
          this.selectedMemberIds = []
        }else{
          this.$toast({
            message: '操作失败！',
            duration: 2000
          });
        }
      })
    },
    // 移除
    handle2() {
      this.$messagebox.confirm('确定删除?').then(action => {
        const params = {
          type: '3',  //根据后端约定的类型为1
          groupId: this.groupId,
          userId: this.selectedMemberIds
        }
        this.$http.setInfo(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.getMemberList()
            this.selectedMemberIds = []
          }else{
            this.$toast({
              message: '操作失败！',
              duration: 2000
            });
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .manageGroupMembers{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
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
      .memberItem{
        width: 100%;
        height: auto;
        background: #fff;
        // border-top: 1px solid #e4e3e8;
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
            width: 65px;
            height: 28px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: #f7c21a;
            float: right;
            font-size: 16px;
            border-radius: 20px;
            margin-top: 50px;
          }
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
  .mint-msgbox {
    width: 60%;
  }
  .mint-msgbox-message{
    color: rgb(22, 21, 21);
  }
  .mint-msgbox-content{
    padding: 30px 10px;
  }
  .mint-msgbox-btns{
    height: 60px;
  }
</style>

