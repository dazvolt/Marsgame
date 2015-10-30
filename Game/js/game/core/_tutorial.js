/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _tutorial = {};
var _settingsw = {
    init: function () {
        var userLang = navigator.language || navigator.userLanguage;
        var $this = $('.initial_settings.window');
        $this.hide();
        $this.fadeIn(1000);
        if (userLang == 'ru') {
            $this.find('.rus').addClass('selected');
            $this.find('.title').text(locale['ru'].welcome_settings.title);
            $this.find('.language .choose').text(locale['ru'].welcome_settings.language);
            $this.find('.tutorial label span').text(locale['ru'].welcome_settings.tutorial);
        }
        if (userLang == 'en-US') {
            $this.find('.eng').addClass('selected');
            $this.find('.title').text(locale['en'].welcome_settings.title);
            $this.find('.language .choose').text(locale['en'].welcome_settings.language);
            $this.find('.tutorial label span').text(locale['en'].welcome_settings.tutorial);
        }
        _settingsw.lang_change($this);
        _settingsw.apply($this);
        $('.blackener').show();
    },
    lang_change: function ($this) {
        $this.find('.lang').on('click', function () {
            var get_lang = $(this).data('language');
            $this.find('.lang').removeClass('selected');
            $(this).addClass('selected');
            if (get_lang == 'rus') {
                $this.find('.rus').addClass('selected');
                $this.find('.title').text(locale['ru'].welcome_settings.title);
                $this.find('.language .choose').text(locale['ru'].welcome_settings.language);
                $this.find('.tutorial label span').text(locale['ru'].welcome_settings.tutorial);
                data.language = 'ru';
            }
            if (get_lang == 'eng') {
                $this.find('.eng').addClass('selected');
                $this.find('.title').text(locale['en'].welcome_settings.title);
                $this.find('.language .choose').text(locale['en'].welcome_settings.language);
                $this.find('.tutorial label span').text(locale['en'].welcome_settings.tutorial);
                data.language = 'en';
            }
        });
    },
    apply: function ($this) {
        $this.find('.button.accept').on('click', function () {

            setTimeout(function () {
                locale_start(data.language);
            }, 900);
            _start.open_windows();
            $('.blackener').hide();
            $this.fadeOut(500, function () {
                $this.remove();
            });
        });
    }
};