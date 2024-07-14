import type { Observable } from 'knockout';
import GameHelper from '../GameHelper';
import OakItemType from '../enums/OakItemType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import { Underground } from './Underground';
import UndergroundItem from './UndergroundItem';
import UndergroundToolType from './tools/UndergroundToolType';
import {
    DiamondMineConfig,
    EvolutionItemMineConfig,
    FossilMineConfig,
    GemPlateMineConfig,
    MegaStoneMineConfig,
    MineConfig,
    MineType,
    ShardMineConfig,
} from './mine/MineConfig';
import UndergroundItems from './UndergroundItems';
import { humanifyString } from '../GameConstants';

export enum MineStateType {
    None,
    Loading,
    Undiscovered,
    Active,
    Completed,
    Abandoned,
}

type MineTile = {
    layerDepth: Observable<number>;
    reward?: {
        index: number;
        undergroundItemID: number;
        width: number;
        height: number;
        localXCoordinate: number;
        localYCoordinate: number;
        rotations: number;
        rewarded: Observable<boolean>;
    }
};

export class Mine {
    private static _mineState: Observable<MineStateType> = ko.observable(MineStateType.None);

    public static rowCount: number;
    public static columnCount: number;
    public static grid: Array<MineTile>;

    public static itemsFound: Observable<number> = ko.observable(0);
    public static itemsPartiallyFound: Observable<number> = ko.observable(0);
    public static itemsBuried: Observable<number> = ko.observable(0);

    public static selectedTool: Observable<UndergroundToolType> = ko.observable(UndergroundToolType.Chisel);
    // Number of times to try and place an item in a new layer before giving up, just a failsafe
    private static maxPlacementAttempts = 1000;
    // Maximum underground layer depth
    private static maxLayerDepth = 5;

    static get mineState(): MineStateType {
        return this._mineState();
    }

    public static generateMine(mineType?: MineType) {
        const mineConfig: MineConfig = this.getMineConfig(mineType);

        this._mineState(MineStateType.Loading);
        ko.cleanNode(document.getElementById('mineBody'));

        this.rowCount = Underground.sizeY;
        this.columnCount = Underground.sizeX;
        this.grid = Array.from({ length: this.rowCount * this.columnCount }, () => {
            return {
                layerDepth: ko.observable(Math.min(Mine.maxLayerDepth, Math.max(1, Math.floor(Rand.float(2) + Rand.float(3)) + 1))),
            };
        });
        const numberOfItemsToGenerate = mineConfig.fixedItemCount ?? Rand.intBetween(
            Math.min(App.game.underground.getMinItems(), App.game.underground.getMaxItems()),
            App.game.underground.getMaxItems(),
        );
        const availableItems = mineConfig.getAvailableItems();

        for (let rewardIndex = 0; rewardIndex < numberOfItemsToGenerate; rewardIndex++) {
            const undergroundItem = Rand.fromWeightedArray(availableItems, availableItems.map(value => value.getWeight()));
            let placementAttemptSucceeded = false;
            let attemptCount = 0;

            while (!placementAttemptSucceeded && attemptCount < this.maxPlacementAttempts) {
                const rotations = Rand.floor(4);

                let space: Array<Array<number>> = undergroundItem.space;
                for (let rotation = 0; rotation < rotations; rotation++) {
                    space = this.rotateRewardSpace90Clockwise(space);
                }

                const x = Rand.floor(this.columnCount - space[0].length);
                const y = Rand.floor(this.rowCount - space.length);

                placementAttemptSucceeded = this.attemptRewardPlacement(rewardIndex, x, y, space, rotations, undergroundItem);
                ++attemptCount;
            }
        }

        this.updateObservables();

        this._mineState(MineStateType.Undiscovered);
        Underground.showMine();
        ko.applyBindings(null, document.getElementById('mineBody'));
    }

    public static discoverMine(): void {
        this._mineState(MineStateType.Active);
    }

    public static abandonMine(): void {
        this._mineState(MineStateType.Abandoned);
    }

    private static getMineConfig(mineType: MineType = undefined) {
        if (Rand.chance(25) && MegaStoneMineConfig.getAvailableItems().length > 0) {
            return MegaStoneMineConfig;
        }

        const otherMines: MineConfig[] = [
            DiamondMineConfig,
            GemPlateMineConfig,
            ShardMineConfig,
            FossilMineConfig,
            EvolutionItemMineConfig,
        ];

        return otherMines.find(config => config.type === mineType) || Rand.fromArray(otherMines);
    }

    private static attemptRewardPlacement(rewardIndex: number, x: number, y: number, space: Array<Array<number>>, rotations: number, undergroundItem: UndergroundItem): boolean {
        if (!this.canAddReward(x, y, space)) {
            return false;
        }

        const width = space[0].length;
        const height = space.length;

        for (let localXCoordinate = 0; localXCoordinate < width; localXCoordinate++) {
            for (let localYCoordinate = 0; localYCoordinate < height; localYCoordinate++) {
                if (space[localYCoordinate][localXCoordinate] !== 0) {
                    const mineXCoordinate = x + localXCoordinate;
                    const mineYCoordinate = y + localYCoordinate;

                    const index = mineYCoordinate * this.columnCount + mineXCoordinate;
                    this.grid[index].reward = {
                        index: rewardIndex,
                        undergroundItemID: undergroundItem.id,
                        width: width,
                        height: height,
                        localXCoordinate: localXCoordinate,
                        localYCoordinate: localYCoordinate,
                        rotations: rotations,
                        rewarded: ko.observable(false),
                    };
                }
            }
        }

        return true;
    }

    private static canAddReward(x: number, y: number, space: Array<Array<number>>): boolean {
        const width = space[0].length;
        const height = space.length;

        if (x + width > Mine.columnCount) return false;
        if (y + height > Mine.rowCount) return false;

        for (let localXCoordinate = 0; localXCoordinate < width; localXCoordinate++) {
            for (let localYCoordinate = 0; localYCoordinate < height; localYCoordinate++) {
                if (space[localYCoordinate][localXCoordinate] !== 0) {
                    const mineXCoordinate = x + localXCoordinate;
                    const mineYCoordinate = y + localYCoordinate;

                    const index = mineYCoordinate * Mine.columnCount + mineXCoordinate;
                    if (Mine.grid[index].reward) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    static rotateRewardSpace90Clockwise<T>(matrix: Array<Array<T>>): Array<Array<T>> {
        return matrix[0].map((_, colIndex) =>
            matrix.map(row => row[colIndex]).reverse(),
        );
    }

    public static click(row: number, column: number) {
        switch (Mine.selectedTool()) {
            case UndergroundToolType.Chisel:
                Mine.chisel(row, column);
                break;
            case UndergroundToolType.Hammer:
                Mine.hammer(row, column);
                break;
            case UndergroundToolType.Bomb:
                Mine.bomb();
                break;
            default:
                break;
        }
    }

    private static chisel(row: number, column: number) {
        if (!App.game.undergroundTools.canUseTool(UndergroundToolType.Chisel)) {
            return;
        }

        // Disable tool if the mine is not in the Active state
        if (this.mineState !== MineStateType.Active) return;

        if (this.attemptBreakTile(column, row, 2)) {
            App.game.undergroundTools.useTool(UndergroundToolType.Chisel);
        }
    }

    private static hammer(row: number, column: number) {
        if (!App.game.undergroundTools.canUseTool(UndergroundToolType.Hammer)) {
            return;
        }

        // Disable tool if the mine is not in the Active state
        if (this.mineState !== MineStateType.Active) return;

        if (row < 0 || column < 0) {
            return;
        }
        let hasMined = false;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                hasMined = this.attemptBreakTile(column + i, row + j, 1);
            }
        }
        if (hasMined) {
            App.game.undergroundTools.useTool(UndergroundToolType.Hammer);
        }
    }

    public static bomb() {
        if (!App.game.undergroundTools.canUseTool(UndergroundToolType.Bomb)) {
            return;
        }

        // Disable tool if the mine is not in the Active state
        if (this.mineState !== MineStateType.Active) return;

        let tiles = App.game.underground.getBombEfficiency();
        while (tiles-- > 0) {
            this.attemptBreakTile(Rand.intBetween(0, this.columnCount - 1), Rand.intBetween(0, this.rowCount - 1), 2);
        }

        App.game.undergroundTools.useTool(UndergroundToolType.Bomb);
    }

    public static attemptBreakTile(xCoordinate: number, yCoordinate: number, layers: number = 1) {
        if (xCoordinate < 0 || xCoordinate >= Mine.columnCount) return false;
        if (yCoordinate < 0 || yCoordinate >= Mine.rowCount) return false;

        const index = yCoordinate * this.columnCount + xCoordinate;
        const layerDepthAtCoordinate = this.grid[index].layerDepth();

        if (layerDepthAtCoordinate > 0) {
            const newLayerDepth = Math.max(layerDepthAtCoordinate - layers, 0);
            this.grid[index].layerDepth(newLayerDepth);

            Mine.checkItemsRevealed_v2(xCoordinate, yCoordinate);
            Mine.checkCompleted();

            return true;
        }
        return false;
    }

    private static checkItemsRevealed_v2(xCoordinate: number, yCoordinate: number) {
        const index = yCoordinate * this.columnCount + xCoordinate;
        const { layerDepth, reward } = this.grid[index];

        // No need to check if anything is revealed here since we haven't mined through all the layers yet
        // Also no need to check if we know there is no reward hidden here
        if (!reward || layerDepth() > 0)
            return;

        const { index: rewardIndex, undergroundItemID } = reward;

        this.attemptDigUpItem(rewardIndex, undergroundItemID);

        this.updateObservables();
    }

    private static updateObservables() {
        this.itemsBuried(new Set(this.grid.filter(tile => tile.reward).map(tile => tile.reward.index)).size);
        this.itemsFound(new Set(this.grid.filter(tile => tile.reward && tile.reward.rewarded()).map(tile => tile.reward.index)).size);
        this.itemsPartiallyFound(new Set(this.grid.filter(tile => tile.reward && tile.layerDepth() === 0).map(tile => tile.reward.index)).size);
    }

    private static attemptDigUpItem(rewardIndex: number, undergroundItemID: number): boolean {
        const undergroundItemTiles = this.grid.filter(tile => tile.reward?.index === rewardIndex);
        const canDigUp = undergroundItemTiles.every(tile => tile.layerDepth() === 0 && !tile.reward?.rewarded());

        if (!canDigUp) {
            return false;
        }

        undergroundItemTiles.forEach(tile => tile.reward.rewarded(true));

        const amount = this.calculateRewardAmountFromMining();
        const { itemName } = UndergroundItems.getById(undergroundItemID);

        App.game.oakItems.use(OakItemType.Treasure_Scanner);
        Underground.gainMineItem(undergroundItemID, amount);
        GameHelper.incrementObservable(App.game.statistics.undergroundItemsFound, amount);
        Underground.addUndergroundExp(25);

        Notifier.notify({
            message: `You found ${GameHelper.anOrA(itemName)} ${humanifyString(itemName)}.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3000,
        });

        for (let i = 1; i < amount; i++) {
            let message = `You've found an extra ${humanifyString(itemName)} in the Mine!`;
            if (i === 2) message = `Lucky! You've found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i === 3) message = `Jackpot! You've found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i > 3) message = `Jackpot ×${i - 2}! You've found an extra ${humanifyString(itemName)} in the Mine!`;

            Notifier.notify({
                title: 'Treasure Scanner',
                message: message,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
                timeout: 3000 + i * 2000,
            });
        }

        return true;
    }

    private static calculateRewardAmountFromMining(): number {
        if (!App.game.oakItems.isActive(OakItemType.Treasure_Scanner)) {
            return 1;
        }

        // Treasure scanner bonus is listed as integers, so we need to divide by 100
        const treasureScannerChance = App.game.oakItems.calculateBonus(OakItemType.Treasure_Scanner) / 100;

        let amount = 1;
        while (Rand.chance(treasureScannerChance)) {
            ++amount;
        }
        return amount;
    }

    public static checkCompleted(): boolean {
        if (this.mineState !== MineStateType.Active) return false;
        if (Mine.itemsFound() < Mine.itemsBuried()) return false;

        Underground.addUndergroundExp(100);
        GameHelper.incrementObservable(App.game.statistics.undergroundLayersMined);
        App.game.oakItems.use(OakItemType.Explosive_Charge);

        ko.cleanNode(document.getElementById('mineBody'));

        Notifier.notify({
            message: 'You dig deeper...',
            type: NotificationConstants.NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.underground_dig_deeper,
        });

        this._mineState(MineStateType.Completed);

        return true;
    }

    public static loadSavedMine(mine) {
        this.grid = mine.grid?.map(obj => ({
            ...obj,
            layerDepth: ko.observable<number>(obj.layerDepth),
            reward: obj.reward ? {
                ...obj.reward,
                rewarded: ko.observable<boolean>(obj.reward.rewarded),
            } : undefined,
        }));
        this._mineState(mine.mineState || MineStateType.None);
        this.rowCount = mine.rowCount;
        this.columnCount = mine.columnCount;

        this.updateObservables();

        Underground.showMine();
    }

    public static save(): Record<string, any> {
        const mineSave = {
            grid: this.grid?.map(tile => ({
                ...tile,
                layerDepth: tile.layerDepth(),
                reward: tile.reward ? {
                    ...tile.reward,
                    rewarded: tile.reward.rewarded(),
                } : undefined,
            })),
            mineState: this.mineState,
            rowCount: this.rowCount,
            columnCount: this.columnCount,
        };
        return mineSave;
    }
}

namespace Mine {
}
