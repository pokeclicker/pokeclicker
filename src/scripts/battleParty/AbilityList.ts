/**
 * Primitive data type for easier handling. Much better than records and normal Object
 */
class AbilityList {
    constructor() {}
    public static list: Map<string, Ability[]> = new Map<string, Ability[]>();
    public static findPokemonAbilities(name: PokemonNameType) {
        return this.list[name];
    }
    public static add(ability: Ability, pokemons: PokemonNameType[]) {
        pokemons.forEach(e => {
            if (this.list[e]) {
                this.list[e].push(ability);
            } else {
                this.list[e] = [ability];
            }
        });
    }
}

AbilityList.add(new StatBoostingAbility('Overgrow', 'A considerable boost to Grass type damage', 1.2, () => {
    AbilityFactory.giveTypedBoost(PokemonType.Grass, 1.2);
}, () => {
    AbilityFactory.removeTypedBoost(PokemonType.Grass, 1.2);
}), ['Bulbasaur', 'Ivysaur', 'Venusaur']);
AbilityList.add(new StatBoostingAbility('Blaze', 'A considerable boost to Fire type damage', 1.2, () => {
    AbilityFactory.giveTypedBoost(PokemonType.Fire, 1.2);
}, () => {
    AbilityFactory.removeTypedBoost(PokemonType.Fire, 1.2);
}), ['Charmander', 'Charmeleon', 'Charizard']);
