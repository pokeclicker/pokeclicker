import {
    Observable as KnockoutObservable, PureComputed,
} from 'knockout';
import Upgrade, {UpgradeProperties} from './Upgrade';

export type ExpUpgradeProperties = UpgradeProperties & {
    experienceList: number[];
    allowExperienceOverflow?: boolean;
};

/**
 * An upgrade that requires experience to level up.
 */
export default class ExpUpgrade extends Upgrade {
    defaults = {
        level: 0,
        exp: 0,
        allowExperienceOverflow: false,
    };

    private readonly _experienceList: number[];
    private readonly _allowExperienceOverflow: boolean = false;

    private _experience: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public isUpgradeAvailable: PureComputed<boolean> = ko.pureComputed(() => this.hasEnoughExp(this.level + 1) && !this.isMaxLevel());

    constructor(properties: ExpUpgradeProperties) {
        super(properties);
        this._experienceList = properties.experienceList;
        this._allowExperienceOverflow = properties.allowExperienceOverflow ?? this.defaults.allowExperienceOverflow;
        this._experience = ko.observable(0);
    }

    gainExp(experience: number) {
        if (this._allowExperienceOverflow) {
            this.experience += experience;
        } else if (this.experience < this._experienceList[this.level + 1]) {
            this.experience = Math.min(this._experienceList[this.level + 1], this.experience + experience);
        }
    }

    canBuy(level: number = this.level): boolean {
        return super.canBuy(level) && this.hasEnoughExp(level);
    }

    hasEnoughExp(level: number = this.level) {
        return this.experience >= this._experienceList[level];
    }

    public getExperienceForLevel(level: number = this.level): number {
        return this._experienceList[level];
    }

    get experiencePercentage(): number {
        return Math.min(1, this.experience / this._experienceList[this.level + 1]);
    }

    get normalizedExperiencePercentage(): number {
        return this.normalizedExperience / (this._experienceList[this.level + 1] - this._experienceList[this.level]);
    }

    get normalizedExperience(): number {
        if (this.level === 0)
            return this.experience;
        return Math.min(Math.max(this.experience - this._experienceList[this.level], 0), this._experienceList[this.level + 1] - this._experienceList[this.level]);
    }

    get experience() {
        return this._experience();
    }

    private set experience(exp: number) {
        this._experience(exp);
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json.exp = this.experience;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.experience = json.exp ?? this.defaults.exp;
    }
}
