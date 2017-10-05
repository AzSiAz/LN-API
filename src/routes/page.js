const cheerio = require('cheerio')

const { get, getHTML } = require('../utils/utils')

exports.getNovelDetail = (req, res) => {
  const title = req.params.title || req.query.title

  get('/api?title=' + title, 1)
    .then((res) => {
      res.json(makeNovelDetail(res))
    }, (err) => {
      res.send(err)
    })
}

exports.getChapterHTML = (req, res) => {
  const chapter = req.params.chapter || req.query.chapter

  fetchChapterAndParse(chapter)
    .then((data) => {
      res.send(data)
    }, (err) => {
      res.send(err)
    })
}

const makeNovelDetail = (data) => {
  let date = new Date(data.date).toUTCString()
  let novel = {
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
    novel.books = []

    for (let i = 0; i <= data.sections.length - 1; i++) {
      novel.books.push({
        title: data.sections[i].title,
        chapter: data.sections[i].chapters
      })
    }
  }
  else {
    novel.series = []

    for (let i = 0; i <= data.sections.length - 1; i++) {
      novel.series.push({
        title: data.sections[i].title,
        books: stripEmpty(data.sections[i].books)
      })
    }
  }
  return novel
}

const stripEmpty = (item) => {
  let books = []
  for (let i = 0; i <= item.length - 1; i++) {
    let book = {
      title: item[i].title,
      cover: item[i].cover,
      chapters: []
    }
    for (let i2 = 0; i2 <= item[i].chapters.length - 1; i2++) {
      if(item[i].chapters[i2].title.replace(/ /g, "") === "" ||
        item[i].chapters[i2].title.toLowerCase().includes('enlarge')||
        item[i].chapters[i2].title.toLowerCase().includes('illustrations') ||
        item[i].chapters[i2].title.toLowerCase().includes('all links') ||
        item[i].chapters[i2].title.toLowerCase() === 'full mtl' ||
        item[i].chapters[i2].title.toLowerCase() === 'e-book versions' ||
        item[i].chapters[i2].title.toLowerCase() === 'also read it on hellping' ||
        item[i].chapters[i2].title.toLowerCase() === 'also on nd' ||
        item[i].chapters[i2].title.toLowerCase() === 'also on kyakka' ||
        item[i].chapters[i2].title.toLowerCase().includes("user:") ||
        item[i].chapters[i2].title.toLowerCase().includes("on nanodesu") ||
        item[i].chapters[i2].title.toLowerCase().includes("on terminus")) 
      {
        continue
      }
      book.chapters.push(item[i].chapters[i2])
    }
    books.push(book)
  }
  return books
}

const fetchChapterAndParse = (chapter) => {
    return getHTML(chapter).then(html => {
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
