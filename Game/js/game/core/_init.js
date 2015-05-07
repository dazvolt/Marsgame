function _init_game() {

  $('#map svg').mapGen();

  $('button').on('mouseover', function () {
    if ($(this).find('.allowspin').length > 0) {
      $(this).find('.allowspin').addClass('fa-spin');
    }
  }).on('mouseleave', function () {
    if ($(this).find('.allowspin').length > 0) {
      $(this).find('.allowspin').removeClass('fa-spin');
    }
  });




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


  //this._research.init(this.options.research);
  //this._population.init(this.options.population);
  DoLocale(data.language);
};