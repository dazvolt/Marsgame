var _dependency = {
  init : function () {
    //buildings
    for (var bkey in _buildings) {
      for (var bkey_inner in _buildings[bkey]) {
        if (bkey_inner == 'dependency') {
          $(_buildings.window).find('.'+bkey).hide();
          _buildings[bkey].allowed = false;
        }
      }
    }
    //research
    for (var rkey in _researches) {
      for (var rkey_inner in _researches[rkey]) {
        if (rkey_inner == 'dependency') {
          $(_researches.window).find('.'+rkey).hide();
          _researches[rkey].allowed = false;
        }
      }
    }
  },
  check : {
    buildings: function () {
      for (var vkey in _buildings) {
        if (vkey != 'window') {
          for (var vkey_inner in _buildings[vkey]) {
            if (vkey_inner == 'dependency') {
              var catch_dependency = _buildings[vkey][vkey_inner];
              for (var i = 0; i < catch_dependency.length; i++) {
                if(catch_dependency[i] != true) {
                  if (_buildings[catch_dependency[i]].count > 0) {
                    catch_dependency[i] = true;
                  }
                }
              }
              var checker = true;
              for (var iz = 0; iz < catch_dependency.length; iz++) {
                if (catch_dependency[iz] != true) {
                  checker = false;
                  return false;
                }
              }
              if (checker) {
                _buildings[vkey].allow = true;
                $(_buildings.window).find('.'+vkey).show();
                call_hint(locale[data.language].hint.new_building);
              }
            }
          }
        }
      }
    },
    researches : function () {
      for (var rkey in _researches) {
        if (rkey != 'window' && rkey != 'level_resource_scale') {
          for (var rkey_inner in _researches[rkey]) {
            if (rkey_inner == 'dependency') {
              var catch_dependency = _researches[rkey][rkey_inner];
              for (var i = 0; i < catch_dependency.length; i++) {
                if (catch_dependency[i] != true) {
                  if (_researches[catch_dependency[i]].level > 0) {
                    catch_dependency[i] = true;
                  }
                }
              }
              var checker = true;
              for (var iz = 0; iz < catch_dependency.length; iz++) {
                if (catch_dependency[iz] != true) {
                  checker = false;
                  return false;
                }
              }
              if (checker) {
                _researches[rkey].allow = true;
                $(_researches.window).find('.'+rkey).show();
              }
            }
          }
        }
      }
    }
  }
};