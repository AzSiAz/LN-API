const express = require('express')
const apicache = require('apicache')
const listEndpoints = require('express-list-endpoints')

const router = express.Router()
const cache = apicache.middleware

const list = require('./list')
const page = require('./page')
const news = require('./news')

/*
 * Web Client
 */

router.get('/', (req, res) => res.send('<title>LN-API</title>LN-API'))
router.get('/news', news)

/*
 * List Routes
 */

router.get('/list/types', cache('10 minutes'), list.listLangType)
router.get('/list/type/:lang', cache('10 minutes'), list.listType)

/*
 * LN Routes Basic types shortcuts
 */

router.get('/ln/:lang', cache('10 minutes'), list.listLnLang)
router.get('/wln/:lang', cache('10 minutes'), list.listWlnLang)
router.get('/teaser/:lang', cache('10 minutes'), list.listTLang)

/*
 * LN Page
 */

router.get('/title/:title?', cache('10 minutes'), page.pageTitle)
router.get('/chapter/:chapter?', page.getChapterDetail)

/*
 * LN Routes newly added type on BT and not implemented here 
 */

router.get('/:type/:lang', cache('10 minutes'), list.otherType)

/*
 * List api endpoint
 */

 router.get('/endpoint', (req, res) => res.json(listEndpoints(router)))

module.exports = router
