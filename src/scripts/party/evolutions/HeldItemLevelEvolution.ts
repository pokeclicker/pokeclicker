///<reference path="Evolution.ts"/>
class HeldItemLevelEvolution extends LevelEvolution {
    triggered: boolean;

    constructor(
        basePokemon: PokemonNameType,
        evolvedPokemon: PokemonNameType,
        level: number,
        private heldItemName: ItemNameType
    ) {
        super(basePokemon, evolvedPokemon, level);
        this.type.push(EvolutionType.Level);
    }

    isSatisfied(): boolean {
        if (!super.isSatisfied()) {
            return false;
        }
        const heldItem = App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).heldItem();
        return heldItem && heldItem.name == this.heldItemName;
    }
}
