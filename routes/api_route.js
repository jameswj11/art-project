'use strict'
const router    = require('express').Router()
const rijksData = require('../models/rijksDB')
const momaData  = require('../models/momaDB')

router.get('/rijks', rijksData.searchArt, (req, res)=>{
  res.json(res.filteredArt)
})

router.get('/moma', momaData.searchArt, (req, res)=>{
  res.json(res.filteredArt)
})

module.exports = router;
