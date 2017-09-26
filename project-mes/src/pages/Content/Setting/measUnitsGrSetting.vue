<template>
  <div class="meas-units-grp-setting">
    <div class="meas-units-grp-setting-table">
      <div class="search">
         <label>计量单位组描述</label>
         <input type="text">
         <z-button tittle="查询"></z-button>
      </div>
      <el-table
        :data="tableData"
        height="350"
        border
        highlight-current-row
        @row-click="showInfo"
        style="width: 100%">
        <el-table-column
          prop="mIndex"
          label="计量单位组编号"
         >
        </el-table-column>
        <el-table-column
          prop="desc"
          label="计量单位组描述"
         >
        </el-table-column>
        <el-table-column
          label="是否禁用"
          prop="forbidden"
         >
        </el-table-column>
      </el-table>
    <div class="meas-grp-setting">
      <div class="meas-grp-index">
        <label>计量单位组编号</label>
        <input type="text" name="" ref="measGrpIndex" v-model="measGrpIndex">
      </div>
      <div class="meas-grp-desc">
        <label>计量单位组描述</label>
        <input type="text" name="" ref="measGrpDesc" v-model="measGrpDesc">
      </div>
      <div class="forbidden">
        <label class="name" style="padding-right: 6px">是否禁用： </label>
        <span class="info">
          <label for="roleforbiddenYES">是</label>
          <input id="roleforbiddenYES" type="radio" name="forbidden" value="是" v-model="forbidden">
          <label for="roleforbiddenNO">否</label>
          <input id="roleforbiddenNO" type="radio" name="forbidden" value="否"  v-model="forbidden">
        </span>
      </div>
      <div class="save" style="overflow: hidden">
        <z-button :tittle="button2" @click.native="saveMeasGrp" style="float: right;margin-left:1em"></z-button>
        <z-button :tittle="button1" @click.native="saveMeasGrp" style="float: right;"></z-button>
      </div>
    </div>
      
    </div>
  </div>
</template>

<script>
  import ZButton from '../../Index/components/ZButton.vue'
  export default {
    name: '',
    components: {
      ZButton
    },
    data: function () {
      return {
        button1: '保存',
        button2: '清空',
        measGrpIndex: '',
        measGrpDesc: '',
        currentRow: null,
        forbidden: null,
        checkedYes: false,
        tableData: [{
          mIndex: 'A01',
          desc: '长度',
          forbidden: '是'
        }]
      }
    },
    methods: {
      showInfo (row) {
        this.currentRow = row.Index
        this.measGrpIndex = row.mIndex
        this.measGrpDesc = row.desc
        this.forbidden = row.forbidden
        alert(JSON.stringify(row))
      },
      saveMeasGrp: function () {
      }
    },
    computed: {
    }
  }
</script>
<style scoped>
 
  .meas-units-grp-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 16px;
  }
  .search {
    margin-bottom: 1em;
    transform: translate(0%, 25%);
  }
  .meas-units-grp-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    margin: 50px 0;
  }
  .lang-setting-form {
    margin-top: 1em;
  }
  label.name {
    float:right;
    height: 20px;
    padding: 6px 12px;
  }
  .left, .right {
    float: left;
    width: 50%;
    height: 50%;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
    cursor: pointer;
  }
  .meas-grp-setting {
    margin-top: 50px;
  }
  .meas-grp-index, .meas-grp-desc, .forbidden {
    overflow: hidden;
    margin-bottom: 1em;
  }
  span.info {
    float: left;
    width: 14em;
    padding: 6px 0px;
    margin-right: 1.5em;
  }
  label.name {
    float:left;
    height: 20px;
    padding: 6px 0;
  }
</style>