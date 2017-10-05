require('dotenv').config()

const express = require('express')
const compress = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const { adresse, http } = require('./config/config')


app.set('json spaces', 2)

app.use(morgan('dev', { skip: process.env.NODE_ENV === 'test' }))
app.use(cors())
app.use(compress())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes'))

app.listen(http, adresse)

module.exports = app
