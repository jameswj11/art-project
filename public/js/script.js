'use strict'
$(function(){
  console.log('document loaded!')

  const $body = $('body')
  const $results = $('.results')
  const $container = $('.container')
  const $img = $('img')
  const $modal = $('.modal')
  const $modalContent = $('.modalContent')
  const $modalClose = $('.modalClose')

  $.ajax({
    url: '/api/rijks',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(function(artwork){
          const $artwork = $('<div>')

          const $image = $('<img>')
            .attr('src', artwork.webImage.url)
            .val(artwork.longTitle)

          const $title = $('<div>')
            .addClass('info')
            .text(artwork.longTitle)

          $artwork.append($image)
                  .append($title)
                  // .append($saveForm)
          $results.append($artwork)
        })
      }
    })


  $('button').click(function(){
    let queryObject = {}
    $results.empty()

    if($('.artist').val()!== '') {
      queryObject.principalMaker = $('.artist').val()
    }

    if($('.type').val() !== 'all'){
      queryObject.type = $('.type').val()
    }

    $.ajax({
      url: '/api/rijks',
      method: 'GET',
      dataType: 'json',
      data: queryObject,
      success: function(data){
        data.forEach(function(artwork){
          //create artwork elem
          const $artwork = $('<div>')

          const $image = $('<img>')
            .attr('src', artwork.webImage.url)
            .val(artwork.longTitle)

          const $title = $('<div>')
            .addClass('info')
            .text(artwork.longTitle)

          $artwork.append($image)
                  .append($title)
                  // .append($saveForm)
          $results.append($artwork)
        })
      }
    })
  })

  // const toggleModal = ()=>{$modal.fadeToggle()}

  $results.on('dblclick', 'img', function(){
    $(this).css('border-style', 'solid').css('border-color', 'red').css('border-width', '2px')
    const artwork = {
      source: $(this).attr('src'),
      info: $(this).val()
    }

  // click issue resolved by http://stackoverflow.com/questions/26098866/jquery-img-clickfunction-selector-not-working
    $.ajax({
      url: '/save',
      method: 'POST',
      data: artwork,
      success: function(data){
        console.log('ajax call POST!')
      }
    })
  })
})
