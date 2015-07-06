var _log = {
  collection : {
    open : '<div class="report-block clearfix">',
    year : '<div class="report-block-year">',
    report : {
      open : '<div class="report-block-data">',
      data : ''
    },
    close : '</div>'
  },
  init : function () {

  },
  report :  {
    children : {
      born : function (name, sex) {
        if (sex == 'male') {
          _log.collection.report.data += locale[data.language].bornbaby[0] + ': <span class="male">' + name + '</span>. ';
        }
        if (sex == 'female') {
          _log.collection.report.data += locale[data.language].bornbaby[0] + ': <span class="female">' + name + '</span>. ';
        }
      },
      die : function () {
        var result = roll_specific(0, locale[data.language].babydied.length - 1, 0);
        _log.collection.report.data += locale[data.language].babydied[result] + ' ';
      }
    },
    death : {
      sudden : function (name, sex) {
        var result = roll_specific(0, locale[data.language].suddendeath.male.length - 1, 0);
        if (sex == 'male') {
          _log.collection.report.data += '<span class="male">' + name + '</span> ' + locale[data.language].suddendeath.male[result] + ' ';
        }
        if (sex == 'female') {
          _log.collection.report.data += '<span class="female">' + name + '</span> ' + locale[data.language].suddendeath.female[result] + ' ';
        }
      },
      oldness : function (name, sex) {
        var result = roll_specific(0, locale[data.language].colonistdied.male.length - 1, 0);
        if (sex == 'male') {
          _log.collection.report.data += '<span class="male">' + name + '</span> ' + locale[data.language].colonistdied.male[result] + ' ';
        }
        if (sex == 'female') {
          _log.collection.report.data += '<span class="female">' + name + '</span> ' + locale[data.language].colonistdied.female[result] + ' ';
        }
      }
    },
    apocalypse : function () {
      _log.report.clear();
      var result = roll_specific(0, locale[data.language].worldcollapse.text.length - 1, 0);
      _log.collection.report.data += '<span class="red">' + locale[data.language].worldcollapse.title + locale[data.language].worldcollapse.text[result] + '</span>';
      _log.report.perform();
    },
    no_humans : function (sex) {
      _log.report.clear();
      if (sex == 'female') {
        _log.collection.report.data += '<span class="red">' + locale[data.language].humans[1] + locale[data.language].humans[0] + '</span>';
      }
      if (sex == 'male') {
        _log.collection.report.data += '<span class="red">' + locale[data.language].humans[2] + locale[data.language].humans[0] + '</span>';
      }

      _log.report.perform();
    },
    perform : function () {
      if (_log.collection.report.data != '') {
        var report_collection = _log.collection.open + _log.collection.year + locale[data.language].labels.year + ' ' + $('[data-number="cur-year"]').text() + ': ' +  _log.collection.close +
          _log.collection.report.open + _log.collection.report.data + _log.collection.close + _log.collection.close;
        $('#log-output').append(report_collection);
        _log.report.clear();
      }
    },
    clear : function () {
      _log.collection.report.data = '';
    },
    special : function () {
      _log.report.clear();

      var children_overall_born_chance = 0;

      for ( var i = 0; i < _game.born_chance.length; i++ ) {
        children_overall_born_chance += parseFloat(_game.born_chance[i]);
      }

      var results = parseInt((children_overall_born_chance / _game.born_chance.length));

      var oldness_text = '', sudden_death_text = '', born_children_text = '', year_end_text = '';

      if (_game.children_born > 0) {
        born_children_text = locale[data.language].game_end.part2[0] + _game.children_born + locale[data.language].game_end.part2[1];
      }

      if (_game.oldness_died > 0) {
        oldness_text = locale[data.language].game_end.part4[0] + _game.oldness_died + locale[data.language].game_end.part4[1];
      }
      if (_game.sudden_death_died > 0) {
        sudden_death_text = locale[data.language].game_end.part5[0] + _game.sudden_death_died + locale[data.language].game_end.part5[1];
      }

      var get_last_digit_of_year = parseInt($('[data-number="cur-year"]').text()) % 10;

      if (get_last_digit_of_year > 1 &&  get_last_digit_of_year < 5) {
        year_end_text = locale[data.language].game_end.start[0] + $('[data-number="cur-year"]').text() + locale[data.language].game_end.start[2] + locale[data.language].game_end.start[4];
      }
      if (get_last_digit_of_year == 1) {
        year_end_text = locale[data.language].game_end.start[0] + $('[data-number="cur-year"]').text() + locale[data.language].game_end.start[3] + locale[data.language].game_end.start[4];
      }
      if (get_last_digit_of_year >= 5 && get_last_digit_of_year <= 9 || get_last_digit_of_year == 0) {
        year_end_text = locale[data.language].game_end.start[0] + $('[data-number="cur-year"]').text() + locale[data.language].game_end.start[1] + locale[data.language].game_end.start[4];
      }

      var report_collection = '<div class="endgame">' +
        year_end_text +
        born_children_text +
        locale[data.language].game_end.part3[0] + results + locale[data.language].game_end.part3[1] +
        oldness_text +
        sudden_death_text + '<br />' +
        locale[data.language].game_end.titles[0] + '<span style="color: ' + random_color() + '">' + locale[data.language].game_end.titles[roll_specific(1, locale[data.language].game_end.titles.length - 1, 0)] + '</span>. ' + '<br />' +
        locale[data.language].game_end.score[0] + _game.score + locale[data.language].game_end.score[1] +
        '<div><button class="button" style="margin-top: 20px;" id="end_game_stat-b">Подробные графики и статистика</button></div>'  +
        ' ' +
        '</div>';
      $('#log-output').append(report_collection);
      $('#end_game_stat-b').bind_window('#end_game_stat');
      $('#graph-die').sparkline(_game.die_chance, {width: '250px', height: '60px', fillColor: 'rgba(42, 49, 59, 0.58)', lineColor: '#ffffff'});
      $('#graph-born').sparkline(_game.born_chance, {width: '250px', height: '60px', fillColor: 'rgba(42, 49, 59, 0.58)', lineColor: '#ffffff'});
      $('#graph-death').sparkline(_game.sudden_death_chance, {width: '250px', height: '60px', fillColor: 'rgba(42, 49, 59, 0.58)', lineColor: '#ffffff'});
      $('#graph-apocalypse').sparkline(_game.apocalypse_chance, {width: '250px', height: '60px', fillColor: 'rgba(42, 49, 59, 0.58)', lineColor: '#ffffff'});
      _log.report.clear();
    }
  }
};