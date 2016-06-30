'use strict'
const API_KEY       = process.env.RIJKSMUSEUM_AP;
const request       = require('request')

module.exports = {
  searchArt: function(req, res, next){
    const filterObj = {
      imgonly: 'True',
      format: 'json',
      ps: 999999,
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
      json:true
      }, function(err, response, body){
        res.filteredArt = body.artObjects;
        next()
      })
  }
}
