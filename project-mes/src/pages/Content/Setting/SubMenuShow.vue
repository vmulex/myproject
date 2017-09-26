<template>
  <li class="menu-option">
    <span @click="toggle()" class="option">
      <span class="icon"><i v-if="isFolder" class="fa" :class="[open ? 'fa-angle-down': 'fa-angle-right']"></i></span>
      <span class="menu-title" @click="emit && showMenuInfo(data)" @contextmenu.stop="showContextMenu(data.resourceLevel, data.resourceSort, data.resourceCode, data.resourceId, data.parentResource, $event)">{{ data.resourceDescribe }}</span>
    </span>
    <ul v-show="open" v-if="isFolder" style="padding-left: 20px">
      <sub-menu-show v-for="item in data.child" :data="item" :key="item.id" :emit="emit"></sub-menu-show>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'SubMenuShow',
    created: function () {

    },
    props: ['data', 'emit'],
    data () {
      return {
        open: false
      }
    },
    computed: {
      isFolder () {
        return this.data.child && this.data.child.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
          this.startEdit = false
        }
      },
      showMenuInfo: function (data) {
        let menuInfo = data   // 这里的menuInfo要有该页面的所有button权限属性，然后在edit页面进行引用
        console.log(menuInfo)
        this.$store.dispatch('showMenuInfo', JSON.stringify(menuInfo))
      },
      showContextMenu: function (resourceLevel, resourceSort, resourceCode, resourceId, parentResource, event) {
        event.preventDefault()
        let posX = event.target.offsetLeft + event.target.offsetWidth
        let posY = event.target.offsetTop + event.target.offsetHeight
        let contextmenuInfo = {
          level: resourceLevel,
          sort: resourceSort,
          menuId: resourceCode,
          dbId: resourceId,
          parentId: parentResource,
          showContext: true,
          posX: posX,
          posY: posY
        }
        console.log(contextmenuInfo)
        this.$store.dispatch('showContextMenu', contextmenuInfo)
      }
    }
  }
</script>
<style scoped>
  .menu-option {
    width: 20em;
    font-size: 16px;
  }
  .option {
    display: inline-block;
    width: 90%;
    height: 100%;
    cursor: pointer;
  }
  .option:hover {
    background-color: #ecf6fd;
  }
  span.icon {
    display: inline-block;
    width: 15px;
    height: 100%;
    padding: 5px 0;
    cursor: pointer;
    vertical-align: top;
  }
  span.menu-title {
    display: inline-block;
    padding: 5px 0;
    margin-bottom: 5px;

  }
  span.menu-title:hover {

  }
</style>
