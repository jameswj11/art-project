'use strict'
const {MongoClient} = require('mongodb')
const dbConnection  = 'mongodb://localhost:27017/user_auth';

function saveArt(req, res, next){
  console.log('sent to model')
  const userEmail = req.session.user.email;
  // console.log(req.session.user.email)
  MongoClient.connect(dbConnection, function(err, db){
    let art = req.body;
    let saveData = {$push: {favorite: art}}
    db.collection('users').update({'email': userEmail}, saveData, function(err, result){
      if(err) throw err;
      console.log('found user, added art')
      next()
    })
  })
}

module.exports = {saveArt};
