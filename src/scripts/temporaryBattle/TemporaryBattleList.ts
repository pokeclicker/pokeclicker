const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

//Kanto Temporary Battles
TemporaryBattleList['Blue 1'] = new TemporaryBattle(
    'Blue 1',
    [
        new GymPokemon('Pidgey', 1040, 9),
        new GymPokemon('Charmander', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Squirtle', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Bulbasaur', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Bulbasaur', 1678, 9/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'I heard the Pokémon League is crawling with tough Trainers. I have to figure out how to get past them. You should quit dawdling and get a move on!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Boulder, GameConstants.AchievementOption.less),
    ],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Viridian City',
        imageName: 'Blue1',
    }
);
TemporaryBattleList['Blue 2'] = new TemporaryBattle(
    'Blue 2',
    [
        new GymPokemon('Pidgeotto', 3650, 17),
        new GymPokemon('Abra', 3230, 16),
        new GymPokemon('Rattata', 3370, 15),
        new GymPokemon('Charmander', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Squirtle', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Bulbasaur', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Bulbasaur', 3791, 18/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'Hey! Take it easy! You won already!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Cerulean City',
        imageName: 'Blue1',
    }
);
TemporaryBattleList['Blue 3'] = new TemporaryBattle(
    'Blue 3',
    [
        new GymPokemon('Pidgeotto', 19998, 19),
        new GymPokemon('Raticate', 19197, 16),
        new GymPokemon('Kadabra', 19197, 18),
        new GymPokemon('Charmeleon', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Wartortle', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Ivysaur', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Ivysaur', 20797, 20/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'Humph! At least you\'re raising your Pokémon!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Vermilion City',
        imageName: 'Blue2',
    }
);
TemporaryBattleList['Blue 4'] = new TemporaryBattle(
    'Blue 4',
    [
        new GymPokemon('Pidgeotto', 30398, 25),
        new GymPokemon('Exeggcute', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Growlithe', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Gyarados', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Gyarados', 28878, 23/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Gyarados', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Exeggcute', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Growlithe', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Growlithe', 28878, 22/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Kadabra', 30398, 20),
        new GymPokemon('Charmeleon', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Wartortle', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Ivysaur', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Ivysaur', 33438, 25/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'What? You stinker! I took it easy on you, too!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Lavender Town',
        imageName: 'Blue2',
    }
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
    undefined,
    {
        firstTimeRewardFunction: () => {
            BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
            Notifier.notify({
                message: 'You were awarded a Fighting Egg for defeating the Fighting Dojo',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        },
    }
);
TemporaryBattleList['Snorlax route 12'] = new TemporaryBattle(
    'Snorlax route 12',
    [new GymPokemon('Snorlax', 189990, 30)],
    undefined,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 12),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower')),
    ],
    [new TemporaryBattleRequirement('Snorlax route 12'), new ObtainedPokemonRequirement(pokemonMap.Snorlax)],
    {
        isTrainerBattle: false,
        visibleRequirement: new OneFromManyRequirement([new RouteKillRequirement(10, GameConstants.Region.kanto, 11), new RouteKillRequirement(5, GameConstants.Region.kanto, 12)]),
    }
);
TemporaryBattleList['Snorlax route 16'] = new TemporaryBattle(
    'Snorlax route 16',
    [new GymPokemon('Snorlax', 189990, 30)],
    undefined,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower'))],
    [new TemporaryBattleRequirement('Snorlax route 16'), new ObtainedPokemonRequirement(pokemonMap.Snorlax)],
    {
        isTrainerBattle: false,
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.kanto, 7),
    }
);
TemporaryBattleList['Blue 5'] = new TemporaryBattle(
    'Blue 5',
    [
        new GymPokemon('Pidgeot', 41482, 37),
        new GymPokemon('Exeggcute', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Growlithe', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Gyarados', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Gyarados', 38447, 38/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Gyarados', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Exeggcute', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Growlithe', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Growlithe', 38447, 35/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Alakazam', 41482, 35),
        new GymPokemon('Charizard', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Blastoise', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Venusaur', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Venusaur', 44113, 40/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'I\'m moving on up and ahead! I\'m going to the Pokémon League to boot out the Elite Four! I\'ll become the world\'s most powerful Trainer! Well, good luck to you! Don\'t sweat it! Smell ya!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower'))],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Saffron City',
        imageName: 'Blue2',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(131);
        },
    }
);
TemporaryBattleList['Biker Goon 1'] = new TemporaryBattle(
    'Biker Goon 1',
    [
        new GymPokemon('Koffing', 198477, 37),
        new GymPokemon('Grimer', 198477, 37),
    ],
    'Wha... What is this kid?!',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)],
    undefined,
    {
        displayName: 'Biker Goon',
        imageName: 'Biker Goon',
    }
);
TemporaryBattleList['Biker Goon 2'] = new TemporaryBattle(
    'Biker Goon 2',
    [new GymPokemon('Koffing', 396954, 38)],
    'Stop fooling around!',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)],
    undefined,
    {
        displayName: 'Biker Goon',
        imageName: 'Biker Goon',
    }
);
TemporaryBattleList['Biker Goon 3'] = new TemporaryBattle(
    'Biker Goon 3',
    [new GymPokemon('Grimer', 396954, 38)],
    '... ... ... ... ... ...',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)],
    undefined,
    {
        displayName: 'Biker Goon',
        imageName: 'Biker Goon',
    }
);
TemporaryBattleList['Cue Ball Paxton'] = new TemporaryBattle(
    'Cue Ball Paxton',
    [
        new GymPokemon('Koffing', 221664, 39),
        new GymPokemon('Grimer', 221664, 39),
    ],
    'All right, enough! We\'ll leave like you wanted! We\'ll be happy to see the last of this boring island!',
    [
        new TemporaryBattleRequirement('Biker Goon 1'),
        new TemporaryBattleRequirement('Biker Goon 2'),
        new TemporaryBattleRequirement('Biker Goon 3'),
    ]
);
TemporaryBattleList['Blue 6'] = new TemporaryBattle(
    'Blue 6',
    [
        new GymPokemon('Pidgeot', 84840, 47),
        new GymPokemon('Rhyhorn', 82269, 45),
        new GymPokemon('Exeggcute', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Gyarados', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Exeggcute', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Growlithe', 82269, 45/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
        new GymPokemon('Alakazam', 84840, 47),
        new GymPokemon('Charizard', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Blastoise', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Venusaur', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)*/),
        new GymPokemon('Venusaur', 92553, 53/*, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)*/),
    ],
    'That loosened me up. I\'m ready for the Pokémon League! You need more practice! But hey, you know that! I\'m out of here. Smell ya!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Earth),
    ],
    undefined,
    {
        displayName: 'Rival Blue',
        returnTown: 'Viridian City',
        imageName: 'Blue2',
    }
);

//Johto Temporary Battles
TemporaryBattleList['Silver 1'] = new TemporaryBattle(
    'Silver 1',
    [
        new GymPokemon('Cyndaquil', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Totodile', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Chikorita', 176000, 5/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '...Humph! Are you happy you won?',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 30)],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Cherrygrove City',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Silver 2'] = new TemporaryBattle(
    'Silver 2',
    [
        new GymPokemon('Gastly', 220788, 14),
        new GymPokemon('Zubat', 220788, 16),
        new GymPokemon('Quilava', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Croconaw', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Bayleef', 237772, 18/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '...Humph! Useless Pokémon! Listen, you. You only won because my Pokémon were weak.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 33)],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Azalea Town',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Silver 3'] = new TemporaryBattle(
    'Silver 3',
    [
        new GymPokemon('Gastly', 227997, 20),
        new GymPokemon('Zubat', 227997, 20),
        new GymPokemon('Magnemite', 223344, 18),
        new GymPokemon('Quilava', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Croconaw', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Bayleef', 251262, 22/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '...Humph! I\'m not fighting with another weakling ever again. It\'s just too much playing around.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))],
    undefined,
    {
        displayName: 'Rival Silver',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Silver 4'] = new TemporaryBattle(
    'Silver 4',
    [
        new GymPokemon('Golbat', 274520, 32),
        new GymPokemon('Magnemite', 260794, 30),
        new GymPokemon('Haunter', 260794, 30),
        new GymPokemon('Sneasel', 281383, 34),
        new GymPokemon('Quilava', 295109, 34/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Feraligatr', 295109, 32/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Meganium', 295109, 34/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '...Why... Why do I lose? I\'ve assembled the toughest Pokémon. I haven\'t eased up on the gas. So why do I lose?',
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ],
    undefined,
    {
        displayName: 'Rival Silver',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Silver 5'] = new TemporaryBattle(
    'Silver 5',
    [
        new GymPokemon('Sneasel', 363709, 36),
        new GymPokemon('Golbat', 375075, 38),
        new GymPokemon('Magneton', 375075, 37),
        new GymPokemon('Kadabra', 363709, 37),
        new GymPokemon('Haunter', 363709, 37),
        new GymPokemon('Typhlosion', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Feraligatr', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Meganium', 397807, 40/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '.................. I haven\'t given up on becoming the greatest Trainer... I\'m going to find out why I can\'t win and become stronger... When I do, I will challenge you. I\'ll beat you down with all my power. ...Humph! You keep at it until then.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto'))],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Indigo Plateau Johto',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Spiky-eared Pichu'] = new TemporaryBattle(
    'Spiky-eared Pichu',
    [new GymPokemon('Spiky-eared Pichu', 3178500, 20)],
    '',
    [new QuestLineStepCompletedRequirement('Unfinished Business', 6)],
    undefined,
    {
        displayName: 'Strange Pichu',
        hideTrainer: true,
    }
);
TemporaryBattleList['Rocket Boss Giovanni'] = new TemporaryBattle(
    'Rocket Boss Giovanni',
    [
        new GymPokemon('Nidoking', 861275, 42),
        new GymPokemon('Murkrow', 861275, 43),
        new GymPokemon('Nidoqueen', 861275, 46),
        new GymPokemon('Kangaskhan', 875275, 40),
    ],
    'What in the world are you? How this is possible...? How can a kid like you manage to destroy my dream once again? The precious dream of Team Rocket has become little more than an illusion...',
    [new QuestLineStepCompletedRequirement('Unfinished Business', 9)]
);
TemporaryBattleList['Silver 6'] = new TemporaryBattle(
    'Silver 6',
    [
        new GymPokemon('Sneasel', 540775, 46),
        new GymPokemon('Golbat', 540775, 47),
        new GymPokemon('Magneton', 554465, 46),
        new GymPokemon('Alakazam', 554465, 48),
        new GymPokemon('Gengar', 554465, 48),
        new GymPokemon('Typhlosion', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Feraligatr', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Meganium', 581846, 50/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    'My training\'s still not good enough...? My Pokémon are so weak, it makes me frustrated... But I can feel that they are getting better after each battle... .................. Tch! They\'re still too weak! I need to give them more training...',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
    undefined,
    {
        displayName: 'Rival Silver',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Silver 7'] = new TemporaryBattle(
    'Silver 7',
    [
        new GymPokemon('Sneasel', 633820, 55),
        new GymPokemon('Magneton', 653626, 55),
        new GymPokemon('Gengar', 669472, 56),
        new GymPokemon('Alakazam', 669472, 56),
        new GymPokemon('Crobat', 693240, 58),
        new GymPokemon('Typhlosion', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)*/),
        new GymPokemon('Feraligatr', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)*/),
        new GymPokemon('Meganium', 705124, 60/*, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)*/),
    ],
    '...Oh, no... I still can\'t win after all that training... I...I have to believe more in my Pokémon... ...No big deal. Sorry to have got in the way. Don\'t forget to rest your Pokémon before you challenge the Champion again!',
    [new TemporaryBattleRequirement('Silver 6')],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Indigo Plateau Johto',
        imageName: 'Silver',
    }
);

//Hoenn Temporary Battles
TemporaryBattleList['May 1'] = new TemporaryBattle(
    'May 1',
    [
        new GymPokemon('Torchic', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Mudkip', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Treecko', 823400, 5/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
    ],
    'Wow! That\'s great! You\'re pretty good!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 103)],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Oldale Town',
        imageName: 'May',
    }
);
TemporaryBattleList['May 2'] = new TemporaryBattle(
    'May 2',
    [
        new GymPokemon('Lotad', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Torkoal', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Wingull', 1124608, 13/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Torchic', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Mudkip', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Treecko', 1197952, 15/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
    ],
    'Yikes! You\'re better than I expected!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Rustboro City',
        imageName: 'May',
    }
);
TemporaryBattleList['May 3'] = new TemporaryBattle(
    'May 3',
    [
        new GymPokemon('Wingull', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Lombre', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Wingull', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Lombre', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Slugma', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Slugma', 1119525, 18/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Combusken', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Marshtomp', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Grovyle', 1153450, 20/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
    ],
    'Yikes! You\'re better than I expected!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Mauville City',
        imageName: 'May',
    }
);
TemporaryBattleList['Wally 1'] = new TemporaryBattle(
    'Wally 1',
    [new GymPokemon('Ralts', 1234567, 16)],
    '... ... ... ... ... ... ... ... ... ... ... ... ... ... ... I lost...',
    [new TemporaryBattleRequirement('May 3')],
    undefined,
    {
        displayName: 'Pokémon Trainer Wally',
        imageName: 'Wally',
    }
);
TemporaryBattleList['May 4'] = new TemporaryBattle(
    'May 4',
    [
        new GymPokemon('Pelipper', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Slugma', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Slugma', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Lombre', 1832160, 29/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Combusken', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Marshtomp', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Grovyle', 1887680, 31/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
    ],
    'Achah! You\'re strong! I was worried that you might be struggling with your training.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Fortree City',
        imageName: 'May',
    }
);
TemporaryBattleList['May 5'] = new TemporaryBattle(
    'May 5',
    [
        new GymPokemon('Tropius', 1932600, 31),
        new GymPokemon('Pelipper', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Ludicolo', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Slugma', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Ludicolo', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Slugma', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Pelipper', 2013125, 32/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
        new GymPokemon('Combusken', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)*/),
        new GymPokemon('Marshtomp', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)*/),
        new GymPokemon('Grovyle', 2133912, 34/*, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)*/),
    ],
    'I remember the battle I had with you on Route 103. That battle helped you become this strong, didn\'t it?',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        imageName: 'May',
    }
);
TemporaryBattleList['Wally 2'] = new TemporaryBattle(
    'Wally 2',
    [
        new GymPokemon('Altaria', 2048719, 44),
        new GymPokemon('Delcatty', 2048719, 43),
        new GymPokemon('Roselia', 2048719, 44),
        new GymPokemon('Magneton', 2048719, 41),
        new GymPokemon('Gardevoir', 2206313, 45),
    ],
    'Wow! You are strong, after all! I couldn\'t beat you today, but one of these days, I\'ll catch up to you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Hoenn'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Wally',
        returnTown: 'Pokémon League Hoenn',
        imageName: 'Wally',
    }
);
TemporaryBattleList['Sevii Rocket Grunt 1'] = new TemporaryBattle(
    'Sevii Rocket Grunt 1',
    [
        new GymPokemon('Cubone', 3861120, 37),
        new GymPokemon('Marowak', 4182880, 37),
    ],
    'Huh, what? Why\'d you have to win?',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 1)],
    undefined,
    {
        displayName: 'Team Rocket Grunt',
        imageName: 'Team Rocket Grunt (female)',
    }
);
TemporaryBattleList['Sevii Rocket Grunt 2'] = new TemporaryBattle(
    'Sevii Rocket Grunt 2',
    [
        new GymPokemon('Rattata', 1850120, 35),
        new GymPokemon('Raticate', 2011000, 35),
        new GymPokemon('Sandshrew', 1930560, 35),
        new GymPokemon('Sandslash', 2091440, 35),
    ],
    'Develop amnesia conveniently and forget everything you heard!',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 1)],
    undefined,
    {
        displayName: 'Team Rocket Grunt',
        imageName: 'Team Rocket Grunt (male)',
    }
);
TemporaryBattleList['Sevii Rocket Grunt 3'] = new TemporaryBattle(
    'Sevii Rocket Grunt 3',
    [
        new GymPokemon('Houndour', 4309500, 49),
        new GymPokemon('Houndour', 4309500, 49),
    ],
    'Oh, but... Too much!',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 8)],
    undefined,
    {
        displayName: 'Team Rocket Grunt',
        imageName: 'Team Rocket Grunt (female)',
    }
);
TemporaryBattleList['Sevii Rocket Grunt 4'] = new TemporaryBattle(
    'Sevii Rocket Grunt 4',
    [
        new GymPokemon('Machop', 2844270, 48),
        new GymPokemon('Machop', 2844270, 48),
        new GymPokemon('Machoke', 2930460, 48),
    ],
    'What do you think you\'re doing?!',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 8)],
    undefined,
    {
        displayName: 'Team Rocket Grunt',
        imageName: 'Team Rocket Grunt (male)',
    }
);
TemporaryBattleList['Sevii Rocket Grunt 5'] = new TemporaryBattle(
    'Sevii Rocket Grunt 5',
    [
        new GymPokemon('Hypno', 4309500, 49),
        new GymPokemon('Hypno', 4309500, 49),
    ],
    'Don\'t...you...dare...laugh...',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 8)],
    undefined,
    {
        displayName: 'Team Rocket Grunt',
        imageName: 'Team Rocket Grunt (male)',
    }
);
TemporaryBattleList['Sevii Rocket Ariana'] = new TemporaryBattle(
    'Sevii Rocket Ariana',
    [
        new GymPokemon('Muk', 2910600, 52),
        new GymPokemon('Arbok', 2910600, 53),
        new GymPokemon('Vileplume', 2998800, 54),
    ],
    'You\'re doing things according to your beliefs and morals. I understand now...',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 9)],
    undefined,
    {
        displayName: 'Team Rocket Executive Ariana',
        imageName: 'Team Rocket Executive Ariana',
    }
);
TemporaryBattleList['Sevii Rocket Archer'] = new TemporaryBattle(
    'Sevii Rocket Archer',
    [
        new GymPokemon('Golbat', 3045900, 53),
        new GymPokemon('Weezing', 3045900, 54),
        new GymPokemon('Houndoom', 3138200, 55),
    ],
    'Urgh... You were too strong... ... Th-that\'s Giovanni\'s Badge! So it\'s true? Team Rocket really has disbanded? ...We will abandon this warehouse. But don\'t think this is over. I won\'t let this be the end. I will find Giovanni. And I will resurrect Team Rocket! I will... Until then, farewell!',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 10)],
    undefined,
    {
        displayName: 'Team Rocket Executive Archer',
        imageName: 'Team Rocket Executive Archer',
    }
);
TemporaryBattleList['Scientist Gideon'] = new TemporaryBattle(
    'Scientist Gideon',
    [
        new GymPokemon('Voltorb', 1623360, 46),
        new GymPokemon('Electrode', 1724820, 46),
        new GymPokemon('Magnemite', 1623360, 46),
        new GymPokemon('Magneton', 1724820, 46),
        new GymPokemon('Porygon', 1877010, 46),
    ],
    'If I can\'t sell the Sapphire, it\'s worthless! Go ahead, take it!',
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 11)]
);
TemporaryBattleList['Pinkan Jessie & James'] = new TemporaryBattle(
    'Pinkan Jessie & James',
    [
        new GymPokemon('Lickitung', 2000000, 40),
        new GymPokemon('Pinkan Weezing', 3000000, 50),
        new GymPokemon('Pinkan Arbok', 3000000, 50),
        new GymPokemon('Meowth', 2000, 5),
    ],
    'We\'re blasting off again!!!!',
    [new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Themepark', 4)],
    undefined,
    {
        displayName: 'Jessie & James',
    }
);

TemporaryBattleList['Pinkan Officer Jenny'] = new TemporaryBattle(
    'Pinkan Officer Jenny',
    [
        new GymPokemon('Growlithe', 2000000, 40),
        new GymPokemon('Arcanine', 3500000, 55),
        new GymPokemon('Pinkan Nidoking', 4000000, 70),
    ],
    'So you\'re not with them? Okay...just don\'t help those criminals in the future, got it? Looks like some new Pinkan Pokémon have made their way to the island, if you bring us some Pinkan Berries we\'ll trade you for them.',
    [new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Themepark', 5)],
    undefined,
    {
        displayName: 'Officer Jenny',
    }
);

//Sinnoh Temporary Battles
TemporaryBattleList['Barry 1'] = new TemporaryBattle(
    'Barry 1',
    [
        new GymPokemon('Chimchar', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Piplup', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Turtwig', 1689240, 5/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'What are you saying?! We ended up losing?!',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Twinleaf Town',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 2'] = new TemporaryBattle(
    'Barry 2',
    [
        new GymPokemon('Starly', 2886187, 7),
        new GymPokemon('Chimchar', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Piplup', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Turtwig', 3074416, 9/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'What just happened? I lost?!',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Jubilife City',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 3'] = new TemporaryBattle(
    'Barry 3',
    [
        new GymPokemon('Staravia', 2239850, 25),
        new GymPokemon('Buizel', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Ponyta', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Buizel', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Roselia', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Roselia', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Ponyta', 2195053, 23/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Monferno', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Prinplup', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Grotle', 2329444, 27/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'Waaah! It goes to show my surefire winning strategy doesn\'t work',
    [new GymBadgeRequirement(BadgeEnums.Relic)],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Hearthome City',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 4'] = new TemporaryBattle(
    'Barry 4',
    [
        new GymPokemon('Staravia', 2490700, 34),
        new GymPokemon('Buizel', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Ponyta', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Buizel', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Roselia', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Roselia', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Ponyta', 2440886, 32/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Monferno', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Prinplup', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Grotle', 2590328, 36/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'Heh, yeah, maybe you did get a bit tougher since last time.',
    [
        new GymBadgeRequirement(BadgeEnums.Cobble),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Pastoria City',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Galactic Boss Cyrus'] = new TemporaryBattle(
    'Galactic Boss Cyrus',
    [
        new GymPokemon('Sneasel', 3255000, 34),
        new GymPokemon('Golbat', 3460000, 34),
        new GymPokemon('Murkrow', 3665000, 36),
    ],
    'Impressive. Your prowess is notable.',
    [new QuestLineStepCompletedRequirement('A new world', 2)]
);
TemporaryBattleList['Barry 5'] = new TemporaryBattle(
    'Barry 5',
    [
        new GymPokemon('Staraptor', 2104080, 36),
        new GymPokemon('Heracross', 2104080, 37),
        new GymPokemon('Floatzel', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rapidash', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Floatzel', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Roserade', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Roserade', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Rapidash', 2051478, 35/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Infernape', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Empoleon', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torterra', 2209284, 38/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'Yeah, yeah, you\'re just a bit better than me, as usual.',
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Canalave City',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 6'] = new TemporaryBattle(
    'Barry 6',
    [
        new GymPokemon('Staraptor', 3974738, 48),
        new GymPokemon('Floatzel', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rapidash', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Rapidash', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Floatzel', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Heracross', 3857834, 48),
        new GymPokemon('Roserade', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Roserade', 3740930, 47/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Snorlax', 3857834, 49/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Infernape', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Empoleon', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torterra', 4161784, 51/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    'I guess I\'m not ready for the Pokémon League if I\'m losing to you! Darn it! You watch, though! I\'ll get tougher and win my way through the Pokémon League! Because I\'m going to become the Champion, the toughest Trainer! You\'d better not lose to anyone before me!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 7'] = new TemporaryBattle(
    'Barry 7',
    [
        new GymPokemon('Staraptor', 9727091, 81),
        new GymPokemon('Floatzel', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Roserade', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Rapidash', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Roserade', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rapidash', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Floatzel', 9212128, 79/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
        new GymPokemon('Heracross', 9498219, 81),
        new GymPokemon('Snorlax', 9498219, 83),
        new GymPokemon('Infernape', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)*/),
        new GymPokemon('Empoleon', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torterra', 10184837, 85/*, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)*/),
    ],
    '...! It\'s all right, though. Keep getting tougher. The more you do, the tougher my Pokémon and I get, too. There\'s no end to Pokémon. That\'s what I\'m saying!',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Survival Area',
        imageName: 'Barry',
    }
);

//Unova Temporary Battles
TemporaryBattleList['Hugh 1'] = new TemporaryBattle(
    'Hugh 1',
    [
        new GymPokemon('Tepig', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Oshawott', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Snivy', 7269010, 5/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'I couldn\'t achieve victory for my partner... I won\'t let myself forget this frustration!',
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Aspertia City',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Hugh 2'] = new TemporaryBattle(
    'Hugh 2',
    [
        new GymPokemon('Tepig', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Oshawott', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Snivy', 11630416, 8/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'It can\'t be! How could I have lost? I need to apologize to my partner...',
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 20),
        new TemporaryBattleRequirement('Hugh 1'),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Team Plasma Grunt 1'] = new TemporaryBattle(
    'Team Plasma Grunt 1',
    [new GymPokemon('Patrat', 5492150, 14)],
    'Plasmaaaa! I lost! This is awful!',
    [new GymBadgeRequirement(BadgeEnums.Toxic)],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Colress 1'] = new TemporaryBattle(
    'Colress 1',
    [
        new GymPokemon('Magnemite', 15852768, 21),
        new GymPokemon('Klink', 16843566, 23),
    ],
    'Splendid! You are quite the Trainer!',
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Colress',
        returnTown: 'Nimbasa City',
        imageName: 'Colress',
    }
);
TemporaryBattleList['Team Plasma Grunt 2'] = new TemporaryBattle(
    'Team Plasma Grunt 2',
    [new GymPokemon('Trubbish', 35896600, 27)],
    'Don\'t let it go to your head... But you put up a good fight, kid!',
    [
        new GymBadgeRequirement(BadgeEnums.Bolt),
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 3),
    ],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Team Plasma Grunt 3'] = new TemporaryBattle(
    'Team Plasma Grunt 3',
    [new GymPokemon('Watchog', 35896600, 27)],
    'What\'s the big idea? This Pokémon I stole is useless!',
    [
        new GymBadgeRequirement(BadgeEnums.Bolt),
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 3),
    ],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (female)',
    }
);
TemporaryBattleList['Hugh 3'] = new TemporaryBattle(
    'Hugh 3',
    [
        new GymPokemon('Pignite', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Dewott', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Servine', 13864044, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
        new GymPokemon('Simipour', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Simisage', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Tranquill', 13456278, 25),
        new GymPokemon('Simisear', 13456278, 25/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'Man! I lost... You\'ve become way too tough! But, I\'m gonna get stronger, too!',
    [new GymBadgeRequirement(BadgeEnums.Quake)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Driftveil City',
        imageName: 'Hugh',
    }
);
TemporaryBattleList.Cheren = new TemporaryBattle(
    'Cheren',
    [
        new GymPokemon('Stoutland', 14251644, 25),
        new GymPokemon('Cinccino', 13832478, 25),
        new GymPokemon('Watchog', 13832478, 25),
    ],
    'Fantastic! You and your Pokémon have grown much stronger!',
    [new TemporaryBattleRequirement('Hugh 3')],
    undefined,
    {
        displayName: 'Pokémon Trainer Cheren',
        returnTown: 'Driftveil City',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Colress 2'] = new TemporaryBattle(
    'Colress 2',
    [
        new GymPokemon('Magneton', 14768444, 25),
        new GymPokemon('Elgyem', 14334078, 25),
        new GymPokemon('Klink', 14334078, 25),
    ],
    'Well done! I learned much from this battle!',
    [new TemporaryBattleRequirement('Cheren')],
    undefined,
    {
        displayName: 'Pokémon Trainer Colress',
        returnTown: 'Driftveil',
        imageName: 'Colress',
    }
);
TemporaryBattleList['Team Plasma Grunt 4'] = new TemporaryBattle(
    'Team Plasma Grunt 4',
    [new GymPokemon('Koffing', 39496600, 30)],
    'You! So you\'re a Trainer who fights while believing in your Pokémon, are you?',
    [new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 5)],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Team Plasma Grunt 5'] = new TemporaryBattle(
    'Team Plasma Grunt 5',
    [new GymPokemon('Trubbish', 39496600, 30)],
    'Plasmaaaa! Plasmaaaa!!',
    [new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 5)],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Team Plasma Grunts 1'] = new TemporaryBattle(
    'Team Plasma Grunts 1',
    [
        new GymPokemon('Golbat', 9774150, 29),
        new GymPokemon('Liepard', 9974150, 29),
        new GymPokemon('Grimer', 9774150, 29),
        new GymPokemon('Krokorok', 9974150, 29),
    ],
    'The Gym Leader is tough, but you... Are you even human?! I tried to use the same combination as you, and yet...',
    [new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 5)],
    undefined,
    {
        displayName: 'Team Plasma Grunts',
        imageName: 'Team Plasma Grunts (male)',
    }
);
TemporaryBattleList['Team Plasma Grunts 2'] = new TemporaryBattle(
    'Team Plasma Grunts 2',
    [
        new GymPokemon('Koffing', 9774150, 29),
        new GymPokemon('Watchog', 9974150, 29),
        new GymPokemon('Grimer', 9774150, 29),
        new GymPokemon('Raticate', 9974150, 29),
    ],
    'No! At this rate, I... I won\'t be able to protect the Plasma Frigate! P-P-P-Plasmaaaa!',
    [new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 5)],
    undefined,
    {
        displayName: 'Team Plasma Grunts',
        imageName: 'Team Plasma Grunts (male)',
    }
);
TemporaryBattleList['Hugh 4'] = new TemporaryBattle(
    'Hugh 4',
    [
        new GymPokemon('Unfezant', 16756278, 39),
        new GymPokemon('Simipour', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Simisage', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Simisear', 16756278, 39/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
        new GymPokemon('Emboar', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Samurott', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Serperior', 17264044, 41/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'I couldn\'t even draw out my team\'s real strength... How pathetic!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Undella Town',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Team Plasma Grunt 6'] = new TemporaryBattle(
    'Team Plasma Grunt 6',
    [
        new GymPokemon('Golbat', 22848300, 39),
        new GymPokemon('Garbodor', 24848300, 39),
    ],
    'What a blunder to have made in front of Zinzolin...',
    [
        new TemporaryBattleRequirement('Team Plasma Grunt 4'),
        new TemporaryBattleRequirement('Team Plasma Grunt 5'),
        new TemporaryBattleRequirement('Team Plasma Grunts 1'),
        new TemporaryBattleRequirement('Team Plasma Grunts 2'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 8),
    ],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Zinzolin 1'] = new TemporaryBattle(
    'Zinzolin 1',
    [
        new GymPokemon('Cryogonal', 23848300, 42),
        new GymPokemon('Sneasel', 25848300, 44),
    ],
    'You can\'t stop us! We will use the DNA Splicers to awaken the true power of the legendary Dragon-type Pokémon! We will steal the Splicers from the Opelucid City gym leader!',
    [new TemporaryBattleRequirement('Team Plasma Grunt 6')],
    undefined,
    {
        displayName: 'Zinzolin',
        imageName: 'Zinzolin',
    }
);
TemporaryBattleList['Team Plasma Grunt 7'] = new TemporaryBattle(
    'Team Plasma Grunt 7',
    [
        new GymPokemon('Watchog', 26298300, 44),
        new GymPokemon('Muk', 28298300, 44),
    ],
    'You little... You knocked out my stupid pawns!',
    [new TemporaryBattleRequirement('Zinzolin 1')],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Team Plasma Grunt 8'] = new TemporaryBattle(
    'Team Plasma Grunt 8',
    [
        new GymPokemon('Golbat', 26298300, 44),
        new GymPokemon('Garbodor', 28298300, 44),
    ],
    'Argh! Lame! Stupid! Fool! Plasmaaaa!',
    [new TemporaryBattleRequirement('Zinzolin 1')],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (female)',
    }
);
TemporaryBattleList['Team Plasma Grunt 9'] = new TemporaryBattle(
    'Team Plasma Grunt 9',
    [
        new GymPokemon('Seviper', 26298300, 44),
        new GymPokemon('Weezing', 28298300, 44),
    ],
    'Even if I lose, I will not give up on justice for Team Plasma! That\'s all!',
    [new TemporaryBattleRequirement('Zinzolin 1')],
    undefined,
    {
        displayName: 'Team Plasma Grunt',
        imageName: 'Team Plasma Grunt (male)',
    }
);
TemporaryBattleList['Zinzolin 2'] = new TemporaryBattle(
    'Zinzolin 2',
    [
        new GymPokemon('Cryogonal', 17632200, 46),
        new GymPokemon('Cryogonal', 17632200, 46),
        new GymPokemon('Weavile', 20632200, 48),
    ],
    'Have you gotten even stronger than you were in Lucanosa Town? How, in such a brief amount of time...',
    [
        new TemporaryBattleRequirement('Team Plasma Grunt 7'),
        new TemporaryBattleRequirement('Team Plasma Grunt 8'),
        new TemporaryBattleRequirement('Team Plasma Grunt 9'),
    ],
    undefined,
    {
        displayName: 'Zinzolin',
        imageName: 'Zinzolin',
    }
);
TemporaryBattleList['Plasma Shadow 1'] = new TemporaryBattle(
    'Plasma Shadow 1',
    [
        new GymPokemon('Pawniard', 18065533, 46),
        new GymPokemon('Pawniard', 18065533, 46),
        new GymPokemon('Absol', 21065533, 48),
    ],
    'I hate to admit it, but... You\'re a good trainer. Awww. How unlucky. I don\'t happen to be the one holding the DNA Splicers. I was just buying time for the others to escape. Cheerio, bye-bye, whatever.',
    [new TemporaryBattleRequirement('Zinzolin 2')],
    undefined,
    {
        displayName: 'Plasma Shadow',
        imageName: 'Plasma Shadow',
    }
);
TemporaryBattleList['Colress 3'] = new TemporaryBattle(
    'Colress 3',
    [
        new GymPokemon('Magneton', 13557307, 50),
        new GymPokemon('Metang', 13557307, 50),
        new GymPokemon('Beheeyem', 13557307, 50),
        new GymPokemon('Magnezone', 13657307, 50),
        new GymPokemon('Klinklang', 13957307, 52),
    ],
    'So this is what it means to draw forth the power hidden in your Pokémon! To me, whether Team Plasma wins or whether you win will decide how the relationship between people and Pokémon should be! You\'d better hurry, they have already captured the legendary Dragon-type Pokémon! Good luck in your battle!',
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm')),
        new TemporaryBattleRequirement('Plasma Shadow 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 17),
    ]
);
TemporaryBattleList['Plasma Shadow 2'] = new TemporaryBattle(
    'Plasma Shadow 2',
    [
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Absol', 28025488, 51),
    ],
    'It doesn\'t bother us a bit if the stolen Pokémon cry or beg.',
    [new TemporaryBattleRequirement('Colress 3')],
    undefined,
    {
        displayName: 'Plasma Shadow',
        imageName: 'Plasma Shadow',
    }
);
TemporaryBattleList['Plasma Shadow 3'] = new TemporaryBattle(
    'Plasma Shadow 3',
    [
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Banette', 28025488, 51),
    ],
    'It doesn\'t bother us a bit if we have to use another Pokémon after one is defeated.',
    [new TemporaryBattleRequirement('Colress 3')],
    undefined,
    {
        displayName: 'Plasma Shadow',
        imageName: 'Plasma Shadow',
    }
);
TemporaryBattleList['Plasma Shadow 4'] = new TemporaryBattle(
    'Plasma Shadow 4',
    [
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Pawniard', 25025488, 49),
        new GymPokemon('Accelgor', 28025488, 51),
    ],
    'It doesn\'t bother us a bit if Pokémon win or lose.',
    [new TemporaryBattleRequirement('Colress 3')],
    undefined,
    {
        displayName: 'Plasma Shadow',
        imageName: 'Plasma Shadow',
    }
);
TemporaryBattleList['Ghetsis 1'] = new TemporaryBattle(
    'Ghetsis 1',
    [
        new GymPokemon('Kyurem (Black)', 43933198, 50),
        new GymPokemon('Kyurem (White)', 43933198, 50),
    ],
    'I can\'t believe it! The Black and White Kyurem I went to all the trouble of preparing! How irritating! Now I have to go recapture Kyurem, don\'t I? But first, I\'ll take down this disgusting Trainer with my own hand! This time I WILL succeed! No matter what they try, no one will be able to stop me!',
    [
        new TemporaryBattleRequirement('Plasma Shadow 2'),
        new TemporaryBattleRequirement('Plasma Shadow 3'),
        new TemporaryBattleRequirement('Plasma Shadow 4'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 20),
    ],
    undefined,
    {
        displayName: 'Ghetsis',
        imageName: 'Ghetsis',
    }
);
TemporaryBattleList['Ghetsis 2'] = new TemporaryBattle(
    'Ghetsis 2',
    [
        new GymPokemon('Cofagrigus', 16176055, 50),
        new GymPokemon('Seismitoad', 16176055, 50),
        new GymPokemon('Eelektross', 16176055, 50),
        new GymPokemon('Drapion', 16176055, 50),
        new GymPokemon('Toxicroak', 16276055, 50),
        new GymPokemon('Hydreigon', 16676055, 52),
    ],
    'My plans for complete and total world domination foiled yet again? No! It mustn\'t be! I couldn\'t have been defeated by some random Trainer from who knows where!',
    [new TemporaryBattleRequirement('Ghetsis 1')],
    undefined,
    {
        displayName: 'Ghetsis',
        imageName: 'Ghetsis',
    }
);
TemporaryBattleList['Hugh 5'] = new TemporaryBattle(
    'Hugh 5',
    [
        new GymPokemon('Unfezant', 23557462, 55),
        new GymPokemon('Simipour', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Simisage', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Simisear', 23086313, 55/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
        new GymPokemon('Bouffalant', 23557462, 55),
        new GymPokemon('Emboar', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Samurott', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Serperior', 24217071, 57/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    '...Phew! You\'re really something! Thanks to you, I accomplished what I set out to do during my journey! I think you\'re really amazing! So become the Champion! Get the proof that you\'re a Trainer your Pokémon can be proud of! See you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Pokémon League Unova',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Hugh 6'] = new TemporaryBattle(
    'Hugh 6',
    [
        new GymPokemon('Unfezant', 31270484, 62),
        new GymPokemon('Simipour', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Simisage', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Simisear', 30507789, 62/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
        new GymPokemon('Bouffalant', 31270484, 62),
        new GymPokemon('Flygon', 30507789, 62),
        new GymPokemon('Eelektross', 30507789, 62),
        new GymPokemon('Emboar', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Samurott', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Serperior', 32605200, 64/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'This bitter...yet refreshing feeling.',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Undella Town',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Hugh 7'] = new TemporaryBattle(
    'Hugh 7',
    [
        new GymPokemon('Unfezant', 35809748, 65),
        new GymPokemon('Simipour', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Simisage', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Simisear', 34936339, 65/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
        new GymPokemon('Bouffalant', 35809748, 65),
        new GymPokemon('Flygon', 34936339, 65),
        new GymPokemon('Eelektross', 34936339, 65),
        new GymPokemon('Emboar', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)*/),
        new GymPokemon('Samurott', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)*/),
        new GymPokemon('Serperior', 37338212, 67/*, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)*/),
    ],
    'Just as I\'d expected! You are really drawing forth your Pokémon\'s power!... I suppose that\'s it. If winning in battles is strength, then believing that your Pokémon will come back and waiting for its return is also strength. Doing what you think is right no matter what anyone else says, like these guys do, is strength, too.',
    [new TemporaryBattleRequirement('Hugh 6')],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Driftveil City',
        imageName: 'Hugh',
    }
);

//Kalos Temporary Battles
TemporaryBattleList['Aipom Alley'] = new TemporaryBattle(
    'Aipom Alley',
    [
        new GymPokemon('Aipom', 31200000, 66),
        new GymPokemon('Aipom', 31200000, 66),
        new GymPokemon('Aipom', 31200000, 66),
        new GymPokemon('Aipom', 31200000, 66),
        new GymPokemon('Aipom', 31200000, 66),
    ],
    '<i>The Aipoms run off, dropping a small glass vial.</i>',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 0)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Mime Interview'] = new TemporaryBattle(
    'Mime Interview',
    [new GymPokemon('Mr. Mime', 160225334, 100)],
    '<i>Mr. Mime relents and agrees to tell you what he knows.</i>',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 3)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Underground Fighting Ring'] = new TemporaryBattle(
    'Underground Fighting Ring',
    [
        new GymPokemon('Charizard', 83224411, 70),
        new GymPokemon('Magikarp', 10, 70),
        new GymPokemon('Gyarados', 85658821, 70),
    ],
    'OK, OK! I get my R from a guy at Clifford Industries, in Goldenrod City.',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 5)]
);
TemporaryBattleList['Lab Ambush'] = new TemporaryBattle(
    'Lab Ambush',
    [
        new GymPokemon('Greninja', 58333333, 70),
        new GymPokemon('Greninja', 58333333, 70),
        new GymPokemon('Greninja', 58333333, 70),
    ],
    '<i>As the dust clears from the battle, you see that Detective Pikachu has been wounded!</i>',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 9)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList.Imposter = new TemporaryBattle(
    'Imposter',
    [new GymPokemon('Ditto', 186753099, 100)],
    '<i>The Ditto loses its human form and collapses to the floor.</i>',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 12)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Possessed Mewtwo'] = new TemporaryBattle(
    'Possessed Mewtwo',
    [new GymPokemon('Mewtwo', 214456599, 100)],
    '<i>Howard\'s headset sparks and breaks. Mewtwo calms down, apparently free from Howard\'s influence. Mewtwo gives you a brief nod and flies off.</i>',
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 14)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList.Riot = new TemporaryBattle(
    'Riot',
    [
        new GymPokemon('Ninjask', 160554441, 70),
        new GymPokemon('Ninjask', 160554441, 70),
        new GymPokemon('Greninja', 165551573, 70),
    ],
    'Curse you! Diancie has escaped!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 0)]
);
TemporaryBattleList.Merilyn = new TemporaryBattle(
    'Merilyn',
    [
        new GymPokemon('Yanma', 243684567, 80),
        new GymPokemon('Delphox', 249682234, 80),
    ],
    'You ruined my shopping spree!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 1)]
);
TemporaryBattleList['Millis and Argus Steel'] = new TemporaryBattle(
    'Millis and Argus Steel',
    [
        new GymPokemon('Honedge', 126325325, 70),
        new GymPokemon('Doublade', 129983175, 70),
        new GymPokemon('Aegislash (Blade)', 130012468, 70),
        new GymPokemon('Chesnaught', 131462975, 70),
    ],
    'Our plans are ruined! Retreat!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 3)]
);
TemporaryBattleList['Shauna 1'] = new TemporaryBattle(
    'Shauna 1',
    [
        new GymPokemon('Froakie', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Chespin', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Fennekin', 24906504, 5/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Hey! I wasn\'t done watching my cute Li\'l Pokémon yet!',
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Shauna',
        returnTown: 'Aquacorde Town',
        imageName: 'Shauna',
    }
);
TemporaryBattleList['Sycamore 1'] = new TemporaryBattle(
    'Sycamore 1',
    [
        new GymPokemon('Bulbasaur', 17568392, 10),
        new GymPokemon('Charmander', 17568392, 10),
        new GymPokemon('Squirtle', 17568392, 10),
    ],
    'Ha ha! You\'re too much for me! You\'re really something, aren\'t you?',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
    undefined,
    {
        displayName: 'Pokémon Professor Sycamore',
        imageName: 'Sycamore',
    }
);
TemporaryBattleList['Tierno 1'] = new TemporaryBattle(
    'Tierno 1',
    [new GymPokemon('Corphish', 40132328, 12)],
    'That was some nice footwork!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)],
    undefined,
    {
        displayName: 'Pokémon Trainer Tierno',
        returnTown: 'Camphrier Town',
        imageName: 'Tierno',
    }
);
TemporaryBattleList['Trevor & Tierno'] = new TemporaryBattle(
    'Trevor & Tierno',
    [
        new GymPokemon('Pikachu', 23154377, 14),
        new GymPokemon('Corphish', 23856025, 16),
        new GymPokemon('Flabébé (Orange)', 23154377, 14),
    ],
    'So you can\'t learn everything just from the Pokédex... I see!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 7)],
    undefined,
    {
        displayName: 'Pokémon Trainer Trevor & Pokémon Trainer Tierno',
        returnTown: 'Camphrier Town',
    }
);
TemporaryBattleList['Calem 1'] = new TemporaryBattle(
    'Calem 1',
    [
        new GymPokemon('Meowstic', 40271251, 28),
        new GymPokemon('Absol', 40271251, 28),
        new GymPokemon('Braixen', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Frogadier', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Quilladin', 41888812, 30/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Your bonds with your Pokémon are really strong. Although, I don\'t like losing much...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Shalour City',
        imageName: 'Calem',
    }
);
TemporaryBattleList['Calem 2'] = new TemporaryBattle(
    'Calem 2',
    [
        new GymPokemon('Meowstic', 52417332, 31),
        new GymPokemon('Absol', 52417332, 31),
        new GymPokemon('Braixen', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Frogadier', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Quilladin', 54231360, 33/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Oof. I\'d kind of forgotten how strong you are.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Coumarine City',
        imageName: 'Calem',
    }
);
TemporaryBattleList['Calem 3'] = new TemporaryBattle(
    'Calem 3',
    [
        new GymPokemon('Meowstic', 65491998, 35),
        new GymPokemon('Absol', 65491998, 35),
        new GymPokemon('Delphox', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Greninja', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Chesnaught', 67476604, 37/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Battling with you is fun, but losing all the time doesn\'t really make me look all that good.',
    [new GymBadgeRequirement(BadgeEnums.Voltage)],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Lumiose City',
        imageName: 'Calem',
    }
);
TemporaryBattleList['Calem 4'] = new TemporaryBattle(
    'Calem 4',
    [
        new GymPokemon('Meowstic', 60349527, 44),
        new GymPokemon('Absol', 60349527, 44),
        new GymPokemon('Jolteon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Flareon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Vaporeon', 61391150, 44/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
        new GymPokemon('Delphox', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Greninja', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Chesnaught', 63846796, 46/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Why am I still playing catch-up to you?!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Anistar City',
        imageName: 'Calem',
    }
);
TemporaryBattleList['Sycamore 2'] = new TemporaryBattle(
    'Sycamore 2',
    [
        new GymPokemon('Venusaur', 88799088, 50),
        new GymPokemon('Charizard', 88799088, 50),
        new GymPokemon('Blastoise', 88799088, 50),
    ],
    'You are really something! You and your Pokémon have developed strong bonds by spending time together and by caring about one another. That\'s why you and your Pokémon are so strong.',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
    undefined,
    {
        displayName: 'Pokémon Professor Sycamore',
        imageName: 'Sycamore',
    }
);
TemporaryBattleList['Shauna 2'] = new TemporaryBattle(
    'Shauna 2',
    [
        new GymPokemon('Delcatty', 91718405, 49),
        new GymPokemon('Goodra', 91718405, 49),
        new GymPokemon('Greninja', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Chesnaught', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Delphox', 94497751, 51/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'Battles with friends are really, really exciting!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)],
    undefined,
    {
        displayName: 'Pokémon Trainer Shauna',
        returnTown: 'Couriway Town',
        imageName: 'Shauna',
    }
);
TemporaryBattleList['Tierno 2'] = new TemporaryBattle(
    'Tierno 2',
    [
        new GymPokemon('Talonflame', 91601632, 48),
        new GymPokemon('Roserade', 91718405, 49),
        new GymPokemon('Crawdaunt', 94618062, 52),
    ],
    'It\'s weird, but… I don\'t get that down when I lose to you.',
    [new TemporaryBattleRequirement('Shauna 2')],
    undefined,
    {
        displayName: 'Pokémon Trainer Tierno',
        returnTown: 'Couriway Town',
        imageName: 'Tierno',
    }
);
TemporaryBattleList.Trevor = new TemporaryBattle(
    'Trevor',
    [
        new GymPokemon('Raichu', 91718405, 49),
        new GymPokemon('Aerodactyl', 91718405, 49),
        new GymPokemon('Florges (Orange)', 94858684, 51),
    ],
    'There is still so much I don\'t know. Do I just not have what it takes?',
    [new TemporaryBattleRequirement('Tierno 2')],
    undefined,
    {
        displayName: 'Pokémon Trainer Trevor',
        returnTown: 'Couriway Town',
    }
);
TemporaryBattleList['Calem 5'] = new TemporaryBattle(
    'Calem 5',
    [
        new GymPokemon('Meowstic', 77085305, 57),
        new GymPokemon('Jolteon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Flareon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Vaporeon', 77085305, 57/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
        new GymPokemon('Altaria', 77085305, 58),
        new GymPokemon('Absol', 81142426, 59),
        new GymPokemon('Delphox', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Greninja', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Chesnaught', 87228108, 61/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
    ],
    'I\'m still no match for you... You know, it\'s because I met you that I was able to get this far... But our journey\'s just getting started. Who knows what heights we\'ll reach!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Pokémon League Kalos',
        imageName: 'Calem',
    }
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
    undefined,
    {
        displayName: 'Pokémon Trainer AZ',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(670.05);
        },
    }
);
TemporaryBattleList['Ash Ketchum Kanto'] = new TemporaryBattle(
    'Ash Ketchum Kanto',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Pidgeot', 123998000, 56),
        new GymPokemon('Bulbasaur', 123998000, 56),
        new GymPokemon('Charizard', 123998000, 60),
        new GymPokemon('Squirtle', 123998000, 62),
        new GymPokemon('Muk', 123998000, 62),
    ],
    'That was a fun battle!',
    [new QuestLineStartedRequirement('The New Kid')],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Pallet Town',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Johto'] = new TemporaryBattle(
    'Ash Ketchum Johto',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Heracross', 123998000, 56),
        new GymPokemon('Noctowl', 123998000, 56),
        new GymPokemon('Bayleef', 123998000, 60),
        new GymPokemon('Cyndaquil', 123998000, 62),
        new GymPokemon('Totodile', 123998000, 62),
    ],
    'Don\'t I know you from somewhere?',
    [new QuestLineStepCompletedRequirement('The New Kid', 0), new RouteKillRequirement(10, GameConstants.Region.johto, 48)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Cianwood City',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Hoenn'] = new TemporaryBattle(
    'Ash Ketchum Hoenn',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Swellow', 123998000, 56),
        new GymPokemon('Grovyle', 123998000, 56),
        new GymPokemon('Torkoal', 123998000, 62),
        new GymPokemon('Corphish', 123998000, 60),
        new GymPokemon('Glalie', 123998000, 62),
    ],
    'That was a nice rematch. You sure are a strong Pokémon trainer! I\'ll beat you next time!',
    [new QuestLineStepCompletedRequirement('The New Kid', 1)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Lilycove City',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Sinnoh'] = new TemporaryBattle(
    'Ash Ketchum Sinnoh',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Staraptor', 123998000, 56),
        new GymPokemon('Torterra', 123998000, 56),
        new GymPokemon('Infernape', 123998000, 60),
        new GymPokemon('Buizel', 123998000, 62),
        new GymPokemon('Gible', 123998000, 62),
    ],
    'Wow, these battles are intense. It\'s getting hard to keep up with you... I think I need a break.',
    [new QuestLineStepCompletedRequirement('The New Kid', 2), new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Survival Area',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Unova'] = new TemporaryBattle(
    'Ash Ketchum Unova',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Unfezant', 123998000, 56),
        new GymPokemon('Snivy', 123998000, 62),
        new GymPokemon('Pignite', 123998000, 60),
        new GymPokemon('Oshawott', 123998000, 56),
        new GymPokemon('Krookodile', 123998000, 62),
    ],
    'Hey, what gives? I was just trying to relax here!',
    [new QuestLineStepCompletedRequirement('The New Kid', 3)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Mistralton City',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Kalos'] = new TemporaryBattle(
    'Ash Ketchum Kalos',
    [
        new GymPokemon('Pikachu (Partner Cap)', 123998000, 58),
        new GymPokemon('Talonflame', 123998000, 56),
        new GymPokemon('Hawlucha', 123998000, 56),
        new GymPokemon('Goodra', 123998000, 60),
        new GymPokemon('Noivern', 123998000, 62),
        new GymPokemon('Ash-Greninja', 123998000, 62),
    ],
    'I forgive you for chasing me around. I\'m going to take some time off with a long vacation on a tropical island! Will you take care of my Greninja for me? He has a special Bond while in Battle with his trainer.',
    [new QuestLineStepCompletedRequirement('The New Kid', 4)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Kiloude City',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Pinkan'] = new TemporaryBattle(
    'Ash Ketchum Pinkan',
    [
        new GymPokemon('Pinkan Pikachu', 123998000, 58),
        new GymPokemon('Snorlax', 123998000, 56),
        new GymPokemon('Lapras', 123998000, 56),
        new GymPokemon('Kingler', 123998000, 60),
        new GymPokemon('Tauros', 123998000, 62),
        new GymPokemon('Charizard', 123998000, 62),
    ],
    'Hey, you found me on my vacation! Just make sure your Pikachu does not eat the berries here.',
    [new QuestLineCompletedRequirement('The New Kid'), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinkan Mountain'))],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Pinkan Mountain',
        imageName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(25.13);
        },
    }
);
TemporaryBattleList['Calem 6'] = new TemporaryBattle(
    'Calem 6',
    [
        new GymPokemon('Meowstic', 152368742, 66),
        new GymPokemon('Clefable', 152368742, 68),
        new GymPokemon('Jolteon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Flareon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Vaporeon', 159987179, 66/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
        new GymPokemon('Altaria', 152368742, 67),
        new GymPokemon('Delphox', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)*/),
        new GymPokemon('Greninja', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)*/),
        new GymPokemon('Chesnaught', 170462530, 70/*, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)*/),
        new GymPokemon('Mega Absol', 190460928, 68),
    ],
    'I\'ll think about what you did well and use this loss to fuel my desire to improve.',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Kiloude City',
        imageName: 'Calem',
    }
);

//Alola Temporary Battles
TemporaryBattleList['Hau 1'] = new TemporaryBattle(
    'Hau 1',
    [
        new GymPokemon('Popplio', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rowlet', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Litten', 71131094, 5/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
    ],
    'Whoa! That was awesome! You and your Pokémon were both so cool!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Iki Town',
        imageName: 'Hau',
    }
);
TemporaryBattleList['Hau 2'] = new TemporaryBattle(
    'Hau 2',
    [
        new GymPokemon('Pichu', 75473838, 6),
        new GymPokemon('Popplio', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rowlet', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Litten', 81763320, 7/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
    ],
    'Phew... That was awesome! That was a really great battle! I had a blast fighting you!',
    [new TemporaryBattleRequirement('Hau 1')],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Iki Town',
        imageName: 'Hau',
    }
);
TemporaryBattleList['Hau 3'] = new TemporaryBattle(
    'Hau 3',
    [
        new GymPokemon('Popplio', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rowlet', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Litten', 98160909, 13/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
        new GymPokemon('Noibat', 92470422, 11),
        new GymPokemon('Pikachu', 93893044, 12),
    ],
    'Aww, man! I wanted to show off my Pokémon\'s best side more!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Melemele Woods',
        imageName: 'Hau',
    }
);
TemporaryBattleList.Dexio = new TemporaryBattle(
    'Dexio',
    [
        new GymPokemon('Mime Jr.', 184013368, 15),
        new GymPokemon('Espeon', 195395639, 15),
    ],
    'That\'s what I would expect from a Trainer doing the island challenge. I felt the bond between you and your Pokémon!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
    undefined,
    {
        displayName: 'Pokémon Trainer Dexio',
    }
);
TemporaryBattleList.Sina = new TemporaryBattle(
    'Sina',
    [
        new GymPokemon('Smoochum', 184013368, 15),
        new GymPokemon('Glaceon', 195395639, 15),
    ],
    'I get it... Facing trials helps you grow close to your team. I think that\'s absolutely wonderful!',
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
    undefined,
    {
        displayName: 'Pokémon Trainer Sina',
    }
);
TemporaryBattleList['Hau 4'] = new TemporaryBattle(
    'Hau 4',
    [
        new GymPokemon('Brionne', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Dartrix', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torracat', 99628133, 16/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
        new GymPokemon('Pikachu', 95796282, 15),
        new GymPokemon('Noibat', 93880356, 14),
        new GymPokemon('Eevee', 93880356, 14),
    ],
    'Nice! How\'d you come up with that kind of battle plan? You gotta tell me!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Paniola Town',
        imageName: 'Hau',
    }
);
TemporaryBattleList['Gladion 1'] = new TemporaryBattle(
    'Gladion 1',
    [
        new GymPokemon('Zorua', 127447988, 17),
        new GymPokemon('Zubat', 127447988, 17),
        new GymPokemon('Type: Null', 135172109, 18),
    ],
    'Hmph... It\'s not like me to slip up like that. I\'ve got to keep fighting stronger opponents. Looks like I\'m still not ready...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 5)],
    undefined,
    {
        displayName: 'Team Skull Gladion',
        returnTown: 'Paniola Town',
        imageName: 'Gladion',
    }
);
TemporaryBattleList['Battle Royal'] = new TemporaryBattle(
    'Battle Royal',
    [
        new GymPokemon('Type: Null', 132593929, 20),
        new GymPokemon('Rockruff', 132593929, 20),
        new GymPokemon('Brionne', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Dartrix', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torracat', 132593929, 20/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
    ],
    'The battle is over!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)]
);
TemporaryBattleList['Plumeria 1'] = new TemporaryBattle(
    'Plumeria 1',
    [
        new GymPokemon('Golbat', 190972759, 26),
        new GymPokemon('Salandit', 202785507, 27),
    ],
    'Hmmph! You\'re pretty strong. I\'ll give you that. But mess with anyone in Team Skull again, and I\'ll show you how serious I can get.',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 21)],
    undefined,
    {
        displayName: 'Team Skull Admin Plumeria',
        returnTown: 'Memorial Hill',
        imageName: 'Plumeria',
    }
);
TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 345252381, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
    undefined,
    {
        hideTrainer: true,
        imageName: 'Wormhole',
    }
);
TemporaryBattleList['Hau 5'] = new TemporaryBattle(
    'Hau 5',
    [
        new GymPokemon('Brionne', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Dartrix', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Torracat', 88240962, 30/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
        new GymPokemon('Flareon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Vaporeon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Leafeon', 80032500, 28/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
        new GymPokemon('Noibat', 77980385, 28),
        new GymPokemon('Tauros', 77980385, 28),
        new GymPokemon('Alolan Raichu', 83521097, 29),
    ],
    'Bwah!! I had my breath held that whole battle!',
    [new TemporaryBattleRequirement('Ultra Wormhole')],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Malie City',
        imageName: 'Hau',
    }
);
TemporaryBattleList['Plumeria 2'] = new TemporaryBattle(
    'Plumeria 2',
    [
        new GymPokemon('Golbat', 200727520, 37),
        new GymPokemon('Salazzle', 213143655, 38),
    ],
    'Hmmph. Guess you are pretty tough. Now I understand why my Grunts waste so much time battling kids. But if you want us to return the Pokémon, then you\'ll have to come to us. Alone. The boss is dying to meet you, hmmph! See you at our base in Po Town!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))],
    undefined,
    {
        displayName: 'Team Skull Admin Plumeria',
        returnTown: 'Tapu Village',
        imageName: 'Plumeria',
    }
);
TemporaryBattleList['Gladion 2'] = new TemporaryBattle(
    'Gladion 2',
    [
        new GymPokemon('Golbat', 138153002, 42),
        new GymPokemon('Zoroark', 138153002, 42),
        new GymPokemon('Type: Null', 146525911, 43),
    ],
    'That was wrong of me... I shouldn\'t have dragged you into a meaningless battle like that...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))],
    undefined,
    {
        displayName: 'Team Skull Gladion',
        returnTown: 'Tapu Village',
        imageName: 'Gladion',
    }
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
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('Mina\'s Trial').beginQuest();
        },
        hideTrainer: true,
        imageName: 'Wormhole',
    }
);
TemporaryBattleList['Captain Mina'] = new TemporaryBattle(
    'Captain Mina',
    [
        new GymPokemon('Mawile', 189973142, 51),
        new GymPokemon('Granbull', 189973142, 51),
        new GymPokemon('Ribombee', 198608284, 51),
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
TemporaryBattleList['Gladion 3'] = new TemporaryBattle(
    'Gladion 3',
    [
        new GymPokemon('Crobat', 190138197, 53),
        new GymPokemon('Zoroark', 190138197, 53),
        new GymPokemon('Lucario', 190138197, 53),
        new GymPokemon('Silvally (Fire)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)*/),
        new GymPokemon('Silvally (Water)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)*/),
        new GymPokemon('Silvally (Grass)', 209152017, 55/*, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)*/),
    ],
    'You\'ve got good Pokémon. I know what kind of Trainer you are now. And what kind of journey you\'ve been through.',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)],
    undefined,
    {
        displayName: 'Pokémon Trainer Gladion',
        returnTown: 'Mount Lanakila',
        imageName: 'Gladion',
    }
);
TemporaryBattleList.Anabel = new TemporaryBattle(
    'Anabel',
    [
        new GymPokemon('Alakazam', 229464883, 61),
        new GymPokemon('Weavile', 229464883, 61),
        new GymPokemon('Mismagius', 229464883, 61),
        new GymPokemon('Salamence', 229464883, 61),
        new GymPokemon('Snorlax', 234464883, 61),
    ],
    'Oh you\'re good! You might just have a shot, here are some Beast Balls. Go hunt down those strange Ultra Beasts! If you need more Beast Balls, you can buy them here.',
    [new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 0)]
);
TemporaryBattleList['Captain Mina UB'] = new TemporaryBattle(
    'Captain Mina UB',
    [
        new GymPokemon('Klefki', 239464883, 61),
        new GymPokemon('Granbull', 239464883, 61),
        new GymPokemon('Shiinotic', 239464883, 61),
        new GymPokemon('Wigglytuff', 239464883, 61),
        new GymPokemon('Ribombee', 244464883, 61),
    ],
    'Your strength is still shocking!',
    [new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 7)],
    undefined,
    {
        displayName: 'Captain Mina',
        imageName: 'Captain Mina',
    }
);
TemporaryBattleList['Kahuna Nanu UB'] = new TemporaryBattle(
    'Kahuna Nanu UB',
    [
        new GymPokemon('Sableye', 249464883, 63),
        new GymPokemon('Krookodile', 249464883, 63),
        new GymPokemon('Honchkrow', 249464883, 63),
        new GymPokemon('Absol', 249464883, 63),
        new GymPokemon('Alolan Persian', 254464883, 63),
    ],
    'I had to be sure. Sure that you\'re ready for what\'s coming...',
    [new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 13)],
    undefined,
    {
        displayName: 'Kahuna Nanu',
        imageName: 'Kahuna Nanu',
    }
);
TemporaryBattleList['Ash Ketchum Alola'] = new TemporaryBattle(
    'Ash Ketchum Alola',
    [
        new GymPokemon('Pikachu (Partner Cap)', 182908638, 58),
        new GymPokemon('Rowlet', 182908638, 56),
        new GymPokemon('Incineroar', 182908638, 56),
        new GymPokemon('Lycanroc (Dusk)', 182908638, 60),
        new GymPokemon('Naganadel', 182908638, 62),
        new GymPokemon('Melmetal', 182908638, 62),
    ],
    'Thanks for battling with me again! I\'ve reignited my passion to battle after a nice, long break! I have no idea where I keep getting all these hats, but I have too many. Here, take this one for your Pikachu. It can help you grow together as partners!',
    [new QuestLineCompletedRequirement('The New Kid'), new RouteKillRequirement(10, GameConstants.Region.alola, 30)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Seafolk Village',
        imageName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(25.07);
        },
    }
);

//Galar Temporary Battles
//TODO: Have Hop's starter depend on the players Galar starter
TemporaryBattleList['Hop 1'] = new TemporaryBattle(
    'Hop 1',
    [
        new GymPokemon('Wooloo', 29607662, 3),
        new GymPokemon('Sobble', 30984763, 5/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Grookey', 30984763, 5/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Scorbunny', 30984763, 5/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'Well, that was a shock! Guess I know now why Lee thought he should give you a Pokémon, too...',
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Postwick',
        imageName: 'Hop',
    }
);
TemporaryBattleList.Mirages = new TemporaryBattle(
    'Mirages',
    [
        new GymPokemon('Zacian (Battle Hero)', 34427515, 70),
        new GymPokemon('Zamazenta (Battle Hero)', 34427515, 70),
    ],
    'The Pokémon fled.',
    [new TemporaryBattleRequirement('Hop 1')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Hop 2'] = new TemporaryBattle(
    'Hop 2',
    [
        new GymPokemon('Wooloo', 82626036, 6),
        new GymPokemon('Rookidee', 82626036, 5),
        new GymPokemon('Sobble', 85208099, 8/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Grookey', 85208099, 8/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Scorbunny', 85208099, 8/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'And I even got my Pokéball throw perfect too!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Professor Magnolia\'s House',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Hop 3'] = new TemporaryBattle(
    'Hop 3',
    [
        new GymPokemon('Wooloo', 102249719, 11),
        new GymPokemon('Rookidee', 102249719, 12),
        new GymPokemon('Sobble', 105348195, 14/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Grookey', 105348195, 14/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Scorbunny', 105348195, 14/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'Was that really good training? Looks like I\'d better keep my guard up!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Motostoke',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Bede 1'] = new TemporaryBattle(
    'Bede 1',
    [
        new GymPokemon('Solosis', 107930259, 13),
        new GymPokemon('Gothita', 107930259, 15),
        new GymPokemon('Hatenna', 111200873, 16),
    ],
    'I see... Well, that\'s fine. I wasn\'t really trying all that hard anyway.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Bede',
        imageName: 'Bede',
    }
);
TemporaryBattleList['Hop 4'] = new TemporaryBattle(
    'Hop 4',
    [
        new GymPokemon('Wooloo', 145167441, 18),
        new GymPokemon('Corvisquire', 145167441, 19),
        new GymPokemon('Drizzile', 149566454, 21/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Thwackey', 149566454, 21/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Raboot', 149566454, 21/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'We both got ourselves the same Grass Badge, so how come you\'re so much stronger?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 14)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Hulbury',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Bede 2'] = new TemporaryBattle(
    'Bede 2',
    [
        new GymPokemon('Solosis', 135596164, 21),
        new GymPokemon('Gothita', 135596164, 22),
        new GymPokemon('Galarian Ponyta', 135596164, 22),
        new GymPokemon('Hatenna', 139970233, 23),
    ],
    'You showed at least a little effort, so I decided I should let you win!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Bede',
        imageName: 'Bede',
    }
);
TemporaryBattleList['Marnie 1'] = new TemporaryBattle(
    'Marnie 1',
    [
        new GymPokemon('Croagunk', 183113060, 24),
        new GymPokemon('Scraggy', 183113060, 24),
        new GymPokemon('Morpeko', 188661940, 26),
    ],
    'You beat me... Guess you must not be so bad after all, huh?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)],
    undefined,
    {
        displayName: 'Pokémon Trainer Marnie',
        imageName: 'Marnie',
    }
);
TemporaryBattleList['Hop 5'] = new TemporaryBattle(
    'Hop 5',
    [
        new GymPokemon('Cramorant', 184350136, 28),
        new GymPokemon('Toxel', 184350136, 29),
        new GymPokemon('Silicobra', 184350136, 30),
        new GymPokemon('Drizzile', 190296915, 33/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Thwackey', 190296915, 33/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Raboot', 190296915, 33/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'My strategy goes right to pot when I\'ve got all these bad thoughts running through my head...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Stow-on-Side',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Bede 3'] = new TemporaryBattle(
    'Bede 3',
    [
        new GymPokemon('Duosion', 197836220, 32),
        new GymPokemon('Gothorita', 197836220, 32),
        new GymPokemon('Galarian Ponyta', 197836220, 33),
        new GymPokemon('Hattrem', 204218033, 35),
    ],
    'This has to be some kind of mistake. I demand a do-over!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Fighting),
            new GymBadgeRequirement(BadgeEnums.Galar_Ghost),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Bede',
        imageName: 'Bede',
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('The Darkest Day').beginQuest();
        },
    }
);
TemporaryBattleList['Hop 6'] = new TemporaryBattle(
    'Hop 6',
    [
        new GymPokemon('Trevenant', 164138786, 34),
        new GymPokemon('Heatmor', 164138786, 34),
        new GymPokemon('Snorlax', 164138786, 35),
        new GymPokemon('Boltund', 164138786, 35),
        new GymPokemon('Inteleon', 169087694, 37/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rillaboom', 169087694, 37/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Cinderace', 169087694, 37/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'This is rubbish... My team can\'t perform if I can\'t get my own head straight as their Trainer...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Motostoke',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Hop 7'] = new TemporaryBattle(
    'Hop 7',
    [
        new GymPokemon('Dubwool', 169633690, 40),
        new GymPokemon('Corviknight', 169633690, 40),
        new GymPokemon('Pincurchin', 169633690, 39),
        new GymPokemon('Snorlax', 169633690, 39),
        new GymPokemon('Inteleon', 174748273, 41/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rillaboom', 174748273, 41/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Cinderace', 174748273, 41/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'I still can\'t even beat you, my true rival... But I think I\'m starting to see the light!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Circhester',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Marnie 2'] = new TemporaryBattle(
    'Marnie 2',
    [
        new GymPokemon('Liepard', 214035920, 42),
        new GymPokemon('Toxicroak', 214035920, 43),
        new GymPokemon('Scrafty', 214035920, 43),
        new GymPokemon('Morpeko', 220940304, 44),
    ],
    'What\'s with that?! My Pokémon didn\'t get a chance to really do their thing at all. Ugh!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 30)],
    undefined,
    {
        displayName: 'Pokémon Trainer Marnie',
        returnTown: 'Spikemuth',
        imageName: 'Marnie',
    }
);
TemporaryBattleList.Eternatus = new TemporaryBattle(
    'Eternatus',
    [new GymPokemon('Eternatus', 1560840234, 60)],
    'You defeated Eternatus, but it looks like it\'s not over yet!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Energy Plant'))],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 1597800902, 60)],
    'You caught Eternatus!',
    [new TemporaryBattleRequirement('Eternatus')],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(890);
        },
        hideTrainer: true,
    }
);
TemporaryBattleList['Hop 8'] = new TemporaryBattle(
    'Hop 8',
    [
        new GymPokemon('Dubwool', 372064692, 59),
        new GymPokemon('Pincurchin', 372064692, 59),
        new GymPokemon('Cramorant', 372064692, 58),
        new GymPokemon('Snorlax', 372064692, 58),
        new GymPokemon('Corviknight', 372064692, 58),
        new GymPokemon('Inteleon', 375642238, 60/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)*/),
        new GymPokemon('Rillaboom', 375642238, 60/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)*/),
        new GymPokemon('Cinderace', 375642238, 60/*, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)*/),
    ],
    'I didn\'t expect there to be such a gap between you and me, mate...',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slumbering Weald Shrine')),
            new QuestLineStartedRequirement('Sword and Shield'),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        imageName: 'Hop',
    }
);
TemporaryBattleList['Sordward 1'] = new TemporaryBattle(
    'Sordward 1',
    [
        new GymPokemon('Sirfetch\'d', 443615594, 60),
        new GymPokemon('Golisopod', 443615594, 60),
        new GymPokemon('Doublade', 443615594, 60),
        new GymPokemon('Bisharp', 457925774, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Hop 8')],
    undefined,
    {
        displayName: 'Pokémon Trainer Sordward',
        imageName: 'Sordward',
    }
);
TemporaryBattleList['Shielbert 1'] = new TemporaryBattle(
    'Shielbert 1',
    [
        new GymPokemon('Sirfetch\'d', 443615594, 60),
        new GymPokemon('Bronzong', 443615594, 60),
        new GymPokemon('Falinks', 443615594, 60),
        new GymPokemon('Klinklang', 457925774, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Hop 8')],
    undefined,
    {
        displayName: 'Pokémon Trainer Shielbert',
        imageName: 'Shielbert',
    }
);
TemporaryBattleList['Rampaging Tsareena'] = new TemporaryBattle(
    'Rampaging Tsareena',
    [new GymPokemon('Tsareena', 1757548771, 60)],
    'The Rampaging Tsareena fainted.',
    [
        new TemporaryBattleRequirement('Sordward 1'),
        new TemporaryBattleRequirement('Shielbert 1'),
    ],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Rampaging Gyarados'] = new TemporaryBattle(
    'Rampaging Gyarados',
    [new GymPokemon('Gyarados', 1757548771, 60)],
    'The Rampaging Gyarados fainted.',
    [new TemporaryBattleRequirement('Rampaging Tsareena')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Rampaging Torkoal'] = new TemporaryBattle(
    'Rampaging Torkoal',
    [new GymPokemon('Torkoal', 1757548771, 60)],
    'The Rampaging Torkoal fainted.',
    [new TemporaryBattleRequirement('Rampaging Gyarados')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Sordward & Shielbert'] = new TemporaryBattle(
    'Sordward & Shielbert',
    [
        new GymPokemon('Golisopod', 99102160, 62),
        new GymPokemon('Bronzong', 99102160, 62),
        new GymPokemon('Doublade', 99102160, 62),
        new GymPokemon('Falinks', 99102160, 62),
        new GymPokemon('Bisharp', 102105255, 62),
        new GymPokemon('Klinklang', 102105255, 62),
    ],
    'Quite the vexing predicament indeed, surely this must be some kind of mistake...',
    [new TemporaryBattleRequirement('Rampaging Torkoal')]
);
TemporaryBattleList['Rampaging Conkeldurr'] = new TemporaryBattle(
    'Rampaging Conkeldurr',
    [new GymPokemon('Conkeldurr', 1917325934, 60)],
    'The Rampaging Conkeldurr fainted.',
    [new TemporaryBattleRequirement('Sordward & Shielbert')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Rampaging Dusknoir'] = new TemporaryBattle(
    'Rampaging Dusknoir',
    [new GymPokemon('Dusknoir', 1917325934, 60)],
    'The Rampaging Dusknoir fainted.',
    [new TemporaryBattleRequirement('Sordward & Shielbert')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Gym Leader Bede'] = new TemporaryBattle(
    'Gym Leader Bede',
    [
        new GymPokemon('Mawile', 594371034, 61),
        new GymPokemon('Gardevoir', 594371034, 61),
        new GymPokemon('Galarian Rapidash', 594371034, 62),
        new GymPokemon('Hatterene', 613544294, 63),
    ],
    'Thank you for the battle. I can now accept you as the Champion. It\'s painful to admit, but I\'ve come to realise a few of my weaknesses. But I\'ll keep getting stronger.',
    [
        new TemporaryBattleRequirement('Rampaging Conkeldurr'),
        new TemporaryBattleRequirement('Rampaging Dusknoir'),
    ]
);
TemporaryBattleList['Rampaging Gigalith'] = new TemporaryBattle(
    'Rampaging Gigalith',
    [new GymPokemon('Gigalith', 1917325934, 60)],
    'The Rampaging Gigalith fainted.',
    [new TemporaryBattleRequirement('Gym Leader Bede')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Rampaging Froslass'] = new TemporaryBattle(
    'Rampaging Froslass',
    [new GymPokemon('Froslass', 1917325934, 60)],
    'The Rampaging Froslass fainted.',
    [new TemporaryBattleRequirement('Gym Leader Bede')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Gym Leader Marnie'] = new TemporaryBattle(
    'Gym Leader Marnie',
    [
        new GymPokemon('Liepard', 476934822, 59),
        new GymPokemon('Toxicroak', 476934822, 59),
        new GymPokemon('Scrafty', 476934822, 59),
        new GymPokemon('Morpeko', 476934822, 60),
        new GymPokemon('Grimmsnarl', 491314766, 60),
    ],
    'Yeah I lost, but I\'m gonna learn from your battle style and everythin\'!',
    [
        new TemporaryBattleRequirement('Rampaging Gigalith'),
        new TemporaryBattleRequirement('Rampaging Froslass'),
    ]
);
TemporaryBattleList['Rampaging Haxorus'] = new TemporaryBattle(
    'Rampaging Haxorus',
    [new GymPokemon('Haxorus', 2077103093, 60)],
    'The Rampaging Haxorus fainted.',
    [new TemporaryBattleRequirement('Gym Leader Marnie')],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Sordward 2'] = new TemporaryBattle(
    'Sordward 2',
    [
        new GymPokemon('Sirfetch\'d', 554746301, 64),
        new GymPokemon('Golisopod', 554746301, 64),
        new GymPokemon('Doublade', 554746301, 64),
        new GymPokemon('Bisharp', 572641343, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Rampaging Haxorus')],
    undefined,
    {
        displayName: 'Pokémon Trainer Sordward',
        imageName: 'Sordward',
    }
);
TemporaryBattleList['Shielbert 2'] = new TemporaryBattle(
    'Shielbert 2',
    [
        new GymPokemon('Sirfetch\'d', 554746301, 64),
        new GymPokemon('Bronzong', 554746301, 64),
        new GymPokemon('Falinks', 554746301, 64),
        new GymPokemon('Klinklang', 572641343, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Rampaging Haxorus')],
    undefined,
    {
        displayName: 'Pokémon Trainer Shielbert',
        imageName: 'Shielbert',
    }
);
TemporaryBattleList['Rampaging Zacian'] = new TemporaryBattle(
    'Rampaging Zacian',
    [new GymPokemon('Zacian (Crowned Sword)', 2357932001, 70)],
    'Zacian fainted.',
    [
        new TemporaryBattleRequirement('Sordward 2'),
        new TemporaryBattleRequirement('Shielbert2'),
    ],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Rampaging Zamazenta'] = new TemporaryBattle(
    'Rampaging Zamazenta',
    [new GymPokemon('Zamazenta (Crowned Shield)', 2357932001, 70)],
    'Zamazenta fainted.',
    [
        new TemporaryBattleRequirement('Sordward 2'),
        new TemporaryBattleRequirement('Shielbert 2'),
    ],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Klara 1'] = new TemporaryBattle(
    'Klara 1',
    [
        new GymPokemon('Venipede', 799982445, 58),
        new GymPokemon('Galarian Slowpoke', 816143704, 60),
    ],
    'Oh, my next Pokémon\'s gonna make short work-- Huh? That was my last one?',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Klara',
        returnTown: 'Armor Station',
        imageName: 'Klara',
    }
);
TemporaryBattleList['Avery 1'] = new TemporaryBattle(
    'Avery 1',
    [
        new GymPokemon('Abra', 799982445, 58),
        new GymPokemon('Galarian Slowpoke', 816143704, 60),
    ],
    'Such strength! I\'m in Psyshock!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Avery',
        returnTown: 'Armor Station',
        imageName: 'Avery',
    }
);
TemporaryBattleList.Mustard = new TemporaryBattle(
    'Mustard',
    [
        new GymPokemon('Mienfoo', 839981565, 60),
        new GymPokemon('Shinx', 856950891, 60),
    ],
    'That was everything I hoped for and more!',
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 33),
            new QuestLineStartedRequirement('The Dojo\'s Armor'),
        ]),
    ],
    undefined,
    {
        displayName: 'Dojo Master Mustard',
    }
);
TemporaryBattleList['Klara 2'] = new TemporaryBattle(
    'Klara 2',
    [
        new GymPokemon('Galarian Slowpoke', 564237041, 62),
        new GymPokemon('Koffing', 564237041, 62),
        new GymPokemon('Whirlipede', 581335135, 63),
    ],
    'Just what have you got that I don\'t?',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Klara',
        imageName: 'Klara',
    }
);
TemporaryBattleList['Avery 2'] = new TemporaryBattle(
    'Avery 2',
    [
        new GymPokemon('Galarian Slowpoke', 564237041, 62),
        new GymPokemon('Woobat', 564237041, 62),
        new GymPokemon('Kadabra', 581335135, 63),
    ],
    'What a Psystrike to my poor pride...',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Avery',
        imageName: 'Avery',
    }
);
TemporaryBattleList['Klara 3'] = new TemporaryBattle(
    'Klara 3',
    [
        new GymPokemon('Skorupi', 452051518, 65),
        new GymPokemon('Galarian Weezing', 452051518, 66),
        new GymPokemon('Whirlipede', 452051518, 66),
        new GymPokemon('Galarian Slowbro', 470316225, 67),
    ],
    'But I didn\'t hold back! I gave it everything I\'ve got...',
    [
        new MultiRequirement([
            new TemporaryBattleRequirement('Klara 2'),
            new TemporaryBattleRequirement('Avery 2'),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Klara',
        returnTown: 'Master Dojo',
        imageName: 'Klara',
    }
);
TemporaryBattleList['Avery 3'] = new TemporaryBattle(
    'Avery 3',
    [
        new GymPokemon('Galarian Ponyta', 452051518, 65),
        new GymPokemon('Swoobat', 452051518, 66),
        new GymPokemon('Kadabra', 452051518, 66),
        new GymPokemon('Galarian Slowbro', 470316225, 67),
    ],
    'Oh, I should just Imprison myself for this!',
    [
        new MultiRequirement([
            new TemporaryBattleRequirement('Klara 2'),
            new TemporaryBattleRequirement('Avery 2'),
        ]),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Avery',
        returnTown: 'Master Dojo',
        imageName: 'Avery',
    }
);

TemporaryBattleList['Zarude Tribe 1'] = new TemporaryBattle(
    'Zarude Tribe 1',
    [
        new GymPokemon('Zarude', 379667456, 79),
        new GymPokemon('Zarude', 379667456, 80),
        new GymPokemon('Zarude', 379667456, 81),
        new GymPokemon('Zarude', 379667456, 81),
        new GymPokemon('Zarude', 379667456, 81),
    ],
    'Za! Za! Zarude!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 3)],
    undefined,
    {
        displayName: 'Zarude Tribe',
        imageName: 'Zarude Tribe',
        hideTrainer: true,
    }
);
TemporaryBattleList['Zarude Tribe 2'] = new TemporaryBattle(
    'Zarude Tribe 2',
    [
        new GymPokemon('Zarude', 327054363, 82),
        new GymPokemon('Zarude', 327054363, 82),
        new GymPokemon('Zarude', 327054363, 83),
        new GymPokemon('Zarude', 327054363, 83),
        new GymPokemon('Zarude', 327054363, 84),
        new GymPokemon('Zarude', 327054363, 85),
    ],
    'Za! Za! Zarude!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 5)],
    undefined,
    {
        displayName: 'Zarude Tribe',
        imageName: 'Zarude Tribe',
        hideTrainer: true,
    }
);
TemporaryBattleList['Zarude Tribe 3'] = new TemporaryBattle(
    'Zarude Tribe 3',
    [
        new GymPokemon('Zarude', 327054363, 85),
        new GymPokemon('Zarude', 327054363, 85),
        new GymPokemon('Zarude', 327054363, 86),
        new GymPokemon('Zarude', 327054363, 86),
        new GymPokemon('Zarude', 327054363, 87),
        new GymPokemon('Zarude', 327054363, 88),
    ],
    'Za! Za! Zarude!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 5)],
    undefined,
    {
        displayName: 'Zarude Tribe',
        imageName: 'Zarude Tribe',
        hideTrainer: true,
    }
);
TemporaryBattleList['Ash Ketchum Galar'] = new TemporaryBattle(
    'Ash Ketchum Galar',
    [
        new GymPokemon('Pikachu (Partner Cap)', 348526193, 58),
        new GymPokemon('Sirfetch\'d', 342447247, 56),
        new GymPokemon('Dragonite', 342447247, 56),
        new GymPokemon('Dracovish', 342447247, 60),
        new GymPokemon('Gigantamax Gengar', 358657768, 62),
        new GymPokemon('Mega Lucario', 368789343, 62),
    ],
    '...I really thought I could beat you this time. Still, it was a really fun battle! Okay, let\'s go to Glimwood Tangle! I\'ll beat you there!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 8)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Master Dojo',
        imageName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Zarude (Dada)'] = new TemporaryBattle(
    'Zarude (Dada)',
    [new GymPokemon('Zarude (Dada)', 2090303973, 90)],
    'Zaru Zaruza. Zarude!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 10)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Flowering Celebi'] = new TemporaryBattle(
    'Flowering Celebi',
    [new GymPokemon('Flowering Celebi', 2132963238, 100)],
    'Cel Cel! Celebi!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 12)],
    [new ObtainedPokemonRequirement(pokemonMap['Flowering Celebi'])],
    {
        isTrainerBattle: false,
        hideTrainer: true,
    }
);
TemporaryBattleList.Peony = new TemporaryBattle(
    'Peony',
    [
        new GymPokemon('Copperajah', 869380472, 70),
        new GymPokemon('Aggron', 877467733, 70),
    ],
    'Gahahaaa! Look at me, takin\' a thrashin\' from a youngster like you!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    undefined,
    {
        displayName: 'Pokémon Trainer Peony',
    }
);
TemporaryBattleList.Calyrex = new TemporaryBattle(
    'Calyrex',
    [new GymPokemon('Calyrex', 1886555626, 80)],
    'Cracrown crow. Roooooowwwn rown crown.',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 0)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList.Glastrier = new TemporaryBattle(
    'Glastrier',
    [new GymPokemon('Glastrier', 2031393560, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 4)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList.Spectrier = new TemporaryBattle(
    'Spectrier',
    [new GymPokemon('Spectrier', 2031393560, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 4)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList['Dyna Tree Birds'] = new TemporaryBattle(
    'Dyna Tree Birds',
    [
        new GymPokemon('Galarian Articuno', 710987746, 70),
        new GymPokemon('Galarian Zapdos', 710987746, 70),
        new GymPokemon('Galarian Moltres', 710987746, 70),
    ],
    'The legendary birds fled to roam the region.',
    [new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 1)],
    undefined,
    {
        hideTrainer: true,
    }
);
TemporaryBattleList.Regigigas = new TemporaryBattle(
    'Regigigas',
    [new GymPokemon('Regigigas', 2031393560, 100)],
    'The ancient giant was defeated!',
    [new QuestLineStepCompletedRequirement('The Ancient Golems', 7)],
    undefined,
    {
        hideTrainer: true,
    }
);
