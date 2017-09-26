<template>
  <div class="user-setting">
    <div class="users-info-not">
      <label>用户:</label>
      <div>
        <div class="header-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="100px">
              <col>
            </colgroup>
            <thead>
            <th><div class="cell">序号</div></th>
            <th><div class="cell">用户工号</div></th>
            <th><div class="cell">用户名</div></th>
            </thead>
          </table>
        </div>
        <div class="table-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="100px">
              <col>
            </colgroup>
            <tbody>
            <tr v-for="(element, index) of tableData" @click="selectUser(element)" :class="{ selected: element.employeeNumber == userSelected.employeeNumber}">
              <td><div class="cell">{{ element.index }}</div></td>
              <td><label class="cell">{{ element.employeeNumber}}</label></td>
              <td><label class="cell">{{ element.username}}</label></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="transfer">
      <div class="center">
        <span @click="addUser()"><i class="fa fa-angle-right"></i></span>
        <span @click="removeUser"><i class="fa fa-angle-left"></i></span>
      </div>
    </div>
    <div class="users-info-own">
      <label>已选用户:</label>
      <div>
        <div class="header-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="100px">
              <col>
            </colgroup>
            <thead>
            <th><div class="cell">序号</div></th>
            <th><div class="cell">用户工号</div></th>
            <th><div class="cell">用户名</div></th>
            </thead>
          </table>
        </div>
        <div class="table-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="100px">
              <col>
            </colgroup>
            <tbody>
            <tr v-for="(element, index) of tableDataOwned" @click="selectUserOwned(element)" :class="{ selected: element.employeeNumber == userOwnedSelected.employeeNumber}">
              <td><div class="cell">{{ element.index }}</div></td>
              <td><label class="cell">{{ element.employeeNumber}}</label></td>
              <td><label class="cell">{{ element.username}}</label></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="save" style="overflow: hidden">
      <z-button :tittle="tittle" @click.native="" style="float: left;margin-top: 20px"></z-button>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  export default {
    name: 'User',
    props: ['current-role', 'user'],
    data: function () {
      return {
        tittle: '保存',
//        tableData: [{
//          index: '1',
//          employeeNumber: '8888888',
//          username: 'jack'
//        }, {
//          index: '2',
//          employeeNumber: '666666',
//          username: 'may'
//        }, {
//          index: '3',
//          employeeNumber: '5555533',
//          username: 'wahdy'
//        }],
        userSelected: {
          index: '',
          employeeNumber: '',
          username: ''
        },
        userOwnedSelected: {
          index: '',
          employeeNumber: '',
          username: ''
        }
      }
    },
    computed: {
      tableData () {
        return this.userNone
      },
      tableDataOwned () {
        return this.user.userOwn
      }
    },
    components: {
      ZButton
    },
    methods: {
      selectUser (element) {
        this.userSelected = element
      },
      selectUserOwned (element) {
        this.userOwnedSelected = element
      },
      addUser () {
        this.tableData = this.tableData.filter((element) => {
          return element.employeeNumber !== this.userSelected.employeeNumber
        })
        this.tableDataOwned.push(this.userSelected)
      },
      removeUser () {
        this.tableDataOwned = this.tableDataOwned.filter((element) => {
          element.employeeNumber !== this.userSelected.employeeNumber
        })
        this.tableData.push(this.userOwnedSelected)
      }
    }
  }
</script>
<style scoped lang="less">
  .user-setting {
    width: 100%;
    height: 100%;
  }
  .transfer, .save {
    float: left;
    box-sizing: border-box;
    width: 70px;
    height: 100%;
  }
  .users-info-not, .users-info-own {
    float: left;
    width: 270px;
    height: 100%;
  }
  .users-info-not>div, .users-info-own>div {
    box-sizing: border-box;
    width: 250px;
    height: 350px;
    margin: 9px;
    border: 1px solid #148fce;
    overflow: auto;
    font-size: 12px;
    text-align: center;
  }
  .transfer {
    position: relative;
  }
  .center {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .transfer span {
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    margin: 9px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid transparent;
    background-color: #5bc0de;
    border-color: #46b8da;
    cursor: pointer;
  }
  table {
    width: 100%;
    th {
      padding: 5px 0;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      vertical-align: middle;
      background-color: #eef1f6;
    }
    td {
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      vertical-align: middle;
      .cell {
        padding: 5px 0;
        border: none;
        box-shadow: none;
      }
    }
  }
  .table-wrapper>table tr:hover {
    background-color: #eef1f6;
  }
  .selected {
    background-color: #edf7ff;
  }
</style>
