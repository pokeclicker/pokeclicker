const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

//Kanto Temporary Battles
TemporaryBattleList['Blue1'] = new TemporaryBattle(
    'Blue1',
    [
        new GymPokemon('Pidgey', 90200640, 9),
        new GymPokemon('Charmander', 57520, 9, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Squirtle', 57520, 9, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Bulbasaur', 57520, 9, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Bulbasaur', 57520, 9, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'I heard the Pokémon League is crawling with tough Trainers. I have to figure out how to get past them. You should quit dawdling and get a move on!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 22)]
);
TemporaryBattleList['Blue2'] = new TemporaryBattle(
    'Blue2',
    [
        new GymPokemon('Pidgeotto', 90200640, 17),
        new GymPokemon('Abra', 90200640, 16),
        new GymPokemon('Rattata', 90200640, 15),
        new GymPokemon('Charmander', 57520, 18, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Squirtle', 57520, 18, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Bulbasaur', 57520, 18, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Bulbasaur', 57520, 18, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'Hey! Take it easy! You won already!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)]
);
TemporaryBattleList['Blue3'] = new TemporaryBattle(
    'Blue3',
    [
        new GymPokemon('Pidgeotto', 90200640, 19),
        new GymPokemon('Raticate', 90200640, 16),
        new GymPokemon('Kadabra', 90200640, 18),
        new GymPokemon('Charmeleon', 57520, 20, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Wartortle', 57520, 20, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Ivysaur', 57520, 20, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Ivysaur', 57520, 20, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'Humph! At least you\'re raising your Pokémon!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)]
);
TemporaryBattleList['Blue4'] = new TemporaryBattle(
    'Blue4',
    [
        new GymPokemon('Pidgeotto', 90200640, 25),
        new GymPokemon('Exeggcute', 57520, 23, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Growlithe', 57520, 23, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Gyarados', 57520, 23, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Gyarados', 57520, 23, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Gyarados', 57520, 22, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Exeggcute', 57520, 22, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Growlithe', 57520, 22, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Growlithe', 57520, 22, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Kadabra', 90200640, 20),
        new GymPokemon('Charmeleon', 57520, 25, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Wartortle', 57520, 25, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Ivysaur', 57520, 25, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Ivysaur', 57520, 25, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'What? You stinker! I took it easy on you, too!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower'))]
);
TemporaryBattleList['Fighting Dojo'] = new TemporaryBattle(
    'Fighting Dojo',
    [
        new GymPokemon('Hitmonlee', 108985, 37),
        new GymPokemon('Hitmonchan', 108985, 37),
    ],
    'Hwa! Arrgh! Beaten!',
    [
        new OneFromManyRequirement([
            new GymBadgeRequirement(BadgeEnums.Rainbow),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
        ]),
    ],
    [],
    () => {
        BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
        Notifier.notify({
            message: 'You were awarded a Fighting Egg for defeating the Fighting Dojo',
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
        });
    }
);
TemporaryBattleList['Blue5'] = new TemporaryBattle(
    'Blue5',
    [
        new GymPokemon('Pidgeot', 90200640, 37),
        new GymPokemon('Exeggcute', 57520, 38, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Growlithe', 57520, 38, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Gyarados', 57520, 38, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Gyarados', 57520, 38, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Gyarados', 57520, 35, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Exeggcute', 57520, 35, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Growlithe', 57520, 35, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Growlithe', 57520, 35, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Alakazam', 90200640, 35),
        new GymPokemon('Charizard', 57520, 40, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Blastoise', 57520, 40, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Venusaur', 57520, 40, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Venusaur', 57520, 40, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'I\'m moving on up and ahead! I\'m going to the Pokémon League to boot out the Elite Four! I\'ll become the world\'s most powerful Trainer! Well, good luck to you! Don\'t sweat it! Smell ya!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Silph Co.'))],
    [],
    () => {
        App.game.party.gainPokemonById(131);
    }
);
TemporaryBattleList['Blue6'] = new TemporaryBattle(
    'Blue6',
    [
        new GymPokemon('Pidgeot', 90200640, 47),
        new GymPokemon('Rhyhorn', 90200640, 45),
        new GymPokemon('Exeggcute', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Growlithe', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Gyarados', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Gyarados', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Gyarados', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Exeggcute', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Growlithe', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Growlithe', 57520, 45, new StarterRequirement(GameConstants.Region.kanto, 3)),
        new GymPokemon('Alakazam', 90200640, 47),
        new GymPokemon('Charizard', 57520, 53, new StarterRequirement(GameConstants.Region.kanto, 0)),
        new GymPokemon('Blastoise', 57520, 53, new StarterRequirement(GameConstants.Region.kanto, 1)),
        new GymPokemon('Venusaur', 57520, 53, new StarterRequirement(GameConstants.Region.kanto, 2)),
        new GymPokemon('Venusaur', 57520, 53, new StarterRequirement(GameConstants.Region.kanto, 3)),
    ],
    'That loosened me up. I\'m ready for the Pokémon League! You need more practice! But hey, you know that! I\'m out of here. Smell ya!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Earth),
        new TemporaryBattleRequirement('Blue1'),
    ]
);

//Johto Temporary Battles
TemporaryBattleList['Silver1'] = new TemporaryBattle(
    'Silver1',
    [
        new GymPokemon('Cyndaquil', 57520, 5, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Totodile', 57520, 5, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Chikorita', 57520, 5, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '...Humph! Are you happy you won?',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 30)]
);
TemporaryBattleList['Silver2'] = new TemporaryBattle(
    'Silver2',
    [
        new GymPokemon('Gastly', 57520, 14),
        new GymPokemon('Zubat', 57520, 16),
        new GymPokemon('Quilava', 57520, 18, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Croconaw', 57520, 18, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Bayleef', 57520, 18, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '...Humph! Useless Pokémon! Listen, you. You only won because my Pokémon were weak.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 33)]
);
TemporaryBattleList['Silver3'] = new TemporaryBattle(
    'Silver3',
    [
        new GymPokemon('Gastly', 57520, 20),
        new GymPokemon('Zubat', 57520, 20),
        new GymPokemon('Magnemite', 57520, 18),
        new GymPokemon('Quilava', 57520, 22, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Croconaw', 57520, 22, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Bayleef', 57520, 22, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '...Humph! I\'m not fighting with another weakling ever again. It\'s just too much playing around.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))]
);
TemporaryBattleList['Silver4'] = new TemporaryBattle(
    'Silver4',
    [
        new GymPokemon('Golbat', 57520, 32),
        new GymPokemon('Magnemite', 57520, 30),
        new GymPokemon('Haunter', 57520, 30),
        new GymPokemon('Sneasel', 57520, 34),
        new GymPokemon('Quilava', 57520, 34, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Feraligatr', 57520, 32, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Meganium', 57520, 34, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '...Why... Why do I lose? I\'ve assembled the toughest Pokémon. I haven\'t eased up on the gas. So why do I lose?',
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ]
);
TemporaryBattleList['Silver5'] = new TemporaryBattle(
    'Silver5',
    [
        new GymPokemon('Sneasel', 57520, 36),
        new GymPokemon('Golbat', 57520, 38),
        new GymPokemon('Magneton', 57520, 37),
        new GymPokemon('Kadabra', 57520, 37),
        new GymPokemon('Haunter', 57520, 37),
        new GymPokemon('Typhlosion', 57520, 40, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Feraligatr', 57520, 40, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Meganium', 57520, 40, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '.................. I haven\'t given up on becoming the greatest Trainer... I\'m going to find out why I can\'t win and become stronger... When I do, I will challenge you. I\'ll beat you down with all my power. ...Humph! You keep at it until then.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto'))]
);
TemporaryBattleList['Silver6'] = new TemporaryBattle(
    'Silver6',
    [
        new GymPokemon('Sneasel', 57520, 46),
        new GymPokemon('Golbat', 57520, 47),
        new GymPokemon('Magneton', 57520, 46),
        new GymPokemon('Alakazam', 57520, 48),
        new GymPokemon('Gengar', 57520, 48),
        new GymPokemon('Typhlosion', 57520, 50, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Feraligatr', 57520, 50, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Meganium', 57520, 50, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    'My training\'s still not good enough...? My Pokémon are so weak, it makes me frustrated... But I can feel that they are getting better after each battle... .................. Tch! They\'re still too weak! I need to give them more training...',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
);
TemporaryBattleList['Silver7'] = new TemporaryBattle(
    'Silver7',
    [
        new GymPokemon('Sneasel', 57520, 55),
        new GymPokemon('Magneton', 57520, 55),
        new GymPokemon('Gengar', 57520, 56),
        new GymPokemon('Alakazam', 57520, 56),
        new GymPokemon('Crobat', 57520, 58),
        new GymPokemon('Typhlosion', 57520, 60, new StarterRequirement(GameConstants.Region.johto, 0)),
        new GymPokemon('Feraligatr', 57520, 60, new StarterRequirement(GameConstants.Region.johto, 1)),
        new GymPokemon('Meganium', 57520, 60, new StarterRequirement(GameConstants.Region.johto, 2)),
    ],
    '...Oh, no... I still can\'t win after all that training... I...I have to believe more in my Pokémon... ...No big deal. Sorry to have got in the way. Don\'t forget to rest your Pokémon before you challenge the Champion again!',
    [new TemporaryBattleRequirement('Silver6')]
);

//Hoenn Temporary Battles
TemporaryBattleList['May1'] = new TemporaryBattle(
    'May1',
    [
        new GymPokemon('Torchic', 57520, 5, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Mudkip', 57520, 5, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Treeko', 57520, 5, new StarterRequirement(GameConstants.Region.hoenn, 2)),
    ],
    'Wow! That\'s great! You\'re pretty good!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 103)]
);
TemporaryBattleList['May2'] = new TemporaryBattle(
    'May2',
    [
        new GymPokemon('Lotad', 57520, 13, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Torkoal', 57520, 13, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Wingull', 57520, 13, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Torchic', 57520, 15, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Mudkip', 57520, 15, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Treeko', 57520, 15, new StarterRequirement(GameConstants.Region.hoenn, 2)),
    ],
    'Yikes! You\'re better than I expected!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))]
);
TemporaryBattleList['May3'] = new TemporaryBattle(
    'May3',
    [
        new GymPokemon('Wingull', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Lombre', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Wingull', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Lombre', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Slugma', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Slugma', 57520, 18, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Combusken', 57520, 20, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Marshtomp', 57520, 20, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Grovyle', 57520, 20, new StarterRequirement(GameConstants.Region.hoenn, 2)),
    ],
    'Yikes! You\'re better than I expected!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)]
);
TemporaryBattleList['Wally1'] = new TemporaryBattle(
    'Wally1',
    [new GymPokemon('Ralts', 57520, 16)],
    '... ... ... ... ... ... ... ... ... ... ... ... ... ... ... I lost...',
    [new TemporaryBattleRequirement('May3')]
);
TemporaryBattleList['May4'] = new TemporaryBattle(
    'May4',
    [
        new GymPokemon('Pelipper', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Lombre', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Slugma', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Lombre', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Slugma', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Lombre', 57520, 29, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Combusken', 57520, 31, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Marshtomp', 57520, 31, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Grovyle', 57520, 31, new StarterRequirement(GameConstants.Region.hoenn, 2)),
    ],
    'Achah! You\'re strong! I was worried that you might be struggling with your training.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))]
);
TemporaryBattleList['May5'] = new TemporaryBattle(
    'May5',
    [
        new GymPokemon('Tropius', 57520, 31),
        new GymPokemon('Pelipper', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Ludicolo', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Slugma', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Ludicolo', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Slugma', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Pelipper', 57520, 32, new StarterRequirement(GameConstants.Region.hoenn, 2)),
        new GymPokemon('Combusken', 57520, 34, new StarterRequirement(GameConstants.Region.hoenn, 0)),
        new GymPokemon('Marshtomp', 57520, 34, new StarterRequirement(GameConstants.Region.hoenn, 1)),
        new GymPokemon('Grovyle', 57520, 34, new StarterRequirement(GameConstants.Region.hoenn, 2)),
    ],
    'I remember the battle I had with you on Route 103. That battle helped you become this strong, didn\'t it?',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)]
);
TemporaryBattleList['Wally2'] = new TemporaryBattle(
    'Wally2',
    [
        new GymPokemon('Altaria', 57520, 44),
        new GymPokemon('Delcatty', 57520, 43),
        new GymPokemon('Roselia', 57520, 44),
        new GymPokemon('Magneton', 57520, 41),
        new GymPokemon('Gardevoir', 57520, 45),
    ],
    'Wow! You are strong, after all! I couldn\'t beat you today, but one of these days, I\'ll catch up to you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Hoenn'))]
);

//Sinnoh Temporary Battles
TemporaryBattleList['Barry1'] = new TemporaryBattle(
    'Barry1',
    [
        new GymPokemon('Chimchar', 57520, 5, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Piplup', 57520, 5, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Turtwig', 57520, 5, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'What are you saying?! We ended up losing?!',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)]
);
TemporaryBattleList['Barry2'] = new TemporaryBattle(
    'Barry2',
    [
        new GymPokemon('Starly', 57520, 7),
        new GymPokemon('Chimchar', 57520, 9, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Piplup', 57520, 9, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Turtwig', 57520, 9, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'What just happened? I lost?!',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
);
TemporaryBattleList['Barry3'] = new TemporaryBattle(
    'Barry3',
    [
        new GymPokemon('Staravia', 57520, 25),
        new GymPokemon('Buizel', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Ponyta', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Buizel', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Roselia', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Roselia', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Ponyta', 57520, 23, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Monferno', 57520, 27, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Prinplup', 57520, 27, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Grotle', 57520, 27, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'Waaah! It goes to show my surefire winning strategy doesn\'t work',
    [new GymBadgeRequirement(BadgeEnums.Relic)]
);
TemporaryBattleList['Barry4'] = new TemporaryBattle(
    'Barry4',
    [
        new GymPokemon('Staravia', 57520, 34),
        new GymPokemon('Buizel', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Ponyta', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Buizel', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Roselia', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Roselia', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Ponyta', 57520, 32, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Monferno', 57520, 36, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Prinplup', 57520, 36, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Grotle', 57520, 36, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'Heh, yeah, maybe you did get a bit tougher since last time.',
    [
        new GymBadgeRequirement(BadgeEnums.Cobble),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
    ]
);
TemporaryBattleList['Barry5'] = new TemporaryBattle(
    'Barry5',
    [
        new GymPokemon('Staraptor', 57520, 36),
        new GymPokemon('Heracross', 57520, 37),
        new GymPokemon('Floatzel', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Rapidash', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Floatzel', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Roserade', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Roserade', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Rapidash', 57520, 35, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Infernape', 57520, 38, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Empoleon', 57520, 38, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Torterra', 57520, 38, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'Yeah, yeah, you\'re just a bit better than me, as usual.',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)]
);
TemporaryBattleList['Barry6'] = new TemporaryBattle(
    'Barry6',
    [
        new GymPokemon('Staraptor', 57520, 48),
        new GymPokemon('Floatzel', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Rapidash', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Rapidash', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Snorlax', 57520, 49, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Snorlax', 57520, 49, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Floatzel', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Heracross', 57520, 48),
        new GymPokemon('Roserade', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Roserade', 57520, 47, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Snorlax', 57520, 49, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Infernape', 57520, 51, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Empoleon', 57520, 51, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Torterra', 57520, 51, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    'I guess I\'m not ready for the Pokémon League if I\'m losing to you! Darn it! You watch, though! I\'ll get tougher and win my way through the Pokémon League! Because I\'m going to become the Champion, the toughest Trainer! You\'d better not lose to anyone before me!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))]
);
TemporaryBattleList['Barry7'] = new TemporaryBattle(
    'Barry7',
    [
        new GymPokemon('Staraptor', 57520, 81),
        new GymPokemon('Floatzel', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Roserade', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Rapidash', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Roserade', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Rapidash', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Floatzel', 57520, 79, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
        new GymPokemon('Heracross', 57520, 81),
        new GymPokemon('Snorlax', 57520, 83),
        new GymPokemon('Infernape', 57520, 85, new StarterRequirement(GameConstants.Region.sinnoh, 0)),
        new GymPokemon('Empoleon', 57520, 85, new StarterRequirement(GameConstants.Region.sinnoh, 1)),
        new GymPokemon('Torterra', 57520, 85, new StarterRequirement(GameConstants.Region.sinnoh, 2)),
    ],
    '...! It\'s all right, though. Keep getting tougher. The more you do, the tougher my Pokémon and I get, too. There\'s no end to Pokémon. That\'s what I\'m saying!',
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);

//Unova Temporary Battles
TemporaryBattleList['Hugh1'] = new TemporaryBattle(
    'Hugh1',
    [
        new GymPokemon('Tepig', 57520, 5, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Oshawott', 57520, 5, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Snivy', 57520, 5, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    'I couldn\'t achieve victory for my partner... I won\'t let myself forget this frustration!',
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TemporaryBattleList['Hugh2'] = new TemporaryBattle(
    'Hugh2',
    [
        new GymPokemon('Tepig', 57520, 8, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Oshawott', 57520, 8, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Snivy', 57520, 8, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    'It can\'t be! How could I have lost? I need to apologize to my partner...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Floccesy Ranch'))]
);
TemporaryBattleList['Colress1'] = new TemporaryBattle(
    'Colress1',
    [
        new GymPokemon('Magnemite', 57520, 21),
        new GymPokemon('Klink', 57520, 23),
    ],
    'Splendid! You are quite the Trainer!',
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ]
);
TemporaryBattleList['Hugh3'] = new TemporaryBattle(
    'Hugh3',
    [
        new GymPokemon('Pignite', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Dewott', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Servine', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Simipour', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Simisage', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Simisear', 57520, 25, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Tranquill', 57520, 25),
    ],
    'Man! I lost... You\'ve become way too tough! But, I\'m gonna get stronger, too!',
    [new GymBadgeRequirement(BadgeEnums.Quake)]
);
TemporaryBattleList['Cheren'] = new TemporaryBattle(
    'Cheren',
    [
        new GymPokemon('Stoutland', 57520, 25),
        new GymPokemon('Cinccino', 57520, 25),
        new GymPokemon('Watchog', 57520, 25),
    ],
    'Fantastic! You and your Pokémon have grown much stronger!',
    [new TemporaryBattleRequirement('Hugh3')]
);
TemporaryBattleList['Colress2'] = new TemporaryBattle(
    'Colress2',
    [
        new GymPokemon('Magneton', 57520, 25),
        new GymPokemon('Elgyem', 57520, 25),
        new GymPokemon('Klink', 57520, 25),
    ],
    'Well done! I learned much from this battle!',
    [new TemporaryBattleRequirement('Cheren')]
);
TemporaryBattleList['Hugh4'] = new TemporaryBattle(
    'Hugh4',
    [
        new GymPokemon('Unfezant', 57520, 39),
        new GymPokemon('Simipour', 57520, 39, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Simisage', 57520, 39, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Simisear', 57520, 39, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Emboar', 57520, 41, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Samurott', 57520, 41, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Serperior', 57520, 41, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    'I couldn\'t even draw out my team\'s real strength... How pathetic!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))]
);
TemporaryBattleList['Hugh5'] = new TemporaryBattle(
    'Hugh5',
    [
        new GymPokemon('Unfezant', 57520, 55),
        new GymPokemon('Simipour', 57520, 55, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Simisage', 57520, 55, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Simisear', 57520, 55, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Bouffalant', 57520, 55),
        new GymPokemon('Emboar', 57520, 57, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Samurott', 57520, 57, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Serperior', 57520, 57, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    '...Phew! You\'re really something! Thanks to you, I accomplished what I set out to do during my journey! I think you\'re really amazing! So become the Champion! Get the proof that you\'re a Trainer your Pokémon can be proud of! See you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova'))]
);
TemporaryBattleList['Hugh6'] = new TemporaryBattle(
    'Hugh6',
    [
        new GymPokemon('Unfezant', 57520, 62),
        new GymPokemon('Simipour', 57520, 62, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Simisage', 57520, 62, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Simisear', 57520, 62, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Bouffalant', 57520, 62),
        new GymPokemon('Flygon', 57520, 62),
        new GymPokemon('Eelektross', 57520, 62),
        new GymPokemon('Emboar', 57520, 64, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Samurott', 57520, 64, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Serperior', 57520, 64, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    'This bitter...yet refreshing feeling.',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TemporaryBattleList['Hugh7'] = new TemporaryBattle(
    'Hugh7',
    [
        new GymPokemon('Unfezant', 57520, 65),
        new GymPokemon('Simipour', 57520, 65, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Simisage', 57520, 65, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Simisear', 57520, 65, new StarterRequirement(GameConstants.Region.unova, 2)),
        new GymPokemon('Bouffalant', 57520, 65),
        new GymPokemon('Flygon', 57520, 65),
        new GymPokemon('Eelektross', 57520, 65),
        new GymPokemon('Emboar', 57520, 67, new StarterRequirement(GameConstants.Region.unova, 0)),
        new GymPokemon('Samurott', 57520, 67, new StarterRequirement(GameConstants.Region.unova, 1)),
        new GymPokemon('Serperior', 57520, 67, new StarterRequirement(GameConstants.Region.unova, 2)),
    ],
    'Just as I\'d expected! You are really drawing forth your Pokémon\'s power!... I suppose that\'s it. If winning in battles is strength, then believing that your Pokémon will come back and waiting for its return is also strength. Doing what you think is right no matter what anyone else says, like these guys do, is strength, too.',
    [new TemporaryBattleRequirement('Hugh6')]
);

//Kalos Temporary Battles
TemporaryBattleList['Shauna1'] = new TemporaryBattle(
    'Shauna1',
    [
        new GymPokemon('Froakie', 57520, 5, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Chespin', 57520, 5, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Fennekin', 57520, 5, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Hey! I wasn\'t done watching my cute Li\'l Pokémon yet!',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TemporaryBattleList['Sycamore1'] = new TemporaryBattle(
    'Sycamore1',
    [
        new GymPokemon('Bulbasaur', 57520, 10),
        new GymPokemon('Charmander', 57520, 10),
        new GymPokemon('Squirtle', 57520, 10),
    ],
    'Ha ha! You\'re too much for me! You\'re really something, aren\'t you?',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)]
);
TemporaryBattleList['Tierno1'] = new TemporaryBattle(
    'Tierno1',
    [new GymPokemon('Corphish', 57520, 12)],
    'That was some nice footwork!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)]
);
TemporaryBattleList['Trevor & Tierno'] = new TemporaryBattle(
    'Trevor & Tierno',
    [
        new GymPokemon('Pikachu', 57520, 14),
        new GymPokemon('Corphish', 57520, 16),
        new GymPokemon('Flabébé (Orange)', 57520, 14),
    ],
    'So you can\'t learn everything just from the Pokédex... I see!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 7)]
);
TemporaryBattleList['Calem1'] = new TemporaryBattle(
    'Calem1',
    [
        new GymPokemon('Meowstic', 57520, 28),
        new GymPokemon('Absol', 57520, 28),
        new GymPokemon('Braixen', 57520, 30, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Frogadier', 57520, 30, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Quilladin', 57520, 30, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Your bonds with your Pokémon are really strong. Although, I don\'t like losing much...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))]
);
TemporaryBattleList['Calem2'] = new TemporaryBattle(
    'Calem2',
    [
        new GymPokemon('Meowstic', 57520, 31),
        new GymPokemon('Absol', 57520, 31),
        new GymPokemon('Braixen', 57520, 33, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Frogadier', 57520, 33, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Quilladin', 57520, 33, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Oof. I\'d kind of forgotten how strong you are.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)]
);
TemporaryBattleList['Calem3'] = new TemporaryBattle(
    'Calem3',
    [
        new GymPokemon('Meowstic', 57520, 35),
        new GymPokemon('Absol', 57520, 35),
        new GymPokemon('Delphox', 57520, 37, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Greninja', 57520, 37, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Chesnaught', 57520, 37, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Battling with you is fun, but losing all the time doesn\'t really make me look all that good.',
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
);
TemporaryBattleList['Calem4'] = new TemporaryBattle(
    'Calem4',
    [
        new GymPokemon('Meowstic', 57520, 44),
        new GymPokemon('Absol', 57520, 44),
        new GymPokemon('Jolteon', 57520, 44, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Flareon', 57520, 44, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Vaporeon', 57520, 44, new StarterRequirement(GameConstants.Region.kalos, 2)),
        new GymPokemon('Delphox', 57520, 46, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Greninja', 57520, 46, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Chesnaught', 57520, 46, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Why am I still playing catch-up to you?!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)]
);
TemporaryBattleList['Professor Sycamore2'] = new TemporaryBattle(
    'Professor Sycamore2',
    [
        new GymPokemon('Venusaur', 57520, 50),
        new GymPokemon('Charizard', 57520, 50),
        new GymPokemon('Blastoise', 57520, 50),
    ],
    'You are really something! You and your Pokémon have developed strong bonds by spending time together and by caring about one another. That\'s why you and your Pokémon are so strong.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
);
TemporaryBattleList['Shauna2'] = new TemporaryBattle(
    'Shauna2',
    [
        new GymPokemon('Delcatty', 57520, 49),
        new GymPokemon('Goodra', 57520, 49),
        new GymPokemon('Greninja', 57520, 51, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Chesnaught', 57520, 51, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Delphox', 57520, 51, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'Battles with friends are really, really exciting!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
);
TemporaryBattleList['Tierno2'] = new TemporaryBattle(
    'Tierno2',
    [
        new GymPokemon('Talonflame', 57520, 48),
        new GymPokemon('Roserade', 57520, 49),
        new GymPokemon('Crawdaunt', 57520, 52),
    ],
    'It\'s weird, but… I don\'t get that down when I lose to you.',
    [new TemporaryBattleRequirement('Shauna2')]
);
TemporaryBattleList['Trevor'] = new TemporaryBattle(
    'Trevor',
    [
        new GymPokemon('Raichu', 57520, 49),
        new GymPokemon('Aerodactyl', 57520, 49),
        new GymPokemon('Florges (Orange)', 57520, 51),
    ],
    'There is still so much I don\'t know. Do I just not have what it takes?',
    [new TemporaryBattleRequirement('Tierno2')]
);
TemporaryBattleList['Calem5'] = new TemporaryBattle(
    'Calem5',
    [
        new GymPokemon('Meowstic', 57520, 57),
        new GymPokemon('Jolteon', 57520, 57, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Flareon', 57520, 57, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Vaporeon', 57520, 57, new StarterRequirement(GameConstants.Region.kalos, 2)),
        new GymPokemon('Altaria', 57520, 58),
        new GymPokemon('Absol', 57520, 59),
        new GymPokemon('Delphox', 57520, 61, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Greninja', 57520, 61, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Chesnaught', 57520, 61, new StarterRequirement(GameConstants.Region.kalos, 2)),
    ],
    'I\'m still no match for you... You know, it\'s because I met you that I was able to get this far... But our journey\'s just getting started. Who knows what heights we\'ll reach!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos'))]
);
TemporaryBattleList.AZ = new TemporaryBattle(
    'AZ',
    [
        new GymPokemon('Torkoal', 247996000, 60),
        new GymPokemon('Golurk', 247996000, 60),
        new GymPokemon('Sigilyph', 247996000, 60),
    ],
    'Thank you very much for battling with me. Now I finally feel free…',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    [],
    () => {
        App.game.party.gainPokemonById(670.05);
    }
);
TemporaryBattleList['Calem6'] = new TemporaryBattle(
    'Calem6',
    [
        new GymPokemon('Meowstic', 57520, 66),
        new GymPokemon('Clefable', 57520, 68),
        new GymPokemon('Jolteon', 57520, 66, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Flareon', 57520, 66, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Vaporeon', 57520, 66, new StarterRequirement(GameConstants.Region.kalos, 2)),
        new GymPokemon('Altaria', 57520, 67),
        new GymPokemon('Delphox', 57520, 70, new StarterRequirement(GameConstants.Region.kalos, 0)),
        new GymPokemon('Greninja', 57520, 70, new StarterRequirement(GameConstants.Region.kalos, 1)),
        new GymPokemon('Chesnaught', 57520, 70, new StarterRequirement(GameConstants.Region.kalos, 2)),
        new GymPokemon('Mega Absol', 57520, 68),
    ],
    'I\'ll think about what you did well and use this loss to fuel my desire to improve.',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)]
);

//Alola Temporary Battles
TemporaryBattleList['Hau1'] = new TemporaryBattle(
    'Hau1',
    [
        new GymPokemon('Popplio', 57520, 5, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Rowlet', 57520, 5, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Litten', 57520, 5, new StarterRequirement(GameConstants.Region.alola, 2)),
    ],
    'Whoa! That was awesome! You and your Pokémon were both so cool!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)]
);
TemporaryBattleList['Hau2'] = new TemporaryBattle(
    'Hau2',
    [
        new GymPokemon('Pichu', 57520, 6),
        new GymPokemon('Popplio', 57520, 7, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Rowlet', 57520, 7, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Litten', 57520, 7, new StarterRequirement(GameConstants.Region.alola, 2)),
    ],
    'Phew... That was awesome! That was a really great battle! I had a blast fighting you!',
    [new TemporaryBattleRequirement('Hau1')]
);
TemporaryBattleList['Hau3'] = new TemporaryBattle(
    'Hau3',
    [
        new GymPokemon('Popplio', 57520, 13, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Rowlet', 57520, 13, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Litten', 57520, 13, new StarterRequirement(GameConstants.Region.alola, 2)),
        new GymPokemon('Noibat', 57520, 11),
        new GymPokemon('Pikachu', 57520, 12),
    ],
    'Aww, man! I wanted to show off my Pokémon\'s best side more!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
TemporaryBattleList['Dexio'] = new TemporaryBattle(
    'Dexio',
    [
        new GymPokemon('Mime. Jr', 57520, 15),
        new GymPokemon('Espeon', 57520, 15),
    ],
    'That\'s what I would expect from a Trainer doing the island challenge. I felt the bond between you and your Pokémon!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TemporaryBattleList['Sina'] = new TemporaryBattle(
    'Sina',
    [
        new GymPokemon('Smoochum', 57520, 15),
        new GymPokemon('Glaceon', 57520, 15),
    ],
    'I get it... Facing trials helps you grow close to your team. I think that\'s absolutely wonderful!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TemporaryBattleList['Hau4'] = new TemporaryBattle(
    'Hau4',
    [
        new GymPokemon('Brionne', 57520, 16, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Dartrix', 57520, 16, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Torracat', 57520, 16, new StarterRequirement(GameConstants.Region.alola, 2)),
        new GymPokemon('Pikachu', 57520, 15),
        new GymPokemon('Noibat', 57520, 14),
        new GymPokemon('Eevee', 57520, 14),
    ],
    'Nice! How\'d you come up with that kind of battle plan? You gotta tell me!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TemporaryBattleList['Team Skull Gladion1'] = new TemporaryBattle(
    'Team Skull Gladion1',
    [
        new GymPokemon('Zorua', 57520, 17),
        new GymPokemon('Zubat', 57520, 17),
        new GymPokemon('Type: Null', 57520, 18),
    ],
    'Hmph... It\'s not like me to slip up like that. I\'ve got to keep fighting stronger opponents. Looks like I\'m still not ready...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 5)]
);
TemporaryBattleList['Battle Royal'] = new TemporaryBattle(
    'Battle Royal',
    [
        new GymPokemon('Type: Null', 57520, 20),
        new GymPokemon('Rockruff', 57520, 20),
        new GymPokemon('Brionne', 57520, 20, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Dartrix', 57520, 20, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Torracat', 57520, 20, new StarterRequirement(GameConstants.Region.alola, 2)),
    ],
    'The battle is over!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)]
);
TemporaryBattleList['Team Skull Admin Plumeria1'] = new TemporaryBattle(
    'Team Skull Admin Plumeria1',
    [
        new GymPokemon('Golbat', 57520, 26),
        new GymPokemon('Salandit', 57520, 27),
    ],
    'Hmmph! You\'re pretty strong. I\'ll give you that. But mess with anyone in Team Skull again, and I\'ll show you how serious I can get.',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 21)]
);
TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
TemporaryBattleList['Hau5'] = new TemporaryBattle(
    'Hau5',
    [
        new GymPokemon('Brionne', 57520, 30, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Dartrix', 57520, 30, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Torracat', 57520, 30, new StarterRequirement(GameConstants.Region.alola, 2)),
        new GymPokemon('Flareon', 57520, 28, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Vaporeon', 57520, 28, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Leafeon', 57520, 28, new StarterRequirement(GameConstants.Region.alola, 2)),
        new GymPokemon('Noibat', 57520, 28),
        new GymPokemon('Tauros', 57520, 28),
        new GymPokemon('Alolan Raichu', 57520, 29),
    ],
    'Bwah!! I had my breath held that whole battle!',
    [new TemporaryBattleRequirement('Ultra Wormhole')]
);
TemporaryBattleList['Team Skull Admin Plumeria2'] = new TemporaryBattle(
    'Team Skull Admin Plumeria2',
    [
        new GymPokemon('Golbat', 57520, 37),
        new GymPokemon('Salazzle', 57520, 38),
    ],
    'Hmmph. Guess you are pretty tough. Now I understand why my Grunts waste so much time battling kids. But if you want us to return the Pokémon, then you\'ll have to come to us. Alone. The boss is dying to meet you, hmmph! See you at our base in Po Town!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))]
);
TemporaryBattleList['Team Skull Gladion2'] = new TemporaryBattle(
    'Team Skull Gladion2',
    [
        new GymPokemon('Golbat', 57520, 42),
        new GymPokemon('Zoroark', 57520, 42),
        new GymPokemon('Type: Null', 57520, 43),
    ],
    'That was wrong of me... I shouldn\'t have dragged you into a meaningless battle like that...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))]
);
TemporaryBattleList['Necrozma'] = new TemporaryBattle(
    'Necrozma',
    [
        new GymPokemon('Dusk Mane Necrozma', 57520, 50),
        new GymPokemon('Dawn Wings Necrozma', 57520, 50),
    ],
    'Necrozma retreated into the Ultra Wormhole',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))]
);
TemporaryBattleList['Ultra Megalopolis'] = new TemporaryBattle(
    'Ultra Megalopolis',
    [new GymPokemon('Necrozma (Ultra)', 282601920, 60)],
    'Necrozma fled.',
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)],
    [],
    () => {
        App.game.quests.getQuestLine('Mina\'s Trial').beginQuest();
    }
);
TemporaryBattleList['Captain Mina'] = new TemporaryBattle(
    'Captain Mina',
    [
        new GymPokemon('Mawile', 90200640, 51),
        new GymPokemon('Granbull', 90200640, 51),
        new GymPokemon('Ribombee', 102200640, 51),
    ],
    'Woah! I\'m shocked at your strength!',
    [new TemporaryBattleRequirement('Ultra Megalopolis')]
);
TemporaryBattleList['Captain Ilima'] = new TemporaryBattle(
    'Captain Ilima',
    [
        new GymPokemon('Gumshoos', 90200640, 51),
        new GymPokemon('Smeargle', 90200640, 51),
        new GymPokemon('Komala', 102200640, 51),
    ],
    'Yes! You have emerged victorious!',
    [
        new TemporaryBattleRequirement('Captain Mina'),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hau\'oli Cemetery')),
    ]
);
TemporaryBattleList['Captain Mallow'] = new TemporaryBattle(
    'Captain Mallow',
    [
        new GymPokemon('Trevenant', 90200640, 51),
        new GymPokemon('Shiinotic', 90200640, 51),
        new GymPokemon('Tsareena', 102200640, 51),
    ],
    'Sure enough, when it comes to you and Pokémon, the quality of the ingredients shines forth!',
    [new TemporaryBattleRequirement('Captain Ilima')]
);
TemporaryBattleList['Captain Lana'] = new TemporaryBattle(
    'Captain Lana',
    [
        new GymPokemon('Lanturn', 90200640, 51),
        new GymPokemon('Cloyster', 90200640, 51),
        new GymPokemon('Araquanid', 102200640, 51),
    ],
    'Well! Once again, you certainly reeled me in.',
    [new TemporaryBattleRequirement('Captain Mallow')]
);
TemporaryBattleList['Captain Kiawe'] = new TemporaryBattle(
    'Captain Kiawe',
    [
        new GymPokemon('Arcanine', 90200640, 51),
        new GymPokemon('Talonflame', 90200640, 51),
        new GymPokemon('Alolan Marowak', 102200640, 51),
    ],
    'Not enough dancing!',
    [new TemporaryBattleRequirement('Captain Lana')]
);
TemporaryBattleList['Captain Sophocles'] = new TemporaryBattle(
    'Captain Sophocles',
    [
        new GymPokemon('Togedemaru', 90200640, 51),
        new GymPokemon('Magnezone', 90200640, 51),
        new GymPokemon('Alolan Golem', 102200640, 51),
    ],
    'I couldn\'t get it done. Don\'t worry about it, my precious Pokémon...',
    [new TemporaryBattleRequirement('Captain Kiawe')]
);
TemporaryBattleList['Kahuna Nanu'] = new TemporaryBattle(
    'Kahuna Nanu',
    [
        new GymPokemon('Sableye', 90200640, 51),
        new GymPokemon('Absol', 90200640, 51),
        new GymPokemon('Alolan Persian', 102200640, 51),
    ],
    '...',
    [new TemporaryBattleRequirement('Captain Sophocles')]
);
TemporaryBattleList['Gladion3'] = new TemporaryBattle(
    'Gladion3',
    [
        new GymPokemon('Crobat', 57520, 53),
        new GymPokemon('Zoroark', 57520, 53),
        new GymPokemon('Lucario', 57520, 53),
        new GymPokemon('Silvally (Fire)', 57520, 55, new StarterRequirement(GameConstants.Region.alola, 0)),
        new GymPokemon('Silvally (Water)', 57520, 55, new StarterRequirement(GameConstants.Region.alola, 1)),
        new GymPokemon('Silvally (Grass)', 57520, 55, new StarterRequirement(GameConstants.Region.alola, 2)),
    ],
    'You\'ve got good Pokémon. I know what kind of Trainer you are now. And what kind of journey you\'ve been through.',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
