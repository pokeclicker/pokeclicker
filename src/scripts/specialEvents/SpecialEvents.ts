class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events: SpecialEvent[] = [];

    static newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.title == title)) {
            SpecialEvents.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction));
        }
    }

    initialize(): void {}

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours?
// Create our events here for now


// Yearly
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu for a limited time roaming Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap['Flying Pikachu']));
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 'Flying Pikachu');
    }
);
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokemon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap['Bulbasaur (clone)']));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap['Charmander (clone)']));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap['Squirtle (clone)']));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
        RoamingPokemonList.list[GameConstants.Region.kanto] = RoamingPokemonList.list[GameConstants.Region.kanto].filter(r => !['Bulbasaur (clone)', 'Charmander (clone)', 'Squirtle (clone)'].includes(r.pokemon.name));
    }
);
SpecialEvents.newEvent('Halloween!', 'Encounter Spooky Pokemon for a limited time around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 9, 30, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Bulbasaur') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Gastly') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Togepi') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Misdreavus') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Pikachu (Gengar)') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Shuppet') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Duskull') : null;
        });
    },
    // End
    new Date(new Date().getFullYear(), 10, 5, 23), () => {
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Bulbasaur', 'Gastly'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Togepi', 'Misdreavus'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Pikachu (Gengar)', 'Shuppet', 'Duskull'].includes(p)));
    }
);
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Dragonite for a limited time roaming around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        // Add to every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.add(region, new RoamingPokemon(pokemonMap['Santa Dragonite']));
        });
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        // Remove from every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.remove(region, 'Santa Dragonite');
        });
    }
);
