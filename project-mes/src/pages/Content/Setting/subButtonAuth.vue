<template>
  <li class="menu-option">
    <span class="option">
      <span class="icon" @click="toggle()"><i v-if="isFolder" class="fa" :class="[open ? 'fa-angle-down': 'fa-angle-right']"></i></span>
      <input type="checkbox" name="" :id="data.resourceCode" :value="data.resourceCode" @change="select(data.resourceCode, $event)" :checked="authSelected.includes(data.resourceCode)">
      <label class="menu-title" :for="data.resourceCode">{{ data.resourceDescribe }}</label>
    </span>
    <ul v-show="open" v-if="isFolder" style="padding-left: 20px">
      <sub-button-auth v-for="item in data.child" :data="item" :key="item.id"></sub-button-auth>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'subButtonAuth',
    props: ['data'],
    data () {
      return {
        open: false,
        checkedNames: [],
        selected: false
      }
    },
    computed: {
      isFolder () {
        return this.data.child && this.data.child.length
      },
      authSelected () {
        return this.$store.state.authSelected
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      select (auId, ev) {
        let tranferData = {
          auId: auId,
          status: ev.target.checked
        }
        this.$store.dispatch('changeAuth', tranferData)
      }
    }
  }
</script>
<style scoped>
  .menu-option {
    /*width: 20em;*/
    text-align: left;
    font-size: 12px;
  }
  .option {
    display: inline-block;
    width: 90%;
    height: 100%;
    margin-bottom: 6px;
  }
  .option:hover {
    background-color: #ecf6fd;
  }
  span.icon {
    display: inline-block;
    width: 12px;
    height: 14px;
    padding: 0;
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
