<template>
  <div class="user-setting">
    <div class="user-setting-table">
      <div class="search">
         <label>关键字</label>
         <input type="text" v-model="searchKeyword">
         <z-button tittle="查询" @click.native="search()"></z-button>
      </div>
      <el-table
        :data="tableData"
        height="350"
        border
        highlight-current-row
        @row-click="showInfo"
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
          label="租户"
          width="100">
        </el-table-column>
         <el-table-column
          prop="department"
          label="组织"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userForbidden"
          label="是否禁用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="timeFrom"
          label="有效日期(起)"
          width="140">
        </el-table-column>
        <el-table-column
          prop="timeTo"
          label="有效日期(止)">
        </el-table-column>
      </el-table>
      <div class="user-setting-form">
        <div class="left">
          <div class="employeeNumber">
            <input type="text" name="" ref="employeeNumber" style="float:right;width: 14em" v-model="employeeNumber">
            <label class="name">工号：</label>
          </div>
          <div class="realname">
            <input type="text" name="" ref="realname" style="float:right;width: 14em" v-model="realname">
            <label class="name">姓名：</label>
          </div>
          <div class="username">
            <input type="text" name="" ref="username" style="float:right;width: 14em" v-model="username">
            <label class="name">用户名：</label>
          </div>
        </div>
        <div class="middle">
          <div class="initialPassword">
            <input type="text" name="" ref="initialPassword" style="float:right;width: 14em" v-model="initialPassword">
            <label class="name">初始密码：</label>
          </div>
          <div class="lang">
            <div class="lang-dropdown">
              <label @click.stop="showLang" class="top"><span style="margin-left:8px">{{ defaultLang }}</span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
              <ul v-show="langOpen" style="position:absolute;z-index: 9999;">
                <li v-for="value of listLang" @click="selectLang(value)" style="padding:3px 20px;width: 12em;text-align: center">
                  {{ value.desc }}
                </li>
              </ul>
            </div>
            <label class="name">默认语言：</label>
          </div>
          <div class="factory">
            <div class="mute-dropdown">
              <label @click.stop="showMutes" class="top"><span style="margin-left:8px"></span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
              <ul v-show="listFactoriesOpen" style="position:absolute;z-index: 9999;">
                <li v-for="value of listFactories" @click="selectMute" style="padding: 3px 20px;width: 12em">
                  <input type="checkbox" :id="value.factoryIndex" :value="value.muteId" v-model="mutes" style="vertical-align: middle">
                  <label :for="value.factoryIndex" style="width: 10em;">{{ value.desc }}</label>
                </li>
              </ul>
            </div>
            <label class="name">租户：</label>
          </div>
        </div>
        <div class="right">
          <div class="email">
            <input type="text" name="" ref="email" style="float:right;width: 14em" v-model="email">
            <label class="name">邮箱：</label>
          </div>
          <div class="department">
            <button style="float: right" @click="showOrganization">选择</button>
            <span class="department-span" ref="department" v-model="department">{{ organ }}</span>
            <label class="name">组织：</label>
          </div>
          <div class="forbidden">
            <span class="info">
              <label for="userforbiddenYES">是</label>
              <input id="userforbiddenYES" type="radio" name="forbidden" value="COMPT000122" v-model="this.userForbidden">
              <label for="userforbiddenNO">否</label>
              <input id="userforbiddenNO" type="radio" name="forbidden" value="COMPT000121" v-model="this.userForbidden">
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
          <z-button :tittle="tittle1" @click.native="insertUser" style="float: right"></z-button>
          <z-button :tittle="tittle2" @click.native="newUser" style="float: right"></z-button>
        </div>
      </div>
    </div>
    <div class="organization" v-show="OrganizationStatus">
      <header><span style="float: right"><i class="fa fa-close fa-lg" @click="cancelOrganization"></i></span></header>
      <div style="padding: 2em">
        <div class="menu-show-tree">
          <span v-show="!organInfo">无数据显示</span>
          <ul v-for="menuItem in organInfo">  <!-- menuItem为下面myData中第一级数组循环的元素，即一级菜单 -->
            <sub-organ-tree :data="menuItem" type="organName"></sub-organ-tree>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import DropDown from '../../Index/components/DropDown.vue'
  import SubOrganTree from './subOrganTree.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'UserSetting',
    components: {
      ZButton,
      DropDown,
      SubOrganTree
    },
    data: function () {
      return {
        tittle1: '保存',
        tittle2: '新增',
        //  选择的租户
        mutes: [],
        listFactories: [],
        listFactoriesOpen: false,
        langOpen: false,
        OrganizationStatus: false,
        listLang: [],
        defaultLang: '',
        defaultLangId: '',
        userForbidden: 'COMPT000121',
        searchKeyword: '',
        userId: '',
        employeeNumber: '',
        realname: '',
        username: '',
        initialPassword: '',
        email: '',
        department: '',
        timeFrom: '',
        timeTo: '',
        tableData: [],
        organInfo: ''
      }
    },
    computed: {
      organ: function () {
        return this.$store.state.organ
      },
      organId: function () {
        return this.$store.state.organId
      }
    },
    created: function () {
      // 拉取组织语言的接口数据
      let _this = this
      _this.axios({
        method: 'get',
        url: url + '/lang/getList',
//        url: '/apis/lang/getList',
        params: {
//          muteOrganId: 'COMPT00210106'
        }
      })
        .then(function (response) {
          _this.listLang = JSON.parse(response.data.data).map((element, index) => {
//            return {
//              index: (index + 1) + '',
//              lang: element.language.dictionaryCode,
//              desc: element.language.dictionaryName,
//              languageId: element.languageId
//            }
            return {
              desc: element.language.dictionaryName,
              languageId: element.languageId
            }
          })
        })
        .catch(function (fail) {
          console.log(fail)
        })
      // 拉取租户的接口数据
      _this.axios({
        method: 'get',
        url: url + '/mute/getList',
//        url: '/apis/mute/getList',
        params: {
//          muteCode: _this.searchKeyword,
//          muteDescribe: _this.searchKeyword
        }
      })
        .then(function (response) {
          _this.listFactories = JSON.parse(response.data.data).map((element, index) => {
            return {
//              index: (index + 1) + '',
              muteId: element.muteId,
              factoryIndex: element.muteCode,
              desc: element.muteDescribe
//              legalPerson: element.juridicalPerson,
            }
          })
        }).catch(function (fail) {
          console.log(fail)
        })
    },
    methods: {
      showMutes () {
        this.listFactoriesOpen = !this.listFactoriesOpen
      },
      showLang () {
        this.langOpen = !this.langOpen
      },
      selectLang (lang) {
        this.defaultLang = lang.desc
        this.defaultLangId = lang.languageId
        this.langOpen = false
      },
      selectMute (ev) {

      },
      showOrganization () {
        this.OrganizationStatus = true
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/org/getTree',
//          url: '/apis/org/getTree',
          params: {
            muteOrganId: 'COMPT00211'
          }
        })
          .then(function (response) {
            console.log(JSON.parse(response.data.data))
            _this.organInfo = JSON.parse(response.data.data)
          })
          .catch(function (fail) {
            console.log(fail)
          })
      },
      cancelOrganization () {
        this.OrganizationStatus = false
      },
      showInfo (row) {
        // this.currentRow = row
        this.employeeNumber = row.employeeNumber
        let userSelected = this.tableData.filter((element) => {
          return element.employeeNumber === row.employeeNumber
        })
        console.log(userSelected[0])
        let timeNow = new Date()
        this.userId = userSelected[0].userId
        this.realname = userSelected[0].realname
        this.username = userSelected[0].username
//        this.factory = userSelected[0].factory
        this.department = userSelected[0].department
        this.timeFrom = userSelected[0].timeFrom ? userSelected[0].timeFrom.time : timeNow.getTime()
        this.timeTo = userSelected[0].timeTo ? userSelected[0].timeTo.time : timeNow.getTime()
        this.email = userSelected[0].email
        this.initialPassword = userSelected[0].initialPassword
        this.userForbidden = userSelected[0].userForbidden
      },
      search () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/usr/getList',
//          url: '/apis/usr/getList',
          params: {
            userName: _this.searchKeyword,
            userAccount: _this.searchKeyword
          }
        })
          .then(function (response) {
            console.log(JSON.parse(response.data.data))
            _this.tableData = JSON.parse(response.data.data).map((element, index) => {
              return {
                index: (index + 1) + '',
                userId: element.userId,
                employeeNumber: element.employeeNumber,
                realname: element.userName,
                username: element.userAccount,
                initialPassword: element.userPasswd,
                defaultLang: element.defaultLanguage,
                mutes: element.muteOrganId,
                email: element.userEmail,
                organ: element.organId,
                userForbidden: element.userStatus,
                timeFrom: element.validStarttime,
                timeTo: element.validEddttime
              }
            })
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      formatDateTime (date) {
        date = new Date(date)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        let second = date.getSeconds()
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + 'T' + h + ':' + minute + ':' + second + '.488+0800'
      },
      newUser: function () {
        this.userId = ''
        this.employeeNumber = ''
        this.realname = ''
        this.username = ''
        this.factory = ''
        this.department = ''
        this.timeFrom = ''
        this.timeTo = ''
        this.email = ''
        this.defaultLang = ''
        this.initialPassword = ''
        this.userForbidden = ''
      },
      insertUser: function () {
        let insertData = {
          userId: this.userId,
          employeeNumber: this.employeeNumber,
          realname: this.realname,
          username: this.username,
          initialPassword: this.initialPassword,
          defaultLang: this.defaultLangId,
          mute: this.mutes.join(','),
          email: this.email,
          organId: this.organId,
          userForbidden: this.userForbidden,
          timeFrom: this.timeFrom ? this.formatDateTime(this.timeFrom) : '',
          timeTo: this.timeTo ? this.formatDateTime(this.timeTo) : ''
        }
        console.log(insertData)
        this.axios({
          method: 'post',
          url: url + '/usr/addObj',
//          url: '/apis/usr/addObj',
          data: {
            userId: insertData.userId,
            employeeNumber: insertData.employeeNumber,
            userName: insertData.realname,
            userAccount: insertData.username,
            userPasswd: insertData.initialPassword,
            defaultLanguage: insertData.defaultLang,
            muteOrganId: insertData.mute,
            userEmail: insertData.email,
            department: insertData.organ,
            userStatus: insertData.userForbidden,
            validStarttime: insertData.timeFrom,
            validEddttime: insertData.timeTo,
            organId: insertData.organId
          }
        }).then(function (response) {
          console.log(response)
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .user-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
    .organization>header {
      height: 2.5em;
      background-color: #5bc0de;
    }
    .organization>header>span {
      line-height: 2em;
      margin-right: 0.5em;
    }
    .organization>header>span>i {
      cursor: pointer;
    }
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
  span.department-span {
    float: right;
    width: 10em;
    height: 20px;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  div.mute-dropdown, div.lang-dropdown {
    float: right;
    width: 14em;
    padding: 6px 13px;
    letter-spacing: 4px;
    label.top {
      display: inline-block;
      line-height: 1.8em;
      width: 100%;
      height: 1.8em;
      text-align: center;
      color: #fff;
      background-color: #286090;
      border-color: #204d74;
      border-radius: 4px;
      cursor: pointer;
      span.icon {
        float: right;
        margin-right: 8px;
      }
    }
    ul {
      background-color: #fff;
      line-height: 1.5em;
      padding: 5px 0;
      margin: 2px 0 0;
      color: #333;
      webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
      box-shadow: 0 6px 12px rgba(0,0,0,.175);
      li {
        padding: 3px 20px;
        line-height: 1.42857143;
        color: #333;
        cursor: pointer;
      }
      li:hover {
        background: #148fce;
      }
    }
  }
  .organization {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 500px;
    background-color: #ffffff;
    border: 5px solid #148fce;
    overflow-x: hidden;
    overflow-y: auto;
  }
  div.menu-show-tree {
    position: relative;
    margin-left: 4em;
    margin-top: 2em;
  }
</style>
