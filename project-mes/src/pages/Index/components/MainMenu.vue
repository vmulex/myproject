 <template>
  <div class="menu-tree">
    <div class="sort" @click="closeMenu">
      <label><i class="fa" :class="[open?'fa-angle-double-left fa-2x':'fa-angle-double-right fa-2x']"></i></label>
    </div>
    <ul v-for="menuItem in theModel">  <!-- menuItem为下面myData中第一级数组循环的元素，即一级菜单 -->
      <sub-menu :model="menuItem" :openMenu="open"></sub-menu>
    </ul>
  </div>
</template>

<script>
  import SubMenu from './SubMenu.vue'
  export default {
    name: 'MainMenu',
    components: {
      SubMenu
    },
    created: function () {
      this.$store.dispatch('switchLang', 'COMPT0001217')
    },
    data () {
      return {
        open: true
//        theModel: []
      }
    },
    computed: {
      theModel: function () {
        return this.$store.state.MENU
      }
    },
    methods: {
      closeMenu: function () {
        this.$emit('open', this.open)
        this.open = !this.open
      }
    }
  }
</script>

<style>
  div.sort {
    width: 100%;
    height: 2em;
  }
  div.sort>label {
    float: right;
    padding-right: 0.5em;
  }
  div.menu-tree {
    margin-left: 5px;
  }
</style>
