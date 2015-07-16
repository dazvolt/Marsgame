/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
var locale = {
  ru: {
    resource: {
      titan: {
        name: 'Титан',
        unit: 'кг'
      },
      uranium: {
        name: 'Уран',
        unit: 'кг'
      },
      helium: {
        name: 'Гелий-3',
        unit: 'кг'
      },
      power: {
        name: 'Мощность',
        unit: 'Вт'
      },
      time: {
        name: 'Время',
        unit: 'лет'
      },
      error: {
        name: 'Недостаточно ресурсов!'
      }
    },
    graphs: {
      title: 'Статистика и состояния',
      winPopulation: {
        title: 'Население:'
      },
      year: {
        title: 'Год:',
        button: 'след. год'
      },
      die: {
        title: 'Шанс смерти ребенка:',
        button: 'случайный'
      },
      born: {
        title: 'Шанс рождения ребенка:',
        button: 'случайный',
      },
      death: {
        title: 'Шанс внезапной смерти:',
        button: 'случайный'
      },
      apocalypse: {
        title: 'Шанс конца света:',
        button: 'случайный'
      },
      expedition: {
        title: 'Экспедиция:',
        button: 'отправить'
      },
      reset: {
        title: 'Заново:',
        button: 'рестарт'
      },
    },
    map: {
      title: 'Карта'
    },
    population: {
      title: 'Население',
      man: 'Мужчины',
      woman: 'Женщины'
    },
    buildings: {
      title: 'Строения',
      power_plant: {
        name: 'Электростанция [ЭС]',
        desc: 'Электростанция вырабатывает энергию, за каждое здание: +75 Вт'
      },
      titan_plant: {
        name: 'Завод по выработке титана [ВТ]',
        desc: 'Завод по выработке титана позволяет добывать ресурс титан. Каждое здание повышает выработку на: +20%'
      },
      uranium_plant: {
        name: 'Завод по выработке урана [ВУ]',
        desc: 'Завод по выработке урана позволяет добывать ресурс уран. Каждое здание повышает выработку на: +10%'
      },
      helium_plant: {
        name: 'Завод по выработке гелия-3 [ВГ]',
        desc: 'Завод по выработке гелия-3 позволяет добывать ресурс гелий-3. Каждое здание повышает выработку на: +5%'
      },
      housing_plant: {
        name: 'Жилой корпус [ЖК]',
        desc: 'Жилой корпус повышает шанс рождения детей на 5% за каждое строение.'
      },
      medical_plant: {
        name: 'Медицинский блок [МБ]',
        desc: 'Медицинский блок повышает шанс рождения детей на 5% и понижает шанс смерти детей на 10%.'
      },
      tech_plant: {
        name: 'Завод техники [ЗТ]',
        desc: 'Завод техники позволяет строить вспомогательную технику.'
      },
      laboratory_plant: {
        name: 'Лаборатория [ЛТ]',
        desc: 'Лаборатория позволяет проводить исследования и уменьшает шанс конца света на 0.030% за каждое строение.'
      },
      starport_plant: {
        name: 'Космопорт [КП]',
        desc: 'Космопорт позволяет принимать корабли от Земли и отправлять их на Землю.'
      },
      defend_plant: {
        name: 'Оборонная система [ОС]',
        desc: 'Оборонная система защищает колонистов от случайных атак других цивилизаций.'
      }
    },
    research: {
      title: 'Исследование',
      empty: 'Нет активных исследований',
      capacity: {
        name: 'Энергетика',
        desc: 'Исследование энергетики позволит вырабатывать больше электроэнергии на солнечных станциях. +25 Ватт к каждой электростанции за один уровень исследования.'
      },
      medicine: {
        name: 'Медицина',
        desc: 'Исследование медицины позволит лучше оборудовать медицинские центры. Шанс смерти детей -2% за каждый уровень исследования.'
      },
      extraction: {
        name: 'Выработка',
        desc: 'Исследование выработки позволяет улучшить эффективность добычи ресурсов. +5% к добыче титана, +3% к добыче урана, +1% к добыче гелия-3 за уровень исследования.'
      },
      expedition: {
        name: 'Экспедиции',
        desc: 'Исследование экспедиций позволяет колонистам периодически отправляться вглубь планеты Марс, в надежде найти необычные строения, ресурсы и прочие полезные вещи. Каждый уровень уменьшает время необходимое на проведение полной экспедиции.'
      },
      tech: {
        name: 'Технология',
        desc: 'Исследование открывает новые технологии в дереве техники для постройки.'
      },
      life: {
        name: 'Жизнь бурлит',
        desc: 'Положительные события в колонии случаются чаще на 10% за каждый уровень. Шанс появления событий в целом повышается.'
      }
    },
    expedition: {
      title: 'Экспедиция',
      desc: {
        partone: 'Экспедиция - опасное и предприимчивое мероприятие, которое занимает ',
        parttwo: ' лет. Отправляя колонистов в экспедицию, вы никогда не знаете с чем они столкнутся. Ваши колонисты могут погибнуть, найти недружелюбных представителей планеты или обогатиться необычными ресурсами. Вы хотите отправить экспедицию?',
      }
    },
    tech: {
      title: 'Технологии',
      nanits: {
        name: 'Наниты',
        desc: 'Микроскопические роботы помогают в производстве. Увеличение выработки на',
      }
    },
    end_game_stat: {
      title: 'Подробная статистика и графики'
    },
    log: {
      title: 'Хроники колонии'
    },
    filter: {
      title: 'Фильтры',
      childBorn: 'Рождение детей:',
      childDied: 'Смерть детей:',
      colonistDied: 'Смерть колонистов:'
    },
    welcome_settings : {
      title : 'Начальные настройки',
      language : 'Язык',
      russian : 'Русский',
      tutorial : 'Включить обучение'
    },
    tutorial: {
      title: 'Приветствие',
      desc: 'Добро пожаловать в ад и бездну Марса! Вы являетесь главным командующим по колонизации планеты Марс, на Вас лежит миссия по зарождению настоящей цивилизации на просторах холодной красной планеты. От Ваших решений зависит жизнь колонии. Для того, чтобы успешно выполнить миссию - Вы должны поднять население колонии до <span class="msg power">10 000</span> человек. Удачи! <br/><br/>И да пребудет с Вами великий рандом.'
    },
    labels: {
      suddendeath: '<span class="red">ВНЕЗАПНАЯ СМЕРТЬ </span>',
      worldcollapse: '<span class="red">КОНЕЦ СВЕТА! </span>',
      year: 'Год',
      endgame: '<span class="red">ВЫ ПРОИГРАЛИ! </span>'
    },
    error: {
      titan: 'Недостаточно титана!',
      uranium: 'Недостаточно урана!',
      helium: 'Недостаточно гелия-3!',
      power: 'Недостаточно энергии!',
      resource_all: 'Недостаточно ресурсов!',
      cheat_research: ['Грязный читер, у тебя еще нет лаборатории!', 'Слышь, лабораторию построй, окда?', 'Читер, уходи', 'Тестер, прекрати','Снуп не одобряет твои действия!']
    },
    copyright: {
      label : 'Игра "Колонизация Марса", версия 0.9.7; создатель игры - Dazvolt.'
    },
    hint : {
      research_end : ['Закончено исследование "','" на уровень: ['],
      bonus : ' Бонус: ',
      die : 'Шанс смерти детей не может быть больше чем 100% шанс минус шанс рождения детей (при нажатии на кнопку "случайный").',
      die_bonus : ' Бонус: ',
      born : 'Шанс родждения детей не может быть больше чем 100% шанс минус шанс смерти детей (при нажатии на кнопку "случайный").',
      born_bonus : ' Бонус: ',
      death : 'Шанс внезапной смерти зависит от соотношения шанса рождения и шанса смерти детей (при нажатии на кнопку "случайный").',
      death_bonus : ' Бонус: ',
      apocalypse : 'Шанс конца света зависит от соотношения всех трех других шансов (при нажатии на кнопку "случайный").',
      apocalypse_bonus : 'Бонус: ',
      no_bonus : 'модификаторы отсутствуют',
      population : ['Мужчин: ', 'Женщин: '],
      new_building : 'Доступны новые строения',
      new_research : 'Доступны новые исследования'
    },
    bornbaby: ['Родился новый ребенок'],
    babydied: ['Новый ребенок родился недоношенным и <span class="gray">умер</span>.', 'Рожденный ребенок обладал необъяснимой мутацией и <span class="gray">умер</span> из-за неё.', 'Родился новый ребенок, но он <span class="gray">умер</span> по необъяснимым причинам!', 'Новый ребенок пришел на этот свет, но поскольку мать рожала в антисанитарных условиях, он <span class="gray">умер</span>.'],
    colonistdied: {
      male : ['вышел погулять и наткнулся на камень, после чего больно ударился носом оземь, разбил стекло скафандра и <span class="gray">умер</span>. Нелегко быть старым!', 'забыл свой скафандр и вышел наружу, после чего <span class="gray">умер</span>. Ох уж этот альцгеймер!', 'забыл принять свои таблетки и быстро, решительно <span class="gray">умер</span>.', '<span class="gray">умер</span> из-за своей старости. Вечная память!'],
      female : ['вышла погулять и наткнулась на камень, после чего больно ударилась носом оземь, разбила стекло скафандра и <span class="gray">умерла</span>. Нелегко быть старой!', 'забыла свой скафандр и вышла наружу, после чего <span class="gray">умерла</span>. Ох уж этот альцгеймер!', 'забыла принять свои таблетки и быстро, решительно <span class="gray">умерла</span>.', '<span class="gray">умерла</span> из-за своей старости. Вечная память!']
    },
    suddendeath: {
      male : ['решил поиграть в дартс, но вместо дротиков случайно использовал кислородные баллоны и <span class="gray">погиб</span>.', 'до пены у рта и хрипоты в горле спорил со стеной о невозможности дышать на поверхности Марса. Печальная <span class="gray">смерть</span> от истощения спустя несколько суток.', 'споткнулся и <span class="gray">умер</span>.', 'просто <span class="gray">перестал дышать</span>.', 'сражаясь с неизвестным противником <span class="gray">уклонился в пропасть</span>.', '<span class="gray">открыл форточку</span> в своей комнате.', 'вместо кислородного баллона взял баллон с углекислым газом и <span class="gray">отправился наружу</span>.', 'высекал искры плазменным резаком из трубы с <span class="gray">нейротоксинами</span>.', 'устроил конкурс "попади в яблоко". Попал. В голову. <span class="gray">Себе</span>.', 'провел обряд изгнания духов. <span class="gray">Изгнался</span> вместе с духами на поверхность.', 'устроил пьяную драку в коммунальной комнате. Почти не умер, но оператор <span class="gray">добил</span> его своей видеокамерой.', 'слишком долго размышлял в уборной. Мысли оформились в чужого и тот <span class="gray">сожрал</span> колониста.', 'перепутал себя с пауком и <span class="gray">сожрал</span> себя после спаривания.', 'слишком сильно переживал об отношениях и захлебнулся <span class="gray">насмерть</span> в слюнях.', 'перебрал на вечеринке и захлебнулся <span class="gray">насмерть</span> рвотой.', 'занюхнул на дорожку, но не справился с управлением ровера и <span class="gray">умер</span>, упав в пропасть.','<span class="gray">дунул</span>.','по невесть откуда взявшейся традиции решил присесть на дорожку. Соседи не оценили присаживание на дорожку, которую они только что собирались сдолбить и <span class="gray">прибили</span> возмутителя спокойствия.'],
      female : ['решила поиграть в дартс, но вместо дротиков случайно использовала кислородные баллоны и <span class="gray">погибла</span>.', 'до пены у рта и хрипоты в горле спорила со стеной о невозможности дышать на поверхности Марса. Печальная <span class="gray">смерть</span> от истощения спустя несколько суток.', 'споткнулась и <span class="gray">умерла</span>.', 'просто <span class="gray">перестала дышать</span>.', 'сражаясь с неизвестным противником <span class="gray">уклонилась в пропасть</span>.', '<span class="gray">открыла форточку</span> в своей комнате.', 'вместо кислородного баллона взяла баллон с углекислым газом и <span class="gray">отправилась наружу</span>.', 'высекала искры плазменным резаком из трубы с <span class="gray">нейротоксинами</span>.', 'устроила конкурс "попади в яблоко". Попала. В голову. <span class="gray">Себе</span>.', 'провела обряд изгнания духов. <span class="gray">Изгналась</span> вместе с духами на поверхность.', 'устроила пьяную драку в коммунальной комнате. Она бы выжила, если бы оператор не <span class="gray">добил</span> её своей видеокамерой.', 'слишком долго размышляла в уборной. Мысли оформились в чужого и тот <span class="gray">сожрал</span> её.', 'перепутала себя с пауком и <span class="gray">сожрала себя</span> после спаривания.', 'слишком сильно переживала об отношениях и захлебнулась <span class="gray">насмерть</span> в слюнях.', 'перебрала на вечеринке и захлебнулась <span class="gray">насмерть</span> рвотой.', 'занюхнула на дорожку, но не справилась с управлением ровера и <span class="gray">умерла</span>, упав в пропасть.','<span class="gray">дунула</span>.','<span class="gray">дунул</span>.','по невесть откуда взявшейся традиции решила присесть на дорожку. Соседи не оценили присаживание на дорожку, которую они только что собирались сдолбить и <span class="gray">прибили</span> возмутителя спокойствия.']
    },
    game_end : {
      start : ['Ваша колония закончила свое существование спустя ', ' лет ', ' года ', ' год ', 'после основания. '],
      part2 : ['За все время в колонии родилось ', ' детей. '],
      part3 : ['Средний общий шанс рождения ребенка составлял ', '% в год. '],
      part4 : ['От старости скончалось ', ' колонистов. '],
      part5 : ['Внезапная смерть поглотила жизнь ', ' колонистов. '],
      titles : ['Ваш титул: ','Вождь', 'Император', 'Абу', 'Звездный крейсер класса "Хикка"', 'Почти Дарт Вейдер', 'Врач-маньяк', 'Любитель Колонистов', 'Пай-Мальчик', 'Психопат', 'Марсофил', 'Долбанутый', 'Княжна', 'Простреливший себе Колено', 'Облизывающий леденцы', 'Прапорщик', 'Братишка', 'Альцгеймер', 'Понилюб', 'Рептилоид', 'Упорыш', 'Уолтер Уайт', 'Пушистик'],
      score : ['Ваш общий счет составляет ', ' очков.']
    },
    win_end : '<span class="msg power" style="align:center">Поздравляем! Вы добились победы! Колонисты Марса и население Земли вам очень благодарны. Вы смогли. Про вас будут слагать легенды на бесконечных просторах космоса. Ладно, хватит. Как считаешь, сможешь победить еще раз?</span>',
    worldcollapse: {
      title : 'КОНЕЦ СВЕТА! ',
      text : ['Прилетевший из червоточины корабль инопланетных существ высадился на Марс и стерилизовал всех колонистов. Дальнейшее размножение невозможно.', 'На Марс падает метеорит. Все колонисты погибают.', 'Солнце превращается в сверхновую звезду и сжигает всю поверхность Марса к чертям.', 'Ваши колонисты нашли Обелиск. Айзек застрял в межгалактической пробке и всю колонию сожрали некроморфы.', 'Жидкость, которую притащил сантехник, проела емкость, все переборки, и ушла в грунт планеты на 5 км. Из-за разгерметизации все умерли.', 'Тараканы, которые выбрались на поверхность, мутировали в двухметровых и убили всю колонию.', 'Дарт Вейдер возжелал минералов ваших колонистов. Минералы возжелали Дарта Вейдера. Колонисты остались без ресурсов и умерли от осознания того что их не пожелал Дарт Вейдер.', 'Сидящий все время в своей комнате колонист Сычинс увидел девушку своей мечты с колонистом Ерохинзом, и вся планета была разнесена вдребезги жаром, превосходящим солнце.', 'Одному колонисту от недостатка кислорода привиделся двухметровый желтый пегас с розовой гривой, приказавший уничтожить всех. В награду пегас пообещал произвести действия сексуального характера с задним проходом колониста. Колония была уничтожена в течении 12 часов.', 'Некому продолжать род - женщины смотрят "Санта Барбару", трупы мужчин играют в футбол на поверхности.', 'Небольшое отделение колонии решило, что оно достойно большего, и возжелало стать отдельной колонией. После продолжительной гражданской войны, руководство решило уничтожить станцию.', 'Кто-то перепутал кнопку самоуничтожения станции с кнопкой кофеварки.', 'Кто-то рассказал анекдот.', 'Один колонист нашёл пулемёт. Больше в колонии никто не живёт.'],
    },
    humans : ['Вы больше не можете продолжать развитие колонии. Недостаточно колонистов для выполнения условий рождения детей. Конец неизбежен.', 'В вашей колонии не осталось женщин, способных рожать детей. ', 'В вашей колонии не осталось мужчин, способных зачать детей. '],
    events: {
      title : '<span class="event">СОБЫТИЕ:</span> ',
      good : {
        resources : {
          titan : ['Какой-то идиот разобрал жилой блок, к счастью, все остались живы, и вы получили ресурс! <span class="msg titan">Титан</span> '],
          uranium : ['Из реактора на вашей базе вылетел урановый стержень. "Все будет в порядке!" - уверяет вас главный инженер. <span class="msg uranium">Уран</span> '],
          helium : ['С неба рухнул странный запечатанный блок. На крышке были непонятные надписи. Рискуя жизнью, один из колонистов открыл "посылку". <span class="msg helium">Гелий</span> '],
          power : ['Парочка колонистов пробралась в центр управления электросетями и дернули какой-то рубильник. Странно, но все в порядке, да и мощность выросла! Кажется. <span class="msg power">Мощность</span> ']
        },
        chances : {
          die : {
            texts : ['Колонистам-мамашам пояснили, как не дать ребенку помереть.'],
            end : ' <span class="msg chance">Шанс смерти ребенка</span> <span class="msg power">снизился</span> на '
          },
          born : {
            texts : ['Генильный врач изобретает новую технологию по более безопасному рождению детей.'],
            end : ' <span class="msg chance">Шанс рождения ребенка</span> <span class="msg power">повышен</span> на '
          },
          death : {
            texts : ['Каждый колонист получил по котенку.'],
            end : ' <span class="msg chance">Шанс внезапной смерти</span> <span class="msg power">снижен</span> на '
          },
          apocalypse : {
            texts : ['Колонисты вывели котяток.'],
            end : ' <span class="msg chance">Шанс конца света</span> <span class="msg power">опустился</span> на '
          }
        }
      },
      bad : {
        resources : {
          titan : ['Три идиота покрасили марсоход в песочный цвет и потеряли его. <span class="msg titan">Титан</span> '],
          uranium : ['Реактор начал перегреваться. Срочно нужны ресурсы! <span class="msg uranium">Уран</span> '],
          helium : ['Сегодня на вечеринке было очень весело! <span class="msg helium">Гелий</span> '],
          power : ['Дебил забрался в генераторную. <span class="msg power">Мощность</span> ']
        },
        chances: {
          die: {
            texts: ['Медицинский блок пострадал от пожара.', 'В вашей колонии завелся врач-маяньяк.', 'Несколько колонистов сходят с ума.', 'Мощное землетрясение потрясает Марс и наносит ущерб вашей инфраструктуре.'],
            end: ' <span class="msg chance">Шанс смерти ребенка</span> <span class="msg error">вырос</span> на '
          },
          born: {
            texts: ['Ухудшается атмосфера Марса, ваша колония технически не подготовлена к таким последствиям.', 'Новое поколение детей пьет и ругается матом. Главный ИИ колонии "Протон" решает замедлить рождаемость.', 'Заканчиваются медицинские расходники.'],
            end: ' <span class="msg chance">Шанс рождения ребенка</span> <span class="msg error">снизился</span> на '
          },
          death: {
            texts: ['Градус неадеквата повышается в следствии того, что один из колонистов находит ящик виски и делится им с остальными.', 'Несколько колонистов пробрались на склад и спионерили парочку плазменных резаков.', '"Какие приборы?!" - Громко воскликнул главный врач колонии. - "Мне не нужны никакие приборы!"'],
            end: ' <span class="msg chance">Шанс внезапной смерти</span> <span class="msg error">повысился</span> на '
          },
          apocalypse: {
            texts: ['Дарт Вейдер находит Марс весьма привлекательным.', 'Планете Марс скучно.', 'В Марс врезается Имперский крейсер.', 'Температура Солнца повышается.', 'Главный ИИ колонии "Протон", который управляет всеми системами, барахлит.', 'Марс меняет магнитные поля.', 'На Земле построили новый коллайдер длиной 4000км.'],
            end: ' <span class="msg chance">Шанс конца света</span> <span class="msg error">вырос</span> на '
          }
        },
        aliens : []
      }
    }
  },
  en: {
    welcome_settings : {
      title : 'Initial settings',
      language : 'Language',
      russian : 'English',
      tutorial : 'Tutorial enabled'
    },
  }
};

function locale_start(language) {
  var parent = locale[language];

  for (var get_key in parent) {

    //set blocks title
    $('#' + get_key + ' .title span[data-locale=' + get_key + ']').text(parent[get_key].title);

    //set top panel buttons
    $('#' + get_key + '-b span[data-locale="' + get_key + '"]').text(parent[get_key].title);

    //set graphs block buttons and titles
    if (get_key == 'graphs') {
      for (var get_item in parent[get_key]) {
        $('#' + get_key + ' #' + get_item + ' span[data-locale=' + get_item + ']').text(parent[get_key][get_item].title);
        $('#' + get_key + ' #' + get_item + ' span[data-locale=' + get_item + '-b]').text(parent[get_key][get_item].button);
      }
    }

    //set expedition block description
    if (get_key == 'expedition') {
      $('#' + get_key + '-w .title span[data-locale=' + get_key + ']').text(parent[get_key].title);
      $('#' + get_key + '-w span[data-locale="expedition-text-first-part"]').text(parent[get_key].desc.partone);
      $('#' + get_key + '-w span[data-locale="expedition-text-second-part"]').text(parent[get_key].desc.parttwo);
    }

    //set population window gender
    if (get_key == 'population') {
      $('#' + get_key + ' span[data-locale="woman"]').text(parent[get_key].woman);
      $('#' + get_key + ' span[data-locale="man"]').text(parent[get_key].man);
    }

    //set filter labels
    if (get_key == 'filter') {
      for (var get_item in parent[get_key]) {
        $('#' + get_key + ' span[data-locale="' + get_item + '"]').text(parent[get_key][get_item]);
      }
    }

    //set copyright
    if (get_key == 'copyright') {
      $('[data-locale="copyrights"]').text(parent[get_key].label);
    }

    //set resources name and units
    if (get_key == 'resource') {
      for (var get_item in parent[get_key]) {
        $('#' + get_key + ' #' + get_item + ' span[data-locale="name"]').text(parent[get_key][get_item].name + ':');
        $('#' + get_key + ' #' + get_item + ' span[data-locale="unit"]').text(parent[get_key][get_item].unit);
      }
    }

    //set buildings + research + tech
    if (get_key == 'buildings' || get_key == 'research' || get_key == 'tech') {
      for (var get_item in parent[get_key]) {
        var $getBuildingResources = $('#' + get_key + ' .item.' + get_item + ' span[data-resource-name]');

        $('#' + get_key + ' .item.' + get_item + ' span[data-locale="' + get_item + '"]').text(parent[get_key][get_item].name);
        $('#' + get_key + ' .item.' + get_item + ' span[data-locale="' + get_item + '-desc"]').text(parent[get_key][get_item].desc);

        for (var gbr = 0; gbr < $getBuildingResources.length; gbr++) {
          var ResourceName = $('#' + get_key + ' .item.' + get_item + ' span[data-resource-name]:eq(' + gbr + ')').attr('data-resource-name');

          $('#' + get_key + ' .item.' + get_item + ' span[data-resource-name="' + ResourceName + '"] span[data-locale="' + ResourceName + '"]').text(parent.resource[ResourceName].name);
          $('#' + get_key + ' .item.' + get_item + ' span[data-resource-name="' + ResourceName + '"] span[data-locale="unit"]').text(parent.resource[ResourceName].unit);
        }
      }
    }
  }
}

