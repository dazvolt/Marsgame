var _build = { //controls everything related to buildings
  building_state : false, //helps to control whether building construction is ready to begin or not

  init: function (building_object, resource_object, resource_defined) {
    this.generate(building_object, resource_object);
    this.controller(building_object, resource_defined);
  },

  generate: function (building_object, resource_object) { //generate buildings list window
    for (var get_key in building_object) {
      if (get_key != 'window') {
        $(building_object.window)
          .find('.buildings-container')
          .append('<div data-building="' + get_key + '" class="item clearfix ' + get_key + '">' +
          '<div class="image"></div>' +
          '<div class="desc">' +
          '<div class="title"><span data-locale="' + get_key + '"></span></div>' +
          '<div class="text"><span data-locale="' + get_key + '-desc"></span></div>' +
          '</div>' +
          '<div class="resources"></div>' +
          '</div>');
        for (var res_key in building_object[get_key]['resource']) {
          $(building_object.window).find('.' + get_key + ' .resources').append('<div class="' + res_key + ' clearfix">' + resource_object[res_key].icon + ' <span data-resource="amount">' + building_object[get_key]['resource'][res_key] + '</span></div>');
        }
      }
    }
  },

  place: function (building, polygon, abbr) { //place building on a map
    var coordinates = $('#map svg polygon[data-coordinates="' + polygon + '"]').get_coords();

    for (var i = 0; i < _buildings[building].affect.who.length; i++ ) {
      _resources.defined[_buildings[building].affect.who[i][0]][_buildings[building].affect.who[i][1]] += _buildings[building].affect.amount[i];
      if (_chances.check_appliers(_resources.defined[_buildings[building].affect.who[i][0]][_buildings[building].affect.who[i][1]], _buildings[building].affect.who[i][0]) == 'to_full') _resources.defined[_buildings[building].affect.who[i][0]][_buildings[building].affect.who[i][1]] = 1;
      if (_chances.check_appliers(_resources.defined[_buildings[building].affect.who[i][0]][_buildings[building].affect.who[i][1]], _buildings[building].affect.who[i][0]) == 'to_null') _resources.defined[_buildings[building].affect.who[i][0]][_buildings[building].affect.who[i][1]] = 0;
    }

    $('#map .land').append('<div class="' + building + ' temporary b-b">' + abbr + '</div>');
    $('#map .land .temporary').css({
      left: parseInt(coordinates[0]),
      top: parseInt(coordinates[1])
    }).init_flicker(2000, 0.5, true);
    $('#map .land .temporary').removeClass('temporary');
    $('#map svg polygon[data-coordinates="' + polygon + '"]').remove();
    $(_buildings.window).find('.button.cancel').hide();
    _build.building_state = false;
    _buildings[building].count = parseInt(_buildings[building].count) + 1;

    for (var resource in _buildings[building].resource) {
      _resources.defined[resource].amount -= _buildings[building].resource[resource];
    }

    if (building == 'laboratory_plant') {
      data.allow_research = true;
      $('#research-b').bind_window('#research');
    }

    _resource.redraw();
    _chances.redraw();
    _dependency.check.buildings();
  },

  controller: function (building_object, resource_defined) { //controls click on building in window list and click on map
    var parent = this,
      building, abbr, abbreviation, polygon_coordinates, check, global_check;

    $(building_object.window).find('.button.cancel').on('click', function () { //building cancellation
      if (_build.building_state) {
        $('#map svg').fadeOut();
        $('#map .smoke').css('z-index', '1');
        $('#map .svg-container').removeClass('active');
        $(building_object.window + ' div[data-building]').removeClass('disabled');
        $(building_object.window).find('.button.cancel').hide();
        _build.building_state = false;
      }
    });

    $(building_object.window + ' div[data-building]').on('click', function () { //on building list click
      if (!$(this).hasClass('disabled') && _buildings[$(this).attr('data-building')].allow) {
        building = $(this).attr('data-building');
        global_check = true;

        for (var get_resource in building_object[building].resource) {
          check = compare(building_object[building].resource[get_resource], resource_defined[get_resource].amount);
          if (!check) global_check = false;
        }
        if (global_check) {
          $(building_object.window + ' div[data-building]').addClass('disabled');
          abbreviation = $(this).find('.title span[data-locale]').text().match(/\[(.*?)\]/g)[0];
          abbr = abbreviation.substring(1, abbreviation.length - 1);
          $('#map .svg-container').addClass('active');
          $('#map svg').fadeIn();
          $('#map .smoke').css('z-index', '-1');
          var building_number = $(building_object.window + ' div[data-building="' + building + '"]').index();
          $(building_object.window).find('.button.cancel').css({
            right: '10px',
            top: parseInt($(building_object.window).find('.title').css('height')) + (parseInt($(building_object.window).find('div[data-building]').css('height')) * building_number) - 67
          }).show();
          _build.building_state = true;
        } else {
          $(building_object.window + ' div[data-building="' + building + '"]').throw_error(locale[data.language].error.resource_all, 500);
        }
      }
    });

    $('#map svg polygon').on('click', function () { //click on map with building hooked
      $('#map svg').fadeOut();
      $('#map .smoke').css('z-index', '1');
      $('#map .svg-container').removeClass('active');
      $(building_object.window + ' div[data-building]').removeClass('disabled');
      $(building_object.window + ' div[data-building]').find('.cancel').css('display','none');
      polygon_coordinates = $(this).attr('data-coordinates');

      parent.place(building, polygon_coordinates, abbr);
    });

  }
};