'use strict'
const {MongoClient} = require('mongodb')
const dbConnection  = 'mongodb://localhost:27017/user_auth';

function saveArt(req, res, next){
  console.log('sent to model')
  MongoClient.connect(dbConnection, function(err, db){
    let art = {
      name: req.body
    }
    db.collection('test').insertOne(art, function(err, result){
      if(err) throw err;
      console.log('added to database')
      next()
    })
  })
}

module.exports = {saveArt};
