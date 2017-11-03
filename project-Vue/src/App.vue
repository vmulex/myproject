<template>
  <div id="app">
    <div class="menu">
      <router-link to="/">首页</router-link>
      <router-link to="/go">Go</router-link>
      <router-link to="/Test1">Test1</router-link>
    </div>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
