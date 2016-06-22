var express = require('express'),
  router = express.Router(),
  knex = require('../db/knex');
router.get('/linkedin', (req, res) => {
  console.log('logs you into linkedin');
})

module.exports = router;
