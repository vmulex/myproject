<template>
  <div id="Agents">
    <header>
      <h2>{{ currentView }}</h2>
      <ul class="tablist">
        <li @click.stop="switchTab('All')" :class="{active: All}">All</li>
        <li @click.stop="switchTab('Physical')" :class="{active: Physical}">Physical</li>
        <li @click.stop="switchTab('Virtual')" :class="{active: Virtual}">Virtual</li>
      </ul>
    </header>
    <div class="wrapper">
      <component :is="currentView"></component>
    </div>
  </div>
</template>
<script>
  import All from './All.vue'
  import Physical from './Physical.vue'
  import Virtual from './Virtual.vue'
  export default {
    name: 'Agents',
    components: {
      All: All,
      Physical: Physical,
      Virtual: Virtual
    },
    data: function () {
      return {
        currentView: 'Physical',
        All: false,
        Physical: true,
        Virtual: false
      }
    },
    methods: {
      switchTab: function (val) {
        this.currentView = val
        this.All = false
        this.Physical = false
        this.Virtual = false
        this[val] = true
      }
    }
  }
</script>
<style scoped lang="less">
  #Agents {
    width: 100%;
    height: 100%;
    /*overflow: auto;*/
  }
  header {
    width: 100%;
    overflow: auto;
    background-color: #606060;
    h2 {
      float: left;
      width: 5em;
      height: 1em;
      line-height: 1em;
      margin: 10px 5px;
      color: #bbc7d2;
    }
    .tablist {
      float: left;
      li {
        float: left;
        width: 5em;
        height: 1em;
        line-height: 1em;
        padding: 5px 5px;
        margin: 10px 5px;
        border: 1px solid black;
        border-radius: 15px;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
        background-color: #999999;
      }
      li.active {
        background-color: #dddddd
      }
    }
  }
  .wrapper {
    box-sizing: border-box;
    width: 100%;
    height: auto;
  }

</style>
