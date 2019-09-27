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
        {{item.name}}
      </div>
    </div>
    <!-- 没有活动时显示缺省页 -->
    <div class="noList" v-show="noData"></div>
    <!-- 活动列表 -->
    <div class="list" v-show="!noData">
      <div class="activItem" v-for="(item,index) in actList" :key="index">
          <div class="top">
            <!-- <p class="address">金地羽毛球馆1<span>16km</span></p> -->
            <div class="detailBox">
              <div class="venuImg1">
                <img :src="item.venueImage" style="width: 100%; height: 100%; border-radius: 10px;" alt="">
              </div>
              <div class="p1 p1_title"><span><i class="el-icon-house"></i></span>{{item.title}}</div>
              <div class="p1"><span><i class="el-icon-time"></i></span>{{item.time}}&nbsp;&nbsp;{{item.timeStart}}-{{item.timeEnd}}</div>
              <div class="p1"><span><i class="el-icon-location-outline"></i></span>{{item.venueName}}</div>
              <div class="p1"><span><i class="el-icon-phone-outline"></i></span>{{item.phone}}</div>
              <div class="p1"><span><i class="el-icon-coin"></i></span>{{item.cost}}元/人</div>
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
      cateList: [],
      currIndex: 0,
      actList: [],
      noData: false
    }
  },
  created() {
    // 获取活动类型
    this.$http.findDictList('sportsKinds').then(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.cateList = resp.data.slice(0,2)
        const params = {
          id: window.sessionStorage.getItem('userInfoId'),
          type: this.cateList[0].skey
        }
        this.$http.attendedActivities(params).then(resp => {
          console.log(resp)
          this.actList = resp.data
          if(this.actList == 0) {
            this.noData = true
          }else{
            this.noData = false
          }
        })
      }else{
        this.$toast({
          message: '获取列表失败！',
          duration: 2000
        });
      }
    })
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index

      const params = {
        id: window.sessionStorage.getItem('userInfoId'),
        type: item.skey
      }
      this.$http.attendedActivities(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
          this.actList = resp.data
          if(this.actList == 0) {
            this.noData = true
          }else{
            this.noData = false
          }
        }else{
          this.$toast({
            message: '获取列表失败！',
            duration: 2000
          });
        }
      })
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
        width: 100%;
        height: 3px;
        background: #ff9c00;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .noList{
      width: 100%;
      height: 100vh;
      background: url('../../../../assets/noDataBg.jpg') no-repeat center;
      background-size: cover;
    }
    .list{
      width: 100%;
      padding: 0 25px;
      .activItem{
        width: 100%;
        height: 235px;
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
            .venuImg1{
              width: 160px;
              height: 160px;
              margin-top: 35px;
              float: left;
              // img{
              //   width: 100%;
              //   height: 100%;
              //   float: left;
              //   border-radius: 10px;
              // }
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
              margin-top: 30px;
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