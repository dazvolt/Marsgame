var _chances = {
  init : function (chances_default, chances_defined) {
    _chances.redraw(chances_default, chances_defined);
  },
  redraw : function () {
    $('#graphs [data-number="child-die"]').text(float_to_percent(_resources.defined.die.number, true, 0));
    $('#graphs [data-number="child-born"]').text(float_to_percent(_resources.defined.born.number, true, 0));
    $('#graphs [data-number="sudden-death"]').text(float_to_percent(_resources.defined.death.number, true, 0));
    $('#graphs [data-number="apocalypse"]').text(float_to_percent(_resources.defined.apocalypse.number, true, 3));
  },
  check_appliers : function (value, operand) { //this function check whether chances is going beyond their limits (like 120% or -20%)
    var allowed_range = [0, 1], //from 0 to 1, 0% to 100%
    result;
    //if we are operating with chances ->
    if (operand == 'born' || operand == 'die' || operand == 'death' || operand == 'apocalypse') {
      if (value < allowed_range[0]) {
        result = 'to_null';
        return result;
      } else
      if (value > allowed_range[1]) {
        result = 'to_full';
        return result;
      }
    }
  },
  roll_random : function ($that) {
    var which_to = $that.parents('.item').find('[data-locale]').attr('data-locale'),
      min, max;

    if (which_to == 'die') {
      min = 0;
      max = 1 - parseFloat(_resources.defined.born.number);
      _resources.defined.die.number = roll_specific( min, max, 2 );
      _game.die_chance.push((_resources.defined.die.number * 100).toFixed(0));
    } else
    if (which_to == 'born') {
      min = 0;
      max = 1 - parseFloat(_resources.defined.die.number);
      _resources.defined.born.number = roll_specific( min, max, 2 );
      _game.born_chance.push((_resources.defined.born.number * 100).toFixed(0));
    } else
    if (which_to == 'death') {
      min = (parseFloat(_resources.defined.die.number)) / 10;
      max = (1 - parseFloat(_resources.defined.born.number)) / 10;
      _resources.defined.death.number = roll_specific( min, max, 2 );
      _game.sudden_death_chance.push((_resources.defined.death.number * 100).toFixed(0));
    } else
    if (which_to == 'apocalypse') {
      min = (((parseFloat(_resources.defined.die.number)) / 10) + parseFloat(_resources.defined.death.number)) / 15;
      max = (1 - parseFloat(_resources.defined.born.number)) / (150 - parseFloat(_resources.defined.die.number));
      _resources.defined.apocalypse.number = roll_specific( min, max, 5);
      _game.apocalypse_chance.push((_resources.defined.apocalypse.number * 100).toFixed(3));
    }

    _chances.redraw();
  },
  apocalypse : function () { //Apocalypse check
    if (roll(_resources.defined.apocalypse.number)) {
      _game.end('apocalypse');
    }
  }
};