var _buttons = {
  init : function () {
    this.controller();
    this.onclick.nextyear();
  },
  onclick : {
    nextyear : function () {
      $('#year-s button').on('click', function() {
        _resource.tick();
        _research.tick(_researches);
        _population.tick();
      });
    }
  },
  controller : function () {
    $('#population-b').bind_window('#population');
    $('#buildings-b').bind_window('#buildings');
    //$('#research-b').bind_window('#research');
    //$('#tech-b').bind_window('#tech');
    $('.fa-filter').bind_window('#filter');
    //
    init_window('#chest');
  }
};