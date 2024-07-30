import { Observable } from 'knockout';
import GameHelper from '../../GameHelper';
import UndergroundToolType from './UndergroundToolType';
import { Coordinate } from '../mine/Mine';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import OakItemType from '../../enums/OakItemType';

export default class UndergroundTool {
    private _cooldownTime = ko.observable(0);
    private _nextAllowedUse = ko.observable(Date.now());
    private _bonusCharges: Observable<number> = ko.observable(0);

    public cooldownForDisplay = ko.observable(0);

    private _counter = ko.observable(0);

    constructor(
        public id: UndergroundToolType,
        public displayName: string,
        public baseCooldown: number,
        public cooldownReductionPerLevel: number,
        public maximumBonusCharges: number,
        public experiencePerUse: number,
        public action: (x: number, y: number) => Array<Coordinate> | null,
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public tick(deltaTime: number) {
        this.handleBonusChargesTick(deltaTime);
        this.cooldownForDisplay(this.cooldown < 0.1 ? 0 : this.cooldown);
    }

    private handleBonusChargesTick(deltaTime: number) {
        if (this.cooldown > 0) return;
        if (this.bonusCharges >= this.maximumBonusCharges) return;

        const cellBatteryBonus = App.game.oakItems.calculateBonus(OakItemType.Cell_Battery);
        GameHelper.incrementObservable(this._counter, deltaTime * cellBatteryBonus);

        if (this._counter() >= this.baseCooldown) {
            GameHelper.incrementObservable(this._bonusCharges);
            this._counter(0);

            if (this.bonusCharges === this.maximumBonusCharges) {
                Notifier.notify({
                    title: 'Underground tools',
                    message: `${this.displayName} reached maximum bonus charges: ${this.bonusCharges}!`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                    sound: NotificationConstants.NotificationSound.General.underground_energy_full,
                    setting: NotificationConstants.NotificationSetting.Underground.underground_energy_full,
                });
            } else {
                Notifier.notify({
                    title: 'Underground tools',
                    message: `${this.displayName} has gained an extra bonus charge: ${this.bonusCharges}/${this.maximumBonusCharges}!`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                    setting: NotificationConstants.NotificationSetting.Underground.underground_energy_restore,
                });
            }
        }
    }

    canUseTool(): boolean {
        return this.cooldown <= 0;
    }

    get bonusCharges(): number {
        return this._bonusCharges();
    }

    public useBonusCharge(): void {
        GameHelper.incrementObservable(this._bonusCharges, -1);
    }

    get cooldown(): number {
        return Math.max(this._nextAllowedUse() - Date.now(), 0) / 1000;
    }

    set cooldown(seconds: number) {
        const newNextAllowedUse = Date.now() + seconds * 1000;
        if (newNextAllowedUse > this._nextAllowedUse()) {
            this._cooldownTime(seconds);
            this._nextAllowedUse(newNextAllowedUse);
        }
    }

    get cooldownTime(): number {
        return this._cooldownTime();
    }

    get counter(): number {
        return this._counter();
    }

    public fromJSON(save) {
        this.cooldown = save.cooldown || 0;
        this._cooldownTime(save.cooldownTime || 0);
        this._bonusCharges(save?.bonusCharges || 0);
        this._counter(save?.counter || 0);
    }

    public toJSON() {
        return {
            cooldown: this.cooldown,
            cooldownTime: this.cooldownTime,
            bonusCharges: this._bonusCharges(),
            counter: this._counter(),
        };
    }
}
