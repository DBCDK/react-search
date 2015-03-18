var express = require('express'),
  passport = require('passport'),
  router = express.Router();

// GET search page.
router.get(['/search', '/search/*'], (req, res) => {

 res.render('search', {
  user : req.session.passport.user && 'true' || 'false'
 });
});

// sends the request through our local login/signin strategy
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.session.passport.user);
});


// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/search/'));

module.exports = router;
