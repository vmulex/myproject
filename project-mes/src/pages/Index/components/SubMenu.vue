<template>
  <li class="menu-option" draggable="true" @dragstart.stop="dragHomeMenu">
    <span @click="toggle" class="option" :class="[openMenu ? 'open' : 'close']" >
      <i :class="model.icon"  style="margin-right:10px"></i>
      <!-- <i v-if="!isFolder" class="fa fa-file"></i> -->
      <router-link v-if="!isFolder" :to="{path:model.resourceUrl}" @click.native="addNewTab" :id="model.resourceCode" class="menu-url">{{ model.resourceDescribe }}</router-link>
      <span v-else>{{ model.resourceDescribe }}</span>
      <i v-if="isFolder" class="fa" :class="[open ? 'fa-angle-up': 'fa-angle-down']" style="float:right;margin-right:1em"></i>
    </span>
    <ul v-show="open" v-if="isFolder" style="padding-left: 20px">
      <sub-menu v-for="item in model.child" :model="item" :key="item.id" :openMenu="openMenu"></sub-menu>  <!-- 为什么必须要bind:key -->
    </ul>
  </li>
</template>

<script>
export default {
  name: 'subMenu',   // 递归数组作用，在template中调用自己,对应上面的temple中 <sub-menu></sub-menu>
  props: ['model', 'open-menu'],
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.child && this.model.child.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
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
    },
    dragHomeMenu: function (ev) {
      // currentTarget 和 target 的区别，思考ul li点击事件即可
      // 可以用innerText来传文本
      let menuItemObj = ev.currentTarget.children
      let NoChildren = menuItemObj[0].getElementsByTagName('a').length
      let menuItem = {
        menuName: menuItemObj[0].innerText,
        children: NoChildren ? '' : Array.prototype.map.call(menuItemObj[1].children, (li) => {
          let NoChildren = li.children[0].getElementsByTagName('a').length
          if (NoChildren) {
            return {
              menuName: li.children[0].innerText,
              children: '',
              path: li.children[0].getElementsByTagName('a')[0].href.split('#')[1]
            }
          } else {
            return {
              menuName: li.children[0].innerText,
              children: Array.prototype.map.call(li.children[1].children, (li) => {
                return {
                  menuName: li.children[0].innerText,
                  children: '',
                  path: li.children[0].getElementsByTagName('a')[0].href.split('#')[1]
                }
              })
            }
          }
        }),
        path: NoChildren ? menuItemObj[0].getElementsByTagName('a')[0].href.split('#')[1] : ''
      }
      // console.log(menuItem)
      ev.dataTransfer.setData('text', JSON.stringify(menuItem))
    }
  }
}
</script>

<style scoped>
  span.option {
    display: inline-block;
    margin: 1px 0;
    padding: 8px 0;
    cursor: pointer;
    white-space: nowrap;
  }
  span.option:hover {
    background-color: #ecf6fd;
  }
  .open {
    width: 100%;
  }
  .close {
    width: 9em;
  }
</style>
