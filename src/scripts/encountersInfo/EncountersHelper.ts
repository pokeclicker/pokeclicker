class EncountersHelper {
    public static getPokemonRequirementInformations(pokemon) {
        if (pokemon.type == 'roamer') {
            if (EncountersHelper.hasRequirement(pokemon?.requirement, SpecialEventRequirement)) {
                return {tooltip: 'Event Roaming Pokémon', image: 'event_roaming.png'};
            } else {
                return {tooltip: 'Roaming Pokémon', image: 'roaming.png'};
            }
        } else if (pokemon.type == 'water' && pokemon?.fishing) {
            return {tooltip: 'Fishing Pokémon', image: 'fishing.png'};
        } else {
            if (EncountersHelper.hasRequirement(pokemon?.requirement, SpecialEventRequirement)) {
                return {tooltip: 'Event Pokémon', image: 'event.png'};
            } else if (EncountersHelper.hasRequirement(pokemon?.requirement, WeatherRequirement)) {
                return {tooltip: 'Weather Pokémon', image: 'weather.png'};
            } else if (EncountersHelper.hasRequirement(pokemon?.requirement, DayOfWeekRequirement)) {
                return {tooltip: 'Day of Week Pokémon', image: 'day_of_week.png'};
            } else if (EncountersHelper.hasRequirement(pokemon?.requirement, SeededDateSelectNRequirement)) {
                return {tooltip: 'Random Date Pokémon', image: 'random_date.png'};
            } else if (EncountersHelper.hasRequirement(pokemon?.requirement, DayCyclePartRequirement)) {
                return {tooltip: 'Day Cycle Part Pokémon', image: 'day_cycle_part.png'};
            }
        }
        return null;
    }

    private static hasRequirement(requirement, type) {
        //I traverse all the Requirement tree recursively to check if one of the requirements is the one I want
        if (requirement instanceof type) {
            return true;
        }
        if (requirement?.requirements) {
            for (const req of requirement.requirements) {
                if (EncountersHelper.hasRequirement(req, type)) {
                    return true;
                }
            }
        }
        return false;
    }

    public static getItemInformations(item) {
        const isPokemonAndNotCaught = PokemonHelper.getPokemonByName(item.item).name != 'MissingNo.' && !App.game.party.getPokemonByName(item.item);
        const name = isPokemonAndNotCaught ? '???' : EncountersHelper.getItemName(item);
        const image = EncountersHelper.getItemImage(item);
        const requirement = item.requirement;
        return {isPokemonAndNotCaught, name, image, requirement};
    }

    private static getItemName(item) {
        switch (true) {
            case item.item in ItemList:
                return ItemList[item.item]?.displayName;
            case typeof BerryType[item.item] == 'number':
                return `${item.item} Berry`;
            case PokemonHelper.getPokemonByName(item.item).name != 'MissingNo.':
                return PokemonHelper.displayName(item.item)();
            default:
                return GameConstants.camelCaseToString(GameConstants.humanifyString(item.item.toLowerCase()));
        }
    }

    private static getItemImage(item) {
        switch (true) {
            case typeof BerryType[item.item] == 'number':
                return FarmController.getBerryImage(BerryType[GameConstants.humanifyString(item.item)]);
            case UndergroundItems.getByName(item.item) instanceof UndergroundItem:
                return UndergroundItems.getByName(item.item).image;
            case PokemonHelper.getPokemonByName(item.item).name != 'MissingNo.':
                return `assets/images/pokemon/${PokemonHelper.getPokemonByName(item.item).id}.png`;
            default:
                return ItemList[item.item].image;
        }
    }
}
