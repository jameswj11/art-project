'use strict'
const router   = require('express').Router()
const rijksData = require('../models/rijksDB')

router.get('/rijks', rijksData.searchArt, (req, res)=>{
  res.json(res.filteredArt)
})

module.exports = router;
