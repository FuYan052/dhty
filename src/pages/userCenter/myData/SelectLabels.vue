<template>
  <div class="selectLabels" v-title data-title="个性标签">

  </div>
</template>

<script>
export default {
  name: 'SelectLabels',
  data() {
    return {
      labelList: []
    }
  },
  created() {
    this.labelList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const newList = []
    // for (var i=0;i<this.labelList.length;i+4) {
    //   newList.push(this.labelList.slice(i,i+4))

    // }
    console.log(newList)
  }
}
</script>

<style lang="scss" scoped>
  .selectLabels{
    width: 100%;
    min-height: 100vh;

  }
</style>

