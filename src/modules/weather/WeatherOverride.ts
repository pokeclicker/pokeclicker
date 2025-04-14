import {Feature} from '../DataStore/common/Feature';
import WeatherType from './WeatherType';
import Item from '../items/Item';
import {ItemList} from '../items/ItemList';
import {HOUR, MINUTE, Region} from '../GameConstants';
import {Observable} from 'knockout';
import GameHelper from '../GameHelper';
import Weather from './Weather';
import Requirement from '../requirements/Requirement';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import BadgeEnums from '../enums/Badges';
import MultiRequirement from '../requirements/MultiRequirement';
import UndergroundLevelRequirement from '../requirements/UndergroundLevelRequirement';

export class WeatherOverride implements Feature {
    name = 'Weather Override';
    saveKey = 'weatheroverride';

    defaults: Record<string, any> = {

    };

    public static CYCLE_TIME = 5 * MINUTE / 1000;

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

    public static overrideRequirements: { [region in Region]?: Requirement } = {
        [Region.kanto]: new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion),
        [Region.johto]: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion),
        [Region.hoenn]: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion),
        [Region.sinnoh]: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
        [Region.unova]: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
        [Region.kalos]: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
        [Region.alola]: new GymBadgeRequirement(BadgeEnums.Champion_Stamp),
        [Region.galar]: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), new UndergroundLevelRequirement(100)]),
    };

    private static _selectedRegion: Observable<Region> = ko.observable(Region.kanto);
    private static _selectedCycles: Observable<number> = ko.observable(1).extend({ numeric: 0 });
    private _costModifier: { [region in Region]?: Observable<number> } = {};
    private _overrides: { [region in Region]?: { weather: Observable<WeatherType | null>, time: Observable<number> } } = {};

    canAccess(): boolean {
        return true;
    }

    initialize() {
        GameHelper.enumNumbers(Region).forEach(region => {
            this._overrides[region] = { weather: ko.observable(null), time: ko.observable(0) };
            this._costModifier[region] = ko.observable(0);
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
        if (!this.isWeatherAllowedInRegion(region, weatherType)) {
            // TODO : Notify the player
            return;
        }

        // TODO : Get the calculated cost
        const multiplier = this.calculateCostMultiplier(region, cycles);

        if (!this.canAffordWeather(weatherType, multiplier)) {
            // TODO : Notify the player
            return;
        }

        WeatherOverride.weatherCost[weatherType].forEach(cost => {
            const { item, amount } = cost;
            player.loseItem(item.name, Math.floor(amount * multiplier));
        });

        // TODO : Add the cycles to the _costModifiers
        GameHelper.incrementObservable(this._costModifier[region], cycles * WeatherOverride.CYCLE_TIME);

        // TODO : Add the time to the _overrides
        if (this._overrides[region].weather() === weatherType) {
            // Extend if it's the same weather
            this._overrides[region].time(this._overrides[region].time() + cycles * WeatherOverride.CYCLE_TIME);
        } else {
            this._overrides[region].time(cycles * WeatherOverride.CYCLE_TIME);
        }

        // TODO : Change the weather
        this._overrides[region].weather(weatherType);

        // TODO : Notify the player
    }

    public canAffordWeather(weatherType: WeatherType, multiplier: number): boolean {
        return WeatherOverride.weatherCost[weatherType].every(cost => {
            const { item, amount } = cost;

            return player.itemList[item.name]() >= Math.floor(amount * multiplier);
        });
    }

    public getAllowedWeather(region: Region): WeatherType[] {
        return Weather.weatherDistribution[region] || GameHelper.enumNumbers(WeatherType);
    }

    public isWeatherAllowedInRegion(region: Region, weatherType: WeatherType): boolean {
        return this.getAllowedWeather(region).includes(weatherType);
    }

    public calculateCostMultiplier(region: Region, cycles: number): number {
        const totalCycles = Math.floor(Math.max(this._costModifier[region](), 0) / WeatherOverride.CYCLE_TIME) + cycles;

        // Magic number calculated as follows:
        // 5 minutes: 100 fragments
        // 60 minutes: 12,000 fragments
        // This results in 1 hour of weather equal to 1 hour of mining UG
        // 12000 = 100 * 12 * x ^ 11
        // This can be simplified as Math.pow(10, 1 / 11)
        const magicNumber = 1.2328467394420661;

        // Cost per cycle is capped after the hour
        return totalCycles * magicNumber ** (Math.min(totalCycles, 12) - 1);
    }

    public reduceCostModifierInHours(hours: number) {
        // TODO : Reduce the _costModifiers
        Object.values(this._costModifier).forEach(modifier => {
            modifier(Math.max(modifier() - hours * HOUR / 1000, 0));
        });
    }

    public getWeatherForRegion(region: Region): WeatherType | null {
        return this._overrides[region]?.weather() ?? null;
    }

    public getTimeForRegion(region: Region): number | null {
        return this._overrides[region]?.time() ?? null;
    }

    static get selectedRegion(): Region {
        return this._selectedRegion();
    }

    static set selectedRegion(region: Region) {
        this._selectedRegion(region);
    }

    static get selectedCycles(): number {
        return this._selectedCycles();
    }

    static set selectedCycles(cycles: number) {
        this._selectedCycles(+cycles);
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
