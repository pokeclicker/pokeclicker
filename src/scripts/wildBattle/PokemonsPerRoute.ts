/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
const pokemonsPerRoute = {
    0: {
        1: {
            land: ["Pidgey", "Rattata"],
            water: [],
            headbutt: []
        },
        2: {
            land: ["Caterpie", "Weedle", "Rattata", "Nidoran(F)", "Nidoran(M)"],
            water: [],
            headbutt: []
        },
        3: {
            land: ["Pidgey", "Rattata", "Spearow", "Sandshrew", "Jigglypuff", "Mankey"],
            water: [],
            headbutt: []
        },
        4: {
            land: ["Rattata", "Spearow", "Ekans", "Sandshrew", "Mankey"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby", "Seaking"],
            headbutt: []
        },
        5: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Abra", "Bellsprout"],
            water: [],
            headbutt: []
        },
        6: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Shellder", "Krabby"],
            headbutt: []
        },
        7: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Vulpix", "Jigglypuff", "Oddish", "Meowth", "Mankey", "Growlithe", "Abra", "Bellsprout"],
            water: [],
            headbutt: []
        },
        8: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Ekans", "Sandshrew", "Vulpix", "Jigglypuff", "Meowth", "Mankey", "Growlithe", "Abra", "Kadabra"],
            water: [],
            headbutt: []
        },
        9: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Sandshrew", "Nidoran(F)", "Nidoran(M)", "Nidorina", "Nidorino"],
            water: [],
            headbutt: []
        },
        10: {
            land: ["Rattata", "Raticate", "Spearow", "Ekans", "Sandshrew", "Nidoran(F)", "Nidoran(M)", "Machop", "Magnemite", "Voltorb"],
            water: ["Poliwag", "Goldeen", "Poliwhirl", "Slowpoke", "Krabby", "Kingler", "Horsea"],
            headbutt: []
        },
        11: {
            land: ["Pidgey", "Pidgeotto", "Raticate", "Rattata", "Spearow", "Ekans", "Sandshrew", "Drowzee"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby", "Horsea"],
            headbutt: []
        },
        12: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Bellsprout", "Weepinbell", "Farfetch'd", "Snorlax"],
            water: ["Slowbro", "Magikarp", "Poliwag", "Goldeen", "Tentacool", "Krabby", "Horsea", "Seadra"],
            headbutt: []
        },
        13: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Bellsprout", "Weepinbell", "Farfetch'd", "Ditto"],
            water: ["Slowbro", "Magikarp", "Poliwag", "Goldeen", "Tentacool", "Krabby", "Horsea", "Seadra"],
            headbutt: []
        },
        14: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Venomoth", "Bellsprout", "Weepinbell", "Ditto"],
            water: ["Poliwag", "Goldeen"],
            headbutt: []
        },
        15: {
            land: ["Pidgey", "Pidgeotto", "Oddish", "Gloom", "Venonat", "Venomoth", "Bellsprout", "Weepinbell", "Ditto"],
            water: [],
            headbutt: []
        },
        16: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Doduo", "Snorlax"],
            water: [],
            headbutt: []
        },
        17: {
            land: ["Raticate", "Spearow", "Fearow", "Ponyta", "Doduo", "Dodrio"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby"],
            headbutt: []
        },
        18: {
            land: ["Rattata", "Raticate", "Spearow", "Fearow", "Doduo"],
            water: ["Poliwag", "Goldeen", "Tentacool", "Shellder", "Krabby"],
            headbutt: []
        },
        19: {
            land: [],
            water: ["Tentacool", "Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"],
            headbutt: []
        },
        20: {
            land: [],
            water: ["Tentacool", "Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"],
            headbutt: []
        },
        21: {
            land: ["Pidgey", "Pidgeotto", "Rattata", "Raticate", "Tangela"],
            water: ["Magikarp", "Poliwag", "Goldeen", "Tentacruel", "Shellder", "Horsea", "Staryu"],
            headbutt: []
        },
        22: {
            land: ["Rattata", "Spearow", "Nidoran(F)", "Nidoran(M)", "Mankey"],
            water: ["Poliwag", "Poliwhirl", "Goldeen"],
            headbutt: []
        },
        23: {
            land: ["Spearow", "Fearow", "Ekans", "Arbok", "Sandshrew", "Sandslash", "Nidorina", "Nidorino", "Mankey", "Primeape", "Ditto"],
            water: ["Poliwag", "Goldeen", "Poliwhirl", "Slowbro", "Kingler", "Seadra", "Seaking"],
            headbutt: []
        },
        24: {
            land: ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgey", "Pidgeotto", "Oddish", "Venonat", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby", "Seaking"],
            headbutt: []
        },
        25: {
            land: ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto", "Oddish", "Venonat", "Abra", "Bellsprout"],
            water: ["Poliwag", "Goldeen", "Psyduck", "Krabby"],
            headbutt: []
        }
    },
    1: {
        29: {
            land: ["Pidgey", "Rattata","Sentret","Hoothoot","Hoppip"],
            water: [],
            headbutt: ["Spearow","Exeggcute","Ledyba","Spinarak","Aipom","Hoothoot","Pineco","Heracross"]
        },
        30: {
            land: ["Pidgey", "Rattata","Caterpie","Metapod","Weedle","Kakuna","Zubat","Poliwag","Hoothoot","Ledyba","Spinarak","Hoppip"],
            water: ["Poliwag","Poliwhirl","Magikarp"],
            headbutt: ["Spearow","Exeggcute","Hoothoot","Ledyba","Spinarak","Aipom","Pineco","Heracross"]
        },
        31: {
            land: ["Pidgey", "Rattata","Caterpie","Metapod","Weedle","Kakuna","Zubat","Poliwag","Hoothoot","Ledyba","Spinarak","Hoppip","Bellsprout","Gastly"],
            water: ["Poliwag","Poliwhirl","Magikarp"],
            headbutt: ["Spearow","Exeggcute","Hoothoot","Ledyba","Spinarak","Aipom","Pineco","Heracross"]
        },
        32: {
            land: ["Pidgey", "Rattata","Ekans","Zubat","Bellsprout","Gastly","Hoothoot","Mareep","Hoppip","Wooper"],
            water: ["Tentacool","Tentacruel","Quagsire","Magikarp","Qwilfish"],
            headbutt: ["Spearow","Ekans","Exeggcute","Hoothoot","Aipom","Pineco","Heracross"]
        },
        33: {
            land: ["Spearow", "Rattata","Ekans","Zubat","Geodude","Hoppip"],
            water: [],
            headbutt: ["Spearow","Ekans","Aipom","Heracross"]
        },
        34: {
            land: ["Pidgey", "Rattata","Jigglypuff","Abra","Drowzee","Ditto","Hoothoot","Snubbull"],
            water: ["Tentacool","Tentacruel","Krabby","Magikarp","Staryu","Corsola","Kingler"],
            headbutt: []
        },
        35: {
            land: ["Pidgey", "Rattata"],
            water: [],
            headbutt: ["Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        },
        36: {
            land: ["Pidgey", "Nidoran(M)","Nidoran(F)","Vulpix","Growlithe","Bellsprout","Gastly","Hoothoot","Ledyba","Spinarak","Stantler"],
            water: [],
            headbutt: ["Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        },
        37: {
            land: ["Pidgey", "Pidgeotto","Vulpix","Growlithe","Hoothoot","Noctowl","Ledyba","Ledian","Spinarak","Ariados","Stantler"],
            water: [],
            headbutt: ["Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        },
        38: {
            land: ["Pidgeotto", "Rattata","Raticate","Meowth","Magnemite","Farfetch'd","Tauros","Noctowl","Snubbull","Miltank"],
            water: [],
            headbutt: ["Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        },
        39: {
            land: ["Pidgeotto", "Rattata","Raticate","Meowth","Magnemite","Farfetch'd","Tauros","Noctowl","Miltank"],
            water: [],
            headbutt: ["Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        },
        40: {
            land: [],
            water: ["Tentacool","Tentacruel","Krabby","Magikarp","Staryu","Corsola","Kingler"],
            headbutt: []
        },
        41: {
            land: [],
            water: ["Tentacool","Tentacruel","Mantine","Krabby","Magikarp","Staryu","Corsola","Kingler"],
            headbutt: []
        },
        42: {
            land: ["Raticate", "Rattata","Spearow","Fearow","Ekans","Arbok","Zubat","Golbat","Mankey","Mareep","Flaaffy","Marill"],
            water: ["Goldeen","Seaking","Magikarp"],
            headbutt: ["Spearow","Ekans","Aipom","Heracross"]
        },
        43: {
            land: ["Pidgeotto", "Raticate","Venonat","Venomoth","Farfetch'd","Sentret","Furret","Noctowl","Mareep","Flaaffy","Girafarig"],
            water: ["Magikarp","Poliwag"],
            headbutt: ["Spearow","Venonat","Exeggcute","Hoothoot","Aipom","Pineco","Heracross"]
        },
        44: {
            land: ["Poliwag", "Poliwhirl","Bellsprout","Weepinbell","Lickitung","Tangela"],
            water: ["Poliwag","Poliwhirl","Magikarp","Remoraid"],
            headbutt: ["Spearow","Aipom","Heracross"]
        },
        45: {
            land: ["Geodude", "Graveler","Gligar","Teddiursa","Skarmory","Phanpy","Donphan"],
            water: ["Magikarp","Dratini","Dragonair"],
            headbutt: []
        },
        46: {
            land: ["Spearow", "Rattata","Jigglypuff","Geodude","Phanpy"],
            water: [],
            headbutt: []
        },
        47: {
            land: ["Raticate", "Spearow","Fearow","Gloom","Farfetch'd","Ditto","Noctowl","Miltank"],
            water: ["Tentacool","Seel","Staryu","Magikarp","Shellder","Chinchou","Lanturn"],
            headbutt: ["Metapod","Butterfree","Kakuna","Beedrill","Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco","Heracross"]
        },
        48: {
            land: ["Fearow", "Vulpix","Gloom","Diglett","Growlithe","Farfetch'd","Tauros","Hoppip","Girafarig"],
            water: [],
            headbutt: ["Exeggcute","Hoothoot","Ledyba","Spinarak","Pineco"]
        }
    },
    2: {
        
    }
};

