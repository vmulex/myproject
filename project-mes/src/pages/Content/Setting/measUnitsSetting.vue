<template>
  <div class="lang-setting">
    <div class="lang-setting-table">
      <div class="search">
         <label>计量单位维护</label>
         <input type="text">
         <z-button tittle="查询"></z-button>
      </div>
      <div class="save" style="overflow: hidden">
        <z-button :tittle="button1" @click.native="insertLang" style="float: right;margin-left:1em"></z-button>
        <z-button :tittle="button2" @click.native="insertLang" style="float: right"></z-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .lang-setting {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 16px;
  }
  .search {
    margin-bottom: 1em;
  }
  .lang-setting-table {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    margin: 50px 0;
  }
  .lang-setting-form {
    margin-top: 1em;
  }
  label.name {
    float:right;
    height: 20px;
    padding: 6px 12px;
  }
  .left, .right {
    float: left;
    width: 50%;
    height: 50%;
  }
  .lang, .viewId, .bas-dis, .component-index, .desc {
    overflow: hidden;
    margin-top: 1em;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
    cursor: pointer;
  }
  .sumOrNot, .numOrNot {
    float: left;
    width: 50%;
  }
  .sumName, .nunName {
    display:inline-block;
    height: 20px;
    padding: 6px 12px 6px 6px;
  }
</style>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  export default {
    name: 'LangType',
    components: {
      ZButton
    },
    data: function () {
      return {
        tableData: [{
        }]
      }
    },
    methods: {
      showInfo (row) {
        this.currentRow = row
      },
      insertLang: function () {
        let index = this.tableData.length + 1
        // 是否显示金额和数量
        let insertData = {
          index: index,
          lang: this.$refs.lang.value,
          viewId: this.$refs.viewId.value,
          componentIndex: this.$refs.componentIndex.value,
          basDesc: this.$refs.basDesc.value,
          desc: this.$refs.desc.value
        }
        this.tableData.push(insertData)
      },
      getSumValue: function (ev) {
        this.sum = ev.target.value
      },
      getNumValue: function (ev) {
        this.num = ev.target.value
      }
    }
  }
</script>
