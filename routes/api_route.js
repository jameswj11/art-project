'use strict'
var router    = require('express').Router()
var rijksData = require('../models/rijksDB')
var momaData  = require('../models/momaDB')

router.get('/rijks', rijksData.searchArt, function(req, res){
  res.json(res.filteredArt)
})

router.get('/moma', momaData.searchArt, function(req, res){
  res.json(res.filteredArt)
})

module.exports = router;
