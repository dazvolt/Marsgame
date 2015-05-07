var _resource = {
  init: function () {
    this.redraw();
  },
  redraw: function () {
    $('#top-panel #resource .resource').each(function () {
      $(this).find('span[data-resource="amount"]').text(_resources.defined[$(this).attr('id')].amount);
    });
  },
  redraw_research : function (research_name, amount, level, resource_name) {
    $(_researches.window).find('div[data-research="' + research_name + '"] .resources .' + resource_name + ' [data-resource="amount"]').text(amount);
    $(_researches.window).find('div[data-research="' + research_name + '"] [data-level]').text(level);
  },
  tick : function () {
    _resources.defined.titan.amount += parseInt((_resources.defined.titan.rate * 100).toFixed(0));
    _resources.defined.uranium.amount += parseInt((_resources.defined.uranium.rate * 50).toFixed(0));
    _resources.defined.helium.amount += parseInt((_resources.defined.helium.rate * 10).toFixed(0));

    this.redraw();
  }
};