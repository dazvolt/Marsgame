/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
$.fn.add_corners = function () {
  this.append('<div class="corners"><div class="tl"></div><div class="tr"></div><div class="bl"></div><div class="br"></div></div>');
};

$.fn.addText = function (text, newrow) {
  if (newrow) {
    this.html(this.html() + '<br />' + text);
  } else if (!newrow) {
    this.html(this.html() + text);
  }
};

function roll_array(value) {
  var max = value.length,
    min = 0,
    roll_value = parseInt(Math.random() * (max - min) + min);

  return value[roll_value];
}

function roll(value) {
  var master_roll = Math.random(),
    input_roll = (value),
    result = true;

  master_roll <= input_roll ? result = true : result = false;

  return result;
}

function roll_specific(min, max, fixed) {
  return (Math.random() * (max - min) + min).toFixed(fixed);
}

function random_color() {
  return 'rgb(' + roll_specific(0, 256, 0) + ', ' + roll_specific(0, 256, 0) + ', ' + roll_specific(0, 256, 0) + ')';
}

$.fn.bind_window = function (win) {
  this.on('click', function () {
    if (!$(this).hasClass('disabled')) {
      $(win).is(':visible') ? $(win).hide() : $(win).show();
    }
  });
  this.removeClass('disabled');
  init_window(win);
};

function init_window(win) {
  $(win).find('.close, .decline').on('click', function () {
    if (!$(this).hasClass('disabled') && !$(this).hasClass('not-main')) {
      $(this).parents(win).hide();
    }
  });
  $(win).find('> .title').mousedown(function () {
    $(this).parents(win).draggable().draggable('enable');
  });
  $(win).find('> .title').mouseup(function () {
    $(this).parents(win).draggable().draggable('disable');
  });
}

$.fn.init_flicker = function (timer, opacity, smooth) {
  var switcher = 0,
    $this = this,
    _timer = timer / 1000 + 's';
  if (smooth) {
    this.css({
      '-moz-transition': _timer,
      '-webkit-transition': _timer,
      '-o-transition': _timer,
      'transition': _timer
    });
  }
  setInterval(function () {
    if (switcher == 0) {
      $this.css('opacity', opacity);
      switcher = 1;
    } else {
      $this.css('opacity', 1);
      switcher = 0;
    }
  }, timer);
};

$.fn.get_coords = function () {
  var get_points = this.attr('points').split(','),
    x = parseInt(get_points[3].split(' ')[1]).toFixed(0),
    y = parseInt(get_points[4].split(' ')[2]).toFixed(0);

  return [x, y];
};

$.fn.throw_error = function (text, delay, mod) {
  var $this = this;
  if( $this.css('position') == null ) {
    $this.css('position','relative');
  }
  if ($this.find('.error_window').length <= 0) {
    $this.append('<div class="error_window window" style="display:none;"></div>');
    var $that = $this.find('.error_window');
    $that.text(text);
    if (mod == 'weed') $that.append('<div class="weed"></div>');
    $that.fadeIn(delay, function () {
      setTimeout(function () {
        $that.fadeOut(delay, function () {
          $that.remove();
        });
      }, delay * 2);
    });
  }
};

function traverse(obj, keys) {
  var nodes = keys.split('.');
  for (var i = 0; i < nodes.length; i++) {
    obj = obj[nodes[i]];
  }
  console.log(obj);
  return obj;
};

function compare(main, compare) {
  if (main <= compare) {
    return true;
  } else {
    return false;
  }
}

function float_to_percent (value, isText, fixed_size) {
  var result = (value * 100).toFixed(fixed_size);

  if (isText) return result+'%';
  if (!isText) return result;
}

function call_hint (text) {
  $('.j-diag .text').text(text);
  $('.j-diag').css({
    left: '10px',
    opacity: 1
  });
  setTimeout( function() {
    $('.j-diag').css({
      left: '-200px',
      opacity: 0
    });
  }, 3000);
}

$.fn.hook_hint = function (text) {
  var $this = this;
  $this.css('cursor', 'default');
  $this.on('mouseover', function () {
    $('.j-diag-free').show().css({
      top: $this.offset().top + $this.height(),
      left: $this.offset().left
    });
    $('.j-diag-free .text').text(text);
  });
  $this.on('mouseout', function () {
    $('.j-diag-free').hide();
  });
};

//Copyright Commodus Voke
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

