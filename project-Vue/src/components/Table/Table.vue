<template>
  <div class="z-table">
    <div class="add-icon" v-if="tableTypeIsEditing">
      <span class="add-icon" v-if="tableTypePrimary" @click="importCustomersPop"><i class="fa fa-reply-all fa-lg"></i></span>
      <span class="add-icon" v-if="tableTypePrimary" @click="exportCustomersPop"><i class="fa fa-share-square-o fa-lg"></i></span>
      <span class="add-icon" v-if="tableTypePrimary" @click="addNewrowPop"><i class="fa fa-plus fa-lg"></i></span>
      <span class="add-icon" v-if="!tableTypePrimary" @click="addRow"><i class="fa fa-plus fa-lg"></i></span>
    </div>
    <div class="header-wrapper">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="80">
          <col v-for="(element, index) of columns" :key="index" :width="element.width" :align="element.align"/>
        </colgroup>
        <thead>
          <th>序号</th>
          <th v-for="(element, index) of columns" :key="index"><div class="cell">{{element.title}}</div></th>
        </thead>
      </table>
    </div>
    <div class="table-wrapper" :style="{height: tableHeight}">
      <table cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="80">
          <col v-for="(element, index) of columns" :key="index" :width="element.width" :align="element.align"/>
        </colgroup>
        <tbody>
          <tr v-for="(trData, rowIndex) of tableData" :key="rowIndex" @click="rowClick">
            <td>{{ rowIndex + 1 }}</td>
            <td v-for="(value, key, index) of trData" :key="index" v-if="oneOf(columns, key)">
              <div class="cell">
                <label v-if="!trData.editing">{{ value }}</label>
                <el-input v-else placeholder="请输入内容" size="small" v-model="trData[key]"></el-input>
              </div>
            </td>
            <td v-if="tableTypeIsEditing">
              <div v-if="tableTypePrimary">
                <span class="edit-icon"><i class="fa fa-edit fa-lg" @click.stop="editThisrowPop(trData)"></i></span>
                <span class="edit-icon"><i class="fa fa-ban fa-lg" @click.stop="banThisrow(trData)"></i></span>
              </div>
              <div v-else>
                <span class="edit-icon" @click.stop="editThisRow(trData, rowIndex)">
                  <i v-if="!trData.editing" class="fa fa-edit fa-lg"></i>
                  <label v-else>保存</label>
                </span>
                <span class="edit-icon" @click="deleteDialog = true">
                  <i class="fa fa-close fa-lg"></i>
                </span>
                <el-dialog
                  title="提示"
                  :visible.sync="deleteDialog"
                  size="tiny">
                  <span>此操作将删除该行信息，是否继续？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialog = false">取 消</el-button>
                    <el-button type="primary" @click="deleteThisRow(trData)">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less">
  .z-table {
    display: inline-block;
    div.add-icon {
      overflow: hidden;
      span.add-icon {
        float: right;
        width: 2em;
        cursor: pointer;
        .fa-plus {
          color: #008fc9;
        }
        .fa-share-square-o {
          color: #008fc9;
        }
        .fa-reply-all {
          color: #008fc9;
        }
      }
    }
    .header-wrapper {
      position: relative;
      border-left: 1px solid #dbe8ed;
      border-top: 1px solid #dbe8ed;
      border-bottom: 1px solid #dbe8ed;
      table {
        border-collapse:collapse;
        border: 1px solid #008fc9;
        th {
          border-right: 1px solid #dbe8ed;
          background-color: #008fc9;
          text-align: center;
          padding: 10px;
          color: #ffffff;
        }
      }
    }
    .table-wrapper {
      box-sizing: border-box;
      position: relative;
      overflow: auto;
      border-left: 1px solid #dbe8ed;
      border-bottom: 1px solid #dbe8ed;
      table {
        border-collapse:collapse;
        td {
          border-right: 1px solid #dbe8ed;
          border-bottom: 1px solid #dbe8ed;
          padding: 5px;
          text-align: center;
          // height: 40px;
          div {
            span.edit-icon {
              display: inline-block;
              width: 2em;
              vertical-align: top;
              .fa-edit {
                color: #008fc9;
                cursor: pointer;
              }
              .fa-ban {
                color: #008fc9;
                cursor: pointer;
              }
              .fa-close {
                color: #008fc9;
                cursor: pointer;
              }
              label {
                cursor: pointer;
                color: #008fc9;
              }
            }
          }
          .cell {
            label {
              display: inline-block;
              padding: 7px;
            }
          }
        }
      }
    }
    .table-wrapper::after {
      content: '';
      position: absolute;
      background-color: #dbe8ed;
      z-index: 1;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
    }
  }
</style>
<script>
  export default {
    name: 'ZTable',
    created: function () {
      if (this.type !== 'displayTable') {
        let operationCol = {
          title: '操作',
          width: 90,
          align: 'left',
          key: 'operation'
        }
        // console.log(this.columns)
        this.columns.push(operationCol)
      }
      this.tableData.map(item => {
        this.$set(item, 'editing', false)
        this.$set(item, 'saving', false)
        this.$set(item, 'saveFail', false)
        this.$set(item, 'isDeleting', false)
        return item
      })
    },
    props: {
      type: {
        type: String,
        required: true
      },
      columns: {
        type: Array,
        default: []
      },
      height: {
        type: String
      },
      tableData: {
        type: Array,
        default: []
      },
      addNewrowPop: {
        type: Function
      },
      editThisrowPop: {
        type: Function
      },
      importCustomersPop: {
        type: Function
      },
      exportCustomersPop: {
        type: Function
      },
      banThisrow: {
        type: Function
      }
    },
    data: function () {
      return {
        currentRow: {
          editingCell: null
        },
        deleteDialog: false
      }
    },
    computed: {
      tableTypeIsEditing () {
        return this.type !== 'displayTable'
      },
      tableTypePrimary () {
        return this.type === 'primaryTable'
      },
      tableHeight () {
        return this.height + 'px'
      }
    },
    methods: {
      editThisRow (row, index) {
        this.currentRow = row
        this.currentRow.editing = !this.currentRow.editing
        console.log(this.currentRow)
      },
      oneOf (array, key) {
        let has = false
        array.forEach(element => {
          if (element.key === key) {
            has = true
            return has
          }
        })
        return has
      },
      deleteThisRow (row) {
        this.deleteDialog = false
        console.log(row)
      },
      rowClick () {
        this.$emit('row-click')
      },
      addRow () {
        let newRow = {}
        let cloneColumns = JSON.parse(JSON.stringify(this.columns))
        cloneColumns.pop()
        cloneColumns.forEach(item => {
          newRow[item.key] = ''
        })
        newRow.editing = true
        newRow.saving = false
        newRow.saveFail = false
        newRow.isDeleting = false
        this.tableData.push(newRow)
      }
    }
  }
</script>

