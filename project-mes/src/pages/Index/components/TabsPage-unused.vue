<template>
  <div class="tabs-page">
    <div class="tablist">
      <ul>
        <li v-for="(item, index) of tabList" @click="change(item.name)" menuID="index">
          <span>{{item.name}}</span>
          <label @click.stop="deleteOption(index)"><i class="fa fa-close"></i></label>
        </li>
      </ul>
    </div>
    <div class="tabs-content"><component :is="currentView"></component></div>
  </div>
</template>
<style>
  .tabs-page {
    width: 100%;
    height: 100%;
  }
  .tablist {
    width: 100%;
    height: 4%;
    background: red;
  }
  .tablist ul {
    width: 100%;
    height: 100%;
  }
  .tablist li {
    float: left;
    height: 100%;
    padding-left: 10px;
    vertical-align: bottom;
  }
  label:hover {
    cursor: pointer;
    background: grey;
  }
  .tabs-content {
    width: 100%;
    height: 96%;
    background: yellow;
  }
</style>
<script>
  import Administrator from '../../MES/Administrator.vue'
  import CEO from '../../MES/CEO.vue'
  import CFO from '../../MES/CFO.vue'
  export default {
    computed: {
      currentView () {
        return this.$store.state.currentView
      },
      tabList () {
        return this.$store.state.tabList
      }
    },
    methods: {
      change (val) {
        this.currentView = val
      },
      deleteOption (index) {
        this.$store.dispatch('delTab', index)
      }
    },
    components: {
      'Administrator': Administrator,
      'CEO': CEO,
      'CFO': CFO
    }
  }
</script>