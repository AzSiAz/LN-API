const express = require('express');
const router = express.Router();
const path = require('path');

var list = require('./list.js');
var page = require('./page.js');

/*
 * Web Client
 */

// router.get('/web', function (req, res) {
//   res.sendFile('index.html', { root: path.join(__dirname, '../../client/web') });
// });
// router.get('/web/list', function (req, res) {
//   res.sendFile('list.html', { root: path.join(__dirname, '../../client/web') });
// });

/*
 * List Routes
 */

router.get('/list/types', list.listLangType);
router.get('/list/type/:lang', list.listType);

/*
 * LN Routes Basic types shortcuts
 */

router.get('/ln/:lang', list.listLnLang);
router.get('/wln/:lang', list.listWlnLang);
router.get('/teaser/:lang', list.listTLang);

/*
 * LN Page
 */

router.get('/title/query/', page.pageTitle2);
router.get('/title/:page', page.pageTitle);
router.get('/chapter/:id', page.getChapterDetailM);

/*
 * LN Routes newly added type on BT and not implemented here 
 */

router.get('/:type/:lang', list.otherType);

module.exports = router;