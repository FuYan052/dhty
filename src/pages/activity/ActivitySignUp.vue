<template>
  <!-- 活动报名 -->
  <div class="activitySignUp" v-title data-title="活动报名">
    <div class="actDetail">
      <div class="left">
        <h1 class="time">19:00</h1>
        <div class="date">08月01日</div>
      </div>
      <div class="right">
        <p class="title"><span>【俱乐部活动】</span>08月05日周一俱乐部活动一起</p>
        <p class="p name">俱乐部：上海昊然羽毛球俱乐部</p>
        <p class="p organizer">组织者：小丸子</p>
        <p class="p place">体育馆：省体育馆</p>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="number">报名人数</div>
    <div class="numberWrap">
      <ul>
        <li>
          <div class="left"><span class="el-icon-user"></span>男</div>
          <div class="right">
            <el-input-number v-model="num1" @change="handleChange" :min="0"></el-input-number>
          </div>
        </li>
        <li>
          <div class="left"><span class="el-icon-user"></span>女</div>
          <div class="right">
            <el-input-number v-model="num2" @change="handleChange" :min="0"></el-input-number>
          </div>
        </li>
      </ul>
    </div>
    <!-- 支付方式 -->
    <div class="payType">支付方式</div>
      <ul class="pay">
        <!-- <li>
          <div class="left">
            <el-radio v-model="radio" label="1">会费支付</el-radio>
          </div>
          <div class="right">
          </div>
        </li> -->
        <li>
          <div class="left">
            <div class="circle"><span></span></div><div class="text">微信支付</div>
          </div>
          <div class="right">
            {{cost}}元/人
          </div>
        </li>
      </ul>
    <!-- 确认按钮 -->
    <div class="bottom">
      <div class="left">
        <p class="p1">合计：</p>
        <p class="p2">现金：{{total}}元</p>
      </div>
      <div class="btn" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivitySignUp',
  data() {
    return {
      num1: 0,
      num2: 0,
      radio: '1',
      cost: '35',
      
    }
  },
  computed: {
    total() {
      return Number(this.cost) * (this.num1 + this.num2)
    }
  },
  methods: {
    handleChange(value) {
      // console.log(value);
    },
    sure() {
      console.log(this.total)
    }
  }
}
</script>

<style lang="scss" scoped>
  .activitySignUp{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .actDetail{
      width: 100%;
      height: 228px;
      background: #fff;
      overflow: hidden;
      .left{
        width: 170px;
        height: 120px;
        border-right: 1px solid #e8e8e8;
        float: left;
        margin-top: 55px;
        padding-right: 20px;
        overflow: hidden;
        .time{
          font-size: 26px;
          color: #f9c41e;
          font-weight: bold;
          text-align: center;
          line-height: 65px;
        }
        .date{
          font-size: 22px;
          color: #a5a5a5;
          text-align: center;
        }
      }
      .right{
        width: 540px;
        height: 100%;
        float: right;
        padding-top: 42px;
        white-space: nowrap;
        padding-right: 20px;
        .title{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #7f7f7f;
        }
        .p{
          font-size: 20px;
          color: #797979;
          line-height: 37px;
        }
        .name{
          margin-top: 5px;
        }
      }
    }
    .number{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 120px;
    }
    .numberWrap{
      width: 100%;
      height: auto;
      // height: 195px;
      background: #fff;
      ul{
        width: 100%;
        height: auto;
        // border: 1px solid red;
        li{
          width: 100%;
          height: 100px;
          padding-left: 30px;
          padding-right: 40px;
          .left{
            width: 200px;
            height: 96px;
            line-height: 96px;
            float: left;
            font-size: 20px;
            span{
              font-size: 32px;
              color: #12abe7;
              padding-right: 25px;
            }
          }
          .right{
            width: 230px;
            height: 100%;
            float: right;
          }
        }
        li:nth-child(2){
          border-top: 1px solid #f0f2f1;
          .left{
            span{
              color: #e60e57;
            }
          }
        }
      }
    }
    .payType{
      width: 100%;
      height: 100px;
      padding-left: 20px;
      line-height: 120px;
    }
    .pay{
      width: 100%;
      height: auto;
      background: #fff;
      li{
        width: 100%;
        height: 100px;
        padding-left: 30px;
        padding-right: 40px;
        .left{
          width: 300px;
          line-height: 20px;
          font-size: 0;
          float: left;
          .circle{
            width: 47px;
            height: 47px;
            display: inline-block;
            border: 1px solid #fac31e;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            span{
              display: block;
              width: 21px;
              height: 21px;
              background: #fac31e;
              border-radius: 50%;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .text{
            display: inline-block;
            margin-left: 20px;
            line-height: 96px;
            font-size: 28px;
            vertical-align: middle;
          }
        }
        .right{
          float: right;
          width: 200px;
          line-height: 100px;
          text-align: right;
          color: #6e6e6e;
        }
      }
    }
    .bottom{
      width: 100%;
      height: 128px;
      border-top: 1px solid #e6eaeb;
      background: #fff;
      position: fixed;
      bottom: 0;
      .left{
        width: 50%;
        height: 128px;
        float: left;
        padding-left: 20px;
        .p1{
          font-size: 22px;
          color: #717171;
          line-height: 22px;
          margin-top: 24px;
        }
        .p2{
          font-size: 24px;
          color: #ec532a;
          line-height: 24px;
          margin-top: 20px;
        }
      }
      .btn{
        width: 152px;
        height: 76px;
        color: #fff;
        background: #ee5e39;
        line-height: 76px;
        text-align: center;
        float: right;
        margin-top: 27px;
        margin-right: 17px;
        border-radius: 10px;
      }
    }
  }
</style>
<style>   
  .activitySignUp .numberWrap .right .el-input-number{
    width: 230px;
    height: 45px;
    margin-top: 25px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input__inner{
    width: 120px;
    height: 45px;
    line-height: 43px;
    border-radius: 10px;
    font-size: 20px;
    padding: 0;
    margin-left: 55px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__decrease{
    background: #d5d9d8;
    color: #fff;
    border-radius: 7px;
  }
  .activitySignUp .numberWrap .right .el-input-number .el-input-number__increase{
    background: #fac31e;
    color: #fff;
    border-radius: 7px;
  }
</style>
