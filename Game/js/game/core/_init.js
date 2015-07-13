function _init_game() {

  $('button').on('mouseover', function () {
    if ($(this).find('.allowspin').length > 0) {
      $(this).find('.allowspin').addClass('fa-spin');
    }
  }).on('mouseleave', function () {
    if ($(this).find('.allowspin').length > 0) {
      $(this).find('.allowspin').removeClass('fa-spin');
    }
  });

  $('.window, .j-diag, .j-diag-free').add_corners();

  $('#map svg').gen_map();
  $('.command_center').css({
    top: parseInt($('polygon[data-coordinates="4,5"]').get_coords()[1]),
    left: parseInt($('polygon[data-coordinates="4,5"]').get_coords()[0])
  }).init_flicker(2000, 0.5, true);

  _population.init();
  _resource.init();
  _chances.init(_resources.default, _resources.defined);
  _buttons.init();
  _build.init(_buildings, _resources.default, _resources.defined);
  _research.init(_researches, _resources.default, _resources.defined);
  _log.init();
  _hints.init();
  _dependency.init();
  _start.init();
  _settingsw.init();
  //call_window_hint(locale[data.language].tutorial.desc, locale[data.language].tutorial.title, [true, false]);
};