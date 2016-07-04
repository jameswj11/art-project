'use strict'
const router = require('express').Router()
const {getFavorites} = require('../models/collection')
const user = require('../models/user')

router.get('/', getFavorites, (req, res)=>{
  res.render('collection/index', {user: req.session.user, favorites: res.favorites})
})

module.exports = router;
