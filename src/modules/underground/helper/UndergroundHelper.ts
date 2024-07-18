import { Observable, PureComputed } from 'knockout';
import { MineType } from '../mine/MineConfig';
import Requirement from '../../requirements/Requirement';
import MultiRequirement from '../../requirements/MultiRequirement';
import OneFromManyRequirement from '../../requirements/OneFromManyRequirement';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import { EnergyRestoreSize, SECOND } from '../../GameConstants';
import GameHelper from '../../GameHelper';
import UndergroundToolType from '../tools/UndergroundToolType';
import { Coordinate } from '../mine/Mine';
import UndergroundItem from '../UndergroundItem';
import UndergroundItemValueType from '../../enums/UndergroundItemValueType';
import { UndergroundController } from '../UndergroundController';
import Rand from '../../utilities/Rand';

export class UndergroundHelper {
    private _experience: Observable<number> = ko.observable<number>(0);
    private _hired: Observable<boolean> = ko.observable<boolean>(false);
    private _timeSinceWork: Observable<number> = ko.observable<number>(0);

    private _level: PureComputed<number> = ko.pureComputed(() => this._experience());
    private _autoSellValue: PureComputed<number> = ko.pureComputed(() => Math.min(0.4 + 0.01 * this._level(), 0.9));
    private _smartToolUsageChance: PureComputed<number> = ko.pureComputed(() => Math.min(0.5 + 0.025 * this._level(), 1));
    private _favoriteMineChance: PureComputed<number> = ko.pureComputed(() => Math.min(0.5 + 0.01 * this._level(), 1));
    private _workCycleTime: PureComputed<number> = ko.pureComputed(() => Math.max(60 - this._level(), 10));

    private _selectedEnergyRestore: Observable<EnergyRestoreSize | null> = ko.observable(null);

    public static RESTORE_OPTIONS = [
        { value: null, name: 'None' },
        { value: EnergyRestoreSize.SmallRestore, name: 'Small Restore' },
        { value: EnergyRestoreSize.MediumRestore, name: 'Medium Restore' },
        { value: EnergyRestoreSize.LargeRestore, name: 'Large Restore' },
    ];

    constructor(
        private _id: string,
        private _name: string,
        private _favoriteMine: MineType,
        private _unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
    }

    public isUnlocked(): boolean {
        return this._unlockRequirement?.isCompleted() ?? true;
    }

    public tick(delta: number) {
        if (App.game.underground.mine?.timeUntilDiscovery > 0) {
            return;
        }

        GameHelper.incrementObservable(this._timeSinceWork, delta);

        if (this._timeSinceWork() > this.workCycleTime) {
            this._timeSinceWork(0);
            this._workAction();

            this.tryUseEnergyPotion();
        }
    }

    private _workAction() {
        // TODO : Implement logic to use tools and do work
        let coordinatesMined: Array<Coordinate> = [];

        if (App.game.underground.mine?.itemsPartiallyFound < App.game.underground.mine?.itemsBuried) {
            // Use the Bomb action, can use this one anywhere we want
            const tool = App.game.undergroundTools.getTool(UndergroundToolType.Bomb);
            coordinatesMined = tool.action(0, 0);
            GameHelper.incrementObservable(this._experience, tool.experiencePerUse);
        } else {
            // Use the chisel action
            const tool = App.game.undergroundTools.getTool(UndergroundToolType.Chisel);
            const { x, y } = this.getSmartCoordinate();
            coordinatesMined = tool.action(x, y);
            GameHelper.incrementObservable(this._experience, tool.experiencePerUse);
        }

        const itemsDugUp: { item: UndergroundItem; amount: number }[] = coordinatesMined.map(coordinate => App.game.underground.mine.attemptDigUpItem(coordinate));

        itemsDugUp.forEach(value => {
            if (value) {
                const { item, amount } = value;

                if (item.valueType === UndergroundItemValueType.Diamond || item.valueType === UndergroundItemValueType.Gem) {
                    UndergroundController.gainProfit(item, amount, this.autoSellValue);
                } else {
                    UndergroundController.gainMineItem(item.id, amount);
                }
            }
        });

        if (App.game.underground.mine?.itemsFound === App.game.underground.mine?.itemsBuried) {
            App.game.underground.generateMine(Rand.chance(this.favoriteMineChance) ? this._favoriteMine : undefined);
        }
    }

    private getSmartCoordinate() {
        const unminedRewardCoordinates = App.game.underground.mine.grid.reduce<number[]>((previousValue, currentValue, currentIndex) => {
            if (currentValue.reward && currentValue.layerDepth > 0)
                previousValue.push(currentIndex);
            return previousValue;
        }, []);

        return App.game.underground.mine.getCoordinateForGridIndex(Rand.fromArray(unminedRewardCoordinates));
    }

    public tryUseEnergyPotion() {
        if (this.selectedEnergyRestore == null)
            return;

        const potionName = EnergyRestoreSize[this.selectedEnergyRestore];
        if (player.itemList[potionName]() <= 0)
            return;

        switch (this.selectedEnergyRestore) {
            case EnergyRestoreSize.SmallRestore:
                GameHelper.incrementObservable(this._timeSinceWork, 0.25 * this.workCycleTime);
                break;
            case EnergyRestoreSize.MediumRestore:
                GameHelper.incrementObservable(this._timeSinceWork, 0.5 * this.workCycleTime);
                break;
            case EnergyRestoreSize.LargeRestore:
                GameHelper.incrementObservable(this._timeSinceWork, 0.75 * this.workCycleTime);
                break;
        }

        player.loseItem(potionName, 1);
    }

    public hire() {
        this._hired(true);
        this._timeSinceWork(0);
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
        this._timeSinceWork(0);
        Notifier.notify({
            title: `[UNDERGROUND HELPER] ${this._name}`,
            message: 'Happy to work for you! Let me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * SECOND,
            setting: NotificationConstants.NotificationSetting.Underground.helper,
        });
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
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

    get favoriteMineChance(): number {
        return this._favoriteMineChance();
    }

    get timeSinceWork(): number {
        return this._timeSinceWork();
    }

    get workCycleTime(): number {
        return this._workCycleTime();
    }

    get selectedEnergyRestore(): EnergyRestoreSize | null {
        return this._selectedEnergyRestore();
    }

    set selectedEnergyRestore(value: EnergyRestoreSize | null) {
        this._selectedEnergyRestore(value);
    }

    public toJSON(): Record<string, any> {
        return {
            id: this.id,
            experience: this._experience(),
            hired: this._hired(),
            timeSinceWork: this._timeSinceWork(),
            selectedEnergyRestore: this._selectedEnergyRestore(),
        };
    }

    public fromJSON(json: any) {
        this._experience = ko.observable(json?.experience || 0);
        this._hired = ko.observable(json?.hired || false);
        this._timeSinceWork = ko.observable(json?.timeSinceWork || 0);
        this._selectedEnergyRestore = ko.observable(json?.selectedEnergyRestore || null);
    }
}

export class UndergroundHelpers {
    public static list: Array<UndergroundHelper> = [];

    public available: PureComputed<UndergroundHelper[]>;
    public hired: PureComputed<UndergroundHelper[]>;
    public canHire: PureComputed<boolean>;

    public static MAX_HIRES: number = 1;

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
            const data = json?.find(h => h.id === helper.id);
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
UndergroundHelpers.add(new UndergroundHelper('gemplates', 'Helper (Plates)', MineType.GemPlate, null));
UndergroundHelpers.add(new UndergroundHelper('shards', 'Helper (Shards)', MineType.Shard, null));
UndergroundHelpers.add(new UndergroundHelper('fossils', 'Helper (Fossils)', MineType.Fossil, null));
UndergroundHelpers.add(new UndergroundHelper('evolutionitems', 'Helper (Evolution Items)', MineType.EvolutionItem, null));
