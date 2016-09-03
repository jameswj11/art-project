'use strict'
var router    = require('express').Router()
var {saveArt} = require('../models/save')
var user      = require('../models/user')

router.get('/', function(req, res){
  res.render('./save', {user: req.session.user})
})

router.post('/', saveArt, function(req, res){
  var imageSource = req.body.source;
  var imageInfo   = req.body.info

  res.render('./save', {user: req.session.user})
})

module.exports = router;
