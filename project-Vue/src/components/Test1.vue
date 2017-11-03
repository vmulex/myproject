<template>
  <div class="html5">
    <ul>
      <li class="transition">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Index',
  components: {
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .html5 {
    width: 100%;
    height: 100%;
    ul {
      li {
        float: left;
        width: 300px;
        height: 300px;
        margin-right: 1em;
        border: 1px solid #cccccc
      }
    }
  }
</style>