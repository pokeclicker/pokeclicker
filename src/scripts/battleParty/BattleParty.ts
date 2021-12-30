/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
/// <reference path="Ability.ts" />

class BattleParty implements Feature {

    name = 'BattleParty';


    saveKey = 'battleParty';
    defaults: Record<string, any>;

    _partyPokemon: KnockoutObservableArray<PartyPokemon>;

    constructor() {
        this._partyPokemon = ko.observableArray([]);
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(-115, true));
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(1, true));
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(112, true));
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(313, true));
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(261, true));
        this._partyPokemon.push(PokemonFactory.generatePartyPokemon(901, true));
    }

    get partyPokemon() {
        return this._partyPokemon();
    }

    getPokemonAtId(id: number): PartyPokemon {
        if (id > 5) {
            return null;
        }

        return this._partyPokemon()[id];
    }

    //set the pokemons at the given id and executes hooks
    setPokemonAtId(id: number, pokemon: PartyPokemon) {
        if (id > 5) {
            return;
        }
        const currentPoke = this._partyPokemon[id];
        if (currentPoke != undefined) {
            currentPoke.passiveAbility.remove();
        }


        this._partyPokemon()[id] = pokemon;
    }




    initialize(): void {}

    canAccess(): boolean {
        return true;
    }
    update(delta: number): void {}


    toJSON(): Record<string, any> {
        return {};
    }

    fromJSON(json: Record<string, any>): void { }


}
