class DungeonInfo {
    public static pokemonList = ko.pureComputed(() => {
        return DungeonInfo.getPokemonList();
    });

    public static trainerList = ko.pureComputed(() => {
        return DungeonInfo.getTrainerList();
    });
    
    public static itemList = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });

    public static getName() {
        return player.town.name;
    }

    private static isShadow() {
        return player.town.dungeon?.allAvailableShadowPokemon().length > 0;
    }

    public static hasPokemons() {
        return player.town.dungeon?.allAvailablePokemon().length > 0;
    }

    private static getPokemonList() {
        const pokemonArray =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && !encounter['trainer'] && !encounter.mimic)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadowBackground: encounter.shadowBackground, lock: encounter.lock, lockMessage: encounter.lockMessage, mimic: encounter.mimic, mimicTier: encounter.mimicTier, requirement: encounter['requirement'], shadow: DungeonInfo.isShadow(), type: 'normal'}))
                .sort((a, b) => a.id - b.id);
        const bossArray =
            player.town.dungeon?.bossEncounterList
                .filter((encounter) => !encounter.hide && !encounter['trainer'])
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadowBackground: encounter.shadowBackground, lock: encounter.lock, lockMessage: encounter.lockMessage, mimic: encounter.mimic, mimicTier: encounter.mimicTier, requirement: encounter['requirement'], shadow: DungeonInfo.isShadow(), type: 'boss'}))
                .sort((a, b) => a.id - b.id);
        const mimicArray =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && !encounter['trainer'] && encounter.mimic)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadowBackground: encounter.shadowBackground, lock: encounter.lock, lockMessage: encounter.lockMessage, mimic: encounter.mimic, mimicTier: encounter.mimicTier, requirement: encounter['requirement'], shadow: DungeonInfo.isShadow(), type: 'mimic'}))
                .sort((a, b) => a.id - b.id);
        return {
            pokemon: {category: "Encounters", data: (pokemonArray ?? [])},
            boss: {category: "Boss", data: (bossArray ?? [])},
            mimic: {category: "Mimics", data: (mimicArray ?? [])},
        };
    }

    public static hasTrainers() {
        return  player.town.dungeon?.normalEncounterList.filter((encounter) => !encounter.hide && encounter['trainer']).length > 0 ||
                player.town.dungeon?.bossEncounterList.filter((encounter) => !encounter.hide && encounter['trainer']).length > 0;
    }

    private static getTrainerList() {
        let id = 0;
        const trainersArray =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && encounter['trainer'])
                .map((encounter) => ({id: id++, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage,
                    team: encounter['team'].map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadow: encounter.shadow, type: 'pokemon-trainer'})),
                    shadow: encounter.shadowTrainer, type: 'trainer'}));
        const bossArray =
            player.town.dungeon?.bossEncounterList
                .filter((encounter) => !encounter.hide && encounter['trainer'])
                .map((encounter) => ({id: id++, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage,
                    team: encounter['team'].map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadow: encounter.shadow, type: 'pokemon-trainer-boss'})),
                    shadow: encounter.shadowTrainer, type: 'trainer-boss'}));
        return {
            trainers: {category: "Encounters", data: (trainersArray ?? [])},
            boss: {category: "Boss", data: (bossArray ?? [])},
        };
    }

    private static getItemList() {
        const commonArray =
            player.town.dungeon?.lootTable.common
                ?.map((item) => ({item: item.loot, type: 'common', requirement: item.requirement}));
        const rareArray =
            player.town.dungeon?.lootTable.rare
                ?.map((item) => ({item: item.loot, type: 'rare', requirement: item.requirement}));
        const epicArray =
            player.town.dungeon?.lootTable.epic
                ?.map((item) => ({item: item.loot, type: 'epic', requirement: item.requirement}));
        const legendaryArray =
            player.town.dungeon?.lootTable.legendary
                ?.map((item) => ({item: item.loot, type: 'legendary', requirement: item.requirement}));
        const mythicArray =
            player.town.dungeon?.lootTable.mythic
                ?.map((item) => ({item: item.loot, type: 'mythic', requirement: item.requirement}));
        return {
            common: {category: 'Common', data: (commonArray ?? [])},
            rare: {category: 'Rare', data: (rareArray ?? [])},
            epic: {category: 'Epic', data: (epicArray ?? [])},
            legendary: {category: 'Legendary', data: (legendaryArray ?? [])},
            mythic: {category: 'Mythic', data: (mythicArray ?? [])},
        };
    }
}
