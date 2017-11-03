// 这个是requireJS的方式
// require.config({
//   paths: {
//     mock: 'http://mockjs.com/dist/mock'
//   }
// })
// // 加载 Mock
// require(['mock'], function (Mock) {
//   // 使用 Mock
//   var data = Mock.mock({
//     'list|1-10': [{
//       'id|+1': 1
//     }]
//   })
//   // 输出结果
//   document.body.innerHTML +=
//     '<pre>' +
//     JSON.stringify(data, null, 4) +
//     '</pre>'
// })

// 引入mockjs
const Mock = require('mockjs')
// 使用mockjs模拟数据
Mock.mock('/api/dropdown', {
  'list|10': [{
    'id': '@ID',
    'name': '@FIRST'
  }]
})
