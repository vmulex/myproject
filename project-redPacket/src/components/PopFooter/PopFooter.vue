<script>
  export default {
    name: 'Popfooter',
    props: {
      level: {
        type: Number
      }
    },
    render: function (createElement) {
      return createElement(
        'div',
        {
          'class': {
            'pop-footer': true
          }
        },
        this.$slots.default // 子组件中的阵列
      )
    }
  }
</script>
<style lang="less" scoped>
  .pop-footer {
    height: 3em;
    margin-bottom: 1em;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    label {
      line-height: 3em;
      margin-left: 1em;
    }
    span {
      line-height: 3em;
      margin-right: 1em;
      .fa-close {
        color: #8b8b8b;
        cursor: pointer;
      }
    }
  }
</style>

