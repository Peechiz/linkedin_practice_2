var express = require('express'),
  router = express.Router(),
  knex = require('../db/knex');

router.get('/', (req, res) => {
  if (!res.locals.user) {
    res.render('index', {user: null});
  }
  else {
    res.render('index');
  }
})

module.exports = router;
