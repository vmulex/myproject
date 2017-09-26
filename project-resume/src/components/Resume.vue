<template>
  <div id="resume">
    <header>
      <h1>Cruise</h1>
      <ul class="tablist">
        <li @click.stop="switchTab('DashBoard')" :class="{active: DashBoard}">DashBoard</li>
        <li @click.stop="switchTab('MyCruise')" :class="{active: MyCruise}">MyCruise</li>
        <li @click.stop="switchTab('Agents')" :class="{active: Agents}">Agents</li>
        <li @click.stop="switchTab('Help')" :class="{active: Help}">Help</li>
      </ul>
    </header>
    <div class="wrapper">
      <component :is="currentView"></component>
    </div>
    <div style="clear: both"></div>
  </div>
</template>
<style lang="less" scoped>
  #resume {
    width: 100%;
    height: auto;
  }
  header {
    position: relative;
    z-index: 100;
    width: 100%;
    margin-top: 2em;
    h1 {
      float: left;
    }
    .tablist {
      float: right;
      height: 100%;
      li {
        float: left;
        position: relative;
        z-index: 9999;
        top: 3px;
        height: 20px;
        padding: 5px 10px;
        margin: 0 3px;
        border-right: 1px solid black;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        text-align: center;
        cursor: pointer;
        font-weight: bolder;
        background-color: #ffffff;
      }
      li.active {
        background-color: #606060;
        color: #ffffff;
        border-bottom: 3px solid #606060;
      }
    }
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border: 3px solid black;
    box-sizing: border-box;
    overflow: auto;
    z-index: 99;
  }

</style>
<script>
  import DashBoard from './DashBoard'
  import MyCruise from './MyCruise'
  import Agents from './Agents'
  import Help from './Help'
  export default {
    name: 'Resume',
    data: function () {
      return {
        currentView: 'Agents',
        DashBoard: false,
        MyCruise: false,
        Agents: true,
        Help: false
      }
    },
    components: {
      DashBoard: DashBoard,
      MyCruise: MyCruise,
      Agents: Agents,
      Help: Help
    },
    methods: {
      switchTab: function (val) {
        this.currentView = val
        this.DashBoard = false
        this.MyCruise = false
        this.Agents = false
        this.Help = false
        this[val] = true
      }
    }
  }
</script>
