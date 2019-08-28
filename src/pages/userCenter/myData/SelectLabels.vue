<template>
  <div class="selectLabels" v-title data-title="个性标签">
    <ul>
      <li v-for="(item,index) in resultList2" :key="index">
        <span 
          v-for="(it,ind) in item" 
          :key="ind" @click="selected(it,ind)"
          :class="{selected:selectedListIds.indexOf(it.id)>=0}"
        >{{it.name}}</span>
      </li>
    </ul>
    <div class="btnBox">
      <div class="btn createNew" @click="showAddBox">创建新标签</div>
      <div class="btn save" @click="saveSelectLabels">保存</div>
    </div>
    <div class="addLabel" v-show="isShow">
      <input type="text" v-model="addValue" ref="input" placeholder="请输入标签">
      <span @click="toAdd">添加</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectLabels',
  data() {
    return {
      labelList: [],  //请求回来的一维数组
      resultList1: [], 
      resultList2: [], //变成二维数组渲染,用于渲染
      selectedList: [],
      selectedListIds: [],
      isShow: false,
      addValue: ''
    }
  },
  computed: {
    // 用户id
    ...mapState(['userId']),
  },
  created() {
    // 从完善信息页传过来的标签集合
    
    var _Ids =JSON.parse(window.sessionStorage.getItem('labels'))
    this.selectedList = _Ids
    for(let i=0; i<_Ids.length; i++) {
      let currLab = _Ids[i]
      this.selectedListIds.push(currLab.id)
    }

    this.getAllList()
  },
  methods: {
    // 获取所有标签
    getAllList() {
      this.labelList = []
      this.resultList1 = []
      this.resultList2 = []
      // this.$http.findAllLabel(this.userId).then(resp => {
      this.$http.findAllLabel('250').then(resp => {
        console.log(resp)
        if(resp.status == 200) {
          this.labelList = resp.data
          this.sliceArr1()
          this.sliceArr2()
        }
      })
    },
    sliceArr1() {
      let n = 7
      let len = this.labelList.length
      let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      let result = []
      for (let i = 0; i < lineNum; i++) {
        let newList = this.labelList.slice(i*n ,i*n+n)
        result.push(newList)
        this.resultList1 = result
      }
    },
    sliceArr2 () {
      for(let i = 0; i < this.resultList1.length; i++) {
        let n = 4
        let len = this.resultList1[i].length
        let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
        let result2 = []
        for (let j = 0; j < lineNum; j++) {
          let newList = this.resultList1[i].slice(j*n ,j*n+n)
          result2.push(newList)
        }
        this.resultList2.push(result2)
      }
      this.resultList2 = this.resultList2.reduce(function (a, b) { return a.concat(b)} )
      // console.log(this.resultList2)
    },
    //选择标签
    selected(it,ind) {
      // 选中的标签集合
      // let selectedIndex = this.selectedList.indexOf(it)
      // if(selectedIndex >= 0) {
      //   this.selectedList.splice(selectedIndex, 1)
      // }else{
      //   this.selectedList.push(it)
      // }

      // 选中的标签id集合
      let selectedIdIndex = this.selectedListIds.indexOf(it.id)
      if(selectedIdIndex >= 0) {
        this.selectedListIds.splice(selectedIdIndex, 1)
      }else{
        this.selectedListIds.push(it.id)
      }
      // console.log(this.selectedListIds)
    },
    //创建新标签
    showAddBox() {
      this.isShow = true
      this.$refs.input.focus()
    },
    toAdd() {
      // 创建并提交后台
      const params = {
        labelName: this.addValue,
        userId: '250'
        // userId: this.userId
      }
      this.$http.createLabel(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
        this.isShow = false
        this.$toast("创建成功")
        }
        if(!this.isShow) {  //创建标签成功之后获取新的标签列表
          this.getAllList()
        }
      })
      // this.selectedList = []
    },
    //保存
    saveSelectLabels() {
      this.$router.push({
        path: '/userCenter/myData/completeInfo',
      })
      // var _labelIds = []
      // for(let i=0; i<this.selectedList.length; i++) {
      //   let currLab = JSON.parse(JSON.stringify(this.selectedList[i]))
      //   _labelIds.push(currLab.id)
      // }
      const labelIds = this.selectedListIds.join(',')  //用逗号隔开连成字符串传给后端
      window.sessionStorage.setItem('labelIds',labelIds)
      // window.sessionStorage.setItem('labels',JSON.stringify(this.selectedList))
      const params = {
        id: window.sessionStorage.getItem('infoId'),
        labelId: labelIds
      }
      console.log(params)
      this.$http.completeInfo(params).then(resp => {
        // console.log(resp)
        if(resp.status == 200) {
          // window.sessionStorage.removeItem('address')
          // window.sessionStorage.removeItem('birthday')
          // window.sessionStorage.removeItem('height')
          // window.sessionStorage.removeItem('imgUrl')
          window.sessionStorage.removeItem('labelIds')
          // window.sessionStorage.removeItem('labels')
          // window.sessionStorage.removeItem('nickName')
          // window.sessionStorage.removeItem('profession')
          // window.sessionStorage.removeItem('sex')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectLabels{
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    ul{
      width: 100%;
      height: auto;
      padding-left: 38px;
      margin-top: 40px;
      li{
        width: 100%;
        height: 80px;
        span{
          display: inline-block;
          width: 160px;
          height: 48px;
          line-height: 46px;
          text-align: center;
          font-size: 21px;
          border-radius: 20px;
          color: #272727;
          border: 1px solid #313131;
          margin-right: 12px;
        }
        .selected{
          background: #fffaec;
          border: 1px solid #fac41c;
          color: #f9c31b;
        }
      }
      li:nth-child(even){
        padding-left: 60px;
        span{
          margin-right: 37px;
        }
      }
    }
    .btnBox{
      width: 100%;
      height: 170px;
      padding-left: 38px;
      .btn{
        width: 325px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 25px;
        border-radius: 10px;
        float: left;
        margin-top: 50px;
      }
      .createNew{
        color: #272727;
        border: 1px solid #313131;
      }
      .save{
        color: #fff;
        background: #fac31e;
        margin-left: 25px;
      }
    }
    .addLabel{
      width: 100%;
      height: 100px;
      background: #fff;
      padding: 0 38px;
      position: fixed;
      bottom: 0;
      z-index: 9;
      position: relative;
      input{
        width: 100%;
        height: 70px;
        border: 1px solid #313131;
        border-radius: 40px;
        padding-left: 25px;
        font-size: 21px;
      }
      span{
        width: 90px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        color: #fff;
        background: #fac31e;
        display: block;
        font-size: 25px;
        border-radius: 25px;
        position: absolute;
        top: 7px;
        right: 50px;
      }
    }
  }
</style>

