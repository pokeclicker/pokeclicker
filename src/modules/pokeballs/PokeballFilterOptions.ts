import { Pokerus } from '../GameConstants';
import BooleanSetting from '../settings/BooleanSetting';
import Setting from '../settings/Setting';
import GameHelper from '../GameHelper';
import SettingOption from '../settings/SettingOption';
import KeyItemType from '../enums/KeyItemType';
import Requirement from '../requirements/Requirement';
import CustomRequirement from '../requirements/CustomRequirement';
import PokemonType from '../enums/PokemonType';
import EncounterType from '../enums/EncounterType';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import PokemonCategories from '../party/Category';

class PokeballFilterOption<T, M = T> {
    public defaultSetting: Setting<T>;

    constructor(
        public createSetting: (defaultVal?: T, name?: string, defaultName?: string) => Setting<T>,
        public requirement?: Requirement,
        public matchTest: (optionValue: T, testValue: M) => boolean = (
            optionValue: T, testValue: M,
        ) => optionValue === (testValue as unknown as T),
    ) {
        this.defaultSetting = createSetting();
    }

    public canUse() {
        return this.requirement?.isCompleted() ?? true;
    }
}

const tempShadowRequirement = new QuestLineStepCompletedRequirement('Shadows in the Desert', 3);

const encounterTypeRequirements: Partial<Record<EncounterType, Requirement>> = {
    [EncounterType.trainer]: tempShadowRequirement,
    [EncounterType.ultraBeast]: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 2),
};

export const pokeballFilterOptions = {
    shiny: new PokeballFilterOption<boolean>(
        (bool = true) => new BooleanSetting(
            'shiny',
            'Shiny',
            bool,
        ),
    ),

    shadow: new PokeballFilterOption<boolean>(
        (bool = true) => new BooleanSetting(
            'shadow',
            'Shadow',
            bool,
        ),
        tempShadowRequirement,
    ),

    caught: new PokeballFilterOption<boolean>(
        (bool = true) => new BooleanSetting(
            'caught',
            'Caught',
            bool,
        ),
    ),

    caughtShiny: new PokeballFilterOption<boolean>(
        (bool = true) => new BooleanSetting(
            'caughtShiny',
            'Caught Shiny',
            bool,
        ),
    ),

    caughtShadow: new PokeballFilterOption<boolean>(
        (bool = true) => new BooleanSetting(
            'caughtShadow',
            'Caught Shadow',
            bool,
        ),
        tempShadowRequirement,
    ),

    pokerus: new PokeballFilterOption<Pokerus>(
        (pokerus = Pokerus.Uninfected) => new Setting(
            'pokerus',
            'Pokérus State',
            GameHelper.enumStrings(Pokerus).map((k) => new SettingOption(k, Pokerus[k])),
            pokerus,
        ),
        new CustomRequirement(
            ko.pureComputed(() => App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus)),
            true, 'Pokérus virus is required',
        ),
    ),

    pokemonType: new PokeballFilterOption<PokemonType, [PokemonType, PokemonType]>(
        (type = PokemonType.Normal, name = 'pokemonType', defaultName = 'Pokémon Type') => new Setting(
            name,
            defaultName,
            GameHelper.enumStrings(PokemonType).map((k) => new SettingOption(k, PokemonType[k])),
            type,
        ),
        undefined,
        (
            optionValue: PokemonType,
            testValues: [PokemonType, PokemonType],
        ) => testValues.includes(optionValue),
    ),

    encounterType: new PokeballFilterOption<EncounterType>(
        (type: EncounterType = EncounterType.route) => new Setting(
            'encounterType',
            'Encounter Type',
            Object.values(EncounterType).map((v) => new SettingOption(v, v, encounterTypeRequirements[v])),
            type,
        ),
    ),

    category: new PokeballFilterOption<number, number[]>(
        (category = 0) => new Setting(
            'category',
            'Category',
            () => PokemonCategories.categories().map((c) => new SettingOption(c.name(), c.id)),
            category,
        ),
        undefined,
        (
            optionValue: number,
            testValues: number[],
        ) => testValues?.includes(optionValue),
    ),
};

type PokeballFilterValueType<T>
    = T extends PokeballFilterOption<infer K> ? K : never;

type PokeballFilterMatchType<T>
    = T extends PokeballFilterOption<any, infer M> ? M : never;

export type PokeballFilterOptions = Partial<{
    [K in keyof typeof pokeballFilterOptions]: PokeballFilterValueType<typeof pokeballFilterOptions[K]>;
}>;

export type PokeballFilterMatchData = {
    [K in keyof typeof pokeballFilterOptions]: PokeballFilterMatchType<typeof pokeballFilterOptions[K]>;
};
