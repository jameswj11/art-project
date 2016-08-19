'use strict'
var {MongoClient} = require('mongodb')
var dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/user_auth';

function saveArt(req, res, next){
  console.log('sent to model')
  var userEmail = req.session.user.email;
  console.log(req.session.user.email)
  MongoClient.connect(dbConnection, function(err, db){
    var favorites = req.body;
    var saveData = {$push: {favorites}}
    db.collection('users').update({'email': userEmail}, saveData, function(err, result){
      if(err) throw err;
      console.log('found user, added art')
      next()
    })
  })
}

module.exports = {saveArt};
