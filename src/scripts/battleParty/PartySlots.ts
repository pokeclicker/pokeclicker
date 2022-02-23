/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
/// <reference path="Ability.ts" />

type MapKeyType = PokemonType | string;

class PartySlots implements Feature {
    name = 'BattleParty';

    saveKey = 'battleParty';
    defaults: Record<string, any>;

    _partyPokemon: KnockoutObservableArray<BattlePartyPokemon> = ko.observableArray([]);
    public static boostPool : Map<MapKeyType,number> = new Map<MapKeyType,number>();
    public static fearMeter : KnockoutObservable<number> = ko.observable(0);
    constructor() {
        for (let i = -1; i < 18; i++) {
            PartySlots.boostPool[PokemonType[i]] = 1;
        }
        // some other boost initialization stuffs
        PartySlots.boostPool['eggSteps'] = 1;
        this.generateTest();
    }

    generateTest() {
        for (let i = 0; i < 6; i++) {
            this.setPokemonAtId(
                i,
                this.generateBattlePartyPokemon(
                    PokemonFactory.generatePartyPokemon(i + 1, true)
                )
            );
        }
    }
    generateBattlePartyPokemon(pokemon: PartyPokemon): BattlePartyPokemon {
        return new BattlePartyPokemon(AbilityList.list[pokemon.name][0], null, null, pokemon);
    }

    get partyPokemon() {
        return this._partyPokemon();
    }

    addPokemon(pokemon: PartyPokemon) {
        this.setPokemonAtId(this._partyPokemon().findIndex(e => e === null) || 6, this.generateBattlePartyPokemon(pokemon));
    }

    getPokemonAtId(id: number): BattlePartyPokemon {
        if (id > 5) {
            return null;
        }

        return this._partyPokemon()[id];
    }

    //set the pokemons at the given id and executes hooks
    setPokemonAtId(id: number, pokemon: BattlePartyPokemon) {
        if (PartySlots.fearMeter() + pokemon.pokemon.attack <= 900) {
            if (id > 5) {
                return;
            }
            const currentPoke = this._partyPokemon[id];
            if (currentPoke != undefined) {
                this.removePokemonAtId(id);
            }
            this.addPokemonAtId(id, pokemon);
        }
    }
    //removes the pokemons at the given id

    removePokemonAtId(id: number) {
        this._partyPokemon()[id].passiveAbility.onExit();
        this._partyPokemon()[id] = null;
        this._partyPokemon(this._partyPokemon());
        GameHelper.incrementObservable(PartySlots.fearMeter, -this._partyPokemon()[id].pokemon);
    }
    addPokemonAtId(id: number, pokemon: BattlePartyPokemon) {
        if (id > 5) {
            return;
        }
        this._partyPokemon()[id] = pokemon;
        this._partyPokemon()[id].passiveAbility.onEnter();
        this._partyPokemon(this._partyPokemon());
        GameHelper.incrementObservable(PartySlots.fearMeter, pokemon.pokemon.attack);
    }

    onSlotClick(index: number) {
        if (this._partyPokemon()[index] != null) {
            this.removePokemonAtId(index);
        }
    }

    hasFreePartySlot(): boolean {
        return this._partyPokemon().length > this._partyPokemon().filter(a => a !== null).length;
    }


    initialize(): void {}

    canAccess(): boolean {
        return true;
    }
    update(delta: number): void {}

    toJSON(): Record<string, any> {
        return {};
    }

    fromJSON(json: Record<string, any>): void {}
}
