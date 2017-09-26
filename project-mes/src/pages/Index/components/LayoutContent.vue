<template>
  <div class="layout-content">
    <div class="layout-menu" :class="{'layout-menu-open':menuClo}" ref="menu"><main-menu @open="openAndClo"></main-menu></div><div class="layout-page" :class="{'layout-page-open':pageClo}" ref="page"><tabs-page></tabs-page></div>
  </div>
</template>

<script>
  import MainMenu from './MainMenu.vue'
  import tabsPage from '../../Content/Index.vue'
  export default {
    name: 'LayoutContent',
    components: {
      MainMenu,
      tabsPage
    },
    data () {
      return {
        menuClo: false,
        pageClo: false
      }
    },
    methods: {
      openAndClo: function (value) {
        this.menuClo = value
        this.pageClo = value
      }
    }
  }
</script>

<style lang="css">
  .layout-content {
    position: relative;
    height: 84%;
    overflow: hidden;
  }
  .layout-menu {
    display: inline-block;
    width: 11%;
    height: 100%;
    border-right: 5px solid #148fce;
    overflow: auto;
  }
  .layout-page {
    display: inline-block;
    width: calc(89% - 5px);
    height: 100%;
    vertical-align: top;
  }
  .layout-menu-open {
    width: 25px;
  }
  .layout-page-open {
    width: calc(100% - 30px);
  }
</style>
