$(document).ready( function () {
    $('.content').gameMars({
        winpopulation : 1000,
    });
    $('.content').gameMars('debug', 'res', 100000);
    $('.j-winpopulation').text('2');
    $('.j-new-game').on('click', function () {
        location.reload();
    });
    $('.close-intro').on('click', function() {
        $('.intro').remove();
    });
    
    $('.map svg').mapGen();
    $('.content').generateUI();
    DoLocale('ru');

    console.log(roll(50))
    console.log(roll(50))
    console.log(roll(50))
    console.log(roll(50))
    console.log(roll(50))
    console.log(roll(50))
});