import axios from 'axios'
import url from '../../pages/urlConfig'

let language = {}
axios({
  method: 'get',
  url: url + '/dic/text',
  params: {
    languageId: 'COMPT0001217'
  }
})
  .then(function (response) {
    JSON.parse(response.data.data).forEach((element) => {
      language[element.dictionaryId] = element.dictionaryDescribe
    })
    console.log(language)
  }).catch(function (fail) {
    console.log(fail)
  })

export default language
