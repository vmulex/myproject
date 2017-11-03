<template>
  <div class="pop-up" v-if="visible">
    <div class="mask"></div>
    <div class="content" v-drag>
      <pop-header :onClose="closePop"></pop-header>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import PopHeader from '../PopHeader'
  export default {
    name: 'PopUp',
    props: {
      visible: {
        type: Boolean
      }
    },
    components: {
      PopHeader
    },
    directives: {
      drag: {
        bind: function (el, binding, vnode) {
          document.onmousedown = (ev) => {
            let disX = ev.clientX - el.offsetLeft
            let disY = ev.clientY - el.offsetTop
            document.onmousemove = (ev) => {
              let l = ev.clientX - disX
              let t = ev.clientY - disY
              el.style.left = l + 'px'
              el.style.top = t + 'px'
            }
            document.onmouseup = () => {
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        }
      }
    },
    methods: {
      closePop () {
        this.$emit('on-close', false)
      }
    }
  }
</script>
<style lang="less" scoped>
  .pop-up {
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #d1dbe5;
      opacity: 0.5;
      z-index: 999;
    }
    .content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 300px;
      max-width: 300px;
      min-height: 300px;
      z-index: 1000;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
</style>

