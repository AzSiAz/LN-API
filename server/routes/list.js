var co = require('co');
var config = require('../config/config');
// var knex = require('knex')(config.database);
var url = config.base_url;
var utils = require('../utils/utils');

var lists = {
  listType: function listType(req, res) {
    utils.get('/api/category?language=' + req.params.lang, 1).then(function (resolve) {
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  },
  listLangType: function listLangType(req, res) {
    langList().then(function (resolve) {
      res.json(resolve);
    }).catch(function(err) {
      console.log(err);
    });
  },
  listLnLang: function listLnLang(req, res) {
    utils.get('/api/category?type=LIGHT_NOVEL&language=' + req.params.lang, 1).then(function (resolve) {
      resolve.titles = sort(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  },
  listWlnLang: function listWlnLang(req, res) {
    utils.get('/api/category?type=Web_novel&language=' + req.params.lang, 1).then(function (resolve) {
      resolve.titles = sort(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  },
  listTLang: function listTLang(req, res) {
    utils.get('/api/category?type=Teaser&language=' + req.params.lang, 1).then(function (resolve) {
      resolve.titles = sort(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  },
  otherType: function otherType(req, res) {
    utils.get('/api/category?type=' + req.params.type + '&language=' + req.params.lang, 1).then(function (resolve) {
      resolve.titles = sort(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  }
};

// private function

function sort(array) {
  return array.titles.sort(function (a, b) {
    if (a.title > b.title)
      return 1;
    if (a.title < b.title)
      return -1;
    return 0;
  });
};

function langList() {
  return co(function * () {
    var list = yield mGet();
    return list;
  });
}

function mGet() {
  return new Promise(function (resolve, reject) {
    var promiseList = [];
    utils.get('/api/category?language=english', 1).then(function (res) {
      for (var i = 0; i <= res.types.length - 1; i++) {
        var url = '/api/category?type=' + res.types[i];
        promiseList.push(utils.get(url, 1));
      }
      Promise.all(promiseList).then(function(data) {
        resolve(data);
      })
    });
  })
}

module.exports = lists;