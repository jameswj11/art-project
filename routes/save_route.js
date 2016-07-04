'use strict'
const router = require('express').Router()

router.get('/', function(req, res){
  const imageSource = req.query.source;
  res.send('saved on the back end as a send')
  console.log(imageSource + ' MADE IT TO THE BACK END!!!!')
})

module.exports = router;
