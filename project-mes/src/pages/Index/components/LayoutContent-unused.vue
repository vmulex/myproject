<template>
  <div class="layout-content" @mousemove="getMoveDis" @mouseup="endZoom">
    <div class="layout-menu" ref="menu"><mes-menu></mes-menu>
    </div><div class="liner" @mousedown="getMouseStartup" ref="liner"></div><div class="layout-page" ref="page">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import MesMenu from './MesMenu.vue'

  export default {
    name: 'LayoutContent',
    components: {
      MesMenu
    },
    data () {
      return {
        menuWidth: 0,
        pageWidth: 0,
        linerWidth: 0,
        mouseStartup: 0,
        mouseEnd: 0,
        moveDis: 0,
        trigger: false,
        posX: 0
      }
    },
    methods: {
      getMouseStartup (event) {
        this.mouseStartup = event.clientX
        this.menuWidth = this.$refs.menu.offsetWidth
        this.linerWidth = this.$refs.liner.offsetWidth
        this.pageWidth = this.$refs.page.offsetWidth
        this.trigger = true
      },
      getMoveDis (event) {
        if (this.trigger) {
          let menuWidth, pageWidth
          this.moveDis = event.clientX - this.mouseStartup
          menuWidth = this.menuWidth + this.moveDis
          pageWidth = this.pageWidth - this.moveDis
          this.$refs.menu.style.width = menuWidth + 'px'
          this.$refs.page.style.width = pageWidth + 'px'
        }
      },
      endZoom () {
        this.mouseEnd = event.clientX
        this.trigger = false
      }
    }
  }
</script>

<style lang="less"> 
  .layout-content {
    height: 84%;
    overflow: hidden;
  }
  .layout-menu {
    display: inline-block;
    width: 170px;
    height: 100%;
    overflow: auto;
  }
  .liner {
    display: inline-block;
    height: 100%;
    width: 5px;
    background: #148fce;
    cursor: e-resize;
  }
  .layout-page {
    display: inline-block;
    width: 1361px;
    height: 100%;
    vertical-align: top;
    overflow: auto;
  }

</style>
