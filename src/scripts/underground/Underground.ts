class Underground {
    public static saveKey = 'underground';

    public static itemSelected;
    public static energyTick: KnockoutObservable<number> = ko.observable(60);
    public static counter = 0;

    private static _energy: KnockoutObservable<number> = ko.observable(0);
    public static upgradeList: Array<Upgrade> = [];

    public static getMaxEnergy() {
        return Underground.BASE_ENERGY_MAX + this.getUpgrade(Underground.Upgrades.Energy_Max).calculateBonus();
    }

    public static getMaxItems() {
        return Underground.BASE_ITEMS_MAX + this.getUpgrade(Underground.Upgrades.Items_Max).calculateBonus();
    }

    public static getEnergyGain() {
        return Underground.BASE_ENERGY_GAIN + this.getUpgrade(Underground.Upgrades.Energy_Gain).calculateBonus();
    }

    public static getEnergyRegenTime() {
        return Underground.BASE_ENERGY_REGEN_TIME - this.getUpgrade(Underground.Upgrades.Energy_Regen_Time).calculateBonus();
    }

    public static getDailyDealsMax() {
        return Underground.BASE_DAILY_DEALS_MAX + this.getUpgrade(Underground.Upgrades.Daily_Deals_Max).calculateBonus();
    }


    static getUpgrade(upgrade: Underground.Upgrades) {
        for (let i = 0; i < this.upgradeList.length; i++) {
            if (this.upgradeList[i].name == upgrade) {
                return this.upgradeList[i];
            }
        }
    }

    public static showMine() {
        let html = '';
        for (let i = 0; i < Mine.grid.length; i++) {
            html += "<div class='row'>";
            for (let j = 0; j < Mine.grid[0].length; j++) {
                html += Underground.mineSquare(Mine.grid[i][j](), i, j);
            }
            html += '</div>';
        }
        $('#mineBody').html(html);
    }

    private static mineSquare(amount: number, i: number, j: number): string {
        if (Mine.rewardGrid[i][j] != 0 && Mine.grid[i][j]() === 0) {
            Mine.rewardGrid[i][j].revealed = 1;
            return `<div data-bind='css: Underground.calculateCssClass(${i},${j})()' data-i='${i}' data-j='${j}'><div class="mineReward size-${Mine.rewardGrid[i][j].sizeX}-${Mine.rewardGrid[i][j].sizeY} pos-${Mine.rewardGrid[i][j].x}-${Mine.rewardGrid[i][j].y}" style="background-image: url('assets/images/underground/${Mine.rewardGrid[i][j].value}.png');"></div></div>`;
        } else {
            return `<div data-bind='css: Underground.calculateCssClass(${i},${j})()' data-i='${i}' data-j='${j}'></div>`;
        }
    }

    public static calculateCssClass(i: number, j: number): KnockoutComputed<string> {
        // disposed via the disposeWhen function passed as an option
        return ko.computed(function () {
            return `col-sm-1 rock${Math.max(Mine.grid[i][j](), 0)} mineSquare ${Mine.Tool[Mine.toolSelected()]}Selected`;
        }, this, {
            disposeWhen: function () {
                if (Mine.grid[i][j]() == 0) {
                    if (Mine.rewardGrid[i][j] != 0 && Mine.rewardGrid[i][j].revealed != 1) {
                        Mine.rewardGrid[i][j].revealed = 1;
                        $(`div[data-i=${i}][data-j=${j}]`).html(`<div class="mineReward size-${Mine.rewardGrid[i][j].sizeX}-${Mine.rewardGrid[i][j].sizeY} pos-${Mine.rewardGrid[i][j].x}-${Mine.rewardGrid[i][j].y}" style="background-image: url('assets/images/underground/${Mine.rewardGrid[i][j].value}.png');"></div>`);
                        Mine.checkItemsRevealed();
                    }
                }
                return false;
            },
        });
    }

    private static rewardCssClass: KnockoutComputed<string> = ko.pureComputed(function () {
        return `col-sm-1 mineReward mineSquare ${Mine.Tool[Mine.toolSelected()]}Selected`;
    });

    public static gainMineItem(id: number, num = 1) {
        const index = player.mineInventoryIndex(id);
        const item = Underground.getMineItemById(id);

        if (item.isStone()) {
            const evostone: EvolutionStone = ItemList[item.valueType];
            evostone.gain(num);
            return;
        }

        if (index == -1) {

            const tempItem = {
                name: item.name,
                amount: ko.observable(num),
                id: id,
                value: item.value,
                valueType: item.valueType,
            };
            player.mineInventory.push(tempItem);
        } else {
            const amt = player.mineInventory[index].amount();
            player.mineInventory[index].amount(amt + num);
        }
    }

    public static getMineItemById(id: number): UndergroundItem {
        for (const item of UndergroundItem.list) {
            if (item.id == id) {
                return item;
            }
        }
    }

    public static gainEnergy() {
        if (this.energy < this.getMaxEnergy()) {
            const oakMultiplier = App.game.oakItems.calculateBonus(OakItems.OakItem.Cell_Battery);
            this.energy = Math.min(this.getMaxEnergy(), this.energy + (oakMultiplier * this.getEnergyGain()));
            if (this.energy === this.getMaxEnergy()) {
                Notifier.notify({ message: 'Your mining energy has reached maximum capacity!', type: GameConstants.NotificationOption.success, timeout: 1e4, sound: GameConstants.NotificationSound.underground_energy_full, setting: GameConstants.NotificationSetting.underground_energy_full });
            }
        }
    }

    public static gainEnergyThroughItem(item: GameConstants.EnergyRestoreSize) {
        // Restore a percentage of maximum energy
        const effect: number = GameConstants.EnergyRestoreEffect[GameConstants.EnergyRestoreSize[item]];
        const gain = Math.min(this.getMaxEnergy() - this.energy, effect * this.getMaxEnergy());
        this.energy = this.energy + gain;
        Notifier.notify({ message: `You restored ${gain} mining energy!`, type: GameConstants.NotificationOption.success });
    }

    public static sellMineItem(id: number) {
        for (let i = 0; i < player.mineInventory.length; i++) {
            const item = player.mineInventory[i];
            if (item.id == id) {
                if (item.amount() > 0) {
                    const success = Underground.gainProfit(item);
                    if (success) {
                        const amt = item.amount();
                        player.mineInventory[i].amount(amt - 1);
                    }
                    return;
                }
            }
        }
    }

    private static gainProfit(item: UndergroundItem): boolean {
        let success = true;
        switch (item.valueType) {
            case 'Diamond':
                App.game.wallet.gainDiamonds(item.value);
                break;
            case 'Mine Egg':
                if (!App.game.breeding.hasFreeEggSlot()) {
                    return false;
                }
                success = App.game.breeding.gainEgg(App.game.breeding.createFossilEgg(item.name));
                break;
            default:
                const type = item.valueType.charAt(0).toUpperCase() + item.valueType.slice(1); //Capitalizes string
                const typeNum = PokemonType[type];
                App.game.shards.gainShards(GameConstants.PLATE_VALUE, typeNum);
        }
        return success;
    }

    public static openUndergroundModal() {
        if (this.canAccess()) {
            $('#mineModal').modal('show');
        } else {
            Notifier.notify({ message: 'You need the Explorer Kit to access this location.<br/><i>Check out the shop at Cinnabar Island</i>', type: GameConstants.NotificationOption.warning });
        }
    }

    private static canAccess() {
        return MapHelper.accessToRoute(11, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Explorer_kit);
    }

    public static calculateItemEffect(item: GameConstants.EnergyRestoreSize) {
        const effect: number = GameConstants.EnergyRestoreEffect[GameConstants.EnergyRestoreSize[item]];
        return effect * this.getMaxEnergy();
    }

    public static load(saveObject: Record<string, any>): void {
        if (!saveObject) {
            console.warn('Underground not loaded.');
            return;
        }

        const upgrades = saveObject['upgrades'];
        for (const item in Underground.Upgrades) {
            if (isNaN(Number(item))) {
                Underground.getUpgrade((<any>Underground.Upgrades)[item]).level = upgrades[item] || 0;
            }
        }
        this.energy = saveObject['energy'] || 0;
    }

    public static save(): Record<string, any> {
        const undergroundSave = {};
        const upgradesSave = {};
        for (const item in Underground.Upgrades) {
            if (isNaN(Number(item))) {
                upgradesSave[item] = Underground.getUpgrade((<any>Underground.Upgrades)[item]).level;
            }
        }
        undergroundSave['upgrades'] = upgradesSave;
        undergroundSave['energy'] = this.energy;
        return undergroundSave;
    }

    // Knockout getters/setters
    static get energy(): number {
        return this._energy();
    }

    static set energy(value) {
        this._energy(value);
    }

}

$(document).ready(function () {
    $('body').on('click', '.mineSquare', function () {
        Mine.click(parseInt(this.dataset.i), parseInt(this.dataset.j));
    });
});

namespace Underground {
    export enum Upgrades {
        'Energy_Max',
        'Items_Max',
        'Energy_Gain',
        'Energy_Regen_Time',
        'Daily_Deals_Max'
    }

    export const BASE_ENERGY_MAX = 50;
    export const BASE_ITEMS_MAX = 3;
    export const BASE_ENERGY_GAIN = 3;
    export const BASE_ENERGY_REGEN_TIME = 60;
    export const BASE_DAILY_DEALS_MAX = 3;

    export const HAMMER_ENERGY = 3;
    export const CHISEL_ENERGY = 1;
}
