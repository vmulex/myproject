<template>
  <div class="table">
    <div class="add-icon"><span>++</span></div>
    <div class="header-wrapper">
      <table>
        <colgroup>
          <col width="50px"/>
          <col v-for="(element, index) of columns" :key="index" :width="element.width" />
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th v-for="(element, index) of columns" :key="index" :style="{textAlign: element.align}">{{element.title}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="body-wrapper">
      <table>
        <colgroup>
          <col width="50px" />
          <col v-for="(element, index) of columns" :key="index" :width="element.width"/>
        </colgroup>
        <tbody>
          <tr v-for="(tr, index) of tabledata" :key="index">
            <td>{{index + 1}}</td>
            <td v-for="(value, index) of tr" :key="index">{{value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Table',
  props: {
    columns: {
      type: Array
    },
    tabledata: {
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>
  div.table {
    box-sizing: border-box;
    width: 100%;
    div.add-icon {
      width: 100%;
      overflow: hidden;
      span {
        float: right;
      }
    }
  }
</style>



