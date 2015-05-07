var _population = {
  list_man_string : '',
  list_woman_string : '',
  amount : 0,

  init : function () {
   $('#graphs [data-number="win-population"]').text(_resources.defined.population);
    _population.generate('man', roll_specific(24, 32, 0));
    _population.generate('woman', roll_specific(20, 28, 0));
    _population.list.add();
    _population.list.reset();
    _population.redraw();
  },
  generate : function (sex, age) {
    var random_handler;
    if (sex == 'man') {
      _population.list_man_string += '<p class="man"><span class="name">' + roll_array(malename) + '</span> : <span class="age">' + age + '</span> лет</p>';
    } else
    if (sex == 'woman') {
      _population.list_woman_string += '<p class="woman"><span class="name">' + roll_array(femalename) + '</span> : <span class="age">' + age + '</span> лет</p>';
    } else
    if (sex == 'random') {
      random_handler = Math.random();
      if (random_handler <= 0.4) { //40% chance for male to born
        _population.list_man_string += '<p class="man"><span class="name">' + roll_array(malename) + '</span> : <span class="age">' + age + '</span> лет</p>';
      } else { //60% chance for female to born
        _population.list_woman_string += '<p class="woman"><span class="name">' + roll_array(femalename) + '</span> : <span class="age">' + age + '</span> лет</p>';
      }
    }
    _population.amount += 1;
  },
  tick : function () {
    _population.test();
  },
  redraw : function () {
    $('#graphs [data-number="win-population"]').text(_population.amount);
  },
  list: {
    add : function () {
      $('#population #woman-container').append(_population.list_woman_string);
      $('#population #man-container').append(_population.list_man_string);
    },
    reset : function () {
      _population.list_man_string = '';
      _population.list_woman_string = '';
    }
  },
  test : function () {
    var determine = roll_specific(1, 5, 0);
    for (var i = 0; i < determine; i++ ) {
      _population.generate('random', roll_specific(0, 24, 0));
    }
    _population.list.add();
    _population.list.reset();
    _population.redraw();
  }
};