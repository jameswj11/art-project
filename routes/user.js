'use strict'
const router = require('express').Router()
const {createUser, loginUser} = require('../models/user')

router.get('/new', (req, res)=>{res.render('user/new')})

router.post('/new', createUser, (req, res)=>{
  console.log(res.user)
  req.session.user = res.user;
  req.session.save((err)=>{
    if(err) throw err;
    res.redirect('/')
  })
})

router.get('/login', (req, res)=>{res.render('user/login')})

router.post('/login', loginUser, (req, res)=>{
  console.log(res.user)
  req.session.user = res.user;
  req.session.save((err)=>{
    if(err) throw err;
    res.redirect('/')
  })
})

router.delete('/logout', (req, res)=>{
  req.session.destroy((err)=>{
    res.redirect('/')
  })
})

module.exports = router;
