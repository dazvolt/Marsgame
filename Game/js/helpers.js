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
};

function roll (value) {
    var master_roll = Math.random().toFixed(5),
        input_roll = (value / 100).toFixed(5),
        result = true;

    master_roll <= input_roll ? result = true : result = false;

    return result;
};

function roll_specific (min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
};

$.fn.bind_window = function(win) {
    this.on('click', function () {
        if (!$(this).hasClass('disabled')) {
            $(win).is(':visible') ? $(win).hide() : $(win).show();
        }
    });
    $(win).find('.close, .decline').on('click', function(){
        $(this).parents(win).hide();
    })
};
function init_window (win) {
    $(win).find('.close, .decline').on('click', function(){
        $(this).parents(win).hide();
    });
}

//Copyright Commodus Voke
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

