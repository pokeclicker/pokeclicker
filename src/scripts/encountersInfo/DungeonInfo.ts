class DungeonInfo {
    public static getName() {
        return player.town.name;
    }

    public static pokemonList = ko.pureComputed(() => {
        return DungeonInfo.getPokemonList();
    });

    public static itemList = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });

    private static getPokemonList() {
        const pokemonArray =
            player.town.dungeon?.enemyList
                ?.filter((enemy) => {
                    if (!enemy.hasOwnProperty('name')) {
                        if (typeof enemy === 'string') {
                            return true;
                        } else if (enemy.hasOwnProperty('pokemon')) {
                            return !((<DetailedPokemon>enemy).options?.hide ? ((<DetailedPokemon>enemy).options?.requirement ? !(<DetailedPokemon>enemy).options?.requirement.isCompleted() : (<DetailedPokemon>enemy).options?.hide) : false);
                        }
                    } else {
                        return false;
                    }
                })
                .map((enemy) => {
                    if (typeof enemy === 'string') {
                        return {id: PokemonHelper.getPokemonByName((<PokemonNameType>enemy)).id, name: enemy, type: 'normal', requirement: NullRequirement};
                    } else if (enemy.hasOwnProperty('pokemon')) {
                        return {id: PokemonHelper.getPokemonByName((<DetailedPokemon>enemy).pokemon).id, name: (<DetailedPokemon>enemy).pokemon, type: 'normal', requirement: (<DetailedPokemon>enemy).options?.requirement};
                    }
                })
                .sort((a, b) => a.id - b.id);

        const bossArray =
            player.town.dungeon?.bossList
                ?.filter((enemy) => {
                    if (enemy instanceof DungeonBossPokemon) {
                        return !((<DungeonBossPokemon>enemy).options?.hide ? ((<DungeonBossPokemon>enemy).options?.requirement ? !(<DungeonBossPokemon>enemy).options?.requirement.isCompleted() : (<DungeonBossPokemon>enemy).options?.hide) : false);
                    } else {
                        return false;
                    }
                })
                .map((enemy) => ({id: PokemonHelper.getPokemonByName((<DungeonBossPokemon>enemy).name).id, name: (<DungeonBossPokemon>enemy).name, type: 'boss', requirement: (<DungeonBossPokemon>enemy).options?.requirement}))
                .sort((a, b) => a.id - b.id);

        const mimicsArray =
            player.town.dungeon?.mimicList
                ?.filter(enemy => App.game.party.alreadyCaughtPokemonByName(enemy))
                .map((enemy) => {
                    return {id: PokemonHelper.getPokemonByName(enemy).id, name: enemy, type: 'mimic', requirement: NullRequirement};
                })
                .sort((a, b) => a.id - b.id);

        return {
            pokemon: {category: 'Encounters', data: (pokemonArray ?? [])},
            boss: {category: 'Boss', data: (bossArray ?? [])},
            mimics: {category: 'Mimics', data: (mimicsArray ?? [])},
        };
    }

    private static getItemList() {
        const commonArray =
            player.town.dungeon?.lootTable.common
                ?.map((item) => {
                    return {item: item.loot, type: 'common', requirement: item.requirement};
                });

        const rareArray =
            player.town.dungeon?.lootTable.rare
                ?.map((item) => {
                    return {item: item.loot, type: 'rare', requirement: item.requirement};
                });

        const epicArray =
            player.town.dungeon?.lootTable.epic
                ?.map((item) => {
                    return {item: item.loot, type: 'epic', requirement: item.requirement};
                });

        const legendaryArray =
            player.town.dungeon?.lootTable.legendary
                ?.map((item) => {
                    return {item: item.loot, type: 'legendary', requirement: item.requirement};
                });

        const mythicArray =
            player.town.dungeon?.lootTable.mythic
                ?.map((item) => {
                    return {item: item.loot, type: 'mythic', requirement: item.requirement};
                });

        return {
            common: {category: 'Common', data: (commonArray ?? [])},
            rare: {category: 'Rare', data: (rareArray ?? [])},
            epic: {category: 'Epic', data: (epicArray ?? [])},
            legendary: {category: 'Legendary', data: (legendaryArray ?? [])},
            mythic: {category: 'Mythic', data: (mythicArray ?? [])},
        };
    }
}
