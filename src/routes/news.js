const { join } = require('path')
const actu = require(join(__dirname + '/../../news/actu.json'))

module.exports = (req, res) => {
  res.json(actu)
}
