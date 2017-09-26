<template>
  <li class="menu-option">
    <span @click="toggle()" class="option">
      <span class="icon"><i v-if="isFolder" class="fa" :class="[open ? 'fa-angle-down': 'fa-angle-right']"></i></span>
      <span class="menu-title" @click="showMenuInfo(data.organId, data.organName, data)" @contextmenu.stop="showContextMenu(data.organLevel, data.organSort, data.organCode, data.organId, data.parentOrgan, $event)">{{ data.organName }}</span>
    </span>
    <ul v-show="open" v-if="isFolder" style="padding-left: 20px">
      <sub-menu-show v-for="item in data.child" :data="item" :key="item.id" type="organName"></sub-menu-show>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'SubMenuShow',
    created: function () {

    },
    props: ['data', 'emit', 'type'],
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
//          this.startEdit = false
        }
      },
      showMenuInfo: function (organId, organName, organSelectedData) {
//        let OrganSelectedData = {
//          organId: organId,
//          organName: organName,
//          organLevel:
//          organSort:
//          parentOrgan:
//        }
        this.$store.state.organ = organName
        this.$store.dispatch('showOrganSelected', JSON.stringify(organSelectedData))
        this.$store.state.organId = organId
      },
      showContextMenu: function (organLevel, organSort, organCode, organId, parentOrgan, event) {
        event.preventDefault()
        let posX = event.target.offsetLeft + event.target.offsetWidth
        let posY = event.target.offsetTop + event.target.offsetHeight
        let contextmenuInfo = {
          level: organLevel,
          sort: organSort,
          menuId: organCode,
          dbId: organId,
          parentId: parentOrgan,
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
    color: #286090;
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
