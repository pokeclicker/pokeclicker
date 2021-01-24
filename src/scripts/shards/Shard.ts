class Shard extends Item {

    constructor(public type: PokemonType) {
        super(`${PokemonType[type]} Shard`, { imageDirectory: 'shards' });
    }

}

// Creating all Shard items
Object.keys(PokemonType).map(Number).filter((item) => item >= 0).forEach(type => {
    ItemList[`${PokemonType[type]} Shard`] = new Shard(type);
});
