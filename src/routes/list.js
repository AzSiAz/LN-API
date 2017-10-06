const { get } = require('../utils/utils')

exports.listTypes = (req, res) => {
  const { lang } = req.params

  get(`/api/category?language=${lang}`, 1)
    .then((json) => {
      res.json(json)
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

exports.listTypesForLang = (req, res) => {
  multiTypesGet()
    .then((json) => {
      res.json(json)
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

exports.listLightNovelLang = (req, res) => {
  const { lang } = req.params

  get(`/api/category?type=LIGHT_NOVEL&language=${lang}`, 1)
    .then((json) => {
      res.json(sort(json))
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

exports.listWebNovelByLang = (req, res) => {
  const { lang } = req.params

  get(`/api/category?type=Web_novel&language=${lang}`, 1)
    .then((json) => {
      res.json(sort(json))
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

exports.listTeaserByLang = (req, res) => {
  const { lang } = req.params

  get(`/api/category?type=Teaser&language=${lang}`, 1)
    .then((json) => {
      res.json(sort(json))
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

exports.otherTypesByLang = (req, res) => {
  const { type, lang } = req.params

  get(`/api/category?type=${type}` + `&language=${lang}`, 1)
    .then((json) => {
      res.json(sort(json))
    }).catch((err) => {
      res.status(500).send({error: 'Cannot get data from baka-tsuki'})
    })
}

const sort = (array) => {
  array.titles = array.titles.sort((a, b) => {
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
  })
  return array
}

const multiTypesGet = () => {
  let promiseList = []
  return get('/api/category?language=english', 1).then((res) => {
    for (let i = 0; i <= res.types.length - 1; i++) {
      let url = '/api/category?type=' + res.types[i]
      promiseList.push(get(url, 1))
    }
    return Promise.all(promiseList)
  })
}
