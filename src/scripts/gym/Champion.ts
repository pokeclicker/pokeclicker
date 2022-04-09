/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="Gym.ts"/>

class Champion extends Gym {
    constructor(
        leaderName: string,
        town: string,
        public basePokemon: GymPokemon[],
        badgeReward: BadgeEnums,
        moneyReward: number,
        rewardMessage: string,
        requirements: Requirement[] = [],
        public alternativePokemon1?: GymPokemon[],
        public alternativePokemon2?: GymPokemon[],
        public alternativePokemon3?: GymPokemon[],
        public rewardFunction = () => {}
    ) {
        super(leaderName, town, basePokemon, badgeReward, moneyReward, rewardMessage, requirements, rewardFunction);
    }

    public setPokemon(starter: GameConstants.Starter) {
        this.pokemons = [...this.basePokemon];
        switch (starter) {
            case GameConstants.Starter.Bulbasaur: {
                if (this.alternativePokemon1 != undefined) {
                    this.pokemons.push(...this.alternativePokemon1);
                }
                break;
            }
            case GameConstants.Starter.Charmander: {
                if (this.alternativePokemon2 != undefined) {
                    this.pokemons.push(...this.alternativePokemon2);
                }
                break;
            }
            case GameConstants.Starter.Squirtle:
            default: {
                if (this.alternativePokemon3 != undefined) {
                    this.pokemons.push(...this.alternativePokemon3);
                }
                break;
            }
        }
    }

}

gymList['Champion Blue'] = new Champion(
    'Blue',
    'Champion Blue',
    [
        new GymPokemon('Pidgeot', 52340, 59),
        new GymPokemon('Alakazam', 56320, 57),
        new GymPokemon('Rhydon', 58340, 59),
    ],
    BadgeEnums.Elite_KantoChampion,
    10000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lance)],
    // Bulbasaur
    [
        new GymPokemon('Exeggutor', 57520, 59),
        new GymPokemon('Gyarados', 63040, 61),
        new GymPokemon('Charizard', 70000, 63),
    ],
    // Charmander
    [
        new GymPokemon('Arcanine', 65340, 59),
        new GymPokemon('Exeggutor', 57520, 61),
        new GymPokemon('Blastoise', 70000, 63),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Gyarados', 63040, 59),
        new GymPokemon('Arcanine', 65340, 61),
        new GymPokemon('Venusaur', 70000, 63),
    ]
);

gymList['Champion Lance'] = new Champion(
    'Lance2',
    'Champion Lance',
    [
        new GymPokemon('Gyarados', 258300, 44),
        new GymPokemon('Dragonite', 262000, 47),
        new GymPokemon('Charizard', 264000, 46),
        new GymPokemon('Aerodactyl', 260250, 46),
        new GymPokemon('Dragonite', 270000, 47),
        new GymPokemon('Dragonite', 270000, 50),
    ],
    BadgeEnums.Elite_JohtoChampion,
    7500,
    '…It\'s over. But it\'s an odd feeling. I\'m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Karen)]
);

gymList['Champion Wallace'] = new Champion(
    'Wallace',
    'Champion Wallace',
    [
        new GymPokemon('Wailord', 1202000, 57),
        new GymPokemon('Tentacruel', 1164000, 55),
        new GymPokemon('Ludicolo', 1184000, 56),
        new GymPokemon('Whiscash', 1172000, 56),
        new GymPokemon('Gyarados', 1163000, 56),
        new GymPokemon('Milotic', 1182000, 58),
    ],
    BadgeEnums.Elite_HoennChampion,
    16000,
    'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drake)],
    undefined,
    undefined,
    undefined,
    () => {
        App.game.quests.getQuestLine('Mystery of Deoxys').beginQuest();
    }
);

gymList['Champion Cynthia'] = new Champion(
    'Cynthia',
    'Champion Cynthia',
    [
        new GymPokemon('Spiritomb', 3458300, 58),
        new GymPokemon('Roserade', 3462000, 58),
        new GymPokemon('Togekiss', 3464000, 60),
        new GymPokemon('Lucario', 3460250, 60),
        new GymPokemon('Milotic', 3470000, 58),
        new GymPokemon('Garchomp', 3570000, 62),
    ],
    BadgeEnums.Elite_SinnohChampion,
    32000,
    'That was excellent. Truly, an outstanding battle. You gave the support your Pokémon needed to maximize their power. And you guided them with certainty to secure victory. You have both passion and calculating coolness. Together, you and your Pokémon can overcome any challenge that may come your way. Those are the impressions I got from our battle. I\'m glad I got to take part in the crowning of Sinnoh\'s new Champion! Come with me. We\'ll take the lift.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lucian)]
);

gymList['Champion Iris'] = new Champion(
    'Iris',
    'Champion Iris',
    [
        new GymPokemon('Hydreigon', 12458300, 58),
        new GymPokemon('Salamence', 12462000, 58),
        new GymPokemon('Aggron', 12464000, 58),
        new GymPokemon('Archeops', 12460250, 60),
        new GymPokemon('Lapras', 12470000, 58),
        new GymPokemon('Haxorus', 14570000, 62),
    ],
    BadgeEnums.Elite_UnovaChampion,
    64000,
    'I\'m upset I couldn\'t win! But you know what? More than that, I\'m happy! I mean, come on. By having a serious battle, you and your Pokémon, and me and my Pokémon, we all got to know one another better than before! Yep, we sure did! OK, let\'s go!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Caitlin)]
);

gymList['Champion Diantha'] = new Champion(
    'Diantha',
    'Champion Diantha',
    [
        new GymPokemon('Hawlucha', 60083000, 64),
        new GymPokemon('Tyrantrum', 62057000, 65),
        new GymPokemon('Aurorus', 62057000, 65),
        new GymPokemon('Gourgeist', 62557000, 65),
        new GymPokemon('Goodra', 62170000, 66),
        new GymPokemon('Mega Gardevoir', 63070000, 68),
    ],
    BadgeEnums.Elite_KalosChampion,
    128000,
    'Witnessing the noble spirits of you and your Pokémon in battle has really touched my heart...',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drasna)]
);

// TODO: Balancing - Set HP
gymList['Champion Hau'] = new Champion(
    'Hau',
    'Champion Hau',
    [
        new GymPokemon('Alolan Raichu', 91545555, 59),
        new GymPokemon('Tauros', 89636471, 58),
        new GymPokemon('Noivern', 89636471, 58),
        new GymPokemon('Crabominable', 91545555, 59),
    ],
    BadgeEnums.Elite_AlolaChampion,
    100000,
    'We\'re gonna keep moving forward, by staying at full power all the time!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Kahili)],
    // Bulbasaur
    [
        new GymPokemon('Flareon', 89636471, 58),
        new GymPokemon('Primarina', 96725389, 60),
    ],
    // Charmander
    [
        new GymPokemon('Vaporeon', 89636471, 58),
        new GymPokemon('Decidueye', 96725389, 60),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Leafeon', 89636471, 58),
        new GymPokemon('Incineroar', 96725389, 60),
    ],
    () => {
        App.game.quests.getQuestLine('Ultra Beast Hunt').beginQuest();
    }
);

//TODO: rewards/hp rebalance
gymList['Champion Leon'] = new Champion(
    'Leon',
    'Champion Leon',
    [
        new GymPokemon('Aegislash', 2015330, 59),
        new GymPokemon('Dragapult', 2015330, 58),
        new GymPokemon('Haxorus', 2015330, 58),
        new GymPokemon('Seismitoad', 2015330, 59),
        new GymPokemon('Charizard', 2015330, 59),
    ],
    BadgeEnums.Elite_GalarChampion,
    100000,
    'My time as Champion is over... But what a champion time it\'s been! Thank you for the greatest battle I\'ve ever had!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bede)],
    // Bulbasaur
    [new GymPokemon('Cinderace', 2015330, 60)],
    // Charmander
    [new GymPokemon('Inteleon', 2015330, 60)],
    // Squirtle/Pikachu
    [new GymPokemon('Rillaboom', 2015330, 60)]
);
