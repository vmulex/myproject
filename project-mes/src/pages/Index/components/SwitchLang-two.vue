<template>
  <div class="switch-lang">
    <span :class="{active: ch}" @click="chooseLang('ch')">中文</span><span :class="{active: en}" @click="chooseLang('en')">English</span>
  </div>
</template>

<script>
  export default {
    name: 'SwitchLang',
    data: function () {
      return {
        ch: true,
        en: false
      }
    },
    methods: {
      chooseLang (lang) {
        if (lang === 'ch') {
          this.ch = true
          this.en = false
        } else {
          this.en = true
          this.ch = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .switch-lang {
    width: 100%;
  }
  .switch-lang span {
    padding: 0 1em;
    cursor: pointer;
  }
  .switch-lang span:nth-of-type(1) {
    border-right: 1px solid black;
  }
  .active {
    color: #148fce;
  }
</style>
