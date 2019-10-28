<template>
  <!-- 账户明细 -->
  <div class="accountDetails" v-title data-title="账户明细">
    <ul>
      <li v-for="(item,index) in 10" :key="index" @click="toDetail(index)">
        <div class="leftImg">
          <div class="imgBox">
            <img src="../../../assets/touxiang.jpg" style="width: 100%; height:100%; border-radius: 50%;" alt="">
          </div>
        </div>
        <div class="right">
          <div class="title">
            男一号-18884052456
            <span>+25.00</span>
          </div>
          <div class="date">2019-10-26 15:00</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountDetails',
  methods: {
    toDetail(index) {
      this.$router.push({
        path: `/accountDetails/accountDetailsItem/${index}`
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
          padding-right: 45px;
          .title{
            height: 30px;
            font-size: 29px;
            line-height: 30px;
            margin-top: 40px;
            span{
              float: right;
              color: #f4b544;
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