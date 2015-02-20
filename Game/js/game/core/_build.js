var _build = { //controls everything related to buildings
    init : function (building_object, resource_object, resource_defined) {
        this.generate(building_object, resource_object);
        this.controller(building_object, resource_defined);
    },
    generate : function (building_object, resource_object) {
        for (var get_key in building_object) {
            if (get_key != 'window') {
                $(building_object.window)
                    .find('.buildings-container')
                    .append('<div data-building="' + get_key + '" class="item clearfix ' + get_key + '">' +
                        '<div class="image"></div>' +
                        '<div class="desc">' +
                        '<div class="title"><span data-locale="' + get_key + '"></span></div>' +
                        '<div class="text"><span data-locale="' + get_key + '-desc"></span><span>' + building_object[get_key].affect.amount + ';</span></div>' +
                        '</div>' +
                        '<div class="resources"></div>' +
                        '</div>');
                for (var res_key in building_object[get_key]['resource']) {
                    $(building_object.window).find('.' + get_key + ' .resources').append('<div class="' + res_key + ' clearfix">' + resource_object[res_key].icon + ' <span data-resource="amount">' + building_object[get_key]['resource'][res_key] + '</span></div>');
                }
            }
        }
    },
    place : function (building, polygon, abbr) {
        var coordinates = $('#map svg polygon[data-coordinates="'+polygon+'"').get_coords();
        $('#map .land').append('<div class="' + building + ' temporary b-b">' + abbr + '</div>');
        $('#map .land .temporary').css({
            left : parseInt(coordinates[0]),
            top : parseInt(coordinates[1])
        }).init_flicker(2000, 0.5, true);
        $('#map .land .temporary').removeClass('temporary');
        $('#map svg polygon[data-coordinates="'+polygon+'"').remove();

        for (var resource in data.buildings[building].resource) {
            data.resource.defined[resource].amount -= data.buildings[building].resource[resource];
        }
        _resource.redraw();
    },
    controller : function (building_object, resource_defined) {
        var parent = this,
            building, abbr, abbreviation, polygon_coordinates, check, global_check;

        $(building_object.window + ' div[data-building]').on('click', function () {
            building = $(this).attr('data-building');
            global_check = true;

            for (var get_resource in building_object[building].resource) {
                check = compare(building_object[building].resource[get_resource], resource_defined[get_resource].amount);
                if (!check) global_check = false;
            }
            if (global_check) {
                $(building_object.window + ' div[data-building]').addClass('disabled');
                abbreviation = $(this).find('.title span[data-locale]').text().match(/\[(.*?)\]/g)[0];
                abbr = abbreviation.substring(1, abbreviation.length-1);
                $('#map .svg-container').addClass('active');
                $('#map svg').fadeIn();
                $('#map .smoke').css('z-index','-1');
            } else {
                //$(building_object.window + ' div[data-building]').throw_error('')
            }

        });

        $('#map svg polygon').on('click', function () {
            $('#map svg').fadeOut();
            $('#map .smoke').css('z-index','1');
            $('#map .svg-container').removeClass('active');
            $(building_object.window + ' div[data-building]').removeClass('disabled');

            polygon_coordinates = $(this).attr('data-coordinates');

            parent.place(building, polygon_coordinates, abbr);
        });

    }
};