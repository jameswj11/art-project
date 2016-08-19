'use strict'
var router = require('express').Router()
var {getFavorites} = require('../models/collection')
var user = require('../models/user')

router.get('/', getFavorites, function(req, res){
  res.render('collection/index', {
    user: req.session.user, favorites: res.favorites
  })
})

module.exports = router;
