import { PokemonNameType } from  '../pokemons/PokemonNameType';
import { Currency } from '../GameConstants';
import { ShopOptions } from './types';
import * as PokemonHelper from '../pokemons/PokemonHelper';
import PokemonItem from './PokemonItem';
import ContestType from '../enums/ContestType';
import { pokemonMap } from '../pokemons/PokemonList';
import ContestRank from '../enums/ContestRank';
import ContestHelper from '../contest/ContestHelper';

export default class ContestPokemonItem extends PokemonItem {
    type: PokemonNameType;
    contestAppeal: number;
    contestTypes: ContestType[];

    constructor(
        pokemon: PokemonNameType,
        basePrice: number = undefined,
        public giftedContestTypes: ContestType[] = undefined,
        public giftedContestAppealByRank: ContestRank = ContestRank.Master,
        ignoreEV = false,
        displayName: string = undefined,
        currency: Currency = Currency.contestToken,
        options?: ShopOptions,
        description: string = `Get a contest-ready ${pokemon} with a base appeal of ${ContestHelper.rankAppeal[giftedContestAppealByRank]}!`,
    ) {
        super(pokemon, basePrice, currency, ignoreEV, displayName, options, undefined, description);
        this.type = pokemon;
        this.contestTypes = giftedContestTypes ?? pokemonMap[pokemon].contestTypes;
        this.contestAppeal = ContestHelper.rankAppeal[giftedContestAppealByRank];
    }

    gain(amt: number) {
        super.gain(amt);
        const pokemonName = this.type;
        const pokemonID = PokemonHelper.getPokemonByName(pokemonName).id;
        const partyPokemon = App.game.party.getPokemon(pokemonID);
        const pConTypes = partyPokemon.currentContestTypes;
        partyPokemon.currentContestTypes = pConTypes.concat(this.contestTypes);
        const pAppeal = partyPokemon.contestAppeal;
        partyPokemon.contestAppeal = Math.max(pAppeal, this.contestAppeal);
    }

    // eslint-disable-next-line class-methods-use-this
    isSoldOut(): boolean {
        if (this.maxAmount === 1) {
            return App.game.party.caughtPokemon.find(p => p.name === this.type).contestAppeal >= ContestHelper.rankAppeal[this.giftedContestAppealByRank];
        }
        return false;
    }
}
