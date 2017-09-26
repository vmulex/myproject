<template>
  <div id="test">
    <ul>
      <li v-for="(value, key, index) in testData">{{ value }}</li>
      <li :class="{ red: red }">{{ other }}</li>
    </ul>
  </div>
</template>
<style scoped>
  li {
    float: left;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin: 10px;
  }
  .red {
    background-color: red;
  }
</style>
<script>
  import url from '../../../pages/urlConfig'
  export default {
    name: 'Test',
    data: function () {
      return {
        testData: {}
      }
    },
    computed: {
      other () {
        return this.testData.filed1
      },
      red () {
        if (parseInt(this.other) > 500) {
          return true
        } else {
          return false
        }
      }
    },
    created: function () {
      this.test()
    },
    methods: {
      test: function () {
        setInterval(() => {
          this.getData()
        }, 1000)
        this.getData()
      },
      getData: function () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/test/getList'
//          url: '/apis/test/getList'
        })
          .then(function (response) {
//            console.log(response.data instanceof Array)
            console.log(response.data[0])
            _this.testData = response.data[0]
          })
          .catch(function (fail) {
            console.log(fail)
          })
      }
    }
  }
</script>
