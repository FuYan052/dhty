<template>
  <div class="activityDetail" v-title data-title="活动详情">
    <!-- 图片 -->
    <div class="topimg">
      <img src="../../assets/g-img.png" style="width:100%; height: 100%;" alt="">
    </div>
    <!-- 标题及报名情况 -->
    <div class="titleBox">
      <div class="titleText">智能约球A01-中高级场</div>
      <div class="people">
        <span class="span1">￥30/人</span>
        <span class="span2">报名情况：4/20</span>
      </div>
    </div>
    <!-- 时间详情 -->
    <div class="detailBox">
      <div class="p1">时间：2019年9月23日</div>
      <div class="p1">地点：波利羽毛球馆</div>
      <p>已报名会员:</p>
      <div class="headImgBox">
        <div class="left">
          <div class="imgItem">
            <img src="../../assets/touxiang.jpg" style="width: 100; height:100%; border-radius: 50%;" alt="">
          </div>
        </div>
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <!-- 规则 -->
    <div class="regularBox">
      <div class="regularTitle">规则</div>
      <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
      <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
    </div>
    <!-- 特殊服务 -->
    <div class="service">
      <div class="serviceTitle">特殊服务</div>
      <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
      <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
    </div>
    <!-- 来虎领队 -->
    <div class="service">
      <div class="serviceTitle">来虎领队</div>
      <p>1、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去球</p>
      <p>2、在来虎羽毛球贩卖机已经布置的球馆，将由球员刷码去前台领取</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDetail',
}
</script>

<style lang="scss" scoped>
  .activityDetail{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    padding-bottom: 210px;
    padding: 0 20px;
    .topimg{
      width: 100%;
      height: 300px;
    }
    .titleBox{
      width: 100%;
      height: 130px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      padding: 0 20px;
      .titleText{
        font-size: 30px;
        line-height: 30px;
        margin-top: 20px;
      }
      .people{
        width: 100%;
        margin-top: 30px;
        span{
          display: block;
        }
        .span1{
          float: left;
        }
        .span2{
          float: right;
        }
      }
    }
    .detailBox{
      width: 100%;
      height: 300px;
      background: #fff;
      margin-top: 20px;
      padding: 0 20px;
      overflow: hidden;
      .p1{
        width: 100%;
        height: 80px;
        font-size: 28px;
        line-height: 80px;
        border-bottom: 1px solid #dedede;
      }
      p{
        margin-top: 20px;
      }
      .headImgBox{
        width: 100%;
        height: 80px;
        .left{
          width: 80%;
          height: 80px;
          float: left;
          padding-top: 10px;
          .imgItem{
            width: 60px;
            height: 60px;
            float: left;
            border-radius: 50%;
            border: 1px solid #fff;
          }
        }
        span{
          float: right;
          font-size: 32px;
          line-height: 80px;
        }
      }
    }
    .regularBox{
      width: 100%;
      min-height: 300px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      padding: 0 20px;
      .regularTitle{
        width: 100%;
        height: 60px;
        font-size: 28px;
        line-height: 60px;
      }
      p{
        font-size: 27px;
        line-height: 40px;
        margin-top: 10px;
      }
    }
    .service{
      width: 100%;
      min-height: 300px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      padding: 0 20px;
      .serviceTitle{
        width: 100%;
        height: 60px;
        font-size: 28px;
        line-height: 60px;
      }
    }
  }
</style>