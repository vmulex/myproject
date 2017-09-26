<template>
  <div class="info-dropdown">
    <label @click.stop="showSettings"><span style="margin-left:8px">{{defaultLabel}}</span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
    <ul v-show="open" style="position:absolute;z-index: 9999;">
      <li v-for="value of listData" @click="selectItem" :style="{ padding: '3px 20px',width: ulWidth }">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: ['list-data', 'ul-width'],
    data: function () {
      return {
        open: false,
        defaultLabel: ''
      }
    },
    computed: {
      opened: function () {
        return this.$store.state.rootOpen ? this.open : false
      }
    },
    methods: {
      showSettings () {
//        this.$store.state.rootOpen = true
        this.open = !this.open
      },
      selectItem (ev) {
        this.defaultLabel = ev.target.innerText
        this.open = false
      }
    }
  }
</script>
<style lang="less" scoped></style>
