$(document).ready( function () {

    $('#map svg').mapGen();

    $('button').on('mouseover', function (){
        if ($(this).find('.allowspin').length > 0) {
            $(this).find('.allowspin').addClass('fa-spin');
        }
    }).on('mouseleave', function (){
        if ($(this).find('.allowspin').length > 0) {
            $(this).find('.allowspin').removeClass('fa-spin');
        }
    });

    $('#population-b').bind_window('#population');
    $('#buildings-b').bind_window('#buildings');
    $('#research-b').bind_window('#research');
    $('#tech-b').bind_window('#tech');
    $('.fa-filter').bind_window('#filter');
    $('#expedition-b').bind_window('#expedition');
    init_window('#chest');

    $('.command_center').init_flicker(2000, 0.5, true);

    $('.command_center').css({
        top : parseInt($('polygon[data-coordinates="4,5"]').get_coords()[1]),
        left : parseInt($('polygon[data-coordinates="4,5"]').get_coords()[0])
    });

    _init_game();

});

