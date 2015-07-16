/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _win = {
  check : function () {
    if (data.population >= data.win_target) {
     _game.end('win');
    }
  }
};