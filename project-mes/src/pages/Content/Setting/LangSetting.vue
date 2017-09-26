<template>
  <div class="lang-setting">
    <div class="lang-setting-table">
      <div class="search">
         <label>界面ID</label>
         <input type="text" v-model="pageIdSearch">
         <z-button tittle="查询" @click.native="searchLabel"></z-button>
      </div>
      <div class="bottom">
        <div class="left">
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
              prop="pageId"
              label="窗口ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="labelIndex"
              label="标签编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="basDesc"
              label="基础语言描述">
            </el-table-column>
          </el-table>
        </div>
        <div class="lang-setting-form">
          <div style="overflow: hidden">
            <span>界面信息</span>
            <div class="viewId">
              <label class="name">界面ID：</label>
              <input type="text" name="" ref="pageId" style="float:left;width: 12em" v-model="pageId">
            </div>
            <div class="label-index">
              <label class="name">标签编号：</label>
              <input type="text" name="" ref="labelIndex" style="float:left;width: 12em" v-model="labelIndex">
            </div>
            <div class="bas-dis">
              <label class="name">基础语言描述：</label>
              <span class="bas-lang-des">{{ basLangDescShowing }}</span>
              <button @click="showBasLang">选择</button>
            </div>
            <!--<div class="sumOrNot" ref="sumOrNot">-->
              <!--<label class="sumName">是否显示金额：</label>-->
              <!--<label for="sumYES">是</label>-->
              <!--<input id="sumYES" type="radio" name="sumOrNot" value="是" v-model="sum">-->
              <!--<label for="sumNO">否</label>-->
              <!--<input id="sumNO" type="radio" name="sumOrNot" value="否" v-model="sum"/>-->
            <!--</div>-->
            <!--<div class="numOrNot" ref="numOrNot">-->
              <!--<label class="nunName">是否显示数量：</label>-->
              <!--<label for="numYES">是</label>-->
              <!--<input id="numYES" type="radio" name="numOrNot" value="是" v-model="num">-->
              <!--<label for="numNO">否</label>-->
              <!--<input id="numNO" type="radio" name="numOrNot" value="否" v-model="num"/>-->
            <!--</div>-->
          </div>
          <div class="save" style="overflow: hidden;margin-top: 1em">
            <z-button :tittle="button1" @click.native="insertLang" style="float: right;margin-left:1em"></z-button>
          </div>
        </div>
      </div>
    </div>
    <div class="basLangPop" v-show="basLangPopStatus">
      <header><span style="float: right"><i class="fa fa-close fa-lg" @click="cancelBasLang"></i></span></header>
      <div style="padding: 2em">
        <div class="search">
          <label>基础语言描述</label>
          <input type="text" v-model="basLangDesc">
          <z-button tittle="查询" @click.native="searchText"></z-button>
        </div>
        <div>
          <el-table
            :data="basicLangData"
            height="300"
            border
            highlight-current-row
            @row-click="selectDesLang"
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
        </div>
        <div class="save" style="overflow: hidden;margin-top: 1em">
          <z-button tittle="确定" @click.native="insertBasicLang" style="float: left;margin-left:1em"></z-button>
          <z-button tittle="取消" @click.native="clearBasicLang" style="float: right;margin-left:1em"></z-button>
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
        button1: '保存',
        button2: '导入',
        basLangDescShowing: '',
        basLangDescShowingId: '',
        basLangPopStatus: false,
//        sum: '',
//        num: '',
        pageIdSearch: '',
        pageId: '',
        labelIndex: '',
        basLangDesc: '',
        basLangId: '',
        basLangDescPop: '',
        basicLangData: [],
        tableData: []
      }
    },
    methods: {
      showInfo (row) {
        this.labelIndex = row.labelIndex
        let labelSelected = this.tableData.filter((element) => {
          return element.labelIndex === row.labelIndex
        })
        console.log(labelSelected[0])
        this.pageId = labelSelected[0].pageId
        this.labelIndex = labelSelected[0].labelIndex
        this.basLangDescShowing = labelSelected[0].basDesc
//        this.sum = labelSelected[0].sum
//        this.num = labelSelected[0].num
      },
      cancelBasLang: function () {
        this.basLangPopStatus = false
      },
      showBasLang: function () {
        this.basLangPopStatus = true
      },
      searchLabel () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/res/labels',
//          url: '/apis/res/labels',
          params: {
            pageId: _this.pageIdSearch,
            languageId: 'COMPT0001217',
            muteOrganId: 'COMPT00211'
          }
        })
          .then(function (response) {
            console.log(JSON.parse(response.data.data))
            _this.tableData = JSON.parse(response.data.data).map((element, index) => {
              return {
                index: (index + 1) + '',
                pageId: _this.pageIdSearch,
                labelIndex: element.resourceCode,
                basDesc: element.resourceDescribe
//                sum: element.sum,
//                num: element.num
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
            dictionaryDescribe: this.basLangDesc
          }
        })
          .then(function (response) {
            _this.basicLangData = JSON.parse(response.data.data).map((element, index) => {
              return {
                index: (index + 1) + '',
                dictionaryDescribe: element.dictionaryDescribe,
                dictionaryId: element.dictionaryId
              }
            })
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      selectDesLang: function (row) {
        this.basLangDesc = row.dictionaryDescribe
        this.basLangId = row.dictionaryId
      },
      insertLang: function () {
        let insertData = {
          pageId: this.pageId,
          labelIndex: this.labelIndex,
          basDesc: this.basLangDescShowing,
          basDescId: this.basLangDescShowingId
        }
        this.axios({
          method: 'post',
          url: url + '/res/addLabels',
//          url: '/apis/res/addLabels',
          data: {
            attribute1: insertData.pageId,
            resourceCode: insertData.labelIndex,
            resourceDescribe: insertData.basDesc,
            muteOrganId: 'COMPT00211',
            resourceStatus: 'COMPT000121'
          }
        }).then(function (response) {
          console.log(response, 'seccess')
        })
      },
      insertBasicLang: function () {
        this.basLangDescShowing = this.basLangDesc
        this.basLangDescShowingId = this.basLangId
        this.basLangPopStatus = false
      },
      clearBasicLang: function () {
        this.basLangPopStatus = false
      }
    }
  }
</script>
<style scoped lang="less">
  .lang-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 16px;
    .basLangPop {
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
  .viewId, .bas-dis, .label-index{
    overflow: hidden;
    margin-top: 1em;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
    cursor: pointer;
  }
  .bottom {
    height: 500px;
    overflow: hidden;
  }
  .left {
    width: 45%;
    float: left;
    margin-right: 15px;
  }
  .sumOrNot, .numOrNot {
  }
  .sumName, .nunName {
    display:inline-block;
    height: 20px;
    padding: 6px 12px 6px 6px;
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
