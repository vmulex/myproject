<template>
  <div class="html5">
    <ul>
      <li class="transition">
      </li>
    </ul>
  </div>
</template>
<script>
import {toTree} from '.././utils/assist'
export default {
  name: 'Index',
  created () {
    let a = toTree(this.array, 'codename')
    console.log(a)
  },
  components: {
  },
  data: function () {
    return {
      array: [
        {
          codename: 'ppp1',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp3',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp1',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp2',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp2',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp3',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp2',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp3',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }, {
          codename: 'ppp3',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }
      ]
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