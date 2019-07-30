<template>
  <!-- 组织活动 -->
  <div class="organization" v-title data-title="组织活动">
    <ul>
      <li>
        选择运动种类<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        选择所属群组<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写时间<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写地点<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写人数<span class="el-icon-arrow-right"></span>
      </li>
      <li>
        填写联系方式<span class="el-icon-arrow-right"></span>
      </li>
    </ul>
    <div class="cost">填写参加费用 <span class="el-icon-arrow-right"></span></div>
    <div class="notes">
      <span>参与须知</span>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
      </el-input>
    </div>
    <div class="submit">确认发布</div>
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      textarea1: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  .organization{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    ul{
      width: 100%;
      height: 575px;
      background: #fff;
      li{
        width: 100%;
        height: 94px;
        line-height: 94px;
        color: #a9a9a9;
        padding: 0 20px;
        border-top: 2px solid #f6f6f6;
        span{
          float: right;
          font-weight: bold;
          display: block;
          margin-top: 40px;
          color: #cdcdcd;
        }
      }
    }
    .cost{
      width: 100%;
      height: 94px;
      line-height: 94px;
      padding: 0 20px;
      margin: 30px 0;
      background: #fff;
      color: #a9a9a9;
      span{
        float: right;
        font-weight: bold;
        display: block;
        margin-top: 40px;
        color: #cdcdcd;
      }
    }
    .notes{
      width: 100%;
      min-height: 200px;
      background: #fff;
      padding: 0 20px;
      span{
        display: block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #a9a9a9;
      }
      
    }
    .submit{
      width: 710px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      text-align: center;
      background: #fac31e;
      margin: 0 auto;
      margin-top: 87px;
      border-radius: 10px;
      letter-spacing: 1px;
    }
  }
</style>
<style>
.organization .notes .el-textarea__inner{
  min-height: 110px !important;
  outline: none !important;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
}
</style>
