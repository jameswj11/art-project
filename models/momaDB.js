'use strict'
const MongoClient  = require('mongodb').MongoClient;
const dbConnection = 'mongodb://localhost:27017/moma_art'

module.exports = {
  searchArt: function(req, res, next){
    const filterObj = {}
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
