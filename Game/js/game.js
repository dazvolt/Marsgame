/**
 * @package     Mars colonization game.
 * @description This widget controls entire Mars colonization game.
 * @option      winpopulation [int] - how much people do you need to achieve win condition.
 * @option      diechance [int] - starting child dying chance
 * @option      birthchance [int] - starting child birth chance
 * @option      suddendeathchance [int] - starting sudden death chance
 * @option      doomsdaychance [float] - starting doomsday chance
 * @author      Dazvolt <dazvolt@gmail.com>
 * @copyright   Copyright (c) 2014, Dazvolt
 * @license     MIT License
 **/

$.widget("ui.gameMars", {
    options : {
        winpopulation : 20,
        diechance : 40,
        birthchance : 60,
        suddendeathchance : 5,
        doomsdaychance : 0.125,
    },
    _bonuses : {
        diechance : 0,
        birthchance : 0,
        suddendeathchance : 0,
        doomsdaychance : 0,
    },
    _currency : {
        ilmenit : {
            amount : 0,
            multiplier : 0,
        },
        titan : {
            amount : 180, //500 is default
            multiplier : 1,
        },
        energy : {
            amount : 0,
            multiplier : 1,
        },
    },
    _buildings : {
        medicalblock : {
            exist : false,
            value : {
                titan : 75,
                energy : 100,
            },
            bonus : 5,
        },
        livingrooms : {
            exist : false,
            value : {
                titan : 50,
                energy : 80,
            },
            bonus : 5,
        },
        mine : {
            exist : false,
            value : {
                titan : 30,
                energy : 150,
            },
        },
        refinery : {
            exist: false,
            value : {
                titan : 50,
                energy : 200,
            },
        },
        logistics : {
            exist: false,
            value : {
                titan : 50,
                energy : 150,
            },
        },
        laboratory : {
            exist: false,
            value : {
                titan : 300,
                energy : 250,
            },
            bonus : 0.1,
        },
        commandcenter : {
            exist: true,
            value : {
                titan : 250,
                energy : 150,
            },
        },
        powerplant : {
            exist: false,
            value : {
                titan : 15,
                energy : 0,
            },
            addEnergy : 75,
        },
        defendperimeter : {
            exist: false,
            value : {
                titan : 10000,
                energy : 1000,
            },
        },
    },
    _filters : {
        childdie : true,
        childborn : true,
        colonistdie : true,
    },
    _text : {
        labels : {
            suddendeath : '<span class="red">ВНЕЗАПНАЯ СМЕРТЬ </span>',
            worldcollapse : '<span class="red">КОНЕЦ СВЕТА! </span>',
            year : 'Год',
            endgame : '<span class="red">ВЫ ПРОИГРАЛИ! </span>',
        },
        bornbaby : ['Родился новый ребенок.'],
        babydied : ['Новый ребенок родился недоношенным и <span class="gray">умер</span>.', 'Рожденный ребенок обладал необъяснимой мутацией и <span class="gray">умер</span> из-за неё.', 'Родился новый ребенок, но он <span class="gray">умер</span> по необъяснимым причинам!','Новый ребенок пришел на этот свет, но поскольку мать рожала в антисанитарных условиях, он <span class="gray">умер</span>.'],
        colonistdied : ['вышел погулять и наткнулся на камень, после чего больно ударился носом оземь, разбил стекло скафандра и <span class="gray">умер</span>. Нелегко быть старым!', 'забыл свой скафандр и вышел наружу, после чего <span class="gray">умер</span>. Ох уж этот альцгеймер!', 'забыл принять свои таблетки и быстро, решительно <span class="gray">умер</span>.', '<span class="gray">умер</span> из-за своей старости. Вечная память!'],
        suddendeath : ['решил поиграть в дартс, но вместо дротиков случайно использовал кислородные баллоны и <span class="gray">погиб</span>.', 'до пены у рта и хрипоты в горле спорил со стеной о невозможности дышать на поверхности Марса. Печальная <span class="gray">смерть</span> от истощения спустя несколько суток.', 'споткнулся и <span class="gray">умер</span>.', 'просто <span class="gray">перестал дышать</span>.', 'сражаясь с неизвестным противником уклонился в пропасть.', 'открыл форточку в своей комнате.', 'вместо кислородного баллона взял баллон с углекислым газом и отправился наружу.', 'высекал искры плазменным резаком из трубы с нейротоксинами.', 'устроил конкурс "попади в яблоко". Попал. В голову. Себе.', 'провели обряд изгнания духов. Изгнали вместе с духами на поверхность.', 'устроил пьяную драку в коммунальной комнате. Почти не умер, но оператор добил его своей видеокамерой.', 'слишком долго размышлял в уборной. Мысли оформились в чужого и тот сожрал колониста.', 'перепутал себя с пауком и сожрал себя после спаривания.','слишком сильно переживал об отношениях и захлебнулся <span class="gray">насмерть</span> в слюнях.','перебрал на вечеринке и захлебнулся <span class="gray">насмерть</span> рвотой.','занюхнул на дорожку, но не справился с управлением ровера и <span class="gray">умер</span>, упав в пропасть.'],
        worldcollapse : ['Прилетевший из червоточины корабль инопланетных существ высадился на Марс и стерилизовал всех колонистов. Дальнейшее размножение невозможно.', 'На Марс падает метеорит. Все колонисты погибают.', 'Солнце превращается в сверхновую звезду и сжигает всю поверхность Марса к чертям.', 'Ваши колонисты нашли Обелиск. Айзек застрял в межгалактической пробке и всю колонию сожрали некроморфы.', 'Жидкость, которую притащил сантехник, проела емкость, все переборки, и ушла в грунт планеты на 5 км. Из-за разгерметизации все умерли.', 'Тараканы, которые выбрались на поверхность, мутировали в двухметровых и убили всю колонию.', 'Дарт Вейдер возжелал минералов ваших колонистов. Минералы возжелали Дарта Вейдера. Колонисты остались без ресурсов и умерли от осознания того что их не пожелал Дарт Вейдер.', 'Сидящий все время в своей комнате колонист Сычинс увидел девушку своей мечты с колонистом Ерохинзом, и вся планета была разнесена вдребезги жаром, превосходящим солнце.', 'Одному колонисту от недостатка кислорода привиделся двухметровый желтый пегас с розовой гривой, приказавший уничтожить всех. В награду пегас пообещал произвести действия сексуального характера с задним проходом колониста. Колония была уничтожена в течении 12 часов.', 'Некому продолжать род - женщины смотрят "Санта Барбару", трупы мужчин играют в футбол на поверхности.', 'Небольшое отделение колонии решило, что оно достойно большего, и возжелало стать отдельной колонией. После продолжительной гражданской войны, руководство решило уничтожить станцию.', 'Кто-то перепутал кнопку самоуничтожения станции с кнопкой кофеварки.', 'Кто-то рассказал анекдот.', 'Один колонист нашёл пулемёт. Больше в колонии никто не живёт.'],
        events : {
            diechance : ['Медицинский блок пострадал от пожара.', 'В вашей колонии завелся врач-маяньяк.', 'Несколько колонистов сходят с ума.', 'Мощное землетрясение потрясает Марс и наносит ущерб вашей инфраструктуре.'],
            bornchance : ['Ухудшается атмосфера Марса, ваша колония технически не подготовлена к таким последствиям.', 'Новое поколение детей пьет и ругается матом. Главный ИИ колонии "Протон" решает замедлить рождаемость.', 'Заканчиваются медицинские расходники.'],
            suddendeathchance : ['Градус неадеквата повышается в следствии того, что один из колонистов находит ящик виски и делится им с остальными.', 'Несколько колонистов пробрались на склад и спионерили парочку плазменных резаков.', '"Какие приборы?!" - Громко воскликнул главный врач колонии. - "Мне не нужны никакие приборы!"'],
            worldcollapsechance : ['Планете Марс скучно.', 'В Марс врезается Имперский крейсер.', 'Дарт Вейдер находит Марс весьма привлекательным.', 'Температура Солнца повышается.', 'Главный ИИ колонии "Протон", который управляет всеми системами, барахлит.','Марс меняет магнитные поля.','На Земле построили новый коллайдер длиной 4000км.'],
            resourceacquire : ['Ваши колонисты находят старый разбитый корабль и разбирают его.', 'Рабочие надрываются изо всех сил и приносят дополнительное количество титана в этом году.', 'Какой-то идиот разобрал жилой блок.', 'Колонисты нашли применение старым расходникам.', 'На планету падает небольшой, но очень богатый ресурсами метеорит.'],
        },
        buildingDialog : {
            livingroom : 'Жилой корпус повышает шанс рождения детей на 5% за каждое строение.',
            medicalcenter : 'Медицинский центр уменьшает шанс смерти детей на 5% за каждое строение.',
            laboratory : 'Лаборатория позволяет проводить исследования и уменьшает шанс конца света на 0.1% за каждое строение.',
            powerplantstart : 'Электростанция вырабатывает +',
            powerplantend : ' Вт за каждое строение.',
            miner : 'Шахта повышает добычу ильменита.',
            refinery : 'Завод переработки увлечивает скорость переработки ильменита в титан.',
            logistics : 'Завод техники увеличивает скорость доставки ильменита из шахт на заводы переработки.',
        },
        researchDialog : {
            power : 'Исследование энергетики позволит вырабатывать больше электроэнергии на солнечных станциях. +25 Ватт к каждой электростанции за один уровень исследования.',
            refinery : 'Исследование выработки позволит более эффективно добывать ильменит и перерабатывать его в титан. Добыча +5%, Переработка +5% за один уровень исследования.',
            science : 'Исследование науки позволит лучше оборудовать медицинские центры. Шанс рождения детей +5% за каждый уровень исследования.',
            expedition : 'Исследование экспедиций позволяет колонистам периодически отправляться вглубь планеты Марс, в надежде найти необычные строения, ресурсы и прочие полезные вещи. Каждый уровень уменьшает время необходимое на проведение полной экспедиции.',
            life : 'События в колонии случаются чаще на 20% за каждый уровень.',
        },
    },
    _loadCornersUI : {
        objects : ['.j-diag', '.intro', '.topstat', '.graphs', '.log', '.filter', '.mzdp', '.window'],
        color : '#fff',
    },
    _research : {
        power : {
            name : 'Энергетика.',
            level : 1,
            timing: 2,
            tick : 0,
            affect : 25,
            value : 100,
        },
        refinery : {
            name : 'Выработка ресурсов.',
            level : 1,
            timing: 3,
            tick : 0,
            affect : 5,
            value : 150,
        },
        science : {
            name : 'Наука.',
            level : 1,
            timing: 5,
            tick : 0,
            affect : 5,
            value : 200,
        }, 
        expedition : {
            name : 'Экспедиции.',
            level : 1,
            timing: 5,
            tick : 0,
            affect : 1,
            value : 200,
        },
        life : {
            name : 'Жизнь бурлит.',
            level : 1,
            timing: 2,
            tick : 0,
            affect : 5,
            value : 200,
        },
    },
    _expedition : {
        maxLength : 10,
        minLength : 2,
    },
    _init : function () {
        var settings = this.options,
        $this = this.element,
        the = this;
        this.$diebutton = $this.find('.j-die-chance');
        this.$birthbutton = $this.find('.j-birth-chance');
        this.$suddendeathbutton = $this.find('.j-sudden-death');
        this.$doomsdaybutton = $this.find('.j-doomsday');
        this.$generatebutton = $this.find('.j-generate');
        this.$woman = $this.find('.woman .output');
        this.$man = $this.find('.man .output');
        this.$population = $this.find('.j-winpopulation');
        this.$log = $this.find('.log .output');
        this.$currentyear = $this.find('.j-current-year-text');
        this.currentyear = 0;
        this.$fbabydied = $this.find('.f-child-died');
        this.$fbabyborn = $this.find('.f-child-born');
        this.$fcolonistdied = $this.find('.f-colonist-died');
        this.$build = $this.find('.buildings');
        this.$map = $this.find('.map');
        this.$energyBar = $this.find('.energy-value');
        this.energyOverall = 0;
        this.$research = $this.find('.research');
        this.$ilmenit = $this.find('.j-currency-ilmenit');
        this.$titan = $this.find('.j-currency-titan');
        this.$energy = $this.find('.j-energy-power');
        this.canResearch = false;
        this.$bresearch = $this.find('.btp.lab');
        this.$populationw = $this.find('.mzdp');
        this.$resprogress = this.$research.find('.percent-progress');
        this.$resprogresstext = this.$research.find('.percent-text');
        this.$cancelResearch = $this.find('.j-cancel-research');
        this.$expedition = $this.find('.dialog-window.expedition');
        this.$expeditionButton = $this.find('.j-new-expedition');
        this.ExpeditionIsAvailable = false;
        this.ExpeditionIsRunning = false;
        //constant 
        this.ENERGY = this._buildings.powerplant.addEnergy;
    
        //$('.population, .log, .graphs').draggable();
        
        this._loadUI();
        this.$bresearch.addClass('j-locked');
        this._reloadtext();
        this._addpopulation(true);
        this.$populationw.hide();
        this.$population.text('0');

        /* start reset */
        this.$map.find('.command-center').removeClass('nobuild').removeClass('command-center');
        this.$energyBar.css('height','0%');
        this._currency.ilmenit.multiplier = 0;
        this._currency.titan.multiplier = 1;
        /* end reset */
        
        /* set costance to buildings in UI */
        var totalBuildings = this.$build.find('.opt').length;
        
        for (var i = 0; i < totalBuildings; i++) {
            var currentIteration = this.$build.find('.opt:eq('+i+')');
                if (currentIteration.hasClass('power-plant')) {
                    currentIteration.find('.cost .value').text(this._buildings.powerplant.value.titan);
                    currentIteration.find('.energy .value').text('+' + this._buildings.powerplant.addEnergy);
                    currentIteration.data('cost', this._buildings.powerplant.value.titan);
                    currentIteration.data('building', 'powerplant');
                }
                if (currentIteration.hasClass('livingroom')) {
                    currentIteration.find('.cost .value').text(this._buildings.livingrooms.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.livingrooms.value.energy);
                    currentIteration.data('cost', this._buildings.livingrooms.value.titan);
                    currentIteration.data('building', 'livingrooms');
                }
                if (currentIteration.hasClass('miner')) {
                    currentIteration.find('.cost .value').text(this._buildings.mine.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.mine.value.energy);
                    currentIteration.data('cost', this._buildings.mine.value.titan);
                    currentIteration.data('building', 'mine');
                }
                if (currentIteration.hasClass('refinery')) {
                    currentIteration.find('.cost .value').text(this._buildings.refinery.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.refinery.value.energy);
                    currentIteration.data('cost', this._buildings.refinery.value.titan);
                    currentIteration.data('building', 'refinery');
                }
                if (currentIteration.hasClass('medicalcenter')) {
                    currentIteration.find('.cost .value').text(this._buildings.medicalblock.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.medicalblock.value.energy);
                    currentIteration.data('cost', this._buildings.medicalblock.value.titan);
                    currentIteration.data('building', 'medicalblock');
                }
                if (currentIteration.hasClass('logistics')) {
                    currentIteration.find('.cost .value').text(this._buildings.logistics.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.logistics.value.energy);
                    currentIteration.data('cost', this._buildings.logistics.value.titan);
                    currentIteration.data('building', 'logistics');
                }
                if (currentIteration.hasClass('laboratory')) {
                    currentIteration.find('.cost .value').text(this._buildings.laboratory.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.laboratory.value.energy);
                    currentIteration.data('cost', this._buildings.laboratory.value.titan);
                    currentIteration.data('building', 'laboratory');
                }
                if (currentIteration.hasClass('defend-perimeter')) {
                    currentIteration.find('.cost .value').text(this._buildings.defendperimeter.value.titan);
                    currentIteration.find('.energy .value').text('-' + this._buildings.defendperimeter.value.energy);
                    currentIteration.data('cost', this._buildings.defendperimeter.value.titan);
                    currentIteration.data('building', 'defendperimeter');
                }
        }
        
        // set timing UI to research
        var objectsKeysResearch = Object.keys(the._research);
        for (var i = 0; i < objectsKeysResearch.length; i++) {
            the.$research.find('.'+objectsKeysResearch[i]+' .timevalue').text(the._research[objectsKeysResearch[i]].timing);
        }
        
        // set building dialog UI
        var objectsKeysBuildingDialog = Object.keys(this._text.buildingDialog);
        for (var i = 0; i < objectsKeysBuildingDialog.length; i++) {
            if (objectsKeysBuildingDialog[i] != 'powerplantstart' && objectsKeysBuildingDialog[i] != 'powerplantend') {
                the._initDiag('.buildings .options .'+objectsKeysBuildingDialog[i], this._text.buildingDialog[objectsKeysBuildingDialog[i]], [-1, 30]);
            } else {
                the._initDiag('.buildings .options .power-plant', this._text.buildingDialog.powerplantstart + this._buildings.powerplant.addEnergy + this._text.buildingDialog.powerplantend, [-1, 30]);
            }
        }
        
        // set research dialog UI
        var objectsKeysResearchDialog = Object.keys(this._text.researchDialog);
        for (var i = 0; i < objectsKeysResearchDialog.length; i++) {
            the._initDiag('.research .options .'+objectsKeysResearchDialog[i], this._text.researchDialog[objectsKeysResearchDialog[i]], [-1, 30]);
        }

        /* end set */
        
        var lands = this.$map.find('.land').length,
        findposition = parseInt(this._justroll(1, lands));

        this.$map.find('.land:eq(' + findposition + ')').addClass('command-center nobuild');

        this._flicker(this.$map.find('.command-center'), 'event', 3000);

        $this.find('.j-winpopulation').text(settings.winpopulation);
        
        $this.find('.build').on('click', function () {
            $('.buildings').is(':visible') ? $('.buildings').hide() : $('.buildings').show();
        });
        
        this.$expeditionButton.on('click', function () {
            $('.expedition.dialog-window').is(':visible') ? $('.expedition.dialog-window').hide() : $('.expedition.dialog-window').show();
        });
        
        this.$bresearch.on('click', function () {  
            if (the.canResearch){
                $('.research').is(':visible') ? $('.research').hide() : $('.research').show();
                the._initDiag('.expedition-length', 'Бонус ко времени экспедиции за счет исследований: -' + (the._research.expedition.affect * (the._research.expedition.level - 1)) + ' лет', [0, -30]);
            }
        });
        
        $this.find('.btp.popul').on('click', function () {
            $('.population.mzdp').is(':visible') ? $('.population.mzdp').hide() : $('.population.mzdp').show();
        });
        
        var currentBuilding;
        
        this.$build.find('.opt').on('click', function (e) {
            var getbuilding = $(this).data('building');
            currentBuilding = getbuilding;
            
            var $this = $(this);
            if (!$(e.target).hasClass('b-cancel')){
                if (the._buildings[getbuilding].value.titan <= the._currency.titan.amount && the._buildings[getbuilding].value.energy <= the._currency.energy.amount) {
                    var thisindex = $(this).index();
                    var overall = $(this).parent().find('.opt').length;
                    for (var i = 0; i < overall; i++) {
                        if (i != thisindex) {
                            $(this).parent().find('.opt:eq('+i+')').addClass('opt-locked');
                        } else {
                            $(this).addClass('building-in-progress');
                            $(this).find('.b-cancel').show();
                        }
                    }
                    
                    /* map handle */
                    the.$map.find('.land').each(function() {
                        if (!$(this).hasClass('nobuild')) {
                            $(this).addClass('canbuild');
                            $(this).data('building', getbuilding);
                        }
                    });
                    /* end map handle */
                } else if (the._buildings[getbuilding].value.titan > the._currency.titan.amount) {
                    $this.append('<p class="warning-cost">У вас недостаточно титана!</span>');
                    setTimeout(function () {
                        $this.find('.warning-cost').fadeOut().remove();
                    }, 1500);
                } else if (the._buildings[getbuilding].value.energy > the._currency.energy.amount) {
                    $this.append('<p class="warning-cost">У вас недостаточно энергии!</span>');
                    setTimeout(function () {
                        $this.find('.warning-cost').fadeOut().remove();
                    }, 1500);
                }
            }
        });
        
        this.element.find('.b-cancel').on('click', function () {
            var $thi = $(this).parents('.options');
            $thi.find('.opt-locked').removeClass('opt-locked');
            $thi.find('.building-in-progress').removeClass('building-in-progress');
            $(this).hide();
            the.$map.find('.land').each(function() {
                if ($(this).hasClass('canbuild')) {
                    $(this).removeClass('canbuild');
                    $(this).data('building', '');
                }
            });
        });
        
        this.$research.find('.opt').on('click', function () {
            if (the.canResearch) {
                the.canResearch = false;
                
                var classList = $(this).attr('class').split(' ');
                for (var i = 0; i < classList.length; i++) {
                    var checkClass = classList[i].search('j-');
                    if (checkClass != -1) the.getResearch = classList[i].slice(2); 
                }
                
                the._ResearchTick(true);
                the.$research.find('.opt').addClass('research-in-progress');
                the.determineResearchName = the._research[the.getResearch].name;
                the.$cancelResearch.removeClass('j-locked');
                the.$research.find('.current-research').text(the.determineResearchName);
                the._callStaticDiag('Начато исследование: '+the.determineResearchName + ' Уровень: '+(the._research[the.getResearch].level - 1), [10, 10], 3000);
            }
        });
        
        this.$cancelResearch.on('click', function () {
            if (!$(this).hasClass('.j-locked') && the.canResearch == false) {
                the.$research.find('.current-research').text('Нет активных исследований.');
                the.$research.find('.opt.research-in-progress').removeClass('research-in-progress');
                the.canResearch = true;
                the.ResearchIsActive = false;
                the._callStaticDiag('Исследование отменено: '+the.determineResearchName + ' Уровень: '+(the._research[the.getResearch].level - 1), [10, 10], 3000);
                the.$resprogress.css('width','0%');
                the.$resprogresstext.text('0%');
                the._research[the.getResearch].tick = the._research[the.getResearch].timing * the._research[the.getResearch].level;
                $(this).addClass('j-locked');
            }
        });
        
        this.$map.find('.land').on('click', function () {
            if ($(this).hasClass('canbuild')) {
                var getBuilding = $(this).data('building');
                if (getBuilding == 'powerplant') {
                    the._currency.energy.amount += the._buildings.powerplant.addEnergy;
                    the.energyOverall += the._buildings.powerplant.addEnergy;
                    $('.j-energy-power').text(the._currency.energy.amount);
                    the._CallEnergyDraw();
                } else {
                    the._currency.energy.amount -= the._buildings[currentBuilding].value.energy;
                    $('.j-energy-power').text(the._currency.energy.amount);
                    the._CallEnergyDraw();
                }
                
                // assign bonuses
                if (getBuilding == 'livingrooms') the._bonuses.birthchance += 5, the.options.birthchance +=  the._buildings.livingrooms.bonus, the._initDiag('.j-chance-of-birth-text', 'Бонус к шансу рождения детей: +' + the._bonuses.birthchance + '%', [0,-50]);
                if (getBuilding == 'medicalblock') the._bonuses.diechance += 5, the.options.diechance -= the._buildings.medicalblock.bonus, the._initDiag('.j-chance-of-dying-text', 'Бонус к шансу смерти детей: -' + the._bonuses.diechance + '%', [0,-50]);
                if (getBuilding == 'laboratory') the._bonuses.doomsdaychance += 0.1, the.canResearch = true, the.$bresearch.removeClass('j-locked'), the.options.doomsdaychance = (the.options.doomsdaychance - the._bonuses.doomsdaychance).toFixed(3), the._initDiag('.j-chance-of-doomsday-text', 'Бонус к шансу конца света: -' + the._bonuses.doomsdaychance + '%', [0,-50]);
                if (getBuilding == 'mine') the._currency.ilmenit.multiplier += 1.5;
                if (getBuilding == 'refinery') the._currency.titan.multiplier += 0.1;
                if (getBuilding == 'logistics') the._currency.titan.multiplier += 0.2;
                
                if (the.options.birthchance > 100) the.options.birthchance = 100;
                if (the.options.diechance <= 0) the.options.diechance = 0;
                if (the.options.doomsdaychance <= 0) the.options.doomsdaychance = 0;
                // end assign

                $(this).addClass(getBuilding).addClass('building-progress').addClass('nobuild');
                //the._flicker(the.$map.find(getBuilding), 'event', 1000);
                the.$map.find('.land.canbuild').removeClass('canbuild').data('building', '');
                var $thi = the.$build.find('.options');
                $thi.find('.b-cancel').hide();
                $thi.find('.opt-locked').removeClass('opt-locked');
                the.$map.find('.building-progress').removeClass('building-progress');
                $thi.find('.building-in-progress').removeClass('building-in-progress');
                
                the._currency.titan.amount -= the._buildings[currentBuilding].value.titan;
                $('.j-currency-titan').text(the._currency.titan.amount);
                the._checkBonuses();
            }
        });

        this.$build.find('.navbar').mousedown(function () {
            $(this).parent().draggable().draggable('enable');
        });



        this.$build.find('.navbar').mouseup(function () {
            $(this).parent().draggable().draggable('disable');
        });

        this.$build.find('.close').on('click', function () {
            $(this).parents('.buildings').hide();
        });
        
        this.$research.find('.navbar').mousedown(function () {
            $(this).parent().draggable().draggable('enable');
        });

        this.$research.find('.navbar').mouseup(function () {
            $(this).parent().draggable().draggable('disable');
        });

        this.$research.find('.close').on('click', function () {
            $(this).parents('.research').hide();
        });
        
        this.$populationw.find('.box-title').mousedown(function () {
            $(this).parent().draggable().draggable('enable');
        });

        this.$populationw.find('.box-title').mouseup(function () {
            $(this).parent().draggable().draggable('disable');
        });
        
        this.$populationw.find('.close-window').on('click', function () {
            $(this).parents('.population').hide();
        });
        
        this.$expedition.find('.navbar').mousedown(function () {
            $(this).parent().draggable().draggable('enable');
        });

        this.$expedition.find('.navbar').mouseup(function () {
            $(this).parent().draggable().draggable('disable');
        });
        
        this.$expedition.find('.close-window').on('click', function () {
            $(this).parents('.expedition').hide();
        });
        
        this.$expedition.find('.cancel-expedition').on('click', function () {
            $(this).parents('.expedition').hide();
        });
        
        this.element.find('.push-expedition').on('click', function () {
            if (the.ExpeditionIsAvailable) {
                the._ExpeditionRun(true);
                the.$expedition.hide();
                the._callStaticDiag('Колонисты отправлены в экспедицию. Возвращение через '+the._expedition.maxLength+' лет.', [10,10], 3000);
            
            }
        });
        

        this.$fbabydied.on('click', function () {
            if ($(this).is(':checked')) {
                the._filters.childdie = true;
                the.$log.find('.f-baby-born').show();
            } else {
                the._filters.childdie = false;
                the.$log.find('.f-baby-born').hide();
            }
        });

        this.$fbabyborn.on('click', function () {
            if ($(this).is(':checked')) {
                the._filters.childborn = true;
                the.$log.find('.f-baby-died').show();
            } else {
                the._filters.childborn = false;
                the.$log.find('.f-baby-died').hide();
            }
        });

        this.$fcolonistdied.on('click', function () {
            if ($(this).is(':checked')) {
                the._filters.colonistdie = true;
                the.$log.find('.f-colonist-d').show();
            } else {
                the._filters.colonistdie = false;
                the.$log.find('.f-colonist-d').hide();
            }
        });

        this.$diebutton.on('click', function () {
            if (!$(this).hasClass('j-locked')) {
                the._diebutton();
                $(this).addClass('j-locked');
            }
        });

        this.$birthbutton.on('click', function () {
            if (!$(this).hasClass('j-locked')) {
                the._birthbutton();
                $(this).addClass('j-locked');
            }
        });

        this.$suddendeathbutton.on('click', function () {
            if (!$(this).hasClass('j-locked')) {
                the._suddendeathbutton();
                $(this).addClass('j-locked');
            }
        });

        this.$doomsdaybutton.on('click', function () {
            if (!$(this).hasClass('j-locked')) {
                the._doomsdaybutton();
                $(this).addClass('j-locked');
            }
        });
        
        $('.j-currency-ilmenit').text(the._currency.ilmenit.amount);
        $('.j-currency-titan').text(the._currency.titan.amount);

        this.$generatebutton.on('click', function () {
            
            the._nextyear();
            the._currency.ilmenit.amount += parseInt(the._justroll(1 * the._currency.ilmenit.multiplier, 5 * the._currency.ilmenit.multiplier));
            var titanget = parseInt((the._currency.ilmenit.amount - ((the._currency.ilmenit.amount/100) * (50 / the._currency.titan.multiplier)))).toFixed(1);
            the._currency.titan.amount += +titanget;
            the._currency.ilmenit.amount -= titanget;
            $('.j-currency-ilmenit').text(the._currency.ilmenit.amount);
            $('.j-currency-titan').text(the._currency.titan.amount);
            the._ResearchTick(false);
            the._ExpeditionRun(false);
            
            $(".log .output").stop().animate({
                scrollTop : $(".log .output")[0].scrollHeight
            }, 500);
            $(".woman .output").stop().animate({
                scrollTop : $(".woman .output")[0].scrollHeight
            }, 500);
            $(".man .output").stop().animate({
                scrollTop : $(".man .output")[0].scrollHeight
            }, 500);
        });
    },
    _ExpeditionRun : function (init) {
        if (init) {
            this.ExpeditionIsRunning = true;
            this.ExpeditionLength = this._expedition.maxLength;
            this.$log.append('<span class="bisque">Год ' + this.currentyear + ':</span> <span>Колонисты отправляются в <span class="lbue">экспедицию</span>. Возвращение через <span class="lbue">'+this._expedition.maxLength+' лет</span>.');
        } else {
            if (this.ExpeditionIsRunning) {
                this.ExpeditionLength -= 1;
                //maybe some info about how is it going
                if (this.ExpeditionLength <= 0) {
                    //end expedition
                    this.ExpeditionIsRunning = false;
                    this.$log.append('<span class="bisque">Год ' + this.currentyear + ':</span> <span>Колонисты вернулись из экспедиции.');
                    this._callStaticDiag('Ваши колонисты вернулись из экспедиции.', [10,10], 3000);
                    //calc some info
                }
            } 
        }
    },
    _ResearchTick : function (init) {
        if (init) { 
            this.ResearchIsActive = true;
            this._research[this.getResearch].tick = this._research[this.getResearch].timing * this._research[this.getResearch].level;
        } else {
            if (this.ResearchIsActive) {
                this.$research.find('.opt').addClass('research-in-progress');
                this.determineResearchName = this._research[this.getResearch].name;
                this.$research.find('.current-research').text(this.determineResearchName);
                
                this.getTime = this._research[this.getResearch].timing * this._research[this.getResearch].level;
                
                this._research[this.getResearch].tick -= 1;
                
                this.resdif = this.getTime - this._research[this.getResearch].tick;
                this.$resprogress.css('width', (this.resdif / this.getTime * 100).toFixed(0) + '%');
                this.$resprogresstext.text((this.resdif / this.getTime * 100).toFixed(0) + '%');
                
                if (this._research[this.getResearch].tick == 0) {
                    this._research[this.getResearch].level +=1;
                    this.ResearchIsActive = false;
                    this.canResearch = true;
                    this.$research.find('.opt.research-in-progress').removeClass('research-in-progress');
                    this.element.find('.research .options' + ' .' + this.getResearch + ' .r-level').text(this._research[this.getResearch].level - 1);
                    this.element.find('.research .options' + ' .' + this.getResearch + ' .timevalue').text(this._research[this.getResearch].timing * this._research[this.getResearch].level + ' ');
                    
                    this._callStaticDiag('Завершено исследование: '+this.determineResearchName + ' Уровень: '+(this._research[this.getResearch].level - 1), [10, 10], 3000);
                    this.$resprogress.css('width','0%');
                    this.$resprogresstext.text('0%');
                    this.$research.find('.current-research').text('Нет активных исследований.');
                    this._callResearchChanges(this.getResearch);
                    this.$cancelResearch.addClass('j-locked');
                }
            }
        }
    },
    _callResearchChanges : function (getResearch) {
        if (getResearch == 'power') {
            this._buildings.powerplant.addEnergy = this.ENERGY + (this._research.power.affect * (this._research.power.level - 1));
            this.$build.find('.power-plant .energy .value').text('+' + this._buildings.powerplant.addEnergy);
            this._initDiag('.buildings .options .power-plant', this._text.buildingDialog.powerplantstart + this._buildings.powerplant.addEnergy + this._text.buildingDialog.powerplantend, [-1, 30]);
        }
        if (getResearch == 'refinery') {
            this._currency.titan.multiplier += 0.05;
            this._currency.ilmenit.multiplier += 0.05;
        }
        if (getResearch == 'science') {
            this._bonuses.birthchance +=5;
            this.element.find('.j-chance-of-birth-text').css('color','rgb(0, 207, 255)').addClass('bonused')
            this.element.find('.j-chance-of-birth-text').text(this.options.birthchance + 5);
            this._initDiag('.j-chance-of-birth-text', 'Бонус к шансу рождения детей: +' + this._bonuses.birthchance + '%', [0,-50]);
        }
        if (getResearch == 'expedition') {
            this.element.find('.box-title.expedition').show();
            this.ExpeditionIsAvailable = true;
            this._expedition.maxLength -= this._research.expedition.affect;
            $('.expedition-length').text(this._expedition.maxLength);
            if (this._expedition.maxLength <= this._expedition.minLength) {
                this._expedition.maxlength = this._expedition.minLength;
            }
        }
    },
    _loadUI : function () {
        var $this = this.element;
        
        for (var i = 0; i < this._loadCornersUI.objects.length; i++) {
            $(this._loadCornersUI.objects[i]).append('<div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>');
            $(this._loadCornersUI.objects[i]).find('.corner-tl').css('background',this._loadCornersUI.color);
            $(this._loadCornersUI.objects[i]).find('.corner-tr').css('background',this._loadCornersUI.color);
            $(this._loadCornersUI.objects[i]).find('.corner-bl').css('background',this._loadCornersUI.color);
            $(this._loadCornersUI.objects[i]).find('.corner-br').css('background',this._loadCornersUI.color);
        }
    },
    _initDiag : function (over, text, offset, timing) {
        if (offset == undefined) offset = [0,0];
        if (over != undefined && timing == undefined) {
            this.element.find(over).on('mouseover', function () {
                $('.j-diag').show().css({
                    top : $(this).offset().top + parseInt($(this).css('height')) + offset[0],
                    left : $(this).offset().left + offset[1],
                });
                $('.j-diag .text').text(text);
            });
            this.element.find(over).on('mouseout', function () {
                $('.j-diag').hide();
            });
        }
        if (timing != undefined) {
            $('.j-diag').show().css({
                top : offset[0],
                left : offset[1],
            });
            $('.j-diag .text').text(text);
            setTimeout(function(){ $('.j-diag').fadeOut();}, timing);
        }
        
    },
    _callStaticDiag : function (text, offset, timing) {
        if (offset == undefined) offset = [0,0];
        if (timing != undefined) {
            $('body').append('<div class="j-diag-appended"><div class="text"></div><div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div></div>');
            $('.j-diag-appended').fadeIn().css({
                top : offset[0],
                left : offset[1],
            });
            $('.j-diag-appended .text').text(text);
            setTimeout(function(){ $('.j-diag-appended').fadeOut(function(){$(this).remove();});}, timing);
        }
    },
    _CallEnergyDraw : function () {
        this.energyOverall;
        this._currency.energy.amount;
        this.$energyBar;
        
        var calc = ((this._currency.energy.amount / this.energyOverall) * 100).toFixed(0);
        
        this.$energyBar.css('height', calc + '%');
        if (calc >= 0 && calc < 15) {
            this.$energyBar.css('background', 'rgb(255,0,0)');
        }
        if (calc >= 15 && calc < 45) {
            this.$energyBar.css('background', 'rgb(255,200,0)');
        }
        if (calc >= 45 && calc <= 100) {
            this.$energyBar.css('background', 'rgb(0,255,0)');
        }
        
    },
    _reloadtext : function () {
        var settings = this.options,
        $this = this.element;

        this.$currentyear.text(this.currentyear);
        $this.find('.j-chance-of-dying-text').text(settings.diechance);
        $this.find('.j-chance-of-birth-text').text(settings.birthchance);
        $this.find('.j-chance-of-sudden-death-text').text(settings.suddendeathchance);
        $this.find('.j-chance-of-doomsday-text').text(settings.doomsdaychance);
    },
    _checkBonuses : function () {
        var $this = this.element,
        settings = this.options;
        
        this._bonuses.diechance != 0 ? $this.find('.j-chance-of-dying-text').css('color','rgb(0, 207, 255)').addClass('bonused') : $this.find('.j-chance-of-dying-text').css('color','#fff').removeClass('bonused');
        this._bonuses.birthchance != 0 ? $this.find('.j-chance-of-birth-text').css('color','rgb(0, 207, 255)').addClass('bonused') : $this.find('.j-chance-of-birth-text').css('color','#fff').removeClass('bonused');
        this._bonuses.suddendeathchance != 0 ? $this.find('.j-chance-of-sudden-death-text').css('color','rgb(0, 207, 255)').addClass('bonused') : $this.find('.j-chance-of-sudden-death-text').css('color','#fff').removeClass('bonused');
        this._bonuses.doomsdaychance != 0 ? $this.find('.j-chance-of-doomsday-text').css('color','rgb(0, 207, 255)').addClass('bonused') : $this.find('.j-chance-of-doomsday-text').css('color','#fff').removeClass('bonused');
    
        $this.find('.j-chance-of-dying-text').text(settings.diechance);
        $this.find('.j-chance-of-birth-text').text(settings.birthchance);
        $this.find('.j-chance-of-sudden-death-text').text(settings.suddendeathchance);
        $this.find('.j-chance-of-doomsday-text').text(settings.doomsdaychance);
    },
    _diebutton : function () {
        var settings = this.options,
        $this = this.element;
        settings.diechance = 100; // - settings.birthchance;
        settings.diechance = Math.floor((Math.random() * settings.diechance) + 1) - this._bonuses.diechance;
        if (settings.diechance <= 0) settings.diechance = 0;
        $this.find('.j-chance-of-dying-text').text(settings.diechance);
    },
    _birthbutton : function () {
        var settings = this.options,
        $this = this.element;
        settings.birthchance = 100; // - settings.diechance;
        settings.birthchance = Math.floor((Math.random() * settings.birthchance) + 1) + this._bonuses.birthchance;
        if (settings.birthchance >= 100) settings.birthchance = 100;
        $this.find('.j-chance-of-birth-text').text(settings.birthchance);
    },
    _suddendeathbutton : function () {
        var settings = this.options,
        $this = this.element;
        settings.suddendeathchance = settings.diechance / settings.suddendeathchance;
        settings.suddendeathchance = Math.floor((Math.random() * settings.suddendeathchance) + 3) - this._bonuses.suddendeathchance;
        if (settings.suddendeathchance <= 0) settings.suddendeathchance = 0;
        $this.find('.j-chance-of-sudden-death-text').text(settings.suddendeathchance);
    },
    _doomsdaybutton : function () {
        var settings = this.options,
        $this = this.element;
        settings.doomsdaychance = (this._justroll(0.001, settings.diechance / settings.birthchance) - this._bonuses.doomsdaychance).toFixed(3);
        if (settings.doomsdaychance <= 0) settings.doomsdaychance = 0;
        $this.find('.j-chance-of-doomsday-text').text(settings.doomsdaychance);
    },
    _roll : function (value) {
        var upper_limit = 100.000,
        lower_limit = 0.000,
        newroll = Math.random().toFixed(5),
        difference = (value / 100).toFixed(5),
        rollvalue = (Math.random() * (upper_limit - lower_limit) + lower_limit).toFixed(3),
        result = true;
        
        if (newroll <= difference) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    _justroll : function (lower, upper) {
        var rollvalue = (Math.random() * (upper - lower) + lower).toFixed(3);
        return rollvalue;
    },
    _rollarray : function (value) {
        var upper_limit = value.length,
        lower_limit = 0,
        rollvalue = parseInt(Math.random() * (upper_limit - lower_limit) + lower_limit);

        return value[rollvalue];
    },
    _nextyear : function () {
        this.$diebutton.removeClass('j-locked');
        this.$birthbutton.removeClass('j-locked');
        this.$suddendeathbutton.removeClass('j-locked');
        this.$doomsdaybutton.removeClass('j-locked');
        this.currentyear += 1;
        this._addage();
        this._addpopulation(false);
        this._reloadtext();
    },
    _checkmen : function () {
        var total = 0;
        for (var i = 0; i < 5; i++) {
            var agez = this.$man.find('p:eq(' + i + ')').data('age');
            if (agez > 16 && agez < 50) {
                total += 1;
            }
        }
        return total;
    },
    _addpopulation : function (init) {
        var settings = this.options,
        $this = this.element;
        if (init) {
            this.population = 2;
            this.womancol = 0;
            this.mancol = 0;
            this.$woman.find('p').remove();
            this.$man.find('p').remove();
            var womanyear = Math.floor((Math.random() * 20) + 15);
            var manyear = Math.floor((Math.random() * 20) + 15);
            var man_name = this._rollarray(malename);
            var woman_name = this._rollarray(femalename);
            this.$woman.append('<p class="pink j-gen">'+woman_name+' | возраст: <span class="j-age">' + womanyear + '</span></p>');
            this.$man.append('<p class="lightblue j-gen">'+man_name+' | возраст: <span class="j-age">' + manyear + '</span></p>');
            this.$woman.find('.j-gen').data('age', womanyear).removeClass('j-gen');
            this.$man.find('.j-gen').data('age', manyear).removeClass('j-gen');
            this.$population.text(this.population);
            this.$log.find('p').remove();
        } else {
            var totalWomans = $this.find('.woman .output p').length;
            this._checkage();
            this._event();
            for (var i = 0; i < totalWomans; i++) {

                var currentWoman = $this.find('.woman .output p:eq(' + i + ')');
                var wAge = currentWoman.data('age');
                var checkm = this._checkmen();

                if (wAge >= 16 && wAge <= 50 && checkm > 0) {

                    var rollbirth = this._roll(settings.birthchance);
                    var rolldeath = this._roll(settings.diechance);
                    var rollsuddendeath = this._roll(settings.suddendeathchance);
                    var rolldoomsday = this._roll(settings.doomsdaychance);

                    if (rollbirth && !rolldeath) {
                        var boy = this._roll(35);
                        if (boy) {
                            this.mancol += 1;
                            this.population += 1;
                            var thisname = this._rollarray(malename);
                            this.$man.append('<p class="lightblue j-gen">' + thisname + ' | возраст: <span class="j-age">0</span></p>');
                            this.$man.find('.j-gen').data('age', 0).removeClass('j-gen');
                            if (this._filters.childborn) {
                                this.$log.append('<p class="f-baby-born"><span class="bisque">Год ' + this.currentyear + ':</span><span class="pink"> ' + currentWoman.text() + '</span> рожает нового ребенка, <span class="lightblue">' + thisname + '</span>!</p>');
                            } else {
                                this.$log.append('<p class="f-baby-born" style="display:none"><span class="bisque">Год ' + this.currentyear + ':</span><span class="pink"> ' + currentWoman.text() + '</span> рожает нового ребенка, <span class="lightblue">'  + thisname + '</span>!</p>');
                            }
                        } else {
                            this.womancol += 1;
                            this.population += 1;
                            var thisname = this._rollarray(femalename);
                            this.$woman.append('<p class="pink j-gen">' + thisname + ' | возраст: <span class="j-age">0</span></p>');
                            this.$woman.find('.j-gen').data('age', 0).removeClass('j-gen');
                            if (this._filters.childborn) {
                                this.$log.append('<p class="f-baby-born"><span class="bisque">Год ' + this.currentyear + ':</span><span class="pink"> ' + currentWoman.text() + '</span> рожает нового ребенка, <span class="pink">'  + thisname + '</span>!</p>');
                            } else {
                                this.$log.append('<p class="f-baby-born" style="display:none"><span class="bisque">Год ' + this.currentyear + ':</span><span class="pink"> ' + currentWoman.text() + '</span> рожает нового ребенка, <span class="pink">' + thisname + '</span>!</p>');
                            }
                        }
                    }

                    if (rolldeath) {
                        if (this._filters.childdie) {
                            this.$log.append('<p class="f-baby-died"><span class="bisque">Год ' + this.currentyear + ': </span>' + this._rollarray(this._text.babydied) + '</p>');
                        } else {
                            this.$log.append('<p class="f-baby-died" style="display:none"><span class="bisque">Год ' + this.currentyear + ': </span>' + this._rollarray(this._text.babydied) + '</p>');
                        }
                    }

                    if (rollsuddendeath) {
                        var rollwho = this._roll(50),
                        person;
                        if (rollwho) {
                            person = this.$man.find('p:eq(0)').text();
                            this.$man.find('p:eq(0)').remove();
                            this.population -= 1;
                            if (this._filters.colonistdie) {
                                this.$log.append('<p class="f-colonist-d"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">ВНЕЗАПНАЯ СМЕРТЬ. </span><span class="lightblue">' + person + ' </span> ' + this._rollarray(this._text.suddendeath) + '</p>');
                            } else {
                                this.$log.append('<p class="f-colonist-d" style="display:none"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">ВНЕЗАПНАЯ СМЕРТЬ. </span><span class="lightblue">' + person + ' </span> ' + this._rollarray(this._text.suddendeath) + '</p>');
                            }
                        } else {
                            person = this.$woman.find('p:eq(0)').text();
                            this.$woman.find('p:eq(0)').remove();
                            this.population -= 1;
                            if (this._filters.colonistdie) {
                                this.$log.append('<p class="f-colonist-d"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">ВНЕЗАПНАЯ СМЕРТЬ. </span><span class="pink">' + person + ' </span> ' + this._rollarray(this._text.suddendeath) + '</p>');
                            } else {
                                this.$log.append('<p class="f-colonist-d" style="display:none"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">ВНЕЗАПНАЯ СМЕРТЬ. </span><span class="pink">' + person + ' </span> ' + this._rollarray(this._text.suddendeath) + '</p>');
                            }
                        }
                    }

                    this.$population.text(this.population);

                    if (rolldoomsday) {
                        this.$log.append('<p class="d-death"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">КОНЕЦ СВЕТА. </span><span class="red">' + this._rollarray(this._text.worldcollapse) + this._text.labels.endgame + '</span></p>');
                     
                        this.$man.find('p').remove();
                        this.$woman.find('p').remove();
                        this.storePopulation = this.population;
                        console.log('Конечное население: ' + this.storePopulation);

                        this.population = 0;
                        this.$population.text(this.population);
                        this._endgame();

                        return false;
                    }

                    var checksex = this._checksex();

                    if (checksex == 1) {
                        this.$log.append('<p><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">Все женщины погибли, вы не можете больше продолжать колонизацию Марса. ВЫ ПРОИГРАЛИ.</span></p>');
                        this._endgame();

                        return false;
                    }

                    if (checksex == 2) {
                        this.$log.append('<p><span class="bisque">Год ' + this.currentyear + ':</span> <span class="red">Все мужчины погибли, вы не можете больше продолжать колонизацию Марса. ВЫ ПРОИГРАЛИ.</span></p>');
                        this._endgame();

                        return false;
                    }

                    if (this.population >= settings.winpopulation) {
                        this.$log.append('<p><span class="bisque">Год ' + this.currentyear + ':</span> <span class="green">У вас получилось! На Марсе теперь ' + this.population + ' колонистов! ВЫ ПОБЕДИЛИ!</span></p>');
                        this._endgame();

                        return false;
                    }
                }
            }
        }
    },
    _addage : function () {
        this.$man.find('p').each(function () {
            var age = $(this).data('age') + 1;
            $(this).data('age', age);
            $(this).find('.j-age').text(age);
        });
        this.$woman.find('p').each(function () {
            var age = $(this).data('age') + 1;
            $(this).data('age', age);
            $(this).find('.j-age').text(age);
        });
    },
    _checkage : function () {
        var the = this;
        this.$man.find('p').each(function () {
            var age = $(this).data('age');
            var person = $(this).text();
            if (age >= 50) {
                var death = the._roll(age / 4); ;
                if (death) {
                    $(this).remove();
                    the.population -= 1;
                    the.$population.text(the.population);
                    the.$log.append('<p class="f-cdied"><span class="bisque">Год ' + the.currentyear + ':</span> <span class="lightblue">' + person + ' </span> ' + the._rollarray(the._text.colonistdied) + '</p>');
                }
            }
        });
        this.$woman.find('p').each(function () {
            var age = $(this).data('age');
            var person = $(this).text();
            if (age >= 60) {
                var death = the._roll(age / 4);
                if (death) {
                    $(this).remove();
                    the.population -= 1;
                    the.$population.text(the.population);
                    the.$log.append('<p class="f-cdied"><span class="bisque">Год ' + the.currentyear + ':</span> <span class="pink">' + person + ' </span> ' + the._rollarray(the._text.colonistdied) + '</p>');
                }
            }
        });
    },
    _checksex : function () {
        var mans = this.$man.find('p').length,
        womans = this.$woman.find('p').length,
        result = 0;

        if (womans <= 0) {
            result = 1;
        }
        if (mans <= 0) {
            result = 2;
        }
        return result;
    },
    _event : function () {
        var determineEvent = parseInt(this._justroll(1, 15)),
        settings = this.options,
        $this = this.element;

        if (determineEvent == 3) { //chance to die of child
            var roll = Math.floor((Math.random() * 15) + 1);
            settings.diechance += roll;
            if (settings.diechance > 100) {
                settings.diechance = 100
            }
            $this.find('.j-chance-of-dying-text').text(settings.diechance);
            this.$log.append('<p class="f-event"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="violet">СОБЫТИЕ:</span> ' + this._rollarray(this._text.events.diechance) + ' Шанс смерти детей вырос на <span class="red">' + roll + '</span> %</p>');
        } else if (determineEvent == 6) { //chance to born of child
            var roll = Math.floor((Math.random() * 12) + 1);
            settings.birthchance -= roll;
            if (settings.birthchance <= 0) {
                settings.birthchance = 0
            }
            $this.find('.j-chance-of-birth-text').text(settings.birthchance);
            this.$log.append('<p class="f-event"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="violet">СОБЫТИЕ:</span> ' + this._rollarray(this._text.events.bornchance) + ' Шанс рождения детей упал на <span class="red">' + roll + '</span> %</p>');
        } else if (determineEvent == 9) { //suddendeath chance
            var roll = Math.floor((Math.random() * 4) + 1);
            settings.suddendeathchance += roll;
            if (settings.suddendeathchance >= 100) {
                settings.suddendeathchance = 100
            }
            $this.find('.j-chance-of-sudden-death-text').text(settings.suddendeathchance);
            this.$log.append('<p class="f-event"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="violet">СОБЫТИЕ:</span> ' + this._rollarray(this._text.events.suddendeathchance) + ' Шанс внезапной смерти вырос на <span class="red">' + roll + '</span> %</p>');
        } else if (determineEvent == 12) { //doomsday chance
            var roll = Math.floor((Math.random() * 2) + 2);
            settings.doomsdaychance = (settings.doomsdaychance * roll).toFixed(3);
            if (settings.doomsdaychance >= 100) {
                settings.doomsdaychance = 100
            }
            $this.find('.j-chance-of-doomsday-text').text(settings.doomsdaychance);
            this.$log.append('<p class="f-event"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="violet">СОБЫТИЕ:</span> ' + this._rollarray(this._text.events.worldcollapsechance) + ' Шанс конца света повысился в <span class="red">' + roll + '</span> раз(а).</p>');
        } else if (determineEvent == 15 || determineEvent == 4 || determineEvent == 11) { //titan
            var roll = Math.floor((Math.random() * 20) + 1);
            this._currency.titan.amount += roll;
            $this.find('.j-currency-titan').text(this._currency.titan.amount);
            this.$log.append('<p class="f-event"><span class="bisque">Год ' + this.currentyear + ':</span> <span class="violet">СОБЫТИЕ:</span> ' + this._rollarray(this._text.events.resourceacquire) + ' <span class="yellow">+ ' + roll + ' кг</span> титана.</p>');
        } else if (determineEvent == 10) { //army event
        }
    },
    _flicker : function (object, klass, timer) {
        setInterval(function () {
            if (object.hasClass(klass)) {
                object.removeClass(klass);
            } else {
                object.addClass(klass);
            }
        }, timer);
    },
    debug : function(command, num) {
        if (command == 'titan') {
            if (num == undefined) return console.log("ERROR: You didn't specified amount to give");
            
            this._currency.titan.amount += num;
            this.$titan.text(this._currency.titan.amount);
        }
        if (command == 'ilmenit') {
            if (num == undefined) return console.log("ERROR: You didn't specified amount to give");
            
            this._currency.ilmenit.amount += num;
            this.$ilmenit.text(this._currency.ilmenit.amount);
        }
        if (command == 'energy') {
            if (num == undefined) return console.log("ERROR: You didn't specified amount to give");
            
            this._currency.energy.amount += num;
            this.$energy.text(this._currency.energy.amount);
        }
        if (command == 'res') {
            if (num == undefined) return console.log("ERROR: You didn't specified amount to give");
            
            this._currency.energy.amount += num;
            this.$energy.text(this._currency.energy.amount);
            this._currency.titan.amount += num;
            this.$titan.text(this._currency.titan.amount);
            this._currency.ilmenit.amount += num;
            this.$ilmenit.text(this._currency.ilmenit.amount);
        }
    },
    _endgame : function () {
        this.$diebutton.remove();
        this.$birthbutton.remove();
        this.$suddendeathbutton.remove();
        this.$doomsdaybutton.remove();
        this.$generatebutton.remove();
    },
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});