'use strict'
var {MongoClient} = require('mongodb')
var dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/user_auth';

var bcrypt        = require('bcrypt')
var salt          = bcrypt.genSalt(10)

function createSecure(email, password, callback){
  bcrypt.genSalt(function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      // console.log('hash:', hash)
      callback(email, hash)
    })
  })
};

function createUser(req, res, next){
  createSecure(req.body.email, req.body.password, saveUser)
  function saveUser(email, hash){
    // console.log('email:', email)
    // console.log('passwordDigest:', hash)
    MongoClient.connect(dbConnection, function(err, db){
      var userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: email,
        passwordDigest: hash
      };
      db.collection('users').insertOne(userInfo, function(err, result){
        if(err) throw err;
        res.user = result;
        next()
      })
    })
  };
};

function loginUser(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  MongoClient.connect(dbConnection, function(err, db){
    db.collection('users').findOne({'email': email}, function(err, user){
      if(err) throw err;
      if(user === null){
        console.log('can\'t find user with email', email)
      } else if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
        // console.log(user)
      };
      next()
    })
  })
};

module.exports = {createUser, loginUser}
