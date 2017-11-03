export function required (inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].data === '') {
      return inputs[i].errMessage
    }
  }
  return 'success'
}
