<template>
  <div id="layout-footer">
    <div class="footer-content">Copyright 2015  中兴高能技术有限责任公司 版权所有</div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutFooter'
  }
</script>

<style lang="less" scoped>
  #layout-footer {
    position: relative;
    height: 8%;
    background: #148fce;
  }
  .footer-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>