var express = require('express'),
  router = express.Router(),
  knex = require('../db/knex');

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;
