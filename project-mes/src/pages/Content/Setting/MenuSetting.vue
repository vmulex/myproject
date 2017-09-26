<template>
  <div class="menu-setting">
    <div>
      <div class="menu-show">
        <menu-show :data="theData" type="menu"></menu-show>
      </div>
      <div class="menu-edit">
        <menu-edit @showPop="showBasicLangPop" :basicLang="basLangDescShowing" :basicLangId="basLangDescShowingId"></menu-edit>
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
  </div>
</template>
<script>
  import MenuShow from './MenuShow.vue'
  import MenuEdit from './MenuEdit.vue'
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'MenuSetting',
    created: function () {
      this.$store.dispatch('refreshMenu', this.languageId)
    },
    components: {
      MenuShow,
      MenuEdit,
      ZButton
    },
    data: function () {
      return {
        basLangPopStatus: false,
        basLangDesc: '',
        basLangDescShowing: '',
        basLangDescShowingId: '',
        basicLangData: []
      }
    },
    computed: {
      theData: function () {
//        console.log(this.$store.state.menuTree)
        return this.$store.state.menuTree
      },
      languageId: function () {
        return this.$store.state.languageId
      }
    },
    methods: {
      showBasicLangPop: function () {
        this.basLangPopStatus = true
      },
      insertBasicLang: function () {
        this.$store.state.basiLangMenu = this.basLangDesc
        this.basLangDescShowingId = this.basLangId
        this.basLangPopStatus = false
      },
      clearBasicLang: function () {
        this.basLangPopStatus = false
      },
      cancelBasLang: function () {
        this.basLangPopStatus = false
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
      }
    }
  }
</script>
<style scoped lang="less">
  .menu-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
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
  .menu-setting>div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
/*    height: 80%;*/
    margin: 50px 0;
  }
  .menu-show {
    float: left;
    margin-left: 50px;
    width: 425px;
    height: 595px;
    border: 5px solid #148fce;
    overflow: auto;
  }
  .menu-edit {
    float: left;
    width: 565px;
    height: 595px;
    border: 5px solid #148fce;
    margin-left: 50px;
  }

</style>
