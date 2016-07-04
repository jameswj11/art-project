'use strict'
const router = require('express').Router()
const {saveArt} = require('../models/save')
const user = require('../models/user')

router.get('/', (req, res)=>{res.render('./save', {user: req.session.user})})

router.post('/', saveArt, function(req, res){
  const imageSource = req.body.source;
  // res.render('/', {user: req.session})
  console.log(imageSource + ' POST TO THE BACK END!!!!')
  res.render('./save', {user: req.session.user})
})

module.exports = router;
