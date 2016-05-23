const express = require('express');
const router = express.Router();
// const path = require('path');
var apicache = require('apicache');
var cache = apicache.middleware;

var list = require('./list');
var page = require('./page');
var news = require('./news');

/*
 * Web Client
 */

router.get('/', cache('10 minutes'), function (req, res) {
  res.send('<title>LN-API</title>LN-API'); 
});
router.get('/news', cache('10 minutes'), news.list);

/*
 * List Routes
 */

router.get('/list/types', cache('10 minutes'), list.listLangType);
router.get('/list/type/:lang', cache('10 minutes'), list.listType);

/*
 * LN Routes Basic types shortcuts
 */

router.get('/ln/:lang', cache('10 minutes'), list.listLnLang);
router.get('/wln/:lang', cache('10 minutes'), list.listWlnLang);
router.get('/teaser/:lang', cache('10 minutes'), list.listTLang);

/*
 * LN Page
 */

router.get('/title/query/', cache('5 minutes'), page.pageTitle2);
router.get('/title/:page', cache('5 minutes'), page.pageTitle);
router.get('/chapter/query', page.getChapterDetailM2);
router.get('/chapter/:id', page.getChapterDetailM);

/*
 * LN Routes newly added type on BT and not implemented here 
 */

router.get('/:type/:lang', cache('10 minutes'), list.otherType);

module.exports = router;