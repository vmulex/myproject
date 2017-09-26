<template>
  <div class="menu-button-setting">
    <div class="menu-button-setting-table">
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
          width="80">
        </el-table-column>
        <el-table-column
          prop="buttonCode"
          label="操作按钮编号"
          width="140">
        </el-table-column>
        <el-table-column
          prop="basLangDesc"
          label="基础语言描述">
        </el-table-column>
      </el-table>
      <div class="menu-button-setting-form">
        <div class="top">
          <div class="buttonCode">
            <label class="name">操作按钮编号：</label>
            <input type="text" name="" v-model="buttonCode">
          </div>
          <div class="basLangDesc">
            <label class="name">基础语言描述：</label>
            <span class="bas-lang-des">{{ basLangDesc }}</span>
            <button @click="showBasLang">选择</button>
          </div>
        </div>
        <!--<div class="bottom">-->
          <!--<div class="langId" style="z-index: 100">-->
            <!--<label class="name">语言编号：</label>-->
            <!--<div class="info-dropdown" style="width: 9em;margin-right: 2em">-->
              <!--<label @click.stop="showLang" ref="lang"><span style="margin-left:8px" class="lang"></span><span class="icon"><i class="fa fa-caret-down"></i></span></label>-->
              <!--<ul style="width: 140px;position:absolute;display: none">-->
                <!--<li v-for="value of listLang" @click="selectLang(value, $event)">-->
                  <!--{{ value }}-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="save" style="overflow: hidden">
          <z-button :tittle="tittle1" @click.native="insertMenuButton" style="float: right;margin-right: 2em"></z-button>
          <z-button :tittle="tittle2" @click.native="newMenuButton" style="float: right;margin-right: 2em"></z-button>
        </div>
      </div>
    </div>
    <basic-lang-pop :status="basLangPopStatus" @cancel="cancelBasLang" @insert="insertBasLang"></basic-lang-pop>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import BasicLangPop from './BasicLangPop.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'MenuButtonSetting',
    created: function () {
      this.refresh()
    },
    components: {
      ZButton,
      BasicLangPop
    },
    data: function () {
      return {
        tittle1: '保存',
        tittle2: '新增',
        listLang: [],
        langOpen: false,
        fontTypeOpen: false,
        fontSizeOpen: false,
        basLangPopStatus: false,
        basLangDesc: '',
        basLangId: '',
        buttonCode: '',
        resourceId: ''
      }
    },
    computed: {
      langOpened () {
        return this.$store.state.rootOpen ? this.langOpen : false
      },
      tableData () {
        return this.$store.state.buttonData
      },
      languageId: function () {
        return this.$store.state.languageId
      }
    },
    methods: {
      showInfo (row) {
        this.buttonCode = row.buttonCode
        this.basLangDesc = row.basLangDesc
        this.resourceId = row.resourceId
      },
      showBasLang: function () {
        this.basLangPopStatus = true
      },
      insertBasLang: function (basLangDesc, basLangId) {
        this.basLangPopStatus = false
        this.basLangDesc = basLangDesc
        this.basLangId = basLangId
      },
      cancelBasLang: function () {
        this.basLangPopStatus = false
      },
      refresh: function () {
        // 获得所有按钮
        this.$store.dispatch('refreshButton', this.languageId)
      },
      newMenuButton: function () {
        this.buttonCode = ''
        this.basLangDesc = ''
        this.resourceId = ''
      },
      insertMenuButton: function () {
        let _this = this
        _this.axios({
          method: 'post',
          url: url + '/res/addObj',
//          url: '/apis/res/addObj',
          data: {
            resourceId: _this.resourceId,
            muteOrganId: 'COMPT00211',
            resourceCode: _this.buttonCode,
            resourceDescribe: _this.basLangId,
            resourceType: 'COMPT000130',
            resourceStatus: 'COMPT000121'
          }
        })
          .then(function (response) {
            console.log(response)
            _this.refresh()
            console.log('success')
          })
          .catch(function (fail) {
            console.log(fail)
          })
      }
    }
  }
</script>
<style lang="less" scoped>
  .menu-button-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
  }
  .menu-button-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    margin: 50px 0;
  }
  .menu-button-setting-form {
    margin-top: 3em;
  }
  label.name {
    float:left;
    height: 20px;
    padding: 6px 5px;
  }
  .top, .bottom {
    overflow: hidden;
    margin-bottom: 1em;
  }
  .buttonCode, .basLangDesc {
    float: left;
  }
  ul {
    position: absolute;
    height: 120px;
    overflow: auto;
  }
  span.bas-lang-des {
    float:left;
    width: 12em;
    height: 20px;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
