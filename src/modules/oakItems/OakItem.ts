import {
    Observable as KnockoutObservable, PureComputed,
} from 'knockout';
import GameHelper from '../GameHelper';
import ExpUpgrade, {ExpUpgradeProperties} from '../upgrades/ExpUpgrade';
import Requirement from '../requirements/Requirement';

type OakItemProperties = ExpUpgradeProperties & {
    inactiveBonus: number;

    allowInactiveExperienceGain?: boolean;
    unlockRequirement?: Requirement;
};

export default class OakItem extends ExpUpgrade {
    private readonly _inactiveBonus: number;
    private readonly _allowInactiveExperienceGain: boolean = false;
    private readonly _unlockRequirement: Requirement;

    private _isActive: KnockoutObservable<boolean> = ko.observable(false);
    public isUnlocked: PureComputed<boolean> = ko.pureComputed(() => this._unlockRequirement?.isCompleted() ?? true);

    constructor(properties: OakItemProperties) {
        super(properties);
        this._inactiveBonus = properties.inactiveBonus;
        this._allowInactiveExperienceGain = properties.allowInactiveExperienceGain;
        this._unlockRequirement = properties.unlockRequirement;
    }

    use(experience: number = 1, scale = 1) {
        if (!this.isActive && !this._allowInactiveExperienceGain) {
            return;
        }

        this.gainExp(experience * scale);

        GameHelper.incrementObservable(App.game.statistics.oakItemUses[this.name]);
    }

    calculateBonus(level: number = this.level, ignoreActive: boolean = false): number {
        if (!this.isActive && !ignoreActive) {
            return this._inactiveBonus;
        }
        return super.calculateBonus(level);
    }

    public formatBonus(level: number = this.level, ignoreActive: boolean = false): string {
        return this._bonusFormat?.(this.calculateBonus(level, ignoreActive)) ?? this.calculateBonus(level, ignoreActive).toLocaleString('en-US');
    }

    get requirement(): Requirement | null {
        return this._unlockRequirement;
    }

    get isActive(): boolean {
        return this._isActive();
    }

    set isActive(bool: boolean) {
        this._isActive(bool);
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json.isActive = this.isActive;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.isActive = json.isActive ?? false;
    }
}
