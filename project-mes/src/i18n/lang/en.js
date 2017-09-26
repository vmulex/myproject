import axios from 'axios'
import url from '../../pages/urlConfig'

let language = {}
axios({
  method: 'get',
  url: url + '/dic/text',
  params: {
    languageId: 'COMPT000170'
  }
})
  .then(function (response) {
    console.log(JSON.parse(response.data.data))
    JSON.parse(response.data.data).forEach((element) => {
      language[element.dictionaryId] = element.dictionaryDescribe
    })
    console.log(language)
  }).catch(function (fail) {
    console.log(fail)
  })

export default language

