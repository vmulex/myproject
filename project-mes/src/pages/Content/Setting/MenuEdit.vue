<template>
  <div class="menu-edit-form">
    <div class="menuId">
      <label class="info">{{ menuInfo.resourceCode }}</label>
      <label class="name">菜单编号：</label>
    </div>
    <div class="menuDesciption">
      <label style="padding: 6px 0;float: left">基础语言描述：</label>
      <span class="bas-lang-des">{{ basicLang }}</span>
      <button @click="showBasLang">选择</button>
    </div>
    <!--<div class="langId" style="z-index: 100">-->
      <!--<div class="info-dropdown" style="float:right;width: 15em;padding: 0 12px;background: #286090;border: 1px solid #286090;border-radius:4px;margin-right: 1.5em">-->
        <!--<label @click.stop="showLang"><span style="margin-left:8px" class="lang"></span><span class="icon"><i class="fa fa-caret-down"></i></span></label>-->
        <!--<ul style="position: absolute;height: 200px;overflow: auto;display: none">-->
          <!--<li v-for="value of listLang" @click="selectLang(value, $event)">-->
            <!--{{ value }}-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<label style="vertical-align: top;padding: 6px 0" class="name">基础语言描述： </label>-->
    <!--</div>-->
    <div class="relPath">
      <input type="text" name="" class="info" v-model="menuInfo.resourceUrl">
      <label class="name">相对路径： </label>
    </div>
    <div class="pageID">
      <input type="text" name="" class="info" v-model="menuInfo.resourceName">
      <label class="name">界面ID： </label>
    </div>
    <div class="forbidden">
      <span class="info">
        <label for="forbiddenYES">是</label>
        <input id="forbiddenYES" type="radio" name="forbidden" value="COMPT000122" v-model="resourceStatus">
        <label for="forbiddenNO">否</label>
        <input id="forbiddenNO" type="radio" name="forbidden" value="COMPT000121" v-model="resourceStatus">
      </span>
      <label class="name">是否禁用： </label>
    </div>
    <div class="permission-table">
      <div class="add-row">
        <button @click="addRow">新增行</button>
      </div>
      <div class="header-wrapper">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="80px">
            <col width="125px">
            <col>
          </colgroup>
          <thead>
            <th><div class="cell">序号</div></th>
            <th><div class="cell">菜单操作按钮</div></th>
            <th><div class="cell">相对路径</div></th>
          </thead>
        </table>
      </div>
      <div class="table-wrapper">
        <table cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="80px">
            <col width="125px">
            <col>
          </colgroup>
          <tbody>
            <tr v-for="(element, index) of tableData">
              <td><div class="cell">{{ element.index }}</div></td>
              <td>
                <div class="info-dropdown" style="width: 8em;font-size: 14px">
                  <label @click.stop="toggleButton"  ref="lang"><span style="margin-left:8px" class="button"></span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
                  <ul style="width: 140px;position:absolute;display: none">
                    <li v-for="value of allButtonsAuth" @click="selectButton(value.basLangDesc, $event)">
                      {{ value.basLangDesc }}
                    </li>
                  </ul>
                </div>
              </td>
              <td><input class="cell" :value="element.relPath" type="text"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="save">
      <z-button :tittle="buttonTittle" style="float:right;" @click.native="insertMenu();"></z-button>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'MenuEdit',
    props: ['basic-lang-id'],
    created: function () {
      this.$store.dispatch('refreshButton', this.languageId)
    },
    components: {
      ZButton
    },
    computed: {
      menuInfo () {
        return this.$store.state.menuInfo
      },
      allButtonsAuth () {
        return this.$store.state.buttonData
      },
      languageId: function () {
        return this.$store.state.languageId
      },
      basicLang: function () {
        return this.$store.state.basiLangMenu
      }
//      langOpened () {
//        return this.$store.state.rootOpen ? this.langOpen : false
//      }
    },
    data: function () {
      return {
        defaultLang: 'cn',
        listLang: [],
        buttonTittle: '保存',
        resourceStatus: 'COMPT000121',
        tableData: [{
          index: '1',
          menuButton: 'button1',
          relPath: ''
        }],
        defaultButtonAuth: '',
        langOpen: false,
        menuNameId: ''
      }
    },
    methods: {
      showBasLang (ev) {
        this.$emit('showPop')
      },
      getForbiddenValue (ev) {
        this.forbidden = ev.target.value
      },
      selectLang (val, ev) {
        ev.target.parentNode.parentNode.getElementsByClassName('lang')[0].innerText = val
        ev.target.parentNode.style.display = 'none'
      },
      selectButton (val, ev) {
        ev.target.parentNode.parentNode.getElementsByClassName('button')[0].innerText = val
        ev.target.parentNode.style.display = 'none'
      },
      addRow: function () {
        let index = this.tableData.length + 1
        let newButton = {
          index: index,
          menuButton: '',
          relPath: ''
        }
        this.tableData.push(newButton)
      },
      toggleButton (ev) {
        let dropItems = ev.currentTarget.nextElementSibling
        if (dropItems.style.display === 'block') {
          dropItems.style.display = 'none'
        } else {
          dropItems.style.display = 'block'
        }
      },
      insertMenu () {
        let _this = this
        let postMenu = {
          muteOrganId: 'COMPT00211',
          resourceType: _this.menuInfo.resourceType,
          resourceName: _this.menuInfo.resourceName,
          resourceDescribe: _this.basicLangId,   // getText 接口传
          resourceCode: _this.menuInfo.resourceCode,
          resourceLevel: _this.menuInfo.resourceLevel,
          resourceSort: _this.menuInfo.resourceSort,
          parentResource: _this.menuInfo.parentResource,
          resourceUrl: _this.menuInfo.resourceUrl,
          attribute1: _this.menuInfo.attribute1,
          resourceStatus: _this.resourceStatus === '正常' ? 'COMPT000121' : 'COMPT000122',   // 正常经常传id
          child: []
        }
        console.log(postMenu)
        _this.axios({
          method: 'post',
          url: url + '/res/addObj',
//          url: '/apis/res/addObj',
          data: postMenu
        })
          .then(function (response) {
//            console.log(response, 'success')
            _this.$store.dispatch('refreshMenu', _this.languageId)
          }).catch(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>
<style lang="less" scoped>
  .menu-edit-form {
    margin: 2em 15% 0 10%;
    font-size: 16px;
  }
  div.menuId, div.menuDesciption, div.langId {
    width: 100%;
    margin-bottom: 3%;
    overflow: hidden;
  }
  div.relPath, div.forbidden {
    width: 100%;
    margin-bottom: 3%;
    overflow: hidden;
  }
  div.pageID {
    margin-bottom: 3%;
    overflow: hidden;
  }
  label.name {
    float: right;
    height: 20px;
    padding: 6px 12px;
  }
  input.info {
    float: right;
    margin-right: 1.5em;
  }
  label.info {
    float: right;
    margin-right: 1.5em;
    width: 15em;
    height: 20px;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  span.info {
    float: right;
    width: 15em;
    padding: 6px 12px;
    margin-right: 1.5em;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
  }
  .add-row {
    font-size: 12px;
    button {
      padding: 5px 8px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #fff;
      background-color: #286090;
      outline: none;
      cursor: pointer;
    }
  }
  .save {
    margin-top:4%;
    overflow: hidden;
  }
  ul {
    width: 15em;
  }
  table {
    border-collapse: separate;
    border-color: grey;
  }
  div.cell {
    font-size: 14px;
    padding: 0 18px;
    line-height: 30px;
  }
  .header-wrapper>table {
    width: 100%;
    border-top: 1px solid #dfe6ec;
    border-left: 1px solid #dfe6ec;
  }
  .table-wrapper {
    position: relative;
    width: auto;
    overflow: auto;
    height: 130px;
    /*border-right: 1px solid #dfe6ec;*/
    border-left: 1px solid #dfe6ec;
    border-bottom: 1px solid #dfe6ec;
    table {
      width: 100%;
    }
  }
  .table-wrapper::after {
    content: '';
    position: absolute;
    background-color: #dfe6ec;
    z-index: 1;
    top: 0;
    right: 1px;
    width: 1px;
    height: 130px;
  }
  table {
    th {
      height: 40px;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      vertical-align: middle;
      background-color: #eef1f6;
    }
    td {
      height: 40px;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
      vertical-align: middle;
      input.cell {
        width: calc(~"100% - 36px");
        padding: 0 18px;
        border: none;
        box-shadow: none;
        line-height: 30px;
      }
    }
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
