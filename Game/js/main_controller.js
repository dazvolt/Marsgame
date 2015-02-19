/**
 * Created by Dazvolt on 2/19/15.
 */
$.widget("ui.game_mars", {
    options : {
        language : 'ru',
        resource : {
          default : {
              titan : {
                  amount : 800,
                  rate : 1,
                  icon : '<i class="fa fa-cube"></i>'
              },
              uranium : {
                  amount : 150,
                  rate : 1,
                  icon : '<i class="fa fa-cubes"></i>'
              },
              helium : {
                  amount : 0,
                  rate : 1,
                  icon : '<i class="fa fa-cloud"></i>'
              },
              power : {
                  amount : 0,
                  rate : 1,
                  icon : '<i class="fa fa-bolt"></i>'
              }
          },
          defined : {
              titan : {
                  amount : 800,
                  rate : 1
              },
              uranium : {
                  amount : 150,
                  rate : 1
              },
              helium : {
                  amount : 0,
                  rate : 1
              },
              power : {
                  amount : 0,
                  rate : 1
              }
          }
        },
        buildings : {
            window : '#buildings',

            power_plant : {
                resource : {
                    titan : 120,
                    uranium: 5
                },
                affect : {
                    who : 'resource.defined.power.amount',
                    amount : 75
                }
            },

            titan_plant : {
                resource : {
                    titan : 210,
                    uranium: 50
                },
                affect : {
                    who : 'resource.defined.titan.multiplier',
                    amount : 0.1
                }
            }
        }
    },
    _init : function () {
        var $this = this.element;

        this._build.init(this.options.buildings);
        //this._research.init(this.options.research);
        //this._population.init(this.options.population);
        DoLocale(this.options.language);
    },
    _button : { //control click on buttons in graphs
        init : function () {

        },
        child : {
            die : function () {

            },
            born : function () {

            }
        },
        colonist : {
            die : function () {

            }
        },
        apocalypse : function () {

        }
    },
    _condition : function () { //control what to do after buttons in graphs is clicked

    },
    _research :  { //controls everything related to research
        generate : function () {

        },
        controller : function () {

        },
        tick : function () {

        }
    },
    _build : { //controls everything related to buildings
        init : function (building_object) {
            this.generate(building_object);
            this.controller(building_object);
        },
        generate : function (building_object) {
            var $this = $(building_object.window);
            var parent = building_object;

            for (var get_key in parent) {
                console.log(get_key);
                if (get_key != 'window') {
                    $(parent.window)
                        .find('.buildings-container')
                        .append('<div class="item clearfix ' + get_key + '">' +
                            '<div class="image"></div>' +
                            '<div class="desc">' +
                            '<div class="title"><span data-locale="' + get_key + '"></span></div>' +
                            '<div class="text"><span data-locale="' + get_key + '-desc"></span><span>' + parent[get_key].affect.amount + ';</span></div>' +
                            '</div>' +
                            '<div class="resources"></div>' +
                            '</div>');
                }
            }
        },
        controller : function (building_object) {
            $(building_object.window).show();
        }
    },
    _population : { //controls everything related to population
        controller : function () {

        },
        tick : function () {

        }
    },
    _expedition : { //controls everything related to expedition
        controller : function () {

        },
        tick : function () {

        }
    },
    _event : { //controls everything related to game random events
        controller : function () {

        }
    },
    _restart : function () { //restarts game

    },
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});