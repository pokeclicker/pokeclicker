import { Feature } from '../DataStore/common/Feature';
import KeyItemType from '../enums/KeyItemType';
import { Observable, PureComputed } from 'knockout';
import { UndergroundController } from './UndergroundController';
import GameHelper from '../GameHelper';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { Mine } from './mine/Mine';
import { MineType } from './mine/MineConfig';
import { UndergroundHelpers } from './helper/UndergroundHelper';
import {
    BASE_EXTRA_LAYER_DEPTH, BASE_MAXIMUM_ITEMS,
    BASE_MINE_HEIGHT,
    BASE_MINE_WIDTH,
    BASE_MINIMUM_ITEMS,
    BASE_MINIMUM_LAYER_DEPTH,
} from './UndergroundConfig';


export class Underground implements Feature {
    name = 'Underground';
    saveKey = 'underground';

    defaults: Record<string, any> = {
        undergroundExp: 0,
    };

    private _undergroundExp: Observable<number> = ko.observable(0);
    private _undergroundLevel: PureComputed<number> = ko.pureComputed(() => Underground.convertExperienceToLevel(this._undergroundExp()));
    private _progressToNextLevel: PureComputed<number> = ko.pureComputed(() =>
        (this._undergroundExp() - Underground.convertLevelToExperience(this._undergroundLevel())) / (Underground.convertLevelToExperience(this._undergroundLevel() + 1) - Underground.convertLevelToExperience(this._undergroundLevel())));

    private _mine: Observable<Mine | null> = ko.observable(null);
    public helpers = new UndergroundHelpers();

    canAccess(): boolean {
        return MapHelper.accessToRoute(11, 0) && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }

    initialize(): void {
    }

    update(delta: number): void {
        this.mine?.tick(delta);
        this.helpers?.hired().forEach(helper => helper.tick(delta));
    }

    public generateMine(mineType?: MineType) {
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
            config: UndergroundController.getMineConfig(mineType),
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
        return this._undergroundExp();
    }

    get undergroundLevel(): number {
        return this._undergroundLevel();
    }

    get progressToNextLevel(): number {
        return this._progressToNextLevel();
    }

    toJSON(): Record<string, any> {
        return {
            undergroundExp: this._undergroundExp(),
            mine: this._mine()?.save(),
            helpers: this.helpers.toJSON(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        this._undergroundExp(json.undergroundExp || this.defaults.undergroundExp);
        this._mine(json.mine ? Mine.load(json.mine) : null);
        this.helpers.fromJSON(json.helpers);
    }

    public static calculateMinimumItemsToGenerate(level: number = 0): number {
        return BASE_MINIMUM_ITEMS + Math.min(Math.floor((level + 3) / 6), 5);
    }

    public static calculateMaximumItemsToGenerate(level: number = 0): number {
        return BASE_MAXIMUM_ITEMS + Math.min(Math.floor(level / 6), 5);
    }

    public static convertLevelToExperience(level: number): number {
        let total = 0;
        for (let i = 0; i < level; ++i) {
            total = Math.floor(total + i + 300 * Math.pow(2, i / 7));
        }
        return Math.floor(total / 4);
    }

    public static convertExperienceToLevel(experience: number): number {
        let level = 0;
        while (experience >= this.convertLevelToExperience(level + 1)) {
            ++level;
        }
        return level;
    }
}
