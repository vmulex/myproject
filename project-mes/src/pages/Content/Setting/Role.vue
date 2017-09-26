<template>
  <div class="role-setting">
    <div class="role-index">
      <label>角色编号</label>
      <input type="text" name="" ref="roleIndex" v-model="roleIndex">
    </div>
    <div class="role-desc">
      <label>角色描述</label>
      <input type="text" name="" ref="roleDesc" v-model="roleDesc">
    </div>
    <div class="forbidden">
      <label class="name" style="padding-right: 6px">是否禁用： </label>
      <span class="info">
        <label for="roleforbiddenYES">是</label>
        <input id="roleforbiddenYES" type="radio" name="forbidden" value="COMPT000122" v-model="forbidden">
        <label for="roleforbiddenNO">否</label>
        <input id="roleforbiddenNO" type="radio" name="forbidden" value="COMPT000121" v-model="forbidden">
      </span>
    </div>
    <div class="save" style="overflow: hidden">
      <z-button :tittle="button" @click.native="insertRole" style="float: right"></z-button>
    </div>
  </div>
</template>
<script>
  import ZButton from '../../Index/components/ZButton.vue'
  import url from '../../../pages/urlConfig'
  export default {
    name: 'Role',
    props: ['role-index', 'role-desc', 'forbidden'],
    data: function () {
      return {
        button: '保存',
        tableData: []
      }
    },
    components: {
      ZButton
    },
    methods: {
      insertRole: function () {
        let insertData = {
          roleIndex: this.$refs.roleIndex.value,
          roleDesc: this.$refs.roleDesc.value,
          forbidden: this.forbidden
        }
        let _this = this
        this.axios({
          method: 'post',
          url: url + '/role/addObj',
//          url: '/apis/role/addObj',
          data: {
            muteOrganId: 'COMPT00211',
            roleCode: insertData.roleIndex,
            roleDescribe: insertData.roleDesc,
            roleStatus: insertData.forbidden
          }
        })
          .then(function (response) {
            _this.$store.dispatch('refreshRole')
            console.log('success')
          })
          .catch(function (fail) {
            console.log(fail)
          })
      }
    }
  }
</script>
<style>
  .role-setting {
    margin: 50px 150px 0 50px;
  }
  .role-index, .role-desc, .forbidden {
    overflow: hidden;
    margin-bottom: 1em;
  }
  label.name {
    float:left;
    height: 20px;
    padding: 6px 0;
  }
  span.info {
    float: left;
    width: 14em;
    padding: 6px 0px;
    margin-right: 1.5em;
  }
  input[type='radio'] {
    box-shadow: none;
    height: 15px;
    width: 18px;
  }
</style>
