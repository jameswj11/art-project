$(function(){
  var $delete = $('.deleteLink')

  $delete.hover(function(){
    $(this).css('cursor', 'pointer')
  })

  $delete.click(function(){
    var imgSrc  = $(this).siblings().eq(0).attr('src')

    $.ajax({
      url: '/save',
      type: 'DELETE',
      data: {source: imgSrc},
      success: function(data){
        console.log('deleted')
      }
    })

    var $artEntry = $(this).parent()
    $artEntry.fadeOut()
  })
})
