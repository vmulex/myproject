<template>
  <div id="Physical">
    <div class="left">
      <item :data="itemData1" style="z-index: 99;"></item>
      <item :data="itemData2" style="z-index: 98;"></item>
      <item :data="itemData3" style="z-index: 97;"></item>
      <item :data="itemData4" style="z-index: 96;"></item>
    </div>
    <div class="right">
      <div class="summary">
        <h2>Summary</h2>
        <table>
          <colgroup>
            <col width="50%">
            <col width="50%">
          </colgroup>
          <tbody>
            <tr>
              <td>building</td>
              <td>2</td>
            </tr>
            <tr>
              <td>idle</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="History">
        <div class="history">
          <h2>History</h2>
          <ul>
            <li v-for="value of history">bjstdmngbgr02/Acceptance_test</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Item from './Item.vue'
  export default {
    name: 'Physical',
    components: {
      Item
    },
    data: function () {
      return {
        history: [1, 2, 3, 4, 5, 6, 7, 8],
        itemData1: {
          info1: 'bjstdmngbgr02.thoughtworks.com',
          info2: 'idle',
          info3: '192.168.1.2',
          info4: '/var/lib/cruise-agent'
        },
        itemData2: {
          info1: 'bjstdmngbgr03.thoughtworks.com',
          info2: 'building',
          info3: '192.168.1.3',
          info4: '/var/lib/cruise-agent'
        },
        itemData3: {
          info1: 'bjstdmngbgr04.thoughtworks.com',
          info2: 'building',
          info3: '192.168.1.4',
          info4: '/var/lib/cruise-agent'
        },
        itemData4: {
          info1: 'bjstdmngbgr05.thoughtworks.com',
          info2: 'idle',
          info3: '192.168.1.5',
          info4: '/var/lib/cruise-agent'
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #Physical {
    width: 100%;
    height: 100%;
    .left {
      float: left;
      box-sizing: border-box;
      width: 75%;
      height: 600px;
      padding: 2em 2em;
      border-right: 1px solid black;
      overflow: auto;
    }
    .right {
      box-sizing: border-box;
      float: left;
      width: 25%;
      padding: 2em;
      .summary {
        h2 {
          padding-bottom: 15px;
        }
        table {
          width: 100%;
          border-top: 1px solid #929292;
          padding: 0 10px;
          border-spacing: 20px;
        }
      }
      .history {
        h2 {
          padding-top: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #929292;
        }
        ul {
          padding: 0 10px;
          li {
            padding-top: 20px;
          }
        }
      }
    }
  }
</style>
