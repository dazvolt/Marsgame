/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
$(document).ready( function () {
    $('body').mousemove(function( event ) {
        var cx, dx;

        cx = Math.ceil($('body').width() / 2.0);
        dx = event.pageX - cx;

        $('.start-menu-items').css('transform','rotateY(' + ((dx / 90) + 25)  + 'deg)');
    });

    var planetMove = setInterval(function() {
        var $container = $('.start');
        var parsePos = parseInt($container.css('background-position-x'));
        $container.css('background-position-x', (parsePos - 1) + 'px');
    }, 50);

    $('[data-item="start"]').on('click', function() {
        $('body').append('<div class="fader"></div>');
        $('.fader').fadeIn(2000, function() {
            document.getElementById("go_game").click()
        });
    });
    $('[data-item="exit"]').on('click', function() {
        window.close();
    });
});

