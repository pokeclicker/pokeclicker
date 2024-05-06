import type { Observable, Computed } from 'knockout';
import '../koExtenders';
import { Feature } from '../DataStore/common/Feature';
import { Currency, EnergyRestoreSize, EnergyRestoreEffect, PLATE_VALUE } from '../GameConstants';
import GameHelper from '../GameHelper';
import KeyItemType from '../enums/KeyItemType';
import OakItemType from '../enums/OakItemType';
import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { ItemList } from '../items/ItemList';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Upgrade from '../upgrades/Upgrade';
import AmountFactory from '../wallet/AmountFactory';
import { Mine } from './Mine';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import UndergroundUpgrade, { Upgrades } from './UndergroundUpgrade';

export class Underground implements Feature {
    name = 'Underground';
    saveKey = 'underground';

    upgradeList: Array<Upgrade>;
    defaults: Record<string, any>;
    private _energy: Observable<number> = ko.observable(Underground.BASE_ENERGY_MAX);

    public static itemSelected;
    public static energyTick: Observable<number> = ko.observable(60);
    public static counter = 0;

    public static sortDirection = -1;
    public static lastPropSort = 'none';
    public static sortOption: Observable<string> = ko.observable('None');
    public static sortFactor: Observable<number> = ko.observable(-1);

    public static BASE_ENERGY_MAX = 50;
    public static BASE_ITEMS_MAX = 3;
    public static BASE_ITEMS_MIN = 1;
    public static BASE_ENERGY_GAIN = 3;
    public static BASE_ENERGY_REGEN_TIME = 60;
    public static BASE_DAILY_DEALS_MAX = 3;
    public static BASE_BOMB_EFFICIENCY = 10;
    public static BASE_SURVEY_CHARGE_EFFICIENCY = 1;

    public static sizeX = 25;
    public static sizeY = 12;

    public static CHISEL_ENERGY = 1;
    public static HAMMER_ENERGY = 3;
    public static BOMB_ENERGY = 10;
    public static SURVEY_ENERGY = 15;

    // Sort UndergroundItems.list whenever the sort method or quantities change
    public static sortedMineInventory: Computed<Array<UndergroundItem>> = ko.computed(function () {
        const sortOption = Underground.sortOption();
        const direction = Underground.sortFactor();
        return UndergroundItems.list.sort((a: UndergroundItem, b: UndergroundItem) => {
            let result = 0;
            switch (sortOption) {
                case 'Amount':
                    result = (player.itemList[a.itemName]() - player.itemList[b.itemName]()) * direction;
                    break;
                case 'Value':
                    result = (a.value - b.value) * direction;
                    break;
                case 'Item':
                    result = a.name > b.name ? direction : -direction;
                    break;
            }
            if (result == 0) {
                return a.id - b.id;
            }
            return result;
        });
    });

    public static netWorthTooltip: Computed<string> = ko.pureComputed(() => {
        let nMineItems = 0;
        let nFossils = 0;
        let nPlates = 0;
        let nShards = 0;
        UndergroundItems.list.forEach(mineItem => {
            if (mineItem.valueType == UndergroundItemValueType.Diamond) {
                nMineItems += player.itemList[mineItem.itemName]();
            } else if (mineItem.valueType == UndergroundItemValueType.Fossil) {
                nFossils += player.itemList[mineItem.itemName]();
            } else if (mineItem.valueType == UndergroundItemValueType.Gem) {
                nPlates += player.itemList[mineItem.itemName]();
            } else if (mineItem.valueType == UndergroundItemValueType.Shard) {
                nShards += player.itemList[mineItem.itemName]();
            }
        });

        return `<u>Owned:</u><br>Mine items: ${nMineItems.toLocaleString('en-US')}<br>Fossils: ${nFossils.toLocaleString('en-US')}<br>Plates: ${nPlates.toLocaleString('en-US')}<br>Shards: ${nShards.toLocaleString('en-US')}`;
    });

    public tradeAmount: Observable<number> = ko.observable(1).extend({ numeric: 0 });

    constructor() {
        this.upgradeList = [];
        this.tradeAmount.subscribe((value) => {
            if (value < 0) {
                this.tradeAmount(0);
            }
        });
    }

    initialize() {
        this.upgradeList = [
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Max, 'Max Energy', 10,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 500, 50), Currency.diamond),
                GameHelper.createArray(0, 100, 10),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Items_Max, 'Max Items', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(200, 800, 200), Currency.diamond),
                GameHelper.createArray(0, 4, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Items_Min, 'Min Items', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(500, 5000, 1500), Currency.diamond),
                GameHelper.createArray(0, 4, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Gain, 'Energy Restored', 17,
                AmountFactory.createArray(
                    GameHelper.createArray(100, 1700, 100), Currency.diamond),
                GameHelper.createArray(0, 17, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Regen_Time, 'Energy Regen Time', 20,
                AmountFactory.createArray(
                    GameHelper.createArray(20, 400, 20), Currency.diamond),
                GameHelper.createArray(0, 20, 1),
                false,
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Daily_Deals_Max, 'Daily Deals', 2,
                AmountFactory.createArray(
                    GameHelper.createArray(150, 300, 150), Currency.diamond),
                GameHelper.createArray(0, 2, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Bomb_Efficiency, 'Bomb Efficiency', 5,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 250, 50), Currency.diamond),
                GameHelper.createArray(0, 10, 2),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Survey_Cost, 'Survey Cost', 5,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 250, 50), Currency.diamond),
                GameHelper.createArray(0, 5, 1),
                false,
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Survey_Efficiency, 'Survey Efficiency', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(100, 400, 100), Currency.diamond),
                GameHelper.createArray(0, 4, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.NewYLayer, 'Larger Underground, +1 Item', 1,
                AmountFactory.createArray(
                    GameHelper.createArray(3000, 3000, 3000), Currency.diamond),
                GameHelper.createArray(0, 1, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Reduced_Shards, 'Reduced Shards', 1,
                AmountFactory.createArray(
                    GameHelper.createArray(1000, 1000, 1000), Currency.diamond),
                GameHelper.createArray(0, 1, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Reduced_Plates, 'Reduced Plates', 1,
                AmountFactory.createArray(
                    GameHelper.createArray(1000, 1000, 1000), Currency.diamond),
                GameHelper.createArray(0, 1, 1),
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Reduced_Evolution_Items, 'Reduced Evolution Items', 1,
                AmountFactory.createArray(
                    GameHelper.createArray(1000, 1000, 1000), Currency.diamond),
                GameHelper.createArray(0, 1, 1),
            ),
        ];
    }

    update() {
    }

    getMaxEnergy() {
        return Underground.BASE_ENERGY_MAX + this.getUpgrade(UndergroundUpgrade.Upgrades.Energy_Max).calculateBonus();
    }

    getMaxItems() {
        return Underground.BASE_ITEMS_MAX + this.getUpgrade(UndergroundUpgrade.Upgrades.Items_Max).calculateBonus() + this.getUpgrade(UndergroundUpgrade.Upgrades.NewYLayer).calculateBonus();
    }

    getEnergyGain() {
        return Math.round(Underground.BASE_ENERGY_GAIN + this.getUpgrade(UndergroundUpgrade.Upgrades.Energy_Gain).calculateBonus());
    }

    getEnergyRegenTime() {
        return Math.round(Underground.BASE_ENERGY_REGEN_TIME - this.getUpgrade(UndergroundUpgrade.Upgrades.Energy_Regen_Time).calculateBonus());
    }

    getDailyDealsMax() {
        return Underground.BASE_DAILY_DEALS_MAX + this.getUpgrade(UndergroundUpgrade.Upgrades.Daily_Deals_Max).calculateBonus();
    }

    getBombEfficiency() {
        return Underground.BASE_BOMB_EFFICIENCY + this.getUpgrade(UndergroundUpgrade.Upgrades.Bomb_Efficiency).calculateBonus();
    }

    getSurvey_Cost() {
        return Underground.SURVEY_ENERGY - this.getUpgrade(UndergroundUpgrade.Upgrades.Survey_Cost).calculateBonus();
    }

    getSurvey_Efficiency() {
        return Underground.BASE_SURVEY_CHARGE_EFFICIENCY + this.getUpgrade(UndergroundUpgrade.Upgrades.Survey_Efficiency).calculateBonus();
    }

    getSizeY() {
        return Underground.sizeY + this.getUpgrade(UndergroundUpgrade.Upgrades.NewYLayer).calculateBonus();
    }

    getMinItems() {
        return Underground.BASE_ITEMS_MIN + this.getUpgrade(UndergroundUpgrade.Upgrades.Items_Min).calculateBonus() + this.getUpgrade(UndergroundUpgrade.Upgrades.NewYLayer).calculateBonus();
    }

    getUpgrade(upgrade: Upgrades) {
        for (let i = 0; i < this.upgradeList.length; i++) {
            if (this.upgradeList[i].name == upgrade) {
                return this.upgradeList[i];
            }
        }
    }

    public static showMine() {
        let html = '';
        for (let i = 0; i < Mine.grid.length; i++) {
            html += '<div class="row">';
            for (let j = 0; j < Mine.grid[0].length; j++) {
                html += Underground.mineSquare(Mine.grid[i][j](), i, j);
            }
            html += '</div>';
        }
        $('#mineBody').html(html);
    }

    private static mineSquare(amount: number, i: number, j: number): string {
        if (Mine.rewardGrid[i][j] != 0 && Mine.grid[i][j]() == 0) {
            Mine.rewardGrid[i][j].revealed = 1;
            const image = UndergroundItems.getById(Mine.rewardGrid[i][j].value).undergroundImage;
            return `<div data-bind='css: Underground.calculateCssClass(${i},${j})' data-i='${i}' data-j='${j}'><div class="mineReward size-${Mine.rewardGrid[i][j].sizeX}-${Mine.rewardGrid[i][j].sizeY} pos-${Mine.rewardGrid[i][j].x}-${Mine.rewardGrid[i][j].y} rotations-${Mine.rewardGrid[i][j].rotations}" style="background-image: url('${image}');"></div></div>`;
        } else {
            return `<div data-bind='css: Underground.calculateCssClass(${i},${j})' data-i='${i}' data-j='${j}'></div>`;
        }
    }

    public static calculateCssClass(i: number, j: number): string {
        return `col-sm-1 rock${Math.max(Mine.grid[i][j](), 0)} mineSquare ${Mine.Tool[Mine.toolSelected()]}Selected`;
    }

    public static gainMineItem(id: number, num = 1) {
        const item = UndergroundItems.getById(id);
        ItemList[item.itemName].gain(num);
    }

    public static getDiamondNetWorth(): number {
        let diamondNetWorth = 0;
        UndergroundItems.list.forEach(mineItem => {
            if (mineItem.valueType == UndergroundItemValueType.Diamond) {
                diamondNetWorth += mineItem.value * player.itemList[mineItem.itemName]();
            }
        });

        return diamondNetWorth + App.game.wallet.currencies[Currency.diamond]();
    }

    public static getCumulativeValues(): Record<string, { cumulativeValue: number, imgSrc: string }> {
        const cumulativeValues = {};
        UndergroundItems.list.forEach(item => {
            if (item.hasSellValue() && player.itemList[item.itemName]() > 0 && !item.sellLocked()) {
                let valueType;
                switch (item.valueType) {
                    case UndergroundItemValueType.Gem:
                        valueType = `${PokemonType[item.type]} Gems`;
                        break;
                    case UndergroundItemValueType.Diamond:
                    default:
                        valueType = `${UndergroundItemValueType[item.valueType]}s`;
                }

                let cumulativeValueOfType = cumulativeValues[valueType];
                if (!cumulativeValueOfType) {
                    cumulativeValueOfType = { cumulativeValue: 0 };
                    // Set image source
                    if (item.valueType == UndergroundItemValueType.Diamond) {
                        cumulativeValueOfType.imgSrc = 'assets/images/underground/diamond.svg';
                    } else {
                        cumulativeValueOfType.imgSrc = item.image;
                    }
                    cumulativeValues[valueType] = cumulativeValueOfType;
                }

                cumulativeValueOfType.cumulativeValue += item.value * player.itemList[item.itemName]();
            }
        });

        return cumulativeValues;
    }

    gainEnergy() {
        if (this.energy < this.getMaxEnergy()) {
            const oakMultiplier = App.game.oakItems.calculateBonus(OakItemType.Cell_Battery);
            this.energy = Math.min(this.getMaxEnergy(), this.energy + (oakMultiplier * this.getEnergyGain()));
            if (this.energy === this.getMaxEnergy()) {
                Notifier.notify({
                    message: 'Your mining energy has reached maximum capacity!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                    sound: NotificationConstants.NotificationSound.General.underground_energy_full,
                    setting: NotificationConstants.NotificationSetting.Underground.underground_energy_full,
                });
            }
        }
    }

    gainEnergyThroughItem(item: EnergyRestoreSize) {
        // Restore a percentage of maximum energy
        const effect: number = EnergyRestoreEffect[EnergyRestoreSize[item]];
        const gain = Math.min(this.getMaxEnergy() - this.energy, effect * this.getMaxEnergy());
        this.energy = this.energy + gain;
        Notifier.notify({
            message: `You restored ${gain} mining energy!`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Underground.underground_energy_restore,
        });
    }

    public static updateTreasureSorting(newSortOption: string) {
        if (Underground.sortOption() === newSortOption) {
            Underground.sortFactor(Underground.sortFactor() * -1);
        } else {
            Underground.sortOption(newSortOption);
        }
    }

    public static playerHasMineItems(): boolean {
        return UndergroundItems.list.some(i => player.itemList[i.itemName]());
    }

    public static sellMineItem(item: UndergroundItem, amount = 1) {
        if (item.sellLocked()) {
            Notifier.notify({
                message: 'Item is locked for selling, you first have to unlock it.',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }
        if (item.valueType == UndergroundItemValueType.Fossil) {
            amount = 1;
        }
        const curAmt = player.itemList[item.itemName]();
        if (curAmt > 0) {
            const sellAmt = Math.min(curAmt, amount);
            const success = Underground.gainProfit(item, sellAmt);
            if (success) {
                player.loseItem(item.itemName, sellAmt);
            }
            return;
        }
    }

    public static sellAllMineItems() {
        UndergroundItems.list.forEach((item) => {
            if (!item.sellLocked() && item.hasSellValue()) {
                Underground.sellMineItem(item, Infinity);
            }
        });
        $('#mineSellAllTreasuresModal').modal('hide');
    }

    private static gainProfit(item: UndergroundItem, amount: number): boolean {
        let success = true;
        switch (item.valueType) {
            case UndergroundItemValueType.Diamond:
                App.game.wallet.gainDiamonds(item.value * amount);
                break;
            case UndergroundItemValueType.Fossil:
                if (!App.game.breeding.hasFreeEggSlot()) {
                    return false;
                }
                success = App.game.breeding.gainEgg(App.game.breeding.createFossilEgg(item.name));
                break;
            case UndergroundItemValueType.Gem:
                const type = item.type;
                App.game.gems.gainGems(PLATE_VALUE * amount, type);
                break;
            // Nothing else can be sold
            default:
                return false;
        }
        return success;
    }

    openUndergroundModal() {
        if (this.canAccess()) {
            $('#mineModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need the Explorer Kit to access this location.\n<i>Check out the shop at Cinnabar Island.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    openUndergroundSellAllModal() {
        if (this.canAccess()) {
            if (Object.keys(Underground.getCumulativeValues()).length == 0) {
                Notifier.notify({
                    message: 'You have no items selected for selling.',
                    type: NotificationConstants.NotificationOption.warning,
                });
                return;
            }
            $('#mineSellAllTreasuresModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need the Explorer Kit to access this location.\n<i>Check out the shop at Cinnabar Island.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public canAccess() {
        return MapHelper.accessToRoute(11, 0) && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }

    calculateItemEffect(item: EnergyRestoreSize) {
        const effect: number = EnergyRestoreEffect[EnergyRestoreSize[item]];
        return effect * this.getMaxEnergy();
    }

    public increaseTradeAmount(amount: number) {
        this.tradeAmount(this.tradeAmount() + amount);
    }

    public multiplyTradeAmount(amount: number) {
        this.tradeAmount(this.tradeAmount() * amount);
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            console.warn('Underground not loaded.');
            return;
        }

        const upgrades = json.upgrades;
        for (const item in UndergroundUpgrade.Upgrades) {
            if (isNaN(Number(item))) {
                this.getUpgrade((<any>UndergroundUpgrade.Upgrades)[item]).level = upgrades[item] || 0;
            }
        }
        this.energy = json.energy || 0;

        const mine = json.mine;
        if (mine) {
            Mine.loadSavedMine(mine);
        } else {
            Mine.loadMine();
        }
        UndergroundItems.list.forEach(it => it.sellLocked(json.sellLocks[it.itemName] || false));
    }

    toJSON(): Record<string, any> {
        const undergroundSave: Record<string, any> = {};
        const upgradesSave = {};
        for (const item in UndergroundUpgrade.Upgrades) {
            if (isNaN(Number(item))) {
                upgradesSave[item] = this.getUpgrade((<any>UndergroundUpgrade.Upgrades)[item]).level;
            }
        }
        undergroundSave.upgrades = upgradesSave;
        undergroundSave.energy = this.energy;
        undergroundSave.mine = Mine.save();
        undergroundSave.sellLocks = UndergroundItems.list.reduce((sellLocks, item) => {
            if (item.sellLocked()) {
                sellLocks[item.itemName] = true;
            }
            return sellLocks;
        }, {});
        return undergroundSave;
    }

    //  getters/setters
    get energy(): number {
        return this._energy();
    }

    set energy(value) {
        this._energy(value);
    }

}

$(document).ready(() => {
    $('body').on('click', '.mineSquare', function () {
        Mine.click(parseInt(this.dataset.i, 10), parseInt(this.dataset.j, 10));
    });
});

namespace Underground {
}
