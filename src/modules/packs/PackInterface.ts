import { PackNameType } from './PackNameType';

export default interface PackInterface {
    name: PackNameType;
    path: string,
    shiny: boolean;
    female: boolean;
    shadow: boolean;
    animated: boolean;
    size: number;
    sprites: number;
    pokemons: number[];
}