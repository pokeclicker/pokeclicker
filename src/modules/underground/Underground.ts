import { Feature } from '../DataStore/common/Feature';
import KeyItemType from '../enums/KeyItemType';
import { Observable, PureComputed } from 'knockout';
import { UndergroundController } from './UndergroundController';
import GameHelper from '../GameHelper';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { Mine } from './mine/Mine';
import { MineType } from './mine/MineConfig';

export class Underground implements Feature {
    name = 'Underground';
    saveKey = 'underground';

    defaults: Record<string, any> = {
        undergroundExp: 0,
    };

    private _undergroundExp: Observable<number> = ko.observable(0);
    private _undergroundLevel: PureComputed<number> = ko.pureComputed(() => {
        return UndergroundController.convertExperienceToLevel(this._undergroundExp());
    });

    private _mine: Observable<Mine | null> = ko.observable(null);

    canAccess(): boolean {
        return MapHelper.accessToRoute(11, 0) && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }

    initialize(): void {
    }

    update(delta: number): void {
        this.mine?.tick(delta);
    }

    public generateMine(mineType?: MineType) {
        const mine = new Mine({
            width: 25,
            height: 12,
            minimumDepth: 0,
            maximumExtraLayers: 0,
            minimumItemsToGenerate: 1,
            extraItemsToGenerate: 2,
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

    toJSON(): Record<string, any> {
        return {
            undergroundExp: this._undergroundExp(),
            mine: this._mine()?.save(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        this._undergroundExp(json.undergroundExp || this.defaults.undergroundExp);
        this._mine(json.mine ? Mine.load(json.mine) : null);
    }
}
