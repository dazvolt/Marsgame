var _research = {
  research_state : false, //is research going currently?
  global_time : 0, //how much time left for research.tick()
  defined_time : 0, //how much time research MUST go at all
  global_research_name : '', //current research name
  research_level : 0, //current research level
  new_research : false, //is new research appeared?

  init : function (research_object, resource_object, resource_defined) {
    this.generate(research_object, resource_object); //generate researches DOM
    this.controller(research_object, resource_defined); //assign on click controllers
  },

  generate : function (research_object, resource_object) {
    for (var get_key in research_object) {
      if (get_key != 'window' && get_key != 'level_resource_scale') {
        $(research_object.window)
          .find('.research-container')
          .append('<div data-research="' + get_key + '" class="item clearfix ' + get_key + '">' +
          '<div class="image"></div>' +
          '<div class="desc">' +
          '<div class="title"><span data-locale="' + get_key + '"></span>' + ' [<span data-level="0">0</span>]' + '</div>' +
          '<div class="text"><span data-locale="' + get_key + '-desc"></span></div>' +
          '</div>' +
          '<div class="resources"></div>' +
          '</div>');
        for (var res_key in research_object[get_key]['resource']) {
          $(research_object.window).find('.' + get_key + ' .resources').append('<div class="' + res_key + ' clearfix">' + resource_object[res_key].icon + ' <span data-resource="amount">' + research_object[get_key]['resource'][res_key] + '</span></div>');
        }
      }
    }
  },

  controller : function (research_object, resource_defined) {
    var research, time,check, global_check, level_for_text;

    $(research_object.window + ' div[data-research]').on('click', function () {
      if (data.allow_research) {
        if (!$(this).hasClass('disabled')) {
          research = $(this).attr('data-research');
          global_check = true;
          $(research_object.window + ' div[data-research]').addClass('disabled');

          for (var get_resource in research_object[research].resource) { //checks if there is enough resources for research
            if (get_resource != 'time') {
              check = compare(research_object[research].resource[get_resource], resource_defined[get_resource].amount);
              if (!check) global_check = false;
            }
          }

          if (global_check) { //if resources is enough - let it go further
            for (var resource_research in _researches[research].resource) {
              if (resource_research != 'time') {
                _resources.defined[resource_research].amount -= _researches[research].resource[resource_research];
              }
            }
            $(research_object.window + ' .button.decline').removeClass('disabled');
            $(research_object.window + ' div[data-research]').addClass('disabled');
            _research.global_time = research_object[research].resource[get_resource];
            _research.defined_time = research_object[research].resource[get_resource];
            _research.global_research_name = research;
            _research.research_level = _researches[_research.global_research_name].level;
            _research.research_state = true;
            level_for_text = parseInt(_research.research_level) + 1;
            $(research_object.window + ' [data-research="current-research"]').text('"' + locale[data.language].research[research].name + '" на уровень: [' + level_for_text + ']');
            _resource.redraw();
          } else { //no resources - give error
            $(research_object.window + ' div[data-research="' + research + '"]').throw_error(locale[data.language].resource.error.name, 500);
          }
        }
      } else { //if research is NOT allowed - CHEATER DETECTED
        $(this).throw_error(roll_array(locale[data.language].error.cheat_research), 700, 'weed');
      }
    });

    $(research_object.window + ' .button.decline').on('click', function () {
      if (_research.research_state) {
        for (var resource_research in _researches[_research.global_research_name].resource) {
          if (resource_research != 'time') {
            _resources.defined[resource_research].amount = parseInt(_resources.defined[resource_research].amount) + parseInt(_researches[research].resource[resource_research]);
          }
        }
        _research.reset(research_object);
      }
    });
  },

  progress_bar : {
    change : function (research_object, value) {
      $(research_object.window).find('.percent-progress').css('width', value + '%');
      $(research_object.window).find('.percent-text').text(value + '%');
    },
    reset : function (research_object) {
      $(research_object.window).find('.percent-progress').css('width', '0%');
      $(research_object.window).find('.percent-text').text('0%');
    }
  },

  tick : function (research_object) {
    var diff, percent, result;
    if (_research.research_state && _research.global_time > 1) { //research is still in progress
      _research.global_time -= 1;
      diff = _research.defined_time - _research.global_time, percent = 100 / _research.defined_time, result = (percent * diff).toFixed(0);
      _research.progress_bar.change(research_object, result);
    } else if (_research.global_time == 1) { //last research year
      _research.global_time -= 1;
      _research.progress_bar.change(0);
      _research.end(research_object);
    }
  },

  apply_bonuses : function (research_name) {
    if (research_name == 'capacity') { //special options for capacity research
      var $power = $(_buildings.window + ' [data-building="power_plant"] [data-locale="power_plant-desc"]'),
      power_text = $power.text();

      $power.text(power_text.replace(_buildings.power_plant.affect.amount[0], _buildings.power_plant.affect.amount[0] + _researches.capacity.affect.amount[0]));

      _resources.defined.power.amount[0] += parseInt(_buildings.power_plant.count[0] * _researches.capacity.affect.amount[0]);
      _buildings.power_plant.affect.amount[0] += _researches.capacity.affect.amount[0];
    } else
    if (research_name == 'expedition') { //special options for expedition research
      $('#expedition').show();
      $('#expedition-b').removeClass('disabled').bind_window('#expedition-w');
      _researches.expedition.runtime -= _research.research_level;
      $('[data-length="expedition"]').text(_researches.expedition.runtime);
    } else { //other template-like researches
      for (var i = 0; i < _researches[research_name].affect.who.length; i++ ) {
        _resources.defined[_researches[research_name].affect.who[i][0]][_researches[research_name].affect.who[i][1]] += _researches[research_name].affect.amount[i];
        if (_chances.check_appliers(_resources.defined[_researches[research_name].affect.who[i][0]][_researches[research_name].affect.who[i][1]], _researches[research_name].affect.who[i][0]) == 'to_full') _resources.defined[_researches[research_name].affect.who[i][0]][_researches[research_name].affect.who[i][1]] = 1;
        if (_chances.check_appliers(_resources.defined[_researches[research_name].affect.who[i][0]][_researches[research_name].affect.who[i][1]], _researches[research_name].affect.who[i][0]) == 'to_null') _resources.defined[_researches[research_name].affect.who[i][0]][_researches[research_name].affect.who[i][1]] = 0;
      }
    }
    if (_research.new_research) {
      call_hint(locale[data.language].hint.research_end[0] + locale[data.language].research[research_name].name + locale[data.language].hint.research_end[1] + _research.research_level + '] ' + locale[data.language].hint.new_research);
    } else {
      call_hint(locale[data.language].hint.research_end[0] + locale[data.language].research[research_name].name + locale[data.language].hint.research_end[1] + _research.research_level + ']');
    }

  },

  reset : function (research_object) {
    _resource.redraw();

    $(research_object.window + ' .button.decline').addClass('disabled');
    $(research_object.window + ' div[data-research]').removeClass('disabled');
    $(research_object.window + ' [data-research="current-research"]').text(locale[data.language].research.empty);

    _research.research_state = false;
    _research.global_research_name = '';
    _research.global_time = 0;
    _research.research_level = 0;
    _research.progress_bar.reset(research_object);
  },

  cost_update : function () {
    _researches[_research.global_research_name].level +=1;
    _research.research_level = parseInt(_researches[_research.global_research_name].level); //update research level

    for (var resource_research in _researches[_research.global_research_name].resource) { //assign new resource values according to resource type and level_resource_scale
      if (resource_research == 'time') {
        _researches[_research.global_research_name].resource[resource_research] = _researches[_research.global_research_name].resource[resource_research] * 2;
      }
      if (resource_research == 'titan') {
        _researches[_research.global_research_name].resource[resource_research] = (_researches[_research.global_research_name].resource[resource_research] * _researches.level_resource_scale).toFixed(0);
      }
      if (resource_research == 'uranium') {
        _researches[_research.global_research_name].resource[resource_research] = (_researches[_research.global_research_name].resource[resource_research] * (_researches.level_resource_scale / 1.35)).toFixed(0);
      }
      if (resource_research == 'helium') {
        _researches[_research.global_research_name].resource[resource_research] = (_researches[_research.global_research_name].resource[resource_research] * (_researches.level_resource_scale / 1.75)).toFixed(0);
      }
      _resource.redraw_research(_research.global_research_name, _researches[_research.global_research_name].resource[resource_research], _research.research_level, resource_research); //redraw resources
    }
  },

  end : function (research_object) {
    _research.cost_update();
    _dependency.check.researches();
    _research.apply_bonuses(_research.global_research_name);
    _chances.redraw();
    _research.reset(research_object);
  }
};