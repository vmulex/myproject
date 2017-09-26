<template>
  <div class="factory-setting">
    <div class="factory-setting-table">
      <div class="search">
         <label>工厂描述</label>
         <input type="text" v-model="searchKeyword">
         <z-button tittle="查询" @click.native="search()"></z-button>
      </div>
      <el-table
        :data="listFactorise"
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
        <!--<el-table-column-->
          <!--prop="lang"-->
          <!--label="语言编号"-->
          <!--width="100">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="factoryIndex"
          label="工厂编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="工厂描述"
          width="140">
        </el-table-column>
         <el-table-column
          prop="contacts"
          label="联系人"
          width="80">
        </el-table-column>
         <el-table-column
          prop="address"
          label="工厂地址"
          width="220">
        </el-table-column>
         <el-table-column
          prop="phonenumber"
          label="联系电话">
        </el-table-column>
      </el-table>
      <div class="factory-setting-form">
        <div class="left">
          <!--<div class="lang">-->
            <!--<input type="text" name="" ref="lang" style="float:right;width: 12em" :value="currentRow.lang">-->
            <!--<label class="name">语言编号：</label>-->
          <!--</div>-->
          <div class="factory-index">
            <input type="text" name="" ref="factoryIndex" style="float:right;width: 12em" v-model="factoryIndex">
            <label class="name">工厂编号：</label>
          </div>
        </div>
        <div class="middle">
          <div class="desc">
            <input type="text" name="" ref="desc" style="float:right;width: 12em" v-model="desc">
            <label class="name">工厂描述：</label>
          </div>
          <div class="contacts">
            <input type="text" name="" ref="contacts" style="float:right;width: 12em" v-model="contacts">
            <label class="name">联系人：</label>
          </div>
        </div>
        <div class="right">
          <div class="phonenumber">
            <input type="text" name="" ref="phonenumber" style="float:right;width: 12em" v-model="phonenumber">
            <label class="name">联系电话：</label>
          </div>
          <div class="legalPerson">
            <input type="text" name="" ref="legalPerson" style="float:right;width: 12em" v-model="legalPerson">
            <label class="name">法人姓名：</label>
          </div>
        </div>
        <div class="bottom">
          <div class="address">
            <label class="namebottom">工厂地址：</label>
            <input type="text" name="" ref="address" style="float:left;" v-model="address">
          </div>
          <div class="administrator">
            <label class="namebottom">管理用户名：</label>
            <input type="text" name="" ref="administrator" style="float:left" v-model="administrator">
          </div>
        </div>
        <div class="save" style="overflow: hidden">
          <z-button :tittle="tittle1" @click.native="insertFactory()" style="float: right;margin-right: 2em"></z-button>
          <z-button :tittle="tittle2" @click.native="newMute()" style="float: right;margin-right: 2em"></z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'FactorySetting',
    components: {
      ZButton
    },
    data: function () {
      return {
        tittle1: '保存',
        tittle2: '新增',
        searchKeyword: '',
        listFactorise: [],
        muteId: '',
        factoryIndex: '',
        desc: '',
        legalPerson: '',
        contacts: '',
        address: '',
        phonenumber: '',
        administrator: ''
      }
    },
    methods: {
      showInfo (row) {
        this.factoryIndex = row.factoryIndex
        let muteSelected = this.listFactorise.filter((element) => {
          return element.factoryIndex === row.factoryIndex
        })
        this.muteId = muteSelected[0].muteId
        this.desc = muteSelected[0].desc
        this.legalPerson = muteSelected[0].legalPerson
        this.contacts = muteSelected[0].contacts
        this.address = muteSelected[0].address
        this.phonenumber = muteSelected[0].phonenumber
        this.administrator = muteSelected[0].administrator
      },
      newMute: function () {
        this.muteId = ''
        this.factoryIndex = ''
        this.desc = ''
        this.legalPerson = ''
        this.contacts = ''
        this.address = ''
        this.phonenumber = ''
        this.administrator = ''
      },
      insertFactory: function () {
//        let _this = this
        let insertData = {
          muteId: this.muteId,
          factoryIndex: this.factoryIndex,
          desc: this.desc,
          legalPerson: this.legalPerson,
          contacts: this.contacts,
          address: this.address,
          phonenumber: this.phonenumber,
          administrator: this.administrator
        }
        this.axios({
          method: 'post',
          url: url + '/mute/addObj',
//          url: 'apis/mute/addObj',
          data: {
            muteId: insertData.muteId,
            muteCode: insertData.factoryIndex,
            muteDescribe: insertData.desc,
            muteLinkman: insertData.contacts,
            juridicalPerson: insertData.legalPerson,
            linkmanPhone: insertData.phonenumber,
            muteAddress: insertData.address,
            administrator: insertData.administrator,
            muteAdmin: 'COMPT00031'
          }
        })
          .then(function (response) {
            console.log('seccess')
          }).catch(function (fail) {
            console.log(fail)
          })
      },
      search: function () {
        let _this = this
        this.axios({
          method: 'get',
          url: url + '/mute/getList',
//          url: '/apis/mute/getList',
          params: {
            muteCode: _this.searchKeyword,
            muteDescribe: _this.searchKeyword
          }
        })
          .then(function (response) {
//            console.log(JSON.parse(response.data.data))
            _this.listFactorise = JSON.parse(response.data.data).map((element, index) => {
              return {
                index: (index + 1) + '',
                muteId: element.muteId,
                factoryIndex: element.muteCode,
                desc: element.muteDescribe,
                legalPerson: element.juridicalPerson,
                contacts: element.muteLinkman,
                address: element.muteAddress,
                phonenumber: element.linkmanPhone
//                administrator: element.administrator
              }
            })
          }).catch(function (fail) {
            console.log(fail)
          })
      }
    }
  }
</script>
<style scoped>
  .factory-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 1em 0;
    font-size: 15px;
  }
  .search {
    margin-bottom: 1em;
  }
  .factory-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 860px;
    margin: 50px 0;
  }
  .factory-setting-form {
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
  .bottom {
    width: 100%;
    overflow: auto;
  }
  .lang, .factory-index, .legalPerson, .contacts, .phonenumber, .desc {
    overflow: hidden;
    margin-bottom: 1em;
  }
  .address, .administrator {
    float: left;
    overflow: hidden;
    margin-bottom: 1em;
  }
  .administrator {
    margin-left: 5em;
  }
  label.name {
    float:right;
    height: 20px;
    padding: 6px 0px;
  }
  label.namebottom {
    float:left;
    height: 20px;
    padding: 6px 0px;
  }
</style>
