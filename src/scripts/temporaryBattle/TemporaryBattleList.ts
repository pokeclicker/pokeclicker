const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

//Kanto Temporary Battles
TemporaryBattleList['Blue 1'] = new TemporaryBattle(
    'Blue 1',
    [
        new GymPokemon('Pidgey', 1040, 9),
        new GymPokemon('Charmander', 1678, 9, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Squirtle', 1678, 9, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Bulbasaur', 1678, 9, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Bulbasaur', 1678, 9, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
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
        environment: 'Default',
    }
);
TemporaryBattleList['Blue 2'] = new TemporaryBattle(
    'Blue 2',
    [
        new GymPokemon('Pidgeotto', 3650, 17),
        new GymPokemon('Abra', 3230, 16),
        new GymPokemon('Rattata', 3370, 15),
        new GymPokemon('Charmander', 3791, 18, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Squirtle', 3791, 18, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Bulbasaur', 3791, 18, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Bulbasaur', 3791, 18, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
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
        new GymPokemon('Pidgeotto', 12998, 19),
        new GymPokemon('Raticate', 11902, 16),
        new GymPokemon('Kadabra', 12094, 18),
        new GymPokemon('Charmeleon', 13437, 20, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Wartortle', 13437, 20, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Ivysaur', 13437, 20, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Ivysaur', 13437, 20, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
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
        new GymPokemon('Exeggcute', 28878, 23, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Growlithe', 28878, 23, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Gyarados', 28878, 23, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Gyarados', 28878, 23, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Gyarados', 28878, 22, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Exeggcute', 28878, 22, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Growlithe', 28878, 22, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Growlithe', 28878, 22, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Kadabra', 30398, 20),
        new GymPokemon('Charmeleon', 33438, 25, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Wartortle', 33438, 25, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Ivysaur', 33438, 25, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Ivysaur', 33438, 25, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
    ],
    'What? You stinker! I took it easy on you, too!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower'))],
    undefined,
    {
        displayName: 'Rival Blue',
        imageName: 'Blue2',
    }
);
TemporaryBattleList['Fighting Dojo'] = new TemporaryBattle(
    'Fighting Dojo',
    [
        new GymPokemon('Hitmonlee', 108985, 37),
        new GymPokemon('Hitmonchan', 108985, 37),
    ],
    'That was a great battle. Here, have this Fighting Egg as a reward for conquering the Fighting Dojo!</br>If you put it in the hatchery and you are lucky you can get a rare Pokémon that you might not be able to find anywhere else in Kanto, or unlucky and get a common Pokémon.</br>But if you don\'t get what you need, don\'t worry, you can buy as many eggs as you need in Poké Marts.',
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
                message: 'You were awarded a Fighting Egg for defeating the Fighting Dojo!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        },
        imageName: 'Black Belt',
    }
);
TemporaryBattleList['Snorlax route 12'] = new TemporaryBattle(
    'Snorlax route 12',
    [new GymPokemon('Snorlax', 189990, 30)],
    undefined,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 12),
        new TemporaryBattleRequirement('Blue 4'),
    ],
    [new TemporaryBattleRequirement('Snorlax route 12'), new ObtainedPokemonRequirement('Snorlax')],
    {
        displayName: 'Snorlax',
        returnTown: 'Lavender Town',
        isTrainerBattle: false,
        hideTrainer: true,
        visibleRequirement: new OneFromManyRequirement([new RouteKillRequirement(10, GameConstants.Region.kanto, 11), new RouteKillRequirement(5, GameConstants.Region.kanto, 12)]),
    }
);
TemporaryBattleList['Snorlax route 16'] = new TemporaryBattle(
    'Snorlax route 16',
    [new GymPokemon('Snorlax', 189990, 30)],
    undefined,
    [new TemporaryBattleRequirement('Blue 4')],
    [new TemporaryBattleRequirement('Snorlax route 16'), new ObtainedPokemonRequirement('Snorlax')],
    {
        displayName: 'Snorlax',
        returnTown: 'Celadon City',
        isTrainerBattle: false,
        hideTrainer: true,
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.kanto, 7),
    }
);
TemporaryBattleList['Blue 5'] = new TemporaryBattle(
    'Blue 5',
    [
        new GymPokemon('Pidgeot', 41482, 37),
        new GymPokemon('Exeggcute', 38447, 38, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Growlithe', 38447, 38, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Gyarados', 38447, 38, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Gyarados', 38447, 38, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Gyarados', 38447, 35, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Exeggcute', 38447, 35, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Growlithe', 38447, 35, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Growlithe', 38447, 35, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Alakazam', 41482, 35),
        new GymPokemon('Charizard', 44113, 40, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Blastoise', 44113, 40, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Venusaur', 44113, 40, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Venusaur', 44113, 40, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
    ],
    'I\'m moving on up and ahead! I\'m going to the Pokémon League to boot out the Elite Four! I\'ll become the world\'s most powerful Trainer! Well, good luck to you! Don\'t sweat it! Smell ya!',
    [new QuestLineStepCompletedRequirement('Team Rocket', 1)],
    undefined,
    {
        displayName: 'Rival Blue',
        imageName: 'Blue2',
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
        new GymPokemon('Weezing', 221664, 39),
        new GymPokemon('Muk', 221664, 39),
    ],
    'All right, enough! We\'ll leave like you wanted! We\'ll be happy to see the last of this boring island!',
    [
        new TemporaryBattleRequirement('Biker Goon 1'),
        new TemporaryBattleRequirement('Biker Goon 2'),
        new TemporaryBattleRequirement('Biker Goon 3'),
    ]
);
TemporaryBattleList['Ash Ketchum New Island'] = new TemporaryBattle(
    'Ash Ketchum New Island',
    [
        new GymPokemon('Bulbasaur', 151664, 25),
        new GymPokemon('Squirtle', 151664, 25),
        new GymPokemon('Pikachu', 151664, 30),
    ],
    'I found this Clone Mewtwo left behind. Can you take care of it?',
    [new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('New Island'))],
    undefined,
    {
        displayName: 'Ash Ketchum',
        imageName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Pikachu (Clone)');
        },
    }
);
TemporaryBattleList['Bill\'s Grandpa'] = new TemporaryBattle(
    'Bill\'s Grandpa',
    [
        new GymPokemon('Vaporeon', 170000, 48),
        new GymPokemon('Jolteon', 175000, 49),
        new GymPokemon('Flareon', 180000, 50),
    ],
    'Hahaha, that was one of the best battles I\'ve ever had.',
    [new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 10)],
    undefined,
    {imageName: 'Bill\'s Grandpa with Eevee'}
);
TemporaryBattleList['Blue 6'] = new TemporaryBattle(
    'Blue 6',
    [
        new GymPokemon('Pidgeot', 84840, 47),
        new GymPokemon('Rhyhorn', 82269, 45),
        new GymPokemon('Exeggcute', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Growlithe', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Gyarados', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Gyarados', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Gyarados', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Exeggcute', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Growlithe', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Growlithe', 82269, 45, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Alakazam', 84840, 47),
        new GymPokemon('Charizard', 92553, 53, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Blastoise', 92553, 53, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Venusaur', 92553, 53, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Venusaur', 92553, 53, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
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
        new GymPokemon('Cyndaquil', 176000, 5, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Totodile', 176000, 5, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Chikorita', 176000, 5, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
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
        new GymPokemon('Quilava', 237772, 18, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Croconaw', 237772, 18, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Bayleef', 237772, 18, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
    ],
    '...Humph! Useless Pokémon! Listen, you. You only won because my Pokémon were weak.',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 33)],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Azalea Town',
        imageName: 'Silver',
    }
);
TemporaryBattleList.Sudowoodo = new TemporaryBattle(
    'Sudowoodo',
    [new GymPokemon('Sudowoodo', 540000, 20)],
    undefined,
    [new GymBadgeRequirement(BadgeEnums.Plain)],
    [new TemporaryBattleRequirement('Sudowoodo'), new ObtainedPokemonRequirement('Sudowoodo')],
    {
        isTrainerBattle: false,
        returnTown: 'Goldenrod City',
        hideTrainer: true,
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.johto, 31),
    }
);
TemporaryBattleList['Silver 3'] = new TemporaryBattle(
    'Silver 3',
    [
        new GymPokemon('Gastly', 227997, 20),
        new GymPokemon('Zubat', 227997, 20),
        new GymPokemon('Magnemite', 223344, 18),
        new GymPokemon('Quilava', 251262, 22, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Croconaw', 251262, 22, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Bayleef', 251262, 22, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
    ],
    '...Humph! I\'m not fighting with another weakling ever again. It\'s just too much playing around.',
    [new QuestLineStepCompletedRequirement('The Legendary Beasts', 1)],
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
        new GymPokemon('Quilava', 295109, 34, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Feraligatr', 295109, 32, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Meganium', 295109, 34, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
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
        new GymPokemon('Typhlosion', 397807, 40, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Feraligatr', 397807, 40, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Meganium', 397807, 40, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
    ],
    '.................. I haven\'t given up on becoming the greatest Trainer... I\'m going to find out why I can\'t win and become stronger... When I do, I will challenge you. I\'ll beat you down with all my power. ...Humph! You keep at it until then.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto'))],
    undefined,
    {
        displayName: 'Rival Silver',
        returnTown: 'Victory Road Johto',
        imageName: 'Silver',
    }
);
TemporaryBattleList['Suicune 1'] = new TemporaryBattle(
    'Suicune 1',
    [new GymPokemon('Suicune', 1044000, 40)],
    '<i>Suicune fled.</i>',
    [
        new QuestLineStartedRequirement('Eusine\'s Chase'),
        new RouteKillRequirement(10, GameConstants.Region.johto, 41),
    ],
    undefined,
    {
        displayName: 'Suicune',
        returnTown: 'Cianwood City',
        imageName: '../pokemon/245',
        hideTrainer: true,
    }
);
TemporaryBattleList.Eusine = new TemporaryBattle(
    'Eusine',
    [
        new GymPokemon('Drowzee', 348000, 25),
        new GymPokemon('Haunter', 348000, 25),
        new GymPokemon('Electrode', 359000, 27),
    ],
    'I hate to admit it, but you win. You\'re amazing! I\'m starting to understand why Suicune was keeping an eye on you. I\'m going to keep searching for Suicune. I have a feeling we\'ll see each other again. See you around!',
    [new QuestLineStepCompletedRequirement('Eusine\'s Chase', 1)],
    undefined,
    {
        displayName: 'Eusine',
        returnTown: 'Cianwood City',
    }
);
TemporaryBattleList['Suicune 2'] = new TemporaryBattle(
    'Suicune 2',
    [new GymPokemon('Suicune', 1115500, 40)],
    '<i>Suicune fled.</i>',
    [
        new QuestLineStepCompletedRequirement('Eusine\'s Chase', 2),
        new RouteKillRequirement(10, GameConstants.Region.johto, 42),
    ],
    undefined,
    {
        displayName: 'Suicune',
        returnTown: 'Mahogany Town',
        imageName: '../pokemon/245',
        hideTrainer: true,
    }
);
TemporaryBattleList['Red Gyarados'] = new TemporaryBattle(
    'Red Gyarados',
    [new GymPokemon('Gyarados', 1100000, 30, undefined, true)],
    undefined,
    [
        new QuestLineStartedRequirement('Team Rocket Again'),
        new RouteKillRequirement(10, GameConstants.Region.johto, 43),
    ],
    undefined,
    {
        displayName: 'Red Gyarados',
        returnTown: 'Mahogany Town',
        isTrainerBattle: false,
        hideTrainer: true,
        visibleRequirement: new QuestLineStartedRequirement('Team Rocket Again'),
    }
);
TemporaryBattleList['Suicune 3'] = new TemporaryBattle(
    'Suicune 3',
    [new GymPokemon('Suicune', 3269100, 40)],
    '<i>Suicune fled.</i>',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 4)],
    undefined,
    {
        displayName: 'Suicune',
        returnTown: 'Vermilion City',
        imageName: '../pokemon/245',
        hideTrainer: true,
        visibleRequirement: new QuestLineStepCompletedRequirement('Eusine\'s Chase', 4),
    }
);
TemporaryBattleList['Suicune 4'] = new TemporaryBattle(
    'Suicune 4',
    [new GymPokemon('Suicune', 3359100, 40)],
    '<i>Suicune fled.</i>',
    [
        new QuestLineStepCompletedRequirement('Eusine\'s Chase', 6),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 14),
    ],
    undefined,
    {
        displayName: 'Suicune',
        returnTown: 'Fuchsia City',
        imageName: '../pokemon/245',
        hideTrainer: true,
    }
);
TemporaryBattleList['Suicune 5'] = new TemporaryBattle(
    'Suicune 5',
    [new GymPokemon('Suicune', 3449100, 40)],
    '<i>Suicune didn\'t flee.</i>',
    [new QuestLineStepCompletedRequirement('Eusine\'s Chase', 8)],
    undefined,
    {
        displayName: 'Suicune',
        returnTown: 'Bill\'s House',
        imageName: '../pokemon/245',
        hideTrainer: true,
    }
);
TemporaryBattleList['Suicune 6'] = new TemporaryBattle(
    'Suicune 6',
    [new GymPokemon('Suicune', 3449100, 40)],
    '',
    [new QuestLineStepCompletedRequirement('Eusine\'s Chase', 10)],
    [new QuestLineStepCompletedRequirement('Eusine\'s Chase', 11)],
    {
        displayName: 'Suicune',
        returnTown: 'Bill\'s House',
        imageName: '../pokemon/245',
        hideTrainer: true,
        isTrainerBattle: false,
    }
);
TemporaryBattleList['Kimono Girls'] = new TemporaryBattle(
    'Kimono Girls',
    [
        new GymPokemon('Umbreon', 660000, 42),
        new GymPokemon('Espeon', 660000, 43),
        new GymPokemon('Flareon', 660000, 46),
        new GymPokemon('Jolteon', 660000, 40),
        new GymPokemon('Vaporeon', 660000, 40),
    ],
    'You have beautifully proven that the bond between people can be extended to the bond between people and Pokémon. We all appreciate that you have lived up to our expectations. This Clear Bell will signal to Ho-Oh that you are worthy of its attentions.',
    [new QuestLineStepCompletedRequirement('Rainbow Guardian', 0)],
    undefined,
    {
        imageName: 'Kimono Girl',
    }
);
TemporaryBattleList['Spiky-eared Pichu'] = new TemporaryBattle(
    'Spiky-eared Pichu',
    [new GymPokemon('Spiky-eared Pichu', 3178500, 20)],
    '<b><i>You caught the Spiky-eared Pichu!</i></b>',
    [new QuestLineStepCompletedRequirement('Unfinished Business', 6)],
    undefined,
    {
        displayName: 'Strange Pichu',
        hideTrainer: true,
        imageName: '../pokemon/172.01',
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
        new GymPokemon('Typhlosion', 581846, 50, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Feraligatr', 581846, 50, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Meganium', 581846, 50, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
    ],
    'My training\'s still not good enough...? My Pokémon are so weak, it makes me frustrated... But I can feel that they are getting better after each battle.................. Tch! They\'re still too weak! I need to give them more training...',
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
        new GymPokemon('Typhlosion', 705124, 60, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Grass)),
        new GymPokemon('Feraligatr', 705124, 60, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Fire)),
        new GymPokemon('Meganium', 705124, 60, new StarterRequirement(GameConstants.Region.johto, GameConstants.Starter.Water)),
    ],
    '...Oh, no... I still can\'t win after all that training... I...I have to believe more in my Pokémon... ...No big deal. Sorry to have got in the way. Don\'t forget to rest your Pokémon before you challenge the Champion again!',
    [new TemporaryBattleRequirement('Silver 6')],
    [new NullRequirement],
    {
        displayName: 'Rival Silver',
        imageName: 'Silver',
        rewardFunction: () =>
            Notifier.notify({message: 'Congratulations on beating Silver at his best! Come back to fight him again at any time.'}),
    }
);

TemporaryBattleList.Red = new TemporaryBattle(
    'Red',
    [
        new GymPokemon('Pikachu', 643820, 81),
        new GymPokemon('Espeon', 663626, 73),
        new GymPokemon('Snorlax', 679472, 75),
        new GymPokemon('Venusaur', 679472, 77),
        new GymPokemon('Charizard', 679472, 77),
        new GymPokemon('Blastoise', 803240, 77),
    ],
    '...',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Silver'))],
    [new NullRequirement],
    {
        rewardFunction: () => {
            BagHandler.gainItem({type: ItemType.item, id: 'Light_Ball'}, 1);
            Notifier.notify({
                message: 'You were awarded a Light Ball for defeating Red.',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dropped_item,
            });
        },
    }
);

TemporaryBattleList['Youngster Joey'] = new TemporaryBattle(
    'Youngster Joey',
    [new GymPokemon('Rattata', 548919101828, 100)],
    'How?!? My Rattata is in the top percentage of all Rattata!',
    [new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion), new SpecialEventRequirement('Hoopa Day')])],
    undefined,
    {
        displayName: 'Youngster Joey',
        returnTown: 'Cherrygrove City',
        imageName: 'Youngster',
        rewardFunction: () => {
            const reward = 64;
            App.game.wallet.gainMoney(reward, true);
            Notifier.notify({
                message: TextMerger.mergeText(`Youngster Joey was defeated!
$playername$ got <img src="./assets/images/currency/money.svg" height="24px"/> ${reward.toLocaleString('en-US')} for winning!`),
                type: NotificationConstants.NotificationOption.danger,
                timeout: 3.6e7,
                title: 'You defeated Youngster Joey!',
            });
        },
    }
);

//Hoenn Temporary Battles
TemporaryBattleList['May 1'] = new TemporaryBattle(
    'May 1',
    [
        new GymPokemon('Torchic', 823400, 5, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Mudkip', 823400, 5, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Treecko', 823400, 5, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
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
        new GymPokemon('Lotad', 1124608, 13, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Torkoal', 1124608, 13, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Wingull', 1124608, 13, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Torchic', 1197952, 15, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Mudkip', 1197952, 15, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Treecko', 1197952, 15, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
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
        new GymPokemon('Wingull', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Lombre', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Wingull', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Lombre', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Slugma', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Slugma', 1119525, 18, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Combusken', 1153450, 20, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Marshtomp', 1153450, 20, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Grovyle', 1153450, 20, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
    ],
    'Yikes! You\'re better than I expected!',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Slateport City',
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
        returnTown: 'Mauville City',
        imageName: 'Wally',
    }
);
TemporaryBattleList['May 4'] = new TemporaryBattle(
    'May 4',
    [
        new GymPokemon('Pelipper', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Lombre', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Slugma', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Lombre', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Slugma', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Lombre', 1832160, 29, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Combusken', 1887680, 31, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Marshtomp', 1887680, 31, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Grovyle', 1887680, 31, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
    ],
    'Achah! You\'re strong! I was worried that you might be struggling with your training.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Weather Institute',
        imageName: 'May',
    }
);
TemporaryBattleList['Kecleon 1'] = new TemporaryBattle(
    'Kecleon 1',
    [new GymPokemon('Kecleon', 6000000, 20)],
    undefined,
    [new TemporaryBattleRequirement('May 4')],
    [new TemporaryBattleRequirement('Kecleon 1'), new ObtainedPokemonRequirement('Kecleon')],
    {
        isTrainerBattle: false,
        returnTown: 'Fortree City',
        hideTrainer: true,
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.hoenn, 119),
    }
);
TemporaryBattleList['Kecleon 2'] = new TemporaryBattle(
    'Kecleon 2',
    [new GymPokemon('Kecleon', 7000000, 20)],
    undefined,
    [new TemporaryBattleRequirement('Kecleon 1')],
    [new TemporaryBattleRequirement('Kecleon 2')],
    {
        isTrainerBattle: false,
        returnTown: 'Fortree City',
        hideTrainer: true,
    }
);
TemporaryBattleList['Kecleon 3'] = new TemporaryBattle(
    'Kecleon 3',
    [new GymPokemon('Kecleon', 7000000, 20)],
    undefined,
    [new TemporaryBattleRequirement('Kecleon 2')],
    [new TemporaryBattleRequirement('Kecleon 3')],
    {
        isTrainerBattle: false,
        returnTown: 'Fortree City',
        hideTrainer: true,
    }
);
TemporaryBattleList['May 5'] = new TemporaryBattle(
    'May 5',
    [
        new GymPokemon('Tropius', 1932600, 31),
        new GymPokemon('Pelipper', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Ludicolo', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Slugma', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Ludicolo', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Slugma', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Pelipper', 2013125, 32, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
        new GymPokemon('Combusken', 2133912, 34, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Grass)),
        new GymPokemon('Marshtomp', 2133912, 34, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Fire)),
        new GymPokemon('Grovyle', 2133912, 34, new StarterRequirement(GameConstants.Region.hoenn, GameConstants.Starter.Water)),
    ],
    'I remember the battle I had with you on Route 103. That battle helped you become this strong, didn\'t it?',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)],
    undefined,
    {
        displayName: 'Pokémon Trainer May',
        returnTown: 'Lilycove City',
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
    [new NullRequirement],
    {
        displayName: 'Pokémon Trainer Wally',
        imageName: 'Wally',
        rewardFunction: () =>
            Notifier.notify({message: 'Congratulations on beating Wally at his best! Come back to fight him again at any time.'}),
    }
);
TemporaryBattleList['Clown Jessie & James'] = new TemporaryBattle(
    'Clown Jessie & James',
    [
        new GymPokemon('Victreebel', 3006000, 40),
        new GymPokemon('Weezing', 3006000, 50),
        new GymPokemon('Seviper', 3006000, 50),
        new GymPokemon('Dustox', 3006000, 50),
        new GymPokemon('Meowth', 2000, 5),
    ],
    'We\'re blasting off again!!!!',
    [new QuestLineStepCompletedRequirement('Wish Maker', 0)],
    undefined,
    {
        displayName: 'Jessie & James',
    }
);
TemporaryBattleList['Butler 1'] = new TemporaryBattle(
    'Butler 1',
    [
        new GymPokemon('Kirlia', 3066000, 50),
        new GymPokemon('Mightyena', 3066000, 50),
        new GymPokemon('Dusclops', 3066000, 50),
    ],
    '<i>Butler managed to load Jirachi into a cage and escaped in his van. He is headed for the Jagged Pass!</i>',
    [new QuestLineStepCompletedRequirement('Wish Maker', 5)],
    undefined,
    {
        displayName: 'Butler',
        imageName: 'Butler',
    }
);
TemporaryBattleList['Butler 2'] = new TemporaryBattle(
    'Butler 2',
    [
        new GymPokemon('Kirlia', 3066000, 50),
        new GymPokemon('Mightyena', 3066000, 50),
        new GymPokemon('Dusclops', 3066000, 50),
        new GymPokemon('Salamence', 4166000, 80),
    ],
    '<i>Butler throws the switch on a machine, causing the earth to quake. A huge, ominous shape begins to rise from the ground!</i>',
    [new QuestLineStepCompletedRequirement('Wish Maker', 6)],
    undefined,
    {
        displayName: 'Butler',
        imageName: 'Butler',
    }
);
TemporaryBattleList['Meta Groudon'] = new TemporaryBattle(
    'Meta Groudon',
    [new GymPokemon('Meta Groudon', 13800000, 100)],
    '<i>Meta Groudon lets out a guttural roar and melts back into the earth!</i>',
    [new QuestLineStepCompletedRequirement('Wish Maker', 7)],
    undefined,
    {
        displayName: 'Meta Groudon',
        returnTown: 'Lavaridge Town',
        imageName: '../pokemon/383.02',
        hideTrainer: true,
    }
);
TemporaryBattleList.Latias = new TemporaryBattle(
    'Latias',
    [new GymPokemon('Latias', 13800000, 100)],
    '<i>Latias joins your party, and Latios flies away back to the mainland.</i>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 3), new CustomRequirement(ko.pureComputed(() => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Latios')]()), 1, undefined, GameConstants.AchievementOption.less)])],
    undefined,
    {
        displayName: 'Latias',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Latias');
        },
        returnTown: 'Southern Island',
        imageName: '../pokemon/380',
        hideTrainer: true,
    }
);
TemporaryBattleList.Latios = new TemporaryBattle(
    'Latios',
    [new GymPokemon('Latios', 13800000, 100)],
    '<i>Latios joins your party, and Latias flies away back to the mainland.</i>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 3), new CustomRequirement(ko.pureComputed(() => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Latias')]()), 1, undefined, GameConstants.AchievementOption.less)])],
    undefined,
    {
        displayName: 'Latios',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Latios');
        },
        returnTown: 'Southern Island',
        imageName: '../pokemon/381',
        hideTrainer: true,
    }
);
TemporaryBattleList.Willie = new TemporaryBattle(
    'Willie',
    [
        new GymPokemon('Zigzagoon', 6900000, 24),
        new GymPokemon('Zigzagoon', 6900000, 24),
    ],
    'Whew! With skills like that, y\'all should head to Phenac City.',
    [new QuestLineStepCompletedRequirement('Shadows in the Desert', 0)],
    undefined,
    {
        displayName: 'Willie',
        imageName: 'Willie',
    }
);
TemporaryBattleList.Folly = new TemporaryBattle(
    'Folly',
    [
        new GymPokemon('Whismur', 6950000, 25),
        new GymPokemon('Whismur', 6950000, 25),
    ],
    '<i>The shady guy flees, dropping a mysterious sack. The sack.... cries out in pain?</i>',
    [new QuestLineStepCompletedRequirement('Shadows in the Desert', 1)],
    undefined,
    {
        displayName: 'Shady Guy',
        imageName: 'Miror B. Peon (folly)',
    }
);
TemporaryBattleList['Cipher Peon Doven'] = new TemporaryBattle(
    'Cipher Peon Doven',
    [
        new GymPokemon('Spheal', 7300000, 33),
        new GymPokemon('Carvanha', 7300000, 34),
    ],
    'Rats! Foiled by some nobody!',
    [new QuestLineStepCompletedRequirement('Shadows in the Desert', 14)],
    undefined,
    {
        displayName: 'Cipher Peon Doven',
        imageName: 'Cipher Peon (female)',
    }
);
TemporaryBattleList['Cipher Peon Silton'] = new TemporaryBattle(
    'Cipher Peon Silton',
    [
        new GymPokemon('Shroomish', 7300000, 34),
        new GymPokemon('Cacnea', 7300000, 34),
    ],
    'Man! I was really having fun doing these crimes.',
    [new QuestLineStepCompletedRequirement('Shadows in the Desert', 14)],
    undefined,
    {
        displayName: 'Cipher Peon Silton',
        imageName: 'Cipher Peon (male)',
    }
);
TemporaryBattleList['Cipher Peon Kass'] = new TemporaryBattle(
    'Cipher Peon Kass',
    [
        new GymPokemon('Baltoy', 4900000, 35),
        new GymPokemon('Ralts', 4900000, 35),
        new GymPokemon('Kirlia', 4900000, 35),
    ],
    'Run away!',
    [new QuestLineStepCompletedRequirement('Shadows in the Desert', 14)],
    undefined,
    {
        displayName: 'Cipher Peon Kass',
        imageName: 'Cipher Peon (female)',
    }
);
TemporaryBattleList['Cipher Peon Naps'] = new TemporaryBattle(
    'Cipher Peon Naps',
    [new GymPokemon('Teddiursa', 110813753, 11, undefined, undefined, GameConstants.ShadowStatus.Shadow)], // Slightly weaker than Calem 1
    'What was that? My Shadow Pokémon! It doesn\'t matter though, my teammates escaped with Professor Krane!',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 0)],
    undefined,
    {
        displayName: 'Cipher Peon Naps',
        imageName: 'Cipher Peon (yellow)',
    }
);
TemporaryBattleList['Chobin 1'] = new TemporaryBattle(
    'Chobin 1',
    [
        new GymPokemon('Sunkern', 57406876, 6),
        new GymPokemon('Magikarp', 57406876, 6),
    ],
    'Huh? Closer observation reveals that the subject is a trainer. Ergo, the subject is not a burglar! Ahaha! Chobin wishes you spoke up right away. You\'re $playername$? Chobin apologizes for jumping to the wrong conclusion.',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 2)],
    undefined,
    {
        displayName: 'Chobin',
        imageName: 'Chobin',
    }
);
TemporaryBattleList['Miror B. 1'] = new TemporaryBattle(
    'Miror B. 1',
    [
        new GymPokemon('Lombre', 34444125, 17),
        new GymPokemon('Lombre', 34444125, 17),
        new GymPokemon('Lombre', 34444125, 17),
        new GymPokemon('Voltorb', 34444125, 19, undefined, undefined, GameConstants.ShadowStatus.Shadow),
    ],
    'You messed up my rhythm! I just can\'t, no, I just can\'t do it! Shouldn\'t you be paying more attention to what\'s happening in the Pyrite Buiding than to me?',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 9)],
    undefined,
    {
        displayName: 'Miror B.',
        imageName: 'Cipher Admin Miror B',
        firstTimeRewardFunction: () => {
            BagHandler.gainItem({type: ItemType.item, id: 'Magnet'}, 1);
            Notifier.notify({
                message: 'You snagged a Magnet from Miror B\'s Voltorb!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        },
    }
);
TemporaryBattleList['Chobin 2'] = new TemporaryBattle(
    'Chobin 2',
    [
        new GymPokemon('Sunflora', 48221775, 26),
        new GymPokemon('Gyarados', 48221775, 26),
        new GymPokemon('Hoppip', 48221775, 26),
        new GymPokemon('Tropius', 48221775, 26),
    ],
    'Huh? Oh, you\'re that trainer from before?! Chobin wishes you spoke up right away.',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 17)],
    undefined,
    {
        displayName: 'Chobin',
        imageName: 'Robo Groudon',
    }
);
TemporaryBattleList['Cipher Peon Smarton'] = new TemporaryBattle(
    'Cipher Peon Smarton',
    [
        new GymPokemon('Huntail', 49221775, 27),
        new GymPokemon('Cacnea', 49221775, 27),
        new GymPokemon('Teddiursa', 49221775, 27),
        new GymPokemon('Koffing', 49221775, 27),
    ],
    'You\'re too late! We already took everything we needed!',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 19)],
    undefined,
    {
        displayName: 'Cipher Peon Smarton',
        imageName: 'Cipher Peon (yellow)',
    }
);
TemporaryBattleList.Zook = new TemporaryBattle(
    'Zook',
    [
        new GymPokemon('Zangoose', 35797654, 28, undefined, undefined, GameConstants.ShadowStatus.Shadow),
        new GymPokemon('Doduo', 35797654, 26),
        new GymPokemon('Carvanha', 35797654, 26),
        new GymPokemon('Seviper', 35797654, 26),
        new GymPokemon('Relicanth', 35797654, 26),
    ],
    'Yeah, whatever! I was leaving anyways.',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 21)],
    undefined,
    {
        displayName: 'Zook',
        imageName: 'Thug',
    }
);
TemporaryBattleList['Miror B. 2'] = new TemporaryBattle(
    'Miror B. 2',
    [
        new GymPokemon('Lombre', 38797654, 26),
        new GymPokemon('Lombre', 38797654, 26),
        new GymPokemon('Lombre', 38797654, 26),
        new GymPokemon('Nosepass', 38797654, 25, undefined, undefined, GameConstants.ShadowStatus.Shadow),
        new GymPokemon('Ludicolo', 38797654, 26),
    ],
    'I shouldn\'t have done something this strenuous right after eating… I\'ll need to get some new Shadow Pokémon from Team Snagem.',
    [new QuestLineStepCompletedRequirement('Gale of Darkness', 22)],
    undefined,
    {
        displayName: 'Miror B.',
        imageName: 'Cipher Admin Miror B',
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
        imageName: 'Rocket Executive (ariana)',
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
        imageName: 'Rocket Executive (archer)',
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
    [new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 4)],
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
    'So you\'re not with them? Okay... Just don\'t help those criminals in the future, got it? Looks like some new Pinkan Pokémon have made their way to the island, if you bring us some Pinkan Berries we\'ll trade you for them.',
    [new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 5)],
    undefined,
    {
        displayName: 'Officer Jenny',
    }
);

//Sinnoh Temporary Battles
TemporaryBattleList['Barry 1'] = new TemporaryBattle(
    'Barry 1',
    [
        new GymPokemon('Chimchar', 1689240, 5, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Piplup', 1689240, 5, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Turtwig', 1689240, 5, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
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
        new GymPokemon('Chimchar', 3074416, 9, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Piplup', 3074416, 9, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Turtwig', 3074416, 9, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
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
        new GymPokemon('Buizel', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Ponyta', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Buizel', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Roselia', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Roselia', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Ponyta', 2195053, 23, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Monferno', 2329444, 27, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Prinplup', 2329444, 27, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Grotle', 2329444, 27, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
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
        new GymPokemon('Buizel', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Ponyta', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Buizel', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Roselia', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Roselia', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Ponyta', 2440886, 32, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Monferno', 2590328, 36, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Prinplup', 2590328, 36, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Grotle', 2590328, 36, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
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
    [new QuestLineStepCompletedRequirement('A New World', 2)],
    undefined,
    {imageName: 'Galactic Boss (cyrus)'}
);
TemporaryBattleList['Barry 5'] = new TemporaryBattle(
    'Barry 5',
    [
        new GymPokemon('Staraptor', 2104080, 36),
        new GymPokemon('Heracross', 2104080, 37),
        new GymPokemon('Floatzel', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Rapidash', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Floatzel', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Roserade', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Roserade', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Rapidash', 2051478, 35, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Infernape', 2209284, 38, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Empoleon', 2209284, 38, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Torterra', 2209284, 38, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
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
        new GymPokemon('Floatzel', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Rapidash', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Rapidash', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Snorlax', 3857834, 49, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Snorlax', 3857834, 49, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Floatzel', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Heracross', 3857834, 48),
        new GymPokemon('Roserade', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Roserade', 3740930, 47, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Snorlax', 3857834, 49, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Infernape', 4161784, 51, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Empoleon', 4161784, 51, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Torterra', 4161784, 51, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
    ],
    'I guess I\'m not ready for the Pokémon League if I\'m losing to you! Darn it! You watch, though! I\'ll get tougher and win my way through the Pokémon League! Because I\'m going to become the Champion, the toughest Trainer! You\'d better not lose to anyone before me!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Barry',
        returnTown: 'Victory Road Sinnoh',
        imageName: 'Barry',
    }
);
TemporaryBattleList['Barry 7'] = new TemporaryBattle(
    'Barry 7',
    [
        new GymPokemon('Staraptor', 9727091, 81),
        new GymPokemon('Floatzel', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Roserade', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Rapidash', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Roserade', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Rapidash', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Floatzel', 9212128, 79, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
        new GymPokemon('Heracross', 9498219, 81),
        new GymPokemon('Snorlax', 9498219, 83),
        new GymPokemon('Infernape', 10184837, 85, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Grass)),
        new GymPokemon('Empoleon', 10184837, 85, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Fire)),
        new GymPokemon('Torterra', 10184837, 85, new StarterRequirement(GameConstants.Region.sinnoh, GameConstants.Starter.Water)),
    ],
    '...! It\'s all right, though. Keep getting tougher. The more you do, the tougher my Pokémon and I get, too. There\'s no end to Pokémon. That\'s what I\'m saying!',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225),
    ],
    [new NullRequirement],
    {
        displayName: 'Pokémon Trainer Barry',
        imageName: 'Barry',
        rewardFunction: () =>
            Notifier.notify({message: 'Congratulations on beating Barry at his best! Come back to fight him again at any time.'}),
    }
);

TemporaryBattleList['Manaphy Go-Rock MGrunt 1'] = new TemporaryBattle(
    'Manaphy Go-Rock MGrunt 1',
    [
        new GymPokemon('Graveler', 2920000, 22),
        new GymPokemon('Graveler', 2920000, 22),
        new GymPokemon('Graveler', 2920000, 22),
    ],
    'Your teamwork is too good!',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 2)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (male)',
    }
);

TemporaryBattleList['Manaphy Go-Rock FGrunt 1'] = new TemporaryBattle(
    'Manaphy Go-Rock FGrunt 1',
    [
        new GymPokemon('Rattata', 2200000, 22),
        new GymPokemon('Rattata', 2200000, 22),
        new GymPokemon('Rattata', 2200000, 22),
        new GymPokemon('Rattata', 2200000, 22),
    ],
    'Your battling skills are solid...',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 4)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (female)',
    }
);

TemporaryBattleList['Manaphy Go-Rock MGrunt 2'] = new TemporaryBattle(
    'Manaphy Go-Rock MGrunt 2',
    [
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Zubat', 2200000, 22),
    ],
    'Darn it! You better remember this!',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 5)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (male)',
    }
);

TemporaryBattleList['Manaphy Go-Rock MGrunt 3'] = new TemporaryBattle(
    'Manaphy Go-Rock MGrunt 3',
    [
        new GymPokemon('Rattata', 2200000, 22),
        new GymPokemon('Rattata', 2200000, 22),
        new GymPokemon('Meowth', 4400000, 22),
    ],
    'The Go-Rock Squad\'s future looks bleak...',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 5)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (male)',
    }
);

TemporaryBattleList['Manaphy Go-Rock FGrunt 2'] = new TemporaryBattle(
    'Manaphy Go-Rock FGrunt 2',
    [new GymPokemon('Scyther', 8800000, 22)],
    'Bleh to you!',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 5)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (female)',
    }
);

TemporaryBattleList['Manaphy Go-Rock MGrunt 4'] = new TemporaryBattle(
    'Manaphy Go-Rock MGrunt 4',
    [
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Zubat', 2200000, 22),
        new GymPokemon('Politoed', 2800000, 22),
    ],
    'Darn it! You better remember this! ...Wait, didn\'t I already say that...?',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 8)],
    undefined,
    {
        displayName: 'Go-Rock Squad Grunt',
        imageName: 'Go-Rock Squad Grunt (male)',
    }
);

TemporaryBattleList['Manaphy Go-Rock Commander'] = new TemporaryBattle(
    'Manaphy Go-Rock Commander',
    [
        new GymPokemon('Scyther', 3200000, 25),
        new GymPokemon('Scyther', 3200000, 25),
        new GymPokemon('Venusaur', 3500000, 30),
    ],
    'Owowow! Okay, okay, I got it! You can have your stupid egg!',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 9)],
    undefined,
    {
        displayName: 'Go-Rock Squad Commander',
        imageName: 'Go-Rock Squad Commander',
    }
);

TemporaryBattleList['Manaphy Go-Rock Pincher'] = new TemporaryBattle(
    'Manaphy Go-Rock Pincher',
    [
        new GymPokemon('Poochyena', 5500000, 40),
        new GymPokemon('Carvanha', 5500000, 40),
    ],
    'Argh! With that Manaphy Egg, I thought even an ex-Go-Rock like me could live out the rest of my life in ease! That Happiny took the egg to the south-east, across the water. I wanted to pursue it, but Carvanha are not... comfortable to ride on.',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 21)],
    undefined,
    {
        displayName: 'Go-Rock Pokémon Pincher',
        imageName: 'Go-Rock Squad Grunt (male)',
    }
);

TemporaryBattleList['Manaphy Egg Protectors'] = new TemporaryBattle(
    'Manaphy Egg Protectors',
    [
        new GymPokemon('Glameow', 3500000, 40),
        new GymPokemon('Pichu', 3600000, 40),
        new GymPokemon('Happiny', 5000000, 45),
    ],
    '<i>As you step over the defeated Pokémon, the Manaphy egg glows... and hatches!</i>',
    [new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 24)],
    undefined,
    {
        displayName: 'Manaphy Egg Protectors',
        imageName: 'specialNPCs/Manaphy Egg',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Manaphy');
        },
    }
);

TemporaryBattleList.Zero = new TemporaryBattle(
    'Zero',
    [
        new GymPokemon('Magnemite', 10120000, 70),
        new GymPokemon('Magneton', 10870000, 72),
        new GymPokemon('Magnezone', 11420000, 75),
    ],
    'Argh! I can\'t believe I lost to someone like you! You can keep the key for now, but I\'ll get my revenge one day.',
    [new QuestLineStepCompletedRequirement('Zero\'s Ambition', 12)]
);

//Unova Temporary Battles
TemporaryBattleList['Hugh 1'] = new TemporaryBattle(
    'Hugh 1',
    [
        new GymPokemon('Tepig', 7269010, 5, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Oshawott', 7269010, 5, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Snivy', 7269010, 5, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
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
        new GymPokemon('Tepig', 11630416, 8, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Oshawott', 11630416, 8, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Snivy', 11630416, 8, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
    ],
    'It can\'t be! How could I have lost? I need to apologize to my partner...',
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 20),
        new TemporaryBattleRequirement('Hugh 1'),
    ],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Floccesy Town',
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
        returnTown: 'Castelia City',
        imageName: 'Team Plasma (colress)',
    }
);
TemporaryBattleList['Team Plasma Grunt 2'] = new TemporaryBattle(
    'Team Plasma Grunt 2',
    [new GymPokemon('Trubbish', 35896600, 27)],
    'Don\'t let it go to your head... But you put up a good fight, kid!',
    [
        new GymBadgeRequirement(BadgeEnums.Bolt),
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 3),
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 3),
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
        new GymPokemon('Pignite', 13864044, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Dewott', 13864044, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Servine', 13864044, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
        new GymPokemon('Simipour', 13456278, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Simisage', 13456278, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Tranquill', 13456278, 25),
        new GymPokemon('Simisear', 13456278, 25, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
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
        imageName: 'Cheren',
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
        returnTown: 'Driftveil City',
        imageName: 'Team Plasma (colress)',
    }
);
TemporaryBattleList['Team Plasma Grunt 4'] = new TemporaryBattle(
    'Team Plasma Grunt 4',
    [new GymPokemon('Koffing', 39496600, 30)],
    'You! So you\'re a Trainer who fights while believing in your Pokémon, are you?',
    [new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 5)],
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
    [new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 5)],
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
    [new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 5)],
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
    [new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 5)],
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
        new GymPokemon('Simipour', 16756278, 39, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Simisage', 16756278, 39, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Simisear', 16756278, 39, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
        new GymPokemon('Emboar', 17264044, 41, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Samurott', 17264044, 41, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Serperior', 17264044, 41, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 8),
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
        imageName: 'Team Plasma (zinzolin)',
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
    'Have you gotten even stronger than you were in Lacunosa Town? How, in such a brief amount of time...',
    [
        new TemporaryBattleRequirement('Team Plasma Grunt 7'),
        new TemporaryBattleRequirement('Team Plasma Grunt 8'),
        new TemporaryBattleRequirement('Team Plasma Grunt 9'),
    ],
    undefined,
    {
        displayName: 'Zinzolin',
        imageName: 'Team Plasma (zinzolin)',
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 17),
    ],
    undefined,
    {
        displayName: 'Colress',
        imageName: 'Team Plasma (colress)',
    }
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 20),
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
        new GymPokemon('Simipour', 23086313, 55, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Simisage', 23086313, 55, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Simisear', 23086313, 55, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
        new GymPokemon('Bouffalant', 23557462, 55),
        new GymPokemon('Emboar', 24217071, 57, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Samurott', 24217071, 57, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Serperior', 24217071, 57, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
    ],
    '...Phew! You\'re really something! Thanks to you, I accomplished what I set out to do during my journey! I think you\'re really amazing! So become the Champion! Get the proof that you\'re a Trainer your Pokémon can be proud of! See you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Hugh',
        returnTown: 'Victory Road Unova',
        imageName: 'Hugh',
    }
);
TemporaryBattleList['Hugh 6'] = new TemporaryBattle(
    'Hugh 6',
    [
        new GymPokemon('Unfezant', 31270484, 62),
        new GymPokemon('Simipour', 30507789, 62, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Simisage', 30507789, 62, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Simisear', 30507789, 62, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
        new GymPokemon('Bouffalant', 31270484, 62),
        new GymPokemon('Flygon', 30507789, 62),
        new GymPokemon('Eelektross', 30507789, 62),
        new GymPokemon('Emboar', 32605200, 64, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Samurott', 32605200, 64, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Serperior', 32605200, 64, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
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
        new GymPokemon('Simipour', 34936339, 65, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Simisage', 34936339, 65, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Simisear', 34936339, 65, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
        new GymPokemon('Bouffalant', 35809748, 65),
        new GymPokemon('Flygon', 34936339, 65),
        new GymPokemon('Eelektross', 34936339, 65),
        new GymPokemon('Emboar', 37338212, 67, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Grass)),
        new GymPokemon('Samurott', 37338212, 67, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Fire)),
        new GymPokemon('Serperior', 37338212, 67, new StarterRequirement(GameConstants.Region.unova, GameConstants.Starter.Water)),
    ],
    'Just as I\'d expected! You are really drawing forth your Pokémon\'s power!... I suppose that\'s it. If winning in battles is strength, then believing that your Pokémon will come back and waiting for its return is also strength. Doing what you think is right no matter what anyone else says, like these guys do, is strength, too.',
    [new TemporaryBattleRequirement('Hugh 6')],
    [new NullRequirement],
    {
        displayName: 'Pokémon Trainer Hugh',
        imageName: 'Hugh',
        rewardFunction: () =>
            Notifier.notify({message: 'Congratulations on beating Hugh at his best! Come back to fight him again at any time.'}),
    }
);
TemporaryBattleList.DreamResearcher = new TemporaryBattle(
    'Dream Researcher',
    [new GymPokemon('Mega Audino', 125000000, 32)],
    'Wow! You have proven that you have total power over the realm of dreams! The location of this Audinite was revealed to me in a dream, you deserve to have it!</br><img src="assets/images/megaStone/Audinite.png"/>',
    [new ObtainedPokemonRequirement('Landorus (Therian)'), new ObtainedPokemonRequirement('Audino')],
    undefined,
    {
        imageName: 'Scientist (female)',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Audinite),
    }
);

//Kalos Temporary Battles
TemporaryBattleList['Shauna 1'] = new TemporaryBattle(
    'Shauna 1',
    [
        new GymPokemon('Froakie', 24906504, 5, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Chespin', 24906504, 5, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Fennekin', 24906504, 5, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
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
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('A Beautiful World').beginQuest(0, undefined, true);
        },
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
TemporaryBattleList['Team Flare Grunt 1'] = new TemporaryBattle(
    'Team Flare Grunt 1',
    [
        new GymPokemon('Houndour', 35486579, 18),
        new GymPokemon('Zubat', 36513421, 18),
    ],
    'You may have beaten me, but when I lose, I go out in style!',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 3)],
    undefined,
    {
        displayName: 'Team Flare Grunt',
        imageName: 'Team Flare Grunt (male)',
    }
);
TemporaryBattleList['Team Flare Grunt 2'] = new TemporaryBattle(
    'Team Flare Grunt 2',
    [
        new GymPokemon('Houndour', 37260908, 21),
        new GymPokemon('Golbat', 39069360, 23),
    ],
    'You may have beaten me... again, but when I lose, I go out in style! But first hear this, pip-squeak! Team Flare is gonna use the stones on Route 10 and a fantastic treasure to make everyone on our team happy! In this world the ones who have power are the ones who win with flair!',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 7)],
    undefined,
    {
        displayName: 'Team Flare Grunt',
        imageName: 'Team Flare Grunt (male)',
    }
);
TemporaryBattleList['Calem 1'] = new TemporaryBattle(
    'Calem 1',
    [
        new GymPokemon('Meowstic', 40271251, 28),
        new GymPokemon('Absol', 40271251, 28),
        new GymPokemon('Braixen', 41888812, 30, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Frogadier', 41888812, 30, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Quilladin', 41888812, 30, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
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
TemporaryBattleList.Korrina = new TemporaryBattle(
    'Korrina',
    [new GymPokemon('Mega Lucario', 135000000, 32)],
    'What an incredible bond you have! What amazing power! You and Lucario are worthy of this Lucarionite!</br><img src="assets/images/megaStone/Lucarionite.png"/>',
    [new GymBadgeRequirement(BadgeEnums.Rumble), new ObtainedPokemonRequirement('Lucario')],
    undefined,
    {
        imageName: 'Korrina',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Lucarionite),
    }
);
TemporaryBattleList['Courtney 1'] = new TemporaryBattle(
    'Courtney 1',
    [new GymPokemon('Camerupt', 135000000, 53)],
    'Tedious...bothersome...child...You should...just be quiet...and give me...the Key Stone! Bah! I need a vacation somewhere warm.',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 4)],
    undefined,
    {
        displayName: 'Magma Admin Courtney',
        imageName: 'Magma Admin (courtney)',
    }
);
TemporaryBattleList['Matt 1'] = new TemporaryBattle(
    'Matt 1',
    [new GymPokemon('Sharpedo', 135000000, 53)],
    'Hooaahhh! You clown! Always gettin\' all up in my business! If it\'s gonna be like that, I\'m outta here! The Southern Island\'s gotta be more fun than this.',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 4)],
    undefined,
    {
        displayName: 'Aqua Admin Matt',
        imageName: 'Aqua Admin (matt)',
    }
);
TemporaryBattleList['Zinnia 1'] = new TemporaryBattle(
    'Zinnia 1',
    [
        new GymPokemon('Tyrantrum', 35437500, 53),
        new GymPokemon('Altaria', 35437500, 53),
        new GymPokemon('Salamence', 35437500, 53),
        new GymPokemon('Whismur', 35437500, 53),
    ],
    'Niiice! Real nice! Ohhh, I really felt that one! Full points to you! That settles it! You get this Meteorite Shard as a reward!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 8)],
    undefined,
    {
        displayName: 'Zinnia',
        imageName: 'Zinnia',
    }
);
TemporaryBattleList['Draconid Elder'] = new TemporaryBattle(
    'Draconid Elder',
    [
        new GymPokemon('Dragonite', 37209375, 53),
        new GymPokemon('Flygon', 37209375, 53),
        new GymPokemon('Haxorus', 37209375, 53),
        new GymPokemon('Garchomp', 37209375, 53),
    ],
    'You are indeed powerful. I think you can help Zinnia.',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 15)],
    undefined,
    {
        displayName: 'Draconid Elder',
        imageName: 'Draconid Elder',
    }
);
TemporaryBattleList['Aqua Grunt'] = new TemporaryBattle(
    'Aqua Grunt',
    [
        new GymPokemon('Zubat', 35437500, 33),
        new GymPokemon('Grimer', 35437500, 33),
        new GymPokemon('Corphish', 35437500, 33),
        new GymPokemon('Carvanha', 35437500, 33),
    ],
    'Baaah! I gotta get out of here!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 17)],
    undefined,
    {
        displayName: 'Aqua Grunt',
        imageName: 'Team Aqua Grunt (female)',
    }
);
TemporaryBattleList['Magma Grunt'] = new TemporaryBattle(
    'Magma Grunt',
    [
        new GymPokemon('Zubat', 35437500, 33),
        new GymPokemon('Koffing', 35437500, 33),
        new GymPokemon('Poochyena', 35437500, 33),
        new GymPokemon('Numel', 35437500, 33),
    ],
    'The boss is gonna be so mad!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 17)],
    undefined,
    {
        displayName: 'Magma Grunt',
        imageName: 'Team Magma Grunt (male)',
    }
);
TemporaryBattleList['Courtney 2'] = new TemporaryBattle(
    'Courtney 2',
    [new GymPokemon('Mega Camerupt', 198102712, 55)],
    'Why? Why must...you always...Always, always, always, always...Get in my way!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 18)],
    undefined,
    {
        displayName: 'Magma Admin Courtney',
        imageName: 'Magma Admin (courtney)',
    }
);
TemporaryBattleList['Matt 2'] = new TemporaryBattle(
    'Matt 2',
    [new GymPokemon('Mega Sharpedo', 198102712, 55)],
    'Dang it! Am I not good enough, bro?!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 18)],
    undefined,
    {
        displayName: 'Aqua Admin Matt',
        imageName: 'Aqua Admin (matt)',
    }
);
TemporaryBattleList['Delta Wallace'] = new TemporaryBattle(
    'Delta Wallace',
    [
        new GymPokemon('Wailord', 36318830, 56),
        new GymPokemon('Tentacruel', 36318830, 56),
        new GymPokemon('Ludicolo', 36318830, 56),
        new GymPokemon('Whiscash', 36318830, 56),
        new GymPokemon('Gyarados', 36318830, 56),
        new GymPokemon('Milotic', 36318830, 56),
    ],
    'Zinnia has gone to the top of the Sky Pillar to try to summon Rayquaza. Please, try to help her. This Key Stone may help you.',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 25)],
    undefined,
    {
        displayName: 'Wallace',
        imageName: 'Wallace',
        firstTimeRewardFunction: () => {
            BagHandler.gainItem({type: ItemType.item, id: 'Key_stone'}, 1);
            Notifier.notify({
                message: 'You were awarded a Key Stone from Wallace!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        },
    }
);
TemporaryBattleList['Zinnia 2'] = new TemporaryBattle(
    'Zinnia 2',
    [
        new GymPokemon('Goodra', 47940856, 60),
        new GymPokemon('Tyrantrum', 47940856, 60),
        new GymPokemon('Altaria', 47940856, 53),
        new GymPokemon('Noivern', 47940856, 53),
        new GymPokemon('Mega Salamence', 47940856, 53),
    ],
    'I thought... But I\'m supposed to be the one who saves the world...',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 26)],
    undefined,
    {
        displayName: 'Zinnia',
        imageName: 'Zinnia',
    }
);
TemporaryBattleList.Deoxys = new TemporaryBattle(
    'Deoxys',
    [new GymPokemon('Deoxys', 293674710, 100)],
    '<i>The Meteor disintegrates into thousands of pieces.</i>',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 31)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/386',
    }
);
TemporaryBattleList['Delta Giovanni'] = new TemporaryBattle(
    'Delta Giovanni',
    [
        new GymPokemon('Golem', 39620542, 60),
        new GymPokemon('Nidoqueen', 39620542, 60),
        new GymPokemon('Nidoking', 39620542, 63),
        new GymPokemon('Cloyster', 39620542, 63),
        new GymPokemon('Mega Beedrill', 42620542, 63),
    ],
    'Even here? Is there no getting rid of you? Take this and leave me alone. </br><img src="assets/images/megaStone/Beedrillite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 17), new ObtainedPokemonRequirement('Beedrill')])],
    undefined,
    {
        displayName: 'Giovanni',
        imageName: 'Team Rocket Boss Giovanni',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Beedrillite),
    }
);
TemporaryBattleList['Mr. Stone'] = new TemporaryBattle(
    'Mr. Stone',
    [
        new GymPokemon('Castform', 67500000, 60),
        new GymPokemon('Mega Pidgeot', 67500000, 63),
    ],
    'You\'re really strong! You should take this, it might come in handy with all this meteor business.</br><img src="assets/images/megaStone/Pidgeotite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 6), new ObtainedPokemonRequirement('Pidgeot')])],
    undefined,
    {
        displayName: 'Mr. Stone',
        imageName: 'Mr Stone',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Pidgeotite),
    }
);
TemporaryBattleList['Shoal Fisherman'] = new TemporaryBattle(
    'Shoal Fisherman',
    [new GymPokemon('Mega Slowbro', 148837500, 63)],
    'I found this neat rock while hunting for shells! You want it?</br><img src="assets/images/megaStone/Slowbronite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 6), new ObtainedPokemonRequirement('Slowbro')])],
    undefined,
    {
        displayName: 'Shoal Fisherman',
        imageName: 'Fisherman',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Slowbronite),
    }
);
TemporaryBattleList['Delta Brock'] = new TemporaryBattle(
    'Delta Brock',
    [
        new GymPokemon('Sudowoodo', 47250000, 63),
        new GymPokemon('Crobat', 47250000, 63),
        new GymPokemon('Mega Steelix', 47250000, 63),
    ],
    'Seems like you\'ve gotten really strong since Kanto! I found this neat rock in the cave, you should keep it.</br><img src="assets/images/megaStone/Steelixite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 9), new ObtainedPokemonRequirement('Steelix')])],
    undefined,
    {
        displayName: 'Brock',
        imageName: 'Brock',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Steelixite),
    }
);
TemporaryBattleList['Delta Tabitha'] = new TemporaryBattle(
    'Delta Tabitha',
    [new GymPokemon('Mega Camerupt', 217912983, 63)],
    'I guess you\'ve earned this Cameruptite. Make sure your Camerupt holds on to it tightly.</br><img src="assets/images/megaStone/Cameruptite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 26), new ObtainedPokemonRequirement('Camerupt')])],
    undefined,
    {
        displayName: 'Magma Admin Tabitha',
        imageName: 'Magma Admin',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Cameruptite),
    }
);
TemporaryBattleList['Delta Shelly'] = new TemporaryBattle(
    'Delta Shelly',
    [new GymPokemon('Mega Sharpedo', 217912983, 63)],
    'Fine you win. Take this Sharpedonite. Make sure your Sharpedo holds on to it tightly.</br><img src="assets/images/megaStone/Sharpedonite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 26), new ObtainedPokemonRequirement('Sharpedo')])],
    undefined,
    {
        displayName: 'Aqua Admin Shelly',
        imageName: 'Aqua Admin (shelly)',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Sharpedonite),
    }
);
TemporaryBattleList['Icy Boulder'] = new TemporaryBattle(
    'Icy Boulder',
    [new GymPokemon('Mega Glalie', 141750000, 66)],
    '<i>The Glalie flees, dropping a stone.</i></br><img src="assets/images/megaStone/Glalitite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 4), new ObtainedPokemonRequirement('Glalie')])],
    undefined,
    {
        displayName: 'Icy Boulder',
        imageName: '../pokemon/362.01',
        hideTrainer: true,
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Glalitite),
    }
);
TemporaryBattleList['Mega Draconid Elder'] = new TemporaryBattle(
    'Mega Draconid Elder',
    [
        new GymPokemon('Dragonite', 37209375, 53),
        new GymPokemon('Flygon', 37209375, 53),
        new GymPokemon('Haxorus', 37209375, 53),
        new GymPokemon('Garchomp', 37209375, 53),
        new GymPokemon('Mega Salamence', 114837210, 70),
    ],
    'You truly are a master of dragons. Please, take this stone.</br><img src="assets/images/megaStone/Salamencite.png"/>',
    [new MultiRequirement([new QuestLineCompletedRequirement('The Delta Episode'), new ObtainedPokemonRequirement('Salamence')])],
    undefined,
    {
        displayName: 'Draconid Elder',
        imageName: 'Draconid Elder',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Salamencite),
    }
);
TemporaryBattleList['Delta Steven'] = new TemporaryBattle(
    'Delta Steven',
    [
        new GymPokemon('Skarmory', 33017118, 57),
        new GymPokemon('Aggron', 33017118, 57),
        new GymPokemon('Claydol', 33017118, 57),
        new GymPokemon('Cradily', 33017118, 57),
        new GymPokemon('Armaldo', 33017118, 57),
        new GymPokemon('Mega Metagross', 36017118, 63),
    ],
    'I have to admit, you keep surprising me! You deserve to have this.</br><img src="assets/images/megaStone/Metagrossite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 23), new ObtainedPokemonRequirement('Metagross')])],
    undefined,
    {
        displayName: 'Steven',
        imageName: 'Steven',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Metagrossite),
    }
);
TemporaryBattleList['Dr Cozmo'] = new TemporaryBattle(
    'Dr Cozmo',
    [
        new GymPokemon('Lunatone', 79901427, 57),
        new GymPokemon('Solrock', 79901427, 57),
        new GymPokemon('Mega Gallade', 79901427, 63),
    ],
    'That was invigorating! Please take this!</br><img src="assets/images/megaStone/Galladite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 27), new ObtainedPokemonRequirement('Gallade')])],
    undefined,
    {
        displayName: 'Dr. Cozmo',
        imageName: 'Dr Cozmo',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Galladite),
    }
);
TemporaryBattleList['Matt 3'] = new TemporaryBattle(
    'Matt 3',
    [
        new GymPokemon('Grimer', 70875000, 57),
        new GymPokemon('Sharpedo', 70875000, 63),
    ],
    '<i>The Latias that Matt was harassing flies away, leaving a stone behind.</i></br><img src="assets/images/megaStone/Latiasite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 5), new ObtainedPokemonRequirement('Latias')])],
    undefined,
    {
        displayName: 'Aqua Admin Matt',
        imageName: 'Aqua Admin (matt)',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Latiasite),
    }
);
TemporaryBattleList['Courtney 3'] = new TemporaryBattle(
    'Courtney 3',
    [
        new GymPokemon('Koffing', 70875000, 57),
        new GymPokemon('Camerupt', 70875000, 63),
    ],
    '<i>The Latios that Courtney was harassing flies away, leaving a stone behind.</i></br><img src="assets/images/megaStone/Latiosite.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 5), new ObtainedPokemonRequirement('Latios')])],
    undefined,
    {
        displayName: 'Magma Admin Courtney',
        imageName: 'Magma Admin (courtney)',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Latiosite),
    }
);
TemporaryBattleList['Hoenn Stone Salesman'] = new TemporaryBattle(
    'Hoenn Stone Salesman',
    [
        new GymPokemon('Mega Sceptile', 72637661, 63),
        new GymPokemon('Mega Blaziken', 72637661, 63),
        new GymPokemon('Mega Swampert', 72637661, 63),
    ],
    'Wow! I\'ll let you buy some of my super fancy stones, now that I know you\'re a serious trainer!',
    [new QuestLineStepCompletedRequirement('The Delta Episode', 5)],
    undefined,
    {
        imageName: 'Ruin Maniac gen3',
        firstTimeRewardFunction: () => {
            if ((App.game.party.alreadyCaughtPokemonByName('Sceptile') == true) && (player.regionStarters[GameConstants.Region.hoenn]() == GameConstants.Starter.Grass)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Sceptilite);
                Notifier.notify({
                    message: 'You were awarded Sceptilite!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else if ((App.game.party.alreadyCaughtPokemonByName('Blaziken') == true) && (player.regionStarters[GameConstants.Region.hoenn]() == GameConstants.Starter.Fire)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Blazikenite);
                Notifier.notify({
                    message: 'You were awarded Blazikenite!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else if ((App.game.party.alreadyCaughtPokemonByName('Swampert') == true) && (player.regionStarters[GameConstants.Region.hoenn]() == GameConstants.Starter.Water)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Swampertite);
                Notifier.notify({
                    message: 'You were awarded Swampertite!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else {
                BagHandler.gainItem({type: ItemType.item, id: 'Key_stone'}, 1);
                Notifier.notify({
                    message: 'You were awarded a Key Stone!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            }
        },
    }
);
TemporaryBattleList['Kalos Stone Salesman'] = new TemporaryBattle(
    'Kalos Stone Salesman',
    [
        new GymPokemon('Mega Venusaur', 54478245, 63),
        new GymPokemon('Mega Charizard X', 54478245, 63),
        new GymPokemon('Mega Charizard Y', 54478245, 63),
        new GymPokemon('Mega Blastoise', 54478245, 63),
    ],
    'Wow! I\'ll let you buy some of my super fancy stones, now that I know you\'re a serious trainer!',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 12)],
    undefined,
    {
        imageName: 'Owner',
        firstTimeRewardFunction: () => {
            if ((App.game.party.alreadyCaughtPokemonByName('Venusaur')) && (player.regionStarters[GameConstants.Region.kanto]() == GameConstants.Starter.Grass)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Venusaurite);
                Notifier.notify({
                    message: 'You were awarded Venusaurite!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else if ((App.game.party.alreadyCaughtPokemonByName('Charizard')) && (player.regionStarters[GameConstants.Region.kanto]() == GameConstants.Starter.Fire)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Charizardite_Y);
                Notifier.notify({
                    message: 'You were awarded Charizardite Y!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else if ((App.game.party.alreadyCaughtPokemonByName('Blastoise')) && (player.regionStarters[GameConstants.Region.kanto]() == GameConstants.Starter.Water)) {
                player.gainMegaStone(GameConstants.MegaStoneType.Blastoisinite);
                Notifier.notify({
                    message: 'You were awarded Blastoisinite!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            } else {
                BagHandler.gainItem({type: ItemType.item, id: 'Key_stone'}, 1);
                Notifier.notify({
                    message: 'You were awarded a Key Stone!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
                });
            }
        },
    }
);
TemporaryBattleList['Captain Stern'] = new TemporaryBattle(
    'Captain Stern',
    [new GymPokemon('Sealeo', 217912983, 59)],
    'Well I\'ll be! You\'re quite the trainer!',
    [new QuestLineStepCompletedRequirement('Primal Reversion', 4)],
    undefined,
    {
        displayName: 'Captain Stern',
        imageName: '../npcs/Sailor',
    }
);
TemporaryBattleList['Archie Primal'] = new TemporaryBattle(
    'Archie Primal',
    [
        new GymPokemon('Mightyena', 59926070, 60),
        new GymPokemon('Crobat', 59926070, 60),
        new GymPokemon('Muk', 59926070, 60),
        new GymPokemon('Sharpedo', 59926070, 60),
    ],
    'You\'re too late, $playername$! I have uncovered the secrets of the Blue Orb, despite Maxie\'s meddling!',
    [new QuestLineStepCompletedRequirement('Primal Reversion', 9)],
    undefined,
    {
        displayName: 'Archie',
        imageName: '../npcs/Aqua Leader',
    }
);

TemporaryBattleList['Maxie Primal'] = new TemporaryBattle(
    'Maxie Primal',
    [
        new GymPokemon('Mightyena', 59926070, 60),
        new GymPokemon('Crobat', 59926070, 60),
        new GymPokemon('Weezing', 59926070, 60),
        new GymPokemon('Camerupt', 59926070, 60),
    ],
    'You\'re too late, $playername$! I have uncovered the secrets of the Red Orb, despite Archie\'s meddling!',
    [new QuestLineStepCompletedRequirement('Primal Reversion', 9)],
    undefined,
    {
        displayName: 'Maxie',
        imageName: '../npcs/Magma Leader',
    }
);
TemporaryBattleList['Primal Groudon'] = new TemporaryBattle(
    'Primal Groudon',
    [new GymPokemon('Primal Groudon', 293674710, 100)],
    '<i>Primal Groudon lets out a terrifying roar, then drops the Red Orb and returns to its normal form.</i></br><img src="assets/images/megaStone/Red_Orb.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 14), new WeatherRequirement([WeatherType.Sunny])])],
    undefined,
    {
        hideTrainer: true,
        returnTown: 'Mt. Pyre',
        imageName: '../pokemon/383.01',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Red_Orb),
    }
);
TemporaryBattleList['Primal Kyogre'] = new TemporaryBattle(
    'Primal Kyogre',
    [new GymPokemon('Primal Kyogre', 293674710, 100)],
    '<i>Primal Kyogre lets out a terrifying roar, then drops the Blue Orb and returns to its normal form.</i></br><img src="assets/images/megaStone/Blue_Orb.png"/>',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 14), new WeatherRequirement([WeatherType.Rain])])],
    undefined,
    {
        hideTrainer: true,
        returnTown: 'Mt. Pyre',
        imageName: '../pokemon/382.01',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Blue_Orb),
    }
);
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
        imageName: 'specialNPCs/Aipom Alley',
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
        imageName: 'specialNPCs/Mime Interview',
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
    [new QuestLineStepCompletedRequirement('Detective Pikachu', 5)],
    undefined,
    {imageName: 'Veteran (male)'}
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
        imageName: 'specialNPCs/Lab Ambush',
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
        imageName: 'Office Worker (male)',
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
        imageName: 'specialNPCs/Possessed Mewtwo',
    }
);
TemporaryBattleList.Riot = new TemporaryBattle(
    'Riot',
    [
        new GymPokemon('Ninjask', 136471274, 70),
        new GymPokemon('Ninjask', 136471274, 70),
        new GymPokemon('Greninja', 140718837, 70),
    ],
    'Curse you! Diancie has escaped!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 0)]
);
TemporaryBattleList.Merilyn = new TemporaryBattle(
    'Merilyn',
    [
        new GymPokemon('Yanma', 207131881, 80),
        new GymPokemon('Delphox', 212229898, 80),
    ],
    'You ruined my shopping spree!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 1)]
);
TemporaryBattleList['Millis and Argus Steel'] = new TemporaryBattle(
    'Millis and Argus Steel',
    [
        new GymPokemon('Honedge', 107376526, 70),
        new GymPokemon('Doublade', 110485698, 70),
        new GymPokemon('Aegislash (Blade)', 110510597, 70),
        new GymPokemon('Chesnaught', 111743528, 70),
    ],
    'Our plans are ruined! Retreat!',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 3)]
);
TemporaryBattleList['Rampaging Yveltal'] = new TemporaryBattle(
    'Rampaging Yveltal',
    [new GymPokemon('Yveltal', 446974112, 80)],
    '<i>Diancie fights alongside you, Mega Evolving to land the final blow! She hands you her Mega Stone after the fight.</i></br><img src="assets/images/megaStone/Diancite.png"/></br>',
    [new QuestLineStepCompletedRequirement('Princess Diancie', 8)],
    undefined,
    {
        displayName: 'Rampaging Yveltal',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Diancite),
        imageName: '../pokemon/717',
        hideTrainer: true,
        returnTown: 'Shalour City',
    }
);
TemporaryBattleList['Hoopa 1'] = new TemporaryBattle(
    'Hoopa 1',
    [new GymPokemon('Lugia', 446974112, 80)],
    '<i>The Unbound Hoopa casts you through a ring to a far away land, escaping for now.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 7)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Shalour City',
    }
);
TemporaryBattleList['Hoopa 2'] = new TemporaryBattle(
    'Hoopa 2',
    [
        new GymPokemon('Rayquaza', 163890507, 80),
        new GymPokemon('Latias', 163890507, 80),
        new GymPokemon('Latios', 163890507, 80),
    ],
    '<i>The Unbound Hoopa casts you through a ring to a far away land, escaping for now.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 8)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Lumiose City',
    }
);
TemporaryBattleList['Hoopa 3'] = new TemporaryBattle(
    'Hoopa 3',
    [
        new GymPokemon('Primal Groudon', 107273786, 80),
        new GymPokemon('Primal Kyogre', 107273786, 80),
        new GymPokemon('Kyurem', 107273786, 80),
        new GymPokemon('Dialga', 107273786, 80),
        new GymPokemon('Palkia', 107273786, 80),
    ],
    '<i>The Unbound Hoopa casts you through a ring to a far away land, escaping for now.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 9)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Anistar City',
    }
);
TemporaryBattleList['Hoopa 4'] = new TemporaryBattle(
    'Hoopa 4',
    [
        new GymPokemon('Mega Rayquaza', 193688781, 80),
        new GymPokemon('Mega Latias', 193688781, 80),
        new GymPokemon('Mega Latios', 193688781, 80),
    ],
    '<i>The Unbound Hoopa casts you through a ring to a far away land, escaping for now.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 10)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Laverre City',
    }
);
TemporaryBattleList['Hoopa 5'] = new TemporaryBattle(
    'Hoopa 5',
    [
        new GymPokemon('Kyurem (Black)', 312881878, 80),
        new GymPokemon('Kyurem (White)', 312881878, 80),
    ],
    '<i>The Unbound Hoopa casts you through a ring to a far away land, escaping for now.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 11)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Vaniville Town',
    }
);
TemporaryBattleList['Hoopa 6'] = new TemporaryBattle(
    'Hoopa 6',
    [new GymPokemon('Hoopa (Unbound)', 670461168, 80)],
    '<i>The Unbound Hoopa is sucked into the Prison Bottle, and you gain control of it.</i>',
    [new QuestLineStepCompletedRequirement('Clash of Ages', 12)],
    undefined,
    {
        displayName: 'Unbound Hoopa',
        imageName: '../pokemon/720.01',
        hideTrainer: true,
        returnTown: 'Kiloude City',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Hoopa (Unbound)');
        },
    }
);
TemporaryBattleList['Calem 2'] = new TemporaryBattle(
    'Calem 2',
    [
        new GymPokemon('Meowstic', 52417332, 31),
        new GymPokemon('Absol', 52417332, 31),
        new GymPokemon('Braixen', 54231360, 33, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Frogadier', 54231360, 33, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Quilladin', 54231360, 33, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
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
        new GymPokemon('Delphox', 67476604, 37, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Greninja', 67476604, 37, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Chesnaught', 67476604, 37, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
    ],
    'Battling with you is fun, but losing all the time doesn\'t really make me look all that good.',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 13)],
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
        new GymPokemon('Jolteon', 61391150, 44, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Flareon', 61391150, 44, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Vaporeon', 61391150, 44, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
        new GymPokemon('Delphox', 63846796, 46, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Greninja', 63846796, 46, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Chesnaught', 63846796, 46, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
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
TemporaryBattleList['Team Flare Lysandre 1'] = new TemporaryBattle(
    'Team Flare Lysandre 1',
    [
        new GymPokemon('Mienfoo', 66360070, 45),
        new GymPokemon('Murkrow', 66360070, 45),
        new GymPokemon('Pyroar', 67714357, 47),
        new GymPokemon('Gyarados', 69068644, 49),
    ],
    'Excellent! I can feel the fire of your convictions burning deep within your heart! I tried to save people--and the world--with the profit from this lab. But my efforts had no effect... This world will eventually reach the point of no return... Saving the lives of all is impossible. Only the chosen ones will obtain a ticket to tomorrow. Do you want to have a ticket? Or, do you want to stop me? Show me in battle!',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 20)],
    undefined,
    {
        displayName: 'Team Flare Lysandre',
        imageName: 'Team Flare Lysandre',
    }
);
TemporaryBattleList['Team Flare Xerosic'] = new TemporaryBattle(
    'Team Flare Xerosic',
    [
        new GymPokemon('Crobat', 128657279, 46),
        new GymPokemon('Malamar', 131365853, 48),
    ],
    'Oh ho ho! You\'re wonderful! Your Pokémon are amazing.',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 22)],
    undefined,
    {
        displayName: 'Team Flare Xerosic',
        imageName: 'Team Flare Xerosic',
    }
);
TemporaryBattleList.Xerneas = new TemporaryBattle(
    'Xerneas',
    [new GymPokemon('Xerneas', 281500000, 50)],
    'You calmed down Xerneas and it ran away to the back of the lab.',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 30)],
    undefined,
    {
        displayName: 'Xerneas',
        imageName: '../pokemon/716',
        hideTrainer: true,
    }
);
TemporaryBattleList.Yveltal = new TemporaryBattle(
    'Yveltal',
    [new GymPokemon('Yveltal', 281500000, 50)],
    'You calmed down Yveltal and it ran away to the back of the lab.',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 30)],
    undefined,
    {
        displayName: 'Yveltal',
        imageName: '../pokemon/717',
        hideTrainer: true,
    }
);
TemporaryBattleList['Team Flare Boss Lysandre 1'] = new TemporaryBattle(
    'Team Flare Boss Lysandre 1',
    [
        new GymPokemon('Mienshao', 68927443, 49),
        new GymPokemon('Honchkrow', 68927443, 49),
        new GymPokemon('Pyroar', 70334126, 51),
        new GymPokemon('Mega Gyarados', 71740808, 53),
    ],
    'It\'s over... Fools with no vision will continue to befoul this beautiful world. They will go on until the only thing left to do is squabble over the remaining scraps of hope...',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 32)],
    undefined,
    {
        displayName: 'Team Flare Boss Lysandre',
        imageName: 'Team Flare Boss Lysandre',
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
        new GymPokemon('Greninja', 94497751, 51, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Chesnaught', 94497751, 51, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Delphox', 94497751, 51, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
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
        new GymPokemon('Meowstic', 67294391, 57),
        new GymPokemon('Jolteon', 67294391, 57, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Flareon', 67294391, 57, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Vaporeon', 67294391, 57, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
        new GymPokemon('Altaria', 67294391, 58),
        new GymPokemon('Absol', 71149798, 59),
        new GymPokemon('Delphox', 76407173, 61, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Greninja', 76407173, 61, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Chesnaught', 76407173, 61, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
    ],
    'I\'m still no match for you... You know, it\'s because I met you that I was able to get this far... But our journey\'s just getting started. Who knows what heights we\'ll reach!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos'))],
    undefined,
    {
        displayName: 'Pokémon Trainer Calem',
        returnTown: 'Victory Road Kalos',
        imageName: 'Calem',
    }
);
TemporaryBattleList['Storyline AZ'] = new TemporaryBattle(
    'Storyline AZ',
    [
        new GymPokemon('Torkoal', 153757520, 60),
        new GymPokemon('Golurk', 153757520, 60),
        new GymPokemon('Sigilyph', 153757520, 60),
    ],
    'Thank you very much for battling with me. Now I finally feel free…',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 34)],
    undefined,
    {
        displayName: 'Pokémon Trainer AZ',
        imageName: 'AZ',
    }
);
TemporaryBattleList.AZ = new TemporaryBattle(
    'AZ',
    [
        new GymPokemon('Torkoal', 161445396, 80),
        new GymPokemon('Golurk', 161445396, 80),
        new GymPokemon('Sigilyph', 161445396, 80),
    ],
    'Floette... It\'s been 3,000 years...',
    [new QuestLineCompletedRequirement('A Beautiful World')],
    undefined,
    {
        displayName: 'Pokémon Trainer AZ',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Floette (Eternal)');
        },
    }
);
TemporaryBattleList['Ash Ketchum Kanto'] = new TemporaryBattle(
    'Ash Ketchum Kanto',
    [
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Pidgeot', 83333000, 56),
        new GymPokemon('Bulbasaur', 83333000, 56),
        new GymPokemon('Charizard', 83333000, 60),
        new GymPokemon('Squirtle', 83333000, 62),
        new GymPokemon('Muk', 83333000, 62),
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
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Heracross', 83333000, 56),
        new GymPokemon('Noctowl', 83333000, 56, undefined, true),
        new GymPokemon('Bayleef', 83333000, 60),
        new GymPokemon('Cyndaquil', 83333000, 62),
        new GymPokemon('Totodile', 83333000, 62),
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
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Swellow', 83333000, 56),
        new GymPokemon('Grovyle', 83333000, 56),
        new GymPokemon('Torkoal', 83333000, 62),
        new GymPokemon('Corphish', 83333000, 60),
        new GymPokemon('Glalie', 83333000, 62),
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
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Staraptor', 83333000, 56),
        new GymPokemon('Torterra', 83333000, 56),
        new GymPokemon('Infernape', 83333000, 60),
        new GymPokemon('Buizel', 83333000, 62),
        new GymPokemon('Gible', 83333000, 62),
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
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Unfezant', 83333000, 56),
        new GymPokemon('Snivy', 83333000, 62),
        new GymPokemon('Pignite', 83333000, 60),
        new GymPokemon('Oshawott', 83333000, 56),
        new GymPokemon('Krookodile', 83333000, 62),
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
        new GymPokemon('Pikachu (Partner Cap)', 83333000, 58),
        new GymPokemon('Talonflame', 83333000, 56),
        new GymPokemon('Hawlucha', 83333000, 56),
        new GymPokemon('Goodra', 83333000, 60),
        new GymPokemon('Noivern', 83333000, 62),
        new GymPokemon('Ash-Greninja', 83333000, 62),
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
        new GymPokemon('Pinkan Pikachu', 83333000, 58),
        new GymPokemon('Snorlax', 83333000, 56),
        new GymPokemon('Lapras', 83333000, 56),
        new GymPokemon('Kingler', 83333000, 60),
        new GymPokemon('Tauros', 83333000, 62),
        new GymPokemon('Charizard', 83333000, 62),
    ],
    'Hey, you found me on my vacation! Just make sure your Pikachu does not eat the berries here.',
    [new QuestLineCompletedRequirement('The New Kid'), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinkan Mountain'))],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Pinkan Mountain',
        imageName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Pinkan Pikachu');
        },
    }
);
TemporaryBattleList['Calem 6'] = new TemporaryBattle(
    'Calem 6',
    [
        new GymPokemon('Meowstic', 94468205, 66),
        new GymPokemon('Clefable', 94468205, 68),
        new GymPokemon('Jolteon', 99137044, 66, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Flareon', 99137044, 66, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Vaporeon', 99137044, 66, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
        new GymPokemon('Altaria', 94468205, 67),
        new GymPokemon('Delphox', 105685546, 70, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Grass)),
        new GymPokemon('Greninja', 105685546, 70, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Fire)),
        new GymPokemon('Chesnaught', 105685546, 70, new StarterRequirement(GameConstants.Region.kalos, GameConstants.Starter.Water)),
        new GymPokemon('Mega Absol', 118054939, 68),
    ],
    'Here, this is for you!</br><img src="assets/images/megaStone/Absolite.png"/></br>That\'s right. It\'s Absolite. I found two of them. After everything we said to Lysandre, it just wouldn\'t be right if I didn\'t share one with you.',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion), new ObtainedPokemonRequirement('Absol')],
    [new NullRequirement],
    {
        displayName: 'Pokémon Trainer Calem',
        imageName: 'Calem',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Absolite),
        rewardFunction: () =>
            Notifier.notify({message: 'Congratulations on beating Calem at his best! Come back to fight him again at any time.'}),
    }
);

TemporaryBattleList['Marquis Grant'] = new TemporaryBattle(
    'Marquis Grant',
    [
        new GymPokemon('Aurorus', 110668215, 80),
        new GymPokemon('Tyrantrum', 110668215, 80),
        new GymPokemon('Mega Tyranitar', 125000000, 80),
        new GymPokemon('Mega Aggron', 125000000, 80),
    ],
    'To commemorate such an impressive show of teamwork, please accept these gifts!</br><img src="assets/images/megaStone/Tyranitarite.png"/></br></br><img src="assets/images/megaStone/Aggronite.png"/></br>',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion), new ClearGymRequirement(2000, GameConstants.getGymIndex('Cyllage City')), new ObtainedPokemonRequirement('Tyranitar'), new ObtainedPokemonRequirement('Aggron')],
    undefined,
    {
        displayName: 'Marquis Grant',
        imageName: 'Grant',
        firstTimeRewardFunction: () => [player.gainMegaStone(GameConstants.MegaStoneType.Tyranitarite), player.gainMegaStone(GameConstants.MegaStoneType.Aggronite)],
    }
);

TemporaryBattleList['Grand Duchess Diantha'] = new TemporaryBattle(
    'Grand Duchess Diantha',
    [
        new GymPokemon('Hawlucha', 110668215, 80),
        new GymPokemon('Gourgeist (Average)', 115668215, 80),
        new GymPokemon('Goodra', 120770015, 80),
        new GymPokemon('Mega Gardevoir', 125000000, 80),
    ],
    'Witnessing the noble spirits of you and your Pokémon in battle has really touched my heart... Please, take this Gardevoirite.</br><img src="assets/images/megaStone/Gardevoirite.png"/></br>I just... I just don\'t know what to say... I can hardly express this feeling...',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion), new ObtainedPokemonRequirement('Gardevoir')],
    undefined,
    {
        displayName: 'Grand Duchess Diantha',
        imageName: 'Diantha',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Gardevoirite),
    }
);

TemporaryBattleList['Team Flare Boss Lysandre 2'] = new TemporaryBattle(
    'Team Flare Boss Lysandre 2',
    [
        new GymPokemon('Mienshao', 127138249, 79),
        new GymPokemon('Honchkrow', 127138249, 79),
        new GymPokemon('Pyroar', 124595484, 81),
        new GymPokemon('Mega Gyarados', 129681014, 83),
    ],
    'I see the strength to protect within you... Hopefully you can do a better job than me and protect a tomorrow that will be better than today. Take this Gyaradosite.</br><img src="assets/images/megaStone/Gyaradosite.png"/></br>',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 35), new ObtainedPokemonRequirement('Gyarados'), new DayCyclePartRequirement([DayCyclePart.Dusk])],
    undefined,
    {
        displayName: 'Team Flare Boss Lysandre',
        imageName: 'Team Flare Boss Lysandre',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Gyaradosite),
    }
);

TemporaryBattleList['Hex Maniac Aster'] = new TemporaryBattle(
    'Hex Maniac Aster',
    [
        new GymPokemon('Gastly', 40250000, 25),
        new GymPokemon('Haunter', 60770015, 30),
        new GymPokemon('Haunter', 60770015, 30),
        new GymPokemon('Medicham', 60770015, 30),
    ],
    'What’s this?! I see... Perhaps a Trainer as accomplished as you can get the most out of this.</br><img src="assets/images/megaStone/Gengarite.png"/></br>',
    [
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Gastly').id], 666, 'Encounter at least 666 wild Gastly.'),
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Haunter').id], 444, 'Encounter at least 444 wild Haunter.'),
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Gengar').id], 13, 'Encounter at least 13 wild Gengar.'),
        new ObtainedPokemonRequirement('Gengar'),
    ],
    undefined,
    {
        displayName: 'Hex Maniac Aster',
        imageName: 'Hex Maniac',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Gengarite),
    }
);

TemporaryBattleList['Wild Houndour Horde'] = new TemporaryBattle(
    'Wild Houndour Horde',
    [
        new GymPokemon('Houndour', 60000000, 40),
        new GymPokemon('Houndour', 60000000, 40),
        new GymPokemon('Houndour', 60000000, 40),
        new GymPokemon('Houndour', 60000000, 40),
        new GymPokemon('Houndour', 60000000, 40),
        new GymPokemon('Mega Houndoom', 120000000, 60),
    ],
    '<i>With the leader of the pack defeated, the Houndour horde scatters, their fiery fury reduced to ashes. In the gleaming sunlight, you catch sight of a small gem left behind by their leader...</i></br><img src="assets/images/megaStone/Houndoominite.png"/></br><i>You obtained the Houndoominite!</i>',
    [
        new ObtainedPokemonRequirement('Houndoom'),
        new WeatherRequirement([WeatherType.Sunny]),
        new StatisticRequirement(['pokemonCaptured', PokemonHelper.getPokemonByName('Houndour').id], 500, 'Capture a total of 500 or more Houndour.'),
        new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
    ],
    undefined,
    {
        displayName: 'Wild Houndour Horde',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Houndoominite),
        imageName: '../pokemon/229.01',
        hideTrainer: true,
        returnTown: 'Dendemille Town',
    }
);

TemporaryBattleList['Wild Electrike Horde'] = new TemporaryBattle(
    'Wild Electrike Horde',
    [
        new GymPokemon('Electrike', 60000000, 40),
        new GymPokemon('Electrike', 60000000, 40),
        new GymPokemon('Electrike', 60000000, 40),
        new GymPokemon('Electrike', 60000000, 40),
        new GymPokemon('Electrike', 60000000, 40),
        new GymPokemon('Mega Manectric', 120000000, 60),
    ],
    '<i>With the leader of the pack defeated, the Electrike horde scatters, their thunderous rage utterly depleted. In a thunderbolt\'s flash, you catch sight of a small gem left behind by their leader...</i></br><img src="assets/images/megaStone/Manectite.png"/></br><i>You obtained the Manectite!</i>',
    [
        new ObtainedPokemonRequirement('Manectric'),
        new WeatherRequirement([WeatherType.Thunderstorm]),
        new StatisticRequirement(['pokemonCaptured', PokemonHelper.getPokemonByName('Electrike').id], 500, 'Capture a total of 500 or more Electrike.'),
        new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
    ],
    undefined,
    {
        displayName: 'Wild Electrike Horde',
        firstTimeRewardFunction: () => player.gainMegaStone(GameConstants.MegaStoneType.Manectite),
        imageName: '../pokemon/310.01',
        hideTrainer: true,
        returnTown: 'Dendemille Town',
    }
);

//Alola Temporary Battles
TemporaryBattleList['Hau 1'] = new TemporaryBattle(
    'Hau 1',
    [
        new GymPokemon('Popplio', 71131094, 5, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Rowlet', 71131094, 5, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Litten', 71131094, 5, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
    ],
    'Whoa! That was awesome! You and your Pokémon were both so cool!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hau',
        returnTown: 'Iki Town Outskirts',
        imageName: 'Hau',
    }
);
TemporaryBattleList['Hau 2'] = new TemporaryBattle(
    'Hau 2',
    [
        new GymPokemon('Pichu', 75473838, 6),
        new GymPokemon('Popplio', 81763320, 7, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Rowlet', 81763320, 7, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Litten', 81763320, 7, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
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
        new GymPokemon('Popplio', 98160909, 13, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Rowlet', 98160909, 13, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Litten', 98160909, 13, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
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
        new GymPokemon('Brionne', 99628133, 16, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Dartrix', 99628133, 16, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Torracat', 99628133, 16, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
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
        new GymPokemon('Brionne', 132593929, 20, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Dartrix', 132593929, 20, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Torracat', 132593929, 20, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
    ],
    'The battle is over!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
    undefined,
    {imageName: 'specialNPCs/Battle Royal'}
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
    '<i>The creature escaped back into the ultra wormhole.</i>',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
    undefined,
    {
        hideTrainer: true,
        imageName: 'specialNPCs/Wormhole',
    }
);
TemporaryBattleList['Hau 5'] = new TemporaryBattle(
    'Hau 5',
    [
        new GymPokemon('Brionne', 88240962, 30, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Dartrix', 88240962, 30, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Torracat', 88240962, 30, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
        new GymPokemon('Flareon', 80032500, 28, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Vaporeon', 80032500, 28, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Leafeon', 80032500, 28, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))],
    undefined,
    {imageName: 'specialNPCs/Wormhole'}
);
TemporaryBattleList['Ultra Megalopolis'] = new TemporaryBattle(
    'Ultra Megalopolis',
    [new GymPokemon('Ultra Necrozma', 536098161, 60)],
    '<i>Necrozma fled.</i>',
    [new TemporaryBattleRequirement('Necrozma')],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('Mina\'s Trial').beginQuest(0, undefined, true);
        },
        hideTrainer: true,
        imageName: 'specialNPCs/Wormhole',
    }
);
TemporaryBattleList['Captain Mina'] = new TemporaryBattle(
    'Captain Mina',
    [
        new GymPokemon('Mawile', 189973142, 51),
        new GymPokemon('Granbull', 189973142, 51),
        new GymPokemon('Ribombee', 198608284, 51),
    ],
    'Woah! I\'m shocked at your strength! But you\'ve only just begun my real trial. Now you have to go around to all the captains in Alola!',
    [new TemporaryBattleRequirement('Ultra Megalopolis')],
    undefined,
    {imageName: 'Mina'}
);
TemporaryBattleList['Captain Ilima'] = new TemporaryBattle(
    'Captain Ilima',
    [
        new GymPokemon('Gumshoos', 189973142, 51),
        new GymPokemon('Smeargle', 189973142, 51),
        new GymPokemon('Komala', 198608284, 51),
    ],
    'Yes! You have emerged victorious! You and your Pokémon have become quite a delightful team! Off to Lush Jungle? It\'s been a while since I last visited Akala.',
    [
        new TemporaryBattleRequirement('Captain Mina'),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hau\'oli Cemetery')),
    ],
    undefined,
    {imageName: 'Ilima'}
);
TemporaryBattleList['Captain Mallow'] = new TemporaryBattle(
    'Captain Mallow',
    [
        new GymPokemon('Trevenant', 189973142, 51),
        new GymPokemon('Shiinotic', 189973142, 51),
        new GymPokemon('Tsareena', 198608284, 51),
    ],
    'Sure enough, when it comes to you and Pokémon, the quality of the ingredients shines forth! Once you defeat Lana do you want to go to Wela Volcano Park with two pretty pals like us?',
    [new TemporaryBattleRequirement('Captain Ilima')],
    undefined,
    {imageName: 'Mallow'}
);
TemporaryBattleList['Captain Lana'] = new TemporaryBattle(
    'Captain Lana',
    [
        new GymPokemon('Lanturn', 189973142, 51),
        new GymPokemon('Cloyster', 189973142, 51),
        new GymPokemon('Araquanid', 198608284, 51),
    ],
    'Well! Once again, you certainly reeled me in. Please have a good time with Kiawe.',
    [new TemporaryBattleRequirement('Captain Mallow')],
    undefined,
    {imageName: 'Lana'}
);
TemporaryBattleList['Captain Kiawe'] = new TemporaryBattle(
    'Captain Kiawe',
    [
        new GymPokemon('Arcanine', 189973142, 51),
        new GymPokemon('Talonflame', 189973142, 51),
        new GymPokemon('Alolan Marowak', 198608284, 51),
    ],
    'Not enough dancing! If you\'re hoping to complete Mina\'s trial, you should make for Hokulani Observatory next. Ula\'Ula is only a stone\'s throw away when Charizard is one of your Ride Pokémon!',
    [new TemporaryBattleRequirement('Captain Lana')],
    undefined,
    {imageName: 'Kiawe'}
);
TemporaryBattleList['Captain Sophocles'] = new TemporaryBattle(
    'Captain Sophocles',
    [
        new GymPokemon('Togedemaru', 189973142, 51),
        new GymPokemon('Magnezone', 189973142, 51),
        new GymPokemon('Alolan Golem', 198608284, 51),
    ],
    'I couldn\'t get it done. Don\'t worry about it, my precious Pokémon... You\'ve gotta finish Mina\'s trial, right? Are you going to Tapu Village?',
    [new TemporaryBattleRequirement('Captain Kiawe')],
    undefined,
    {imageName: 'Sophocles'}
);
TemporaryBattleList['Kahuna Nanu'] = new TemporaryBattle(
    'Kahuna Nanu',
    [
        new GymPokemon('Sableye', 189973142, 51),
        new GymPokemon('Absol', 189973142, 51),
        new GymPokemon('Alolan Persian', 198608284, 51),
    ],
    'Heh... You got me good, kid. Hope I don\'t get in trouble with the girl for this. You should go tell that young filly Mina that you\'re done with what she asked you to do.',
    [new TemporaryBattleRequirement('Captain Sophocles')],
    undefined,
    {imageName: 'Nanu'}
);
TemporaryBattleList['Gladion 3'] = new TemporaryBattle(
    'Gladion 3',
    [
        new GymPokemon('Crobat', 190138197, 53),
        new GymPokemon('Zoroark', 190138197, 53),
        new GymPokemon('Lucario', 190138197, 53),
        new GymPokemon('Silvally (Fire)', 209152017, 55, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Silvally (Water)', 209152017, 55, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Silvally (Grass)', 209152017, 55, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
    ],
    'You\'ve got good Pokémon. I know what kind of Trainer you are now. And what kind of journey you\'ve been through.',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)],
    undefined,
    {
        displayName: 'Pokémon Trainer Gladion',
        returnTown: 'Tapu Village',
        imageName: 'Gladion',
    }
);
TemporaryBattleList['Guzma Bug Memory'] = new TemporaryBattle(
    'Guzma Bug Memory',
    [
        new GymPokemon('Golisopod', 225357859, 63),
        new GymPokemon('Ariados', 225357859, 63),
        new GymPokemon('Masquerain', 225357859, 63),
        new GymPokemon('Pinsir', 225357859, 63),
        new GymPokemon('Scizor', 225357859, 63),
    ],
    'That was a good beat-down, Champion! You sure wrecked me again. This just proves how much of a tough trainer you are. Here is the Memory you\'ve been looking for. </br><img src="assets/images/items/quest/Bug_Memory_Silvally.png"></br><i>You obtained a Bug Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 19)],
    undefined,
    {
        displayName: 'Guzma',
        imageName: 'Team Skull Boss (guzma)',
    }
);
TemporaryBattleList['Kahili Flying Memory'] = new TemporaryBattle(
    'Kahili Flying Memory',
    [
        new GymPokemon('Skarmory', 231357859, 63),
        new GymPokemon('Crobat', 231357859, 63),
        new GymPokemon('Oricorio (Baile)', 231357859, 63),
        new GymPokemon('Mandibuzz', 231357859, 63),
        new GymPokemon('Toucannon', 231357859, 63),
    ],
    'You\'re pretty talented, $playername$! No wonder you\'ve become the Champion of Alola! Anyways, here is the Memory. I said I\'d give it to you. </br><img src="assets/images/items/quest/Flying_Memory_Silvally.png"></br><i>You obtained a Flying Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 21)],
    undefined,
    {
        displayName: 'Kahili',
        imageName: 'Kahili',
    }
);
TemporaryBattleList['Plumeria Poison Memory'] = new TemporaryBattle(
    'Plumeria Poison Memory',
    [
        new GymPokemon('Gengar', 237357859, 63),
        new GymPokemon('Alolan Muk', 237357859, 63),
        new GymPokemon('Crobat', 237357859, 63),
        new GymPokemon('Toxapex', 237357859, 63),
        new GymPokemon('Salazzle', 237357859, 63),
    ],
    'You\'re pretty strong, $playername$. Maybe my Pokémon and I need to go through more together to deepen our friendship. Take the Memory with you, you deserve it. </br><img src="assets/images/items/quest/Poison_Memory_Silvally.png"></br><i>You obtained a Poison Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 23)],
    undefined,
    {
        displayName: 'Plumeria',
        imageName: 'Plumeria',
    }
);
TemporaryBattleList['Acerola Ghost Memory'] = new TemporaryBattle(
    'Acerola Ghost Memory',
    [
        new GymPokemon('Banette', 243357859, 63),
        new GymPokemon('Drifblim', 243357859, 63),
        new GymPokemon('Dhelmise', 243357859, 63),
        new GymPokemon('Froslass', 243357859, 63),
        new GymPokemon('Palossand', 243357859, 63),
    ],
    'That was so much fun, $playername$! I hope you come by more times so we can battle more often! Anyways, here is the Memory Mimikyu had found. </br><img src="assets/images/items/quest/Ghost_Memory_Silvally.png"></br><i>You obtained a Ghost Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 25)],
    undefined,
    {
        displayName: 'Captain Acerola',
        imageName: 'Acerola',
    }
);
TemporaryBattleList['Faba Psychic Memory'] = new TemporaryBattle(
    'Faba Psychic Memory',
    [
        new GymPokemon('Claydol', 249357859, 63),
        new GymPokemon('Bruxish', 249357859, 63),
        new GymPokemon('Alolan Raichu', 249357859, 63),
        new GymPokemon('Alakazam', 249357859, 63),
        new GymPokemon('Hypno', 249357859, 63),
    ],
    'You\'re still pretty strong after all that time since our last battle. Well, take this Memory. Now off with you! </br><img src="assets/images/items/quest/Psychic_Memory_Silvally.png"></br><i>You obtained a Psychic Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 27)],
    undefined,
    {
        displayName: 'Aether Branch Chief Faba',
        imageName: 'Aether Branch Chief (faba)',
    }
);
TemporaryBattleList['Molayne Steel Memory'] = new TemporaryBattle(
    'Molayne Steel Memory',
    [
        new GymPokemon('Klefki', 255357859, 63),
        new GymPokemon('Bisharp', 255357859, 63),
        new GymPokemon('Magnezone', 255357859, 63),
        new GymPokemon('Metagross', 255357859, 63),
        new GymPokemon('Alolan Dugtrio', 255357859, 63),
    ],
    'That was a good match! Thank you for helping me train in here and as a reward for being the first person to defeat me, you can take this strange disk! </br><img src="assets/images/items/quest/Steel_Memory_Silvally.png"></br><i>You obtained a Steel Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 29)],
    undefined,
    {
        displayName: 'Molayne',
        imageName: 'Molayne',
    }
);
TemporaryBattleList['Ryuki Dragon Memory'] = new TemporaryBattle(
    'Ryuki Dragon Memory',
    [
        new GymPokemon('Garchomp', 261357859, 63),
        new GymPokemon('Drampa', 261357859, 63),
        new GymPokemon('Turtonator', 261357859, 63),
        new GymPokemon('Dragonite', 261357859, 63),
        new GymPokemon('Kommo-o', 261357859, 63),
    ],
    'And the crowd goes wild! $playername$! You should come by my Gym someday! It\'s in Malie city on Ula\'ula Island right above the Poké Mart, can\'t miss it. What? You\'ve never seen it? It\'s totally there and a real thing! Anyways you can take this.. What was it\'s name? Oh, right. You can take this Memory with you. </br><img src="assets/images/items/quest/Dragon_Memory_Silvally.png"></br><i>You obtained a Dragon Silvally Memory!</i>',
    [new QuestLineStepCompletedRequirement('Typing some Memories', 31)],
    undefined,
    {
        displayName: 'Ryuki',
        imageName: 'Ryuki',
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
        imageName: 'Mina',
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
        imageName: 'Nanu',
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
        returnTown: 'A Tree Maybe',
        imageName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonByName('Pikachu (Partner Cap)');
        },
    }
);

TemporaryBattleList['Rainbow Rocket Grunt 1'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 1',
    [
        new GymPokemon('Golbat', 433000000, 100),
        new GymPokemon('Raticate', 433000000, 100),
        new GymPokemon('Persian', 450000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Aether Paradise',
        imageName: 'Team Rainbow Rocket Grunt (female)',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 2'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 2',
    [
        new GymPokemon('Weezing', 433000000, 100),
        new GymPokemon('Electrode', 433000000, 100),
        new GymPokemon('Cloyster', 450000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Aether Paradise',
        imageName: 'Team Rainbow Rocket Grunt (male)',
    }
);

TemporaryBattleList['Aether Branch Chief Faba'] = new TemporaryBattle(
    'Aether Branch Chief Faba',
    [
        new GymPokemon('Claydol', 450000000, 60),
        new GymPokemon('Bruxish', 450000000, 60),
        new GymPokemon('Hypno', 480000000, 60),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0)],
    undefined,
    {
        imageName: 'Aether Branch Chief (faba)',
    }
);

TemporaryBattleList['Team Aqua Leader Archie'] = new TemporaryBattle(
    'Team Aqua Leader Archie',
    [
        new GymPokemon('Mightyena', 270000000, 60),
        new GymPokemon('Crobat', 270000000, 60),
        new GymPokemon('Muk', 270000000, 60),
        new GymPokemon('Sharpedo', 270000000, 60),
        new GymPokemon('Kyogre', 300000000, 60),
    ],
    'You\'ve made your point. I can see you are not one to be trifled with.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 1)],
    undefined,
    {
        imageName: 'Aqua Leader',
    }
);

TemporaryBattleList['Team Magma Leader Maxie'] = new TemporaryBattle(
    'Team Magma Leader Maxie',
    [
        new GymPokemon('Mightyena', 270000000, 60),
        new GymPokemon('Crobat', 270000000, 60),
        new GymPokemon('Weezing', 270000000, 60),
        new GymPokemon('Camerupt', 270000000, 60),
        new GymPokemon('Groudon', 300000000, 60),
    ],
    'I fell behind, but only by an inch.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 1)],
    undefined,
    {
        imageName: 'Magma Leader',
    }
);

TemporaryBattleList['Team Galactic Leader Cyrus'] = new TemporaryBattle(
    'Team Galactic Leader Cyrus',
    [
        new GymPokemon('Houndoom', 225000000, 60),
        new GymPokemon('Honchkrow', 225000000, 60),
        new GymPokemon('Crobat', 225000000, 60),
        new GymPokemon('Weavile', 225000000, 60),
        new GymPokemon('Dialga', 240000000, 60),
        new GymPokemon('Palkia', 240000000, 60),
    ],
    'Impressive. Your prowess is notable.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 2)],
    undefined,
    {
        imageName: 'Galactic Boss (cyrus)',
    }
);

TemporaryBattleList['Team Flare Leader Lysandre'] = new TemporaryBattle(
    'Team Flare Leader Lysandre',
    [
        new GymPokemon('Mienshao', 225000000, 60),
        new GymPokemon('Pyroar', 225000000, 60),
        new GymPokemon('Honchkrow', 225000000, 60),
        new GymPokemon('Mega Gyarados', 225000000, 60),
        new GymPokemon('Xerneas', 240000000, 60),
        new GymPokemon('Yveltal', 240000000, 60),
    ],
    'I can feel the fire of your convictions burning deep within your heart!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 3)],
    undefined,
    {
        imageName: 'Team Flare Lysandre',
    }
);

TemporaryBattleList['Team Plasma Leader Ghetsis'] = new TemporaryBattle(
    'Team Plasma Leader Ghetsis',
    [
        new GymPokemon('Cofagrigus', 225000000, 60),
        new GymPokemon('Bouffalant', 225000000, 60),
        new GymPokemon('Bisharp', 225000000, 60),
        new GymPokemon('Hydreigon', 225000000, 60),
        new GymPokemon('Zekrom', 240000000, 60),
        new GymPokemon('Reshiram', 240000000, 60),
    ],
    'I couldn\'t have been defeated by some random Trainer from who knows where!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 4)],
    undefined,
    {
        imageName: 'Ghetsis',
    }
);

TemporaryBattleList['Team Rainbow Leader Giovanni'] = new TemporaryBattle(
    'Team Rainbow Leader Giovanni',
    [
        new GymPokemon('Dugtrio', 230000000, 60),
        new GymPokemon('Nidoking', 230000000, 60),
        new GymPokemon('Nidoqueen', 230000000, 60),
        new GymPokemon('Rhyperior', 230000000, 60),
        new GymPokemon('Mega Mewtwo X', 245000000, 60),
        new GymPokemon('Mega Mewtwo Y', 245000000, 60),
    ],
    'Ha! That was a truly intense fight!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 5)]
);


// Magikarp Jump Temp Battles
TemporaryBattleList['Magikarp Jump Koylee'] = new TemporaryBattle(
    'Magikarp Jump Koylee',
    [new GymPokemon('Magikarp Calico (Orange, White)', 1215000, 20)],
    'Your scales are full of heart!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 32)],
    undefined,
    {
        displayName: 'Koylee',
        imageName: 'Jump Champ Green',
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Calico (Orange, White)!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Calico (Orange, White)', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Karpella'] = new TemporaryBattle(
    'Magikarp Jump Karpella',
    [new GymPokemon('Magikarp Calico (Orange, White, Black)', 3037500, 20)],
    'Wow, you\'re the cream of the \'karp, alright!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 33)],
    undefined,
    {
        displayName: 'Karpella',
        imageName: 'Jump Champ Red',
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Calico (Orange, White, Black)!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Calico (Orange, White, Black)', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Karpen'] = new TemporaryBattle(
    'Magikarp Jump Karpen',
    [new GymPokemon('Magikarp Calico (White, Orange)', 3206250, 20)],
    'Are you sure your Karp isn\'t flying-type?',
    [new TemporaryBattleRequirement('Magikarp Jump Karpella')],
    undefined,
    {
        displayName: 'Karpen',
        imageName: 'Jump Champ Green',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 33),
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Calico (White, Orange)!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Calico (White, Orange)', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Tykarp'] = new TemporaryBattle(
    'Magikarp Jump Tykarp',
    [new GymPokemon('Magikarp Calico (Orange, White)', 4860000, 20)],
    'I lost because of my karpal tunnel...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 34)],
    undefined,
    {
        displayName: 'Tykarp',
        imageName: 'Jump Champ Blue',
    }
);

TemporaryBattleList['Magikarp Jump Karpress'] = new TemporaryBattle(
    'Magikarp Jump Karpress',
    [new GymPokemon('Magikarp Calico (Orange, White, Black)', 5130000, 20)],
    '<i>Basculin</i> the glory while you can, I\'ll get you next time! Wahaa!',
    [new TemporaryBattleRequirement('Magikarp Jump Tykarp')],
    undefined,
    {
        displayName: 'Karpress',
        imageName: 'Jump Champ Red',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 34),
    }
);

TemporaryBattleList['Magikarp Jump Karami'] = new TemporaryBattle(
    'Magikarp Jump Karami',
    [new GymPokemon('Magikarp Calico (Orange, White)', 9112500, 20)],
    'Well, it\'s oh-fish-ial! You win!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 35)],
    undefined,
    {
        displayName: 'Karami',
        imageName: 'Jump Champ Green',
    }
);

TemporaryBattleList['Magikarp Jump Karson'] = new TemporaryBattle(
    'Magikarp Jump Karson',
    [new GymPokemon('Magikarp Skelly', 9618750, 20)],
    'Hey, would you mind letting minnow when you want to rematch?',
    [new TemporaryBattleRequirement('Magikarp Jump Karami')],
    undefined,
    {
        displayName: 'Karson',
        imageName: 'Jump Champ Blue',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 35),
    }
);

TemporaryBattleList['Magikarp Jump Karpress 2'] = new TemporaryBattle(
    'Magikarp Jump Karpress 2',
    [new GymPokemon('Magikarp Calico (Orange, White)', 12150000, 20)],
    'I\'m fin-ished...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 36)],
    undefined,
    {
        displayName: 'Karpress',
        imageName: 'Jump Champ Red',
    }
);

TemporaryBattleList['Magikarp Jump Karpen 2'] = new TemporaryBattle(
    'Magikarp Jump Karpen 2',
    [new GymPokemon('Magikarp Calico (White, Orange)', 12825000, 20)],
    'Magikarp is so classy, it\'s so-fish-ticated',
    [new TemporaryBattleRequirement('Magikarp Jump Karpress 2')],
    undefined,
    {
        displayName: 'Karpen',
        imageName: 'Jump Champ Green',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 36),
    }
);

TemporaryBattleList['Magikarp Jump Karbuck'] = new TemporaryBattle(
    'Magikarp Jump Karbuck',
    [new GymPokemon('Magikarp Calico (Orange, Gold)', 13095000, 20)],
    'That battle scared the karp out of me!',
    [new TemporaryBattleRequirement('Magikarp Jump Karpen 2')],
    undefined,
    {
        displayName: 'Karbuck',
        imageName: 'Jump Champ Blue',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 36),
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Calico (Orange, Gold)!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Calico (Orange, Gold)', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Skyhopper'] = new TemporaryBattle(
    'Magikarp Jump Skyhopper',
    [new GymPokemon('Magikarp Calico (Orange, White)', 18225000, 20)],
    'I will jump away from this battle!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 37)],
    undefined,
    {
        displayName: 'Skyhopper',
        imageName: 'Jump Champ Red',
    }
);

TemporaryBattleList['Magikarp Jump Karpen 3'] = new TemporaryBattle(
    'Magikarp Jump Karpen 3',
    [new GymPokemon('Magikarp Skelly', 19237500, 20)],
    'Are you trying to fly to the stratosphere?',
    [new TemporaryBattleRequirement('Magikarp Jump Skyhopper')],
    undefined,
    {
        displayName: 'Karpen',
        imageName: 'Jump Champ Blue',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 37),
    }
);

TemporaryBattleList['Magikarp Jump Karpella 2'] = new TemporaryBattle(
    'Magikarp Jump Karpella 2',
    [new GymPokemon('Magikarp Calico (Orange, White, Black)', 19642500, 20)],
    'I hate fish puns...',
    [new TemporaryBattleRequirement('Magikarp Jump Karpen 3')],
    undefined,
    {
        displayName: 'Karpella',
        imageName: 'Jump Champ Green',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 37),
    }
);

TemporaryBattleList['Magikarp Jump Karbuck 2'] = new TemporaryBattle(
    'Magikarp Jump Karbuck 2',
    [new GymPokemon('Magikarp Calico (Orange, White)', 24300000, 20)],
    'I wish a Pidgeotto would steal me away about now...',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 38)],
    undefined,
    {
        displayName: 'Karbuck',
        imageName: 'Jump Champ Red',
    }
);

TemporaryBattleList['Magikarp Jump Kareign'] = new TemporaryBattle(
    'Magikarp Jump Kareign',
    [new GymPokemon('Magikarp Calico (White, Orange)', 25650000, 20)],
    'Wow, you\'ve been drinking your Training Sodas!',
    [new TemporaryBattleRequirement('Magikarp Jump Karbuck 2')],
    undefined,
    {
        displayName: 'Kareign',
        imageName: 'Jump Champ Blue',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 38),
    }
);

TemporaryBattleList['Magikarp Jump Koylee 2'] = new TemporaryBattle(
    'Magikarp Jump Koylee 2',
    [new GymPokemon('Magikarp Calico (Orange, White, Black)', 26190000, 20)],
    'I need to find more sunken treasures...',
    [new TemporaryBattleRequirement('Magikarp Jump Kareign')],
    undefined,
    {
        displayName: 'Koylee',
        imageName: 'Jump Champ Green',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 38),
    }
);

TemporaryBattleList['Magikarp Jump Karpress 3'] = new TemporaryBattle(
    'Magikarp Jump Karpress 3',
    [new GymPokemon('Magikarp Grey Diamonds', 36450000, 20)],
    'You cheater! I have seen Rowlet giving you money!!!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 39)],
    undefined,
    {
        displayName: 'Karpress',
        imageName: 'Jump Champ Blue',
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Grey Diamonds!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Grey Diamonds', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Karpen 4'] = new TemporaryBattle(
    'Magikarp Jump Karpen 4',
    [new GymPokemon('Magikarp Brown Tiger', 38475000, 20)],
    'My Magikarp might not jump high but it\'s fast enough to win the Naskarp Cup.',
    [new TemporaryBattleRequirement('Magikarp Jump Karpress 3')],
    undefined,
    {
        displayName: 'Karpen',
        imageName: 'Jump Champ Red',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 39),
    }
);

TemporaryBattleList['Magikarp Jump Karpella 3'] = new TemporaryBattle(
    'Magikarp Jump Karpella 3',
    [new GymPokemon('Magikarp Purple Patches', 39285000, 20)],
    'I will beat you next time! Any fin is possible if you believe in it!',
    [new TemporaryBattleRequirement('Magikarp Jump Karpen 4')],
    undefined,
    {
        displayName: 'Karpella',
        imageName: 'Jump Champ Green',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 39),
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Purple Patches!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Purple Patches', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

TemporaryBattleList['Magikarp Jump Skyhopper 2'] = new TemporaryBattle(
    'Magikarp Jump Skyhopper 2',
    [new GymPokemon('Magikarp Calico (Orange, Gold)', 48600000, 20)],
    'Who wants to place a bait on a rematch?',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 40)],
    undefined,
    {
        displayName: 'Skyhopper',
        imageName: 'Jump Champ Blue',
    }
);

TemporaryBattleList['Magikarp Jump Tykarp 2'] = new TemporaryBattle(
    'Magikarp Jump Tykarp 2',
    [new GymPokemon('Magikarp Black Mask', 51300000, 20)],
    'The way my Magikarp performed is a-trout-cious!',
    [new TemporaryBattleRequirement('Magikarp Jump Skyhopper 2')],
    undefined,
    {
        displayName: 'Tykarp',
        imageName: 'Jump Champ Red',
        visibleRequirement: new RouteKillRequirement(10, GameConstants.Region.alola, 40),
        firstTimeRewardFunction: () => {
            Notifier.notify({
                message: 'You were awarded a Magikarp Black Mask!',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
            App.game.party.gainPokemonByName('Magikarp Black Mask', PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD), true);
        },
    }
);

//Galar Temporary Battles
TemporaryBattleList['Hop 1'] = new TemporaryBattle(
    'Hop 1',
    [
        new GymPokemon('Wooloo', 96928085, 3),
        new GymPokemon('Sobble', 105005426, 5, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Grookey', 105005426, 5, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Scorbunny', 105005426, 5, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
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
        new GymPokemon('Zacian (Battle Hero)', 114428989, 70),
        new GymPokemon('Zamazenta (Battle Hero)', 114428989, 70),
    ],
    '<i>The Pokémon fled.</i>',
    [new TemporaryBattleRequirement('Hop 1')],
    undefined,
    {
        hideTrainer: true,
        imageName: 'specialNPCs/Mirages',
    }
);
TemporaryBattleList['Hop 2'] = new TemporaryBattle(
    'Hop 2',
    [
        new GymPokemon('Wooloo', 88822988, 6),
        new GymPokemon('Rookidee', 88822988, 5),
        new GymPokemon('Sobble', 91598706, 8, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Grookey', 91598706, 8, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Scorbunny', 91598706, 8, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
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
        new GymPokemon('Sobble', 105348195, 14, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Grookey', 105348195, 14, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Scorbunny', 105348195, 14, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
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
        new GymPokemon('Solosis', 110628515, 13),
        new GymPokemon('Gothita', 110628515, 15),
        new GymPokemon('Hatenna', 113980895, 16),
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
        new GymPokemon('Drizzile', 149566454, 21, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Thwackey', 149566454, 21, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Raboot', 149566454, 21, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
    ],
    'We both got ourselves the same Grass Badge, so how come you\'re so much stronger?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 14)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Turffield',
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
        new GymPokemon('Drizzile', 190296915, 33, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Thwackey', 190296915, 33, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Raboot', 190296915, 33, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
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
    [new QuestLineStepCompletedRequirement('The Darkest Day', 0)],
    undefined,
    {
        displayName: 'Pokémon Trainer Bede',
        returnTown: 'Stow-on-Side',
        imageName: 'Bede',
    }
);
TemporaryBattleList['Hop 6'] = new TemporaryBattle(
    'Hop 6',
    [
        new GymPokemon('Trevenant', 164138786, 34),
        new GymPokemon('Heatmor', 164138786, 34),
        new GymPokemon('Snorlax', 164138786, 35),
        new GymPokemon('Boltund', 164138786, 35),
        new GymPokemon('Inteleon', 169087694, 37, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Rillaboom', 169087694, 37, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Cinderace', 169087694, 37, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
    ],
    'This is rubbish... My team can\'t perform if I can\'t get my own head straight as their Trainer...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)],
    undefined,
    {
        displayName: 'Pokémon Trainer Hop',
        returnTown: 'Hammerlocke',
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
        new GymPokemon('Inteleon', 174748273, 41, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Rillaboom', 174748273, 41, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Cinderace', 174748273, 41, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
    ],
    'I still can\'t even beat you, my true rival... But I think I\'m starting to see the light!',
    [
        new MultiRequirement([
            new TemporaryBattleRequirement('Hop 6'),
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
        returnTown: 'Circhester',
        imageName: 'Marnie',
    }
);
TemporaryBattleList.Eternatus = new TemporaryBattle(
    'Eternatus',
    [new GymPokemon('Eternatus', 1454990842, 60)],
    '<i>You defeated Eternatus, but it looks like it\'s not over yet!</i>',
    [new QuestLineStepCompletedRequirement('The Darkest Day', 16)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/890',
    }
);
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 1567895148, 60)],
    '<b><i>You finally defeated Eternatus!</i></b>',
    [new TemporaryBattleRequirement('Eternatus')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/890',
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
        new GymPokemon('Inteleon', 375642238, 60, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Rillaboom', 375642238, 60, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Cinderace', 375642238, 60, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
    ],
    'I didn\'t expect there to be such a gap between you and me, mate...',
    [new QuestLineStepCompletedRequirement('Sword and Shield', 0)],
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
    [new QuestLineStepCompletedRequirement('Sword and Shield', 2)],
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
    [new QuestLineStepCompletedRequirement('Sword and Shield', 2)],
    undefined,
    {
        displayName: 'Pokémon Trainer Shielbert',
        imageName: 'Shielbert',
    }
);
TemporaryBattleList['Rampaging Tsareena'] = new TemporaryBattle(
    'Rampaging Tsareena',
    [new GymPokemon('Tsareena', 1757548771, 60)],
    '<i>The Rampaging Tsareena fainted.</i>',
    [new QuestLineStepCompletedRequirement('Sword and Shield', 3)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/763',
    }
);
TemporaryBattleList['Rampaging Gyarados'] = new TemporaryBattle(
    'Rampaging Gyarados',
    [new GymPokemon('Gyarados', 1757548771, 60)],
    '<i>The Rampaging Gyarados fainted.</i>',
    [new TemporaryBattleRequirement('Rampaging Tsareena')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/130',
    }
);
TemporaryBattleList['Rampaging Torkoal'] = new TemporaryBattle(
    'Rampaging Torkoal',
    [new GymPokemon('Torkoal', 1757548771, 60)],
    '<i>The Rampaging Torkoal fainted.</i>',
    [new TemporaryBattleRequirement('Rampaging Gyarados')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/324',
    }
);
TemporaryBattleList['Sordward & Shielbert'] = new TemporaryBattle(
    'Sordward & Shielbert',
    [
        new GymPokemon('Golisopod', 298548951, 62),
        new GymPokemon('Bronzong', 298548951, 62),
        new GymPokemon('Doublade', 298548951, 62),
        new GymPokemon('Falinks', 298548951, 62),
        new GymPokemon('Bisharp', 310734622, 62),
        new GymPokemon('Klinklang', 310734622, 62),
    ],
    'Quite the vexing predicament indeed, surely this must be some kind of mistake...',
    [new QuestLineStepCompletedRequirement('Sword and Shield', 7)]
);
TemporaryBattleList['Rampaging Conkeldurr'] = new TemporaryBattle(
    'Rampaging Conkeldurr',
    [new GymPokemon('Conkeldurr', 1917325934, 60)],
    '<i>The Rampaging Conkeldurr fainted.</i>',
    [new TemporaryBattleRequirement('Sordward & Shielbert')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/534',
    }
);
TemporaryBattleList['Rampaging Dusknoir'] = new TemporaryBattle(
    'Rampaging Dusknoir',
    [new GymPokemon('Dusknoir', 1917325934, 60)],
    '<i>The Rampaging Dusknoir fainted.</i>',
    [new TemporaryBattleRequirement('Sordward & Shielbert')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/477',
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
    'Thank you for the battle. I can now accept you as the Champion. It\'s painful to admit, but I\'ve come to realise a few of my weaknesses. But I\'ll keep getting stronger. I\'ll reach the pinnacle of what Fairy types can do.',
    [
        new TemporaryBattleRequirement('Rampaging Conkeldurr'),
        new TemporaryBattleRequirement('Rampaging Dusknoir'),
    ],
    undefined,
    {imageName: 'Gym Leader Bede'}
);
TemporaryBattleList['Rampaging Gigalith'] = new TemporaryBattle(
    'Rampaging Gigalith',
    [new GymPokemon('Gigalith', 1917325934, 60)],
    '<i>The Rampaging Gigalith fainted.</i>',
    [new TemporaryBattleRequirement('Gym Leader Bede')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/526',
    }
);
TemporaryBattleList['Rampaging Froslass'] = new TemporaryBattle(
    'Rampaging Froslass',
    [new GymPokemon('Froslass', 1917325934, 60)],
    '<i>The Rampaging Froslass fainted.</i>',
    [new TemporaryBattleRequirement('Gym Leader Bede')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/478',
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
    '<i>The Rampaging Haxorus fainted.</i>',
    [new TemporaryBattleRequirement('Gym Leader Marnie')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/612',
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
    [new QuestLineStepCompletedRequirement('Sword and Shield', 14)],
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
    [new QuestLineStepCompletedRequirement('Sword and Shield', 14)],
    undefined,
    {
        displayName: 'Pokémon Trainer Shielbert',
        imageName: 'Shielbert',
    }
);
TemporaryBattleList['Rampaging Zacian'] = new TemporaryBattle(
    'Rampaging Zacian',
    [new GymPokemon('Zacian (Crowned Sword)', 2357932001, 70)],
    '<i>Zacian fainted.</i>',
    [new QuestLineStepCompletedRequirement('Sword and Shield', 16)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/888.01',
    }
);
TemporaryBattleList['Rampaging Zamazenta'] = new TemporaryBattle(
    'Rampaging Zamazenta',
    [new GymPokemon('Zamazenta (Crowned Shield)', 2357932001, 70)],
    '<i>Zamazenta fainted.</i>',
    [new QuestLineStepCompletedRequirement('Sword and Shield', 16)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/889.01',
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
    [new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 0)],
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
        new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 6),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
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
        new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 6),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
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
    [new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 9)],
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
    [new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 9)],
    undefined,
    {
        displayName: 'Pokémon Trainer Avery',
        returnTown: 'Master Dojo',
        imageName: 'Avery',
    }
);
TemporaryBattleList.Kubfu = new TemporaryBattle(
    'Kubfu',
    [new GymPokemon('Kubfu', 1886555626, 50)],
    undefined,
    [new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 11)],
    [new ObtainedPokemonRequirement('Kubfu')],
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/891',
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
        imageName: 'specialNPCs/Zarude Tribe',
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
        imageName: 'specialNPCs/Zarude Tribe',
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
        imageName: 'specialNPCs/Zarude Tribe',
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
        imageName: '../pokemon/893.01',
    }
);
TemporaryBattleList['Flowering Celebi'] = new TemporaryBattle(
    'Flowering Celebi',
    [new GymPokemon('Flowering Celebi', 2132963238, 100)],
    'Cel Cel! Celebi!',
    [new QuestLineStepCompletedRequirement('Secrets of the Jungle', 12)],
    [new ObtainedPokemonRequirement('Flowering Celebi')],
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/251.01',
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
        imageName: 'Peony',
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
        imageName: '../pokemon/898',
    }
);
TemporaryBattleList.Glastrier = new TemporaryBattle(
    'Glastrier',
    [new GymPokemon('Glastrier', 2031393560, 75)],
    '<i>The Pokémon ran away!</i>',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 4)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/896',
    }
);
TemporaryBattleList.Spectrier = new TemporaryBattle(
    'Spectrier',
    [new GymPokemon('Spectrier', 2031393560, 75)],
    '<i>The Pokémon ran away!</i>',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 4)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/897',
    }
);
TemporaryBattleList['Dyna Tree Birds'] = new TemporaryBattle(
    'Dyna Tree Birds',
    [
        new GymPokemon('Galarian Articuno', 710987746, 70),
        new GymPokemon('Galarian Zapdos', 710987746, 70),
        new GymPokemon('Galarian Moltres', 710987746, 70),
    ],
    '<i>The legendary birds fled in different directions.</i>',
    [new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 1)],
    undefined,
    {
        hideTrainer: true,
        returnTown: 'Dyna Tree Hill',
        imageName: 'specialNPCs/Dyna Tree Birds',
    }
);
TemporaryBattleList['Galarian Articuno 1'] = new TemporaryBattle(
    'Galarian Articuno 1',
    [new GymPokemon('Galarian Articuno', 2031393560, 100)],
    '<i>Galarian Articuno fled to elsewhere in the Crown Tundra.</i>',
    [
        new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Roaring-Sea Caves')),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Articuno',
        returnTown: 'Roaring-Sea Caves',
        imageName: '../pokemon/144.01',
        visibleRequirement: new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3),
    }
);
TemporaryBattleList['Galarian Articuno 2'] = new TemporaryBattle(
    'Galarian Articuno 2',
    [new GymPokemon('Galarian Articuno', 2031393560, 100)],
    '<i>Galarian Articuno fled to elsewhere in the Crown Tundra.</i>',
    [
        new TemporaryBattleRequirement('Galarian Articuno 1'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 51),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Articuno',
        returnTown: 'Roaring-Sea Caves',
        imageName: '../pokemon/144.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Articuno 1'),
    }
);
TemporaryBattleList['Galarian Articuno 3'] = new TemporaryBattle(
    'Galarian Articuno 3',
    [new GymPokemon('Galarian Articuno', 2031393560, 100)],
    '<i>Galarian Articuno fled to elsewhere in the Crown Tundra.</i>',
    [
        new TemporaryBattleRequirement('Galarian Articuno 2'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 55),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Articuno',
        returnTown: 'Tunnel to the Top',
        imageName: '../pokemon/144.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Articuno 2'),

    }
);
TemporaryBattleList['Galarian Zapdos 1'] = new TemporaryBattle(
    'Galarian Zapdos 1',
    [new GymPokemon('Galarian Zapdos', 2031393560, 100)],
    '<i>Galarian Zapdos fled to elsewhere in the Wild Area.</i>',
    [new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3)],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Zapdos',
        returnTown: 'Motostoke',
        imageName: '../pokemon/145.01',
    }
);
TemporaryBattleList['Galarian Zapdos 2'] = new TemporaryBattle(
    'Galarian Zapdos 2',
    [new GymPokemon('Galarian Zapdos', 2031393560, 100)],
    '<i>Galarian Zapdos fled to elsewhere in the Wild Area.</i>',
    [
        new TemporaryBattleRequirement('Galarian Zapdos 1'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 19),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Zapdos',
        returnTown: 'Dusty Bowl',
        imageName: '../pokemon/145.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Zapdos 1'),
    }
);
TemporaryBattleList['Galarian Zapdos 3'] = new TemporaryBattle(
    'Galarian Zapdos 3',
    [new GymPokemon('Galarian Zapdos', 2031393560, 100)],
    '<i>Galarian Zapdos fled to elsewhere in the Wild Area.</i>',
    [
        new TemporaryBattleRequirement('Galarian Zapdos 2'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 7),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Zapdos',
        returnTown: 'Motostoke',
        imageName: '../pokemon/145.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Zapdos 2'),
    }
);
TemporaryBattleList['Galarian Moltres 1'] = new TemporaryBattle(
    'Galarian Moltres 1',
    [new GymPokemon('Galarian Moltres', 2031393560, 100)],
    '<i>Galarian Moltres fled to elsewhere in the Isle of Armor.</i>',
    [
        new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3),
        new RouteKillRequirement(10, GameConstants.Region.galar, 37),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Moltres',
        returnTown: 'Courageous Cavern',
        imageName: '../pokemon/146.01',
        visibleRequirement: new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3),
    }
);
TemporaryBattleList['Galarian Moltres 2'] = new TemporaryBattle(
    'Galarian Moltres 2',
    [new GymPokemon('Galarian Moltres', 2031393560, 100)],
    '<i>Galarian Moltres fled to elsewhere in the Isle of Armor.</i>',
    [
        new TemporaryBattleRequirement('Galarian Moltres 1'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 41),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Moltres',
        returnTown: 'Master Dojo',
        imageName: '../pokemon/146.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Moltres 1'),
    }
);
TemporaryBattleList['Galarian Moltres 3'] = new TemporaryBattle(
    'Galarian Moltres 3',
    [new GymPokemon('Galarian Moltres', 2031393560, 100)],
    '<i>Galarian Moltres fled to elsewhere in the Isle of Armor.</i>',
    [
        new TemporaryBattleRequirement('Galarian Moltres 2'),
        new RouteKillRequirement(10, GameConstants.Region.galar, 34),
    ],
    undefined,
    {
        hideTrainer: true,
        displayName: 'Galarian Moltres',
        returnTown: 'Master Dojo',
        imageName: '../pokemon/146.01',
        visibleRequirement: new TemporaryBattleRequirement('Galarian Moltres 2'),
    }
);
TemporaryBattleList.Regigigas = new TemporaryBattle(
    'Regigigas',
    [new GymPokemon('Regigigas', 2031393560, 100)],
    '<i>The ancient giant was defeated!</i>',
    [new QuestLineStepCompletedRequirement('The Ancient Golems', 6)],
    [new QuestLineStepCompletedRequirement('The Ancient Golems', 7)],
    {
        hideTrainer: true,
        isTrainerBattle: false,
        returnTown: 'Freezington',
        imageName: '../pokemon/486',
    }
);

// Hisui Temporary Battles
TemporaryBattleList['Volo 1'] = new TemporaryBattle(
    'Volo 1',
    [new GymPokemon('Togepi', 348526193, 5)],
    'Moves, items... Use them well, and the world will open up to you!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Ginkgo Guild Member Volo',
        imageName: 'Volo (Ginkgo)',
    }
);
TemporaryBattleList['Akari 1'] = new TemporaryBattle(
    'Akari 1',
    [new GymPokemon('Pikachu', 348526193, 9)],
    'You and your Pokémon seem completely in step with one another.',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'The Survey Corps\' Akari',
        imageName: 'Akari',
    }
);
TemporaryBattleList['Warden Mai'] = new TemporaryBattle(
    'Warden Mai',
    [new GymPokemon('Munchlax', 348526193, 10)],
    'You really aren\'t one of the usual Galaxy buffoons if you could defeat my partner... Well fought, Munchlax.',
    [new DevelopmentRequirement()],
    undefined,
    {
        imageName: 'Mai',
    }
);
TemporaryBattleList['Alpha Kricketune'] = new TemporaryBattle(
    'Alpha Kricketune',
    [new GymPokemon('Kricketune', 2031393560, 12)],
    'You defeated Kricketune!',
    [new DevelopmentRequirement()],
    undefined,
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/402',
    }
);
TemporaryBattleList['Warden Lian'] = new TemporaryBattle(
    'Warden Lian',
    [new GymPokemon('Goomy', 348526193, 15)],
    'H-how can this be...',
    [new DevelopmentRequirement()],
    undefined,
    {
        imageName: 'Lian',
    }
);
TemporaryBattleList['Irida 1'] = new TemporaryBattle(
    'Irida 1',
    [new GymPokemon('Glaceon', 348526193, 17)],
    'I see now... Poké Balls are simply your tool of choice, not products of disregard for Pokémon. You still understand the Pokémon and trust them as partners. I feel better putting my trust in you now, I think.',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Clan Leader Irida',
        imageName: 'Irida',
    }
);
TemporaryBattleList['Lord of the Woods: Kleavor'] = new TemporaryBattle(
    'Lord of the Woods: Kleavor',
    [new GymPokemon('Noble Kleavor', 2031393560, 18)],
    'The golden light was dispelled from Kleavor, calming it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/900.01',
    }
);
TemporaryBattleList['Akari 2'] = new TemporaryBattle(
    'Akari 2',
    [new GymPokemon('Pikachu', 348526193, 9)],
    'Oops! I keep finding myself caught up in observing the way the Pokémon use their moves...',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'The Survey Corps\' Akari',
        imageName: 'Akari',
    }
);
TemporaryBattleList['Volo 2'] = new TemporaryBattle(
    'Volo 2',
    [
        new GymPokemon('Togepi', 348526193, 22),
        new GymPokemon('Gible', 348526193, 22),
    ],
    'Oh, my! You\'re quite adept at instructing your Pokémon in battle! My goodness, that was fun!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Ginkgo Guild Member Volo',
        imageName: 'Volo (Ginkgo)',
    }
);
TemporaryBattleList['Coin 1'] = new TemporaryBattle(
    'Coin 1',
    [new GymPokemon('Toxicroak', 348526193, 23)],
    'I\'m not fond of this outcome, but at least it\'s still better than plowing fields for the Galaxy Team!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'The Bandit Coin',
        imageName: 'Coin',
    }
);
TemporaryBattleList.Ursaluna = new TemporaryBattle(
    'Ursaluna',
    [new GymPokemon('Ursaluna', 2031393560, 26)],
    'You defeated Ursaluna!',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/901',
    }
);
TemporaryBattleList['Lady of the Ridge: Lilligant'] = new TemporaryBattle(
    'Lady of the Ridge: Lilligant',
    [new GymPokemon('Noble Lilligant', 2031393560, 30)],
    'The golden light was dispelled from Lilligant, calming it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/549.02',
    }
);
TemporaryBattleList['Irida 2'] = new TemporaryBattle(
    'Irida 2',
    [
        new GymPokemon('Eevee', 348526193, 15),
        new GymPokemon('Glaceon', 348526193, 30),
    ],
    'Ah, now I feel better! The world is vast...and I am small within it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Clan Leader Irida',
        imageName: 'Irida',
    }
);
TemporaryBattleList.Clover = new TemporaryBattle(
    'Clover',
    [new GymPokemon('Abomasnow', 348526193, 35)],
    'I don\'t get it! How\'d I lose?!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'The Bandit Clover',
    }
);
TemporaryBattleList['Coin 2'] = new TemporaryBattle(
    'Coin 2',
    [new GymPokemon('Toxicroak', 348526193, 34)],
    'What a blithering mooncalf I am. How could I let myself lose...',
    [new TemporaryBattleRequirement('Clover')],
    undefined,
    {
        displayName: 'The Bandit Coin',
        imageName: 'Coin',
    }
);
TemporaryBattleList['Charm 1'] = new TemporaryBattle(
    'Charm 1',
    [
        new GymPokemon('Rhydon', 348526193, 34),
        new GymPokemon('Gengar', 348526193, 35),
    ],
    'What a disgrace...',
    [new TemporaryBattleRequirement('Coin 2')],
    undefined,
    {
        displayName: 'The Bandit Charm',
        imageName: 'Charm',
    }
);
TemporaryBattleList['Lord of the Isles: Arcanine'] = new TemporaryBattle(
    'Lord of the Isles: Arcanine',
    [new GymPokemon('Noble Arcanine', 2031393560, 36)],
    'The golden light was dispelled from Arcanine, calming it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/59.02',
    }
);
TemporaryBattleList['Adaman 1'] = new TemporaryBattle(
    'Adaman 1',
    [
        new GymPokemon('Eevee', 348526193, 18),
        new GymPokemon('Leafeon', 348526193, 36),
    ],
    'You see how good they are now, yes? No more sneering at them!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Clan Leader Adaman',
        imageName: 'Adaman',
    }
);
TemporaryBattleList['Melli 1'] = new TemporaryBattle(
    'Melli 1',
    [new GymPokemon('Skuntank', 348526193, 40)],
    'Listen here! Neither I nor Skuntank admit defeat to you just yet-our challenge to you still stands!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Warden Melli',
        imageName: 'Melli',
    }
);
TemporaryBattleList['Warden Ingo'] = new TemporaryBattle(
    'Warden Ingo',
    [
        new GymPokemon('Machoke', 348526193, 41),
        new GymPokemon('Tangela', 348526193, 41),
        new GymPokemon('Gliscor', 348526193, 42),
    ],
    'Bravo! Excellent! Your talent has brought you to the destination called Victory! Now, allow me to call Sneasler...',
    [new DevelopmentRequirement()],
    undefined,
    {
        imageName: 'Ingo',
    }
);
TemporaryBattleList['Melli 2'] = new TemporaryBattle(
    'Melli 2',
    [
        new GymPokemon('Skorupi', 348526193, 22),
        new GymPokemon('Zubat', 348526193, 22),
        new GymPokemon('Skuntank', 348526193, 44),
    ],
    'Let\'s make one thing clear: I didn\'t lose! You may have won...but there\'s a difference!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Warden Melli',
        imageName: 'Melli',
    }
);
TemporaryBattleList['Lord of the Hollow: Electrode'] = new TemporaryBattle(
    'Lord of the Hollow: Electrode',
    [new GymPokemon('Noble Electrode', 2031393560, 46)],
    'The golden light was dispelled from Electrode, calming it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/101.02',
    }
);
TemporaryBattleList['Warden Gaeric'] = new TemporaryBattle(
    'Warden Gaeric',
    [
        new GymPokemon('Froslass', 348526193, 24),
        new GymPokemon('Glalie', 348526193, 48),
    ],
    'Outstanding! I\'m tough as an iceberg, but you smashed me through and through!',
    [new DevelopmentRequirement()],
    undefined,
    {
        imageName: 'Gaeric',
    }
);
TemporaryBattleList['Warden Sabi'] = new TemporaryBattle(
    'Warden Sabi',
    [
        new GymPokemon('Electivire', 348526193, 30),
        new GymPokemon('Magmortar', 348526193, 30),
        new GymPokemon('Rhyperior', 348526193, 50),
    ],
    'Wow, you caught us AND you beat us. You\'ve won all our games so far! But Braviary still wants to get to know you even better. Up to the roof we go! All right, Braviary! Why not test out their strength for yourself?',
    [new DevelopmentRequirement()],
    undefined,
    {
        imageName: 'Sabi',
    }
);
TemporaryBattleList['Hisuian Braviary'] = new TemporaryBattle(
    'Hisuian Braviary',
    [new GymPokemon('Hisuian Braviary', 2031393560, 54)],
    'You defeated Braviary!',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/628.01',
    }
);
TemporaryBattleList['Lord of the Tundra: Avalugg'] = new TemporaryBattle(
    'Lord of the Tundra: Avalugg',
    [new GymPokemon('Noble Avalugg', 2031393560, 56)],
    'The golden light was dispelled from Avalugg, calming it.',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/713.02',
    }
);
TemporaryBattleList.Beni = new TemporaryBattle(
    'Beni',
    [
        new GymPokemon('Mismagius', 348526193, 59),
        new GymPokemon('Sneasler', 348526193, 59),
        new GymPokemon('Gardevoir', 348526193, 60),
        new GymPokemon('Gallade', 348526193, 60),
    ],
    'It seems my ninja techniques will soon be consigned to history...',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'The Galaxy Team\'s Beni',
        imageName: 'Beni (Ninja)',
    }
);
TemporaryBattleList['Charm 2'] = new TemporaryBattle(
    'Charm 2',
    [
        new GymPokemon('Rhydon', 348526193, 61),
        new GymPokemon('Gengar', 348526193, 62),
    ],
    'Well, you are rather formidable...',
    [new TemporaryBattleRequirement('Coin 2')],
    undefined,
    {
        displayName: 'The Bandit Charm',
        imageName: 'Charm',
    }
);
TemporaryBattleList['Dialga (Origin)'] = new TemporaryBattle(
    'Dialga (Origin)',
    [new GymPokemon('Dialga (Origin)', 2031393560, 65)],
    'Dialga was captured in the Origin Ball and returned to its base form!',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/483.01',
    }
);
TemporaryBattleList['Palkia (Origin)'] = new TemporaryBattle(
    'Palkia (Origin)',
    [new GymPokemon('Palkia (Origin)', 2031393560, 65)],
    'Palkia was captured in the Origin Ball and returned to its base form!',
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/484.01',
    }
);
TemporaryBattleList['The Galaxy Team\'s Kamado'] = new TemporaryBattle(
    'The Galaxy Team\'s Kamado',
    [
        new GymPokemon('Golem', 348526193, 65),
        new GymPokemon('Clefable', 348526193, 65),
        new GymPokemon('Hisuian Braviary', 348526193, 65),
        new GymPokemon('Heracross', 348526193, 65),
        new GymPokemon('Snorlax', 348526193, 66),
    ],
    'Even frightful creatures like Pokémon can become powerful allies...',
    [new DevelopmentRequirement()]
);
TemporaryBattleList['Adaman 2'] = new TemporaryBattle(
    'Adaman 2',
    [
        new GymPokemon('Umbreon', 348526193, 32),
        new GymPokemon('Vaporeon', 348526193, 32),
        new GymPokemon('Leafeon', 348526193, 64),
    ],
    'You\'re really something...and I\'m a man of my word. So, here\'s that treasure.',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Clan Leader Adaman',
        imageName: 'Adaman',
    }
);
TemporaryBattleList['Irida 3'] = new TemporaryBattle(
    'Irida 3',
    [
        new GymPokemon('Espeon', 348526193, 32),
        new GymPokemon('Flareon', 348526193, 32),
        new GymPokemon('Glaceon', 348526193, 64),
    ],
    'I wonder... Are there people even stronger than you out in the world, with Pokémon stronger than yours? I\'ll just have to find out for myself I suppose! Here! The treasure I promised you.',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Clan Leader Irida',
        imageName: 'Irida',
    }
);
TemporaryBattleList['Volo 3'] = new TemporaryBattle(
    'Volo 3',
    [
        new GymPokemon('Giratina (Altered)', 348526193, 70),
        new GymPokemon('Giratina (Origin)', 348526193, 70),
    ],
    'Turning tail and running? From this puny HUMAN? Pathetic! I was the one to feed you the power you needed so that you could take on Arceus! I was the one who gave you the chance to claw open that space-time rift, driving the deity of space and time mad so that you could drag the creator out from hiding!',
    [new DevelopmentRequirement()],
    undefined,
    {
        displayName: 'Pokémon Wielder Volo',
        imageName: 'Volo',
    }
);
TemporaryBattleList['Tornadus 1'] = new TemporaryBattle(
    'Tornadus 1',
    [new GymPokemon('Tornadus', 2031393560, 70)],
    undefined,
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 0)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/641',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Tornadus 2'] = new TemporaryBattle(
    'Tornadus 2',
    [new GymPokemon('Tornadus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Tornadus 1')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/641',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Tornadus 3'] = new TemporaryBattle(
    'Tornadus 3',
    [new GymPokemon('Tornadus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Tornadus 2')],
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1), new TemporaryBattleRequirement('Tornadus 3')],
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/641',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Thundurus 1'] = new TemporaryBattle(
    'Thundurus 1',
    [new GymPokemon('Thundurus', 2031393560, 70)],
    undefined,
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 0)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/642',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Thundurus 2'] = new TemporaryBattle(
    'Thundurus 2',
    [new GymPokemon('Thundurus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Thundurus 1')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/642',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Thundurus 3'] = new TemporaryBattle(
    'Thundurus 3',
    [new GymPokemon('Thundurus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Thundurus 2')],
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1), new TemporaryBattleRequirement('Thundurus 3')],
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/642',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Landorus 1'] = new TemporaryBattle(
    'Landorus 1',
    [new GymPokemon('Landorus', 2031393560, 70)],
    undefined,
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 0)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/645',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Landorus 2'] = new TemporaryBattle(
    'Landorus 2',
    [new GymPokemon('Landorus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Landorus 1')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/645',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Landorus 3'] = new TemporaryBattle(
    'Landorus 3',
    [new GymPokemon('Landorus', 2031393560, 70)],
    undefined,
    [new TemporaryBattleRequirement('Landorus 2')],
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1), new TemporaryBattleRequirement('Landorus 3')],
    {
        isTrainerBattle: false,
        hideTrainer: true,
        imageName: '../pokemon/645',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Enamorus 1'] = new TemporaryBattle(
    'Enamorus 1',
    [new GymPokemon('Enamorus', 2031393560, 65)],
    undefined,
    [new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 2)],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/905',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Enamorus 2'] = new TemporaryBattle(
    'Enamorus 2',
    [new GymPokemon('Enamorus', 2031393560, 65)],
    undefined,
    [new TemporaryBattleRequirement('Enamorus 1')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/905',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList['Enamorus 3'] = new TemporaryBattle(
    'Enamorus 3',
    [new GymPokemon('Enamorus', 2031393560, 65)],
    'Before you could attempt to capture it, Enamorus fled to roam the region!',
    [new TemporaryBattleRequirement('Enamorus 2')],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/905',
        returnTown: 'Ancient Retreat',
    }
);
TemporaryBattleList.Arceus = new TemporaryBattle(
    'Arceus',
    [new GymPokemon('Arceus (Normal)', 2031393560, 75)],
    'Arceus granted you a part of its self, and the Legend Plate!',//That text needs changed, not sure what to, though,
    [new DevelopmentRequirement()],
    undefined,
    {
        hideTrainer: true,
        imageName: '../pokemon/493',
    }
);

// Paldea Temporary Battles
TemporaryBattleList['Paradise Protection Protocol'] = new TemporaryBattle(
    'Paradise Protection Protocol',
    [
        new GymPokemon('Koraidon', 710987746, 70),
        new GymPokemon('Miraidon', 710987746, 70),
    ],
    '<i>The Guardians of Paradise were defeated!</i>',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_Sada),
        new GymBadgeRequirement(BadgeEnums.Elite_Turo),
    ]
);
