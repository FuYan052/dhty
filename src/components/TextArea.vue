<template>
  <div class="textBox">
    <textarea 
      name="motto" 
      id="motto" 
      placeholder="请输入文本" 
      v-model="text"
      @keyup="inputText"
    ></textarea>
    <em>
    <span id="curLen">0</span>/<span id="maxLen">{{textLength}}</span>
    </em>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  
  data() {
    return {
      textLength: 2000,
      text: ''
    }
  },
  mounted() {
      var ty = document.getElementById("cty");
      var motto=document.getElementById("motto");
      var curLen=document.getElementById("curLen");
      var maxLen=document.getElementById("maxLen");
      motto.onkeyup= function () {
      this.value = this.value.substr(0,this.textLength);
      var len = this.value.length;
      curLen.firstChild.nodeValue = len;
      }; 
  },
  methods: {
    inputText() {
      this.$emit('childByValue', this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
  .textBox{
    width: 100%;
    height: 214px;
    position: relative;
    background: #fff;
    #motto{
      width: 100%;
      min-height: 172px;
      padding: 0 20px;
      border: none;
      font-size: 34px;
      line-height: 50px;
    }
    em{
      background: #fff;
      position: absolute;
      right: 30px;
      bottom: 10px;
      font-size: 28px;
      color: #797979;
    }
  }
</style>
