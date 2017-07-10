///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>

import PokemonType = GameConstants.PokemonType;


/**
 * Gym class.
 */
class Gym {
    leaderName: string;
    town: string;
    pokemons: GymPokemon[];
    badgeReward: GameConstants.Badge;
    moneyReward: number;
    badgeReq: GameConstants.Badge;
    defeatMessage: string;

    constructor(leaderName: string, town: string, pokemons: GymPokemon[], badgeReward: GameConstants.Badge, moneyReward: number, badgeReq: GameConstants.Badge, rewardMessage: string) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
        this.defeatMessage = rewardMessage;
    }

    public static isUnlocked(gym: Gym): boolean {
        return player.hasBadge(gym.badgeReq);
    }

    public static calculateCssClass(gym: Gym): KnockoutComputed<string> {
        return ko.computed(function () {
            if (player.hasBadge(gym.badgeReward)) {
                return "btn btn-success"
            }
            return "btn btn-secondary"
        });
    }
}

//TODO add all rewardMessages

/**
 * Data list that contains all gymLeaders, accessible by townName.
 */
const gymList: { [townName: string]: Gym } = {};
gymList["Pewter City"] = new Gym(
    "Brock",
    "Pewter City",
    [new GymPokemon("Geodude", 550, 12),
        new GymPokemon("Onix", 1110, 14)],
    GameConstants.Badge.Boulder,
    250,
    GameConstants.Badge.None,
    "I took you for granted, and so I lost. As proof of your victory, I confer on you this...the official Pokémon League BoulderBadge.");

gymList["Cerulean City"] = new Gym(
    "Misty",
    "Cerulean City",
    [new GymPokemon("Staryu", 4000, 18),
        new GymPokemon("Starmie", 6000, 21)],
    GameConstants.Badge.Cascade,
    500,
    GameConstants.Badge.Boulder,
    "Wow! You're too much, all right! You can have the CascadeBadge to show that you beat me."
);
gymList["Vermillion City"] = new Gym(
    "Lt. Surge",
    "Vermillion City",
    [new GymPokemon("Voltorb", 9780, 21),
        new GymPokemon("Pikachu", 13040, 18),
        new GymPokemon("Raichu", 14775, 24)],
    GameConstants.Badge.Thunder,
    1000,
    GameConstants.Badge.Cascade,
    "Now that's a shocker! You're the real deal, kid! Fine, then, take the ThunderBadge!"
);
gymList["Celadon City"] = new Gym(
    "Erika",
    "Celadon City",
    [new GymPokemon("Victreebel", 17830, 29),
        new GymPokemon("Tangela", 20210, 24),
        new GymPokemon("Vileplume", 21400, 29)],
    GameConstants.Badge.Rainbow,
    1500,
    GameConstants.Badge.Thunder,
    "Oh! I concede defeat. You are remarkably strong. I must confer on you the RainbowBadge."
);
gymList["Saffron City"] = new Gym(
    "Sabrina",
    "Saffron City",
    [new GymPokemon("Kadabra", 16810, 38),
        new GymPokemon("Mr. Mime", 18340, 37),
        new GymPokemon("Venomoth", 19870, 38),
        new GymPokemon("Alakazam", 21400, 43)],
    GameConstants.Badge.Marsh,
    2500,
    GameConstants.Badge.Rainbow,
    "This loss shocks me! But a loss is a loss. I admit I didn't work hard enough to win. You earned the MarshBadge."
);
gymList["Fuchsia City"] = new Gym(
    "Koga",
    "Fuchsia City",
    [new GymPokemon("Koffing", 23333, 38),
        new GymPokemon("Muk", 24000, 37),
        new GymPokemon("Koffing", 26667, 38),
        new GymPokemon("Weezing", 30000, 43)],
    GameConstants.Badge.Soul,
    3500,
    GameConstants.Badge.Marsh,
    "Humph! You have proven your worth! Here! Take the SoulBadge!"
);
gymList["Cinnabar Island City"] = new Gym(
    "Blaine",
    "Cinnabar Island City",
    [new GymPokemon("Growlithe", 27870, 42),
        new GymPokemon("Ponyta", 30960, 40),
        new GymPokemon("Rapidash", 34060, 42),
        new GymPokemon("Arcanine", 37155, 47)],
    GameConstants.Badge.Volcano,
    5000,
    GameConstants.Badge.Soul,
    "I have burned down to nothing! Not even ashes remain! You have earned the VolcanoBadge."
);
gymList["Viridian City"] = new Gym(
    "Giovanni",
    "Viridian City",
    [new GymPokemon("Rhyhorn", 27460, 45),
        new GymPokemon("Dugtrio", 29960, 42),
        new GymPokemon("Nidoqueen", 29960, 44),
        new GymPokemon("Nidoking", 32452, 45),
        new GymPokemon("Rhydon", 34950, 50)],
    GameConstants.Badge.Earth,
    6000,
    GameConstants.Badge.Volcano,
    "Ha! That was a truly intense fight. You have won! As proof, here is the EarthBadge!"
);
gymList["Elite Lorelei"] = new Gym(
    "Elite Lorelei",
    "Elite Lorelei",
    [new GymPokemon("Dewgong", 30810, 52),
        new GymPokemon("Cloyster", 33380, 51),
        new GymPokemon("Slowbro", 35950, 52),
        new GymPokemon("Jynx", 38510, 54),
        new GymPokemon("Lapras", 44182, 54),],
    GameConstants.Badge.Lorelei,
    7500,
    GameConstants.Badge.Earth,
    "...Things shouldn't be this way!"
);
gymList["Elite Bruno"] = new Gym(
    "Elite Bruno",
    "Elite Bruno",
    [new GymPokemon("Onix", 32950, 51),
        new GymPokemon("Hitmonchan", 35300, 53),
        new GymPokemon("Hitmonlee", 37660, 53),
        new GymPokemon("Onix", 40010, 54),
        new GymPokemon("Machamp", 42360, 56),],
    GameConstants.Badge.Bruno,
    7500,
    GameConstants.Badge.Lorelei,
    "Why? How could I lose?"
);
gymList["Elite Agatha"] = new Gym(
    "Elite Agatha",
    "Elite Agatha",
    [new GymPokemon("Gengar", 35045, 54),
        new GymPokemon("Golbat", 36660, 54),
        new GymPokemon("Haunter", 48950, 53),
        new GymPokemon("Arbok", 41241, 56),
        new GymPokemon("Gengar", 45824, 58),],
    GameConstants.Badge.Agatha,
    7500,
    GameConstants.Badge.Bruno,
    "Oh, my! You're something special, child!"
);
gymList["Elite Lance"] = new Gym(
    "Elite Lance",
    "Elite Lance",
    [new GymPokemon("Gyarados", 37320, 56),
        new GymPokemon("Dragonair", 39390, 54),
        new GymPokemon("Dragonair", 41160, 54),
        new GymPokemon("Aerodactyl", 43540, 58),
        new GymPokemon("Dragonite", 45610, 60),],
    GameConstants.Badge.Lance,
    7500,
    GameConstants.Badge.Agatha,
    "That’s it! I hate to admit it, but you are a Pokémon master!"
);
//TODO make champion Gym
