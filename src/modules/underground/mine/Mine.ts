import { MineConfig, MineType } from './MineConfig';
import { Observable } from 'knockout';
import Rand from '../../utilities/Rand';
import UndergroundItem from '../UndergroundItem';
import { UndergroundController } from '../UndergroundController';
import UndergroundItems from '../UndergroundItems';
import OakItemType from '../../enums/OakItemType';
import GameHelper from '../../GameHelper';

export type Coordinate = {
    x: number;
    y: number;
};

type MineProperties = {
    width: number;
    height: number;

    minimumDepth?: number;
    maximumExtraLayers?: number;

    minimumItemsToGenerate: number;
    extraItemsToGenerate: number;

    timeToDiscover: number;

    config?: MineConfig;
};

type RewardProperties = {
    id: number;
    undergroundItemID: number;
    localCoordinate: Coordinate;
    backgroundPosition: string;
    rotations: number;
    rewarded: Observable<boolean>;
};

export enum MineStateType {
    None,
    Loading,
    Undiscovered,
    Active,
    Completed,
    Abandoned,
}

class Reward {
    private _properties: RewardProperties;
    constructor(rewardProperties: RewardProperties) {
        this._properties = rewardProperties;
    }

    get rewardID(): number {
        return this._properties.id;
    }

    get undergroundItemID() {
        return this._properties.undergroundItemID;
    }

    get localCoordinate(): Coordinate {
        return this._properties.localCoordinate;
    }

    get backgroundPosition(): string {
        return this._properties.backgroundPosition;
    }

    get rotations(): number {
        return this._properties.rotations;
    }

    get rewarded(): boolean {
        return this._properties.rewarded();
    }

    set rewarded(value: boolean) {
        this._properties.rewarded(value);
    }

    public save = () => ({
        ...this._properties,
        rewarded: this._properties.rewarded(),
    });

    public load = (json) => {
        this._properties = {
            ...json,
            rewarded: ko.observable<boolean>(json.rewarded),
        };
    };

    public static load = (json): Reward => new Reward({
        ...json,
        rewarded: ko.observable<boolean>(json.rewarded),
    });
}

class Tile {
    private _layerDepth: Observable<number>;
    private _reward?: Reward;
    private _survey: Observable<number>;
    private _surveyRewardID: Observable<number>;

    constructor(layerDepth: number) {
        this._layerDepth = ko.observable<number>(layerDepth);
        this._survey = ko.observable<number>(-1);
        this._surveyRewardID = ko.observable<number>(-1);
    }

    get layerDepth(): number {
        return this._layerDepth();
    }

    set layerDepth(value: number) {
        this._layerDepth(Math.max(value, 0));
    }

    get reward(): Reward {
        return this._reward;
    }

    set reward(value: Reward) {
        this._reward = value;
    }

    get survey(): number | undefined {
        return this._survey?.();
    }

    set survey(range: number) {
        this._survey(range);
    }

    get surveyRewardID(): number | undefined {
        return this._surveyRewardID?.();
    }

    set surveyRewardID(rewardID: number | undefined) {
        this._surveyRewardID(rewardID ?? -1);
    }

    public save = () => ({
        layerDepth: this._layerDepth(),
        reward: this._reward?.save(),
        survey: this._survey(),
        surveyRewardID: this._surveyRewardID(),
    });

    public static load = (json): Tile => {
        const tile = new Tile(json.layerDepth);
        tile.survey = json.survey;
        tile.surveyRewardID = json.surveyRewardID;

        if (json.reward) {
            tile.reward = Reward.load(json.reward);
        }

        return tile;
    };
}

export class Mine {
    public static DEFAULT_MINIMUM_DEPTH: number = 3;
    public static DEFAULT_MAXIMUM_EXTRA_LAYERS: number = 2;
    public static MAXIMUM_PLACEMENT_ATTEMPTS: number = 1000;

    private _mineProperties: MineProperties;
    private _grid: Array<Tile>;

    private _timeUntilDiscovery: Observable<number> = ko.observable(0);

    private _itemsBuried: Observable<number> = ko.observable(0);
    private _itemsFound: Observable<number> = ko.observable(0);
    private _itemsPartiallyFound: Observable<number> = ko.observable(0);

    private _completed: Observable<boolean> = ko.observable(false);

    constructor(mineProperties: MineProperties) {
        this._mineProperties = mineProperties;
        this._timeUntilDiscovery(mineProperties.timeToDiscover);
    }

    public tick(deltaTime: number) {
        if (!this.completed) {
            this._timeUntilDiscovery(this.timeUntilDiscovery - deltaTime);
        }
    }

    public generate() {
        this._generateGrid();
        this._generateUndergroundItems();
    }

    private _generateGrid() {
        this._grid = Array.from({ length: this._mineProperties.width * this._mineProperties.height },
            () => new Tile(Rand.intBetween(0, this._mineProperties.maximumExtraLayers ?? Mine.DEFAULT_MAXIMUM_EXTRA_LAYERS) + (this._mineProperties.minimumDepth ?? Mine.DEFAULT_MINIMUM_DEPTH)));
    }

    private _generateUndergroundItems() {
        if (!this._grid?.length) {
            this._generateGrid();
        }

        const numberOfItemsToGenerate: number = this._mineProperties.config.fixedItemCount ?? Rand.intBetween(
            this._mineProperties.minimumItemsToGenerate,
            this._mineProperties.minimumItemsToGenerate + this._mineProperties.extraItemsToGenerate,
        );
        const availableItems: UndergroundItem[] = this._mineProperties.config.getAvailableItems();

        for (let rewardIndex = 0; rewardIndex < numberOfItemsToGenerate; rewardIndex++) {
            const undergroundItem: UndergroundItem = Rand.fromWeightedArray(availableItems, availableItems.map(value => value.getWeight()));
            let placementAttemptSucceeded = false;
            let attemptCount = 0;

            while (!placementAttemptSucceeded && attemptCount < Mine.MAXIMUM_PLACEMENT_ATTEMPTS) {
                const rotations = Rand.floor(4);
                const localSpace = UndergroundController.rotateMatrix90Clockwise(undergroundItem.space, rotations);
                const randomCoordinate = this.getRandomCoordinate();

                placementAttemptSucceeded = this._attemptPlaceReward(undergroundItem, rewardIndex, randomCoordinate, localSpace, rotations);

                ++attemptCount;
            }
        }

        this._updateItemsBuriedObservable();
        this._updateItemsFoundObservable();
        this._updateItemsPartiallyFoundObservable();
    }

    private _canPlaceReward(coordinate: Coordinate, localSpace: Array<Array<number>>): boolean {
        if (!this._grid?.length)
            return false;

        const rewardWidth = localSpace[0].length;
        const rewardHeight = localSpace.length;

        if (coordinate.x + rewardWidth > this._mineProperties.width || coordinate.y + rewardHeight > this._mineProperties.height)
            return false;

        for (let localXCoordinate = 0; localXCoordinate < rewardWidth; localXCoordinate++) {
            for (let localYCoordinate = 0; localYCoordinate < rewardHeight; localYCoordinate++) {
                if (localSpace[localYCoordinate][localXCoordinate] !== 0) {
                    const mineXCoordinate = coordinate.x + localXCoordinate;
                    const mineYCoordinate = coordinate.y + localYCoordinate;

                    if (this._grid[this.getGridIndexForCoordinate({ x: mineXCoordinate, y: mineYCoordinate })].reward) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    private _attemptPlaceReward(undergroundItem: UndergroundItem, rewardIndex: number, coordinate: Coordinate, localSpace: Array<Array<number>>, rotations: number): boolean {
        if (!this._canPlaceReward(coordinate, localSpace)) {
            return false;
        }

        const rewardWidth = localSpace[0].length;
        const rewardHeight = localSpace.length;

        const { space } = undergroundItem;
        let backgroundPositionSpace: Array<Array<string>> = Array.from({ length: space.length }, (_, i) => Array.from({ length: space[0].length }, (__, j) => {
            const xPercentage = `${(100 * j / (space[0].length - 1)).toFixed(2)}%`;
            const yPercentage = `${(100 * i / (space.length - 1)).toFixed(2)}%`;
            return `${xPercentage} ${yPercentage}`;
        }));
        backgroundPositionSpace = UndergroundController.rotateMatrix90Clockwise(backgroundPositionSpace, rotations);

        for (let localXCoordinate = 0; localXCoordinate < rewardWidth; localXCoordinate++) {
            for (let localYCoordinate = 0; localYCoordinate < rewardHeight; localYCoordinate++) {
                if (localSpace[localYCoordinate][localXCoordinate] !== 0) {
                    const mineXCoordinate = coordinate.x + localXCoordinate;
                    const mineYCoordinate = coordinate.y + localYCoordinate;

                    this._grid[this.getGridIndexForCoordinate({ x: mineXCoordinate, y: mineYCoordinate })].reward = new Reward({
                        id: rewardIndex,
                        undergroundItemID: undergroundItem.id,
                        localCoordinate: {
                            x: localXCoordinate,
                            y: localYCoordinate,
                        },
                        backgroundPosition: backgroundPositionSpace[localYCoordinate][localXCoordinate],
                        rotations: rotations,
                        rewarded: ko.observable<boolean>(false),
                    });
                }
            }
        }

        return true;
    }

    public getRandomCoordinate(): Coordinate {
        return {
            x: Rand.floor(this._mineProperties.width),
            y: Rand.floor(this._mineProperties.height),
        };
    }

    public getCoordinateForGridIndex(index: number): Coordinate | null {
        if (index < 0 || index >= (this.grid?.length || 0))
            return null;

        return {
            x: index % this._mineProperties.width,
            y: Math.floor(index / this._mineProperties.width),
        };
    }

    public getGridIndexForCoordinate(coordinate: Coordinate): number {
        if (coordinate.x < 0 || coordinate.y < 0)
            return -1;
        if (coordinate.x >= this._mineProperties.width || coordinate.y >= this._mineProperties.height)
            return -1;

        return coordinate.y * this._mineProperties.width + coordinate.x;
    }

    private getTileForCoordinate(coordinate: Coordinate) {
        const index = this.getGridIndexForCoordinate(coordinate);
        if (index < 0 || index >= (this._grid?.length || 0))
            return null;

        return this._grid[index];
    }

    public survey(coordinate: Coordinate, range: number, rewardID: number) {
        const tile = this.getTileForCoordinate(coordinate);

        if (!tile) {
            return;
        }

        tile.survey = range;
        tile.surveyRewardID = rewardID;
    }

    public removeSurveyForRewardID(rewardID: number) {
        this.grid.filter(tile => tile.surveyRewardID === rewardID).forEach(tile => {
            tile.survey = -1;
            tile.surveyRewardID = -1;
        });
    }

    public attemptBreakTile(coordinate: Coordinate, layers: number = 1): boolean {
        const tile = this.getTileForCoordinate(coordinate);

        if (tile && tile.layerDepth > 0) {
            tile.layerDepth -= layers;

            if (tile.layerDepth === 0) {
                this._updateItemsPartiallyFoundObservable();
            }

            App.game.underground.battery.charge();
            return true;
        }

        return false;
    }

    public attemptFindItem(coordinate: Coordinate): UndergroundItem {
        const digTile: Tile = this.getTileForCoordinate(coordinate);

        if (!digTile || !digTile.reward || digTile.layerDepth > 0 || digTile.reward.rewarded) {
            return null;
        }

        const undergroundItemTiles: Tile[] = this._grid.filter(tile => tile.reward && tile.reward.rewardID === digTile.reward.rewardID);

        if (!undergroundItemTiles.every(tile => tile.layerDepth === 0)) {
            return null;
        }

        undergroundItemTiles.forEach(tile => {
            tile.reward.rewarded = true;
        });
        this.removeSurveyForRewardID(undergroundItemTiles[0].reward.rewardID);

        this._updateItemsFoundObservable();

        return UndergroundItems.getById(digTile.reward.undergroundItemID);
    }

    public attemptCompleteLayer(): boolean {
        if (!this.completed && this.itemsBuried > 0 && this.itemsFound === this.itemsBuried) {
            this._completed(true);

            GameHelper.incrementObservable(App.game.statistics.undergroundLayersMined);
            GameHelper.incrementObservable(App.game.statistics.undergroundSpecificLayersMined[this.mineType]);
            App.game.oakItems.use(OakItemType.Explosive_Charge);

            return true;
        }

        return false;
    }

    get grid(): Tile[] {
        return this._grid;
    }

    get timeUntilDiscovery(): number {
        return this._timeUntilDiscovery();
    }

    get itemsBuried(): number {
        return this._itemsBuried();
    }

    get itemsFound(): number {
        return this._itemsFound();
    }

    get itemsPartiallyFound(): number {
        return this._itemsPartiallyFound();
    }

    get completed(): boolean {
        return this._completed();
    }

    get width(): number {
        return this._mineProperties.width;
    }

    get height(): number {
        return this._mineProperties.height;
    }

    get mineType(): MineType {
        return this._mineProperties.config.type;
    }

    get initialTimeToDiscover(): number {
        return this._mineProperties.timeToDiscover;
    }

    private _updateItemsBuriedObservable() {
        this._itemsBuried(Mine.buriedItemsIDSet(this).size);
    }

    private _updateItemsFoundObservable() {
        this._itemsFound(Mine.foundItemsIDSet(this).size);
    }

    private _updateItemsPartiallyFoundObservable() {
        this._itemsPartiallyFound(Mine.partiallyFoundItemsIDSet(this).size);
    }

    public save() {
        return {
            properties: this._mineProperties,
            grid: this._grid.map(value => value.save()),
            timeUntilDiscovery: this._timeUntilDiscovery(),
            completed: this._completed(),
        };
    }

    public static load(json): Mine {
        const mine = new Mine(json.properties);
        mine._grid = json.grid?.map(value => Tile.load(value));
        mine._timeUntilDiscovery(json.timeUntilDiscovery || json.properties.timeToDiscover);
        mine._completed(json.completed || false);

        mine._updateItemsBuriedObservable();
        mine._updateItemsFoundObservable();
        mine._updateItemsPartiallyFoundObservable();

        return mine;
    }

    public static buriedItemsIDSet(mine: Mine): Set<number> {
        return new Set(mine.grid.filter(tile => tile.reward).map(tile => tile.reward.rewardID));
    }

    public static hiddenItemsIDSet(mine: Mine): Set<number> {
        const buried = this.buriedItemsIDSet(mine);

        this.foundItemsIDSet(mine).forEach(value => buried.delete(value));
        this.partiallyFoundItemsIDSet(mine).forEach(value => buried.delete(value));

        return buried;
    }

    public static foundItemsIDSet(mine: Mine): Set<number> {
        return new Set(mine.grid.filter(tile => tile.reward && tile.reward.rewarded).map(tile => tile.reward.rewardID));
    }

    public static partiallyFoundItemsIDSet(mine: Mine): Set<number> {
        return new Set(mine.grid.filter(tile => tile.reward && tile.layerDepth === 0).map(tile => tile.reward.rewardID));
    }
}
