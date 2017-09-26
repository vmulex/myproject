<template>
  <div id="home">
    <div class="short-cut">
      <short-cut></short-cut>
    </div>
    <div class="flow-chart">
      <flow-chart></flow-chart>
    </div>
  </div>
</template>

<script>
  import ShortCut from './ShortCut.vue'
  import FlowChart from './FlowChart.vue'

  export default {
    name: 'Home',
    components: {
      ShortCut,
      FlowChart
    }
  }
</script>

<style lang="less">
  #home {
    width: 100%;
    height: 100%;

  }
  .short-cut {
    position: relative;
    width: 100%;
    height: 10%;
    z-index: 96;
  }
  .flow-chart {
    position: relative;
    width: 100%;
    height: 90%;
    z-index: 95;
  }
</style>
