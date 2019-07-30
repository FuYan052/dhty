<template>
  <!-- 活动页 -->
  <div class="activityHome">
    <!-- 头部菜单栏 -->
    <div class="cateNav">
      <div class="content">
        <div 
          class="cateItem"
          v-for="(item,index) in cateList" 
          :key="index"
          :class="{activeCate : currIndex === index}"
          @click="changeCate(index)"
          >{{item}}</div>
      </div>
    </div>
    <!-- 日期切换 -->
    <div class="dateList">
      <div class="dateItem" 
        v-for="(item,index) in dateList" 
        :key="index"
        :class="{activeDate : currDateIndex === index}"
        @click="changeDate(index)"
        >
        <p class="p p1">{{item.date1}}</p>
        <p class="p p2">{{item.date2}}</p>
      </div>
    </div>
    <!-- 活动详情 -->
    <div class="contentBg">
      <div class="content">
        <div class="activItem" v-for="(item,index) in 3" :key="index">
          <div class="top">
            <div class="title">
              <img src="../../assets/123.jpg" alt="">
              <span class="text">成都千羽千寻羽毛球俱乐部</span>
              <span class="rightIcon"><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="admin">
              <img src="../../assets/touxiang.jpg" alt="">
              <span>大虎管理员</span>
              <span>杨洋然</span>
            </div>
            <p class="address">金地羽毛球馆1<span>16km</span></p>
            <div class="detailBox">
              <p class="p1"><span><i class="el-icon-house"></i></span>6月26日周三晚19:00，羽毛球约起</p>
              <p class="p1"><span><i class="el-icon-time"></i></span>2019-06-26&nbsp;&nbsp;19:00-21:00</p>
              <p class="p1"><span><i class="el-icon-coin"></i></span>60元/人</p>
            </div>
            <div class="signUpBtn">
              <div class="green">正在报名</div>
              <div class="number">8/10</div>
            </div>
          </div>
          <div class="bottom">
            <div class="leftIcon"><i class="el-icon-user-solid"></i></div>
            <div class="HeadPortrait">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
              <img src="../../assets/touxiang.jpg" alt="">
              <img src="../../assets/123.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityHome',
  data() {
    return {
      cateList: ['羽毛球', '跑步'],
      currIndex: 0,
      currDateIndex: 0,
      dateList: [
        {
          date1: '',
          date2: '今天'
        },
        {
          date1: '',
          date2: '明天'
        },
        {
          date1: '',
          date2: '后天'
        },
        {
          date1: '',
          date2: '两天后'
        },
      ]
    }
  },
  created() {
    for(let i = 0; i< 4; i++){
      const result = this.findDate(i)
      this.dateList[i].date1 = result
    }
    this.dateList[3].date1 = this.dateList[3].date1 + '~'
    console.log(this.dateList)
  },
  methods: {
    changeCate(index) {
      this.currIndex = index
    },
    changeDate(index) {
      this.currDateIndex = index
    },
    // 获取当前日期及后面方伟范围内的日期
    findDate(aa) {
      var date1 = new Date()
      var time1 = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate()
      var date2 = new Date(date1)
      date2.setDate(date1.getDate()+aa)
      var _month = date2.getMonth()+1
      var _day = date2.getDate()
      if(_month < 10){
        _month = "0" + _month
      }else{
         _month = date2.getMonth()+1
      }
      if(_day < 10){
        _day = "0" + _day
      }else{
         _day = date2.getDate()
      }
      var time = _month + "月"+ _day+ "日"
      return time;
    }
  }
}
</script>

<style lang="scss" scoped>
  .activityHome{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cateNav{
      width: 100%;
      height: 94px;
      background: #0ab090;
      .content{
        width: 246px;
        height: 94px;
        margin: 0 auto;
        padding-top: 20px;
        .cateItem{
          width: 40%;
          height: 62px;
          line-height: 62px;
          text-align: center;
          color: #f3fbf9;
          font-size: 32px;
        }
        .cateItem:nth-child(1){
          float: left;
        }
        .cateItem:nth-child(2){
          float: right;
        }
        .activeCate{
          border-bottom: 3px solid #fff;
        }
      }
    }
    .dateList{
      width: 100%;
      height: 84px;
      border-bottom: 2px solid #d9d9d9;
      background: #fff;
      .dateItem{
        width: 25%;
        height: 82px;
        float: left;
        text-align: center;
        padding-top: 8px;
        position: relative;
        .p{
          color: #2c2c2c;
        }
        .p1{
          font-size: 20px;
        }
        .p2{
          font-size: 18px;
          line-height: 26px;
        }
      }
      .dateItem::before{
        display: block;
        content: '';
        width: 4px;
        height: 50px;
        border-right: 1px solid #e2e2e2;
        position: absolute;
        top: 15px;
        left: -5px;
      }
      .dateItem:nth-child(1)::before{
        display: none;
      }
      .activeDate{
        border-bottom: 4px solid #2db299;
      }
    }
    .contentBg{
        width: 100%;
        padding: 20px;
        .content{
          width: 100%;
          height: auto;
          background: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          .activItem{
            width: 100%;
            // height: 555px;
            min-height: 555px;
            .top{
              width: 100%;
              // height: 475px;
              height: auto;
              padding: 0 10px;
              .title{
                width: 100%;
                height: 95px;
                line-height: 95px;
                border-bottom: 1px solid #eeeeee;
                img{
                  width: 60px;
                  height: 60px;
                  float: left;
                  margin-top: 17px;
                  margin-left: 10px;
                  border-radius: 12px;
                }
                .text{
                  display: inline-block;
                  width: 565px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #161616;
                  padding-left: 25px;
                }
                .rightIcon{
                  font-size: 26px;
                  color: #b0b0b0;
                  font-weight: bolder;
                  float: right;
                }
              }
              .admin{
                width: 100%;
                height: 94px;
                line-height: 94px;
                img{
                  width: 60px;
                  height: 60px;
                  float: left;
                  margin-top: 20px;
                  margin-left: 10px;
                  border-radius: 50%;
                }
                span{
                  color: #aaaaaa;
                  padding-left: 25px;
                }
                span:nth-child(3){
                  padding-left: 50px;
                }
              }
              .address{
                width: 100%;
                line-height: 50px;
                padding-left: 90px;
                font-size: 26px;
                color: #515151;
                span{
                  color: #989898;
                  float: right;
                  font-weight: normal;
                }
              }
              .detailBox{
                width: 600px;
                min-height: 145px;
                background: #f6f6f6;
                margin-top: 15px;
                margin-left: 90px;
                padding-top: 10px;
                p{
                  color: #565656;
                  line-height: 45px;
                  span{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    margin: 0 15px;
                    background: #fff;
                    padding: 5px;
                    i{
                      color: #37b59c;
                      font-size: 22px;
                      vertical-align: middle;
                      text-align: center;
                      float: left;
                    }
                  }
                }
              }
              .signUpBtn{
                width: 100%;
                height: 75px;
                .green{
                  width: 145px;
                  height: 50px;
                  float: right;
                  color: #fff;
                  background: #29cb92;
                  line-height: 48px;
                  text-align: center;
                  margin-top: 12px;
                  margin-right: -20px;
                }
                .number{
                  width: 92px;
                  height: 100%;
                  color: #5d5d5d;
                  padding-top: 20px;
                  text-align: center;
                  float: right;
                }
              }
            }
            .bottom{
              width: 100%;
              height: 83px;
              background: #fafafa;
              border-top: 1px solid #efefef;
              border-bottom: 1px solid #efefef;
              .leftIcon{
                width: 90px;
                height: 100%;
                float: left;
                padding-top: 20px;
                padding-left: 25px;
                i{
                  font-size: 32px;
                  color: #cccccc;
                }
              }
              .HeadPortrait{
                width: 620px;
                height: 78px;
                float: left;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                img{
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  margin-left: 10px;
                  margin-top: 9px;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
  }
</style>
