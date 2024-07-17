import { Observable, PureComputed } from 'knockout';
import { MineType } from '../mine/MineConfig';
import Requirement from '../../requirements/Requirement';
import MultiRequirement from '../../requirements/MultiRequirement';
import OneFromManyRequirement from '../../requirements/OneFromManyRequirement';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import { SECOND } from '../../GameConstants';
import GameHelper from '../../GameHelper';

export class UndergroundHelper {
    private _experience: Observable<number>;
    private _hired: Observable<boolean>;
    private _timeSinceWork: Observable<number>;

    private _level: PureComputed<number>;
    private _autoSellValue: PureComputed<number>;
    private _smartToolUsageChance: PureComputed<number>;
    private _workCycleTime: PureComputed<number>;

    constructor(
        private _id: string,
        private _name: string,
        private _favoriteMine: MineType,
        private _unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
        this._experience = ko.observable<number>(0);
        this._level = ko.pureComputed(() => this._experience());

        this._autoSellValue = ko.pureComputed(() => Math.min(0.4 + 0.01 * this._level(), 0.9));
        this._smartToolUsageChance = ko.pureComputed(() => Math.min(0.5 + 0.025 * this._level(), 1));
        this._workCycleTime = ko.pureComputed(() => Math.min(60 + 1 * this._level(), 10));
    }

    public isUnlocked(): boolean {
        return this._unlockRequirement?.isCompleted() ?? true;
    }

    public tick(delta: number) {
        GameHelper.incrementObservable(this._timeSinceWork, delta);

        const workCycleTime = 10; // TODO : Calculate the time needed

        if (this._timeSinceWork() > workCycleTime) {
            this._timeSinceWork(0);
            this._workAction();
        }
    }

    private _workAction() {
        // TODO : Implement logic to use tools and do work
    }

    public useEnergyPotion() {
        // TODO : Add time to _timeSinceWork based on a percentage of the total time it takes
    }

    public hire() {
        this._hired(true);
        Notifier.notify({
            title: `[UNDERGROUND HELPER] ${this._name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * SECOND,
            setting: NotificationConstants.NotificationSetting.Underground.helper,
        });
    }

    public fire() {
        this._hired(false);
        Notifier.notify({
            title: `[UNDERGROUND HELPER] ${this._name}`,
            message: 'Happy to work for you! Let me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * SECOND,
            setting: NotificationConstants.NotificationSetting.Underground.helper,
        });
    }

    public id(): string {
        return this._id;
    }

    get hired(): boolean {
        return this._hired();
    }

    get experience(): number {
        return this._experience();
    }

    get level(): number {
        return this._level();
    }

    get autoSellValue(): number {
        return this._autoSellValue();
    }

    get smartToolUsageChance(): number {
        return this._smartToolUsageChance();
    }

    get workCycleTime(): number {
        return this._workCycleTime();
    }

    public toJSON(): Record<string, any> {
        return {
            experience: this._experience(),
            hired: this._hired(),
            timeSinceWork: this._timeSinceWork(),
        };
    }

    public fromJSON(json: any) {
        this._experience = ko.observable(json?.experience || 0);
        this._hired = ko.observable(json?.hired || false);
        this._timeSinceWork = ko.observable(json?.timeSinceWork || 0);
    }
}

export class UndergroundHelpers {
    public static list: Array<UndergroundHelper> = [];

    public available: PureComputed<UndergroundHelper[]>;
    public hired: PureComputed<UndergroundHelper[]>;
    public canHire: PureComputed<boolean>;

    public static MAX_HIRES: number = 3;

    constructor() {
        this.available = ko.pureComputed(() => UndergroundHelpers.list.filter(helper => helper.isUnlocked()));
        this.hired = ko.pureComputed(() => UndergroundHelpers.list.filter(helper => helper.hired));
        this.canHire = ko.pureComputed(() => this.hired().length < UndergroundHelpers.MAX_HIRES);
    }

    public toJSON(): Record<string, any>[] {
        return this.available().map(helper => helper.toJSON());
    }

    public fromJSON(json: Array<any>): void {
        if (!json?.length) {
            return;
        }

        UndergroundHelpers.list.forEach(helper => {
            const data = json?.find(h => h.id === h.id);
            if (data) {
                helper.fromJSON(data);
            }
        });
    }

    public static add(helper: UndergroundHelper) {
        this.list.push(helper);
    }
}

UndergroundHelpers.add(new UndergroundHelper('diamond', 'Helper (Diamond)', MineType.Diamond, null));
UndergroundHelpers.add(new UndergroundHelper('gemplates', 'Helper (Gem Plates)', MineType.GemPlate, null));
UndergroundHelpers.add(new UndergroundHelper('shards', 'Helper (Shards)', MineType.Shard, null));
UndergroundHelpers.add(new UndergroundHelper('fossils', 'Helper (Fossils)', MineType.Fossil, null));
UndergroundHelpers.add(new UndergroundHelper('evolutionitems', 'Helper (Evolution Items)', MineType.EvolutionItem, null));
