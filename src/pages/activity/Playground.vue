<template>
  <!-- 活动场地 -->
  <div class="playground">
    <!-- 头部菜单栏 -->
    <div class="cateNav">
      <div class="content">
        <div 
          class="cateItem"
          v-for="(item,index) in cateList" 
          :key="index"
          @click="changeCate(item,index)"
          :class="{activeCate : currIndex === index}"
          >{{item}}</div>
      </div>
    </div>
    <div class="contentWrap">
      <div class="groundItem" v-for="(item,index) in 3" :key="index">
         <div class="g_top">
           <div class="g_top_left">
             <!-- 07月29日&nbsp;&nbsp; -->
             19:00——20:00
           </div>
           <div class="g_top_right">
             <span class="el-icon-coin"></span>25元/小时
           </div>
         </div>
         <div class="g_detail">
           <p class="g_name">
             成都千羽千寻羽毛球俱乐部<span>16.46km</span>
           </p>
           <img class="g_img" src="../../assets/g-img.png" alt="">
           <div class="g_bottom g_admin">
             <img src="../../assets/touxiang.jpg" alt="">
             <p>大虎管理员<span>杨洋然</span></p>
             <div class="icon"><a href="tel://15096762111"><span class="el-icon-phone"></span></a></div>
           </div>
           <div class="g_bottom g_address">
             <img src="../../assets/g-img.png" alt="">
             <p>成都市武侯区益州大道555号</p>
             <div class="icon" @click="toMap"><span class="el-icon-location"></span></div>
           </div>
         </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Playground',
  data() {
    return {
      cateList: ['羽毛球', '跑步'],
      currIndex: 0,
      address: '',
      zoom: 3,
    }
  },
  methods: {
    changeCate(item,index) {
      this.currIndex = index
    },
    toMap() {
      const location = {
        lat: 30.558120,
        lng: 104.057150
      }
      this.$router.push({
        path: '/mapPage',
        name: 'MapPage',
        params: location
      })
      window.sessionStorage.setItem('location',JSON.stringify(location))
    }
  }
}
</script>

<style lang="scss" scoped>  
  .playground{
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
    .cateNav{
      width: 100%;
      height: 94px;
      background: #fac31e;
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
          color: #000;
          border-bottom: 3px solid #000;
        }
      }
    }
    .contentWrap{
      width: 100%;
      padding: 0 20px;
      .groundItem{
        width: 100%;
        min-height: 572px;
        background: #fff;
        margin-top: 30px;
        .g_top{
          width: 100%;
          height: 80px;
          border-bottom: 1px solid #f4f4f4;
          div{
            width: 220px;
            height: 100%;
            float: left;
            line-height: 78px;
            padding-left: 25px;
            font-size: 22px;
          }
          .g_top_left{
            color: #6989a6;
            position: relative;
          }
          .g_top_left::after{
            display: inline-block;
            content: '';
            width: 4px;
            height: 34px;
            border-right: 1px solid #cfcfcf;
            position: absolute;
            right: 0;
            top: 25px;
          }
          .g_top_right{
            color: #5d5d5d;
            span{
              color: #2f9f87;
              font-weight: bold;
              padding-right: 15px;
            }
          }
        }
        .g_detail{
          width: 100%;
          padding: 0 20px;
          .g_name{
            font-size: 30px;
            color: #161616;
            margin: 25px 0;
            span{
              color: #989898;
              float: right;
              font-weight: normal;
            }
          }
          .g_img{
            width: 100%;
            height: 255px;
          }
          .g_bottom{
            width: 100%;
            height: 73px;
            padding-left: 10px;
            padding-right: 3px;
            img{
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 12px;
            }
            p{
              font-size: 23px;
              line-height: 73px;
              float: left;
              margin-left: 25px;
              color: #2b2b2b;
            }
            .icon{
              width: 25px;
              height: 30px;
              float: right;
              font-size: 30px;
              color: #fac51d;
              margin-top: 13px;
              margin-right: 10px;
            }
          }
          .g_admin{
            border-bottom: 1px solid #f3f3f3;
            img{
              border-radius: 50%;
            }
            .icon{
              a{
                color: #fac51d;
              }
            }
          }
          .g_address{
            img{
              border-radius: 25%;
            }
          }
          .mapBox{
            width: 100%;
            height: 500px;
            border: 1px solid red;
            margin: 10px 0;
            .bm-view{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    
  }
</style>
