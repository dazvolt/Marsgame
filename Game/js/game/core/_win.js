var _win = {
  check : function () {
    if (data.population >= data.win_target) {
     _game.end('win');
    }
  }
};