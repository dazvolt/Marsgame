var _game = {
  children_born : 0,
  children_die : 0,
  sudden_death_died : 0,
  oldness_died : 0,
  born_chance : [60],
  die_chance : [40],
  sudden_death_chance : [2],
  apocalypse_chance : [0.125],
  population : [2],
  population_growth : [2],
  score : 0,
  end : function (ending, who) {
    if (ending == 'apocalypse') {
      _log.report.apocalypse();
      $('#reset button').addClass('accept');
    } else
    if (ending == 'no_humans') {
      _log.report.no_humans(who);
    }

    $('#graphs button').hide();
    $('#graphs #reset button').show();
    $('#win-buttons button').hide();

    $('#graphs .body span[data-number]').animate({right : '10px'}, 3000);
    $('#titan').animate({'margin-left':'135px'}, 3000);
    _game.children_born -= 2; //fix for 2 default people in colony

    _log.report.special();
  }
};