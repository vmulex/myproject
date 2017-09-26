<template>
  <div class="auth-setting">
    <div class="auth-has">
      <label>已有权限</label>
      <div>
        <div class="header-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="80px">
              <col width="80px">
              <col>
            </colgroup>
            <thead>
            <th><div class="cell">序号</div></th>
            <th><div class="cell">菜单编号</div></th>
            <th><div class="cell">菜单描述</div></th>
            <th><div class="cell">操作按钮描述</div></th>
            </thead>
          </table>
        </div>
        <div class="table-wrapper">
          <table cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="50px">
              <col width="80px">
              <col width="80px">
              <col>
            </colgroup>
            <tbody>
            <tr v-for="(element, index) of tableData">
              <td><div class="cell">{{ element.index }}</div></td>
              <td><label class="cell">{{ element.menuId}}</label></td>
              <td><label class="cell">{{ element.menuDesc}}</label></td>
              <td><label class="cell">{{ element.authDesc}}</label></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="auth-all">
      <label>可选权限:</label>
      <div>
        <ul v-for="menuItem in test">
          <sub-button-auth :data="menuItem"></sub-button-auth>
        </ul>
      </div>
    </div>
    <div class="save" style="overflow: hidden">
      <z-button :tittle="tittle" @click.native="selectButtonAuth()" style="float: left;margin-top: 20px"></z-button>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import subButtonAuth from './subButtonAuth.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'Auth',
    props: ['auth-own'],
    created: function () {
      this.$store.state.authSelected = ['1-2', '1-3', '1-6']
      // 获取所有的权限
      let _this = this
      _this.axios({
        method: 'get',
        url: url + '/res/getList',
//        url: '/apis/res/getList',
        params: {
          muteOrganId: 'COMPT00211'
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
    data: function () {
      return {
        tittle: '保存',
        tableData: [{
          index: '1',
          menuId: '2222',
          menuDesc: '菜单配置',
          authDesc: '删除'
        }, {
          index: '2',
          menuId: '2223',
          menuDesc: '语言配置',
          authDesc: '删除'
        }, {
          index: '3',
          menuId: '2224',
          menuDesc: '用户配置',
          authDesc: '删除'
        }],
        test: [     // json数据这样写
          {
            resourceType: 'COMPT000129',
            resourceName: 'setting',
            resourceDescribe: '配置',
            resourceCode: '1',
            icon: 'fa fa-tty',
            resourceLevel: 1,
            resourceSort: 1,
            resourceUrl: '',
            attribute1: '',  // 语言编号
            attribute2: '',  // 界面ID
            resourceStatus: '',  // COMPT000119 是 COMPT000120 否
            child: [
              {
                resourceType: 'COMPT000129',
                resourceName: 'menuSetting',
                resourceDescribe: '菜单配置',
                resourceCode: '1-1',
                resourceLevel: 2,
                resourceSort: 1,
                resourceUrl: '/index/menuSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: '',
                resourceDescribe: '语言配置',
                resourceCode: '1-2',
                resourceLevel: 2,
                resourceSort: 2,
                resourceUrl: '/index/menuSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: [
                  {
                    resourceType: 'COMPT000129',
                    resourceName: 'langType',
                    resourceDescribe: '语言种类配置',
                    resourceCode: '1-2-1',
                    resourceLevel: 3,
                    resourceSort: 1,
                    resourceUrl: '/index/menuSetting/langType',
                    attribute1: '',  // 语言编号
                    attribute2: '',  // 界面ID
                    resourceStatus: '',
                    child: [
                      {
                        resourceType: '按钮的资源',
                        resourceCode: '1-2-1-1',
                        resourceName: 'fix',
                        resourceDescribe: '修改'
                      },
                      {
                        resourceType: '按钮的资源',
                        btnCode: '1-2-1-2',
                        resourceName: 'remove',
                        resourceDescribe: '删除'
                      }
                    ]
                  },
                  {
                    resourceType: 'COMPT000129',
                    resourceName: 'langSetting',
                    resourceDescribe: '新增语言配置',
                    resourceCode: '1-2-2',
                    resourceLevel: 3,
                    resourceSort: 2,
                    resourceUrl: '/index/menuSetting/langSetting',
                    attribute1: '',  // 语言编号
                    attribute2: '',  // 界面ID
                    resourceStatus: '',
                    child: []
                  }
                ]
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'factorySetting',
                resourceDescribe: '工厂配置',
                resourceCode: '1-3',
                resourceLevel: 2,
                resourceSort: 3,
                resourceUrl: '/index/factorySetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'menuButtonSetting',
                resourceDescribe: '菜单操作权限配置',
                resourceCode: '1-4',
                resourceLevel: 2,
                resourceSort: 4,
                resourceUrl: '/index/menuButtonSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'StructureSetting',
                resourceDescribe: '组织结构配置',
                resourceCode: '1-5',
                resourceLevel: 2,
                resourceSort: 5,
                resourceUrl: '/index/structureSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'UserSetting',
                resourceDescribe: '用户配置',
                resourceCode: '1-6',
                resourceLevel: 2,
                resourceSort: 6,
                resourceUrl: '/index/userSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'roleAuthSetting',
                resourceDescribe: '角色权限配置',
                resourceCode: '1-7',
                resourceLevel: 2,
                resourceSort: 7,
                resourceUrl: '/index/roleAuthSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              },
              {
                resourceType: 'COMPT000129',
                resourceName: 'userAuthSetting',
                resourceDescribe: '用户权限配置',
                resourceCode: '1-8',
                resourceLevel: 2,
                resourceSort: 8,
                resourceUrl: '/index/userAuthSetting',
                attribute1: '',  // 语言编号
                attribute2: '',  // 界面ID
                resourceStatus: '',
                child: []
              }
            ]
          }
        ]
      }
    },
    components: {
      ZButton,
      subButtonAuth
    },
    methods: {
      selectButtonAuth () {
        console.log(this.$store.state.authSelected)
      }
    }
  }
</script>
<style scoped lang="less">
  .auth-setting {
    width: 100%;
    height: 100%;
  }
  .save {
    float: left;
    box-sizing: border-box;
    width: 70px;
    height: 100%;
  }
  .auth-has {
    float: left;
    width: 350px;
    height: 100%;
  }
  .auth-all {
    float: left;
    width: 300px;
    height: 100%;
  }
  .auth-has>div, .auth-all>div {
    box-sizing: border-box;
    width: 330px;
    height: 350px;
    margin: 9px;
    border: 1px solid #148fce;
    overflow: auto;
    font-size: 12px;
    text-align: center;
  }
  .auth-all>div {
    width: 280px;
    overflow: auto;
  }
  .auth-all>div>ul {
    padding: 20px 0 0 20px;
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
  /*.table-wrapper>table tr:hover {*/
    /*background-color: #eef1f6;*/
  /*}*/
</style>
