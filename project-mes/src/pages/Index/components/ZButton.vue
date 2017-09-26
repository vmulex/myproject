<template>
  <button>{{ tittle }}</button>
</template>
<style scoped>
  button{
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5em;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
    outline: none; 
  }
</style>
<script>
  export default {
    name: 'Button',
    props: ['tittle']
  }
</script>