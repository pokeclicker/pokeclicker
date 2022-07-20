const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

//Kanto Temporary Battles
TemporaryBattleList.Blue1 = new TemporaryBattle(
    'Blue1',
    [
        new GymPokemon('Pidgey', 1040, 9),
        new GymPokemon('Charmander', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Squirtle', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Bulbasaur', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Bulbasaur', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
    ],
    'I heard the Pokémon League is crawling with tough Trainers. I have to figure out how to get past them. You should quit dawdling and get a move on!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 22)]
);
TemporaryBattleList.Blue2 = new TemporaryBattle(
    'Blue2',
    [
        new GymPokemon('Pidgeotto', 3650, 17),
        new GymPokemon('Abra', 3230, 16),
        new GymPokemon('Rattata', 3370, 15),
        new GymPokemon('Charmander', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Squirtle', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Bulbasaur', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Bulbasaur', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
    ],
    'Hey! Take it easy! You won already!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)]
);
TemporaryBattleList.Blue3 = new TemporaryBattle(
    'Blue3',
    [
        new GymPokemon('Pidgeotto', 19998, 19),
        new GymPokemon('Raticate', 19197, 16),
        new GymPokemon('Kadabra', 19197, 18),
        new GymPokemon('Charmeleon', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Wartortle', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Ivysaur', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Ivysaur', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
    ],
    'Humph! At least you\'re raising your Pokémon!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)]
);
TemporaryBattleList.Blue4 = new TemporaryBattle(
    'Blue4',
    [
        new GymPokemon('Pidgeotto', 30398, 25),
        new GymPokemon('Exeggcute', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Growlithe', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Gyarados', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Gyarados', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Gyarados', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Exeggcute', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Growlithe', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Growlithe', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Kadabra', 30398, 20),
        new GymPokemon('Charmeleon', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Wartortle', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Ivysaur', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Ivysaur', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
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
TemporaryBattleList.Blue5 = new TemporaryBattle(
    'Blue5',
    [
        new GymPokemon('Pidgeot', 41482, 37),
        new GymPokemon('Exeggcute', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Growlithe', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Gyarados', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Gyarados', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Gyarados', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Exeggcute', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Growlithe', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Growlithe', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Alakazam', 41482, 35),
        new GymPokemon('Charizard', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Blastoise', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Venusaur', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Venusaur', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
    ],
    'I\'m moving on up and ahead! I\'m going to the Pokémon League to boot out the Elite Four! I\'ll become the world\'s most powerful Trainer! Well, good luck to you! Don\'t sweat it! Smell ya!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Silph Co.'))],
    [],
    () => {
        App.game.party.gainPokemonById(131);
    }
);
TemporaryBattleList.Blue6 = new TemporaryBattle(
    'Blue6',
    [
        new GymPokemon('Pidgeot', 84840, 47),
        new GymPokemon('Rhyhorn', 82269, 45),
        new GymPokemon('Exeggcute', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Exeggcute', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
        new GymPokemon('Alakazam', 84840, 47),
        new GymPokemon('Charizard', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, 0)*/),
        new GymPokemon('Blastoise', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, 1)*/),
        new GymPokemon('Venusaur', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, 2)*/),
        new GymPokemon('Venusaur', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, 3)*/),
    ],
    'That loosened me up. I\'m ready for the Pokémon League! You need more practice! But hey, you know that! I\'m out of here. Smell ya!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Earth),
        new TemporaryBattleRequirement('Blue1'),
    ]
);

//Johto Temporary Battles
TemporaryBattleList.Silver1 = new TemporaryBattle(
    'Silver1',
    [
        new GymPokemon('Cyndaquil', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Totodile', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Chikorita', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '...Humph! Are you happy you won?',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 30)]
);
TemporaryBattleList.Silver2 = new TemporaryBattle(
    'Silver2',
    [
        new GymPokemon('Gastly', 220788, 14),
        new GymPokemon('Zubat', 220788, 16),
        new GymPokemon('Quilava', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Croconaw', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Bayleef', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '...Humph! Useless Pokémon! Listen, you. You only won because my Pokémon were weak.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 33)]
);
TemporaryBattleList.Silver3 = new TemporaryBattle(
    'Silver3',
    [
        new GymPokemon('Gastly', 227997, 20),
        new GymPokemon('Zubat', 227997, 20),
        new GymPokemon('Magnemite', 223344, 18),
        new GymPokemon('Quilava', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Croconaw', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Bayleef', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '...Humph! I\'m not fighting with another weakling ever again. It\'s just too much playing around.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))]
);
TemporaryBattleList.Silver4 = new TemporaryBattle(
    'Silver4',
    [
        new GymPokemon('Golbat', 274520, 32),
        new GymPokemon('Magnemite', 260794, 30),
        new GymPokemon('Haunter', 260794, 30),
        new GymPokemon('Sneasel', 281383, 34),
        new GymPokemon('Quilava', 295109, 34/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Feraligatr', 295109, 32/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Meganium', 295109, 34/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '...Why... Why do I lose? I\'ve assembled the toughest Pokémon. I haven\'t eased up on the gas. So why do I lose?',
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ]
);
TemporaryBattleList.Silver5 = new TemporaryBattle(
    'Silver5',
    [
        new GymPokemon('Sneasel', 363709, 36),
        new GymPokemon('Golbat', 375075, 38),
        new GymPokemon('Magneton', 375075, 37),
        new GymPokemon('Kadabra', 363709, 37),
        new GymPokemon('Haunter', 363709, 37),
        new GymPokemon('Typhlosion', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Feraligatr', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Meganium', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '.................. I haven\'t given up on becoming the greatest Trainer... I\'m going to find out why I can\'t win and become stronger... When I do, I will challenge you. I\'ll beat you down with all my power. ...Humph! You keep at it until then.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto'))]
);
TemporaryBattleList.Silver6 = new TemporaryBattle(
    'Silver6',
    [
        new GymPokemon('Sneasel', 540775, 46),
        new GymPokemon('Golbat', 540775, 47),
        new GymPokemon('Magneton', 554465, 46),
        new GymPokemon('Alakazam', 554465, 48),
        new GymPokemon('Gengar', 554465, 48),
        new GymPokemon('Typhlosion', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Feraligatr', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Meganium', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    'My training\'s still not good enough...? My Pokémon are so weak, it makes me frustrated... But I can feel that they are getting better after each battle... .................. Tch! They\'re still too weak! I need to give them more training...',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
);
TemporaryBattleList.Silver7 = new TemporaryBattle(
    'Silver7',
    [
        new GymPokemon('Sneasel', 633820, 55),
        new GymPokemon('Magneton', 653626, 55),
        new GymPokemon('Gengar', 669472, 56),
        new GymPokemon('Alakazam', 669472, 56),
        new GymPokemon('Crobat', 693240, 58),
        new GymPokemon('Typhlosion', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, 0)*/),
        new GymPokemon('Feraligatr', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, 1)*/),
        new GymPokemon('Meganium', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, 2)*/),
    ],
    '...Oh, no... I still can\'t win after all that training... I...I have to believe more in my Pokémon... ...No big deal. Sorry to have got in the way. Don\'t forget to rest your Pokémon before you challenge the Champion again!',
    [new TemporaryBattleRequirement('Silver6')]
);

//Hoenn Temporary Battles
TemporaryBattleList.May1 = new TemporaryBattle(
    'May1',
    [
        new GymPokemon('Torchic', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Mudkip', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Treecko', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
    ],
    'Wow! That\'s great! You\'re pretty good!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 103)]
);
TemporaryBattleList.May2 = new TemporaryBattle(
    'May2',
    [
        new GymPokemon('Lotad', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Torkoal', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Wingull', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Torchic', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Mudkip', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Treecko', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
    ],
    'Yikes! You\'re better than I expected!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))]
);
TemporaryBattleList.May3 = new TemporaryBattle(
    'May3',
    [
        new GymPokemon('Wingull', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Lombre', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Wingull', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Lombre', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Slugma', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Slugma', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Combusken', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Marshtomp', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Grovyle', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
    ],
    'Yikes! You\'re better than I expected!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)]
);
TemporaryBattleList.Wally1 = new TemporaryBattle(
    'Wally1',
    [new GymPokemon('Ralts', 1234567, 16)],
    '... ... ... ... ... ... ... ... ... ... ... ... ... ... ... I lost...',
    [new TemporaryBattleRequirement('May3')]
);
TemporaryBattleList.May4 = new TemporaryBattle(
    'May4',
    [
        new GymPokemon('Pelipper', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Slugma', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Slugma', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Combusken', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Marshtomp', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Grovyle', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
    ],
    'Achah! You\'re strong! I was worried that you might be struggling with your training.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))]
);
TemporaryBattleList.May5 = new TemporaryBattle(
    'May5',
    [
        new GymPokemon('Tropius', 1932600, 31),
        new GymPokemon('Pelipper', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Ludicolo', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Slugma', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Ludicolo', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Slugma', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Pelipper', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
        new GymPokemon('Combusken', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, 0)*/),
        new GymPokemon('Marshtomp', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, 1)*/),
        new GymPokemon('Grovyle', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, 2)*/),
    ],
    'I remember the battle I had with you on Route 103. That battle helped you become this strong, didn\'t it?',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)]
);
TemporaryBattleList.Wally2 = new TemporaryBattle(
    'Wally2',
    [
        new GymPokemon('Altaria', 2048719, 44),
        new GymPokemon('Delcatty', 2048719, 43),
        new GymPokemon('Roselia', 2048719, 44),
        new GymPokemon('Magneton', 2048719, 41),
        new GymPokemon('Gardevoir', 2206313, 45),
    ],
    'Wow! You are strong, after all! I couldn\'t beat you today, but one of these days, I\'ll catch up to you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Hoenn'))]
);

//Sinnoh Temporary Battles
TemporaryBattleList.Barry1 = new TemporaryBattle(
    'Barry1',
    [
        new GymPokemon('Chimchar', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Piplup', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Turtwig', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'What are you saying?! We ended up losing?!',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)]
);
TemporaryBattleList.Barry2 = new TemporaryBattle(
    'Barry2',
    [
        new GymPokemon('Starly', 2886187, 7),
        new GymPokemon('Chimchar', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Piplup', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Turtwig', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'What just happened? I lost?!',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
);
TemporaryBattleList.Barry3 = new TemporaryBattle(
    'Barry3',
    [
        new GymPokemon('Staravia', 2239850, 25),
        new GymPokemon('Buizel', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Ponyta', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Buizel', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Roselia', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Roselia', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Ponyta', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Monferno', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Prinplup', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Grotle', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'Waaah! It goes to show my surefire winning strategy doesn\'t work',
    [new GymBadgeRequirement(BadgeEnums.Relic)]
);
TemporaryBattleList.Barry4 = new TemporaryBattle(
    'Barry4',
    [
        new GymPokemon('Staravia', 2490700, 34),
        new GymPokemon('Buizel', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Ponyta', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Buizel', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Roselia', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Roselia', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Ponyta', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Monferno', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Prinplup', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Grotle', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'Heh, yeah, maybe you did get a bit tougher since last time.',
    [
        new GymBadgeRequirement(BadgeEnums.Cobble),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
    ]
);
TemporaryBattleList.Barry5 = new TemporaryBattle(
    'Barry5',
    [
        new GymPokemon('Staraptor', 2104080, 36),
        new GymPokemon('Heracross', 2104080, 37),
        new GymPokemon('Floatzel', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Rapidash', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Floatzel', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Roserade', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Roserade', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Rapidash', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Infernape', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Empoleon', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Torterra', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'Yeah, yeah, you\'re just a bit better than me, as usual.',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)]
);
TemporaryBattleList.Barry6 = new TemporaryBattle(
    'Barry6',
    [
        new GymPokemon('Staraptor', 3974738, 48),
        new GymPokemon('Floatzel', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Rapidash', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Rapidash', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Floatzel', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Heracross', 3857834, 48),
        new GymPokemon('Roserade', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Roserade', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Infernape', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Empoleon', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Torterra', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    'I guess I\'m not ready for the Pokémon League if I\'m losing to you! Darn it! You watch, though! I\'ll get tougher and win my way through the Pokémon League! Because I\'m going to become the Champion, the toughest Trainer! You\'d better not lose to anyone before me!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))]
);
TemporaryBattleList.Barry7 = new TemporaryBattle(
    'Barry7',
    [
        new GymPokemon('Staraptor', 9727091, 81),
        new GymPokemon('Floatzel', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Roserade', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Rapidash', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Roserade', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Rapidash', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Floatzel', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
        new GymPokemon('Heracross', 9498219, 81),
        new GymPokemon('Snorlax', 9498219, 83),
        new GymPokemon('Infernape', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, 0)*/),
        new GymPokemon('Empoleon', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, 1)*/),
        new GymPokemon('Torterra', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, 2)*/),
    ],
    '...! It\'s all right, though. Keep getting tougher. The more you do, the tougher my Pokémon and I get, too. There\'s no end to Pokémon. That\'s what I\'m saying!',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225),
    ]
);

//Unova Temporary Battles
TemporaryBattleList.Hugh1 = new TemporaryBattle(
    'Hugh1',
    [
        new GymPokemon('Tepig', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Oshawott', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Snivy', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'I couldn\'t achieve victory for my partner... I won\'t let myself forget this frustration!',
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TemporaryBattleList.Hugh2 = new TemporaryBattle(
    'Hugh2',
    [
        new GymPokemon('Tepig', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Oshawott', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Snivy', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'It can\'t be! How could I have lost? I need to apologize to my partner...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Floccesy Ranch'))]
);
TemporaryBattleList.Colress1 = new TemporaryBattle(
    'Colress1',
    [
        new GymPokemon('Magnemite', 15852768, 21),
        new GymPokemon('Klink', 16843566, 23),
    ],
    'Splendid! You are quite the Trainer!',
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ]
);
TemporaryBattleList.Hugh3 = new TemporaryBattle(
    'Hugh3',
    [
        new GymPokemon('Pignite', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Dewott', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Servine', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
        new GymPokemon('Simipour', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Simisage', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Tranquill', 13456278, 25),
        new GymPokemon('Simisear', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'Man! I lost... You\'ve become way too tough! But, I\'m gonna get stronger, too!',
    [new GymBadgeRequirement(BadgeEnums.Quake)]
);
TemporaryBattleList.Cheren = new TemporaryBattle(
    'Cheren',
    [
        new GymPokemon('Stoutland', 14251644, 25),
        new GymPokemon('Cinccino', 13832478, 25),
        new GymPokemon('Watchog', 13832478, 25),
    ],
    'Fantastic! You and your Pokémon have grown much stronger!',
    [new TemporaryBattleRequirement('Hugh3')]
);
TemporaryBattleList.Colress2 = new TemporaryBattle(
    'Colress2',
    [
        new GymPokemon('Magneton', 14768444, 25),
        new GymPokemon('Elgyem', 14334078, 25),
        new GymPokemon('Klink', 14334078, 25),
    ],
    'Well done! I learned much from this battle!',
    [new TemporaryBattleRequirement('Cheren')]
);
TemporaryBattleList.Hugh4 = new TemporaryBattle(
    'Hugh4',
    [
        new GymPokemon('Unfezant', 16756278, 39),
        new GymPokemon('Simipour', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Simisage', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Simisear', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
        new GymPokemon('Emboar', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Samurott', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Serperior', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'I couldn\'t even draw out my team\'s real strength... How pathetic!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))]
);
TemporaryBattleList.Hugh5 = new TemporaryBattle(
    'Hugh5',
    [
        new GymPokemon('Unfezant', 23557462, 55),
        new GymPokemon('Simipour', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Simisage', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Simisear', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
        new GymPokemon('Bouffalant', 23557462, 55),
        new GymPokemon('Emboar', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Samurott', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Serperior', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    '...Phew! You\'re really something! Thanks to you, I accomplished what I set out to do during my journey! I think you\'re really amazing! So become the Champion! Get the proof that you\'re a Trainer your Pokémon can be proud of! See you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova'))]
);
TemporaryBattleList.Hugh6 = new TemporaryBattle(
    'Hugh6',
    [
        new GymPokemon('Unfezant', 31270484, 62),
        new GymPokemon('Simipour', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Simisage', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Simisear', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
        new GymPokemon('Bouffalant', 31270484, 62),
        new GymPokemon('Flygon', 30507789, 62),
        new GymPokemon('Eelektross', 30507789, 62),
        new GymPokemon('Emboar', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Samurott', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Serperior', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'This bitter...yet refreshing feeling.',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TemporaryBattleList.Hugh7 = new TemporaryBattle(
    'Hugh7',
    [
        new GymPokemon('Unfezant', 35809748, 65),
        new GymPokemon('Simipour', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Simisage', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Simisear', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
        new GymPokemon('Bouffalant', 35809748, 65),
        new GymPokemon('Flygon', 34936339, 65),
        new GymPokemon('Eelektross', 34936339, 65),
        new GymPokemon('Emboar', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, 0)*/),
        new GymPokemon('Samurott', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, 1)*/),
        new GymPokemon('Serperior', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, 2)*/),
    ],
    'Just as I\'d expected! You are really drawing forth your Pokémon\'s power!... I suppose that\'s it. If winning in battles is strength, then believing that your Pokémon will come back and waiting for its return is also strength. Doing what you think is right no matter what anyone else says, like these guys do, is strength, too.',
    [new TemporaryBattleRequirement('Hugh6')]
);

//Kalos Temporary Battles
TemporaryBattleList.Shauna1 = new TemporaryBattle(
    'Shauna1',
    [
        new GymPokemon('Froakie', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Chespin', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Fennekin', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Hey! I wasn\'t done watching my cute Li\'l Pokémon yet!',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TemporaryBattleList.Sycamore1 = new TemporaryBattle(
    'Sycamore1',
    [
        new GymPokemon('Bulbasaur', 17568392, 10),
        new GymPokemon('Charmander', 17568392, 10),
        new GymPokemon('Squirtle', 17568392, 10),
    ],
    'Ha ha! You\'re too much for me! You\'re really something, aren\'t you?',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)]
);
TemporaryBattleList.Tierno1 = new TemporaryBattle(
    'Tierno1',
    [new GymPokemon('Corphish', 40132328, 12)],
    'That was some nice footwork!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)]
);
TemporaryBattleList['Trevor & Tierno'] = new TemporaryBattle(
    'Trevor & Tierno',
    [
        new GymPokemon('Pikachu', 23154377, 14),
        new GymPokemon('Corphish', 23856025, 16),
        new GymPokemon('Flabébé (Orange)', 23154377, 14),
    ],
    'So you can\'t learn everything just from the Pokédex... I see!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 7)]
);
TemporaryBattleList.Calem1 = new TemporaryBattle(
    'Calem1',
    [
        new GymPokemon('Meowstic', 40271251, 28),
        new GymPokemon('Absol', 40271251, 28),
        new GymPokemon('Braixen', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Frogadier', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Quilladin', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Your bonds with your Pokémon are really strong. Although, I don\'t like losing much...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))]
);
TemporaryBattleList.Calem2 = new TemporaryBattle(
    'Calem2',
    [
        new GymPokemon('Meowstic', 52417332, 31),
        new GymPokemon('Absol', 52417332, 31),
        new GymPokemon('Braixen', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Frogadier', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Quilladin', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Oof. I\'d kind of forgotten how strong you are.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)]
);
TemporaryBattleList.Calem3 = new TemporaryBattle(
    'Calem3',
    [
        new GymPokemon('Meowstic', 65491998, 35),
        new GymPokemon('Absol', 65491998, 35),
        new GymPokemon('Delphox', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Greninja', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Chesnaught', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Battling with you is fun, but losing all the time doesn\'t really make me look all that good.',
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
);
TemporaryBattleList.Calem4 = new TemporaryBattle(
    'Calem4',
    [
        new GymPokemon('Meowstic', 60349527, 44),
        new GymPokemon('Absol', 60349527, 44),
        new GymPokemon('Jolteon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Flareon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Vaporeon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
        new GymPokemon('Delphox', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Greninja', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Chesnaught', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Why am I still playing catch-up to you?!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)]
);
TemporaryBattleList['Professor Sycamore2'] = new TemporaryBattle(
    'Professor Sycamore2',
    [
        new GymPokemon('Venusaur', 88799088, 50),
        new GymPokemon('Charizard', 88799088, 50),
        new GymPokemon('Blastoise', 88799088, 50),
    ],
    'You are really something! You and your Pokémon have developed strong bonds by spending time together and by caring about one another. That\'s why you and your Pokémon are so strong.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
);
TemporaryBattleList.Shauna2 = new TemporaryBattle(
    'Shauna2',
    [
        new GymPokemon('Delcatty', 91718405, 49),
        new GymPokemon('Goodra', 91718405, 49),
        new GymPokemon('Greninja', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Chesnaught', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Delphox', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
    ],
    'Battles with friends are really, really exciting!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
);
TemporaryBattleList.Tierno2 = new TemporaryBattle(
    'Tierno2',
    [
        new GymPokemon('Talonflame', 91601632, 48),
        new GymPokemon('Roserade', 91718405, 49),
        new GymPokemon('Crawdaunt', 94618062, 52),
    ],
    'It\'s weird, but… I don\'t get that down when I lose to you.',
    [new TemporaryBattleRequirement('Shauna2')]
);
TemporaryBattleList.Trevor = new TemporaryBattle(
    'Trevor',
    [
        new GymPokemon('Raichu', 91718405, 49),
        new GymPokemon('Aerodactyl', 91718405, 49),
        new GymPokemon('Florges (Orange)', 94858684, 51),
    ],
    'There is still so much I don\'t know. Do I just not have what it takes?',
    [new TemporaryBattleRequirement('Tierno2')]
);
TemporaryBattleList.Calem5 = new TemporaryBattle(
    'Calem5',
    [
        new GymPokemon('Meowstic', 77085305, 57),
        new GymPokemon('Jolteon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Flareon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Vaporeon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
        new GymPokemon('Altaria', 77085305, 58),
        new GymPokemon('Absol', 81142426, 59),
        new GymPokemon('Delphox', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Greninja', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Chesnaught', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
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
TemporaryBattleList.Calem6 = new TemporaryBattle(
    'Calem6',
    [
        new GymPokemon('Meowstic', 152368742, 66),
        new GymPokemon('Clefable', 152368742, 68),
        new GymPokemon('Jolteon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Flareon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Vaporeon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
        new GymPokemon('Altaria', 152368742, 67),
        new GymPokemon('Delphox', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, 0)*/),
        new GymPokemon('Greninja', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, 1)*/),
        new GymPokemon('Chesnaught', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, 2)*/),
        new GymPokemon('Mega Absol', 190460928, 68),
    ],
    'I\'ll think about what you did well and use this loss to fuel my desire to improve.',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)]
);

//Alola Temporary Battles
TemporaryBattleList.Hau1 = new TemporaryBattle(
    'Hau1',
    [
        new GymPokemon('Popplio', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Rowlet', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Litten', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
    ],
    'Whoa! That was awesome! You and your Pokémon were both so cool!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)]
);
TemporaryBattleList.Hau2 = new TemporaryBattle(
    'Hau2',
    [
        new GymPokemon('Pichu', 75473838, 6),
        new GymPokemon('Popplio', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Rowlet', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Litten', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
    ],
    'Phew... That was awesome! That was a really great battle! I had a blast fighting you!',
    [new TemporaryBattleRequirement('Hau1')]
);
TemporaryBattleList.Hau3 = new TemporaryBattle(
    'Hau3',
    [
        new GymPokemon('Popplio', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Rowlet', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Litten', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
        new GymPokemon('Noibat', 92470422, 11),
        new GymPokemon('Pikachu', 93893044, 12),
    ],
    'Aww, man! I wanted to show off my Pokémon\'s best side more!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
TemporaryBattleList.Dexio = new TemporaryBattle(
    'Dexio',
    [
        new GymPokemon('Mime Jr.', 184013368, 15),
        new GymPokemon('Espeon', 195395639, 15),
    ],
    'That\'s what I would expect from a Trainer doing the island challenge. I felt the bond between you and your Pokémon!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TemporaryBattleList.Sina = new TemporaryBattle(
    'Sina',
    [
        new GymPokemon('Smoochum', 184013368, 15),
        new GymPokemon('Glaceon', 195395639, 15),
    ],
    'I get it... Facing trials helps you grow close to your team. I think that\'s absolutely wonderful!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TemporaryBattleList.Hau4 = new TemporaryBattle(
    'Hau4',
    [
        new GymPokemon('Brionne', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Dartrix', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Torracat', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
        new GymPokemon('Pikachu', 95796282, 15),
        new GymPokemon('Noibat', 93880356, 14),
        new GymPokemon('Eevee', 93880356, 14),
    ],
    'Nice! How\'d you come up with that kind of battle plan? You gotta tell me!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TemporaryBattleList.Gladion1 = new TemporaryBattle(
    'Gladion1',
    [
        new GymPokemon('Zorua', 127447988, 17),
        new GymPokemon('Zubat', 127447988, 17),
        new GymPokemon('Type: Null', 135172109, 18),
    ],
    'Hmph... It\'s not like me to slip up like that. I\'ve got to keep fighting stronger opponents. Looks like I\'m still not ready...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 5)]
);
TemporaryBattleList['Battle Royal'] = new TemporaryBattle(
    'Battle Royal',
    [
        new GymPokemon('Type: Null', 132593929, 20),
        new GymPokemon('Rockruff', 132593929, 20),
        new GymPokemon('Brionne', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Dartrix', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Torracat', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
    ],
    'The battle is over!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)]
);
TemporaryBattleList.Plumeria1 = new TemporaryBattle(
    'Plumeria1',
    [
        new GymPokemon('Golbat', 190972759, 26),
        new GymPokemon('Salandit', 202785507, 27),
    ],
    'Hmmph! You\'re pretty strong. I\'ll give you that. But mess with anyone in Team Skull again, and I\'ll show you how serious I can get.',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 21)]
);
TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 345252381, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
TemporaryBattleList.Hau5 = new TemporaryBattle(
    'Hau5',
    [
        new GymPokemon('Brionne', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Dartrix', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Torracat', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
        new GymPokemon('Flareon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Vaporeon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Leafeon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
        new GymPokemon('Noibat', 77980385, 28),
        new GymPokemon('Tauros', 77980385, 28),
        new GymPokemon('Alolan Raichu', 83521097, 29),
    ],
    'Bwah!! I had my breath held that whole battle!',
    [new TemporaryBattleRequirement('Ultra Wormhole')]
);
TemporaryBattleList.Plumeria2 = new TemporaryBattle(
    'Plumeria2',
    [
        new GymPokemon('Golbat', 200727520, 37),
        new GymPokemon('Salazzle', 213143655, 38),
    ],
    'Hmmph. Guess you are pretty tough. Now I understand why my Grunts waste so much time battling kids. But if you want us to return the Pokémon, then you\'ll have to come to us. Alone. The boss is dying to meet you, hmmph! See you at our base in Po Town!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))]
);
TemporaryBattleList.Gladion2 = new TemporaryBattle(
    'Gladion2',
    [
        new GymPokemon('Golbat', 138153002, 42),
        new GymPokemon('Zoroark', 138153002, 42),
        new GymPokemon('Type: Null', 146525911, 43),
    ],
    'That was wrong of me... I shouldn\'t have dragged you into a meaningless battle like that...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))]
);
TemporaryBattleList.Necrozma = new TemporaryBattle(
    'Necrozma',
    [
        new GymPokemon('Necrozma (Dusk Mane)', 267954010, 50),
        new GymPokemon('Necrozma (Dawn Wings)', 267954010, 50),
    ],
    'Necrozma retreated into the Ultra Wormhole',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))]
);
TemporaryBattleList['Ultra Megalopolis'] = new TemporaryBattle(
    'Ultra Megalopolis',
    [new GymPokemon('Necrozma (Ultra)', 536098161, 60)],
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
        new GymPokemon('Mawile', 189973142, 51),
        new GymPokemon('Granbull', 189973142, 51),
        new GymPokemon('Ribombee', 102200640, 51),
    ],
    'Woah! I\'m shocked at your strength!',
    [new TemporaryBattleRequirement('Ultra Megalopolis')]
);
TemporaryBattleList['Captain Ilima'] = new TemporaryBattle(
    'Captain Ilima',
    [
        new GymPokemon('Gumshoos', 189973142, 51),
        new GymPokemon('Smeargle', 189973142, 51),
        new GymPokemon('Komala', 198608284, 51),
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
        new GymPokemon('Trevenant', 189973142, 51),
        new GymPokemon('Shiinotic', 189973142, 51),
        new GymPokemon('Tsareena', 198608284, 51),
    ],
    'Sure enough, when it comes to you and Pokémon, the quality of the ingredients shines forth!',
    [new TemporaryBattleRequirement('Captain Ilima')]
);
TemporaryBattleList['Captain Lana'] = new TemporaryBattle(
    'Captain Lana',
    [
        new GymPokemon('Lanturn', 189973142, 51),
        new GymPokemon('Cloyster', 189973142, 51),
        new GymPokemon('Araquanid', 198608284, 51),
    ],
    'Well! Once again, you certainly reeled me in.',
    [new TemporaryBattleRequirement('Captain Mallow')]
);
TemporaryBattleList['Captain Kiawe'] = new TemporaryBattle(
    'Captain Kiawe',
    [
        new GymPokemon('Arcanine', 189973142, 51),
        new GymPokemon('Talonflame', 189973142, 51),
        new GymPokemon('Alolan Marowak', 198608284, 51),
    ],
    'Not enough dancing!',
    [new TemporaryBattleRequirement('Captain Lana')]
);
TemporaryBattleList['Captain Sophocles'] = new TemporaryBattle(
    'Captain Sophocles',
    [
        new GymPokemon('Togedemaru', 189973142, 51),
        new GymPokemon('Magnezone', 189973142, 51),
        new GymPokemon('Alolan Golem', 198608284, 51),
    ],
    'I couldn\'t get it done. Don\'t worry about it, my precious Pokémon...',
    [new TemporaryBattleRequirement('Captain Kiawe')]
);
TemporaryBattleList['Kahuna Nanu'] = new TemporaryBattle(
    'Kahuna Nanu',
    [
        new GymPokemon('Sableye', 90200640, 51),
        new GymPokemon('Absol', 90200640, 51),
        new GymPokemon('Alolan Persian', 198608284, 51),
    ],
    '...',
    [new TemporaryBattleRequirement('Captain Sophocles')]
);
TemporaryBattleList.Gladion3 = new TemporaryBattle(
    'Gladion3',
    [
        new GymPokemon('Crobat', 190138197, 53),
        new GymPokemon('Zoroark', 190138197, 53),
        new GymPokemon('Lucario', 190138197, 53),
        new GymPokemon('Silvally (Fire)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, 0)*/),
        new GymPokemon('Silvally (Water)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, 1)*/),
        new GymPokemon('Silvally (Grass)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, 2)*/),
    ],
    'You\'ve got good Pokémon. I know what kind of Trainer you are now. And what kind of journey you\'ve been through.',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
