var _buttons = {
  restricted : {
    die : false,
    born : false,
    death : false,
    apocalypse : false
  },

  init : function () {
    this.controller();
    this.onclick.next_year();
    this.onclick.chances();
  },

  onclick : {

    next_year : function () {
      $('#year button').on('click', function() {
        _resource.tick();
        _research.tick(_researches);
        _population.tick();
        $('[data-number="cur-year"]').text(parseInt($('[data-number="cur-year"]').text()) + 1);
        $('#die button, #born button, #death button, #apocalypse button').removeClass('disabled');
        _buttons.restricted.die = false;
        _buttons.restricted.born = false;
        _buttons.restricted.death = false;
        _buttons.restricted.apocalypse = false;
        _chances.apocalypse();
      });
    },

    chances : function () {
      $('#die button, #born button, #death button, #apocalypse button').on('click', function () {
        var which = $(this).parent('.item').attr('id');
        if (!$(this).hasClass('disabled') && !_buttons.restricted[which]) {
          _chances.roll_random($(this));
          $(this).addClass('disabled');
          _buttons.restricted[which] = true;
        }
        if (_buttons.restricted[which] && !$(this).hasClass('disabled')) { //CHEATER DETECTED
          $(this).throw_error('', 700, 'weed');
        }
      });
    }
  },

  controller : function () {
    $('#population-b').bind_window('#population');
    $('#buildings-b').bind_window('#buildings');
    $('.fa-filter').bind_window('#filter');
    init_window('#chest');
  }
};