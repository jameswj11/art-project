'use strict'
var {MongoClient} = require('mongodb')
var dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/user_auth';

function saveArt(req, res, next){
  var userEmail = req.session.user.email;

  MongoClient.connect(dbConnection, function(err, db){
    // console.log(req.body)
    var favorites = req.body;
    var saveData  = {$push: {favorites}}

    db.collection('users').update(
      {'email': userEmail}, saveData, function(err, result){
        if(err) throw err;
        console.log('found user, added art')
        next()
    })
  })
}

function deleteArt(req, res, next){
  var userEmail = req.session.user.email;

  MongoClient.connect(dbConnection, function(err, db){
    var artwork    = req.body.source;
    var deleteData = {$pull: {favorites: {source: artwork}}}

    db.collection('users').update(
      {'email': userEmail}, deleteData, function(err, result){
        if(err) throw err;
        console.log('found user, deleted art')
        next()
      }
    )
  })
}

module.exports = {saveArt, deleteArt};
