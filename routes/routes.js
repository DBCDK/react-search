var express = require('express'),
    router = express.Router(),
    search = require('../lib/Search/Search.js'),
    template = require('../lib/Search/Transformers/dkabm.js')


// GET home page.
router.get(['/search', '/search/*'], (req, res) => {
 res.render('search', {title: 'Main', module: 'search', state: ''});
});

// Search API routes
router.get('/API/search', (req, res) => {
  let query = unescape(req.query.query);
  search.get(query)
  .transform(template)
  .then((result) => res.send(result))
  .catch((err) => res.send(err));
});

 module.exports = router;
