<template>
  <div class="header-info">
    <div class="wrapper">
      <label class="icon"></label>
      <span class="username">{{ userName }}</span>
      <div style="float:left;height: 3.5em;width: 6em;">
        <div class="info-dropdown">
          <label @click.stop="showSettings"><span style="margin-left:8px">{{defaultLang}}</span><span class="icon"><i class="fa fa-caret-down"></i></span></label>
          <ul v-show="open" style="position:absolute;z-index: 9999;">
            <li v-for="(value, key) of listLang" @click="selectItem(key)" style="padding: 3px 20px;width: 6.5em">
              {{ value }}
            </li>
          </ul>
        </div>
        <div @click="showChangePwd()" style="width: 6em;text-align: center;margin-top: 5px;"><label class="change-pwd">切换语言</label></div>
      </div>
      <button @click="logOut">{{ $t('hello') }}</button>
    </div>
  </div>
</template>

<script>
  import Dropdown from './DropDown.vue'
  import url from '../../../pages/urlConfig'

  export default {
    name: 'HeaderInfo',
    created: function () {
      let _this = this
      _this.axios({
        method: 'get',
        url: url + '/usr/current',
//        url: '/apis/usr/current',
        params: {
          muteOrganId: 'COMPT00211'
        }
      })
        .then(function (response) {
//          console.log(response)
          _this.userName = JSON.parse(response.data.data).userName
        }).catch(function (fail) {
          console.log(fail)
        })
    },
    components: {
      Dropdown
      // UserIcon,
      // SwitchLang
    },
    data: function () {
      return {
        open: false,
        userName: '',
        buttonTittle: '退出',
        defaultLang: '语言',
        listLang: {
          'COMPT000170': '英文',
          'COMPT0001217': '中文'
        }
      }
    },
    methods: {
      logOut: function () {
        location.href = './login.html'
      },
      showChangePwd: function () {
        // this.$store.state.changePwdStatus = true
        localStorage.setItem('lang', 'zh-CN')
        location.href = './index.html'
      },
      showSettings () {
//        this.$store.state.rootOpen = true
        this.open = !this.open
      },
      selectItem (langId) {
        console.log(langId)
        this.$store.state.languageId = langId
        this.open = false
        this.$store.dispatch('switchLang', langId)
      }
    }
  }
</script>

<style lang="less">
  .header-info {
    position: relative;
    height: 100%;
    width: 20em;
    div.wrapper {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      height: 3.5em;
      label.icon {
        float: left;
        width: 3.5em;
        height: 3.5em;
        border-radius: 100%;
        background-image: url('../../../assets/icon.jpg');
        background-size: cover;
      }
      span.username {
        /*display: inline-block;*/
        float: left;
        width: 5em;
        height: 3.5em;
        line-height: 3.5em;
        font-weight: 700;
        text-align: center;
        vertical-align: top;
      }
      .change-pwd {
        cursor: pointer;
      }
      .change-pwd:hover {
        color: #5bc0de
      }
      button {
        display: inline-block;
        width: 4em;
        height: 2.5em;
        padding: 0.1em 1em;
        margin-top: 0.5em;
        margin-left: 1em;
        font-weight: 400;
        line-height: 1.5em;
        text-align: center;
        vertical-align: top;
        white-space: nowrap;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
        outline: none;
        cursor: pointer;
      }
    }
  }
</style>
