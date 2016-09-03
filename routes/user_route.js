'use strict'
var router = require('express').Router()
var {createUser, loginUser} = require('../models/user')

router.get('/new', function(req, res){
  res.render('user/new')
})

router.post('/new', createUser, function(req, res){
  req.session.user = res.user;
  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/user/login')
  })
})

router.get('/login', function(req, res){
  res.render('user/login')
})

router.post('/login', loginUser, function(req, res){
  req.session.user = res.user;
  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/')
  })
})

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  })
})

module.exports = router;
