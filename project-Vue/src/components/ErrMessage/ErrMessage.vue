<template>
  <div class="err-message">
    <label>{{message}}</label>
  </div>
</template>
<script>
  export default {
    name: 'PopHeader',
    props: {
      message: {
        type: String
      }
    }
  }
</script>
<style lang="less" scoped>
  .message {
    display: inline-block;
    color: red;
  }
</style>

