import type { Observable } from 'knockout';
import { humanifyString } from '../GameConstants';
import GameHelper from '../GameHelper';
import OakItemType from '../enums/OakItemType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import { Underground } from './Underground';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import UndergroundToolType from './tools/UndergroundToolType';

export enum MineStateType {
    None,
    Loading,
    Undiscovered,
    Active,
    Completed,
    Abandoned,
}

export class Mine {
    private static _mineState: Observable<MineStateType> = ko.observable(MineStateType.None);

    public static grid: Array<Array<Observable<number>>>;
    public static rewardGrid: Array<Array<any>>;
    public static itemsFound: Observable<number> = ko.observable(0);
    public static itemsPartiallyFound: Observable<number> = ko.observable(0);
    public static itemsBuried: Observable<number> = ko.observable(0);
    public static rewardNumbers: Array<number>;

    public static selectedTool: Observable<UndergroundToolType> = ko.observable(UndergroundToolType.Chisel);
    // Number of times to try and place an item in a new layer before giving up, just a failsafe
    private static maxPlacementAttempts = 1000;
    // Maximum underground layer depth
    private static maxLayerDepth = 5;

    static get mineState(): MineStateType {
        return this._mineState();
    }

    public static discoverMine(): void {
        this._mineState(MineStateType.Active);
    }

    public static abandoneMine(): void {
        this._mineState(MineStateType.Abandoned);
    }

    public static loadMine() {
        this._mineState(MineStateType.Loading);

        ko.cleanNode(document.getElementById('mineBody'));

        const tmpGrid = [];
        const tmpRewardGrid = [];
        Mine.rewardNumbers = [];
        Mine.itemsBuried(0);
        for (let i = 0; i < App.game.underground.getSizeY(); i++) {
            const row = [];
            const rewardRow = [];
            for (let j = 0; j < Underground.sizeX; j++) {
                row.push(ko.observable(Math.min(Mine.maxLayerDepth, Math.max(1, Math.floor(Rand.float(2) + Rand.float(3)) + 1))));
                rewardRow.push(0);
            }
            tmpGrid.push(row);
            tmpRewardGrid.push(rewardRow);
        }
        Mine.grid = tmpGrid;
        Mine.rewardGrid = tmpRewardGrid;

        // Generate items for new layer
        // Number of underground items must be >= min
        // If max > min, randomly select the number of items for the layer
        // Otherwise, the number of items must be equivalent to min
        let numItems = App.game.underground.getMinItems();
        if (App.game.underground.getMinItems() < App.game.underground.getMaxItems()) {
            numItems = Rand.intBetween(App.game.underground.getMinItems(), App.game.underground.getMaxItems());
        }

        // Get our available items
        let items = UndergroundItems.getUnlockedItems();
        items = Rand.shuffleWeightedArray(items, items.map((i) => i.getWeight())).reverse();
        // Add numItems items to the layer
        for (let i = 0; i < numItems && items.length; i++) {
            let res = false;
            let x = 0;
            let y = 0;
            const item = items.pop();
            let attempts = 0;
            // Keep checking random spots until a legal spot is found
            // If too many failed attempts are made, break out as a failsafe
            while (!res && attempts++ < this.maxPlacementAttempts) {
                this.rotateReward(item);
                x = Mine.getRandomCoord(Underground.sizeX, item.space[0].length);
                y = Mine.getRandomCoord(App.game.underground.getSizeY(), item.space.length);
                res = Mine.canAddReward(x, y, item);
            }
            // If item can be added, add it
            // Else, if we haven't hit the minimum number of items yet, try again with a new random item
            // Otherwise, just skip to next item
            if (res) {
                Mine.addReward(x, y, item);
            } else if (i < App.game.underground.getMinItems()) {
                i--;
            }
        }

        Mine._mineState(MineStateType.Undiscovered);
        Mine.itemsFound(0);
        Mine.itemsPartiallyFound(0);

        Underground.showMine();

        //Check if Explosive_Charge is equipped.
        if (App.game.oakItems.isActive(OakItemType.Explosive_Charge)) {
            const tiles = App.game.oakItems.calculateBonus(OakItemType.Explosive_Charge);
            for (let i = 1; i < tiles; i++) {
                const x = Rand.intBetween(0, App.game.underground.getSizeY() - 1);
                const y = Rand.intBetween(0, Underground.sizeX - 1);
                this.breakTile(x, y, 1);
            }
        }

        ko.applyBindings(null, document.getElementById('mineBody'));
    }

    private static getRandomCoord(max: number, size: number): number {
        return Rand.floor(max - size + 1);
    }

    private static canAddReward(x: number, y: number, reward: UndergroundItem): boolean {
        if (Mine.alreadyHasRewardId(reward.id)) {
            return false;
        }
        if (y + reward.space.length > App.game.underground.getSizeY() || x + reward.space[0].length > Underground.sizeX) {
            return false;
        }
        for (let i = 0; i < reward.space.length; i++) {
            for (let j = 0; j < reward.space[i].length; j++) {
                if (reward.space[i][j] !== 0) {
                    if (Mine.rewardGrid[i + y][j + x] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private static alreadyHasRewardId(id: number): boolean {
        for (const row of Mine.rewardGrid) {
            for (const item of row) {
                if (item.value === id) {
                    return true;
                }
            }
        }
        return false;
    }

    private static addReward(x: number, y: number, reward: UndergroundItem) {
        for (let i = 0; i < reward.space.length; i++) {
            for (let j = 0; j < reward.space[i].length; j++) {
                if (reward.space[i][j].value != 0) {
                    Mine.rewardGrid[i + y][j + x] = {
                        ...reward.space[i][j],
                        revealed: 0,
                    };
                }
            }
        }
        GameHelper.incrementObservable(Mine.itemsBuried);
        Mine.rewardNumbers.push(reward.id);
    }

    private static rotateReward(reward): UndergroundItem {
        let rotations = Rand.floor(4);

        while (rotations-- > 0) {
            reward.space = reward.space[0].map((val, index) => reward.space.map(row => row[index]).reverse());
        }

        const currentRotation = this.calculateRotation(reward);

        reward.space = reward.space.map(r => r.map(v => {
            v.rotations = currentRotation;
            return v;
        }));

        return reward;
    }

    private static calculateRotation(reward): number {
        let indexX = 0;

        const indexY = reward.space.findIndex(y => {
            indexX = y.findIndex(x => !x.x && !x.y);
            return indexX >= 0;
        });

        return (indexX ? 1 : 0) + (indexY ? 2 : 0);
    }

    private static rewardSummary() {
        return Mine.rewardNumbers.reduce((res, id) => {
            const reward = UndergroundItems.list.find(x => x.id == id);

            switch (reward.valueType) {
                case UndergroundItemValueType.Diamond:
                    res.totalValue += reward.value;
                    break;
                case UndergroundItemValueType.Fossil:
                    res.fossils++;
                    break;
                case UndergroundItemValueType.FossilPiece:
                    res.fossilpieces++;
                    break;
                case UndergroundItemValueType.Shard:
                    res.shards++;
                    break;
                case UndergroundItemValueType.EvolutionItem:
                    res.evoItems++;
                    break;
                case UndergroundItemValueType.Gem:
                    res.plates++;
                    break;
                case UndergroundItemValueType.MegaStone:
                    res.megaStones++;
                default:
            }
            return res;
        }, { fossils: 0, fossilpieces: 0, plates: 0, evoItems: 0, totalValue: 0, shards: 0, megaStones: 0 });
    }

    public static click(i: number, j: number) {
        switch (Mine.selectedTool()) {
            case UndergroundToolType.Chisel:
                Mine.chisel(i, j);
                break;
            case UndergroundToolType.Hammer:
                Mine.hammer(i, j);
                break;
            case UndergroundToolType.Bomb:
                Mine.bomb();
                break;
            default:
                break;
        }
    }

    private static chisel(x: number, y: number) {
        if (!App.game.undergroundTools.canUseTool(UndergroundToolType.Chisel)) {
            return;
        }

        // Disable tool if the mine is not in the Active state
        if (this.mineState !== MineStateType.Active) return;

        if (Mine.grid[x][y]() > 0) {
            this.breakTile(x, y, 2);
            App.game.undergroundTools.useTool(UndergroundToolType.Chisel);
        }
    }

    private static hammer(x: number, y: number) {
        if (!App.game.undergroundTools.canUseTool(UndergroundToolType.Hammer)) {
            return;
        }

        // Disable tool if the mine is not in the Active state
        if (this.mineState !== MineStateType.Active) return;

        if (x < 0 || y < 0) {
            return;
        }
        let hasMined = false;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (Mine.grid[Mine.normalizeY(x + i)][Mine.normalizeX(y + j)]() > 0) {
                    hasMined = true;
                }
                this.breakTile(x + i, y + j, 1);
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
            const x = Rand.intBetween(0, this.getHeight() - 1);
            const y = Rand.intBetween(0, Underground.sizeX - 1);
            this.breakTile(x, y, 2);
        }

        App.game.undergroundTools.useTool(UndergroundToolType.Bomb);
    }

    private static breakTile(_x: number, _y: number, layers = 1) {
        const x = Mine.normalizeY(_x);
        const y = Mine.normalizeX(_y);
        const newlayer = Math.max(0, Mine.grid[x][y]() - layers);

        Mine.grid[x][y](newlayer);

        const reward = Mine.rewardGrid[x][y];
        if (newlayer == 0 && reward != 0 && reward.revealed != 1) {
            reward.revealed = 1;
            const image = UndergroundItems.getById(reward.value).undergroundImage;
            $(`div[data-i=${x}][data-j=${y}]`).html(`<div class="mineReward size-${reward.sizeX}-${reward.sizeY} pos-${reward.x}-${reward.y} rotations-${reward.rotations}" style="background-image: url('${image}');"></div>`);
            Mine.checkItemsRevealed();
            Mine.calculatePartiallyRevealedItems();
        }
    }

    private static normalizeX(x: number): number {
        return Math.min(Underground.sizeX - 1, Math.max(0, x));
    }

    private static normalizeY(y: number): number {
        return Math.min(this.getHeight() - 1, Math.max(0, y));
    }

    public static getHeight(): number {
        return this.rewardGrid ? this.rewardGrid.length : 0;
    }

    public static checkItemsRevealed() {
        for (let i = 0; i < Mine.rewardNumbers.length; i++) {
            if (Mine.checkItemRevealed(Mine.rewardNumbers[i])) {
                let amount = 1;
                const itemName = UndergroundItems.getById(Mine.rewardNumbers[i]).name;
                const type = NotificationConstants.NotificationOption.success;
                const setting = NotificationConstants.NotificationSetting.Underground.underground_item_found;
                Notifier.notify({ message: `You found ${GameHelper.anOrA(itemName)} ${humanifyString(itemName)}.`, type, setting });

                if (App.game.oakItems.isActive(OakItemType.Treasure_Scanner)) {
                    const giveDouble = App.game.oakItems.calculateBonus(OakItemType.Treasure_Scanner) / 100;
                    const title = 'Treasure Scanner';
                    let message = `You found an extra ${humanifyString(itemName)} in the Mine!`;
                    while (Rand.chance(giveDouble)) {
                        amount++;
                        if (amount > 2) {
                            const jackpotMultiplier = amount > 4 ? ` ×${amount - 3}` : ''; // Start at ×2
                            message = `${amount == 3 ? 'Lucky' : 'Jackpot'}${jackpotMultiplier}! You found another ${humanifyString(itemName)}!`;
                        }
                        const timeout = Math.min(amount, 4) * 2000 + Math.max(amount - 4, 0) * 100;
                        Notifier.notify({ message, type, title, setting, timeout });
                    }
                }

                App.game.oakItems.use(OakItemType.Treasure_Scanner);
                Underground.gainMineItem(Mine.rewardNumbers[i], amount);
                GameHelper.incrementObservable(Mine.itemsFound);
                GameHelper.incrementObservable(App.game.statistics.undergroundItemsFound, amount);
                Mine.rewardNumbers.splice(i, 1);
                i--;
                Mine.checkCompleted();
            }
        }
    }

    public static calculatePartiallyRevealedItems() {
        const amountRevealed = Mine.rewardNumbers
            .map(value => Mine.checkItemPartiallyRevealed(value) ? 1 : 0)
            .reduce((a, b) => a + b, 0);

        Mine.itemsPartiallyFound(amountRevealed);
    }

    public static checkItemRevealed(id: number) {
        for (let i = 0; i < Underground.sizeX; i++) {
            for (let j = 0; j < this.getHeight(); j++) {
                if (Mine.rewardGrid[j][i] != 0) {
                    if (Mine.rewardGrid[j][i].value == id) {
                        if (Mine.rewardGrid[j][i].revealed === 0) {
                            return false;
                        }
                    }
                }
            }
        }
        App.game.oakItems.use(OakItemType.Cell_Battery);
        return true;
    }

    public static checkItemPartiallyRevealed(id: number) {
        for (let i = 0; i < Underground.sizeX; i++) {
            for (let j = 0; j < this.getHeight(); j++) {
                if (Mine.rewardGrid[j][i] != 0) {
                    if (Mine.rewardGrid[j][i].value == id) {
                        if (Mine.grid[j][i]() == 0)
                            return true;
                    }
                }
            }
        }
        return false;
    }

    public static checkCompleted(): boolean {
        if (this.mineState !== MineStateType.Active) return false;
        if (Mine.itemsFound() < Mine.itemsBuried()) return false;

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
        this.grid = mine.grid?.map(row => row.map(val => ko.observable(val)));
        this.rewardGrid = mine.rewardGrid;
        this.itemsFound(mine.itemsFound);
        this.itemsBuried(mine.itemsBuried);
        this.rewardNumbers = mine.rewardNumbers;
        this._mineState(mine.mineState || MineStateType.None);

        this.calculatePartiallyRevealedItems();

        Underground.showMine();
    }

    public static save(): Record<string, any> {
        const mineSave = {
            grid: this.grid?.map(row => row.map(val => val())),
            rewardGrid: this.rewardGrid,
            itemsFound: this.itemsFound(),
            itemsBuried: this.itemsBuried(),
            rewardNumbers: this.rewardNumbers,
            mineState: this.mineState,
        };
        return mineSave;
    }
}

namespace Mine {
}
