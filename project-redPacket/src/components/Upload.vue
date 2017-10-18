<template>
  <span class="file">选择文件
    <input type="file" name="" id="" ref="file" @change="upload">
  </span>
</template>
<script>
export default {
  name: 'Upload',
  props: {},
  data: function () {
    return {
    }
  },
  computed: {
    fileList () {
      return this.$refs.file.files
    }
  },
  methods: {
    upload (ev) {
      console.log(ev.target.files)
    }
  }
}
</script>
<style>
  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
    cursor: pointer;
  }
</style>


