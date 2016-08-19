'use strict'
var router = require('express').Router()

router.get('/', function(req, res){
  res.render('rijks/index', {user: req.session.user})
})

module.exports = router;
