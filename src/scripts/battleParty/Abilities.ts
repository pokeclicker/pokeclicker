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
