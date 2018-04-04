<template>
  <div class="page-index">
    默认路由页面  Index   
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'

export default {
  name: 'Index',
  data () {
    return {}
  },
  computed: {},
  mounted () {
    Indicator.open('集成mint-ui按需引入')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "./../styles/common"; //导入公用函数和全局变量

.page-index {
  @include font-dpr(40px);
  color: green;
}
</style>
