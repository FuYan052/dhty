<template>
  <!-- ta参加过的活动 -->
  <div class="attendedActivies" v-title data-title="参加的活动">
    <!-- 活动类型分类 -->
    <div class="cate">
      <div class="cateItem" 
        v-for="(item,index) in cateList" 
        :key="index"
        :class="{activeCate : currIndex === index}"
        @click="changeCate(item,index)"> 
        {{item}}
      </div>
    </div>
    <!-- 活动列表 -->
    <div class="list">
      <div class="activItem" v-for="(item,index) in 3" :key="index">
          <div class="top">
            <div class="title">
              <img src="../../../../assets/touxiang.jpg" alt="">
              <p class="text">昆仑山人007</p>
              <p class="role">大虎管理员</p>
              <!-- <div class="rightBtn" @click="toSignUp">正在报名</div> -->
            </div>
            <!-- <p class="address">金地羽毛球馆1<span>16km</span></p> -->
            <div class="detailBox">
              <img src="../../../../assets/g-img.png" alt="">
              <div class="p1 p1_title"><span><i class="el-icon-house"></i></span>6月26日周三晚19:00，羽毛球约起</div>
              <div class="p1"><span><i class="el-icon-time"></i></span>2019-06-26&nbsp;&nbsp;19:00-21:00</div>
              <div class="p1"><span><i class="el-icon-location-outline"></i></span>锦城公园</div>
              <div class="p1"><span><i class="el-icon-phone-outline"></i></span>18867592546</div>
              <div class="p1"><span><i class="el-icon-coin"></i></span>60元/人</div>
            </div>
          </div>
          <!-- <div class="address" @click="toClub">
            <span class="span1 el-icon-location"></span>成都千羽千寻羽毛球俱乐部<span class="span2 el-icon-arrow-right"></span>
          </div> -->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendedActivies',
  data() {
    return {
      cateList: ['羽毛球','跑步'],
      currIndex: 0,
    }
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
    },
  }
}
</script>

<style lang="scss" scoped>
  .attendedActivies{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cate{
      width: 100%;
      height: 86px;
      background: #fff;
      padding: 0 50px;
      border-bottom: 1px solid #f5f5f5;
      .cateItem{
        width: 50%;
        height: 86px;
        float: left;
        line-height: 86px;
        text-align: center;
        color: #838383;
        position: relative;
      }
      .activeCate{
        color: #000;
      }
      .activeCate::before{
        display: block;
        content: '';
        width: 48px;
        height: 3px;
        background: #22a1f2;
        position: absolute;
        bottom: 1px;
        left: 42.5%;
      }
    }
    .list{
      width: 100%;
      padding: 0 25px;
      .activItem{
        width: 100%;
        height: 360px;
        margin-top: 20px;
        background: #fff;
        // border-top-right-radius: 25px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .top{
          width: 100%;
          height: auto;
          .title{
            width: 100%;
            height: 128px;
            position: relative;
            img{
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 23px;
              margin-left: 30px;
              border-radius: 50%;
            }
            .text{
              display: inline-block;
              font-size: 26px;
              line-height: 30px;
              color: #161616;
              margin-top: 22px;
              margin-left: 18px;
            }
            .role{
              width: 135px;
              height: 35px;
              line-height: 30px;
              text-align: center;
              color: #73bbf5;
              border: 1px solid #259ff2;
              font-size: 20px;
              border-radius: 20px;
              position: absolute;
              top: 71px;
              left: 95px;
            }
            .rightBtn{
              width: 150px;
              height: 60px;
              line-height: 60px;
              background: #72cad8;
              font-size: 23px;
              color: #fff;
              text-align: center;
              border-top-right-radius: 25px;
              border-bottom-left-radius: 25px;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .detailBox{
            width: 636px;
            height: 188px;
            margin: 0 auto;
            border-top: 1px solid #eeeeee;
            // border-bottom: 1px solid #eeeeee;
            img{
              width: 160px;
              height: 160px;
              margin-top: 35px;
              float: left;
              border-radius: 10px;
            }
            .p1{
              width: 460px;
              float: right;
              line-height: 37px;
              color: #838383;
              font-size: 23px;
              span{
                display: inline-block;
                background: #fff;
                padding-right: 15px;
                i{
                  color: #b7ab71;
                  font-size: 22px;
                  vertical-align: middle;
                  text-align: center;
                  float: left;
                }
              }
            }
            .p1_title{
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            .p1:nth-of-type(1){
              margin-top: 30px;
            }
          }
        }
        .address{
          width: 100%;
          height: 78px;
          padding-left: 45px;
          padding-right: 40px;
          line-height: 78px;
          .span1{
            font-size: 31px;
            color: #b5ab70;
            padding-right: 15px;
          }
          .span2{
            float: right;
            line-height: 78px;
            font-size: 27px;
            color: #b2b2b2;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>