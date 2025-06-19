import UndergroundToolType from './UndergroundToolType';
import { Coordinate } from '../mine/Mine';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import { Observable, PureComputed } from 'knockout';
import { UNDERGROUND_MAX_CLICKS_PER_SECOND } from '../UndergroundController';

type UndergroundToolProperties = {
    id: UndergroundToolType;
    displayName: string;
    description: string;

    durabilityPerUse: number;
    itemDestroyChance?: number;

    customRestoreRateFn?: (tool: UndergroundTool, level: number) => number;
    action: (x: number, y: number) => { coordinatesMined: Array<Coordinate>, success: boolean };
};

export default class UndergroundTool {
    private _toolProperties: UndergroundToolProperties;

    private _durability: Observable<number> = ko.observable(1).extend({ numeric: 5 });

    public canUseTool: PureComputed<boolean> = ko.pureComputed(() => this.durability >= this.durabilityPerUse);
    public restoreRatePerSecond: PureComputed<number> = ko.pureComputed(() => this.calculateDurabilityRestoreRatePerSecond(App.game.underground.undergroundLevel));

    private maxDurabilityPerSecond: PureComputed<number> = ko.pureComputed(() => this._toolProperties.durabilityPerUse * UNDERGROUND_MAX_CLICKS_PER_SECOND);

    constructor(toolProperties: UndergroundToolProperties) {
        this._toolProperties = toolProperties;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public tick(deltaTime: number) {
        this.handleDurabilityTick(deltaTime);
    }

    private handleDurabilityTick(deltaTime: number) {
        if (this.durability >= 1) return;

        const restorePercentage: number = this.restoreRatePerSecond() * deltaTime;

        if (restorePercentage >= 1) {
            this._durability(1);
            return;
        }

        this._durability(Math.min(this.durability + restorePercentage, 1));

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
        this._durability(this._durability() - this.durabilityPerUse);
    }

    get id(): UndergroundToolType {
        return this._toolProperties.id;
    }

    get displayName(): string {
        return this._toolProperties.displayName;
    }

    get description(): string {
        return this._toolProperties.description;
    }

    get durabilityPerUse(): number {
        return this.restoreRatePerSecond() >= this.maxDurabilityPerSecond() ? 0 : this._toolProperties.durabilityPerUse;
    }

    get durability(): number {
        return this._durability();
    }

    get itemDestroyChance(): number {
        return this._toolProperties.itemDestroyChance ?? 0;
    }

    get action() {
        return this._toolProperties.action;
    }

    public fromJSON(save) {
        this._durability(save?.durability ?? 1);
    }

    public toJSON() {
        return {
            durability: this._durability(),
        };
    }

    public calculateDurabilityRestoreRatePerSecond(level: number = 0): number {
        if (this._toolProperties.customRestoreRateFn) {
            return this._toolProperties.customRestoreRateFn(this, level);
        }

        const [minimumLevel, maximumLevel] = [0, 20];
        const deltaLevel: number = maximumLevel - minimumLevel;

        const baseRatePerSecond = 0.001;
        const finalRatePerSecond = 0.18;

        return (2 ** (Math.max(level - minimumLevel, 0) / deltaLevel) ** 10 - 1) * (finalRatePerSecond - baseRatePerSecond) + baseRatePerSecond;
    }
}
