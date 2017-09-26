<template>
  <div class="user-setting">
    <div class="user-setting-table">
      <div class="search">
         <label>用户名</label>
         <input type="text">
         <z-button tittle="查询"></z-button>
      </div>
      <el-table
        :data="tableData"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="75">
        </el-table-column>
        <el-table-column
          prop="employeeNumber"
          label="工号"
          width="115">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="80">
        </el-table-column>
         <el-table-column
          prop="factory"
          label="部门"
          width="100">
        </el-table-column>
         <el-table-column
          prop="department"
          label="用户名是否禁用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userForbidden"
          label="角色编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="timeFrom"
          label="角色描述"
          width="140">
        </el-table-column>
        <el-table-column
          prop="timeTo"
          label="角色是否禁用">
        </el-table-column>
      </el-table>
      <div class="user-setting-form">
        <div class="left">
          <div class="employeeNumber">
            <input type="text" name="" ref="employeeNumber" style="float:right;width: 14em">
            <label class="name">工号：</label>
          </div>
          <div class="realname">
            <input type="text" name="" ref="realname" style="float:right;width: 14em">
            <label class="name">姓名：</label>
          </div>
          <div class="username">
            <input type="text" name="" ref="username" style="float:right;width: 14em">
            <label class="name">用户名：</label>
          </div>
        </div>
        <div class="middle">
          <div class="initialPassword">
            <input type="text" name="" ref="initialPassword" style="float:right;width: 14em">
            <label class="name">初始密码：</label>
          </div>
          <div class="lang">
            <input type="text" name="" ref="lang" style="float:right;width: 14em">
            <label class="name">语言：</label>
          </div>
          <div class="factory">
            <input type="text" name="" ref="factory" style="float:right;width: 14em">
            <label class="name">工厂：</label>
          </div>
        </div>
        <div class="right">
          <div class="email">
            <input type="text" name="" ref="email" style="float:right;width: 14em">
            <label class="name">邮箱：</label>
          </div>
          <div class="department">
            <input type="text" name="" ref="department" style="float:right;width: 14em">
            <label class="name">部门：</label>
          </div>
          <div class="forbidden">
            <span class="info">
              <label for="userforbiddenYES">是</label>
              <input id="userforbiddenYES" type="radio" name="forbidden" value="是" @click.stop="getForbiddenValue">
              <label for="userforbiddenNO">否</label>
              <input id="userforbiddenNO" type="radio" name="forbidden" value="否" @click.stop="getForbiddenValue" checked>
            </span>
            <label class="name" style="padding-right: 6px">是否禁用： </label>
          </div>
        </div>
        <div class="time">
          <label style="float: left;padding: 6px 2px 6px 20px;">有效日期：</label>
          <el-date-picker
            v-model="timeFrom"
            type="datetime"
            placeholder="选择起始日期时间">
          </el-date-picker>
          <el-date-picker
            v-model="timeTo"
            type="datetime"
            placeholder="选择终止日期时间">
          </el-date-picker>
        </div>
        <div class="save" style="overflow: hidden">
          <z-button :tittle="tittle" @click.native="insertLang" style="float: right"></z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .user-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
  }
  .search {
    margin-bottom: 1em;
  }
  .user-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 930px;
    height: 80%;
  }
  .user-setting-form {
    margin-top: 3em;
  }
  .left, .right{
    float: left;
    width: 33%;
    height: 100%;
  }
  .middle {
    float: left;
    width: 34%;
    height: 100%;
  }
  .employeeNumber, .realname, .username, .initialPassword, .lang, .factory, .email, .department, .forbidden {
    overflow: hidden;
    margin-bottom: 1em;
  }
  .time {
    width: 100%;
    margin-bottom: 1em;
    overflow: auto;
  }
  label.name {
    float:right;
    height: 20px;
    padding: 6px 0;
  }
  span.info {
    float: right;
    width: 14em;
    padding: 6px 0px;
    margin-right: 1.5em;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
  }
</style>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  export default {
    name: 'UserAuthSetting',
    components: {
      ZButton
    },
    data: function () {
      return {
        tittle: '保存',
        userForbidden: '否',
        tableData: [{
          index: '1',
          employeeNumber: '123456789',
          realname: '',
          username: '',
          initialPassword: '',
          lang: '',
          factory: '',
          email: '',
          department: '',
          userForbidden: '否',
          timeFrom: '',
          timeTo: ''
        }],
        timeFrom: '',
        timeTo: ''
      }
    },
    methods: {
      getForbiddenValue (ev) {
        this.userForbidden = ev.target.value
      },
      insertLang: function () {
        let index = this.tableData.length + 1
        let insertData = {
          index: index,
          employeeNumber: this.$refs.employeeNumber.value,
          realname: this.$refs.realname.value,
          username: this.$refs.username.value,
          initialPassword: this.$refs.initialPassword.value,
          lang: this.$refs.lang.value,
          factory: this.$refs.factory.value,
          email: this.$refs.email.value,
          department: this.$refs.department.value,
          userForbidden: this.userForbidden,
          timeFrom: this.timeFrom.toDateString(),
          timeTo: this.timeTo.toDateString()
        }
        this.tableData.push(insertData)
      }
    }
  }
</script>
