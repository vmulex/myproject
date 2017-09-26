<template>
  <div class="lang-type">
    <div class="lang-type-table">
      <el-table
        :data="tableData"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="lang"
          label="语言编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="语言描述">
        </el-table-column>
      </el-table>
      <div class="lang-type-form">
        <div class="langId" style="height:3em;z-index: 100">
          <label class="name">语言编号： </label>
          <div class="info-dropdown" style="width: 15em;background: #286090;border: 1px solid #286090;border-radius:4px;margin-right: 1.5em">
            <label @click.stop="showLang"><span style="margin-left:8px" ref="lang">{{ lang }}</span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
            <ul v-show="langOpened" style="position: absolute;height: 150px;overflow: auto">
              <li v-for="value of listLang" @click="selectLang">
                {{ value.lang }}
              </li>
            </ul>
          </div>
        </div>
        <div class="relPath" style="height: 3em">
          <label class="name">语言描述： </label>
          <label class="name" ref="desc">{{ desc }}</label>
        </div>
        <z-button :tittle="tittle" @click.native="insertLang" style="float: right"></z-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .lang-type {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
    font-size: 16px;
  }
  .lang-type-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28%;
    height: 80%;
  }
  .lang-type-form {
    margin-top: 3em;
  }
  label.name {
    float:left;
    height: 20px;
    padding: 6px 12px;
  }
  ul {
    width: 15em;
  }
</style>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'LangType',
    created: function () {
      let _this = this
      this.refresh()
      this.axios({
        method: 'get',
        url: url + '/dic/langs'
//        url: '/apis/dic/langs'
      })
        .then(function (response) {
          _this.listLang = JSON.parse(response.data.data).map((element) => {
            return {
              lang: element.dictionaryCode,
              desc: element.dictionaryName,
              languageId: element.dictionaryId
            }
          })
        })
        .catch(function (fail) {
          console.log(fail)
        })
    },
    components: {
      ZButton
    },
    data: function () {
      return {
        tittle: '保存',
        lang: '',
        desc: '',
        languageId: '',
        listLang: [],
        langOpen: false,
        tableData: []
      }
    },
    computed: {
      langOpened () {
        return this.$store.state.rootOpen ? this.langOpen : false
      }
    },
    methods: {
      showLang () {
        this.$store.state.rootOpen = true
        this.langOpen = !this.langOpen
      },
      selectLang (ev) {
        let lang = ev.target.innerText
        this.lang = lang
        this.desc = this.listLang.filter((element) => element.lang === lang)[0].desc
        this.languageId = this.listLang.filter((element) => element.lang === lang)[0].languageId
      },
      refresh: function () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/lang/getList',
//          url: '/apis/lang/getList',
          params: {
            muteOrganId: 'COMPT00211'
          }
        })
          .then(function (response) {
            _this.tableData = JSON.parse(response.data.data).map((element, index) => {
              return {
                index: (index + 1) + '',
                lang: element.language.dictionaryCode,
                desc: element.language.dictionaryName,
                languageId: element.languageId
              }
            })
          })
          .catch(function (fail) {
            console.log(fail)
          })
      },
      insertLang: function () {
        console.log(222)
        let _this = this
        this.axios({
          method: 'post',
          url: url + '/lang/addObj',
//          url: 'apis/lang/addObj',
          data: {
            sysId: 'COMPT000110',
            languageId: _this.languageId,
            muteOrganId: 'COMPT00211'
          }
        })
          .then(function (response) {
            _this.refresh()
          }).catch(function (fail) {
            console.log(fail)
          })
      }
    }
  }
</script>
