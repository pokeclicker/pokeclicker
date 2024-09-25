//Pokémons Manager
class InfoPokemon {
    constructor(
        public id: number,
        public name: PokemonNameType,
        public type: string,
        public requirement?: Requirement,
        public fishing?: boolean,
    ) {}
}
class InfoPokemonList {
    constructor(
        public id: string,
        public category: string,
        public data: InfoPokemon[],
    ) {}
}

//Items Manager
class InfoItem {
    constructor(
        public item: string,
        public type: string,
        public requirement: Requirement,
    ) {}
}
class InfoItemList {
    constructor(
        public id: string,
        public category: string,
        public data: InfoItem[],
    ) {}
}

//Informations Manager
class PokemonRequirementInformation {
    constructor(
        public tooltip: string,
        public image: string,
    ) {}
}
class ItemInformation {
    constructor(
        public isPokemonAndNotCaught: boolean,
        public name: string,
        public image: string,
        public requirement: Requirement
    ) {}
}

//Helper
class EncountersInfoHelper {
    public static getPokemonRequirementInformations(pokemon) : PokemonRequirementInformation {
        if (pokemon.type == 'roamer') {
            if (EncountersInfoHelper.hasRequirement(pokemon?.requirement, SpecialEventRequirement)) {
                return new PokemonRequirementInformation('Event Roaming Pokémon', 'event_roaming.png');
            } else {
                return new PokemonRequirementInformation('Roaming Pokémon', 'roaming.png');
            }
        } else if (pokemon.type == 'water' && pokemon?.fishing) {
            return new PokemonRequirementInformation('Fishing Pokémon', 'fishing.png');
        } else {
            if (EncountersInfoHelper.hasRequirement(pokemon?.requirement, SpecialEventRequirement)) {
                return new PokemonRequirementInformation('Event Pokémon', 'event.png');
            } else if (EncountersInfoHelper.hasRequirement(pokemon?.requirement, WeatherRequirement)) {
                return new PokemonRequirementInformation('Weather Pokémon', 'weather.png');
            } else if (EncountersInfoHelper.hasRequirement(pokemon?.requirement, DayOfWeekRequirement)) {
                return new PokemonRequirementInformation('Day of Week Pokémon', 'day_of_week.png');
            }
        }
        return null;
    }

    private static hasRequirement<T extends Requirement>(requirement: Requirement, type: new (...args: any[]) => T) : boolean {
        //I traverse all the Requirement tree recursively to check if one of the requirements is the one I want
        if (requirement instanceof Requirement && requirement instanceof type) {
            return true;
        }
        if (requirement instanceof MultiRequirement && requirement?.requirements) {
            for (const req of requirement.requirements) {
                if (EncountersInfoHelper.hasRequirement(req, type)) {
                    return true;
                }
            }
        }
        return false;
    }

    public static getItemInformations(item : InfoItem) : ItemInformation {
        const isPokemonAndNotCaught = PokemonHelper.getPokemonByName(item.item as PokemonNameType).name != 'MissingNo.' && !App.game.party.getPokemonByName(item.item as PokemonNameType);
        const name = isPokemonAndNotCaught ? '???' : EncountersInfoHelper.getItemName(item);
        const image = EncountersInfoHelper.getItemImage(item);
        const requirement = item.requirement;
        return new ItemInformation(isPokemonAndNotCaught, name, image, requirement);
    }

    private static getItemName(item : InfoItem) : string {
        if (item.item in ItemList)
            return ItemList[item.item]?.displayName;
        else if (typeof BerryType[item.item] == 'number')
            return `${item.item} Berry`;
        else if (PokemonHelper.getPokemonByName(item.item as PokemonNameType).name != 'MissingNo.')
            return PokemonHelper.displayName(item.item)();
        else
            return GameConstants.camelCaseToString(GameConstants.humanifyString(item.item.toLowerCase()));
    }

    private static getItemImage(item : InfoItem) : string {
        if (typeof BerryType[item.item] == 'number')
            return FarmController.getBerryImage(BerryType[GameConstants.humanifyString(item.item)]);
        else if (UndergroundItems.getByName(item.item) instanceof UndergroundItem)
            return UndergroundItems.getByName(item.item).image;
        else if (PokemonHelper.getPokemonByName(item.item as PokemonNameType).name != 'MissingNo.')
            return `assets/images/pokemon/${PokemonHelper.getPokemonByName(item.item as PokemonNameType).id}.png`;
        else
            return ItemList[item.item].image;
    }
}
