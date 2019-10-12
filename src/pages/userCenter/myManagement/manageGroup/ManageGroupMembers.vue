<template>
  <!-- 管理群成员 -->
  <div class="manageGroupMembers" v-title data-title="管理群成员">
    <!-- 管理员 -->
    <div class="admin">
      <div class="title">管理员</div>
      <ul class="ul1">
        <li v-for="(item,index) in memberList1" :key="index"  @click="selected1(item,index)">
          <span class="checkWrap" :class="{selected:selectedAdminIds.indexOf(item.id)>=0}"><i class="el-icon-check"></i></span>
          <div class="image1">
            <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
          </div>
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
        <li v-for="(item,index) in memberList2" :key="index" @click="selected2(item,index)">
          <span class="checkWrap" :class="{selected:selectedMemberIds.indexOf(item.id)>=0}"><i class="el-icon-check"></i></span>
          <div class="image2">
            <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
          </div>
          <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
          <div class="grade">Lv.{{item.level}}</div>
        </li>
      </ul>
    </div>
    <div class="btnBox">
      <div @click="handle1">设为管理员</div>
      <div @click="handle2">移除管理员</div>
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
      selectedAdminIds: [],
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
    // 选择管理员
    selected1(item,index) {
      let selectedIndex = this.selectedAdminIds.indexOf(item.id)
      if(selectedIndex >= 0) {
        this.selectedAdminIds.splice(selectedIndex, 1)
      }else{
        this.selectedAdminIds.push(item.id)
      }
      console.log(this.selectedAdminIds)
    },
    // 选择群员
    selected2(item,index) {
      let selectedIndex = this.selectedMemberIds.indexOf(item.id)
      if(selectedIndex >= 0) {
        this.selectedMemberIds.splice(selectedIndex, 1)
      }else{
        this.selectedMemberIds.push(item.id)
      }
      console.log(this.selectedMemberIds)
    },
    // 设为管理员
    handle1() {
      if(this.selectedMemberIds.length === 0) {
        this.$toast("未选择群员！")
      }else{
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
      }
    },
    // 移除管理员
    handle2() {
      if(this.selectedAdminIds.length === 0) {
        this.$toast("未选择管理员！")
      }else{
        const isSure = confirm('确定移除?')
        if(isSure) {
          const params = {
            type: '2',  //根据后端约定的类型为2
            groupId: this.groupId,
            userId: this.selectedAdminIds
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
        }
      }
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
      // border-bottom: 1px solid #e0dfe4;
      .title{
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 30px;
        padding-left: 40px;
        // border-top: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
      }
      .ul1{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 130px;
          padding: 0 40px;
          border-top: 1px solid #f6f6f6;
          overflow: hidden;
          .checkWrap{
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #a9a9a9;
            float: left;
            margin-top: 50px;
            i{
              display: block;
              width: 23px;
              height: 23px;
              margin-top: 4px;
              margin-left: 0px;
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
          .image1{
            width: 75px;
            height: 75px;
            float: left;
            border-radius: 50%;
            margin-top: 23px;
            margin-left: 30px;
          }
          .name{
            float: left;
            font-size: 28px;
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
            font-size: 25px;
            line-height: 133px;
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
      // border-bottom: 1px solid #e0dfe4;
      margin-top: 20px;
      .title{
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 30px;
        padding-left: 40px;
        // border-top: 1px solid #eeecec;
        border-bottom: 1px solid #ecebeb;
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
          overflow: hidden;
          .checkWrap{
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #a9a9a9;
            float: left;
            margin-top: 50px;
            i{
              display: block;
              width: 23px;
              height: 23px;
              margin-top: 4px;
              margin-left: 0px;
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
          .image2{
            width: 75px;
            height: 75px;
            border-radius: 50%;
            float: left;
            margin-top: 25px;
            margin-left: 35px;
            // img{
            //   width: 100%;
            //   height: 100%;
            //   border-radius: 50%;
            // }
          }
          .name{
            float: left;
            margin-left: 30px;
            height: 128px;
            line-height: 128px;
            // margin-top: 43px;
            // border: 1px solid red;
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
      padding: 0 40px;
      margin-top: 80px;
      div{
        width: 320px;
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
    width: 70%;
  }
  .mint-msgbox-message{
    color: rgb(22, 21, 21);
  }
  .mint-msgbox-content{
    padding: 30px 10px;
  }
  .mint-msgbox-btns{
    height: 80px;
  }
</style>

