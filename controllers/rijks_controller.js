'use strict'
const router = require('express').Router()

router.get('/', (req, res)=>{res.render('rijks/index')})

module.exports = router;
