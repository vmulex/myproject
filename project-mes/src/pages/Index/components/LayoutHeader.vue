<template>
  <div class="layout-header">
    <div class="logo">
      <img src="../../../assets/ZTEE.png" height="100%">
    </div>
    <div class="header-content">
      <header-info></header-info>
    </div>
    </el-row>
  </div>
</template>

<script>
  import HeaderInfo from './HeaderInfo.vue'

  export default {
    name: 'LayoutHeader',
    components: {
      HeaderInfo
    }
  }
</script>

<style lang="less" scoped>
  .layout-header {
    position: relative;
    height: 8%;
    border-bottom: 5px solid #148fce;
    z-index: 999;
  }
  .logo {
    float: left;
    height: 100%;
    padding-left: 3em;
  }
  .header-content {
    float: right;
    height: 100%;
    margin-right: 3em;
  }
</style>
