///<reference path="DungeonBossPokemon.ts"/>

/**
 * Gym class.
 */
class Dungeon {

    name: KnockoutObservable<string> = ko.observable("");
    pokemonList: string[];
    itemList: GameConstants.BattleItemType[];
    baseHealth: number;
    bossList: DungeonBossPokemon[];
    tokenCost: number;
    badgeReq: GameConstants.Badge;
    itemRoute: number;
    level: number;
    allPokemonNames: string[];

    constructor(dungeonName: string, pokemonList: string[], itemList: GameConstants.BattleItemType[], baseHealth: number, bossList: DungeonBossPokemon[], tokenCost: number, badgeReq: GameConstants.Badge, itemRoute: number, level: number) {
        this.name = ko.observable(dungeonName);
        this.pokemonList = pokemonList;
        this.itemList = itemList;
        this.baseHealth = baseHealth;
        this.bossList = bossList;
        this.tokenCost = tokenCost;
        this.badgeReq = badgeReq;
        this.itemRoute = itemRoute;
        this.level = level;
        this.calculateAllPokemonNames();
    }

    public isUnlocked(): boolean {
        if(!player.hasBadge(this.badgeReq)){
            Notifier.notify("You need the " + GameConstants.Badge[this.badgeReq] + " badge to access this dungeon", GameConstants.NotificationOption.danger);
            return false;
        }

        if(!player.hasKeyItem("Dungeon ticket")){
            Notifier.notify("You need the Dungeon ticket to access dungeons", GameConstants.NotificationOption.danger);
            return false
        }
        return true;
    }

    private calculateAllPokemonNames() {
        this.allPokemonNames = JSON.parse(JSON.stringify(this.pokemonList));
        for (let i = 0; i < this.bossList.length; i++) {
            this.allPokemonNames.push(this.bossList[i].name);
        }
    }
}

/**
 * Data list that contains all dungeons, accessible by name.
 */

// TODO add 22-25
const dungeonList: { [dungeonName: string]: Dungeon } = {};
dungeonList["Viridian Forest"] = new Dungeon("Viridian Forest",
    ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    102,
    [new DungeonBossPokemon("Pikachu", 510, 7)],
    50, GameConstants.Badge.None, 1, 5
);

dungeonList["Digletts Cave"] = new Dungeon("Digletts Cave",
    ["Diglett"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    1208,
    [new DungeonBossPokemon("Dugtrio", 6040, 31)],
    95, GameConstants.Badge.Boulder, 2, 22
);

dungeonList["Mt. Moon"] = new Dungeon("Mt. Moon",
    ["Sandshrew", "Clefairy", "Zubat", "Paras", "Geodude", "Pidgeotto"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Token_collector],
    834,
    [new DungeonBossPokemon("Kabuto", 4170, 12), new DungeonBossPokemon("Omanyte", 4170, 12)],
    75, GameConstants.Badge.Boulder, 4, 10
);

dungeonList["Rock Tunnel"] = new Dungeon("Rock Tunnel",
    ["Zubat", "Geodude", "Machop"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    4117,
    [new DungeonBossPokemon("Onix", 20585, 17)],
    500, GameConstants.Badge.Cascade, 5, 15
);

dungeonList["Power Plant"] = new Dungeon("Power Plant",
    ["Pikachu", "Raichu", "Magnemite", "Magneton", "Grimer", "Muk", "Electrode"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    13507,
    [new DungeonBossPokemon("Electabuzz", 67535, 35), new DungeonBossPokemon("Zapdos", 101302, 50)],
    1000, GameConstants.Badge.Cascade, 8, 25
);

dungeonList["Pokemon Tower"] = new Dungeon("Pokemon Tower",
    ["Gastly", "Haunter", "Cubone"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    7523,
    [new DungeonBossPokemon("Marowak", 37615, 30)],
    750, GameConstants.Badge.Cascade, 10, 20
);

dungeonList["Seafoam Islands"] = new Dungeon("Seafoam Islands",
    ["Zubat", "Golbat", "Psyduck", "Golduck", "Slowpoke", "Slowbro", "Shellder", "Krabby", "Horsea", "Staryu"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xExp],
    17226,
    [new DungeonBossPokemon("Seel", 86130, 35), new DungeonBossPokemon("Articuno", 129195, 50)],
    1250, GameConstants.Badge.Soul, 15, 30
);

dungeonList["Pokemon Mansion"] = new Dungeon("Pokemon Mansion",
    ["Growlithe", "Vulpix", "Grimer", "Muk", "Koffing", "Weezing"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    17760,
    [new DungeonBossPokemon("Magmar", 88800, 40)],
    1500, GameConstants.Badge.Soul, 16, 35
);

dungeonList["Victory Road"] = new Dungeon("Victory Road",
    ["Zubat", "Golbat", "Machop", "Geodude", "Graveler", "Onix", "Marowak", "Venomoth"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    24595,
    [new DungeonBossPokemon("Machoke", 122975, 42), new DungeonBossPokemon("Moltres", 184462, 50)],
    2000, GameConstants.Badge.Earth, 20, 40
);

dungeonList["Cerulean Cave"] = new Dungeon("Cerulean Cave",
    ["Arbok", "Raichu", "Sandslash", "Golbat", "Parasect", "Venomoth", "Kadabra", "Magneton", "Dodrio", "Hypno", "Ditto", "Wigglytuff", "Electrode", "Marowak", "Chansey"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    28735,
    [new DungeonBossPokemon("Rhydon", 143675, 60), new DungeonBossPokemon("Mewtwo", 215512, 70)],
    2500, GameConstants.Badge.Elite_Champion, 20, 55
);

dungeonList["Sprout Tower"] = new Dungeon("Sprout Tower",
    ["Rattata", "Gastly", "Hoothoot"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    28735,
    [new DungeonBossPokemon("Bellsprout", 2000, 10)],
    2500, GameConstants.Badge.Elite_Champion, 31, 5
);

dungeonList["Ruins of Alph"] = new Dungeon("Ruins of Alph",
    ["Natu", "Wooper", "Quagsire", "Smeargle", "Magikarp", "Poliwag", "Poliwhirl"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    600,
    [new DungeonBossPokemon("Unown", 3000, 14)],
    3000, GameConstants.Badge.Zephyr, 32, 7
);

dungeonList["Union Cave"] = new Dungeon("Union Cave",
    ["Rattata", "Sandshrew", "Zubat", "Geodude", "Onix", "Goldeen", "Magikarp"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    600,
    [new DungeonBossPokemon("Wooper", 3000, 14)],
    3000, GameConstants.Badge.Zephyr, 32, 7
);

dungeonList["Slowpoke Well"] = new Dungeon("Slowpoke Well",
    ["Zubat", "Slowpoke"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
    900,
    [new DungeonBossPokemon("Slowbro", 4000, 20)],
    3500, GameConstants.Badge.Zephyr, 33, 12
);

dungeonList["Ilex Forest"] = new Dungeon("Ilex Forest",
    ["Caterpie", "Metapod", "Weedle", "Kakuna", "Zubat", "Oddish", "Paras", "Hoothoot"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    1200,
    [new DungeonBossPokemon("Noctowl", 5000, 30), new DungeonBossPokemon("Beedrill", 5000, 30), new DungeonBossPokemon("Butterfree", 5000, 30), new DungeonBossPokemon("Celebi", 300000, 50)],
    4000, GameConstants.Badge.Hive, 34, 15
);

dungeonList["Burned Tower"] = new Dungeon("Burned Tower",
    ["Rattata", "Zubat", "Koffing", "Raticate"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    1500,
    [new DungeonBossPokemon("Golbat", 6000, 35), new DungeonBossPokemon("Weezing", 6000, 35), new DungeonBossPokemon("Shuckle", 300000, 50)],
    4500, GameConstants.Badge.Fog, 37, 20
);

dungeonList["Tin Tower"] = new Dungeon("Tin Tower",
    ["Rattata", "Gastly"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    1500,
    [new DungeonBossPokemon("Raticate", 6000, 35), new DungeonBossPokemon("Haunter", 6000, 35), new DungeonBossPokemon("Ho-Oh", 300000, 70)],
    4500, GameConstants.Badge.Fog, 37, 20
);

dungeonList["Whirl Islands"] = new Dungeon("Whirl Islands",
    ["Zubat", "Golbat", "Seel", "Krabby", "Horsea"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xExp],
    1800,
    [new DungeonBossPokemon("Dewgong", 7000, 40), new DungeonBossPokemon("Kingler", 7000, 40), new DungeonBossPokemon("Lugia", 300000, 70)],
    5000, GameConstants.Badge.Storm, 41, 25
);

dungeonList["Mt Mortar"] = new Dungeon("Mt Mortar",
    ["Rattata", "Zubat", "Geodude", "Marill", "Raticate", "Golbat", "Graveler"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    2100,
    [new DungeonBossPokemon("Tyrogue", 8000, 45)],
    5500, GameConstants.Badge.Storm, 42, 30
);

dungeonList["Ice Path"] = new Dungeon("Ice Path",
    ["Zubat", "Jynx", "Swinub"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    2400,
    [new DungeonBossPokemon("Delibird", 9000, 50)],
    6000, GameConstants.Badge.Glacier, 44, 32
);

dungeonList["Dark Cave"] = new Dungeon("Dark Cave",
    ["Zubat", "Geodude", "Golbat", "Graveler", "Wobbuffet"],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3000,
    [new DungeonBossPokemon("Dunsparce", 10000, 55)],
    6500, GameConstants.Badge.Rising, 45, 35
);

dungeonList["Mt Silver"] = new Dungeon("Mt Silver",
    ["Ponyta", "Doduo", "Tangela", "Sneasel", "Ursaring", "Donphan", "Teddiursa", "Phanpy", "Quagsire", "Misdreavus"],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
    3500,
    [new DungeonBossPokemon("Larvitar", 12000, 60)],
    10000, GameConstants.Badge.Elite_Karen, 28, 50
);
