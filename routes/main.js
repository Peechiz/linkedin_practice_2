var express = require('express'),
  router = express.Router(),
  knex = require('../db/knex');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express',
    user: req.user
  });
})

module.exports = router;
