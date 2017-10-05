const cheerio = require('cheerio')
const fetch = require('node-fetch')

const { get, getHTML } = require('../utils/utils')

exports.pageTitle = (req, res) => {
  const title = req.params.title || req.query.title

  get('/api?title=' + title, 1).then(function (resolve) {
    json = makeNovelDetail(resolve)
    res.json(json)
  }, function(err) {
    res.send(err)
  })
}

exports.getChapterDetail = (req, res) => {
  const page = req.params.chapter || req.query.chapter

  fetchChapterAndParse(page).then(function(data) {
    res.send(data)
  }, function(err) {
    res.send(err)
  })
}

const makeNovelDetail = (data) => {
  let date = new Date(data.date).toUTCString()
  let item = {
    title: data.title.replace(/ /g, " "),
    updateDate: date,
    cover: data.cover,
    synopsis: data.synopsis,
    one_off: data.one_off,
    status: data.status,
    author: data.author,
    illustrator: data.illustrator,
    categories: data.categories,
  }

  if (data.one_off === true) {
    item.books = []

    for (let i = 0; i <= data.sections.length - 1; i++) {
      item.books.push({
        title: data.sections[i].title,
        chapter: data.sections[i].chapters
      })
    }
  }
  else {
    item.series = []

    for (let i = 0; i <= data.sections.length - 1; i++) {
      item.series.push({
        title: data.sections[i].title,
        books: stripEmpty(data.sections[i].books)
      })
    }
  }
  return item
}

const stripEmpty = (item) => {
  let item2 = []
  for (let i = 0; i <= item.length - 1; i++) {
    let item3 = {
      title: item[i].title,
      cover: item[i].cover,
      chapters: []
    }
    for (let i2 = 0; i2 <= item[i].chapters.length - 1; i2++) {
      if(item[i].chapters[i2].title.replace(/ /g, "") == "" || item[i].chapters[i2].title.toLowerCase().indexOf('enlarge', 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf('illustrations', 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("full text", 0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("all links" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase() == "full mtl" || item[i].chapters[i2].title.toLowerCase() == "e-book versions" || item[i].chapters[i2].title.toLowerCase() == "also read it on hellping" || item[i].chapters[i2].title.toLowerCase() == "also on nd" || item[i].chapters[i2].title.toLowerCase().indexOf("also on" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase() == "also on kyakka" || item[i].chapters[i2].title.toLowerCase().indexOf("user:" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on nanodesu" ,0) >= 0 || item[i].chapters[i2].title.toLowerCase().indexOf("on terminus" ,0) >= 0) {
        continue
      }
      item3.chapters.push(item[i].chapters[i2])
    }
    item2.push(item3)
  }
  return item2
}

function fetchChapterAndParse(id) {
    return getHTML(id).then(html => {
      $ = cheerio.load(html)

      let data = $('#mw-content-text')
      
      data.children().addClass("baka")
      data.find("#toc").remove()
      data.find(".wikitable").remove()
      data.find("table").last().remove()
      data.find("span.mw-editsection").remove()
      data.find("sup").remove()
      data.find("span.mw-cite-backlink").remove()
      data.find("img").each(function (i, el) {
        let srcAttr = $(el).attr('src')
        let src = `https://www.baka-tsuki.org${srcAttr}`
        $(`<img src="${src}" alt="chapter img">`).insertBefore($(this).closest("div.thumb"))
      })
      data.find("div.thumb").remove()

      return data.html()
  })
}
