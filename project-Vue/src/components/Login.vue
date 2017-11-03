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
      <li class="table" style="width:800px">
        <z-table :columns="columns" :tableData="tabledata" type="tabTabel" stripe></z-table>
      </li>
      <li class="dropdown">
        <drop-down :listData="dropDownListData" :defaultValue="dropDownDefaultValue" @on-select="selectValue"></drop-down>
      </li>
      <li class="popup">
        <button @click="showPop" style="width:100px;height:30px">点击出弹框</button>
        <pop-up :visible="popupVisible" @on-close="closePop">
          <label for="">做测试用</label>
        </pop-up>
      </li>
      <li class="errmessage">
        <input type="text" v-model="value1">
        <input type="text" v-model="value2">
        <input type="text" v-model="value3">
        <button @click="nextStep">下一步</button>
        <err-message :message="message"></err-message>
      </li>
    </ul>
  </div>
</template>
<script>
import Upload from './Upload'
import ZTable from './Table'
import DropDown from './DropDown'
import PopUp from './PopUp'
import ErrMessage from './ErrMessage'
import {required} from '.././utils/assist'
export default {
  name: 'Index',
  components: {
    Upload,
    ZTable,
    DropDown,
    PopUp,
    ErrMessage
  },
  data: function () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          width: '80',
          align: 'right'
        },
        {
          title: '年龄',
          key: 'age',
          width: '100',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          width: '200',
          align: 'right'
        }
      ],
      tabledata: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          sex: 'male'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          sex: 'male'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          sex: 'female'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          sex: 'male'
        }
      ],
      dropDownListData: [],
      dropDownDefaultValue: '测试',
      popupVisible: false,
      value1: '',
      value2: '',
      value3: '',
      message: ''
    }
  },
  created: function () {
    let _this = this
    _this.axios({
      method: 'get',
      url: '/api/dropdown'
    })
      .then((res) => {
        console.log(res.data)
        _this.dropDownListData = res.data.list
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    selectValue (id) {
      console.log(id)
    },
    showPop () {
      this.popupVisible = true
    },
    closePop (val) {
      this.popupVisible = false
    },
    nextStep () {
      let inputs =
        [
          {
            data: this.value1,
            errMessage: 'value1 不能为空'
          }, {
            data: this.value2,
            errMessage: 'value2 不能为空'
          }, {
            data: this.value3,
            errMessage: 'value3 不能为空'
          }
        ]
      this.message = required(inputs)
      console.log(required(inputs))
    }
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