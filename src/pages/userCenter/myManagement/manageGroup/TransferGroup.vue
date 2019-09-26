<template>
  <!-- 转让群 -->
  <div class="transferGroup" v-title data-title="转让群">
    <ul class="memberItem">
      <li v-for="(item,index) in memberList" :key="index" @click="selected(item,index)">
        <span class="checkWrap" :class="{selected : clickIndex === index}"><i class="el-icon-check"></i></span>
        <div class="traImg">
          <img :src="item.image" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
        </div>
        <p class="name">{{item.name}}<span class="el-icon-male" v-show="item.sex === '男'"></span><span v-show="item.sex === '女'" class="el-icon-female"></span></p>
        <div class="grade">Lv.{{item.level}}</div>
      </li>
    </ul>
    <div class="sureBtn" v-show="isHaveMember" @click="sure">确定</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TransferGroup',
  data() {
    return {
      memberList1: [],
      memberList2: [],
      memberList: [],
      clickIndex: -1,
      toUserId: '',  //被转让者id
      isHaveMember: false
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    // 获取转让群员列表
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
        this.memberList = this.memberList1.concat(this.memberList2)
        // 过滤自己本身
        this.memberList = this.memberList.filter(item => {
          return item.id != this.userId
        })
        if(this.memberList.length === 0) {
          this.$toast('此社群还没有群成员哦！')
          this.isHaveMember = false
        }else{
          this.isHaveMember = true
        }
      }
    })
  },
  methods: {
    // 选择群员
    selected(item,index) {
      this.clickIndex = index
      this.toUserId = item.id
    },
    // 确定
    sure() {
      if(this.toUserId == '') {
        this.$toast('转让失败！')
      }else{
        const params = {
          groupId: this.groupId,
          qId: this.userId,
          cId: this.toUserId
        }
        this.$http.transferGroup(params).then(resp => {
          console.log(resp)
          if(resp.status == 200) {
            this.$toast({
              message: '转让成功！',
              duration: 2000
            });
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
        .traImg{
          width: 75px;
          height: 75px;
          border-radius: 50%;
          float: left;
          margin-top: 30px;
          margin-left: 35px;
          // img{
          //   width: 100%;
          //   height: 100%;
          //   border-radius: 50%;
          // }
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