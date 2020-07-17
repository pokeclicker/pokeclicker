class EggItem extends Item {

    type: GameConstants.EggItemType;

    constructor(type: GameConstants.EggItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(GameConstants.EggItemType[type], basePrice, currency);
        this.type = type;
    }

    use() {
        if (player.itemList[this.name()]() <= 0) {
            return;
        }

        let success: boolean;
        if (this.type === GameConstants.EggItemType.Pokemon_egg) {
            success = App.game.breeding.gainPokemonEgg(pokemonMap.random(GameConstants.TotalPokemonsPerRegion[player.highestRegion()]));
        } else if (this.type === GameConstants.EggItemType.Mystery_egg) {
            success = App.game.breeding.gainRandomEgg();
        } else {
            const etype = EggType[GameConstants.EggItemType[this.type].split('_')[0]];
            success = App.game.breeding.gainEgg(App.game.breeding.createTypedEgg(etype));
        }

        if (success) {
            player.loseItem(this.name(), 1);
        }
    }
}


ItemList['Fire_egg']     = new EggItem(GameConstants.EggItemType.Fire_egg, 1000);
ItemList['Water_egg']    = new EggItem(GameConstants.EggItemType.Water_egg, 1000);
ItemList['Grass_egg']    = new EggItem(GameConstants.EggItemType.Grass_egg, 1000);
ItemList['Fighting_egg'] = new EggItem(GameConstants.EggItemType.Fighting_egg, 1000);
ItemList['Electric_egg'] = new EggItem(GameConstants.EggItemType.Electric_egg, 1000);
ItemList['Dragon_egg']   = new EggItem(GameConstants.EggItemType.Dragon_egg, 1000);
ItemList['Pokemon_egg']  = new EggItem(GameConstants.EggItemType.Pokemon_egg, 1000);
ItemList['Mystery_egg']  = new EggItem(GameConstants.EggItemType.Mystery_egg, 700);
