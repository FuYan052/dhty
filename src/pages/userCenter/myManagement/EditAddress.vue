<template>
  <!-- 编辑地址 -->
  <div class="editAddress">
    <ul>
      <li>
        收货人：<input type="text" v-model="consignee" name="" id="">
      </li>
      <li>
        手机号码：<input type="text" v-model="phone" name="" id="">
      </li>
      <li :class="{'selestArea':showSelect}">
        所在区：<input type="text" v-model="area" @click="handleShowSelect" name="" id="">
        <span class="jt"><i v-show="!showSelect" class="el-icon-arrow-right"></i><i v-show="showSelect" class="el-icon-arrow-down"></i></span>
        <div class="wrap2" v-show="showSelect">
          <v-distpicker @selected="onSelected"></v-distpicker>
        </div>
      </li>
      <li class="addressDetail">
        <span>详细地址：</span><textarea v-model="addressDetail" name="" id=""></textarea>
      </li>
    </ul>
    <div class="tip">
      设为默认地址
      <div class="switchBtn">
        <el-switch
          v-model="switchVuale"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
    <div class="handleBtn">
      <div class="Btn deleteBtn">
        删除
      </div>
      <div class="Btn saveBtn">
        保存
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'EditAddress',
  components: {
    VDistpicker 
  },
  data() {
    return {
      routeParams: '',
      consignee: '',
      phone: '',
      area: '',
      showSelect: false,
      addressDetail: '',
      switchVuale: true
    }
  },
  created() {
    this.routeParams = this.$route.params
    this.consignee = this.routeParams.name
    this.phone = this.routeParams.phone
    this.consignee = this.routeParams.name
    this.addressDetail = this.routeParams.addressDetail
    this.switchVuale = this.routeParams.isDefault
  },
  methods: {
    handleShowSelect() {
      this.showSelect = !this.showSelect
    },
    onSelected(data) {
      // console.log(data)
      this.area = data.province.value + data.city.value + data.area.value
      this.showSelect = !this.showSelect
    },
  }
}
</script>

<style lang="scss" scoped>
  .editAddress{
    width: 100%;
    min-height: 100vh;
    background: #eaeaea;
    ul{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        min-height: 80px;
        border: 1px solid #cdcdcd;
        background: #fff;
        line-height: 80px;
        padding-left: 50px;
        position: relative;
        input{
          width: 450px;
          height: 50px;
          font-size: 26px;
          border: none;
          outline: none;
          padding-left: 10px;
        }
        .jt{
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          float: right;
          display: block;
          margin-right: 30px;
          i{
            color: #cbcbcb;
            font-weight: bold;
          }
        }
      }
      .selestArea{
        min-height: 270px;
        .wrap2{
          width: 77%;
          padding-bottom: 10px;
          height: auto;
          z-index: 9;
          position: absolute;
          top: 80px;
          right: 0;
        }
      }
      .addressDetail{
        min-height: 130px;
        position: relative;
        span{
          display: inline-block;
        }
        textarea{
          width: 520px;
          min-height: 110px;
          font-size: 26px;
          line-height: 40px;
          padding-top: 25px;
          border: none;
          outline: none;
          position: absolute;
          top: 0;
          right: 35px;
        }
      }
    }
    .tip{
      width: 100%;
      height: 75px;
      line-height: 75px;
      padding-left: 50px;
      border: 1px solid #cdcdcd;
      background: #fff;
      margin-top: 40px;
      .switchBtn{
        float: right;
        margin-right: 45px;
      }
    }
    .handleBtn{
      width: 100%;
      margin-top: 205px;
      padding: 0 120px;
      .Btn{
        width: 180px;
        height: 75px;
        line-height: 75px;
        text-align: center;
        border: 1px solid #6a6a6a;
        background: #fff;
        border-radius: 15px;
        cursor: pointer;
      }
      .deleteBtn{
        float: left;
      }
      .saveBtn{
        float: right;
      }
    }
  }
</style>
<style>
.distpicker-address-wrapper select{
  font-size: 26px;
}
.switchBtn .el-switch__core{
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
}
.switchBtn .el-switch__core:after{
  top:3px;
  left: 0;
  content: '';
  width: 30px;
  height: 30px;
}
.switchBtn .el-switch.is-checked .el-switch__core:after{
  margin-left: -30px;
  top:3px;
  content: '';
  width: 30px;
  height: 30px;
}
</style>

