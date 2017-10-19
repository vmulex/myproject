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
      <li class="table" style="width:600px">
        <z-table :columns="columns" :tabledata="tabledata" type="edit"></z-table>
      </li>
    </ul>
  </div>
</template>
<script>
import Upload from './Upload'
import ZTable from './Table'
export default {
  name: 'Index',
  components: {
    Upload,
    ZTable
  },
  data: function () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          width: '80px',
          align: 'right'
        },
        {
          title: '年龄',
          key: 'age',
          width: '100px',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          width: '150px',
          align: 'right'
        }
      ],
      tabledata: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
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