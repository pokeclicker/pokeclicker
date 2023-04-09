import { Pokerus } from '../GameConstants';
import BooleanSetting from '../settings/BooleanSetting';
import Setting from '../settings/Setting';
import GameHelper from '../GameHelper';
import SettingOption from '../settings/SettingOption';

export type PokeballFilterOptions = {
    shiny?: boolean;
    shadow?: boolean;
    caught?: boolean;
    caughtShiny?: boolean;
    caughtShadow?: boolean;
    pokerus?: Pokerus;
};

export const descriptions: {
    [K in keyof PokeballFilterOptions]-?: (value: PokeballFilterOptions[K]) => string
} = {
    shiny: (isShiny) => `are ${
        isShiny ? '' : 'not'
    } shiny`,

    shadow: (isShadow) => `are ${
        isShadow ? '' : 'not'
    } shadow form`,

    caught: (isCaught) => `you have ${
        isCaught ? '' : 'not yet'
    } caught`,

    caughtShiny: (isCaughtShiny) => `you ${
        isCaughtShiny ? '' : 'don\'t'
    } have shiny`,

    caughtShadow: (isCaughtShadow) => `you ${
        isCaughtShadow ? '' : 'don\'t'
    } have the shadow form`,

    pokerus: (pokerusState) => `you have in the ${
        Pokerus[pokerusState]
    } pokerus state`,
};

export const settingsMap: {
    [K in keyof PokeballFilterOptions]-?: (value?: PokeballFilterOptions[K]) => Setting<PokeballFilterOptions[K]>
} = {
    shiny: (bool = false) => new BooleanSetting(
        'pokeballFilterShiny',
        'Shiny',
        bool,
    ),
    shadow: (bool = false) => new BooleanSetting(
        'pokeballFilterShadow',
        'Shadow',
        bool,
    ),
    caught: (bool = false) => new BooleanSetting(
        'pokeballFilterCaught',
        'Caught',
        bool,
    ),
    caughtShiny: (bool = false) => new BooleanSetting(
        'pokeballFilterCaughtShiny',
        'Caught Shiny',
        bool,
    ),
    caughtShadow: (bool = false) => new BooleanSetting(
        'pokeballFilterCaughtShadow',
        'Caught Shadow',
        bool,
    ),
    pokerus: (pokerus = Pokerus.Uninfected) => new Setting(
        'pokeballFilterPokerus',
        'Pokerus State',
        GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
        pokerus,
    ),
};

export const defaultOptions: {
    [K in keyof PokeballFilterOptions]-?: Setting<PokeballFilterOptions[K]>
} = {
    shiny: settingsMap.shiny(),
    shadow: settingsMap.shadow(),
    caught: settingsMap.caught(),
    caughtShiny: settingsMap.caughtShiny(),
    caughtShadow: settingsMap.caughtShadow(),
    pokerus: settingsMap.pokerus(),
};
