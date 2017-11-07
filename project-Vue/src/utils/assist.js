export function required (inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].data === '') {
      return inputs[i].errMessage
    }
  }
  return 'success'
}

export function toTree (arr, key) {
  /*
  **@这个有bug，arr只能按照顺序来写，即后面的不能有前面已经排序过的element
  */
  // let keyword = arr[0][key]
  // let code = 0
  // let final = []
  // final = [{name: keyword, children: []}]
  // arr.forEach((element, index) => {
  //   if (keyword === element[key]) {
  //     final[code].children.push(element)
  //   } else {
  //     keyword = element[key]
  //     code++
  //     let newItem = {name: keyword, children: []}
  //     newItem.children.push(element)
  //     final.push(newItem)
  //   }
  // })
  // return final

  /*
  **@这个有bug，arr只能按照顺序来写，即后面的不能有前面已经排序过的element
  */
  // 先遍历出有几类
  let sort = []
  arr.forEach((element, index) => {
    if (!sort.includes(element[key])) {
      sort.push(element[key])
    }
  })

  sort = sort.map((keycode, index) => {
    let children = arr.filter((element, index) => {
      return keycode === element[key]
    })
    return {
      name: key,
      children: children
    }
  })
  return sort
}
