var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get(['/search', '/search/*'], function(req, res) {
  res.render('search', {title: 'Main', module: 'search', state: ''});
});

module.exports = router;
