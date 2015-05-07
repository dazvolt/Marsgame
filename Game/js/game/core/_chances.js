var _chances = {
  init : function (chances_default, chances_defined) {
    _chances.redraw(chances_default, chances_defined);
  },
  redraw : function () {
    $('#graphs [data-number="child-die"]').text(float_to_percent(_resources.defined.die.number, true, 0));
    $('#graphs [data-number="child-born"]').text(float_to_percent(_resources.defined.born.number, true, 0));
    $('#graphs [data-number="sudden-death"]').text(float_to_percent(_resources.defined.sdeath.number, true, 0));
    $('#graphs [data-number="apocalypse"]').text(float_to_percent(_resources.defined.apocalypse.number, true, 3));
  }
};