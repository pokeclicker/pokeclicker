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
        public giftedContestAppealByRank: ContestRank = ContestRank.Master,
        public giftedContestTypes: ContestType[] = undefined,
        currency: Currency = Currency.contestToken,
        ignoreEV = false,
        displayName: string = undefined,
        options?: ShopOptions,
    ) {
        super(pokemon, basePrice, currency, ignoreEV, displayName, options);
        this.type = pokemon;
        this.contestAppeal = ContestHelper.rankAppeal[giftedContestAppealByRank];
        this.contestTypes = giftedContestTypes ?? pokemonMap[pokemon].contestTypes;
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

    getDescription(): string {
        return `Get a ${ContestRank[this.giftedContestAppealByRank].replace(' ', '-')}-Rank-ready ${super.displayName}!`;
    }
}
