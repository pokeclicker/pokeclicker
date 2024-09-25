class DungeonInfo {
    public static getName() : string {
        return player.town.name;
    }

    public static pokemonList : KnockoutObservable<InfoPokemonList[]> = ko.pureComputed(() => {
        return DungeonInfo.getPokemonList();
    });

    public static trainerList = ko.pureComputed(() => {
        return DungeonInfo.getTrainerList();
    });

    public static itemList : KnockoutObservable<InfoItemList[]> = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });

    private static isShadow() : boolean {
        return player.town.dungeon?.allAvailableShadowPokemon().length;
    }

    public static hasPokemons() : boolean {
        return player.town.dungeon?.allAvailablePokemon().length;
    }

    public static hasTrainers() : boolean {
        return  player.town.dungeon?.normalEncounterList.filter((encounter) => !encounter.hide && encounter.trainer).length ||
                player.town.dungeon?.bossEncounterList.filter((encounter) => !encounter.hide && encounter.trainer).length;
    }

    private static getPokemonList() : InfoPokemonList[] {
        const pokemonArray : InfoPokemon[] =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && !encounter.trainer && !encounter.mimic)
                .map((encounter) => (new InfoPokemon(PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter.pokemonName, 'dungeon', encounter.image, encounter.requirement, encounter.lock, encounter.lockMessage, encounter.mimic, encounter.mimicTier, DungeonInfo.isShadow(), encounter.shadowBackground)))
                .sort((a, b) => a.id - b.id);
        const bossArray : InfoPokemon[] =
            player.town.dungeon?.bossEncounterList
                .filter((encounter) => !encounter.hide && !encounter.trainer)
                .map((encounter) => (new InfoPokemon(PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter.pokemonName, 'boss', encounter.image, encounter.requirement, encounter.lock, encounter.lockMessage, encounter.mimic, encounter.mimicTier, DungeonInfo.isShadow(), encounter.shadowBackground)))
                .sort((a, b) => a.id - b.id);
        const mimicArray : InfoPokemon[] =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && !encounter.trainer && encounter.mimic)
                .map((encounter) => (new InfoPokemon(PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter.pokemonName, 'mimic', encounter.image, encounter.requirement, encounter.lock, encounter.lockMessage, encounter.mimic, encounter.mimicTier, DungeonInfo.isShadow(), encounter.shadowBackground)))
                .sort((a, b) => a.id - b.id);
        const array: InfoPokemonList[] = [];
        array.push(new InfoPokemonList('pokemon', 'Encounters', (pokemonArray ?? [])));
        array.push(new InfoPokemonList('boss', 'Boss', (bossArray ?? [])));
        array.push(new InfoPokemonList('mimic', 'Mimics', (mimicArray ?? [])));
        return array;
    }

    private static getTrainerList() {
        let id = 0;
        const trainersArray =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && encounter.trainer && !(DungeonInfo.isShadow() && encounter.lock))
                .map((encounter) => ({id: id++, name: encounter.name, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage,
                    team: encounter.team.map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadow: encounter.shadow, type: 'pokemon-trainer'})),
                    shadow: encounter.shadowTrainer, type: 'trainer'}));
        const bossArray =
            player.town.dungeon?.bossEncounterList
                .filter((encounter) => !encounter.hide && encounter.trainer && !(DungeonInfo.isShadow() && encounter.lock))
                .map((encounter) => ({id: id++, name: encounter.name, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage,
                    team: encounter.team.map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, shadow: encounter.shadow, type: 'pokemon-trainer-boss'})),
                    shadow: encounter.shadowTrainer, type: 'trainer-boss'}));
        return {
            trainers: {category: 'Encounters', data: (trainersArray ?? [])},
            boss: {category: 'Boss', data: (bossArray ?? [])},
        };
    }

    private static getItemList() : InfoItemList[] {
        const commonArray : InfoItem[] =
            player.town.dungeon?.lootTable.common
                ?.map((item) => (new InfoItem(item.loot, 'common', item.requirement)));
        const rareArray : InfoItem[] =
            player.town.dungeon?.lootTable.rare
                ?.map((item) => (new InfoItem(item.loot, 'rare', item.requirement)));
        const epicArray : InfoItem[] =
            player.town.dungeon?.lootTable.epic
                ?.map((item) => (new InfoItem(item.loot, 'epic', item.requirement)));
        const legendaryArray : InfoItem[] =
            player.town.dungeon?.lootTable.legendary
                ?.map((item) => (new InfoItem(item.loot, 'legendary', item.requirement)));
        const mythicArray : InfoItem[] =
            player.town.dungeon?.lootTable.mythic
                ?.map((item) => (new InfoItem(item.loot, 'mythic', item.requirement)));
        const array: InfoItemList[] = [];
        array.push(new InfoItemList('common', 'Common', (commonArray ?? [])));
        array.push(new InfoItemList('rare', 'Rare', (rareArray ?? [])));
        array.push(new InfoItemList('epic', 'Epic', (epicArray ?? [])));
        array.push(new InfoItemList('legendary', 'Legendary', (legendaryArray ?? [])));
        array.push(new InfoItemList('mythic', 'Mythic', (mythicArray ?? [])));
        return array;
    }
}
