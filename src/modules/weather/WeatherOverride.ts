import { Feature } from '../DataStore/common/Feature';
import WeatherType from './WeatherType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import { Region } from '../GameConstants';
import { Observable } from 'knockout';
import GameHelper from '../GameHelper';

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

    private _costModifier: { [region in Region]?: Observable<number> } = {};
    private _overrides: { [region in Region]?: { weather: Observable<WeatherType | null>, time: Observable<number> } } = {};

    canAccess(): boolean {
        return true;
    }

    initialize() {
        GameHelper.enumNumbers(Region).forEach(value => {
            this._overrides[value] = { weather: ko.observable(null), time: ko.observable(0) };
        });
    }

    update(delta: number) {
        Object.values(this._overrides).forEach(regionOverride => {
            regionOverride.time(regionOverride.time() - delta);

            if (regionOverride.time() <= 0) {
                regionOverride.weather(null);
            }
        });
    }

    public purchaseWeatherOverride(region: Region, weatherType: WeatherType, cycles: number) {
        // TODO : Get the calculated cost

        // TODO : Add the cycles to the _costModifiers

        // TODO : Add the time to the _overrides
    }

    public reduceCostModifierInHours(hours: number) {
        // TODO : Reduce the _costModifiers
    }

    public getWeatherForRegion(region: Region): WeatherType | null {
        return this._overrides[region]?.weather() ?? null;
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
