var express = require('express'),
router = express.Router(),
search = require('../lib/Search/Search.js'),
template = require('../lib/Search/Transformers/WorkTransformer.js')


/* GET home page. */
router.get(['/search', '/search/*'], function(req, res) {
 res.render('search', {title: 'Main', module: 'search', state: ''});
});

/**
 * Search API routes
 */
router.get('/API/search', function searchRoute(req, res) {
 var query = unescape(req.query.query);
 search.get(query)
 .transform(template)
 .then(function(result){
  res.send(result);
 })
 .catch(function (err) {
  res.send(err);
 });
});

 module.exports = router;
