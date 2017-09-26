<template>
  <div class="tabs-page">
    <div class="tablist">
      <ul>
        <li v-for="(item, index) of tabList" :class="{active:item.menuId == currentMenuId}" @click.stop="switchTab(item.menuId)">
          <router-link :to="{path:item.path}" class="tab">{{item.name}}</router-link>
          <label @click.stop="deleteTab(index)"><i class="fa fa-close" v-if="index"></i></label>
        </li>
      </ul>
    </div>
    <div class="tabs-content"><keep-alive><router-view></router-view></keep-alive></div>
  </div>
</template>
<style scoped lang="less">
  .tabs-page {
    width: 100%;
    height: 100%;
  }
  .tablist {
    width: 100%;
    height: 4%;
    padding-top: 5px;
    ul {
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #97a8be;
      li {
        float: left;
        height: calc(~"100% - 1px");
        margin-left: 5px;
        border-top: 1px solid #97a8be;
        border-right: 1px solid #97a8be;
        border-left: 1px solid #97a8be;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background: #E5E9F2;
        .tab {
          display: inline-block;
          height: 100%;
          padding-left: 10px;
          padding-right: 2px;
        }
        label {
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }
        i:hover {
          cursor: pointer;
          background: #fff;
        }
      }
      li.active {
        background: #ffffff;
        border-bottom: 1px solid #ffffff;
      }
   }
  }
  .tabs-content {
    width: 100%;
    height: calc(~"96% - 5px");
    overflow: auto;
  }
</style>
<script>
  export default {
    computed: {
      tabList () {
        return this.$store.state.tabList
      },
      currentMenuId () {
        return this.$store.state.currentView
      }
    },
    methods: {
      deleteTab (index) {
        this.$store.dispatch('delTab', index)
        let tabList = this.$store.state.tabList
        this.$store.state.currentView = tabList[tabList.length - 1].menuId
        this.$router.push(tabList[tabList.length - 1].path)
      },
      switchTab (menuId) {
        this.$store.dispatch('switchTab', menuId)
      }
    }
  }
</script>
