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
        (bool = true) => new BooleanSetting(
            'pokeballFilterShiny',
            'Shiny',
            bool,
        ),
        (isShiny) => `Are ${
            isShiny ? '' : 'not '
        }Shiny`,
    ),

    shadow: new PokeballFilterOption(
        (bool = true) => new BooleanSetting(
            'pokeballFilterShadow',
            'Shadow',
            bool,
        ),
        (isShadow) => `Are ${
            isShadow ? '' : 'not '
        }Shadow`,
        tempShadowRequirement,
    ),

    caught: new PokeballFilterOption(
        (bool = true) => new BooleanSetting(
            'pokeballFilterCaught',
            'Caught',
            bool,
        ),
        (isCaught) => `${
            isCaught ? 'Already' : 'Not yet'
        } caught`,
    ),

    caughtShiny: new PokeballFilterOption(
        (bool = true) => new BooleanSetting(
            'pokeballFilterCaughtShiny',
            'Caught Shiny',
            bool,
        ),
        (isCaughtShiny) => `Shiny form ${
            isCaughtShiny ? 'already ' : 'not yet '
        }caught`,
    ),

    caughtShadow: new PokeballFilterOption(
        (bool = true) => new BooleanSetting(
            'pokeballFilterCaughtShadow',
            'Caught Shadow',
            bool,
        ),
        (isCaughtShadow) => `Shadow form ${
            isCaughtShadow ? 'already ' : 'not yet '
        }caught`,
        tempShadowRequirement,
    ),

    pokerus: new PokeballFilterOption(
        (pokerus = Pokerus.Uninfected) => new Setting(
            'pokeballFilterPokerus',
            'Pokérus State',
            GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
            pokerus,
        ),
        (pokerusState) => `Are in the ${
            Pokerus[pokerusState]
        } Pokérus state`,
        new CustomRequirement(
            ko.pureComputed(() => App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus)),
            true, 'Pokérus virus is required',
        ),
    ),

};
