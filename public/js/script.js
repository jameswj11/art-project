'use strict'
$(function(){
  console.log('document loaded!')

  const $body = $('body')
  const $results = $('.results')
  const $container = $('.container')
  const $img = $('img')

  //save button as a form
  // const $save = $('<form>')
  // const $input = $('<input>')

  // $save.attr('action', '/save')
  //      .attr('method', 'post')

  // $input.attr('type', 'submit')
  //       .attr('value', 'login')
  //       .attr('name', 'save')

  // $save.append($input)

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
          //create artwork elem
          const $artwork = $('<div>')

          const $image = $('<img>')
            .attr('src', artwork.webImage.url)
            .val(artwork.links.self)

          const $saveForm = $('<form>')
          const $input = $('<input>')

          $saveForm.attr('action', '/save')
                   .attr('method', 'post')

          $input.attr('type', 'submit')
                .attr('value', 'save')
                .attr('name', 'save')

          $saveForm.append($input)

          $artwork.append($image)
                  .append($saveForm)
          $results.append($artwork)
        })
      }
    })
  })

  $results.on('click', 'img', function(){
    const source = {source: $(this).attr('src')}
    console.log($(this).attr('src'))
  //click issue resolved by http://stackoverflow.com/questions/26098866/jquery-img-clickfunction-selector-not-working
    $.ajax({
      url: '/save',
      method: 'POST',
      data: source,
      success: function(data){
        console.log('ajax call POST!')
      }
    })
  })
})
