const { get } = require('../utils/utils')

exports.listType = (req, res) => {
  get('/api/category?language=' + req.params.lang, 1).then(function (resolve) {
    res.json(resolve)
  }, function(err) {
    res.send(err)
  })
}

exports.listLangType = (req, res) => {
  mGet().then(function (resolve) {
    res.json(resolve)
  }).catch(function(err) {
    console.log(err)
  })
}

exports.listLnLang = (req, res) => {
  get('/api/category?type=LIGHT_NOVEL&language=' + req.params.lang, 1).then(function (resolve) {
    resolve.titles = sort(resolve)
    res.json(resolve)
  }, function(err) {
    res.send(err)
  })
}

exports.listWlnLang =(req, res) => {
  get('/api/category?type=Web_novel&language=' + req.params.lang, 1).then(function (resolve) {
    resolve.titles = sort(resolve)
    res.json(resolve)
  }, function(err) {
    res.send(err)
  })
}

exports.listTLang = (req, res) => {
  get('/api/category?type=Teaser&language=' + req.params.lang, 1).then(function (resolve) {
    resolve.titles = sort(resolve)
    res.json(resolve)
  }, function(err) {
    res.send(err)
  })
}

exports.otherType = (req, res) => {
  get('/api/category?type=' + req.params.type + '&language=' + req.params.lang, 1).then(function (resolve) {
    resolve.titles = sort(resolve)
    res.json(resolve)
  }, function(err) {
    res.send(err)
  })
}

// private function

function sort(array) {
  return array.titles.sort(function (a, b) {
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
  })
}

function mGet() {
  let promiseList = []
  return get('/api/category?language=english', 1).then((res) => {
    for (let i = 0; i <= res.types.length - 1; i++) {
      let url = '/api/category?type=' + res.types[i]
      promiseList.push(get(url, 1))
    }
    return Promise.all(promiseList)
  })
}
