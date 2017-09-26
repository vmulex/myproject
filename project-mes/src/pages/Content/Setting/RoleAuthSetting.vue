<template>
  <div class="role-auth-setting">
    <div class="role-auth-setting-table">
      <el-table
        :data="tableData"
        height="200"
        border
        highlight-current-row
        @row-click="showInfo"
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="roleIndex"
          label="角色编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          width="240">
        </el-table-column>
        <el-table-column
          prop="forbidden"
          label="是否禁用">
        </el-table-column>
      </el-table>
      <div class="role-auth-setting-form">
        <ul>
          <li @click.stop="switchTab('role')">角色维护</li>
          <li @click.stop="switchTab('user')">用户名</li>
          <li @click.stop="switchTab('auth')">权限</li>
        </ul>
        <div class="role-auth-user"><component :is="currentView" :index="index" :roleId="roleId" :roleIndex="roleIndex" :roleDesc="roleDesc" :forbidden="forbidden" :user="user" :auth="authOwn"></component></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Role from './Role.vue'
  import User from './User.vue'
  import Auth from './Auth.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'LangType',
    created: function () {
      this.refresh()
    },
    components: {
      role: Role,
      user: User,
      auth: Auth
    },
    data: function () {
      return {
        currentView: 'role',
        index: '',
        roleId: '',
        roleIndex: '',
        roleDesc: '',
        forbidden: 'COMPT000121',
        user: {
          userNone: [],
          userOwn: []
        },
        authOwn: []
      }
    },
    computed: {
      tableData: function () {
        return this.$store.state.roleInfo
      }
    },
    methods: {
      showInfo (row) {
        let medium = this.tableData.filter((element) => {
          return element.roleIndex === row.roleIndex
        })
        this.index = medium[0].index
        this.roleId = medium[0].roleId
        this.roleIndex = medium[0].roleIndex
        this.roleDesc = medium[0].roleDesc
        this.forbidden = medium[0].forbidden
        let _this = this
        // 获取角色已有的用户
        _this.axios({
          method: 'get',
          url: url + '/reRoleUser/getList',
          params: {
            muteOrganId: 'COMPT00211',
//            roleId: this.currentRole.roleId
            roleId: 'COMPT00071'
          }
        })
          .then(function (response) {
            _this.user.userOwn = JSON.parse(response.data.data)
            console.log(_this.user.userOwn)
          })
          .catch(function (fail) {
            console.log(fail)
          })
        //  获取角色没有拥有的用户
        _this.axios({
          method: 'get',
          url: url + '/usr/getList',
          params: {
            muteOrganId: 'COMPT00211',
            roleId: 'COMPT00071'
          }
        })
          .then(function (response) {
            _this.user.userNone = JSON.parse(response.data.data)
            console.log(_this.user.userNone)
          })
          .catch(function (fail) {
            console.log(fail)
          })
        // 获取角色已有的权限
        _this.axios({
          method: 'get',
          url: url + '/reRoleRes/getList',
          params: {
            muteOrganId: 'COMPT00211',
            roleId: 'COMPT00071'
          }
        })
          .then(function (response) {
            _this.authOwn = JSON.parse(response.data.data)
            console.log(_this.authOwn)
          })
          .catch(function (fail) {
            console.log(fail)
          })
      },
      switchTab: function (val) {
        this.currentView = val
      },
      refresh: function () {
        this.$store.dispatch('refreshRole')
      }
    }
  }
</script>
<style scoped lang="less">
  .role-auth-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
  }
  .role-auth-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 750px;
    margin: 50px 0;
  }
  .role-auth-setting-form {
    margin-top: 3em;
    ul {
      width: 100%;
      height: 35px;
      li {
        float: left;
        margin-right: 5px;
        border: 1px solid #000000;
        cursor: pointer;
      }
      li:hover {
        background: #148fce;
      }
    }
    .role-auth-user {
      border: 5px solid #148fce;
      height: 400px
    }
  }
</style>
