<template>
  <div class="html5">
    <ul>
      <li class="placeholder">
        <div>
          <input type="text" name="" placeholder="Username">
        </div>
      </li>
      <li class="file-api">
        <upload></upload>
      </li>
      <li class="table" style="width:800px">
        <z-table :columns="columns" :tableData="tabledata" type="tabTabel" stripe></z-table>
      </li>
      <li class="dropdown">
        <drop-down :listData="dropDownListData" :defaultValue="dropDownDefaultValue" @on-select="selectValue"></drop-down>
      </li>
    </ul>
  </div>
</template>
<script>
import Upload from './Upload'
import ZTable from './Table'
import DropDown from './DropDown'
export default {
  name: 'Index',
  components: {
    Upload,
    ZTable,
    DropDown
  },
  data: function () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          width: '80',
          align: 'right'
        },
        {
          title: '年龄',
          key: 'age',
          width: '100',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          width: '200',
          align: 'right'
        }
      ],
      tabledata: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          sex: 'male'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          sex: 'male'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          sex: 'female'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          sex: 'male'
        }
      ],
      dropDownListData: [],
      dropDownDefaultValue: '测试'
    }
  },
  created: function () {
    let _this = this
    // this.axios({
    //   method: 'get',
    //   url: '/api/data'
    // })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    _this.axios({
      method: 'get',
      url: '/api/dropdown'
    })
      .then((res) => {
        console.log(res.data)
        _this.dropDownListData = res.data.list
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    selectValue (id) {
      console.log(id)
    }
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