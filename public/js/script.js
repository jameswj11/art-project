'use strict'
$(function(){
  console.log('document loaded!')

  var $body = $('body')
  var $results = $('.results')
  var $container = $('.container')
  var $img = $('img')
  var $modal = $('.modal')
  var $modalContent = $('.modalContent')
  var $modalClose = $('.modalClose')

  $.ajax({
    url: '/api/rijks',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(function(artwork){
          var $artwork = $('<div>')

          var $image = $('<img>')
            .attr('src', artwork.webImage.url)
            .val(artwork.longTitle)

          var $title = $('<div>')
            .addClass('info')
            .text(artwork.longTitle)

          $artwork.append($image)
                  .append($title)
                  // .append($saveForm)
          $results.append($artwork)
        })
      }
    })

  $(document).bind('keypress', function(event){
    if (event.keyCode == 13){
      $('button').trigger('click')
    }
  })

  $('button').click(function(){
    var queryObject = {}
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
          var $artwork = $('<div>')

          var $image = $('<img>')
            .attr('src', artwork.webImage.url)
            .val(artwork.longTitle)

          var $title = $('<div>')
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

  // var toggleModal = ()=>{$modal.fadeToggle()}

  $results.on('dblclick', 'img', function(){
    $(this).css('border-style', 'solid').css('border-color', 'red').css('border-width', '2px')

    var artwork = {
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
