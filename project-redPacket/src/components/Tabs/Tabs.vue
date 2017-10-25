<template>
  <div class="z-tabs">
    <ul>
      <li 
        v-for="(element, index) of tabList" 
        @click.stop="switchTab(element.name)" 
        :class="{active: currentView === element.name ? true : false}"
        :key="index">
        {{element.title}}
      </li>
    </ul>
    <div class="tab-info"><slot></slot></div>
  </div>
</template>
<script>
  import TabsPane from './TabsPane.vue'
  export default {
    name: 'Tabs',
    created: function () {
      // console.log(this.$children)
    },
    props: {
      defaultView: {
        type: String,
        required: true
      },
      tabList: {
        type: Array,
        required: true
      }
    },
    components: {
      TabsPane
    },
    data: function () {
      return {
        currentView: this.defaultView
      }
    },
    methods: {
      switchTab (name) {
        this.currentView = name
        this.$emit('on-choose', name)
      }
    }
  }
</script>
<style lang="less" scoped>
  div.z-tabs {
    margin-top: 1em;
    width: 100%;
    ul {
      margin-left: 3em;
      width: 100%;
      overflow: hidden;
      // height: 35px;
      li {
        float: left;
        padding: 10px;
        border-bottom: 3px solid #ffffff;
        cursor: pointer;
      }
      li.active {
        color: #148fce;
        border-bottom: 3px solid #148fce;
      }
    }
    .tab-info {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 1em;
    }
  }
</style>
