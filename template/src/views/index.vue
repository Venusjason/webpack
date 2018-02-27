<template>
  <div class="page page-index">
    默认路由页面  Index   
    <div class="selector">
      默认按照640设计稿(iphone 5 尺寸)
    </div>
    <div class="selector2">
      你好
    </div>
    <div class="selector3">
      你好
    </div>
    <div class="container">
      <span v-for="n in 10" :key="n">
        {{n}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "./../styles/common"; //导入公用函数和全局变量

.page-index {
  color: green;
  div {
    margin-bottom: 20px;
  }
  .selector {
    //width: px2rem(150px);
    //height: 64px;
    @include font-dpr(28px);
    border: 1px solid #ddd;
  }
  .selector2 {
    width: 150px;
    height: 64px;
    font-size: 28px;
    border: 1px solid #ddd;
    background-color: red;
  }
  .selector3 {
    width: px2rem(150px);
    height: 64px;
    font-size: 28px;
    border: 1px solid #ddd;
    background-color: red;
  }
  .container {
    span {
      display: inline-block;
      width: px2rem(64px);
      margin: 0;
      padding: 0;
    }
  }
}
</style>