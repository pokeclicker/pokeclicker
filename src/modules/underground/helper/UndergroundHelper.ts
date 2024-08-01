import { Observable, PureComputed } from 'knockout';
import { MineType } from '../mine/MineConfig';
import Requirement from '../../requirements/Requirement';
import MultiRequirement from '../../requirements/MultiRequirement';
import OneFromManyRequirement from '../../requirements/OneFromManyRequirement';
import Notifier from '../../notifications/Notifier';
import NotificationConstants from '../../notifications/NotificationConstants';
import { AUTO_SELL_BASE, AUTO_SELL_INCREASE_PER_LEVEL, AUTO_SELL_MAXIMUM, EnergyRestoreSize,
    FAVORITE_MINE_CHANCE_BASE,
    FAVORITE_MINE_CHANCE_INCREASE_PER_LEVEL,
    FAVORITE_MINE_CHANCE_MAXIMUM,
    MAX_HIRES, SECOND, SMART_TOOL_CHANCE_BASE, SMART_TOOL_CHANCE_INCREASE_PER_LEVEL, SMART_TOOL_CHANCE_MAXIMUM,
    UNDERGROUND_EXPERIENCE_CLEAR_LAYER,
    UNDERGROUND_EXPERIENCE_DIG_UP_ITEM, WORKCYCLE_TIMEOUT_BASE, WORKCYCLE_TIMEOUT_DECREASE_PER_LEVEL, WORKCYCLE_TIMEOUT_MINIMUM } from '../../GameConstants';
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

    private _level: PureComputed<number> = ko.pureComputed(() => UndergroundHelper.convertExperienceToLevel(this._experience()));
    private _progressToNextLevel: PureComputed<number> = ko.pureComputed(() =>
        (this._experience() - UndergroundHelper.convertLevelToExperience(this._level())) /
        (UndergroundHelper.convertLevelToExperience(this._level() + 1) - UndergroundHelper.convertLevelToExperience(this._level())));
    private _autoSellValue: PureComputed<number> = ko.pureComputed(() => Math.min(AUTO_SELL_BASE + AUTO_SELL_INCREASE_PER_LEVEL * this._level(), AUTO_SELL_MAXIMUM));
    private _smartToolUsageChance: PureComputed<number> = ko.pureComputed(() => Math.min(SMART_TOOL_CHANCE_BASE + SMART_TOOL_CHANCE_INCREASE_PER_LEVEL * this._level(), SMART_TOOL_CHANCE_MAXIMUM));
    private _favoriteMineChance: PureComputed<number> = ko.pureComputed(() =>
        Math.min(FAVORITE_MINE_CHANCE_BASE + FAVORITE_MINE_CHANCE_INCREASE_PER_LEVEL * this._level(), FAVORITE_MINE_CHANCE_MAXIMUM));
    private _workCycleTime: PureComputed<number> = ko.pureComputed(() => Math.max(WORKCYCLE_TIMEOUT_BASE - WORKCYCLE_TIMEOUT_DECREASE_PER_LEVEL * this._level(), WORKCYCLE_TIMEOUT_MINIMUM));

    private _selectedEnergyRestore: Observable<EnergyRestoreSize> = ko.observable(-1);

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
        let tool;
        const { x, y } = this.getSmartCoordinate();


        if (Rand.chance(this.smartToolUsageChance)) {
            if (App.game.underground.mine.itemsPartiallyFound < App.game.underground.mine.itemsBuried) {
                tool = App.game.undergroundTools.getTool(UndergroundToolType.Bomb);
            } else {
                tool = App.game.undergroundTools.getTool(UndergroundToolType.Chisel);
            }
        } else {
            tool = App.game.undergroundTools.getRandomTool();
        }

        const coordinatesMined: Array<Coordinate> | null = tool.action(x, y);

        if (coordinatesMined !== null) {
            UndergroundController.addHiredHelperUndergroundExp(tool.experiencePerUse, true);

            const itemsFound: { item: UndergroundItem; amount: number }[] = coordinatesMined.map(coordinate => App.game.underground.mine.attemptFindItem(coordinate));

            itemsFound.forEach(value => {
                if (value) {
                    const { item, amount } = value;

                    if (item.valueType === UndergroundItemValueType.Diamond || item.valueType === UndergroundItemValueType.Gem) {
                        UndergroundController.gainProfit(item, amount, this.autoSellValue);
                    } else {
                        UndergroundController.gainMineItem(item.id, amount);
                    }

                    UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_DIG_UP_ITEM, true);

                    UndergroundController.notifyItemFound(item, amount, this);
                }
            });
        }

        if (App.game.underground.mine.attemptCompleteLayer()) {
            UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_CLEAR_LAYER, true);

            UndergroundController.notifyMineCompleted(this);
        }

        if (App.game.underground.mine.completed) {
            App.game.underground.generateMine(Rand.chance(this.favoriteMineChance) ? this._favoriteMine : MineType.Random, this);
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
        if (this.selectedEnergyRestore < 0)
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

    public addExp(experience: number) {
        GameHelper.incrementObservable(this._experience, experience);
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

    get progressToNextLevel(): number {
        return this._progressToNextLevel();
    }

    get autoSellValue(): number {
        return this._autoSellValue();
    }

    get smartToolUsageChance(): number {
        return this._smartToolUsageChance();
    }

    get favoriteMine(): MineType {
        return this._favoriteMine;
    }

    get favoriteMineChance(): number {
        return this._favoriteMineChance();
    }

    get canGenerateSpecial(): boolean {
        return false;
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
        this._selectedEnergyRestore = ko.observable(json?.selectedEnergyRestore ?? -1);
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

export class UndergroundHelpers {
    public static list: Array<UndergroundHelper> = [];

    public available: PureComputed<UndergroundHelper[]>;
    public hired: PureComputed<UndergroundHelper[]>;
    public canHire: PureComputed<boolean>;

    constructor() {
        this.available = ko.pureComputed(() => UndergroundHelpers.list.filter(helper => helper.isUnlocked()));
        this.hired = ko.pureComputed(() => UndergroundHelpers.list.filter(helper => helper.hired));
        this.canHire = ko.pureComputed(() => this.hired().length < MAX_HIRES);
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

UndergroundHelpers.add(new UndergroundHelper('diamond', 'Steve and Alex', MineType.Diamond, null));
UndergroundHelpers.add(new UndergroundHelper('gemplates', 'Gemma', MineType.GemPlate, null));
UndergroundHelpers.add(new UndergroundHelper('shards', 'Sharlene', MineType.Shard, null));
UndergroundHelpers.add(new UndergroundHelper('fossils', 'Jones', MineType.Fossil, null));
UndergroundHelpers.add(new UndergroundHelper('evolutionitems', 'Darwin', MineType.EvolutionItem, null));
