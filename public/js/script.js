'use strict'
$(function(){
  console.log('document loaded!')

  const $body = $('body')
  const $results = $('.results')
  const $container = $('.container')

  $('button').click(function(){
    let queryObject = {}
    $results.empty()

    if($('.artist').val()!== '') {
      queryObject.principalMaker = $('.artist').val()
    }

    $.ajax({
      url: '/api/rijks',
      method: 'GET',
      dataType: 'json',
      data: queryObject,
      success: function(data){
        data.forEach(function(artwork){
          const $artwork = $('<img>')
            .attr('src', artwork.webImage.url)
          $results.append($artwork)
        })
      }
    })

  })


})
