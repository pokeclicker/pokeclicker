import { Computed } from 'knockout';
import { MaxIDPerRegion, Region, BattlePokemonGender } from '../GameConstants';
import { PokemonNameType } from './PokemonNameType';
import P from './mapProvider';
import PokemonType from '../enums/PokemonType';
import DataPokemon from './DataPokemon';
import GameHelper from '../GameHelper';

// eslint-disable-next-line import/prefer-default-export
export function calcNativeRegion(pokemonName: PokemonNameType) {
    const pokemon = P.pokemonMap[pokemonName];
    if (pokemon.nativeRegion !== undefined) {
        return pokemon.nativeRegion;
    }
    const { id } = pokemon;
    const region = MaxIDPerRegion.findIndex((maxRegionID) => maxRegionID >= Math.floor(id));
    return region >= 0 ? region : Region.none;
}

export function calcUniquePokemonsByRegion(region: Region) {
    return new Set(P.pokemonList.filter((p) => p.id > 0 && calcNativeRegion(p.name) === region).map((p) => Math.floor(p.id))).size;
}

export function getPokemonById(id: number): DataPokemon {
    return this.getPokemonByName(P.pokemonMap[id].name);
}

export function getPokemonByName(name: PokemonNameType): DataPokemon {
    const basePokemon = P.pokemonMap[name];
    if (!basePokemon) {
        console.warn('Could not find pokemon', name);
        return null;
    }

    const type1 = basePokemon.type[0];
    const type2: PokemonType = basePokemon.type[1] ?? PokemonType.None;

    const eggCycles: number = basePokemon.eggCycles || 20;
    return new DataPokemon(
        basePokemon.id,
        basePokemon.name,
        basePokemon.catchRate,
        basePokemon.evolutions,
        type1,
        type2,
        basePokemon.attack,
        basePokemon.base.hitpoints,
        basePokemon.levelType,
        basePokemon.exp,
        eggCycles,
        basePokemon.heldItem,
        basePokemon.gender,
    );
}

export function typeStringToId(id: string) {
    return PokemonType[id];
}

export function typeIdToString(id: number) {
    return PokemonType[id];
}

export function getImage(pokemonId: number, shiny: boolean = undefined, gender: boolean = undefined): string {
    let src = 'assets/images/';
    if (shiny === undefined) {
        // eslint-disable-next-line no-param-reassign
        shiny = App.game.party.alreadyCaughtPokemon(pokemonId, true)
            && !App.game.party.getPokemon(pokemonId)?.hideShinyImage();
    }
    if (gender === undefined) {
        // eslint-disable-next-line no-param-reassign
        gender = App.game.party.getPokemon(pokemonId)?.defaultFemaleSprite() ?? false;
    }

    if (shiny) {
        src += 'shiny';
    }
    let genderString = '';
    // If Pokémon is female, use the female sprite, otherwise use the male/genderless one
    const hasDiff = this.getPokemonById(pokemonId).gender.visualDifference;
    if (hasDiff) {
        if (gender) {
            genderString = '-f';
        }
    }
    src += `pokemon/${pokemonId}${genderString}.png`;
    return src;
}

export function getPokeballImage(pokemonName: PokemonNameType): string {
    let src = '';
    if (App.game.party.alreadyCaughtPokemon(getPokemonByName(pokemonName).id)) {
        src = 'assets/images/pokeball/Pokeball-';
        if (App.game.party.alreadyCaughtPokemon(getPokemonByName(pokemonName).id, true)) {
            src += 'shiny-';
        }
        src += 'small.png';
    }
    return src;
}

export function displayName(englishName: string): Computed<string> {
    return App.translation.get(englishName, 'pokemon');
}

// To have encounter/caught/defeat/hatch statistics in a single place
export function incrementPokemonStatistics(pokemonId: number, statistic: string, shiny: boolean, gender: number) {
    const pokemonStatistics = {
        Captured: App.game.statistics.pokemonCaptured[pokemonId],
        Defeated: App.game.statistics.pokemonDefeated[pokemonId],
        Encountered: App.game.statistics.pokemonEncountered[pokemonId],
        Hatched: App.game.statistics.pokemonHatched[pokemonId],
        MaleCaptured: App.game.statistics.malePokemonCaptured[pokemonId],
        MaleDefeated: App.game.statistics.malePokemonDefeated[pokemonId],
        MaleEncountered: App.game.statistics.malePokemonEncountered[pokemonId],
        MaleHatched: App.game.statistics.malePokemonHatched[pokemonId],
        FemaleCaptured: App.game.statistics.femalePokemonCaptured[pokemonId],
        FemaleDefeated: App.game.statistics.femalePokemonDefeated[pokemonId],
        FemaleEncountered: App.game.statistics.femalePokemonEncountered[pokemonId],
        FemaleHatched: App.game.statistics.femalePokemonHatched[pokemonId],
        ShinyCaptured: App.game.statistics.shinyPokemonCaptured[pokemonId],
        ShinyDefeated: App.game.statistics.shinyPokemonDefeated[pokemonId],
        ShinyEncountered: App.game.statistics.shinyPokemonEncountered[pokemonId],
        ShinyHatched: App.game.statistics.shinyPokemonHatched[pokemonId],
        ShinyMaleCaptured: App.game.statistics.shinyMalePokemonCaptured[pokemonId],
        ShinyMaleDefeated: App.game.statistics.shinyMalePokemonDefeated[pokemonId],
        ShinyMaleEncountered: App.game.statistics.shinyMalePokemonEncountered[pokemonId],
        ShinyMaleHatched: App.game.statistics.shinyMalePokemonHatched[pokemonId],
        ShinyFemaleCaptured: App.game.statistics.shinyFemalePokemonCaptured[pokemonId],
        ShinyFemaleDefeated: App.game.statistics.shinyFemalePokemonDefeated[pokemonId],
        ShinyFemaleEncountered: App.game.statistics.shinyFemalePokemonEncountered[pokemonId],
        ShinyFemaleHatched: App.game.statistics.shinyFemalePokemonHatched[pokemonId],
    };
    const totalStatistics = {
        Captured: App.game.statistics.totalPokemonCaptured,
        Defeated: App.game.statistics.totalPokemonDefeated,
        Encountered: App.game.statistics.totalPokemonEncountered,
        Hatched: App.game.statistics.totalPokemonHatched,
        MaleCaptured: App.game.statistics.totalMalePokemonCaptured,
        MaleDefeated: App.game.statistics.totalMalePokemonDefeated,
        MaleEncountered: App.game.statistics.totalMalePokemonEncountered,
        MaleHatched: App.game.statistics.totalMalePokemonHatched,
        FemaleCaptured: App.game.statistics.totalFemalePokemonCaptured,
        FemaleDefeated: App.game.statistics.totalFemalePokemonDefeated,
        FemaleEncountered: App.game.statistics.totalFemalePokemonEncountered,
        FemaleHatched: App.game.statistics.totalFemalePokemonHatched,
        GenderlessCaptured: App.game.statistics.totalGenderlessPokemonCaptured,
        GenderlessDefeated: App.game.statistics.totalGenderlessPokemonDefeated,
        GenderlessEncountered: App.game.statistics.totalGenderlessPokemonEncountered,
        GenderlessHatched: App.game.statistics.totalGenderlessPokemonHatched,
        ShinyCaptured: App.game.statistics.totalShinyPokemonCaptured,
        ShinyDefeated: App.game.statistics.totalShinyPokemonDefeated,
        ShinyEncountered: App.game.statistics.totalShinyPokemonEncountered,
        ShinyHatched: App.game.statistics.totalShinyPokemonHatched,
        ShinyMaleCaptured: App.game.statistics.totalShinyMalePokemonCaptured,
        ShinyMaleDefeated: App.game.statistics.totalShinyMalePokemonDefeated,
        ShinyMaleEncountered: App.game.statistics.totalShinyMalePokemonEncountered,
        ShinyMaleHatched: App.game.statistics.totalShinyMalePokemonHatched,
        ShinyFemaleCaptured: App.game.statistics.totalShinyFemalePokemonCaptured,
        ShinyFemaleDefeated: App.game.statistics.totalShinyFemalePokemonDefeated,
        ShinyFemaleEncountered: App.game.statistics.totalShinyFemalePokemonEncountered,
        ShinyFemaleHatched: App.game.statistics.totalShinyFemalePokemonHatched,
        ShinyGenderlessCaptured: App.game.statistics.totalShinyGenderlessPokemonCaptured,
        ShinyGenderlessDefeated: App.game.statistics.totalShinyGenderlessPokemonDefeated,
        ShinyGenderlessEncountered: App.game.statistics.totalShinyGenderlessPokemonEncountered,
        ShinyGenderlessHatched: App.game.statistics.totalShinyGenderlessPokemonHatched,
    };
    let genderString = '';
    // Gender Statistics
    if (gender === BattlePokemonGender.Male) {
        genderString = 'Male';
    } else if (gender === BattlePokemonGender.Female) {
        genderString = 'Female';
    } else if (gender === BattlePokemonGender.NoGender) {
        genderString = 'Genderless';
    }
    GameHelper.incrementObservable(pokemonStatistics[statistic]);
    GameHelper.incrementObservable(totalStatistics[statistic]);
    // Gender
    if (gender !== BattlePokemonGender.NoGender) {
        GameHelper.incrementObservable(pokemonStatistics[genderString + statistic]);
    }
    GameHelper.incrementObservable(totalStatistics[genderString + statistic]);
    if (shiny) {
        const shinyString = 'Shiny';
        GameHelper.incrementObservable(pokemonStatistics[shinyString + statistic]);
        GameHelper.incrementObservable(totalStatistics[shinyString + statistic]);
        // Gender
        if (gender !== BattlePokemonGender.NoGender) {
            GameHelper.incrementObservable(pokemonStatistics[shinyString + genderString + statistic]);
        }
        GameHelper.incrementObservable(totalStatistics[shinyString + genderString + statistic]);
    }
}
