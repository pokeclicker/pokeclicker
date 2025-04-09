import { Feature } from '../DataStore/common/Feature';
import WeatherType from './WeatherType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';

export class WeatherOverride implements Feature {
    name = 'Weather Override';
    saveKey = 'weatheroverride';

    defaults: Record<string, any> = {

    };

    public static weatherCost: { [weather in WeatherType]?: Array<{ item: Item, amount: number }> } = {
        [WeatherType.Clear]: [
            { item: ItemList.Damp_rock_fragment, amount: 25 },
            { item: ItemList.Heat_rock_fragment, amount: 25 },
            { item: ItemList.Icy_rock_fragment, amount: 25 },
            { item: ItemList.Smooth_rock_fragment, amount: 25 },
        ],
        [WeatherType.Overcast]: [
            { item: ItemList.Damp_rock_fragment, amount: 50 },
            { item: ItemList.Heat_rock_fragment, amount: 50 },
        ],
        [WeatherType.Rain]: [
            { item: ItemList.Damp_rock_fragment, amount: 100 },
        ],
        [WeatherType.Thunderstorm]: [
            { item: ItemList.Damp_rock_fragment, amount: 65 },
            { item: ItemList.Heat_rock_fragment, amount: 35 },
        ],
        [WeatherType.Snow]: [
            { item: ItemList.Damp_rock_fragment, amount: 50 },
            { item: ItemList.Icy_rock_fragment, amount: 50 },
        ],
        [WeatherType.Hail]: [
            { item: ItemList.Heat_rock_fragment, amount: 35 },
            { item: ItemList.Icy_rock_fragment, amount: 65 },
        ],
        [WeatherType.Blizzard]: [
            { item: ItemList.Icy_rock_fragment, amount: 100 },
        ],
        [WeatherType.Harsh_Sunlight]: [
            { item: ItemList.Heat_rock_fragment, amount: 100 },
        ],
        [WeatherType.Sandstorm]: [
            { item: ItemList.Smooth_rock_fragment, amount: 100 },
        ],
        [WeatherType.Fog]: [
            { item: ItemList.Damp_rock_fragment, amount: 50 },
            { item: ItemList.Heat_rock_fragment, amount: 25 },
            { item: ItemList.Icy_rock_fragment, amount: 25 },
        ],
        [WeatherType.Windy]: [
            { item: ItemList.Damp_rock_fragment, amount: 35 },
            { item: ItemList.Heat_rock_fragment, amount: 65 },
        ],
    };

    canAccess(): boolean {
        return true;
    }

    initialize() {

    }

    update(delta: number) {
        if (delta > 0) {

        }
    }

    public reduceCostModifierInHours(hours: number) {
        // TODO : Reduce the _costModifiers
    }

    toJSON(): Record<string, any> {
        return {

        };
    }

    fromJSON(json: Record<string, any>) {
        if (json !== null) {

        }
    }
}
