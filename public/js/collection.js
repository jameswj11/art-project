$(function(){
  console.log('collection page loaded')
  var $deleteArt = $('.deleteLink')

  $deleteArt.hover(function(){
    $(this).css('cursor', 'pointer')
  })

  $deleteArt.click(function(){
    var imgSrc  = $(this).siblings().eq(0).attr('src')

    $.ajax({
      url: '/save',
      type: 'DELETE',
      data: {source: imgSrc},
      success: function(data){
        console.log('sent to back end')
      }
    })
  })



})
