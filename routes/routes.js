var express = require('express'),
  router = express.Router();

// GET search page.
router.get(['/search', '/search/*'], (req, res) => res.render('search'));

// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/search/'));

module.exports = router;
