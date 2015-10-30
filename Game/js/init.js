/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
$(document).ready( function () {
    _init_game();
    $('body').append('<div class="fader active"></div>');
    $('.fader.active').fadeOut(2000, function() {
        $('.fader').remove();
    });
});

