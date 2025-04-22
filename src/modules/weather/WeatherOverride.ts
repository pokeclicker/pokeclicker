import { Feature } from '../DataStore/common/Feature';
import WeatherType from './WeatherType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import { camelCaseToString, getGymIndex, HOUR, humanifyString, MINUTE, Region, RegionGyms } from '../GameConstants';
import { Observable } from 'knockout';
import GameHelper from '../GameHelper';
import Weather from './Weather';
import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';

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
            Notifier.warning({
                title: 'Weather',
                message: `${humanifyString(WeatherType[weatherType])} cannot occur in ${camelCaseToString(Region[region])}`,
            });
            return;
        }

        if (!this.canAffordWeather(region, weatherType, cycles)) {
            Notifier.warning({
                title: 'Weather',
                message: `You cannot afford to activate ${humanifyString(WeatherType[weatherType])} in ${camelCaseToString(Region[region])}`,
            });
            return;
        }

        WeatherOverride.weatherCost[weatherType].forEach(cost => {
            const { item, amount } = cost;
            player.loseItem(item.name, this.calculatePrice(region, amount, cycles));
        });

        GameHelper.incrementObservable(this._costModifier[region], cycles * WeatherOverride.CYCLE_TIME);

        if (this._overrides[region].weather() === weatherType) {
            // Extend if it's the same weather
            this._overrides[region].time(this._overrides[region].time() + cycles * WeatherOverride.CYCLE_TIME);
        } else {
            this._overrides[region].time(cycles * WeatherOverride.CYCLE_TIME);
        }

        this._overrides[region].weather(weatherType);

        Notifier.notify({
            title: 'Weather',
            message: `The weather in ${camelCaseToString(Region[region])} has changed to ${humanifyString(WeatherType[weatherType])}`,
            type: NotificationOption.success,
        });
    }

    public canAffordWeather(region: Region, weatherType: WeatherType, cycles: number): boolean {
        return WeatherOverride.weatherCost[weatherType].every(cost => {
            const { item, amount } = cost;

            return player.itemList[item.name]() >= this.calculatePrice(region, amount, cycles);
        });
    }

    public getAllowedWeather(region: Region): WeatherType[] {
        return Weather.weatherDistribution[region] || GameHelper.enumNumbers(WeatherType);
    }

    public isWeatherAllowedInRegion(region: Region, weatherType: WeatherType): boolean {
        return this.getAllowedWeather(region).includes(weatherType);
    }

    public calculatePrice(region: Region, basePrice: number, cycles: number) {
        const multiplier = 1.2328467394420661; // Magic number Math.pow(10, 1/11) => x10 base price per 5 minutes at 12+ cycles
        const multiplierExponentCap = 12;

        const gymCountForRegion = RegionGyms[region].length;
        const gymDefeatedCountForRegion = RegionGyms[region].filter(gym => App.game.statistics.gymsDefeated[getGymIndex(gym)]() > 0).length;
        const baseLog = (base, value) => Math.log(value) / Math.log(base);
        const scale = baseLog(101, (1 - gymDefeatedCountForRegion / gymCountForRegion) * 100 + 1);

        const regionCompletionMultiplier = 29 * scale + 1;

        const startAmount = Math.floor(Math.max(this._costModifier[region](), 0) / WeatherOverride.CYCLE_TIME);
        const endAmount = startAmount + cycles;

        const incrementalStartAmount = Math.min(startAmount, multiplierExponentCap);
        const incrementalEndAmount = Math.min(endAmount, multiplierExponentCap);

        const incrementalPriceSum = Math.round(basePrice * regionCompletionMultiplier * ((multiplier ** incrementalEndAmount) - (multiplier ** incrementalStartAmount)) / (multiplier - 1));

        const cappedAmount = Math.max(0, endAmount - Math.max(multiplierExponentCap, startAmount));
        const cappedPricePerItem = basePrice * regionCompletionMultiplier * (multiplier ** (multiplierExponentCap - 1));
        const cappedPriceSum = Math.round(cappedPricePerItem * cappedAmount);

        return incrementalPriceSum + cappedPriceSum;
    }

    public reduceCostModifierInHours(hours: number) {
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
        const overrides = {};
        Object.entries(this._overrides).forEach(([key, value]) => {
            if (value.weather() !== null) {
                overrides[key] = {
                    weather: value.weather(),
                    time: value.time(),
                };
            }
        });

        const costModifiers = {};
        Object.entries(this._costModifier).forEach(([key, value]) => {
            if (value() > 0) {
                costModifiers[key] = value();
            }
        });

        return {
            selectedCycles: WeatherOverride.selectedCycles,
            selectedRegion: WeatherOverride.selectedRegion,
            overrides: overrides,
            costModifiers: costModifiers,
        };
    }

    fromJSON(json: Record<string, any>) {
        if (json !== null) {
            WeatherOverride.selectedCycles = json.selectedCycles ?? 1;
            WeatherOverride.selectedRegion = json.selectedRegion ?? Region.kanto;

            Object.keys(this._overrides).forEach(value => {
                this._overrides[value].weather(json.overrides[value]?.weather ?? null);
                this._overrides[value].time(json.overrides[value]?.time ?? 0);
            });

            Object.keys(this._costModifier).forEach(value => {
                this._costModifier[value](json.costModifiers[value] ?? 0);
            });
        }
    }
}
