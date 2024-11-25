import { Feature } from '../DataStore/common/Feature';
import KeyItemType from '../enums/KeyItemType';
import { Observable, PureComputed } from 'knockout';
import { UndergroundController } from './UndergroundController';
import GameHelper from '../GameHelper';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { Mine } from './mine/Mine';
import { MineType } from './mine/MineConfig';
import { UndergroundHelper, UndergroundHelpers } from './helper/UndergroundHelper';
import { BASE_EXTRA_LAYER_DEPTH,
    BASE_MAXIMUM_ITEMS, BASE_MINE_HEIGHT, BASE_MINE_WIDTH, BASE_MINIMUM_ITEMS, BASE_MINIMUM_LAYER_DEPTH } from '../GameConstants';
import UndergroundTools from './tools/UndergroundTools';
import { UndergroundBattery } from './UndergroundBattery';

export class Underground implements Feature {
    name = 'Underground';
    saveKey = 'underground';

    defaults: Record<string, any> = {
        undergroundExp: 0,
    };

    private _undergroundExp: Observable<number> = ko.observable(0);
    private _undergroundLevel: PureComputed<number> = ko.pureComputed(() => Underground.convertExperienceToLevel(this._undergroundExp()));
    private _progressToNextLevel: PureComputed<number> = ko.pureComputed(() =>
        (this._undergroundExp() - Underground.convertLevelToExperience(this._undergroundLevel())) /
        (Underground.convertLevelToExperience(this._undergroundLevel() + 1) - Underground.convertLevelToExperience(this._undergroundLevel())));

    private _autoSearchMineType: Observable<MineType> = ko.observable(MineType.Random);

    private _mine: Observable<Mine | null> = ko.observable(null);
    public helpers = new UndergroundHelpers();
    public tools = new UndergroundTools();
    public battery = new UndergroundBattery();

    canAccess(): boolean {
        return MapHelper.accessToRoute(11, 0) && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }

    initialize(): void {
        this.tools.initialize();
        this.battery.initialize();
    }

    update(delta: number): void {
        this.mine?.tick(delta);
        this.helpers?.hired().forEach(helper => helper.tick(delta));
        this.tools.update(delta);
        this.battery.update(delta);
    }

    public generateMine(mineType: MineType, helper: UndergroundHelper = undefined) {
        const minItemsToGenerate = Underground.calculateMinimumItemsToGenerate(this.undergroundLevel);
        const maxItemsToGenerate = Underground.calculateMaximumItemsToGenerate(this.undergroundLevel);

        const mine = new Mine({
            width: BASE_MINE_WIDTH,
            height: BASE_MINE_HEIGHT,
            minimumDepth: BASE_MINIMUM_LAYER_DEPTH,
            maximumExtraLayers: BASE_EXTRA_LAYER_DEPTH,
            minimumItemsToGenerate: minItemsToGenerate,
            extraItemsToGenerate: Math.max(maxItemsToGenerate - minItemsToGenerate, 0),
            timeToDiscover: UndergroundController.calculateDiscoverMineTimeout(mineType),
            config: UndergroundController.generateMineConfig(mineType, helper),
        });
        mine.generate();

        this._mine(mine);
    }

    public addUndergroundExp(amount: number) {
        const currentLevel = this._undergroundLevel();
        GameHelper.incrementObservable(this._undergroundExp, amount);

        if (this._undergroundLevel() > currentLevel) {
            Notifier.notify({
                message: `Your Underground level has increased to ${this._undergroundLevel()}!`,
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
            });
        }
    }

    get mine(): Mine | null {
        return this._mine();
    }

    get undergroundExp(): number {
        return Math.floor(this._undergroundExp());
    }

    get undergroundLevel(): number {
        return this._undergroundLevel();
    }

    get progressToNextLevel(): number {
        return this._progressToNextLevel();
    }

    get autoSearchMineType(): MineType {
        return this._autoSearchMineType();
    }

    set autoSearchMineType(type: MineType) {
        this._autoSearchMineType(type);
    }

    toJSON(): Record<string, any> {
        return {
            undergroundExp: this._undergroundExp(),
            mine: this._mine()?.save(),
            helpers: this.helpers.toJSON(),
            tools: this.tools.toJSON(),
            battery: this.battery.toJSON(),
            autoSearchMineType: this._autoSearchMineType(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        this._undergroundExp(json.undergroundExp || this.defaults.undergroundExp);
        this._mine(json.mine ? Mine.load(json.mine) : null);
        this.helpers.fromJSON(json.helpers);
        this.tools.fromJSON(json.tools);
        this.battery.fromJSON(json.battery);
        this._autoSearchMineType(json.autoSearchMineType || MineType.Random);

        if (this.mine == null) {
            this.generateMine(MineType.Random);
        }
    }

    public static calculateMinimumItemsToGenerate(level: number = 0): number {
        return BASE_MINIMUM_ITEMS + Math.min(Math.floor((level + 3) / 6), 5);
    }

    public static calculateMaximumItemsToGenerate(level: number = 0): number {
        return BASE_MAXIMUM_ITEMS + Math.min(Math.floor(level / 6), 5);
    }

    public static convertLevelToExperience(level: number): number {
        return Math.ceil(2000 * (1.15 ** level - 1));
    }

    public static convertExperienceToLevel(experience: number): number {
        let level = 0;
        while (experience >= this.convertLevelToExperience(level + 1)) {
            ++level;
        }
        return level;
    }
}
