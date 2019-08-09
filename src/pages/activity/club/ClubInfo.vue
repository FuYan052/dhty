<template>
  <div class="clubInfo">
    <div class="top">
      <img src="../../../assets/123.jpg" alt="">
      <p>千羽千寻羽毛球俱乐部</p>
    </div>
    <!-- <div class="member">
      <img v-for="(item,index) in 10" :key="index" src="../../assets/touxiang.jpg" alt="">
      <span class="el-icon-arrow-right"></span>
    </div> -->
    <div class="join">
      <div class="joinBtn">申请加入俱乐部</div>
    </div>
    <!-- 活动时刻表 -->
    <div class="activList">
      <div class="title">活动时刻表</div>
      <div class="title2">
        <span>星期</span>
        <span>活动时段</span>
        <span>场馆</span>
      </div>
      <ul>
        <li>
          <div class="week">周一</div>
          <div class="actItem">14:00-16:00<span>星空体育馆</span></div>
          <div class="actItem">14:00-16:00<span>星空体育馆</span></div>
        </li>
        <li>
          <div class="week">周一</div>
          <div class="actItem">14:00-16:00<span>星空体育馆</span></div>
        </li>
      </ul>
    </div>
    <!-- 俱乐部简介 -->
    <div class="introd">
      <div class="title">俱乐部简介</div>
      <p>羽毛球是一项室内、室外都可以进行的体育运动。依据参与的人数，可以分为单打与双打，羽毛球是一项室内、室外都可以进行的体育运动。依据参与的人数，可以分为单打与双打，及新兴的3打3。羽毛球拍由：拍面、拍杆、拍柄及拍框与拍杆的接头构成。一支球拍的长度不超过680毫米，其中球拍柄与球拍杆长度不超过41厘米，拍框长度为28厘米，宽为23厘米，随着科学技术的发展</p>
      <!-- <img src="../../assets/code.png" alt=""> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClubInfo'
}
</script>

<style lang="scss" scoped>
  .clubInfo{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .top{
      width: 100%;
      height: 250px;
      background: #546b8d;
      border-bottom: 3px solid #06a182;
      overflow: hidden;
      img{
        width: 115px;
        height: 115px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 32px;
      }
      p{
        color: #fff;
        font-size: 32px;
        margin-top: 32px;
        text-align: center;
      }
    }
    .member{
      width: 100%;
      height: 143px;
      background: #fff;
      margin-top: 10px;
      padding-left: 35px;
      padding-right: 65px;
      overflow: hidden;
      position: relative;
      border-bottom: 1px solid #f4f4f4;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
        margin: 40px 10px;
      }
      span{
        display: block;
        font-size: 28px;
        color: #b8b8b8;
        font-weight: bold;
        position: absolute;
        right: 25px;
        top: 58px;
      }
    }
    .member::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 46px;
    }
    .join{
      width: 100%;
      height: 160px;
      background: #fff;
      padding: 0 20px;
      padding-top: 35px;
      .joinBtn{
        width: 100%;
        height: 75px;
        background: #ff8d30;
        color: #fff;
        line-height: 75px;
        text-align: center;
        border-radius: 10px;
      }
    }
    .activList{
      width: 100%;
      height: auto;
      background: #fff;
      margin-top: 28px;
      padding: 0 20px;
      position: relative;
      .title{
        width: 100%;
        height: 85px;
        line-height: 110px;
        font-size: 28px;
        color: #767676;
        padding-left: 15px;
      }
      .title2{
        width: 100%;
        height: 50px;
        background: #f8f8f8;
        color: #272727;
        margin-top: 10px;
        padding-top: 5px;
        span{
          display: inline-block;
          text-align: center;
          height: 40px;
          line-height: 40px;
          font-size: 22px;
        }
        span:nth-child(1){
          width: 135px;
        }
        span:nth-child(2){
          width: 200px;
          border-left: 1px solid #ececec;
          border-right: 1px solid #ececec;
        }
        span:nth-child(3){
          width: 330px;
        }
      }
      ul{
        width: 100%;
        height: auto;
        padding-bottom: 35px;
        li{
          width: 100%;
          min-height: 100px;
          border-top: 1px solid #f2f2f2;
          .week{
            width: 68px;
            height: 40px;
            line-height: 36px;
            text-align: center;
            font-size: 21px;
            color: #54a596;
            border: 1px solid #a3c7bd;
            border-radius: 10px;
            float: left;
            margin-top: 27px;
            margin-left: 30px;
          }
          .actItem{
            width: 580px;
            height: 99px;
            line-height: 99px;
            margin-left: 130px;
            border-top: 1px dashed #e7e7e7;
            font-size: 22px;
            padding-left: 60px;
            span{
              display: inline-block;
              margin-left: 160px;
            }
          }
          .actItem:nth-of-type(2){
            border-top: none;
          }
        }
      }
    }
    .activList::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 30px;
    }
    .introd{
      width: 100%;
      min-height: 370px;
      background: #fff;
      margin-top: 20px;
      position: relative;
      padding: 0 20px;
      padding-bottom: 40px;
      .title{
        width: 100%;
        height: 60px;
        line-height: 110px;
        font-size: 28px;
        color: #767676;
        padding-left: 15px;
      }
      p{
        line-height: 42px;
        margin-top: 30px;
      }
      img{
        width: 150px;
        height: 150px;
        margin-top: 25px;
      }
    }
    .introd::before{
      content: "";
      display: block;
      width: 10px;
      height: 50px;
      background: #fac31e;
      position: absolute;
      left: 0;
      top: 30px;
    }
  }
</style>
