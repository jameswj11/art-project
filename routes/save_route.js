'use strict'
var router      = require('express').Router()
var user        = require('../models/user')
var {saveArt,
     deleteArt} = require('../models/save')


router.get('/', function(req, res){
  res.render('./save', {user: req.session.user})
})

router.post('/', saveArt, function(req, res){
  var imageSource = req.body.source;
  var imageInfo   = req.body.info

  res.render('./save', {user: req.session.user})
})

router.delete('/', deleteArt, function(req, res){
  res.send('deleted!')
})

module.exports = router;
