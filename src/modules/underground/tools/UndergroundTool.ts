import GameHelper from '../../GameHelper';
import UndergroundToolType from './UndergroundToolType';
import { Coordinate } from '../mine/Mine';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import { Observable, PureComputed } from 'knockout';

export default class UndergroundTool {
    private _durability: Observable<number> = ko.observable(1).extend({ numeric: 2 });
    private _restoreRateCounter: Observable<number> = ko.observable(0);

    public canUseTool: PureComputed<boolean> = ko.pureComputed(() => this.durability >= this.durabilityPerUse);

    constructor(
        public id: UndergroundToolType,
        public displayName: string,
        public restoreRateInSeconds: number,
        public restoreRateReductionPerLevel: number,
        public durabilityRestoreRate: number,
        public durabilityPerUse: number,
        public action: (x: number, y: number) => { coordinatesMined: Array<Coordinate>, success: boolean },
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public tick(deltaTime: number) {
        this.handleDurabilityTick(deltaTime);
    }

    private handleDurabilityTick(deltaTime: number) {
        if (this.durability >= 1) return;

        if (this.restoreRate <= 0) {
            this._durability(Math.max(this.durability, 1));
            return;
        }

        GameHelper.incrementObservable(this._restoreRateCounter, deltaTime);

        if (this.restoreRateCounter < this.restoreRate) {
            return;
        }

        this._durability(Math.min(this.durability + this.durabilityRestoreRate, 1));
        this._restoreRateCounter(this.restoreRateCounter % this.restoreRate);

        if (this.durability === 1) {
            Notifier.notify({
                title: 'Underground tools',
                message: `${this.displayName} reached 100% durability!`,
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
                sound: NotificationConstants.NotificationSound.General.underground_energy_full,
                setting: NotificationConstants.NotificationSetting.Underground.underground_energy_full,
            });
        }
    }

    public reduceDurabilityByUse() {
        if (this.restoreRate <= 0)
            return;

        GameHelper.incrementObservable(this._durability, -this.durabilityPerUse);
    }

    get durability(): number {
        return this._durability();
    }

    get restoreRate(): number {
        return Math.max(this.restoreRateInSeconds - this.restoreRateReductionPerLevel * App.game.underground.undergroundLevel, 0);
    }

    get restoreRateCounter(): number {
        return this._restoreRateCounter();
    }

    public fromJSON(save) {
        this._durability(save?.durability ?? 1);
        this._restoreRateCounter(save?.restoreRateCounter || 0);
    }

    public toJSON() {
        return {
            durability: this._durability(),
            restoreRateCounter: this._restoreRateCounter(),
        };
    }
}
