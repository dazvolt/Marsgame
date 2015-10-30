/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _start = {
    windows: ['#top-panel', '#map', '#graphs', '#log'],
    height: [],
    init: function () {
        for (var i = 0; i < _start.windows.length; i++) {
            _start.height.push($(_start.windows[i]).css('height'));
            $(_start.windows[i]).css({
                height: '0',
                overflow: 'hidden',
                opacity: 0
            });
        }
        $('#map .background').append('<div class="noise"></div>');
        $('#map .background').addClass('grayscale');
    },
    open_windows: function () {
        for (var i = 0; i < _start.windows.length; i++) {
            $(_start.windows[i]).animate({
                height: _start.height[i],
                opacity: 1
            }, 1500, function () {
                $('.window').css({
                    overflow: 'visible'
                });
            });
        }
        setTimeout(function () {
            call_window_hint(locale[data.language].tutorial.desc, locale[data.language].tutorial.title, [true, false], function () {
                $('#map .background').removeClass('grayscale');
                $('.noise').animate({
                    height: 1,
                    top: '50%',
                    opacity: 0.7
                }, 1500, function () {
                    $(this).animate({
                        width: 1,
                        left: '50%',
                        opacity: 0.4
                    }, 700, function () {
                        $('.noise').remove();
                    });
                });
                call_window_hint_form(locale[data.language].tutorial_start.desc, locale[data.language].tutorial_start.title, [true, false], function ($this) {
                    if ($this.find('input').val() === '' && !$this.hasClass('accepted')) {
                        $this.find('.message').text(locale[data.language].tutorial_start.error_nothing);
                    } else if ($this.find('input').val().length > 15 && !$this.hasClass('accepted')) {
                        $this.find('.message').text(locale[data.language].tutorial_start.error_length);
                    } else {
                        if (!$this.hasClass('accepted')) {
                            data.commander.name = roll_array(locale[data.language].tutorial_start.first_name) + ' ' + $this.find('input').val() + ' ' + roll_array(locale[data.language].tutorial_start.last_name);
                            $this.find('.text').html(locale[data.language].tutorial_start.accept + data.commander.name);
                            $this.find('.message').typed({
                                strings: [locale[data.language].tutorial_start.messages.message + '<span class="s-mess-s">"' + roll_array(locale[data.language].tutorial_start.messages.array).replace(/%name%/g, data.commander.name) + (locale[data.language].tutorial_start.messages.second).replace(/%name%/g, data.commander.name) + '"</span>'],
                                typeSpeed: 0
                            });
                            $('#map').find('.commander-title').html(locale[data.language].map.commander);
                            $('#map').find('.name').text(data.commander.name);
                        }
                        $this.find('input').hide();
                        $this.find('.footer').animate({height: 0}, 500);
                        $this.find('.footer .button.accept').hide();
                        if ($this.find('.dogtag').length === 0) {
                            $this.append('<div class="dogtag"><span></span><span></span><span></span></div>');
                        }
                        $this.find('.dogtag span:eq(0)').text(data.commander.name.split(" ")[0]);
                        $this.find('.dogtag span:eq(1)').text(data.commander.name.split(" ")[1]);
                        $this.find('.dogtag span:eq(2)').text(data.commander.name.split(" ")[2]);
                        $this.find('input').val('');
                        $this.find('.dogtag').on('click', function(){
                            $(this).hide();
                            $(this).addClass('accepted');
                        });
                        setTimeout(function () {
                            $this.find('.footer').animate({height: '55px'}, 500);
                            $this.find('.footer .button.accept').show();
                        }, 1500);
                        $this.find('.button.accept').on('click', function () {
                            $this.addClass('accepted');
                            if (!$this.find('.dogtag').is(':visible')) {
                                $this.hide();
                                $('.blackener').hide();
                            } else {
                                $this.find('.message').html(locale[data.language].tutorial_start.messages.message + '<span class="s-mess-s">"' + locale[data.language].tutorial_start.tag.replace(/%name%/g, data.commander.name) + '"</span>');
                            }
                        });
                    }
                });
            });
        }, 3000);
    }
};