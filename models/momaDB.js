'use strict'
var MongoClient  = require('mongodb').MongoClient;
var dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/user_auth';

module.exports = {
  searchArt: function(req, res, next){
    var filterObj = {}
    if('artist' in req.query){
      filterObj['Artist'] = req.query.artist;
    };

    if('date' in req.query){
      filterObj['Date'] = req.query.date;
    };

    MongoClient.connect(dbConnection, function(err, db){
      if(err) throw err;
      db.collection('artworks')
        .find(filterObj)
        .toArray(function(err, results){
          if(err) throw err;
          console.log(results)
          res.filteredArt = results;
          next()
        })
    })

  }
}
