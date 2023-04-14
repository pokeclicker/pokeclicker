import { Pokerus } from '../GameConstants';
import BooleanSetting from '../settings/BooleanSetting';
import Setting from '../settings/Setting';
import GameHelper from '../GameHelper';
import SettingOption from '../settings/SettingOption';
import KeyItemType from '../enums/KeyItemType';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import Requirement from '../requirements/Requirement';
import CustomRequirement from '../requirements/CustomRequirement';

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
        public requirement?: Requirement,
    ) {
        this.defaultSetting = createSetting();
    }

    public canUse() {
        return this.requirement?.isCompleted() ?? true;
    }
}

const tempShadowRequirement = new DevelopmentRequirement();

export const pokeballFilterOptions: {
    [K in keyof PokeballFilterOptions]-?: PokeballFilterOption<K>
} = {
    shiny: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterShiny',
            'Shiny',
            bool,
        ),
        (isShiny) => `Are ${
            isShiny ? '' : 'not'
        } shiny`,
    ),

    shadow: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterShadow',
            'Shadow',
            bool,
        ),
        (isShadow) => `Are ${
            isShadow ? '' : 'not'
        } shadow form`,
        tempShadowRequirement,
    ),

    caught: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaught',
            'Caught',
            bool,
        ),
        (isCaught) => `You have ${
            isCaught ? '' : 'not yet'
        } caught`,
    ),

    caughtShiny: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaughtShiny',
            'Caught Shiny',
            bool,
        ),
        (isCaughtShiny) => `You ${
            isCaughtShiny ? '' : 'don\'t'
        } have shiny`,
    ),

    caughtShadow: new PokeballFilterOption(
        (bool = false) => new BooleanSetting(
            'pokeballFilterCaughtShadow',
            'Caught Shadow',
            bool,
        ),
        (isCaughtShadow) => `You ${
            isCaughtShadow ? '' : 'don\'t'
        } have the shadow form`,
        tempShadowRequirement,
    ),

    pokerus: new PokeballFilterOption(
        (pokerus = Pokerus.Uninfected) => new Setting(
            'pokeballFilterPokerus',
            'Pokerus State',
            GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
            pokerus,
        ),
        (pokerusState) => `You have in the ${
            Pokerus[pokerusState]
        } pokerus state`,
        new CustomRequirement(
            ko.pureComputed(() => App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus)),
            true, 'Pokerus virus is required',
        ),
    ),

};
