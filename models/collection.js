'use strict'
var {MongoClient} = require('mongodb')
var dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/user_auth';

function getFavorites(req, res, next){
  var userEmail = req.session.user.email;

  MongoClient.connect(dbConnection, function(err, db){
    db.collection('users')
      .find({'email': userEmail}, {_id: 0, favorites:[]})
      .toArray(function(err, result){
        if(err) throw err;
        res.favorites = result[0].favorites;
        console.log(res.favorites)
        next()
      })
  })
}

module.exports = {getFavorites}
