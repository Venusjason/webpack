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
html,body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  max-width: 980px;
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
