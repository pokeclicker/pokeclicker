import { Pokerus } from '../GameConstants';
import BooleanSetting from '../settings/BooleanSetting';
import Setting from '../settings/Setting';
import GameHelper from '../GameHelper';
import SettingOption from '../settings/SettingOption';

export type PokeballFilterOptions = {
    shiny?: boolean;
    caught?: boolean;
    caughtShiny?: boolean;
    pokerus?: Pokerus;
};

export const descriptions: {
    [K in keyof PokeballFilterOptions]-?: (value: PokeballFilterOptions[K]) => string
} = {
    shiny: (isShiny) => `are ${
        isShiny ? '' : 'not'
    } shiny`,

    caught: (isCaught) => `you have ${
        isCaught ? '' : 'not yet'
    } caught`,

    caughtShiny: (isCaughtShiny) => `you ${
        isCaughtShiny ? '' : 'don\'t'
    }  have shiny`,

    pokerus: (pokerusState) => `you have in the ${
        Pokerus[pokerusState]
    } pokerus state`,
};

export const settingsMap: {
    [K in keyof PokeballFilterOptions]-?: (value: PokeballFilterOptions[K]) => Setting<PokeballFilterOptions[K]>
} = {
    shiny: (bool) => new BooleanSetting(
        'pokeballFilterShiny',
        'Shiny',
        bool,
    ),
    caught: (bool) => new BooleanSetting(
        'pokeballFilterCaught',
        'Caught',
        bool,
    ),
    caughtShiny: (bool) => new BooleanSetting(
        'pokeballFilterCaughtShiny',
        'Caught Shiny',
        bool,
    ),
    pokerus: (pokerus) => new Setting(
        'pokeballFilterPokerus',
        'Pokerus State',
        GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
        pokerus,
    ),
};
