var express = require('express'),
    router = express.Router(),
    search = require('../lib/Search/Search.js'),
    holdings = require('../lib/Holdingstatus/Holdingstatus.js'),
    template = require('../lib/Search/Transformers/dkabm.js')


// GET search page.
router.get(['/search', '/search/*'], (req, res) => {
 res.render('search', {title: 'Main', module: 'search', state: ''});
});

// Search API routes
router.get('/API/search', (req, res) => {
  let query = unescape(req.query.query);
  search.get(query)
  .transform(template)
  //.add(holdings.get)
  .then((result) => res.send(result))
  .catch((err) => res.send(err));
});

router.get('*', (req, res) => res.redirect('/search/'));


 module.exports = router;


