<template>
  <div id="Item">
    <div class="left">
      <span></span>
    </div>
    <div class="middle">
      <div class="top">
        <span style="padding-right: 25px;border-right: 1px solid #929292">{{data.info1}}</span>
        <span style="padding: 0 10px;border-right: 1px solid #929292">{{data.info2}}</span>
        <span style="padding: 0 15px;border-right: 1px solid #929292">{{data.info3}}</span>
        <span style="padding-left: 15px">{{data.info4}}</span>
      </div>
      <div class="bottom">
        <span style="vertical-align: top">+</span>
        <span class="add-resource" @click="showPop">Specify Resources</span>
        <span style="padding-left:5px;vertical-align: top">Resources:</span>
        <ul>
          <li v-for="(value, index) of resourcesShowing">
            <label>{{value}}</label>
            <span class="remove-label" @click="removeResource(index)">×</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <span>Deny</span>
    </div>
    <div class="popup-add" v-show="popShow">
      <div class="content">
        <div>(separate multiple resources name with commas)</div>
        <input type="text" v-model="resourcesAdding">
        <button class="button-add" @click="addResources">Add resources</button>
        <button class="button-close" @click="hidePop">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Item',
    props: ['data'],
    components: {
    },
    data: function () {
      return {
        popShow: false,
        resourcesAdding: '',
        resourcesShowing: ['ubuntu', 'sql']
      }
    },
    methods: {
      showPop: function () {
        this.popShow = true
      },
      hidePop: function () {
        this.popShow = false
      },
      addResources: function () {
        this.resourcesAdding.split(',').forEach((element) => {
          if (element === '') {
            return
          } else {
            this.resourcesShowing.push(element)
          }
        })
        this.popShow = false
      },
      removeResource (index) {
        this.resourcesShowing.splice(index, 1)
      }
    }
  }
</script>
<style lang="less" scoped>
  #Item {
    position: relative;
    box-sizing: border-box;
    /*width: 100%;*/
    min-width: 900px;
    height: 60px;
    margin-bottom: 2em;
    border: 1px solid black;
    background-color: #cce8b5;
    .left {
      float: left;
      width: 60px;
      height: 60px;
      margin-left: 20px;
      margin-right: 20px;
      span {
        display: inline-block;
        width: 46px;
        height: 46px;
        margin: 7px;
        border-radius: 50px;
        background-color: #929292;
      }
    }
    .middle {
      float: left;
      width: 600px;
      height: 100%;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      .top {
        font-weight: bolder;
        padding-bottom: 4px;
      }
      .bottom {
        font-size: 13px;
        .add-resource {
          padding-right: 10px;
          border-right: 1px solid #929292;
          text-decoration: underline;
          cursor: pointer;
          vertical-align: top;
        }
        .add-resource:hover {
          color: red;
        }
        ul {
          display: inline-block;
          li {
            float: left;
            position: relative;
            .remove-label {
              display: inline-block;
              width: 10px;
              height: 10px;
              margin-right: 15px;
              border: 1px solid #929292;
              border-radius: 2px;
              font-size: 12px;
              text-align: center;
              line-height: 10px;
              cursor: pointer;
            }
            .remove-label:hover {
              background-color: red;
            }
          }
        }
      }
    }
    .right {
      float: left;
      width: 150px;
      span {
        float: right;
        padding-top: 30px;
        text-decoration: underline;
      }
    }
    .popup-add {
      position: absolute;
      left: 60px;
      top: 65px;
      padding: 10px;
      background-color: #e0edd4;
      border: 2px solid #5D470D;
      border-radius: 10px;
      .content {
        font-size: 12px;
        div {
          margin-bottom: 10px;
        }
        input {
          width: 100%;
          margin-bottom: 10px;
        }
        button {
          display: inline-block;
          padding: 5px;
          border: 2px solid #000000;
          border-radius: 8px;
        }
      }
    }
    .popup-add::before {
      width: 0px;
      height: 0px;
      position: absolute;
      top: -29px;
      right: 210px;
      padding: 0;
      border-bottom: 15px solid #e0edd4;
      border-top: 15px solid transparent;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      display: block;
      content:'';
      z-index: 49;
    }
    .popup-add::after {
      width: 0px;
      height: 0px;
      position: absolute;
      top: -34px;
      right: 209px;
      padding: 0;
      border-bottom: 16px solid #5D470D;
      border-top: 16px solid transparent;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      display: block;
      content: '';
      z-index: 40;
    }
  }
  .backgroud-differ {
    background-color: #fffbb9
  }
</style>
