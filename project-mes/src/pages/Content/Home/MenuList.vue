<template>
  <li class="home-menu-icon">
    <span @click="toggle" class="menu-word">
      <router-link v-if="!isFolder" :to="{path:data.path}" @click.native="addNewTab" :id="data.menuId" :class="{ 'not-child': noChild,'is-child': isChild }">{{ data.menuName }}</router-link>
      <span v-else style="padding-right: 1em;cursor: pointer">{{ data.menuName }}</span>
      <i v-if="data.children" class="fa" :class="[open ? 'fa-caret-down': 'fa-caret-right']" style="width: 10px"></i>
    </span>
    <ul v-if="data.children" v-show="open" class="children" :class="{'is-child': isChild}">
      <menu-list :data="item" v-for="(item, index) of data.children" :key="item.id" :isChild="true"></menu-list>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'MenuList',
    props: ['data', 'is-child'],
    data () {
      return {
        open: false,
        noChild: true
      }
    },
    computed: {
      isFolder: function () {
        return this.data.children && this.data.children.length
      }
    },
    methods: {
      toggle: function () {
        this.open = !this.open
      },
      addNewTab: function (e) {
        let urlArr = e.target.href.split('#')
        let path = urlArr[1]
        let newTab = {
          menuId: e.target.id,
          name: e.target.innerHTML,
          path: path
        }
        this.$store.dispatch('addNewTab', newTab)
      }
    }
  }
</script>

<style scoped lang="less">
  ul.children {
    position: absolute;
    top: 30px;
    left: -15px;
    width: 8em;
    margin-left: 10px;
    padding: 5px 0;
    background-color: #ffffff;
    border: 1px solid #d1dbe5;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12), 0px 0px 6px 0px rgba(0,0,0,0.04);
    font-size: 16px;
    z-index: 100;
  }
  li.home-menu-icon {
    position: relative;
    margin-top: 7px;
    margin-bottom: 7px;
    padding: 0 10px
  }
  ul.children>li.home-menu-icon {
    color: #48576a
  }
  ul.children>li.home-menu-icon:hover {
    background-color: #d1dbe5;
  }

  .not-child {
    color: #bfcbd9
  }
  .is-child {
    color: #48576a
  }
  ul.is-child {
    top:0;
    left: 110px;
  }

</style>
