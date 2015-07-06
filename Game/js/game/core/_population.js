var _population = {
  list_man_string : '', //string contains all man child to be added
  list_woman_string : '', //string contains all woman child to be added
  amount : 0, //amount of population
  woman_able_to : 0, //how much woman can born child
  man_able_to : 0, //how much man can born child

  init : function () {
   $('#graphs [data-number="win-population"]').text(_resources.defined.population);
    _population.generate('man', roll_specific(24, 32, 0));
    _population.generate('woman', roll_specific(20, 28, 0));

    _population.list.add();
    _population.list.reset();
    _population.redraw();
  },

  generate : function (sex, age) {
    var random_handler, name;
    if (sex == 'man') {
      _population.list_man_string += '<p class="man"><span class="name">' + roll_array(malename) + '</span> : <span class="age">' + age + '</span> лет</p>';
    } else
    if (sex == 'woman') {
      _population.list_woman_string += '<p class="woman"><span class="name">' + roll_array(femalename) + '</span> : <span class="age">' + age + '</span> лет</p>';
    } else
    if (sex == 'random') {
      random_handler = Math.random();
      if (random_handler <= 0.4) { //40% chance for male to born
        name = roll_array(malename);
        _population.list_man_string += '<p class="man"><span class="name">' + name + '</span> : <span class="age">' + age + '</span> лет</p>';
        _log.report.children.born(name, 'male');
      } else { //60% chance for female to born
        name = roll_array(femalename);
        _population.list_woman_string += '<p class="woman"><span class="name">' + name + '</span> : <span class="age">' + age + '</span> лет</p>';
        _log.report.children.born(name, 'female');
      }
      _game.score += 2;
    }
    _population.amount += 1;
    _buttons.population_each_year += 1;
    _game.children_born += 1;
  },

  tick : function () {
    _population.re_age();
    _population.birth();
    _population.death.oldness();
    _population.death.sudden();
  },

  re_age : function () {
    $('#population .age').each(function() {
      $(this).text(parseInt($(this).text()) + 1);
    });
  },

  birth : function () {
    if (_population.check.woman() && _population.check.man()) {
      for (var i=0; i < _population.woman_able_to; i++) {

        if (roll(_resources.defined.born.number)) {
          if (!roll(_resources.defined.die.number)) {
            _population.generate('random', 0);
            //<LOG NOTIFY>
          } else {
            _game.children_die += 1;
            _log.report.children.die();
          }
        } else {
          //baby not born
          //<LOG NOTIFY>
        }
      }
      _population.woman_able_to = 0;
      _population.list.add();
      _population.list.reset();
      _population.redraw();
      $('[data-number="win-population"]').hook_hint(locale[data.language].hint.population[0] + ' ' + $('#man-container .man').length + '; ' + locale[data.language].hint.population[1] + ' ' + $('#woman-container .woman').length);
    } else {
      //baby not born
      _population.check.future();
    }
  },

  death : {

    sudden : function () {
      $('#population p').each(function () {
        if (roll(_resources.defined.death.number)) {
          var get_sex = _population.get_sex($(this).parents('.sidebar-body'));
          _log.report.death.sudden($(this).find('.name').text(), get_sex);
          $(this).remove();
          _population.amount -= 1;
          _buttons.population_each_year -= 1;
          _population.redraw();
          _game.sudden_death_died += 1;
          _game.score -= 1;
        }
      });
      _population.check.future();
    },

    oldness : function () {
      $('#population .age').each(function() {
        var get_age = $(this).text();
        if (get_age > 50) { //from age 50 starting chance to die per year is ~16%
          if (roll(get_age/300)) {
            var get_sex = _population.get_sex($(this).parents('.sidebar-body'));
            _log.report.death.oldness($(this).parents('p').find('.name').text(), get_sex);
            $(this).parents('p').remove();
            _population.amount -= 1;
            _buttons.population_each_year -=1;
            _population.redraw();
            _game.oldness_died += 1;
            _game.score -= 1;
          }
        }
      });
      _population.check.future();
    }
  },

  check : { //this object contains function for checking population born conditions, such as bornable woman, man and woman count etc.

    woman : function () {
      var result;
      $('#population #woman-container').find(".woman").each(function () {
        var this_age = parseInt($(this).find('.age').text());
        if ( this_age >= 16 && this_age < 50 ) {
          result = true;
          _population.woman_able_to += 1;
        }
      });
      return result;
    },

    man : function () {
      var result;
      $('#population #man-container').find(".man").each(function () {
        var this_age = parseInt($(this).find('.age').text());
        if ( this_age >= 16 && this_age < 60 ) {
          result = true;
          _population.man_able_to += 1;
        }
      });
      return result;
    },

    future : function () {
      if ( $('#population #woman-container p').length < 1 ) { //no woman left
        _game.end('no_humans', 'female');
      }
      if ( $('#population #man-container p').length < 1 ) { //no man left
        _game.end('no_humans', 'male');
      }
    }
  },

  redraw : function () {
    $('#graphs [data-number="win-population"]').text(_population.amount);
  },

  list: {

    add : function () {
      $('#population #woman-container').append(_population.list_woman_string);
      $('#population #man-container').append(_population.list_man_string);
    },

    reset : function () {
      _population.list_man_string = '';
      _population.list_woman_string = '';
    }
  },

  get_sex : function ($this) {
    if ($this.attr('id') == 'woman-container' ) {
      return 'female';
    } else
    if ($this.attr('id') == 'man-container' ) {
      return 'male';
    }
  }
};