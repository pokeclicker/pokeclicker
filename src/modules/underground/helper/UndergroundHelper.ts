import { Observable, ObservableArray, PureComputed } from 'knockout';
import { MineType } from '../mine/MineConfig';
import Requirement from '../../requirements/Requirement';
import MultiRequirement from '../../requirements/MultiRequirement';
import OneFromManyRequirement from '../../requirements/OneFromManyRequirement';
import {
    REWARD_RETENTION_BASE,
    REWARD_RETENTION_DECREASE_PER_LEVEL,
    REWARD_RETENTION_MINIMUM,
    EnergyRestoreSize,
    FAVORITE_MINE_CHANCE_BASE,
    FAVORITE_MINE_CHANCE_INCREASE_PER_LEVEL,
    FAVORITE_MINE_CHANCE_MAXIMUM,
    MAX_HIRES,
    SMART_TOOL_CHANCE_BASE,
    SMART_TOOL_CHANCE_INCREASE_PER_LEVEL,
    SMART_TOOL_CHANCE_MAXIMUM,
    WORKCYCLE_TIMEOUT_BASE,
    WORKCYCLE_TIMEOUT_DECREASE_PER_LEVEL,
    WORKCYCLE_TIMEOUT_MINIMUM,
} from '../../GameConstants';
import GameHelper from '../../GameHelper';
import UndergroundToolType from '../tools/UndergroundToolType';
import { UndergroundController } from '../UndergroundController';
import Rand from '../../utilities/Rand';
import UndergroundTool from '../tools/UndergroundTool';
import UndergroundItem from '../UndergroundItem';

type UndergroundHelperParams = {
    id: string,
    name: string,
    images: string[],
    favoriteMine: MineType,
    unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    retentionText?: string[],
};

export class UndergroundHelper {
    private _id: string;
    private _name: string;
    private _images: string[];
    private _favoriteMine: MineType;
    private _unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement;
    private _retentionText: string[];

    private _experience: Observable<number> = ko.observable<number>(0);
    private _hired: Observable<boolean> = ko.observable<boolean>(false);
    private _timeSinceWork: Observable<number> = ko.observable<number>(0);

    private _level: PureComputed<number> = ko.pureComputed(() => UndergroundHelper.convertExperienceToLevel(this._experience()));
    private _progressToNextLevel: PureComputed<number> = ko.pureComputed(() =>
        (this._experience() - UndergroundHelper.convertLevelToExperience(this._level())) /
        (UndergroundHelper.convertLevelToExperience(this._level() + 1) - UndergroundHelper.convertLevelToExperience(this._level())));
    private _rewardRetention: PureComputed<number> = ko.pureComputed(() => Math.max(REWARD_RETENTION_BASE - REWARD_RETENTION_DECREASE_PER_LEVEL * this._level(), REWARD_RETENTION_MINIMUM));
    private _smartToolUsageChance: PureComputed<number> = ko.pureComputed(() => Math.min(SMART_TOOL_CHANCE_BASE + SMART_TOOL_CHANCE_INCREASE_PER_LEVEL * this._level(), SMART_TOOL_CHANCE_MAXIMUM));
    private _favoriteMineChance: PureComputed<number> = ko.pureComputed(() =>
        Math.min(FAVORITE_MINE_CHANCE_BASE + FAVORITE_MINE_CHANCE_INCREASE_PER_LEVEL * this._level(), FAVORITE_MINE_CHANCE_MAXIMUM));
    private _shouldDiscoverFavorite: Observable<boolean> = ko.observable<boolean>(false);
    private _workCycleTime: PureComputed<number> = ko.pureComputed(() => Math.max(WORKCYCLE_TIMEOUT_BASE - WORKCYCLE_TIMEOUT_DECREASE_PER_LEVEL * this._level(), WORKCYCLE_TIMEOUT_MINIMUM));

    private _allowedEnergyRestores: ObservableArray<EnergyRestoreSize> = ko.observableArray([]);
    public selectedEnergyRestore: PureComputed<EnergyRestoreSize | -1> = ko.pureComputed(() => this._allowedEnergyRestores().find(potion => player.itemList[EnergyRestoreSize[potion]]() > 0) ?? -1);

    private _trackedStolenItems: Record<600, Observable<number>> = {
        600: ko.observable(0),
    };

    constructor(options: UndergroundHelperParams) {
        const {
            id,
            name,
            images,
            favoriteMine,
            unlockRequirement = undefined,
            retentionText = undefined,
        } = options;

        this._id = id;
        this._name = name;
        this._images = images;
        this._favoriteMine = favoriteMine;
        this._unlockRequirement = unlockRequirement;
        this._retentionText = retentionText?.length > 0 ? retentionText : [`${name} kept this treasure as payment.`];
    }

    public isUnlocked(): boolean {
        return this._unlockRequirement?.isCompleted() ?? true;
    }

    public tick(delta: number) {
        if (App.game.underground.mine?.timeUntilDiscovery > 0 || App.game.underground.mine.completed) {
            return;
        }

        GameHelper.incrementObservable(this._timeSinceWork, delta);

        if (this._timeSinceWork() > this.workCycleTime) {
            GameHelper.incrementObservable(this._timeSinceWork, -1 * this.workCycleTime);
            this._workAction();

            this.tryUseEnergyPotion();
        }
    }

    private _workAction() {
        // TODO : Implement logic to use tools and do work
        let tool: UndergroundTool;
        const { x, y } = this.getSmartCoordinate();

        if (Rand.chance(this.smartToolUsageChance)) {
            if (App.game.underground.mine.itemsPartiallyFound < App.game.underground.mine.itemsBuried) {
                tool = App.game.underground.tools.getTool(UndergroundToolType.Bomb);
            } else {
                let tilesWithRewardCounter = 0;
                for (let xShift = -1; xShift <= 1; ++xShift) {
                    for (let yShift = -1; yShift <= 1; ++yShift) {
                        const indexToCheck = App.game.underground.mine.getGridIndexForCoordinate({ x: x + xShift, y: y + yShift });
                        if (indexToCheck < 0)
                            continue;

                        if (App.game.underground.mine.grid[indexToCheck].layerDepth > 0 && App.game.underground.mine.grid[indexToCheck].reward)
                            ++tilesWithRewardCounter;
                    }
                }

                if (tilesWithRewardCounter < 2) {
                    tool = App.game.underground.tools.getTool(UndergroundToolType.Chisel);
                } else {
                    tool = App.game.underground.tools.getTool(UndergroundToolType.Hammer);
                }

            }
        } else {
            tool = App.game.underground.tools.getRandomTool();
        }

        const { coordinatesMined, success } = tool.action(x, y);

        if (success) {
            UndergroundController.handleCoordinatesMined(coordinatesMined, tool.id, this);
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
        if (this.selectedEnergyRestore() < 0)
            return;

        const potionName = EnergyRestoreSize[this.selectedEnergyRestore()];
        if (player.itemList[potionName]() <= 0)
            return;

        switch (this.selectedEnergyRestore()) {
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
        UndergroundController.notifyHelperHired(this);
    }

    public fire() {
        this._hired(false);
        this._timeSinceWork(0);
        UndergroundController.notifyHelperFired(this);
    }

    public toggleEnergyRestore(energyRestore: EnergyRestoreSize) {
        if (this._allowedEnergyRestores().includes(energyRestore)) {
            this._allowedEnergyRestores.remove(energyRestore);
        } else {
            this._allowedEnergyRestores.push(energyRestore);
            this._allowedEnergyRestores.sort().reverse();
        }
    }

    public hasAllowedEnergyRestore(energyRestore: EnergyRestoreSize) {
        return this._allowedEnergyRestores().includes(energyRestore);
    }

    public addExp(experience: number) {
        GameHelper.incrementObservable(this._experience, experience);
    }

    public retainItem(item: UndergroundItem, amount: number) {
        UndergroundController.notifyHelperItemRetention(item, amount, this);

        GameHelper.incrementObservable(this._trackedStolenItems[item.id]);
    }

    public hasStolenItem(stolenItemID: number): boolean {
        return this._trackedStolenItems[stolenItemID]?.() > 0;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get images(): string[] {
        return this._images.map(image => `assets/images/underground/helpers/${image}.png`);
    }

    get hired(): boolean {
        return this._hired();
    }

    get experience(): number {
        return Math.floor(this._experience());
    }

    get level(): number {
        return this._level();
    }

    get progressToNextLevel(): number {
        return this._progressToNextLevel();
    }

    get rewardRetention(): number {
        return this._rewardRetention();
    }

    get retentionText(): string {
        return Rand.fromArray(this._retentionText);
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

    get shouldDiscoverFavorite(): boolean {
        return this._shouldDiscoverFavorite();
    }

    set shouldDiscoverFavorite(value: boolean) {
        this._shouldDiscoverFavorite(value);
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

    public toJSON(): Record<string, any> {
        return {
            id: this.id,
            experience: this._experience(),
            hired: this._hired(),
            timeSinceWork: this._timeSinceWork(),
            allowedEnergyRestores: this._allowedEnergyRestores(),
            shouldDiscoverFavorite: this._shouldDiscoverFavorite(),
            retainedItems: ko.toJS(this._trackedStolenItems),
        };
    }

    public fromJSON(json: any) {
        this._experience(json?.experience || 0);
        this._hired(json?.hired || false);
        this._timeSinceWork(json?.timeSinceWork || 0);
        this._allowedEnergyRestores(json?.allowedEnergyRestores ?? []);
        this._shouldDiscoverFavorite(json?.shouldDiscoverFavorite ?? false);
        Object.keys(this._trackedStolenItems).forEach(value => {
            this._trackedStolenItems[value](json?.retainedItems?.[value] ?? 0);
        });
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

UndergroundHelpers.add(new UndergroundHelper({ id: 'diamond', name: 'Steve and Alex', images: ['steve', 'alex'], favoriteMine: MineType.Diamond, retentionText: [
    'This is as rare as a Master Ball. We’re keeping it for our... crafting projects.',
    'This treasure’s as valuable as diamonds. We’ll hold onto it for now.',
    'Rare finds like this are hard to come by. Consider it ‘Steve and Alex tax.’',
] }));
UndergroundHelpers.add(new UndergroundHelper({ id: 'gemplates', name: 'Gemma', images: ['perrin'], favoriteMine: MineType.GemPlate, retentionText: [
    'Shiny, sparkly, and absolutely mine!',
    'This is too beautiful to part with. It’s coming with me.',
    'Looks like I’ve struck crystal gold! Finders keepers, right?',
    'A treasure this dazzling belongs with someone who appreciates its beauty.',
    'Ooh, this is as radiant as a Legendary Pokémon! Definitely keeping it.',
] }));
UndergroundHelpers.add(new UndergroundHelper({ id: 'shards', name: 'Sharlene', images: ['sharlene'], favoriteMine: MineType.Shard, retentionText: [
    'This is sharp and shiny—just my style. It’s staying with me!',
    'Looks like another piece for my ultimate collection!',
    'Items like these hold secrets. I’ll study this one closely.',
    'This speaks to me. Its place is with me now.',
    'A perfect item for a perfect treasure hunter. Thanks for the assist!',
] }));
UndergroundHelpers.add(new UndergroundHelper({ id: 'fossils', name: 'Jones', images: ['jones'], favoriteMine: MineType.Fossil, retentionText: [
    'This artifact belongs in a museum—or maybe just my backpack!',
    'A rare treasure like this deserves a careful keeper. That’s me!',
    'Looks like I’ve uncovered another legendary find. I’ll hold onto it for safekeeping.',
    'Every dig uncovers a story... and this one’s staying with me.',
    'Another relic of the underground! Don’t worry, I’ll keep it safe from Team Rocket.',
] }));
UndergroundHelpers.add(new UndergroundHelper({ id: 'evolutionitems', name: 'Darwin', images: ['darwin'], favoriteMine: MineType.EvolutionItem, retentionText: [
    'Fascinating! This item clearly demonstrates adaptation at its finest. I’ll study it further.',
    'A perfect example of survival of the fittest... in my bag.',
    'This discovery is essential to understanding underground ecosystems. I’ll keep it!',
    'Nature is full of wonders, and this is one I simply must preserve.',
    'Remarkable! I’ll add this to my collection of evolutionary evidence.',
] }));
