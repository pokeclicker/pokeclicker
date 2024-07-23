import type PackInterface from './PackInterface';
import { PackNameType } from './PackNameType';

export default class DataPack implements PackInterface {
    constructor(
        public name: PackNameType,
        public path: string,
        public shiny: boolean,
        public female: boolean,
        public shadow: boolean,
        public animated: boolean,
        public size: number,
        public sprites: number,
        public pokemons: number[],
    ) {
    }
}