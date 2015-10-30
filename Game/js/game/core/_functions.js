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
  return 'rgb(' + roll_specific(100, 256, 0) + ', ' + roll_specific(100, 256, 0) + ', ' + roll_specific(100, 256, 0) + ')';
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

function call_window_hint (text, title, buttons, callback) {
  var $this = $('.big-hint');
  $this.fadeIn(1000);
  $this.find('.title').text(title);
  $this.find('.body').html(text).css('text-align','center').css('color','rgb(210, 219, 226)');
  if (buttons[0] == true) {
    $(this).find('.button.accept').show();
  }
  if (buttons[1] == true) {
    $(this).find('.button.decline').show();
  }
  $('.blackener').fadeIn(500);
  $this.find('.button.accept').on('click', function () {
    $this.hide();
    $('.blackener').hide();
    if (callback) callback();
  });
}

function call_window_hint_form (text, title, buttons, custom, callback) {
    var $this = $('.big-hint-form');
    setTimeout(function(){
        $this.find('.form-input').focus();
    }, 1200);
    $this.fadeIn(1000);
    $this.find('.title').text(title);
    $this.find('.body .text').typed({
        strings: [text],
        typeSpeed: 0
    }).css('text-align','center').css('color','rgb(210, 219, 226)');
    if (buttons[0] == true) {
        $(this).find('.button.accept').show();
    }
    if (buttons[1] == true) {
        $(this).find('.button.decline').show();
    }
    $('.blackener').fadeIn(500);
    $this.find('.button.accept').on('click', function () {
        if (custom) custom($this);
        if (callback) callback();
    });
}

$.fn.hook_hint = function (text) {
  var $this = this;
  $this.css('cursor', 'default');
  $this.on('mouseover', function () {
    $('.j-diag-free').show().css({
      top: $this.offset().top + $this.height(),
      left: $this.offset().left
    });
    $('.j-diag-free .text').html(text);
  });
  $this.on('mouseout', function () {
    $('.j-diag-free').hide();
  });
};
$.fn.extend({
  hook_hint_update : function (text) {
    var $this = this;

    $this.css('cursor', 'default');
    $this.on('mouseover', function () {
      $('.j-diag-free').show().css({
        top: $this.offset().top + $this.height(),
        left: $this.offset().left
      });
      $('.j-diag-free .text').html(text);
    });
    $this.on('mouseout', function () {
      $('.j-diag-free').hide();
    });
  }
});

//Copyright Commodus Voke
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Copyright Matt Huggins http://stackoverflow.com/users/107277/matt-huggins
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 2000,  // how long it should take to count between the target numbers
        refreshInterval: 10,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null  // callback method for when the element finishes updating
    };
})(jQuery);
