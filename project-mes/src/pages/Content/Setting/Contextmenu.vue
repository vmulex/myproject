<template>
  <ul class="context-menu" :style="{left:left+'px', top:top+'px'}">
    <span class="close" @click="hideContextMenu"><i class="fa fa-close"></i></span>
    <li @click="addSibling">增加本级菜单项</li>
    <li @click="addChild">增加子菜单项</li>
  </ul>
</template>
<style>
  ul.context-menu {
    position: absolute;
    left: 0;
    background-color: #108ee9;
    border: 1px solid #d1dbe5;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12), 0px 0px 6px 0px rgba(0,0,0,0.04);
  }
  ul.context-menu li {
    padding-bottom: 5px;
    color: #fff;
    margin-bottom: 3px;
    padding: 5px 15px;
  }
  ul.context-menu li:hover{
    background-color: #97a8be;
    cursor: pointer;
  }
  .close {
    cursor: pointer;
  }
  .close:hover {
    background-color: #fff;
  }
</style>
<script>
  export default {
    name: 'Contextmenu',
    props: ['emit', 'type'],
    data: function () {
      return {
      }
    },
    computed: {
      left () {
        return this.$store.state.contextMenuInfo.posX
      },
      top () {
        return this.$store.state.contextMenuInfo.posY - 20
      }
    },
    methods: {
      hideContextMenu: function () {
        this.$store.dispatch('hideContextMenu')
      },
      addSibling: function () {
        if (this.emit) {
          this.$store.dispatch('addSiblingMenu', this.type)
        } else {
          // this.$store.dispatch('addSiblingStructure')
        }
        this.$store.dispatch('hideContextMenu')
      },
      addChild: function () {
        if (this.emit) {
          this.$store.dispatch('addChildMenu', this.type)
        } else {
          // this.$store.dispatch('addChildStructure')
        }
        this.$store.dispatch('hideContextMenu')
      }
      // removeThis: function () {
      //   this.$store.dispatch('removeThisMenu')
      //   this.$store.dispatch('hideContextMenu')
      // }
    }
  }
</script>
