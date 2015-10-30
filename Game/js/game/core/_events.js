/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var _events = {
    init: function () {

    },
    tick: function () {
        if (roll(_event.main_chance)) {
            var roll_bad_event = roll(_event.bad);
            var roll_good_event = roll(_event.good);
            if (roll_bad_event && roll_good_event) {
                return false;
            } else if (!roll_bad_event && !roll_good_event) {
                return false;
            } else if (!roll_bad_event && roll_good_event) {
                var which = roll_array(_events.good);
                if (which == 'resource') {
                    var arr_result = _events.rolls.resource();
                    _resources.defined[arr_result[0]].amount += parseInt(arr_result[1]);
                    _resource.redraw();
                    _log.report.event('resource', 'good', arr_result[0], parseInt(arr_result[1]));
                }
                if (which == 'chances') {
                    var arr_result = _events.rolls.chance('positive');
                    _resources.defined[arr_result[0]].number = parseFloat(_resources.defined[arr_result[0]].number) + arr_result[1];

                    if (_resources.defined[arr_result[0]].number < 0) {
                        _resources.defined[arr_result[0]].number = 0;
                    }
                    if (_resources.defined[arr_result[0]].number > 1) {
                        _resources.defined[arr_result[0]].number = 1;
                    }
                    _chances.redraw();
                    _log.report.event('chances', 'good', arr_result[0], arr_result[1] * 100);
                }
            } else if (roll_bad_event && !roll_good_event) {
                var which = roll_array(_events.bad);
                if (which == 'resource') {
                    var arr_result = _events.rolls.resource();
                    _resources.defined[arr_result[0]].amount = parseInt(_resources.defined[arr_result[0]].amount) - parseInt(arr_result[1]);

                    if (_resources.defined[arr_result[0]].amount < 0) {
                        _resources.defined[arr_result[0]].amount = 0;
                    }
                    _resource.redraw();
                    _log.report.event('resource', 'bad', arr_result[0], parseInt(arr_result[1]));
                }
                if (which == 'chances') {
                    var arr_result = _events.rolls.chance('negative');
                    console.log(arr_result[1] + ' ' + _resources.defined[arr_result[0]].number + ' ');
                    _resources.defined[arr_result[0]].number = parseFloat(_resources.defined[arr_result[0]].number) + arr_result[1];

                    if (_resources.defined[arr_result[0]].number < 0) {
                        _resources.defined[arr_result[0]].number = 0;
                    }
                    if (_resources.defined[arr_result[0]].number > 1) {
                        _resources.defined[arr_result[0]].number = 1;
                    }
                    _chances.redraw();
                    _log.report.event('chances', 'bad', arr_result[0], arr_result[1] * 100);
                }
            }
        }
        //do event
        //log event info
        //redraw UI
    },
    rolls: {
        resource: function () {
            var roll_diff = Math.random().toFixed(2);
            var which_resource = roll_array(['titan', 'uranium', 'helium', 'power']);
            var multiplier = 0;
            if (roll_diff < 0.3) {
                multiplier = 1.2; //small amount
            }
            if (roll_diff < 0.9 && roll_diff > 0.3) {
                multiplier = 2; //medium amount
            }
            if (roll_diff >= 0.9 && roll_diff <= 0.95) {
                multiplier = 2.5; //big amount
            }
            if (roll_diff >= 0.96) {
                multiplier = 5; //tremendous amount
            }
            var year = parseInt($('[data-number="cur-year"]').text());
            var amount_result = roll_diff * 10 * multiplier * year;
            if (amount_result >= 0 && amount_result <= 1) {
                amount_result = 1;
            }
            return [which_resource, amount_result];
        },
        chance: function (param) {
            var which_chance = roll_array(['born', 'die', 'death', 'apocalypse']);
            var result_amount;
            if (param == 'positive') {
                if (which_chance == 'born') result_amount = Math.abs(parseFloat(roll_specific(0.01, 0.03, 2)));
                if (which_chance == 'die') result_amount = -Math.abs(parseFloat(roll_specific(0.01, 0.03, 2)));
                if (which_chance == 'death') result_amount = -Math.abs(parseFloat(roll_specific(0.01, 0.03, 2)));
                if (which_chance == 'apocalypse') result_amount = -Math.abs(parseFloat(roll_specific(0.0001, 0.00055, 5)));
            }
            if (param == 'negative') {
                if (which_chance == 'born') result_amount = -Math.abs(parseFloat(roll_specific(0.05, 0.20, 2)));
                if (which_chance == 'die') result_amount = Math.abs(parseFloat(roll_specific(0.05, 0.20, 2)));
                if (which_chance == 'death') result_amount = Math.abs(parseFloat(roll_specific(0.05, 0.25, 2)));
                if (which_chance == 'apocalypse') result_amount = Math.abs(parseFloat(roll_specific(0.0005, 0.00125, 5)));
            }
            return [which_chance, result_amount];
        }
    },
    good: ['resource', 'chances'],
    bad: ['resource', 'chances', 'aliens']
};