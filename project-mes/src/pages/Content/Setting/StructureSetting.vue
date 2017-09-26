<template>
  <div class="structure-setting">
    <div class="structure-setting-table">
      <div class="structureShow">
        <label>租户组织架构(树型结构显示)</label>
        <div>
          <div class="left">
            <div class="menu-show-tree">
              <span v-show="!organTree">无数据显示</span>
              <ul v-for="menuItem in organTree">
                <sub-organ-tree :data="menuItem" type="organName"></sub-organ-tree>
              </ul>
            </div>
            <contextmenu v-show="contextmenuShow" :emit="bind" type="organ"></contextmenu>
          </div>
          <div class="right">
            <div class="row">
              <input type="text" name="" ref="organInfo" style="float:right;width: 12em" v-model="OrganInfo.organName">
              <label class="name">组织描述：</label>
            </div>
            <div class="save" style="overflow: hidden">
              <z-button tittle="保存" @click.native="editOrgan" style="float: left;margin-left:1em"></z-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import MenuShow from './MenuShow.vue'
  import SubOrganTree from './subOrganTree.vue'
  import Contextmenu from './Contextmenu.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'StructureSetting',
    created: function () {
      // 获取该用户所支配的所有工厂
      this.$store.dispatch('showOrganTree')
    },
    data: function () {
      return {
        button: '保存',
        organInfo: '',
        open: false,
        type: 'organ'
      }
    },
    computed: {
      opened: function () {
        return this.$store.state.rootOpen ? this.open : false
      },
      OrganInfo () {
        return this.$store.state.organSelectedData
      },
      contextmenuShow () {
        return this.$store.state.contextMenuInfo.showContext
      },
      organTree () {
        return this.$store.state.organTree
      },
      bind () {
        if (this.type === 'menu' || 'organ') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      showSettings () {
        this.$store.state.rootOpen = true
        this.open = !this.open
      },
      selectItem (ev, structure) {
        this.defaultFactory = ev.target.innerText
        this.theData = structure
      },
      editOrgan () {
        let _this = this
        let organInfoPost = {
          muteOrganId: 'COMPT00211',
          organName: this.OrganInfo.organName,
          organCode: this.OrganInfo.organCode,
          organLevel: this.OrganInfo.organLevel,
          organSort: this.OrganInfo.organSort,
          parentOrgan: this.OrganInfo.parentOrgan,
          organId: this.OrganInfo.organId,
          child: []
        }
        console.log(organInfoPost)
        _this.axios({
          method: 'post',
          url: url + '/org/addObj',
//          url: '/apis/org/addObj',
          data: organInfoPost
        })
          .then(function (response) {
            console.log(response, 'success')
            _this.$store.dispatch('showOrganTree')
          })
          .catch(function (fail) {
            console.log(fail)
          })
      }
    },
    components: {
      ZButton,
      MenuShow,
      SubOrganTree,
      Contextmenu
    }
  }
</script>
<style scoped>
  .left {
    float: left;
    width: 45%;
  }
  .right {
    float: left;
    width: 50%;
  }
  .row {
    overflow: hidden;
    margin-top: 10em;
    margin-bottom: 1em;
  }
  .structure-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
  }
  .structure-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35%;
    margin: 50px 0;
  }
  .factory {
    position: relative;
    width: 100%;
    height: 3em;
    margin-top: 1em;
    z-index: 200;
    font-size: 16px;
  }
  .factory>label {
    float: left;
    padding: 6px 12px;
  }
  .factory>div>label {
    display: inline-block;
    width: 100%;
    line-height: 1.8em;
    height: 1.8em;
    text-align: center;
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
    border-radius: 4px;
    cursor: pointer;
  }
  .factory>div>ul {
    width: 13em;
    position: absolute;
    display: block;
    height: 150px;
    line-height: 1.8em;
    overflow: auto;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }
  .factory>div>ul>li {
    padding: 3px 20px;
    text-align: center;
    line-height: 1.42857143;
    color: #333;
    cursor: pointer;
  }
  .factory>div>ul>li:hover {
    background-color: #148fce;
  }
  .icon {
    float: right;
    margin-right: 8px;
  }
  .structureShow {
    position: relative;
    z-index: 98;
  }
  .structureShow>label {
    display: block;
    height: 1em;
    padding-bottom: 1em;
  }
  .structureShow>div{
    height: 35em;
    border: 5px solid #148fce;
    overflow: auto;
  }
</style>
