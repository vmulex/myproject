<template>
  <div class="info-dropdown" v-clickoutside="handleClose">
    <label @click.stop="showList">
      <span class="name">{{value}}</span>
      <span class="icon"><i class="fa fa-caret-down"></i></span>
    </label>
    <ul v-show="open">
      <li v-for="(element, index) of listData" :key="index" @click="selectThisValue(element.id)">
        {{ element.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DropDown',
  props: {
    defaultValue: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      open: false,
      value: this.defaultValue
    }
  },
  methods: {
    showList () {
      this.open = !this.open
    },
    selectThisValue (id) {
      this.open = !this.open
      this.$emit('on-select', id)
    },
    handleClose () {
      return false
    }
  },
  directives: {
    clickoutside: {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          // console.log(e.target)
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      update () {

      },
      unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .info-dropdown {
    label {
      display: inline-block;
      min-width: 6em;
      padding: 1px 10px;
      line-height: 1.8em;
      height: 1.8em;
      text-align: center;
      color: #fff;
      background-color: #286090;
      border-color: #204d74;
      border-radius: 4px;
      cursor: pointer;
      span.icon {
        float: right;
        margin-right: 8px;
      }
      span.name {
        margin-left:8px
      }
    }
    ul {
      position:absolute;
      z-index: 9999;
      background-color: #fff;
      line-height: 1.5em;
      padding: 5px 0;
      margin: 2px 0 0;
      color: #333;
      box-shadow: 0 6px 12px rgba(0,0,0,.175);
      li {
        padding: 3px 20px;
        min-width: 8em;
        text-align: center;
        line-height: 1.42857143;
        color: #333;
        cursor: pointer;
      }
      li:hover {
        background: #148fce;
      }
    }
  }
</style>



