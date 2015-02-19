/**
 * Created by Dazvolt on 2/12/15.
 */
$.fn.addText = function(text, newrow) {
    if (newrow) {
        this.html( this.html() + '<br />' + text );
    } else if (!newrow) {
        this.html( this.html() + text );
    }
};

function roll_array (value) {
    var max = value.length,
        min = 0,
        roll_value = parseInt(Math.random() * (max - min) + min);

    return value[roll_value];
}

function roll (value) {
    var master_roll = Math.random().toFixed(5),
        input_roll = (value / 100).toFixed(5),
        result = true;

    master_roll <= input_roll ? result = true : result = false;

    return result;
}

function roll_specific (min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
}

$.fn.bind_window = function(win) {
    this.on('click', function () {
        if (!$(this).hasClass('disabled')) {
            $(win).is(':visible') ? $(win).hide() : $(win).show();
        }
    });
    init_window(win);
};

function init_window (win) {
    $(win).find('.close, .decline').on('click', function(){
        if (!$(this).hasClass('disabled') && !$(this).hasClass('not-main')) {
            $(this).parents(win).hide();
        }
    });
    $(win).find('> .title').mousedown(function () {
        $(this).parents(win).draggable().draggable('enable');
    });
    $(win).find('> .title').mouseup(function () {
        $(this).parents(win).draggable().draggable('disable');
    });
}

$.fn.init_flicker = function(timer, opacity, smooth) {
    var switcher = 0,
        $this = this,
        _timer = timer / 1000 + 's';
    if (smooth) {
        this.css({
            '-moz-transition': _timer,
            '-webkit-transition': _timer,
            '-o-transition': _timer,
            'transition': _timer
        });
    }
    setInterval(function () {
        if (switcher == 0) {
            $this.css('opacity', opacity);
            switcher = 1;
        } else {
            $this.css('opacity', 1);
            switcher = 0;
        }
    }, timer);
};

$.fn.get_coords = function() {
    var get_points = this.attr('points').split(','),
        x = parseInt(get_points[3].split(' ')[1]).toFixed(0),
        y = parseInt(get_points[4].split(' ')[2]).toFixed(0);

    return [x, y];
};

function traverse (obj, keys) {
    var nodes = keys.split('.');
    for (var i = 0; i < nodes.length; i++) {
        obj = obj[nodes[i]];
    }
    console.log(obj);
    return obj;
};

//Copyright Commodus Voke
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

