<template>
  <div id="app">
    {{#router}}
    <router-view class="page"/>
    {{/router}}
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './styles/common';
html {
  height: 100%;
  background-color: #f2f2f2;
}
body {
  max-width: $max-screen-width;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
}
#app {
  height: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  .page {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
