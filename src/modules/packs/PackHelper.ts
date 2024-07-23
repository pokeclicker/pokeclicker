import { PackNameType } from './PackNameType';
import DataPack from './DataPack';
import { packList } from './PackList';

export function getPack(name: PackNameType): DataPack {
    const basePack = packList.find((pack) => pack.name == name);
    if (!basePack) {
        console.warn('Could not find pack', name);
        return null;
    }
    return new DataPack(
        basePack.name,
        basePack.path,
        basePack.shiny,
        basePack.female,
        basePack.shadow,
        basePack.animated,
        basePack.size,
        basePack.sprites,
        basePack.pokemons,
    );
}

//TODO : VERY IMPORTANT : this function must be optimized !
export function isInPack(pack: DataPack, pokemonId: number): boolean {
    return pack.pokemons.includes(pokemonId);
}