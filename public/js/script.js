'use strict'
$(function(){
  console.log('document loaded!')

  var $searchResults = $('.searchResults')
  var $body          = $('body')
  var $onload        = $('.onLoad')
  var $container     = $('.container')
  var $img           = $('img')

  //get all images upon page load
  $.ajax({
    url: '/api/rijks',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(function(artwork){
          var itemArray = []
          var grid      = document.getElementById('grid')
          var imgDiv    = document.createElement('div')
          var image     = document.createElement('img')

          imgDiv.title  = artwork.longTitle;
          image.src     = artwork.webImage.url;

          image.classList.add('thumbnail')
          image.classList.add('thumbnail')

          imgDiv.appendChild(image)
          itemArray.push(imgDiv)

          salvattore.appendElements(grid, itemArray)
        })
      }
    })

  //ajax call for search
  $(function(){
    $(document).bind('keypress', function(event){
      if (event.keyCode == 13){
        $('button').trigger('click')
      }
    })
  })

  $('button').click(function(){
    console.log('clicked')
    var queryObject = {}
    $onload.empty()

    if($('.artist').val()!== '') {
      queryObject.q = $('.artist').val()
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
        if(data.length == 0){
          var $noResults = $('<h4>')
            .text('No Results')
            .css('color', 'red')
          $('.searchResults').append($noResults)
        }

        data.forEach(function(artwork){
          //create artwork elem
          var itemArray = []
          var grid      = document.getElementById('gridLarge')
          var imgDiv    = document.createElement('div')
          var image     = document.createElement('img')
          var info      = document.createElement('p')

          info.innerHTML = artwork.longTitle;
          image.value    = artwork.longTitle;
          image.src      = artwork.webImage.url;

          image.classList.add('large')
          imgDiv.classList.add('large')

          info.classList.add('description')

          imgDiv.appendChild(image)
          imgDiv.appendChild(info)

          itemArray.push(imgDiv)

          salvattore.appendElements(grid, itemArray)
        })
      }
    })
  })

  //double click an image to save, post to DB
  $(function(){
    $searchResults.on('dblclick', 'img', function(){
      console.log($(this).val())
      $(this).css('border-style', 'solid')
             .css('border-color', 'red')
             .css('border-width', '2px')

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
          console.log('successful POST')
        }
      })
    })
  })
})
