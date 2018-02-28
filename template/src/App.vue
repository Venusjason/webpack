<template>
  <div id="app">
    <div id="phone-model">
      <!-- 手机模型 -->
      <span class="phone-btn phone-btn-1"></span>
      <span class="phone-btn phone-btn-2"></span>
      <span class="phone-btn phone-btn-3"></span>
    </div>
    {{#router}}
    <router-view/>
    {{/router}}
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "./styles/common";
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
body {
  @include full-img-bg("./assets/pcbg.jpg");
}
#app {
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
  height: 100%;
  width: px2rem(640px); //此处以640设计稿
  position: relative;
}
@media screen and (min-width: 768px) {
  // pc端设备 ipad等平板
  #phone-model {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -40px;
    right: -40px;
    border: 2px solid #fff;
    border-top: 0;
    border-bottom: 0;
    span.phone-btn {
      position: absolute;
      height: px2rem(80px);;
      width: 16px;
      border: 2px solid #fff;
      border-right: 0;
      left: -18px;
      border-radius: 20px;
      &.phone-btn-1 {
        top: px2rem(20px);
      }
      &.phone-btn-2 {
        top: px2rem(160px);
      }
      &.phone-btn-3 {
        top: px2rem(280px);
      }
    }
  }
}
@media screen and (max-width: 767px) {
  //移动端设备
  #phone-model {
    display: none;
  }
}
</style>
