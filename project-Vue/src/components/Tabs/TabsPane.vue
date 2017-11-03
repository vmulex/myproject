<template>
  <div class="tabs-pane" v-show="show">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'TabsPane',
    props: {
      name: {
        type: String
      },
      currentTab: {
        type: String
      }
    },
    data: function () {
      return {
      }
    },
    computed: {
      show () {
        return this.name === this.currentTab
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  div.tabs-pane {
    display: inline-block;
  }
</style>
