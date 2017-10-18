<template>
  <div class="html5">
    <ul>
      <li class="placeholder">
        <div>
          <input type="text" name="" placeholder="Username">
        </div>
      </li>
      <li class="file-api">
        <upload></upload>
      </li>
    </ul>
  </div>
</template>
<script>
import Upload from './Upload'
export default {
  name: 'Index',
  components: {
    Upload
  }
}
</script>

<style lang="less" scoped>
  .html5 {
    width: 100%;
    height: 100%;
    ul {
      li {
        float: left;
        width: 300px;
        height: 300px;
        margin-right: 1em;
        border: 1px solid #cccccc
      }
    }
  }
</style>