/**
 * Primitive data type for easier handling. Much better than records and normal Object
 */
interface Dictionary<T> {
    [Key: string]: T;
}
class Abilities {
    constructor() {}
    public static list: Dictionary<Ability[]> = {};
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

Abilities.add(new StatBoostingAbility('Overgrow', 'A considerable boost to Grass type damage', 1.2, () => {
    AbilityFactory.giveTypedBoost(PokemonType.Grass, 1.2);
}, () => {
    AbilityFactory.removeTypedBoost(PokemonType.Grass, 1.2);
}), ['Bulbasaur', 'Ivysaur', 'Venusaur']);
Abilities.add(new StatBoostingAbility('Blaze', 'A considerable boost to Fire type damage', 1.2, () => {
    AbilityFactory.giveTypedBoost(PokemonType.Fire, 1.2);
}, () => {
    AbilityFactory.removeTypedBoost(PokemonType.Fire, 1.2);
}), ['Charmander', 'Charmeleon', 'Charizard']);
