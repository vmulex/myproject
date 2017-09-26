<template>
  <div id="window">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {

    },
    created: function () {
      let menu = sessionStorage.getItem('menuInfo')
      this.$store.state.MENU = JSON.parse(menu).menu
    }
  }
</script>

<style>
#window {
  height: 100%;
}
</style>
