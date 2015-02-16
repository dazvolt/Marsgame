$(document).ready( function () {
    $('.content').gameMars({
        winpopulation : 1000,
    });
    $('.content').gameMars('debug', 'res', 100000);
    $('.j-winpopulation').text('2');
    $('.j-new-game').on('click', function () {
        location.reload();
    });
    
    $('#map svg').mapGen();
    $('.content').generateUI();
    DoLocale('ru');

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
    init_window('#chest');
});