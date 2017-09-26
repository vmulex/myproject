<template>
  <div class="menu-show-tree" @click="hideContextmenu">
    <ul v-for="menuItem in data">  <!-- menuItem为下面myData中第一级数组循环的元素，即一级菜单 -->
      <sub-menu-show :data="menuItem" :emit="bind"></sub-menu-show>
    </ul>
    <contextmenu v-show="contextmenuShow" :emit="bind"></contextmenu>
  </div>
</template>
<style>
  div.menu-show-tree {
    position: relative;
    margin-left: 4em;
    margin-top: 2em;
  }
</style>
<script>
  import SubMenuShow from './SubMenuShow.vue'
  import Contextmenu from './Contextmenu.vue'
  export default {
    name: 'MenuShow',
    props: ['data', 'type'],
    data: function () {
      return {
        open: true
      }
    },
    computed: {
      contextmenuShow () {
        return this.$store.state.contextMenuInfo.showContext
      },
      bind () {
        if (this.type === 'menu') {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      SubMenuShow,
      Contextmenu
    },
    methods: {
      hideContextmenu: function () {
      }
    }
  }
</script>
