<template>
  <div class="user-info-dropdown">
    <label @click.stop="showSettings"><span>{{username}}</span><i class="fa fa-caret-down"></i></label>
    <ul v-if="opend">
      <li v-for="value in lis">
        {{ value }}
      </li>
      <li><router-link to="/">退出</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'UserInfoDropdown',
    data: function () {
      return {
        username: '胡 俊',
        opend: false,
        lis: {
          name1: '修改姓名',
          name2: '修改信息',
          name3: '设置'
        }
      }
    },
    methods: {
      showSettings () {
        if (this.opend) {
          this.opend = false
        } else {
          this.opend = true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-info-dropdown {
    width: 100%;
    letter-spacing: 4px;
    label {
      display: inline-block;
      width: 100%;
      margin-bottom: 0.5em;
    }
    ul {
      width: 5.5em;
      background: #fff;
      li {
        width: 5.5em;
        text-align: center;
        padding: 0.5em 0;
        cursor: pointer;
      }
      li:hover {
        background: #148fce;
      }
    }
    i {
      float: right;
    }
  }
</style>
