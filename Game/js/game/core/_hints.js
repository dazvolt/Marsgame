var _hints = {
  init : function () {
    $('[data-number="child-die"]').hook_hint(locale[data.language].hint.die);
    $('[data-number="child-born"]').hook_hint(locale[data.language].hint.born);
    $('[data-number="sudden-death"]').hook_hint(locale[data.language].hint.death);
    $('[data-number="apocalypse"]').hook_hint(locale[data.language].hint.apocalypse);
    $('[data-number="win-population"]').hook_hint(locale[data.language].hint.population[0] + ' ' + $('#man-container .man').length + '; ' + locale[data.language].hint.population[1] + ' ' + $('#woman-container .woman').length);


  }
};