var co = require('co');
var cheerio = require('cheerio');
var config = require('../config/config');
var fs = require("fs");
var jquery = fs.readFileSync(__dirname + "/lib/jQuery.min.js", "utf-8");
var url = config.base_url;
var request = require('request').defaults({ encoding: null });
var utils = require('../utils/utils');

class Page {
  static pageTitle(req, res) {
    // var page = req.params.page || req.query.title;
    utils.get('/api?title=' + req.params.page, 1).then(function (resolve) {
      resolve = makeNovelDetail(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  }

  static pageTitle2(req, res) {
    utils.get('/api?title=' + encodeURIComponent(req.query.title), 1).then(function (resolve) {
      resolve = makeNovelDetail(resolve);
      res.json(resolve);
    }, function(err) {
      res.send(err);
    });
  }

  static getChapterDetailM(req, res) {
    var id = encodeURIComponent(req.params.id);
    getChapterDetail(id).then(function(data) {
      res.send(data);
    }, function(err) {
      res.send(err);
    })
  }

  static getChapterDetailM2(req, res) {
    // For route like : Fate/Zero:Epilogue:_The_Next_Day
    getChapterDetail(encodeURIComponent(req.query.chapter)).then(function(data) {
      res.send(data);
    }, function(err) {
      res.send(err);
    })
  }
}

// private function

function makeNovelDetail(data, title) {
  var date = new Date(data.date).toUTCString();
  var item;
  if (data.one_off == true) {
    item = {
      title: data.title.replace(/_/g, " "),
      updateDate: date,
      cover: data.cover,
      synopsis: data.synopsis,
      one_off: data.one_off,
      status: data.status,
      author: data.author,
      illustrator: data.illustrator,
      categories: data.categories,
      tome: []
    };
    for (var i = 0; i <= data.sections.length - 1; i++) {
      item.tome.push({
        title: data.sections[i].title,
        tome: data.sections[i].chapters
      });
    }
  }
  else {
    item = {
      title: data.title.replace(/_/g, " "),
      updateDate: date,
      cover: data.cover,
      synopsis: data.synopsis,
      one_off: data.one_off,
      status: data.status,
      author: data.author,
      illustrator: data.illustrator,
      categories: data.categories,
      tome: []
    };
    for (var i = 0; i <= data.sections.length - 1; i++) {
      item.tome.push({
        title: data.sections[i].title,
        tome: stripEmpty(data.sections[i].books)
      });
    }
  }
  return item;
};

function stripEmpty(item) {
  var item2 = [];
  for (var i = 0; i <= item.length - 1; i++) {
    var item3 = {
      title: item[i].title,
      cover: item[i].cover,
      chapters: []
    };
    for (var i2 = 0; i2 <= item[i].chapters.length - 1; i2++) {
      if(item[i].chapters[i2].title.replace(/ /g, "") == "" || item[i].chapters[i2].title.toLowerCase().indexOf('enlarge', 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf('illustrations', 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("full text", 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("all links" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase() == "full mtl" || item[i].chapters[i2].title.toLowerCase() == "e-book versions" || item[i].chapters[i2].title.toLowerCase() == "also read it on hellping" || item[i].chapters[i2].title.toLowerCase() == "also on nd" || item[i].chapters[i2].title.toLowerCase().indexOf("also on" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase() == "also on kyakka" || item[i].chapters[i2].title.toLowerCase().indexOf("user:" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on nanodesu" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on terminus" ,0) >= 0) {
        continue;
      }
      item3.chapters.push({
        title: item[i].chapters[i2].title,
        page: item[i].chapters[i2].page,
        linktype: item[i].chapters[i2].linktype,
        link: item[i].chapters[i2].link
      });
    }
    item2.push(item3);
  }
  return item2;
};

function getChapterDetail(id) {
  return co(function * () {
    var data = yield fetchChapterAndParse(id);
    return data;
  })
};

function img2datauri(data) {
  return new Promise(function (resolve, reject) {
    request.get(data.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data.url = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        resolve(data);
      }
      else {
        console.log(error);
        reject(error);
      }
    });
  })
};

function fetchChapterAndParse(id) {
  return new Promise(function(resolve, reject) {
    utils.getHTML(id).then(html => {
      var promise = [];
      $ = cheerio.load(html);
      var data = $('#mw-content-text');
      data.children().addClass("baka");
      data.find("#toc").remove();
      data.find(".wikitable").remove();
      data.find("table").last().remove();
      data.find("span.mw-editsection").remove();
      data.find("sup").remove();
      data.find("span.mw-cite-backlink").remove();
      data.find("img").map(function (i, elem) {
        var str = $(this).attr("src");
        str = str.split("width=")
        str[1] = 'width=800';
        str = str[0].concat(str[1]);
        var x, y;
        if (parseInt($(this).attr("width")) < 100) {
          x = 485;
          y = 300;
        }
        else if (parseInt($(this).attr("height")) > 300) {
          x = 485;
          y = 300;
        }
        else {
          x = 400;
          y = 600;
        }
        var src = "https://www.baka-tsuki.org" + str;
        promise.push(img2datauri({
          "url": src,
          "height": x,
          "width": y
        }));
      });
      Promise.all(promise).then(function(val) {
        data.find("img").map(function (i, elem) {
          $('<img src="' + val[i].url +'" alt="chapter img" height="'+ val[i].height +'" width="'+ val[i].width +'">').insertBefore($(this).closest("div.thumb"));
        })
        data.find("div.thumb").remove();
        resolve(data.html());
      }, (err) => {
        data.find("img").map(function (i, elem) {
          var str = $(this).attr("src");
          str = str.split("width=");
          str[1] = 'width=400';
          str = str[0].concat(str[1]);
          var x, y;
          if (parseInt($(this).attr("width")) < 100) {
            x = 485;
            y = 300;
          }
          else if (parseInt($(this).attr("height")) > 300) {
            x = 485;
            y = 300;
          }
          else {
            x = 400;
            y = 600;
          }
          var src = "https://www.baka-tsuki.org" + str;
          console.log(str);
          $('<img src="' + src +'" alt="chapter img">').insertBefore($(this).closest("div.thumb"));
        })
        data.find("div.thumb").remove();
        reject(data.html());
      })
    })
  })
};

module.exports = Page;
