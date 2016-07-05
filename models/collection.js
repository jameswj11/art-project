'use strict'
const {MongoClient} = require('mongodb')
const dbConnection = 'mongodb://localhost:27017/user_auth';

function getFavorites(req, res, next){
  console.log('retrieving favorites')
  const userEmail = req.session.user.email;

  MongoClient.connect(dbConnection, function(err, db){
    db.collection('users')
      .find({'email': userEmail}, {_id: 0, favorites:[]})
      .toArray((err, result)=>{
        if(err) throw err;
        res.favorites = result[0].favorites;
        console.log(res.favorites)
        next()
      }) //thanks Suprit
  })
}

module.exports = {getFavorites}
