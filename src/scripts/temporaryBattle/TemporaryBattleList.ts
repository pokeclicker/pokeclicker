const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

// Kanto Temporarybattles
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

// Sinnoh Temporarybattles
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

// Kalos Temporarybattles
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

// Alola Temporarybattles
TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
TemporaryBattleList['Ultra Megalopolis'] = new TemporaryBattle(
    'Ultra Megalopolis',
    [new GymPokemon('Necrozma (Ultra)', 282601920, 60)],
    'Necrozma fled.',
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('Mina\'s Trial').beginQuest();
        },
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

TemporaryBattleList['Rainbow Rocket Grunt 1'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 1',
    [
        new GymPokemon('Sandshrew', 60000000, 11),
        new GymPokemon('Rattata', 60000000, 11),
        new GymPokemon('Zubat', 60000000, 11),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Hearthome City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 2'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 2',
    [
        new GymPokemon('Zubat', 60000000, 11),
        new GymPokemon('Ekans', 60000000, 11),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Lilycove City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 3'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 3',
    [
        new GymPokemon('Rattata', 60000000, 13),
        new GymPokemon('Sandshrew', 60000000, 13),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Lavender Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 4'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 4',
    [
        new GymPokemon('Rattata', 60000000, 13),
        new GymPokemon('Zubat', 60000000, 13),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 5'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 5',
    [
        new GymPokemon('Machop', 60000000, 17),
        new GymPokemon('Drowzee', 60000000, 17),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Dendemille Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 6'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 6',
    [
        new GymPokemon('Raticate', 60000000, 11),
        new GymPokemon('Zubat', 60000000, 11),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 7'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 7',
    [
        new GymPokemon('Raticate', 60000000, 21),
        new GymPokemon('Raticate', 60000000, 21),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 8'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 8',
    [
        new GymPokemon('Rattata', 60000000, 19),
        new GymPokemon('Raticate', 60000000, 19),
        new GymPokemon('Raticate', 60000000, 19),
        new GymPokemon('Rattata', 60000000, 19),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Laverre City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 9'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 9',
    [
        new GymPokemon('Grimer', 60000000, 20),
        new GymPokemon('Koffing', 60000000, 20),
        new GymPokemon('Koffing', 60000000, 20),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 10'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 10',
    [
        new GymPokemon('Grimer', 60000000, 22),
        new GymPokemon('Koffing', 60000000, 22),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Goldenrod City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 11'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 11',
    [
        new GymPokemon('Zubat', 60000000, 17),
        new GymPokemon('Koffing', 60000000, 17),
        new GymPokemon('Grimer', 60000000, 17),
        new GymPokemon('Zubat', 60000000, 17),
        new GymPokemon('Raticate', 60000000, 17),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Santalune City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 12'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 12',
    [
        new GymPokemon('Machop', 60000000, 21),
        new GymPokemon('Machop', 60000000, 21),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Royal Avenue',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 13'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 13',
    [
        new GymPokemon('Rattata', 60000000, 20),
        new GymPokemon('Raticate', 60000000, 20),
        new GymPokemon('Drowzee', 60000000, 20),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Indigo Plateau Kanto',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 14'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 14',
    [
        new GymPokemon('Koffing', 60000000, 21),
        new GymPokemon('Zubat', 60000000, 21),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Castelia City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 15'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 15',
    [
        new GymPokemon('Sandshrew', 60000000, 23),
        new GymPokemon('Ekans', 60000000, 23),
        new GymPokemon('Sandslash', 60000000, 23),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 16'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 16',
    [
        new GymPokemon('Zubat', 60000000, 25),
        new GymPokemon('Zubat', 60000000, 25),
        new GymPokemon('Golbat', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Fight Area',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 17'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 17',
    [
        new GymPokemon('Koffing', 60000000, 26),
        new GymPokemon('Drowzee', 60000000, 26),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Two Island',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 18'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 18',
    [
        new GymPokemon('Zubat', 60000000, 23),
        new GymPokemon('Rattata', 60000000, 23),
        new GymPokemon('Raticate', 60000000, 23),
        new GymPokemon('Zubat', 60000000, 23),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 19'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 19',
    [
        new GymPokemon('Zubat', 60000000, 23),
        new GymPokemon('Rattata', 60000000, 23),
        new GymPokemon('Raticate', 60000000, 23),
        new GymPokemon('Zubat', 60000000, 23),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Opelucid City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 20'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 20',
    [
        new GymPokemon('Golbat', 60000000, 25),
        new GymPokemon('Zubat', 60000000, 25),
        new GymPokemon('Zubat', 60000000, 25),
        new GymPokemon('Raticate', 60000000, 25),
        new GymPokemon('Zubat', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Azalea Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 21'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 21',
    [
        new GymPokemon('Cubone', 60000000, 29),
        new GymPokemon('Zubat', 60000000, 29),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Celadon City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 22'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 22',
    [
        new GymPokemon('Raticate', 60000000, 28),
        new GymPokemon('Hypno', 60000000, 28),
        new GymPokemon('Raticate', 60000000, 28),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Iki Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 23'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 23',
    [
        new GymPokemon('Ekans', 60000000, 28),
        new GymPokemon('Zubat', 60000000, 28),
        new GymPokemon('Cubone', 60000000, 28),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Mossdeep City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 24'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 24',
    [new GymPokemon('Hypno', 60000000, 33)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 25'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 25',
    [new GymPokemon('Arbok', 60000000, 33)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Vermilion City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 26'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 26',
    [
        new GymPokemon('Machop', 60000000, 29),
        new GymPokemon('Machoke', 60000000, 29),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 27'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 27',
    [
        new GymPokemon('Cubone', 60000000, 29),
        new GymPokemon('Cubone', 60000000, 29),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 28'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 28',
    [
        new GymPokemon('Raticate', 60000000, 26),
        new GymPokemon('Zubat', 60000000, 26),
        new GymPokemon('Golbat', 60000000, 26),
        new GymPokemon('Zubat', 60000000, 26),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Pewter City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 29'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 29',
    [
        new GymPokemon('Sandshrew', 60000000, 29),
        new GymPokemon('Sandslash', 60000000, 29),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 30'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 30',
    [
        new GymPokemon('Raticate', 60000000, 26),
        new GymPokemon('Golbat', 60000000, 26),
        new GymPokemon('Arbok', 60000000, 26),
        new GymPokemon('Koffing', 60000000, 26),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Castelia City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 31'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 31',
    [
        new GymPokemon('Weezing', 60000000, 28),
        new GymPokemon('Golbat', 60000000, 28),
        new GymPokemon('Koffing', 60000000, 28),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Ambrette Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 32'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 32',
    [
        new GymPokemon('Golbat', 60000000, 28),
        new GymPokemon('Drowzee', 60000000, 28),
        new GymPokemon('Hypno', 60000000, 28),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Dewford Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 33'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 33',
    [
        new GymPokemon('Drowzee', 60000000, 28),
        new GymPokemon('Grimer', 60000000, 28),
        new GymPokemon('Machop', 60000000, 28),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 34'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 34',
    [new GymPokemon('Machoke', 60000000, 33)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Three Island',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 35'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 35',
    [
        new GymPokemon('Rattata', 60000000, 25),
        new GymPokemon('Zubat', 60000000, 25),
        new GymPokemon('Ekans', 60000000, 25),
        new GymPokemon('Rattata', 60000000, 25),
        new GymPokemon('Rattata', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Sunyshore City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 36'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 36',
    [
        new GymPokemon('Cubone', 60000000, 32),
        new GymPokemon('Drowzee', 60000000, 32),
        new GymPokemon('Marowak', 60000000, 32),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Blackthorn City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 37'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 37',
    [
        new GymPokemon('Cubone', 60000000, 37),
        new GymPokemon('Marowak', 60000000, 37),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 38'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 38',
    [
        new GymPokemon('Rattata', 60000000, 35),
        new GymPokemon('Raticate', 60000000, 35),
        new GymPokemon('Sandshrew', 60000000, 35),
        new GymPokemon('Sandslash', 60000000, 35),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Floaroma Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 39'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 39',
    [
        new GymPokemon('Muk', 60000000, 48),
        new GymPokemon('Golbat', 60000000, 48),
        new GymPokemon('Raticate', 60000000, 48),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 40'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 40',
    [
        new GymPokemon('Rattata', 60000000, 48),
        new GymPokemon('Grimer', 60000000, 48),
        new GymPokemon('Muk', 60000000, 48),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 41'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 41',
    [
        new GymPokemon('Ekans', 60000000, 48),
        new GymPokemon('Gloom', 60000000, 48),
        new GymPokemon('Gloom', 60000000, 48),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Tapu Village',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 42'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 42',
    [
        new GymPokemon('Koffing', 60000000, 49),
        new GymPokemon('Weezing', 60000000, 49),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Indigo Plateau Kanto',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 43'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 43',
    [
        new GymPokemon('Houndour', 60000000, 49),
        new GymPokemon('Houndour', 60000000, 49),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 44'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 44',
    [
        new GymPokemon('Machop', 60000000, 48),
        new GymPokemon('Machop', 60000000, 48),
        new GymPokemon('Machoke', 60000000, 48),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 45'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 45',
    [
        new GymPokemon('Hypno', 60000000, 48),
        new GymPokemon('Hypno', 60000000, 48),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Cianwood City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 46'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 46',
    [
        new GymPokemon('Rattata', 60000000, 9),
        new GymPokemon('Rattata', 60000000, 9),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Pal Park',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 47'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 47',
    [
        new GymPokemon('Rattata', 60000000, 7),
        new GymPokemon('Zubat', 60000000, 9),
        new GymPokemon('Zubat', 60000000, 9),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 48'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 48',
    [new GymPokemon('Koffing', 60000000, 12)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 49'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 49',
    [
        new GymPokemon('Rattata', 60000000, 16),
        new GymPokemon('Rattata', 60000000, 16),
        new GymPokemon('Rattata', 60000000, 16),
        new GymPokemon('Rattata', 60000000, 16),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Olivine City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 50'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 50',
    [
        new GymPokemon('Drowzee', 60000000, 17),
        new GymPokemon('Zubat', 60000000, 19),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Coumarine City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 51'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 51',
    [
        new GymPokemon('Zubat', 60000000, 17),
        new GymPokemon('Grimer', 60000000, 19),
        new GymPokemon('Rattata', 60000000, 19),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Striaton City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 52'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 52',
    [
        new GymPokemon('Venonat', 60000000, 18),
        new GymPokemon('Venonat', 60000000, 18),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 53'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 53',
    [new GymPokemon('Golbat', 60000000, 18)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Ecruteak City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 54'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 54',
    [
        new GymPokemon('Rattata', 60000000, 17),
        new GymPokemon('Rattata', 60000000, 17),
        new GymPokemon('Zubat', 60000000, 17),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Oldale Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 55'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 55',
    [
        new GymPokemon('Drowzee', 60000000, 18),
        new GymPokemon('Grimer', 60000000, 20),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 56'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 56',
    [
        new GymPokemon('Ekans', 60000000, 18),
        new GymPokemon('Gloom', 60000000, 18),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Sandgem Town',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 57'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 57',
    [new GymPokemon('Raticate', 60000000, 19)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Cherrygrove City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 58'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 58',
    [
        new GymPokemon('Rattata', 60000000, 21),
        new GymPokemon('Rattata', 60000000, 21),
        new GymPokemon('Rattata', 60000000, 21),
        new GymPokemon('Rattata', 60000000, 21),
        new GymPokemon('Rattata', 60000000, 21),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 59'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 59',
    [
        new GymPokemon('Grimer', 60000000, 23),
        new GymPokemon('Grimer', 60000000, 23),
        new GymPokemon('Muk', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Mahogany Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 60'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 60',
    [
        new GymPokemon('Zubat', 60000000, 26),
        new GymPokemon('Zubat', 60000000, 26),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 61'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 61',
    [
        new GymPokemon('Koffing', 60000000, 23),
        new GymPokemon('Zubat', 60000000, 23),
        new GymPokemon('Rattata', 60000000, 23),
        new GymPokemon('Grimer', 60000000, 23),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 62'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 62',
    [new GymPokemon('Weezing', 60000000, 26)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Undella Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 63'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 63',
    [
        new GymPokemon('Raticate', 60000000, 24),
        new GymPokemon('Koffing', 60000000, 26),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Violet City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 64'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 64',
    [new GymPokemon('Rattata', 60000000, 27)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Floccesy Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 65'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 65',
    [
        new GymPokemon('Muk', 60000000, 23),
        new GymPokemon('Koffing', 60000000, 23),
        new GymPokemon('Rattata', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Nimbasa City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 66'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 66',
    [
        new GymPokemon('Koffing', 60000000, 24),
        new GymPokemon('Muk', 60000000, 24),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Viridian City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 67'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 67',
    [
        new GymPokemon('Gloom', 60000000, 25),
        new GymPokemon('Gloom', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 68'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 68',
    [
        new GymPokemon('Raticate', 60000000, 24),
        new GymPokemon('Golbat', 60000000, 24),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Paniola Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 69'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 69',
    [
        new GymPokemon('Grimer', 60000000, 26),
        new GymPokemon('Weezing', 60000000, 23),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Rustboro City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 70'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 70',
    [
        new GymPokemon('Koffing', 60000000, 25),
        new GymPokemon('Koffing', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Shalour City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 71'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 71',
    [
        new GymPokemon('Koffing', 60000000, 25),
        new GymPokemon('Koffing', 60000000, 25),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Sootopolis City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 72'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 72',
    [
        new GymPokemon('Zubat', 60000000, 22),
        new GymPokemon('Golbat', 60000000, 22),
        new GymPokemon('Grimer', 60000000, 22),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 73'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 73',
    [
        new GymPokemon('Zubat', 60000000, 22),
        new GymPokemon('Golbat', 60000000, 22),
        new GymPokemon('Grimer', 60000000, 22),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Battle Frontier',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 74'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 74',
    [new GymPokemon('Voltorb', 60000000, 29)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Veilstone City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 75'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 75',
    [
        new GymPokemon('Rattata', 60000000, 29),
        new GymPokemon('Voltorb', 60000000, 29),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Nuvema Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 76'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 76',
    [
        new GymPokemon('Voltorb', 60000000, 33),
        new GymPokemon('Voltorb', 60000000, 33),
        new GymPokemon('Voltorb', 60000000, 33),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Indigo Plateau Johto',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 77'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 77',
    [
        new GymPokemon('Koffing', 60000000, 33),
        new GymPokemon('Electrode', 60000000, 33),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Humilau City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 78'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 78',
    [
        new GymPokemon('Gastly', 60000000, 33),
        new GymPokemon('Persian', 60000000, 33),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 79'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 79',
    [new GymPokemon('Persian', 60000000, 33)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 80'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 80',
    [
        new GymPokemon('Ekans', 60000000, 100),
        new GymPokemon('Drowzee', 60000000, 100),
        new GymPokemon('Grimer', 60000000, 100),
        new GymPokemon('Poliwag', 60000000, 100),
        new GymPokemon('Omanyte', 60000000, 100),
        new GymPokemon('Nidoran(F)', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Mistralton City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 81'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 81',
    [
        new GymPokemon('Hypno', 60000000, 100),
        new GymPokemon('Poliwhirl', 60000000, 100),
        new GymPokemon('Sandshrew', 60000000, 100),
        new GymPokemon('Koffing', 60000000, 100),
        new GymPokemon('Nidorina', 60000000, 100),
        new GymPokemon('Muk', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Pastoria City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 82'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 82',
    [
        new GymPokemon('Weezing', 60000000, 100),
        new GymPokemon('Nidoqueen', 60000000, 100),
        new GymPokemon('Arbok', 60000000, 100),
        new GymPokemon('Onix', 60000000, 100),
        new GymPokemon('Sandslash', 60000000, 100),
        new GymPokemon('Omastar', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Snowpoint City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 83'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 83',
    [
        new GymPokemon('Jynx', 60000000, 100),
        new GymPokemon('Golem', 60000000, 100),
        new GymPokemon('Golbat', 60000000, 100),
        new GymPokemon('Aerodactyl', 60000000, 100),
        new GymPokemon('Persian', 60000000, 100),
        new GymPokemon('Victreebel', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Konikoni City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 84'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 84',
    [
        new GymPokemon('Ekans', 60000000, 100),
        new GymPokemon('Graveler', 60000000, 100),
        new GymPokemon('Grimer', 60000000, 100),
        new GymPokemon('Nidoran(F)', 60000000, 100),
        new GymPokemon('Horsea', 60000000, 100),
        new GymPokemon('Goldeen', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Lumiose City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 85'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 85',
    [
        new GymPokemon('Kabuto', 60000000, 100),
        new GymPokemon('Omanyte', 60000000, 100),
        new GymPokemon('Golem', 60000000, 100),
        new GymPokemon('Rhyhorn', 60000000, 100),
        new GymPokemon('Onix', 60000000, 100),
        new GymPokemon('Muk', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 86'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 86',
    [
        new GymPokemon('Weezing', 60000000, 100),
        new GymPokemon('Rhydon', 60000000, 100),
        new GymPokemon('Clefable', 60000000, 100),
        new GymPokemon('Tentacruel', 60000000, 100),
        new GymPokemon('Dewgong', 60000000, 100),
        new GymPokemon('Cloyster', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 87'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 87',
    [
        new GymPokemon('Nidoking', 60000000, 100),
        new GymPokemon('Golem', 60000000, 100),
        new GymPokemon('Slowbro', 60000000, 100),
        new GymPokemon('Sandslash', 60000000, 100),
        new GymPokemon('Vaporeon', 60000000, 100),
        new GymPokemon('Weezing', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Fortree City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 88'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 88',
    [
        new GymPokemon('Golbat', 60000000, 100),
        new GymPokemon('Raticate', 60000000, 100),
        new GymPokemon('Persian', 60000000, 100),
        new GymPokemon('Moltres', 60000000, 100),
        new GymPokemon('Dodrio', 60000000, 100),
        new GymPokemon('Parasect', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Canalave City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 89'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 89',
    [
        new GymPokemon('Golbat', 60000000, 100),
        new GymPokemon('Raticate', 60000000, 100),
        new GymPokemon('Persian', 60000000, 100),
        new GymPokemon('Kangaskhan', 60000000, 100),
        new GymPokemon('Dodrio', 60000000, 100),
        new GymPokemon('Parasect', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Mauville City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 90'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 90',
    [
        new GymPokemon('Geodude', 60000000, 100),
        new GymPokemon('Koffing', 60000000, 100),
        new GymPokemon('Pineco', 60000000, 100),
        new GymPokemon('Graveler', 60000000, 100),
        new GymPokemon('Weezing', 60000000, 100),
        new GymPokemon('Electrode', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 91'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 91',
    [
        new GymPokemon('Weezing', 60000000, 100),
        new GymPokemon('Electrode', 60000000, 100),
        new GymPokemon('Cloyster', 60000000, 100),
        new GymPokemon('Sudowoodo', 60000000, 100),
        new GymPokemon('Forretress', 60000000, 100),
        new GymPokemon('Golem', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Eterna City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 92'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 92',
    [
        new GymPokemon('Murkrow', 60000000, 100),
        new GymPokemon('Drowzee', 60000000, 100),
        new GymPokemon('Spinarak', 60000000, 100),
        new GymPokemon('Dunsparce', 60000000, 100),
        new GymPokemon('Zubat', 60000000, 100),
        new GymPokemon('Houndour', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Hau\'oli City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 93'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 93',
    [
        new GymPokemon('Houndour', 60000000, 100),
        new GymPokemon('Shuckle', 60000000, 100),
        new GymPokemon('Azumarill', 60000000, 100),
        new GymPokemon('Shellder', 60000000, 100),
        new GymPokemon('Onix', 60000000, 100),
        new GymPokemon('Dewgong', 60000000, 100),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 94'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 94',
    [
        new GymPokemon('Arbok', 60000000, 50),
        new GymPokemon('Raticate', 60000000, 50),
        new GymPokemon('Golbat', 60000000, 50),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Aquacorde Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 95'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 95',
    [new GymPokemon('Primeape', 60000000, 61)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Fallarbor Town',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 96'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 96',
    [new GymPokemon('Haunter', 60000000, 61)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Professor Kukui\'s Lab',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 97'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 97',
    [new GymPokemon('Fearow', 60000000, 62)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Fuschia City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 98'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 98',
    [
        new GymPokemon('Tentacruel', 60000000, 62),
        new GymPokemon('Persian', 60000000, 62),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Cerulean City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 99'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 99',
    [new GymPokemon('Tentacruel', 60000000, 62)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Malie City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 100'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 100',
    [
        new GymPokemon('Hypno', 60000000, 62),
        new GymPokemon('Primeape', 60000000, 62),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Heahea City',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 101'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 101',
    [
        new GymPokemon('Arbok', 60000000, 62),
        new GymPokemon('Golbat', 60000000, 62),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Snowbelle City',
        imageName: 'Team Rocket Grunt 2',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 102'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 102',
    [
        new GymPokemon('Muk', 60000000, 62),
        new GymPokemon('Fearow', 60000000, 62),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Altar of the Sunne and Moone',
        imageName: 'Team Rocket Grunt 1',
    }
);
TemporaryBattleList['Rainbow Rocket Grunt 103'] = new TemporaryBattle(
    'Rainbow Rocket Grunt 103',
    [new GymPokemon('Muk', 60000000, 62)],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [
        new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9),
        new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0, GameConstants.AchievementOption.less ),
    ],
    undefined,
    {
        displayName: 'Rainbow Rocket Grunt',
        returnTown: 'Seafolk Village',
        imageName: 'Team Rocket Grunt 2',
    }
);

TemporaryBattleList['Aether Branch Chief Faba'] = new TemporaryBattle(
    'Aether Branch Chief Faba',
    [
        new GymPokemon('Claydol', 60000000, 60),
        new GymPokemon('Bruxish', 60000000, 60),
        new GymPokemon('Hypno', 60000000, 60),
    ],
    'Hmph! I\'ll have you know defeating me won\'t do you any good, anyway.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 0)]
);

TemporaryBattleList['Team Aqua Leader Archie'] = new TemporaryBattle(
    'Team Aqua Leader Archie',
    [
        new GymPokemon('Mightyena', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Muk', 60000000, 60),
        new GymPokemon('Sharpedo', 60000000, 60),
        new GymPokemon('Kyogre', 60000000, 60),
    ],
    'You\'ve made your point. I can see you are not one to be trifled with.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 1)]
);

TemporaryBattleList['Team Magma Leader Maxie'] = new TemporaryBattle(
    'Team Magma Leader Maxie',
    [
        new GymPokemon('Mightyena', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Weezing', 60000000, 60),
        new GymPokemon('Camerupt', 60000000, 60),
        new GymPokemon('Groudon', 60000000, 60),
    ],
    'I fell behind, but only by an inch.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 1)]
);

TemporaryBattleList['Team Galactic Leader Cyrus'] = new TemporaryBattle(
    'Team Galactic Leader Cyrus',
    [
        new GymPokemon('Houndoom', 60000000, 60),
        new GymPokemon('Honchkrow', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Weavile', 60000000, 60),
        new GymPokemon('Dialga', 60000000, 60),
        new GymPokemon('Palkia', 60000000, 60),
    ],
    'Impressive. Your prowess is notable.',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 2)]
);

TemporaryBattleList['Team Flare Leader Lysandre'] = new TemporaryBattle(
    'Team Flare Leader Lysandre',
    [
        new GymPokemon('Mienshao', 60000000, 60),
        new GymPokemon('Pyroar', 60000000, 60),
        new GymPokemon('Honchkrow', 60000000, 60),
        new GymPokemon('Mega Gyarados', 60000000, 60),
        new GymPokemon('Xerneas', 60000000, 60),
        new GymPokemon('Yveltal', 60000000, 60),
    ],
    'I can feel the fire of your convictions burning deep within your heart!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 3)]
);

TemporaryBattleList['Team Plasma Leader Ghetsis'] = new TemporaryBattle(
    'Team Plasma Leader Ghetsis',
    [
        new GymPokemon('Cofagrigus', 60000000, 60),
        new GymPokemon('Bouffalant', 60000000, 60),
        new GymPokemon('Bisharp', 60000000, 60),
        new GymPokemon('Hydreigon', 60000000, 60),
        new GymPokemon('Zekrom', 60000000, 60),
        new GymPokemon('Reshiram', 60000000, 60),
    ],
    'I couldn\'t have been defeated by some random Trainer from who knows where!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 4)]
);

TemporaryBattleList['Team Rainbow Leader Giovanni'] = new TemporaryBattle(
    'Team Rainbow Leader Giovanni',
    [
        new GymPokemon('Dugtrio', 60000000, 60),
        new GymPokemon('Nidoking', 60000000, 60),
        new GymPokemon('Nidoqueen', 60000000, 60),
        new GymPokemon('Rhyperior', 60000000, 60),
        // new GymPokemon('Mewtwo', 60000000, 60),
        // new GymPokemon('Mewtwo', 60000000, 60),
        new GymPokemon('Mega Mewtwo X', 60000000, 60),
        new GymPokemon('Mega Mewtwo Y', 60000000, 60),
    ],
    'Ha! That was a truly intense fight!',
    [new QuestLineStepCompletedRequirement('Defeat Rainbow Rocket', 5)]
);
