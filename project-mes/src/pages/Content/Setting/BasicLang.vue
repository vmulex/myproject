<template>
  <div class="basicLang-setting">
    <div class="lang-setting-table">
      <div class="search">
        <label>基础语言描述</label>
        <input type="text" v-model="text">
        <z-button tittle="查询" @click.native="searchText"></z-button>
      </div>
      <div class="bottom">
        <div class="left">
          <el-table
            :data="basicLangData"
            height="300"
            border
            highlight-current-row
            @row-click="showInfo"
            @row-dblclick="showMultiLang"
            style="width: 100%;margin-bottom: 20px">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="dictionaryDescribe"
              label="基础语言描述">
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData"
            height="300"
            border
            highlight-current-row
            @row-dblclick="showMultiLang"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="langCode"
              label="语言编号">
            </el-table-column>
            <el-table-column
              prop="basLangDesc"
              label="基础语言描述">
            </el-table-column>
            <el-table-column
              prop="multiLang"
              label="多语言描述">
            </el-table-column>
          </el-table>
        </div>
        <div class="lang-setting-form">
          <div class="bas-dis" style="overflow: hidden">
            <div style="color: red;height: 1em;width: 100%">{{ insertSuccessMessage }}</div>
            <label class="name">基础语言描述：</label>
            <input type="text" name="" ref="basLangDesc" style="float:left;width: 12em" v-model="basLangDesc">
          </div>
          <div class="save" style="overflow: hidden;margin-top: 1em">
            <z-button tittle="保存" @click.native="insertBasicLang" style="float: left;margin-left:1em"></z-button>
            <z-button tittle="取消" @click.native="clearBasicLang" style="float: right;margin-left:1em"></z-button>
          </div>
        </div>
      </div>
    </div>
    <div class="multiLangPop" v-show="multiLangPopStatus">
      <header><span style="float: right"><i class="fa fa-close fa-lg" @click="cancelMultiLang"></i></span></header>
      <div style="padding: 2em">
        <div class="row">
          <label class="name">基础语言描述：</label>
          <span type="text" name="" ref="basLangDescPop" style="float:left;width: 12em">{{ basLangDesc }}</span>
        </div>
        <div class="row">
          <label class="name">语言编号：</label>
          <div class="info-dropdown" style="width: 12em">
            <label @click.stop="showSettings"><span style="margin-left:8px">{{ langSelected }}</span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
            <ul v-show="open" style="position:absolute;z-index: 9999;">
              <li v-for="value of listSysLang" @click="selectItem(value.dictionaryId, value.dictionaryCode)" style="padding: 3px 20px;width: 10em">
                {{ value.dictionaryCode }}
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <label class="name">多语言描述：</label>
          <input type="text" name="" ref="multiLangDescPop" style="float:left;width: 12em" v-model="multiLangDesc">
        </div>
        <div class="save" style="overflow: hidden">
          <z-button tittle="保存" @click.native="insertMultiLang" style="float: left;margin-left:1em"></z-button>
          <z-button tittle="取消" @click.native="cancelMultiLang" style="float: right;margin-left:1em"></z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'LangType',
    components: {
      ZButton
    },
    data: function () {
      return {
        open: false,
        reId: '',
        dictionaryId: '',
        langSelected: '',
        languageIdSelected: '',
        multiLangDesc: '',
        text: '',
        basicLangData: [],
        tableData: [],
        langCode: '',
        basLangDesc: '',
        multiLangPopStatus: false,
        listSysLang: [],
        insertSuccessMessage: ''
      }
    },
    watch: {
      basLangDesc (curVal, oldVal) {
        if (curVal === '') {
          this.insertSuccessMessage = ''
        }
      }
    },
    methods: {
      showInfo (row) {
//        this.labelIndex = row.labelIndex
//        let labelSelected = this.tableData.filter((element) => {
//          return element.labelIndex === row.labelIndex
//        })
//        console.log(labelSelected[0])
//        this.langId = labelSelected[0].langId
//        this.basLangDesc = labelSelected[0].basLangDesc
//        this.multiLangDesc = labelSelected[0].multiLangDesc
//        this.basLangDesc = row.
//        console.log(row)
        console.log(row)
        this.basLangDesc = row.dictionaryDescribe
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/reDicLang/getList',
//          url: '/apis/reDicLang/getList',
          params: {
            dicId: row.dictionaryId
          }
        })
          .then(function (response) {
            console.log(JSON.parse(response.data.data))
            if (response.data.data === null) {
              _this.tableData = []
            } else {
              _this.tableData = JSON.parse(response.data.data).map((element, index) => {
                return {
                  index: (index + 1) + '',
                  reId: element.reId,
                  dictionaryId: element.dictionaryId,
                  langCode: element.language.dictionaryCode,
                  languageId: element.languageId,
                  basLangDesc: row.dictionaryDescribe,
                  multiLang: element.languageDescribe
                }
              })
            }
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      cancelMultiLang: function () {
        this.multiLangPopStatus = false
      },
      showMultiLang: function (row) {
        console.log(row)
        this.multiLangPopStatus = true
        this.dictionaryId = row.dictionaryId
        this.reId = row.reId
        this.languageId = row.languageId
        this.langSelected = row.langCode
        this.multiLangDesc = row.multiLang
        // 多语言描述的
        let _this = this
        // 请求系统配置的语言
        this.axios({
          method: 'get',
          url: url + '/lang/getList'
//        url: '/apis/lang/getList'
        })
          .then(function (response) {
//            console.log(JSON.parse(response.data.data))
            _this.listSysLang = JSON.parse(response.data.data).map((element) => {
              return {
                dictionaryId: element.language.dictionaryId,
                dictionaryCode: element.language.dictionaryCode
              }
            })
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      searchText () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/dic/text',
//          url: '/apis/usr/getList',
          params: {
            dictionaryDescribe: _this.text
          }
        })
          .then(function (response) {
            if (response.data.data === null) {
              _this.basicLangData = []
            } else {
              _this.basicLangData = JSON.parse(response.data.data).map((element, index) => {
                return {
                  index: (index + 1) + '',
                  dictionaryDescribe: element.dictionaryDescribe,
                  dictionaryId: element.dictionaryId
                }
              })
            }
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      showSettings () {
//        this.$store.state.rootOpen = true
        this.open = !this.open
      },
      selectItem (dictionaryId, dictionaryCode) {
        this.langSelected = dictionaryCode
        this.languageId = dictionaryId
        this.open = false
      },
      insertBasicLang: function () {
        let _this = this
        this.axios({
          method: 'post',
//          url: url + '/dic/addObj',
          url: '/apis/dic/addObj',
          data: {
            dictionaryDescribe: this.basLangDesc,
            parentDictionary: 'COMPT0001279',
            resourceStatus: 'COMPT000121'
          }
        }).then(function (response) {
          _this.insertSuccessMessage = '添加成功'
        }).catch(function (fail) {
          console.log(fail)
        })
      },
      insertMultiLang () {
        let _this = this
        console.log(this.reId, this.dictionaryId, this.languageId, this.multiLangDesc)
        this.axios({
          method: 'post',
          url: url + '/reDicLang/addObj',
//          url: '/apis/reDicLang/addObj',
          data: {
            reId: this.reId,
            dictionaryId: this.dictionaryId,  //  ---------关键字的查询
            languageId: this.languageId,     //   ----------语言种类的查询
            languageDescribe: this.multiLangDesc,  //   -------多语言的翻译
            muteOrganId: 'COMPT00211',
            resourceStatus: 'COMPT000121'
          }
        }).then(function (response) {
          console.log(response, 'seccess')
          _this.multiLangPopStatus = false
        }).catch(function (fail) {
          console.log(fail)
        })
      },
      clearBasicLang () {
        this.basLangDesc = ''
      }
    }
  }
</script>
<style scoped lang="less">
  .basicLang-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 16px;
    .multiLangPop {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      background-color: #ffffff;
      border: 5px solid #148fce;
      overflow: auto;
      header {
        height: 2.5em;
        margin-bottom: 2em;
        background-color: #5bc0de;
      }
      header>span {
        line-height: 2em;
        margin-right: 0.5em;
      }
      header>span>i {
        cursor: pointer;
      }
      .row {
        overflow: hidden;
        margin-bottom: 1em;
      }
    }
  }
  .search {
    margin-bottom: 1em;
  }
  .lang-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    margin: 50px 0;
  }
  .lang-setting-form {
    float: left;
    margin-top: 1em;
  }
  label.name {
    float:left;
    height: 20px;
    padding: 6px 12px;
  }
  /*.viewId, .bas-dis, .label-index{*/
    /*overflow: hidden;*/
    /*margin-top: 1em;*/
  /*}*/
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
    cursor: pointer;
  }
  .bottom {
    /*height: 500px;*/
    overflow: hidden;
  }
  .left {
    width: 45%;
    float: left;
    margin-right: 15px;
  }
</style>
