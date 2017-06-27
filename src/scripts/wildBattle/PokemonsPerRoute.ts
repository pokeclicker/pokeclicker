/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
const pokemonsPerRoute = {
    0: {
        1: {
            land: ["Pidgey", "Rattata"],
            water: []
        },
        2: {
            land: ["Caterpie", "Weedle", "Rattata", "Nidoran(F)", "Nidoran(M)"],
            water: []
        },
        3: {
            land: ["Pidgey", "Rattata", "Spearow", "Sandshrew", "Jigglypuff", "Mankey"],
            water: []
        },
        4: {
            land: ["Rattata", "Spearow", "Ekans", "Sandshrew", "Mankey"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby", "Seaking"]
        },
        5: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Abra", "Bellsprout"],
            water: []
        },
        6: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Shellder", "Krabby"]
        },
        7: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Vulpix", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Growlithe", "Abra", "Bellsprout"],
            water: []
        },
        8: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Ekans", "Sandshrew", "Vulpix", "Jigglypuff", "Meowth", "Mankey", "Growlithe", "Abra", "Kadabra"],
            water: []
        },
        9: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Sandshrew", "Nidoran(F)", "Nidoran(M)", "Nidorina", "Nidorino"],
            water: []
        },
        10: {
            land: ["Rattata", "Raticate", "Spearow", "Ekans", "Sandshrew", "Nidoran(F)", "Nidoran(M)", "Machop", "Magnemite", "Voltorb"],
            water: ["Poliwag", "Goldeen", "Poliwhirl", "Slowpoke", "Krabby", "Kingler", "Horsea"]
        },
        11: {
            land: ["Pidgey", "Pidgeotto", "Raticate", "Rattata", "Spearow", "Ekans", "Sandshrew", "Drowzee"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby", "Horsea"]
        },
        12: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Bellsprout", "Weepinbell", "Farfetch'd", "Snorlax"],
            water: ["Slowbro", "Magikarp", "Poliwag", "Goldeen", "Tentacool", "Krabby", "Horsea", "Seadra"]
        },
        13: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Bellsprout", "Weepinbell", "Farfetch'd", "Ditto"],
            water: ["Slowbro", "Magikarp", "Poliwag", "Goldeen", "Tentacool", "Krabby", "Horsea", "Seadra"]
        },
        14: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Venomoth", "Bellsprout", "Weepinbell", "Ditto"],
            water: ["Poliwag", "Goldeen"]
        },
        15: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Venomoth", "Bellsprout", "Weepinbell", "Ditto"],
            water: []
        },
        16: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Doduo", "Snorlax"],
            water: []
        },
        17: {
            land: ["Raticate", "Spearow", "Fearow", "Ponyta", "Doduo", "Dodrio"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby"]
        },
        18: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Doduo"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby"]
        },
        19: {
            land: [],
            water: ["Tentacool", "Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"]
        },
        20: {
            land: [],
            water: ["Tentacool", "Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"]
        },
        21: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Raticate", "Tangela"],
            water: ["Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"]
        },
        22: {
            land: ["Rattata", "Spearow", "Nidoran(F)", "Nidoran(M)", "Mankey"],
            water: ["Poliwag", "Poliwhirl", "Goldeen"]
        },
        23: {
            land: ["Spearow", "Fearow", "Ekans", "Arbok", "Sandshrew", "Sandslash", "Nidorina", "Nidorino", "Mankey", "Primeape", "Ditto"],
            water: ["Poliwag", "Goldeen", "Poliwhirl", "Slowbro", "Kingler", "Seadra", "Seaking"]
        },
        24: {
            land: ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgey", "Pidgeotto", "Oddish", "Venonat", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby", "Seaking"]
        },
        25: {
            land: ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto", "Oddish", "Venonat", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby"]
        }
    }
};

