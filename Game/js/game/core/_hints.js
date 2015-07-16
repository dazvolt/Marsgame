/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _hints = {
  init : function () {
    $('[data-number="child-die"]').hook_hint(locale[data.language].hint.die + '<br/><br/>' + locale[data.language].hint.die_bonus + locale[data.language].hint.no_bonus);
    $('[data-number="child-born"]').hook_hint(locale[data.language].hint.born + '<br/><br/>' + locale[data.language].hint.born_bonus + locale[data.language].hint.no_bonus);
    $('[data-number="sudden-death"]').hook_hint(locale[data.language].hint.death + '<br/><br/>' + locale[data.language].hint.death_bonus + locale[data.language].hint.no_bonus);
    $('[data-number="apocalypse"]').hook_hint(locale[data.language].hint.apocalypse + '<br/><br/>' + locale[data.language].hint.apocalypse_bonus + locale[data.language].hint.no_bonus);
    $('[data-number="win-population"]').hook_hint(locale[data.language].hint.population[0] + ' ' + $('#man-container .man').length + '; ' + locale[data.language].hint.population[1] + ' ' + $('#woman-container .woman').length);
  }
};