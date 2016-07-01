'use strict'
const router = require('express').Router()

router.get('/', (req, res)=>{res.render('rijks/index', {user: req.session})})

module.exports = router;
