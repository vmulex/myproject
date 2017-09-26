<template>
  <div id="layout" @click="withdraw">
    <div id="all-wrapper">
      <layout-header></layout-header>
      <layout-content></layout-content>
      <layout-footer></layout-footer>
    </div>
    <div class="shape" v-show="pwdChange"></div>
    <div class="changePwd"  v-show="pwdChange">
      <header><span style="float: right"><i class="fa fa-close fa-lg" @click="cancelChangePwd()"></i></span></header>
      <div class="input-wrapper">
        <div class="origin-password">
          <input id="origin" class="info" type="password" v-model="originPwd" autofocus>
          <label class="name">原始密码： </label>
        </div>
        <div class="msg-origin-password"><span>{{ errOriginPwd }}</span></div>
        <div class="new-password">
          <input id="new" class="info" type="password" v-model="newPwd">
          <label class="name">新密码： </label>
        </div>
        <div class="msg-new-password"><span></span></div>
        <div class="confirm-password">
          <input id="confirm" class="info" type="password" v-model="confirmNewPwd">
          <label class="name">确认密码： </label>
        </div>
        <div class="msg-confirm-password"><span>{{ errFail }}</span></div>
        <div class="confirm-cancel">
          <z-button :tittle="tittleConfirm" @click.native="changePwd()" style="float:left;margin-left: 5em"></z-button>
          <z-button :tittle="tittleCancel" @click.native="cancelChangePwd()" style="float:right;margin-right: 5em"></z-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutContent from './components/LayoutContent.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import ZButton from './components/ZButton.vue'
import url from '../urlConfig'

export default {
  name: 'index',
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
    ZButton
  },
  data: function () {
    return {
      tittleConfirm: '确定',
      tittleCancel: '取消',
      originPwd: '',
      newPwd: '',
      confirmNewPwd: '',
      errOriginPwd: '',
      errFail: ''
    }
  },
  computed: {
    pwdChange () {
      return this.$store.state.changePwdStatus
    }
  },
  methods: {
    withdraw: function () {
      this.$store.dispatch('closedropDown')
    },
    cancelChangePwd: function () {
      this.$store.state.changePwdStatus = false
    },
    changePwd: function () {
      let _this = this
      if (_this.originPwd === '') {
        _this.errOriginPwd = '初始密码不能为空'
        return
      }
      if (_this.newPwd !== _this.confirmNewPwd) {
        _this.errFail = '设置密码不一致，请重新设置'
        return
      }
      _this.axios({
        method: 'post',
        url: url + '/usr/chgPwd',
//        url: '/apis/usr/chgPwd',
        data: {
          userPasswd: _this.confirmNewPwd
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (fail) {
          console.log(fail)
        })

      this.$store.state.changePwdStatus = false
    }
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/
  #layout {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #all-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .shape {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #d1dbe5;
    opacity: 0.5;
  }
  .changePwd {
    position: absolute;
    width: 500px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #5bc0de;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .changePwd>header {
    height: 2.5em;
    margin-bottom: 3em;
    background-color: #5bc0de;
  }
.changePwd>header>span {
  line-height: 2em;
  margin-right: 0.5em;
}
  .changePwd>header>span>i {
    cursor: pointer;
  }
  .changePwd>.input-wrapper {
    position: absolute;
    width: 351px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
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
  div.origin-password, div.new-password, div.confirm-password {
    /*width: 100%;*/
    margin: 0 50px;
    overflow: hidden;
    margin: 0;
  }
  .msg-origin-password, .msg-new-password, .msg-confirm-password {
    width: 100%;
    overflow: hidden;
    height: 24px;
    line-height: 24px;
    color: red;
  }
  .msg-origin-password>span, .msg-new-password>span, .msg-confirm-password>span {
    float: right;
    width: calc(15em + 26px);
    margin-right: 1.5em;
  }
  .confirm-cancel {
    margin-top: 1.5em;
  }
</style>
