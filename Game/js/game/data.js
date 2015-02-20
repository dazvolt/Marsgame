var data = {
    language: 'ru',
    resource: {
        default: {
            titan: {
                amount: 800,
                rate: 0,
                icon: '<i class="fa fa-cube"></i>'
            },
            uranium: {
                amount: 150,
                rate: 0,
                icon: '<i class="fa fa-cubes"></i>'
            },
            helium: {
                amount: 0,
                rate: 0,
                icon: '<i class="fa fa-cloud"></i>'
            },
            power: {
                amount: 0,
                rate: 0,
                icon: '<i class="fa fa-bolt"></i>'
            }
        },
        defined: {
            titan: {
                amount: 800,
                rate: 0
            },
            uranium: {
                amount: 150,
                rate: 0
            },
            helium: {
                amount: 0,
                rate: 0
            },
            power: {
                amount: 0,
                rate: 0
            }
        }
    },
    buildings: {
        window: '#buildings',

        power_plant: {
            resource: {
                titan: 120,
                uranium: 5
            },
            affect: {
                who: 'resource.defined.power.amount',
                amount: 75
            }
        },

        titan_plant: {
            resource: {
                titan: 150,
                uranium: 15
            },
            affect: {
                who: 'resource.defined.titan.multiplier',
                amount: 0.15
            }
        },

        uranium_plant: {
            resource: {
                titan: 220,
                uranium: 30
            },
            affect: {
                who: 'resource.defined.uranium.multiplier',
                amount: 0.1
            }
        },

        helium_plant: {
            resource: {
                titan: 500,
                uranium: 250
            },
            affect: {
                who: 'resource.defined.helium.multiplier',
                amount: 0.05
            }
        }
    }
};