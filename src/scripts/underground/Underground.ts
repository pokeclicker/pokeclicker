/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/underground/UndergroundItem.d.ts" />
/// <reference path="../../declarations/underground/UndergroundItems.d.ts" />
///<reference path="../underground/UndergroundUpgrade.ts"/>
class Underground implements Feature {
    name = 'Underground';
    saveKey = 'underground';

    upgradeList: Array<Upgrade>;
    defaults: Record<string, any>;
    private _energy: KnockoutObservable<number> = ko.observable(Underground.BASE_ENERGY_MAX);

    public static itemSelected;
    public static energyTick: KnockoutObservable<number> = ko.observable(60);
    public static counter = 0;

    public static sortDirection = -1;
    public static lastPropSort = 'none';

    constructor() {
        this.upgradeList = [];
    }

    initialize() {
        this.upgradeList = [
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Max, 'Max Energy', 10,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 500, 50), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 100, 10)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Items_Max, 'Max items', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(200, 800, 200), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 4, 1)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Items_Min, 'Min Items', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(500, 5000, 1500), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 4, 1)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Gain, 'Energy restored', 17,
                AmountFactory.createArray(
                    GameHelper.createArray(100, 1700, 100), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 17, 1)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Energy_Regen_Time, 'Energy regen time', 20,
                AmountFactory.createArray(
                    GameHelper.createArray(20, 400, 20), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 20, 1),
                false
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Daily_Deals_Max, 'Daily deals', 2,
                AmountFactory.createArray(
                    GameHelper.createArray(150, 300, 150), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 2, 1)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Bomb_Efficiency, 'Bomb Efficiency', 5,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 250, 50), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 10, 2)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Survey_Cost, 'Survey Cost', 5,
                AmountFactory.createArray(
                    GameHelper.createArray(50, 250, 50), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 5, 1),
                false
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.Survey_Efficiency, 'Survey Efficiency', 4,
                AmountFactory.createArray(
                    GameHelper.createArray(100, 400, 100), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 4, 1)
            ),
            new UndergroundUpgrade(
                UndergroundUpgrade.Upgrades.NewYLayer, 'Larger underground, +1 Max Item', 1,
                AmountFactory.createArray(
                    GameHelper.createArray(3000, 3000, 3000), GameConstants.Currency.diamond),
                GameHelper.createArray(0, 1, 1)
            ),
        ];
    }

    update(delta: number) {
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
        return Underground.BASE_ITEMS_MIN + this.getUpgrade(UndergroundUpgrade.Upgrades.Items_Min).calculateBonus();
    }

    getUpgrade(upgrade: UndergroundUpgrade.Upgrades) {
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

    private static rewardCssClass: KnockoutComputed<string> = ko.pureComputed(() => {
        return `col-sm-1 mineReward mineSquare ${Mine.Tool[Mine.toolSelected()]}Selected`;
    });

    public static gainMineItem(id: number, num = 1) {
        const index = player.mineInventoryIndex(id);
        const item = UndergroundItems.getById(id);

        if (item.valueType == UndergroundItemValueType.EvolutionItem) {
            const evostone: EvolutionStone = (ItemList[GameConstants.StoneType[item.type]] as EvolutionStone);
            evostone.gain(num);
            return;
        }

        if (item.valueType == UndergroundItemValueType.MegaStone) {
            App.game.party.getPokemonByName((item as UndergroundMegaStoneItem).pokemon)?.giveMegastone();
            return;
        }

        if (index == -1) {
            const tempItem = {
                name: item.name,
                amount: ko.observable(num),
                id: id,
                value: item.value,
                valueType: item.valueType,
                sellLocked: ko.observable(false),
            };
            player.mineInventory.push(tempItem);
        } else {
            const amt = player.mineInventory()[index].amount();
            player.mineInventory()[index].amount(amt + num);
            this.sortMineItems(this.lastPropSort, false);
        }
    }

    public static getDiamondNetWorth(): number {
        let diamondNetWorth = 0;
        player.mineInventory().forEach(mineItem => {
            if (mineItem.valueType == UndergroundItemValueType.Diamond) {
                diamondNetWorth += mineItem.value * mineItem.amount();
            }
        });

        return diamondNetWorth + App.game.wallet.currencies[GameConstants.Currency.diamond]();
    }

    public static getCumulativeValues(): Record<string, { cumulativeValue: number, imgSrc: string }> {
        const cumulativeValues = {};
        player.mineInventory().forEach(item => {
            if (
                // Cannot sell Shards or Fossils
                item.valueType !== UndergroundItemValueType.Fossil
                && item.valueType !== UndergroundItemValueType.Shard
                && item.valueType != UndergroundItemValueType.FossilPiece
                && item.amount() > 0
                && !item.sellLocked()
            ) {
                let valueType;
                switch (item.valueType) {
                    case UndergroundItemValueType.Gem:
                        valueType = `${PokemonType[UndergroundItems.getById(item.id).type]} Gems`;
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
                        cumulativeValueOfType.imgSrc = UndergroundItems.getById(item.id).image;
                    }
                    cumulativeValues[valueType] = cumulativeValueOfType;
                }

                cumulativeValueOfType.cumulativeValue += item.value * item.amount();
            }
        });

        return cumulativeValues;
    }

    public static netWorthTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        let nMineItems = 0;
        let nFossils = 0;
        let nPlates = 0;
        let nShards = 0;
        player.mineInventory().forEach(mineItem => {
            if (mineItem.valueType == UndergroundItemValueType.Diamond) {
                nMineItems += mineItem.amount();
            } else if (mineItem.valueType == UndergroundItemValueType.Fossil) {
                nFossils += mineItem.amount();
            } else if (mineItem.valueType == UndergroundItemValueType.Gem) {
                nPlates += mineItem.amount();
            } else if (mineItem.valueType == UndergroundItemValueType.Shard) {
                nShards += mineItem.amount();
            }
        });

        return `<u>Owned:</u><br>Mine items: ${nMineItems.toLocaleString('en-US')}<br>Fossils: ${nFossils.toLocaleString('en-US')}<br>Plates: ${nPlates.toLocaleString('en-US')}<br>Shards: ${nShards.toLocaleString('en-US')}`;
    });

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

    gainEnergyThroughItem(item: GameConstants.EnergyRestoreSize) {
        // Restore a percentage of maximum energy
        const effect: number = GameConstants.EnergyRestoreEffect[GameConstants.EnergyRestoreSize[item]];
        const gain = Math.min(this.getMaxEnergy() - this.energy, effect * this.getMaxEnergy());
        this.energy = this.energy + gain;
        Notifier.notify({
            message: `You restored ${gain} mining energy!`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Underground.underground_energy_restore,
        });
    }

    public static sortMineItems(prop: string, flip = true) {
        const prevEl = document.querySelector(`[data-undergroundsort=${Underground.lastPropSort}]`);
        const nextEl = prop == this.lastPropSort ? prevEl : document.querySelector(`[data-undergroundsort=${prop}]`);

        // If new sort by, update old sort by
        if (prop != this.lastPropSort) {
            // Remove sort direction from previous element
            if (prevEl) {
                prevEl.textContent = this.lastPropSort;
            }
            this.lastPropSort = prop;
        } else if (flip) {
            // Flip sort direction
            this.sortDirection *= -1;
        }

        // Update element text to dispaly sort direction
        if (nextEl) {
            nextEl.textContent = `${prop} ${this.sortDirection > 0 ? '▴' : '▾'}`;
        }

        player.mineInventory.sort((a, b) => {
            let result = 0;
            switch (prop) {
                case 'Amount':
                    result = (a.amount() - b.amount()) * this.sortDirection;
                    break;
                case 'Value':
                    result = (a.value - b.value) * this.sortDirection;
                    break;
                case 'Item':
                    result = a.name > b.name ? 1 * this.sortDirection : -1 * this.sortDirection;
                    break;
            }
            if (result == 0) {
                return a.id - b.id;
            }
            return result;
        });
    }

    public static sellMineItem(id: number, amount = 1) {
        for (let i = 0; i < player.mineInventory().length; i++) {
            const item = player.mineInventory()[i];
            if (item.id == id) {
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
                const curAmt = item.amount();
                if (curAmt > 0) {
                    const sellAmt = Math.min(curAmt, amount);
                    const success = Underground.gainProfit(item, sellAmt);
                    if (success) {
                        player.mineInventory()[i].amount(curAmt - sellAmt);
                        this.sortMineItems(this.lastPropSort, false);
                    }
                    return;
                }
            }
        }
    }

    public static sellAllMineItems() {
        for (let i = 0; i < player.mineInventory().length; i++) {
            const item = player.mineInventory()[i];
            if (
                !item.sellLocked()
                && item.valueType != UndergroundItemValueType.Fossil
                && item.valueType != UndergroundItemValueType.Shard
                && item.valueType != UndergroundItemValueType.FossilPiece
            ) {
                Underground.sellMineItem(item.id, Infinity);
            }
        }
        $('#mineSellAllTreasuresModal').modal('hide');
    }

    public static setSellLockOfMineItem(id: number, sellLocked: boolean) {
        for (let i = 0; i < player.mineInventory().length; i++) {
            const item = player.mineInventory()[i];
            if (item.id == id) {
                player.mineInventory()[i].sellLocked(sellLocked);
                return;
            }
        }
    }

    private static gainProfit(item: UndergroundItem, amount: number): boolean {
        let success = true;
        const uItem = UndergroundItems.getById(item.id);
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
                const type = uItem.type;
                App.game.gems.gainGems(GameConstants.PLATE_VALUE * amount, type);
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

    calculateItemEffect(item: GameConstants.EnergyRestoreSize) {
        const effect: number = GameConstants.EnergyRestoreEffect[GameConstants.EnergyRestoreSize[item]];
        return effect * this.getMaxEnergy();
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
        return undergroundSave;
    }

    // Knockout getters/setters
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
    export const BASE_ENERGY_MAX = 50;
    export const BASE_ITEMS_MAX = 3;
    export const BASE_ITEMS_MIN = 1;
    export const BASE_ENERGY_GAIN = 3;
    export const BASE_ENERGY_REGEN_TIME = 60;
    export const BASE_DAILY_DEALS_MAX = 3;
    export const BASE_BOMB_EFFICIENCY = 10;
    export const BASE_SURVEY_CHARGE_EFFICIENCY = 1;

    export const sizeX = 25;
    export const sizeY = 12;

    export const CHISEL_ENERGY = 1;
    export const HAMMER_ENERGY = 3;
    export const BOMB_ENERGY = 10;
    export const SURVEY_ENERGY = 15;
}
