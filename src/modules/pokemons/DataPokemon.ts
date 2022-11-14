import PokemonType from '../enums/PokemonType';
import BagItem from '../interfaces/BagItem';
import PokemonInterface from '../interfaces/Pokemon';
import LevelType from '../party/LevelType';
import { EvoData } from './evolutions/Base';
import { PokemonNameType } from './PokemonNameType';

export default class DataPokemon implements PokemonInterface {
    shiny: boolean;

    constructor(
        public id: number,
        public name: PokemonNameType,
        public catchRate: number,
        public evolutions: EvoData[],
        public type1: PokemonType,
        public type2: PokemonType,
        public attack: number,
        public hitpoints: number,
        public levelType: LevelType,
        public exp: number,
        public eggCycles: number,
        public heldItem: BagItem | null,
        public gender,
    ) {
        this.shiny = false;
    }
}
