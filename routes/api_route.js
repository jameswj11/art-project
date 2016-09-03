'use strict'
var router    = require('express').Router()
var rijksData = require('../models/rijksDB')

router.get('/rijks', rijksData.searchArt, function(req, res){
  res.json(res.filteredArt)
})

module.exports = router;
