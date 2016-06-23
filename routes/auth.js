var express = require('express'),
  router = express.Router(),
  knex = require('../db/knex');

router.get('/linkedin', passport.authenticate('linkedin'),
function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', (req,res)=> {
  req.session = null;
})

module.exports = router;
