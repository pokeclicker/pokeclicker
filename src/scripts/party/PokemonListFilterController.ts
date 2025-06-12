///<reference path="../../declarations/globals.d.ts"/>

class PokemonListFilterController {
    public static readonly PREVIEW_LIMIT = 4;

    public static openModal(): void {
        $('#pokemonListFilterModal').modal('show');
    }

    public static getFilteredList(limit?: number): PartyPokemon[] {
        const pokemonList = App.game.party.caughtPokemon.filter(p => p.matchesPokemonListFilters());

        // Apply limit if specified (for preview)
        if (limit) {
            return pokemonList.slice(0, limit);
        }
        return pokemonList;
    }

    public static getPreviewList = ko.pureComputed(() => {
        return PokemonListFilterController.getFilteredList(PokemonListFilterController.PREVIEW_LIMIT);
    });

    public static getFilteredCount = ko.pureComputed(() => {
        return PokemonListFilterController.getFilteredList().length;
    });

    public static resetFilters(): void {
        pokemonListFilterSettingKeys.forEach(key => {
            const setting = Settings.getSetting(key);
            if (setting) {
                setting.set(setting.defaultValue);
            }
        });
    }

    public static getActiveFilterCount = ko.pureComputed(() => {
        let count = 0;
        pokemonListFilterSettingKeys.forEach(key => {
            const setting = Settings.getSetting(key);
            if (setting) {
                const value = setting.observableValue();
                const defaultValue = setting.defaultValue;

                // Check if value differs from default
                if (key.includes('RegionFilter')) {
                    // Special case for region bitmask
                    if (value !== defaultValue) {
                        count++;
                    }
                } else if (key.includes('NameFilter') || key.includes('IDFilter')) {
                    // Text/number inputs
                    if ((key.includes('NameFilter') && value !== '') ||
                        (key.includes('IDFilter') && value !== -1)) {
                        count++;
                    }
                } else if (typeof value === 'boolean') {
                    // Boolean settings
                    if (value !== defaultValue) {
                        count++;
                    }
                } else if (key.includes('LevelFilter') || key.includes('AttackFilter')) {
                    // Numeric filters with 0 as default
                    if (value > 0) {
                        count++;
                    }
                } else {
                    // Other settings (dropdowns, etc)
                    if (value !== defaultValue) {
                        count++;
                    }
                }
            }
        });

        return count;
    });

    // Helper method to get region filter string for Pokemon List
    public static getRegionFilterString(): string {
        const setting = Settings.getSetting('pokemonListRegionFilter');
        const selectedRegions = setting.observableValue();
        const unlockedRegionsMask = (2 << player.highestRegion()) - 1;

        if (selectedRegions === unlockedRegionsMask) {
            return 'All';
        }
        if (selectedRegions === 0) {
            return 'None';
        }

        const regionNames = [];
        GameHelper.enumNumbers(GameConstants.Region).forEach((region) => {
            if (region > GameConstants.Region.none && selectedRegions & (1 << region)) {
                regionNames.push(GameConstants.camelCaseToString(GameConstants.Region[region]));
            }
        });

        return regionNames.length <= 2 ? regionNames.join(', ') : `${regionNames.length} regions`;
    }

    // Computed observable for tooltip text
    public static tooltipText = ko.pureComputed(() => {
        const count = PokemonListFilterController.getActiveFilterCount();
        return count > 0 ? `${count} filter(s) active` : 'No filters active';
    });
}
