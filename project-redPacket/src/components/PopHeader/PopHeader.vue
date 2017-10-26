<template>
  <div class="pop-header">
    <label>{{title}}</label>
    <span style="float: right"><i class="fa fa-close fa-lg" @click.stop="onClose();"></i></span>
  </div>
</template>
<script>
  export default {
    name: 'PopHeader',
    props: {
      title: {
        type: String
      },
      onClose: {
        type: Function,
        default () {
          return {}
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .pop-header {
    height: 3em;
    margin-bottom: 1em;
    border-bottom: 1px solid #ccc;
    cursor: move;
    label {
      line-height: 3em;
      margin-left: 1em;
    }
    span {
      line-height: 3em;
      margin-right: 1em;
      .fa-close {
        color: #8b8b8b;
        cursor: pointer;
      }
    }
  }
</style>

