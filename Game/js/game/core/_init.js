function _init_game () {

    _resource.init();
    _build.init(data.buildings, data.resource.default, data.resource.defined);

    //this._research.init(this.options.research);
    //this._population.init(this.options.population);
    DoLocale(data.language);
};