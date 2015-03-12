var express = require('express'),
  router = express.Router(),
  search = require('../lib/Search/Search.js'),
  holdings = require('../lib/Holdingstatus/Holdingstatus.js'),
  template = require('../lib/Search/Transformers/dkabm.js')


// GET search page.
router.get(['/search', '/search/*'], (req, res) => res.render('search'));

// Search API routes
router.get('/API/search', (req, res) => {
  var query = unescape(req.query.query);
  // This is where the magic happens
  try{
  //   1. Search performed
  search.get(query)
    // 2. Search object is transformed
    .transform(template)
    // 3. Holdings are added
    .add(holdings.get)
    // 4. Result is returned
    .then((result) => res.send(result))
    // Did any errors happen?
    .catch((err) => res.send(err));
  }
  catch (err) {
      console.log(err);
  };

});

// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/search/'));


module.exports = router;
