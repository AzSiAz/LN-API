const fetch = require('node-fetch')

const { base_url } = require('../config/config');

exports.get = (query, type) => {
  const link = type ? base_url + query : query

  return fetch(link)
    .then((res) => {
      if(res.ok) return res.json()
      return new Error('Error fetching data')
    })
}

exports.getHTML = (id) => {
  const link = `https://www.baka-tsuki.org/project/index.php?title=${id}`

  return fetch(link)
    .then((res) => {
      if(res.ok) return res.text()
      return new Error('Error fetching data')
    })
}
