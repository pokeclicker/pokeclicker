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

class PokeballFilterOption<
    K extends keyof PokeballFilterOptions,
    T = PokeballFilterOptions[K],
> {
    public defaultSetting: Setting<T>;

    constructor(
        public createSetting: (defaultVal?: T) => Setting<T>,
        public describe: (value: T) => string,
    ) {
        this.defaultSetting = createSetting();
    }
}

export const pokeballFilterOptions: {
    [K in keyof PokeballFilterOptions]-?: PokeballFilterOption<K>
} = {
    shiny: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterShiny',
            'Shiny',
            bool,
        ),
        (isShiny) => `are ${
            isShiny ? '' : 'not'
        } shiny`,
    ),

    shadow: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterShadow',
            'Shadow',
            bool,
        ),
        (isShadow) => `are ${
            isShadow ? '' : 'not'
        } shadow form`,
    ),

    caught: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaught',
            'Caught',
            bool,
        ),
        (isCaught) => `you have ${
            isCaught ? '' : 'not yet'
        } caught`,
    ),

    caughtShiny: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaughtShiny',
            'Caught Shiny',
            bool,
        ),
        (isCaughtShiny) => `you ${
            isCaughtShiny ? '' : 'don\'t'
        } have shiny`,
    ),

    caughtShadow: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaughtShadow',
            'Caught Shadow',
            bool,
        ),
        (isCaughtShadow) => `you ${
            isCaughtShadow ? '' : 'don\'t'
        } have the shadow form`,
    ),

    pokerus: new PokeballFilterOption(
        (pokerus = Pokerus.Uninfected) => new Setting(
            'pokeballFilterPokerus',
            'Pokerus State',
            GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
            pokerus,
        ),
        (pokerusState) => `you have in the ${
            Pokerus[pokerusState]
        } pokerus state`,
    ),

};
