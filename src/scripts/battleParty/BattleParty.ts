/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class BattleParty implements Feature {

    name = 'BattleParty';


    saveKey = 'battleParty';
    defaults: Record<string, any>;

    _partyPokemon: KnockoutObservableArray<PartyPokemon>;

    constructor() {
        this._partyPokemon = ko.observableArray([]);
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
