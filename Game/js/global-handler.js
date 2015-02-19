$(document).ready( function () {
    $('.content').gameMars({
        winpopulation : 1000
    });
    $('.content').gameMars('debug', 'res', 100000);
    $('.j-winpopulation').text('2');
    $('.j-new-game').on('click', function () {
        location.reload();
    });

    $('#map svg').mapGen();

    $('.content').generateUI();


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

    $('polygon').on('click', function(){
        console.log($(this).attr('data-coordinates'));

        $('.command_center').css({
            top : parseInt($(this).get_coords()[1]),
            left : parseInt($(this).get_coords()[0])
        }).text($(this).attr('data-coordinates'));
    })

    $('.command_center').css({
        top : parseInt($('polygon[data-coordinates="4,5"]').get_coords()[1]),
        left : parseInt($('polygon[data-coordinates="4,5"]').get_coords()[0])
    }).text($('polygon[data-coordinates="4,5"]').attr('data-coordinates'));

    $('.content').game_mars();

});

