var _buttons = {
  restricted : {
    die : false,
    born : false,
    death : false,
    apocalypse : false
  },
  population_each_year : 0,

  init : function () {
    this.controller();
    this.onclick.next_year();
    this.onclick.chances();
  },

  onclick : {

    next_year : function () {
      $('#year button').on('click', function() {
        _buttons.onclick.next_year_do();
      });
    },

    next_year_do : function () {
      _resource.tick();
      _research.tick(_researches);
      _population.tick();
      $('[data-number="cur-year"]').text(parseInt($('[data-number="cur-year"]').text()) + 1);
      $('#die button, #born button, #death button, #apocalypse button').removeClass('disabled');
      _buttons.restricted.die = false;
      _buttons.restricted.born = false;
      _buttons.restricted.death = false;
      _buttons.restricted.apocalypse = false;
      _events.tick();
      _chances.apocalypse();
      _game.population.push(_buttons.population_each_year);
      _game.population_growth.push(_population.amount);
      _buttons.population_each_year = 0;

      _game.born_chance.push(parseInt((_resources.defined.born.number * 100)));
      _game.die_chance.push(parseInt((_resources.defined.die.number * 100)));
      _game.sudden_death_chance.push(parseInt((_resources.defined.death.number * 100)));
      _game.apocalypse_chance.push(parseFloat((_resources.defined.apocalypse.number * 100)).toFixed(3));
      _win.check();
      _log.report.perform();
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