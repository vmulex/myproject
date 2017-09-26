<template>
  <div @drop="drop_handler" @dragover="allowdrag" class="short-cut-div">
    <ul v-for="(item, index) of homeMenu" class="menu-icon">
      <menu-list :data="item"></menu-list>
    </ul>
  </div>
</template>
<script>
  import MenuList from './MenuList.vue'
  export default {
    name: 'ShortCut',
    computed: {
      homeMenu: function () {
        return this.$store.state.homeMenu
      }
    },
    methods: {
      drop_handler: function (ev) {
        var data = ev.dataTransfer.getData('text')
        this.$store.dispatch('addHomeMenu', JSON.parse(data))
      },
      allowdrag: function (ev) {
        // 这个是必须要有的
        ev.preventDefault()
      }
    },
    components: {
      MenuList
    }
  }
</script>

<style>
  .short-cut-div {
    position: absolute;
    width:100%;
    height:80%;
    margin-top: 10px;
    background: #324157;
  }
  ul.menu-icon {
    float: left;
    position: relative;
    margin-left: 2em;
    margin-top: 1em;
    font-size: 18px;
    font-weight: 500;
    color: #bfcbd9;
  }
</style>
