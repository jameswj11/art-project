'use strict'
var API_KEY = process.env.RIJKSMUSEUM_API;
var request = require('request')

module.exports = {
  searchArt: function(req, res, next){
    var filterObj = {
      imgonly: 'True',
      format: 'json',
      ps: 100,
      key: API_KEY,
    };

    if('type' in req.query){
      filterObj['type'] = req.query.type;
    };

    if('principalMaker' in req.query){
      filterObj['principalMaker'] = req.query.principalMaker;
    };

    if('f.dating.period' in req.query){
      filterObj['f.dating.period'] = req.query.f.dating.period;
    };

    request({
      url: 'https://www.rijksmuseum.nl/api/en/collection/',
      qs: filterObj,
      json: true},
      function(err, response, body){
        if(err) throw err;
        res.filteredArt = body.artObjects;
        next()
      })
  }
};
