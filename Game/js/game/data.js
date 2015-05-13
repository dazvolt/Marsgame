//percentage values must be defined according to float value, as 1 = 100% and 0 = 0%
var data = {
  language: 'ru',
  win_target: 1000,
  allow_research : false,
  allow_expedition : false
};

var _resources = {
  default: { //default resources which is used as resource amount init at game start (used for correct restart values)
    titan: {
      amount: 800,
      rate: 1,
      icon: '<i class="fa fa-cube"></i>'
    },
    uranium: {
      amount: 150,
      rate: 1,
      icon: '<i class="fa fa-cubes"></i>'
    },
    helium: {
      amount: 0,
      rate: 1,
      icon: '<i class="fa fa-cloud"></i>'
    },
    power: {
      amount: 0,
      rate: 1,
      icon: '<i class="fa fa-bolt"></i>'
    },
    time: {
      icon: '<i class="fa fa-clock-o"></i>'
    },
    born: {
      number: 0.6
    },
    die: {
      number: 0.4
    },
    death: {
      number: 0.02
    },
    apocalypse: {
      number: 0.001
    },
    population : 0
  },
  defined: { //defined resources which is used as primary object for resource store
    titan: {
      amount: 100000,
      rate: 0,
      buildings: 0
    },
    uranium: {
      amount: 100000,
      rate: 0,
      buildings: 0
    },
    helium: {
      amount: 90000,
      rate: 0,
      buildings: 0
    },
    power: {
      amount: 90000,
      rate: 1,
      buildings: 0
    },
    born: {
      number: 0.6
    },
    die: {
      number: 0.4
    },
    death: {
      number: 0.02
    },
    apocalypse: {
      number: 0.001
    },
    population : 0
  }
};

var _buildings = { //buildings defined object
  window: '#buildings',

  power_plant: {
    resource: {
      uranium: 25,
      titan: 50
    },
    affect: {
      who: [['power','amount']],
      amount: [75]
    },
    count : 0 //how much plants existing
  },

  titan_plant: {
    resource: {
      power: 50,
      uranium: 35,
      titan: 75
    },
    affect: {
      who: [['titan','rate']],
      amount: [0.15]
    },
    count : 0 //how much plants existing
  },

  uranium_plant: {
    resource: {
      power: 80,
      uranium: 100,
      titan: 120
    },
    affect: {
      who: [['uranium','rate']],
      amount: [0.1]
    },
    count : 0 //how much plants existing
  },

  helium_plant: {
    resource: {
      power: 120,
      uranium: 250,
      titan: 300
    },
    affect: {
      who: [['helium','rate']],
      amount: [0.05]
    },
    count : 0 //how much plants existing
  },

  housing_plant : {
    resource: {
      power: 90,
      helium: 20,
      uranium: 250,
      titan: 500
    },
    affect: {
      who: [['born','number']],
      amount: [0.05]
    },
    count : 0 //how much plants existing
  },

  medical_plant: {
    resource: {
      power: 250,
      helium: 100,
      uranium: 500,
      titan: 1200
    },
    affect: {
      who: [['born','number'], ['die','number']],
      amount: [0.2, -0.1]
    },
    count : 0 //how much plants existing
  },

  tech_plant: {
    resource: {
      power: 400,
      helium: 200,
      uranium: 700,
      titan: 1500
    },
    affect: {
      who: [],
      amount: []
    },
    count : 0 //how much plants existing
  },

  laboratory_plant: {
    resource: {
      power: 1000,
      helium: 1000,
      uranium: 2000,
      titan: 3000
    },
    affect: {
      who: [['apocalypse','number']],
      amount: [-0.0003]
    },
    count : 0 //how much plants existing
  },

  starport_plant: {
    resource: {
      power: 2500,
      helium: 5000,
      uranium: 10000,
      titan: 20000
    },
    affect: {
      who: [],
      amount: []
    },
    count : 0 //how much plants existing
  },

  defend_plant: {
    resource: {
      power: 30000,
      helium: 2000,
      uranium: 5000,
      titan: 50000
    },
    affect: {
      who: [],
      amount: []
    },
    count : 0 //how much plants existing
  }
};

var _researches = {
  window : '#research',
  level_resource_scale: 2.35,

  capacity : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 2
    },
    affect: {
      who: [['power','building']],
      amount: [25]
    }
  },

  medicine : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 4
    },
    affect: {
      who: [['die','number']],
      amount: [-0.02]
    }
  },

  extraction : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 5
    },
    affect: {
      who: [['titan','rate'], ['helium','rate'], ['uranium','rate']],
      amount: [0.05, 0.01, 0.03]
    }
  },

  expedition : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 3
    },
    affect: {
      who: [['titan','rate'], ['helium','rate'], ['uranium','rate']],
      amount: [0.05, 0.01, 0.03]
    },
    runtime: 11 //how much time expedition lasts until end (-1 will be applied after first research)
  },

  tech : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 5
    },
    affect: {
      who: [['titan','rate'], ['helium','rate'], ['uranium','rate']],
      amount: [0.05, 0.01, 0.03]
    }
  },

  life : {
    resource: {
      helium: 100,
      uranium: 200,
      titan: 300,
      time: 10
    },
    affect: {
      who: [['titan','rate'], ['helium','rate'], ['uranium','rate']],
      amount: [0.05, 0.01, 0.03]
    }
  }
};


