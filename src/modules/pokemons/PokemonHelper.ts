import type { Computed } from 'knockout';
import {
    MaxIDPerRegion,
    Region,
    BattlePokemonGender,
    PokemonStatisticsType,
    ShadowStatus,
    MegaStoneType,
} from '../GameConstants';
import type { PokemonNameType } from './PokemonNameType';
import P from './mapProvider';
import PokemonType from '../enums/PokemonType';
import DataPokemon from './DataPokemon';
import GameHelper from '../GameHelper';
import MegaEvolveRequirement from '../requirements/MegaEvolveRequirement';
import type MegaStoneItem from '../items/MegaStoneItem';
import { ItemList } from '../items/ItemList';
import Settings from '../settings/Settings';

// TODO remove when Dungeon is ported to modules
declare class Dungeon {
    public allShadowPokemon(): Array<PokemonNameType>;
}
declare const dungeonList: { [dungeonName: string]: Dungeon };

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

export function getImage(pokemonId: number, shiny: boolean = undefined, gender: BattlePokemonGender = undefined, shadow: ShadowStatus = undefined): string {
    let src = 'assets/images/';
    let showShiny = shiny;
    let showFemale = gender === BattlePokemonGender.Female;
    let showShadow = shadow === ShadowStatus.Shadow;
    const partyPokemon = App.game.party.getPokemon(pokemonId);
    if (partyPokemon) {
        if (shiny === undefined) {
            showShiny = partyPokemon.shiny && !partyPokemon.hideShinyImage() && !Settings.getSetting('partyHideShinySprites').observableValue();
        }
        if (gender === undefined) {
            showFemale = partyPokemon.defaultFemaleSprite();
        }
        if (shadow === undefined) {
            showShadow = partyPokemon.shadow === ShadowStatus.Shadow
                || (partyPokemon.shadow === ShadowStatus.Purified && (partyPokemon.showShadowImage || Settings.getSetting('partyShowPurifiedShadowSprites').observableValue()));
        }
    }
    if (showShiny) {
        src += 'shiny';
    }
    if (showShadow) {
        src += 'shadow';
    }
    let genderString = '';
    // If Pokémon is female, use the female sprite, otherwise use the male/genderless one
    if (showFemale && this.getPokemonById(pokemonId).gender.visualDifference) {
        genderString = '-f';
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

export function hasMegaEvolution(pokemonName: PokemonNameType): boolean {
    return !!P.pokemonMap[pokemonName].evolutions?.some((e) => e.restrictions.some((r) => r instanceof MegaEvolveRequirement));
}

export function hasUncaughtMegaEvolution(pokemonName: PokemonNameType): boolean {
    return !!P.pokemonMap[pokemonName].evolutions?.some((e) => !App.game.party.alreadyCaughtPokemonByName(e.evolvedPokemon) && e.restrictions.some((r) => r instanceof MegaEvolveRequirement));
}

export function isMegaEvolution(pokemonName: PokemonNameType): boolean {
    return PokemonLocations.getPokemonPrevolution(pokemonName).some((e) => e.evolvedPokemon == pokemonName && e.restrictions.some((r) => r instanceof MegaEvolveRequirement));
}

export function getMegaStones(pokemonName: PokemonNameType): MegaStoneItem[] {
    return GameHelper.enumStrings(MegaStoneType)
        .filter(s => (ItemList[s] as MegaStoneItem)?.basePokemon == pokemonName)
        .map(s => ItemList[s] as MegaStoneItem);
}

export function hasGigantamaxForm(pokemonName: PokemonNameType): boolean {
    return P.pokemonMap[`Gigantamax ${pokemonName}`].id > 0 || P.pokemonMap[`Eternamax ${pokemonName}`].id > 0;
}

export function hasUncaughtGigantamaxForm(pokemonName: PokemonNameType): boolean {
    let gmaxForm = P.pokemonMap[`Gigantamax ${pokemonName}`];
    if (gmaxForm.id <= 0) {
        gmaxForm = P.pokemonMap[`Eternamax ${pokemonName}`];
    }
    return gmaxForm.id > 0 && !App.game.party.alreadyCaughtPokemon(gmaxForm.id);
}

export function isGigantamaxForm(pokemonName: PokemonNameType): boolean {
    return pokemonName.startsWith('Gigantamax') || pokemonName.startsWith('Eternamax');
}

export const getAllShadowPokemon = ko.pureComputed((): Set<PokemonNameType> => {
    return new Set(Object.values(dungeonList).flatMap(d => d.allShadowPokemon()));
});

// To have encounter/caught/defeat/hatch statistics in a single place
export function incrementPokemonStatistics(pokemonId: number, statistic: PokemonStatisticsType, shiny: boolean, gender: BattlePokemonGender, shadow: ShadowStatus) {
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
        ShadowCaptured: App.game.statistics.shadowPokemonCaptured[pokemonId],
        ShadowDefeated: App.game.statistics.shadowPokemonDefeated[pokemonId],
        ShadowMaleCaptured: App.game.statistics.shadowMalePokemonCaptured[pokemonId],
        ShadowMaleDefeated: App.game.statistics.shadowMalePokemonDefeated[pokemonId],
        ShadowFemaleCaptured: App.game.statistics.shadowFemalePokemonCaptured[pokemonId],
        ShadowFemaleDefeated: App.game.statistics.shadowFemalePokemonDefeated[pokemonId],

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
        ShadowCaptured: App.game.statistics.totalShadowPokemonCaptured,
        ShadowDefeated: App.game.statistics.totalShadowPokemonDefeated,
        ShadowMaleCaptured: App.game.statistics.totalShadowMalePokemonCaptured,
        ShadowMaleDefeated: App.game.statistics.totalShadowMalePokemonDefeated,
        ShadowFemaleCaptured: App.game.statistics.totalShadowFemalePokemonCaptured,
        ShadowFemaleDefeated: App.game.statistics.totalShadowFemalePokemonDefeated,
        ShadowGenderlessCaptured: App.game.statistics.totalShadowGenderlessPokemonCaptured,
        ShadowGenderlessDefeated: App.game.statistics.totalShadowGenderlessPokemonDefeated,
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
    if (shadow === ShadowStatus.Shadow) {
        const shadowString = 'Shadow';
        GameHelper.incrementObservable(pokemonStatistics[shadowString + statistic]);
        GameHelper.incrementObservable(totalStatistics[shadowString + statistic]);
        // Gender
        if (gender !== BattlePokemonGender.NoGender) {
            GameHelper.incrementObservable(pokemonStatistics[shadowString + genderString + statistic]);
        }
        GameHelper.incrementObservable(totalStatistics[shadowString + genderString + statistic]);
    }
}
