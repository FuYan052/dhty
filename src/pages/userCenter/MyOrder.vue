<template>
  <div class="ulDiv" >
                <ul class="projectUl"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="isMoreLoading"
                    :infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10">
                    <li class="projectLi" v-for="(v,i) in list" :key="i" @click="toProjectDetail">
                        <div class="liDes">
                            <p class="title">{{v.contract_name}}</p>
                            <p class="titleDes">描述信息</p>
                        </div>
                        <i class="icon iconfont icon-jiantou"></i>
                    </li>
                </ul>
                <!--显示加载中转菊花-->
                <div class="loading-box tc" v-if="isLoading">
                    <mt-spinner type="snake" class="loading-more"></mt-spinner>
                    <span class="loading-more-txt">加载中...</span>
                </div>
 
                <div class="no-more" v-if="noMore">没有更多了~</div>
            </div>

</template>

<script>
export default {
  name: MyOrder,
  data() {
    return {
      list: [],
        isLoading: false, // 加载中转菊花
        isMoreLoading: true, // 加载更多中
        noMore: false, // 是否还有更多
        pageInfo: { // 分页信息
            page: 1,
            page_size: 15,
            total: 0, // 总条数
            totalPage: 1 // 总分页数
        }
    }
  },
  mounted () {
        this.getProjectInfo()
    },
    methods: {
      
    }
}
</script>

<style lang="scss" scoped>

</style>