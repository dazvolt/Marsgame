/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _game = {
  children_born : 0, //how much children born  [STATISTICS USE]
  children_die : 0, //how much children died  [STATISTICS USE]
  sudden_death_died : 0, //how much died from sudden death  [STATISTICS USE]
  oldness_died : 0, //how much died from oldness  [STATISTICS USE]
  born_chance : [60], //born chance every year  [STATISTICS USE]
  die_chance : [40], //die chance every year  [STATISTICS USE]
  sudden_death_chance : [2], //sudden death chance every year  [STATISTICS USE]
  apocalypse_chance : [0.125], //apocalypse chance every year  [STATISTICS USE]
  population : [2], //population every year  [STATISTICS USE]
  population_growth : [2], //population growth every year  [STATISTICS USE]
  score : 0, //end game score
  end : function (ending, who) {
    if (ending == 'apocalypse') {
      _log.report.apocalypse();
    } else
    if (ending == 'no_humans') {
      _log.report.no_humans(who);
    }
    if (ending == 'win') {
      _log.report.win();
    }
    $('#reset button').addClass('accept');
    $('#graphs button').hide();
    $('#graphs #reset button').show();
    $('#win-buttons button').hide();

    $('#graphs .body span[data-number]').animate({right : '10px'}, 3000);
    $('#titan').animate({'margin-left':'135px'}, 3000);
    _game.children_born -= 2; //fix for 2 default people in colony

    _log.report.special();
  }
};