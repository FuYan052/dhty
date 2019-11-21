<template>
  <!-- 账户明细 -->
  <div class="accountDetails" v-title data-title="账户明细">
    <!-- 无数据时缺省页 -->
    <div class="noData" v-show="noList"></div>
    <!-- 有数据时 -->
    <ul v-show="!noList">
      <li v-for="(item,index) in accountList" :key="index" @click="toDetail(item)">
        <div class="leftImg">
          <div class="imgBox">
            <img :src="item.image" style="width: 100%; height:100%; border-radius: 50%;" alt="">
          </div>
        </div>
        <div class="right">
          <div class="title">
            {{item.name}}-{{item.phone}}
            <span class="zheng" v-if="item.paymentType">+{{item.totalFee}}</span>
            <span class="fu" v-else>-{{item.totalFee}}</span>
          </div>
          <!-- 时间 -->
          <div class="date">{{item.timeStart}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountDetails',
  data() {
    return {
      accountList: [],
      noList: false,
    }
  },
  created() {
    this.$http.getAccount().then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.accountList = resp.data
        if(this.accountList.length == 0) {
          this.noList = true
        }else{
          this.noList = false
        }
      }
    })
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: `/accountDetails/accountDetailsItem/${item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .accountDetails{
    width: 100%;
    min-height: 100vh;
    background: #fff;
    .noData{
      width: 100%;
      height: 100vh;
      background: url('../../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    ul{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 150px;
        .leftImg{
          width: 17.9%;
          height: 150px;
          float: left;
          .imgBox{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 33px;
            margin-top: 37px;
          }
        }
        .right{
          width: 82.1%;
          height: 150px;
          float: right;
          border-top: 1px solid #f2f2f2;
          padding-right: 175px;
          position: relative;
          .title{
            height: 30px;
            font-size: 29px;
            line-height: 32px;
            margin-top: 39px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            span{
              display: block;
              // float: right;
              font-size: 36px;
              color: #222222;
              position: absolute;
              right: 30px;
              top: 40px;
            }
            .fu{
              color: #e55e27;
            }
          }
          .date{
            height: 22px;
            font-size: 22px;
            line-height: 22px;
            color: #b8bab9;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>