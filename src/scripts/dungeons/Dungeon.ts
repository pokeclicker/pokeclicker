///<reference path="DungeonBossPokemon.ts"/>

/**
 * Gym class.
 */
class Dungeon {

    name: KnockoutObservable<string> = ko.observable("");
    pokemonList: string[];
    baseHealth: number;
    bossList: DungeonBossPokemon[];
    tokenCost: number;
    badgeReq: GameConstants.Badge;
    itemRoute: number;
    level: number;
    allPokemonNames: string[];

    constructor(dungeonName: string, pokemonList: string[], baseHealth: number, bossList: DungeonBossPokemon[], tokenCost: number, badgeReq: GameConstants.Badge, itemRoute: number, level: number) {
        this.name = ko.observable(dungeonName);
        this.pokemonList = pokemonList;
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
            Notifier.notify("You need the " + this.badgeReq + " badge to access this dungeon", GameConstants.NotificationOption.danger);
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

// TODO add all dungeons
const dungeonList: { [dungeonName: string]: Dungeon } = {};
dungeonList["Viridian Forest"] = new Dungeon("Viridian Forest",
    ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto"],
    102,
    [new DungeonBossPokemon("Pikachu", 510, 7)],
    50, GameConstants.Badge.None, 1, 5
);

dungeonList["Digletts Cave"] = new Dungeon("Digletts Cave",
    ["Diglett"],
    1208,
    [new DungeonBossPokemon("Dugtrio", 6040, 31)],
    95, GameConstants.Badge.Boulder, 2, 22
);

dungeonList["Mt. Moon"] = new Dungeon("Mt. Moon",
    ["Sandshrew", "Clefairy", "Zubat", "Paras", "Geodude", "Pidgeotto"],
    834,
    [new DungeonBossPokemon("Kabuto", 4170, 12), new DungeonBossPokemon("Omanyte", 4170, 12)],
    75, GameConstants.Badge.Rainbow, 4, 10
);

dungeonList["Rock Tunnel"] = new Dungeon("Rock Tunnel",
    ["Zubat", "Geodude", "Machop"],
    4117,
    [new DungeonBossPokemon("Onix", 20585, 17)],
    500, GameConstants.Badge.Cascade, 5, 15
);

dungeonList["Power Plant"] = new Dungeon("Power Plant",
    ["Pikachu", "Raichu", "Magnemite", "Magneton", "Grimer", "Muk", "Electrode"],
    13507,
    [new DungeonBossPokemon("Electabuzz", 67535, 35), new DungeonBossPokemon("Zapdos", 101302, 50)],
    1000, GameConstants.Badge.Cascade, 8, 25
);

dungeonList["Pokemon Tower"] = new Dungeon("Pokemon Tower",
    ["Gastly", "Haunter", "Cubone"],
    7523,
    [new DungeonBossPokemon("Marowak", 37615, 30)],
    750, GameConstants.Badge.Cascade, 10, 20
);

dungeonList["Seafoam Islands"] = new Dungeon("Seafoam Islands",
    ["Zubat", "Golbat", "Psyduck", "Golduck", "Slowpoke", "Slowbro", "Shellder", "Krabby", "Horsea", "Staryu"],
    17226,
    [new DungeonBossPokemon("Seel", 86130, 35), new DungeonBossPokemon("Articuno", 129195, 50)],
    1250, GameConstants.Badge.Soul, 15, 30
);

dungeonList["Pokemon Mansion"] = new Dungeon("Pokemon Mansion",
    ["Growlithe", "Vulpix", "Grimer", "Muk", "Koffing", "Weezing"],
    17760,
    [new DungeonBossPokemon("Magmar", 88800, 40)],
    1500, GameConstants.Badge.Soul, 16, 35
);

dungeonList["Victory Road"] = new Dungeon("Victory Road",
    ["Zubat", "Golbat", "Machop", "Geodude", "Graveler", "Onix", "Marowak", "Venomoth"],
    24595,
    [new DungeonBossPokemon("Machoke", 122975, 42), new DungeonBossPokemon("Moltres", 184462, 50)],
    2000, GameConstants.Badge.Earth, 20, 40
);

dungeonList["Cerulean Cave"] = new Dungeon("Cerulean Cave",
    ["Arbok", "Raichu", "Sandslash", "Golbat", "Parasect", "Venomoth", "Kadabra", "Magneton", "Dodrio", "Hypno", "Ditto", "Wigglytuff", "Electrode", "Marowak", "Chansey"],
    28735,
    [new DungeonBossPokemon("Rhydon", 143675, 60), new DungeonBossPokemon("Mewtwo", 215512, 70)],
    2500, GameConstants.Badge.Earth, 20, 55
);