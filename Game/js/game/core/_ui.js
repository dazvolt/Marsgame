var _start = {
  windows : ['#top-panel', '#map', '#graphs', '#log'],
  height : [],
  init : function () {
    for (var i = 0; i < _start.windows.length; i++) {
      _start.height.push($(_start.windows[i]).css('height'));
      $(_start.windows[i]).css({
        height : '0',
        overflow : 'hidden',
        opacity: 0
      });
    }
    $('#map .background').append('<div class="noise"></div>');
    $('#map .background').addClass('grayscale');
  },
  open_windows : function () {
    for (var i = 0; i < _start.windows.length; i++) {
      $(_start.windows[i]).animate({
        height : _start.height[i],
        opacity : 1
      }, 1500);
    }
    setTimeout(function(){
      call_window_hint(locale[data.language].tutorial.desc, locale[data.language].tutorial.title, [true, false], function() {
        $('#map .background').removeClass('grayscale');
        $('.noise').animate({
          height: 1,
          top: '50%',
          opacity: 0.7
        }, 1500, function(){
          $(this).animate({
            width: 1,
            left: '50%',
            opacity: 0.4
          }, 700, function(){
            $('.noise').remove();
          });
        });
      });
    }, 3000);
  }
};