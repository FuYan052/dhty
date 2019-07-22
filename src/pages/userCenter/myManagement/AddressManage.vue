<template>
  <!-- 地址管理 -->
  <div class="addressManage">
    <ul>
      <li v-for="(item,index) in addressList" :key="index">
        <p class="name">{{item.name}}<span>{{item.phone}}</span></p>
        <p class="address"><span v-show="item.isDefault">默认</span>{{item.addressDetail}}</p>
        <span class="editBtn" @click="handleEditAddress(item,index)"><i class="el-icon-edit"></i></span>
      </li>
    </ul>
    <div class="btnWrap">
      <div class="addBtn" @click="handleAddAddress">
        新增地址
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressManage',
  data() {
    return {
      addressList: [
        {
          name: '张三',
          phone: '13852465752',
          addressDetail: '四川省成都市高新区益州大道555号星宸国际',
          isDefault: true
        },
        {
          name: '李四',
          phone: '13852465752',
          addressDetail: '四川省成都市高新区益州大道555号星宸国际',
          isDefault: false
        },
        {
          name: '张三',
          phone: '13852465752',
          addressDetail: '四川省成都市高新区益州大道555号星宸国际',
          isDefault: false
        },
      ]
    }
  },
  methods: {
    handleAddAddress() {
      this.$router.push({
        path: '/addressManagement/addAddress'
      })
    },
    handleEditAddress(item,index) {
      // console.log(item)
      this.$router.push({
        path: '/addressManagement/editAddress',
        name: 'EditAddress',
        params: item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .addressManage{
    width: 100%;
    min-height: 100vh;
    background: #eaeaea;
    ul{
      width: 100%;
      height: auto;
      padding: 0 10px;
      background: #fff;
      li{
        width: 100%;
        min-height: 130px;
        border-bottom: 1px solid #cccccc;
        padding-right: 50px;
        position: relative;
        .name{
          padding-top: 20px;
          padding-left: 35px;
          span{
            padding-left: 45px;
          }
        }
        .address{
          margin-top: 20px;
          margin-left: 35px;
          line-height: 46px;
          span{
            display: inline-block;
            background: #ff7f7f;
            margin-right: 25px;
            padding: 0 3px;
          }
        }
        .editBtn{
          display: block;
          position: absolute;
          top: 25px;
          right: 60px;
          font-size: 34px;
        }
      }
    }
    .btnWrap{
      width: 100%;
      height: 77px;
      margin-top: 170px;
      padding: 0 120px;
      .addBtn{
        width: 320px;
        height: 75px;
        margin: 0 auto;
        border: 1px solid #6a6a6a;
        background: #fff;
        border-radius: 15px;
        line-height: 75px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
