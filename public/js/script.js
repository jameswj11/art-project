'use strict'
$(function(){
  console.log('document loaded!')

  const $body = $('body')
  const $results = $('.results')
  const $container = $('.container')
  const $img = $('img')
  // const API_KEY = process.env.RIJKSMUSEUM_API;

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
            .val(artwork.links.self)
          $results.append($artwork)
        })
      }
    })
  })

  $results.on('click', 'img', function(){
    const favorite = {source: $(this).attr('src')}
    console.log($(this).attr('src'))
  //click issue resolved by http://stackoverflow.com/questions/26098866/jquery-img-clickfunction-selector-not-working
  $.ajax({
    url: '/save',
    method: 'GET',
    data: favorite,
    success: function(data){
      console.log('ajax call success!')
      // console.log($(this))
    }
  })

  })
})
