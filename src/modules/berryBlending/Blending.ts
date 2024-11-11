import { Observable as KnockoutObservable } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import BerryType from '../enums/BerryType';
import FlavorType from '../enums/FlavorType';
import KeyItemType from '../enums/KeyItemType';
import GameHelper from '../GameHelper';
import BlendingMachine from './BlendingMachine';
import BlendingSlot from './BlendingSlot';
import FlavorAmount from './FlavorAmount';
import BlendingRecipe from './BlendingRecipe';
import { Currency } from '../GameConstants';
import Amount from '../wallet/Amount';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';
import BerryFlavor from '../interfaces/BerryFlavor';

export default class Blending implements Feature {
    name = 'Blending';
    saveKey = 'blending';

    defaults = {
        flavorBank: new Array(GameHelper.enumLength(FlavorType)).fill(0),
        machines: new Array(4).fill(null).map((value, index) => {
            return new BlendingMachine(index);
        }),
        berriesToBeBlended: 20,
    };

    flavorBank: Array<KnockoutObservable<number>>;
    machines: Array<BlendingMachine>;
    berriesToBeBlended: KnockoutObservable<number>;

    constructor() {
        this.flavorBank = this.defaults.flavorBank.map((v) => ko.observable(v));
        this.machines = this.defaults.machines;
        this.berriesToBeBlended = ko.observable(this.defaults.berriesToBeBlended);
    }

    initialize(): void {
    }

    update(delta: number): void {
        this.machines.forEach(machine => {
            machine.update(delta);
            return;
        });
    }

    animate(): void {
        this.machines.forEach(machine => {
            machine.animate();
            return;
        });
    }

    hasEnoughBerries(berry: BerryType, autoCheck: boolean = false): boolean {
        let total = this.berriesToBeBlended();
        total -= autoCheck ? 1 : 0;
        if (berry != BerryType.None) {
            this.machines.forEach(m => m.blendSlots.forEach(s => {
                if (s.berry === berry) {
                    total += 1;
                }
            }));
            return App.game.farming.berryList[berry]() > total;
        } else {
            return true;
        }
    }

    otherMachineHasBerry(berry: BerryType): boolean {
        let total = 0;
        this.machines.forEach(m => m.blendSlots.filter(s => s.berry === berry).forEach(() => {
            total += 1;
        }));
        return total > 1 ? true : false;
    }

    insertBerry(slotIndex: number, berry: BerryType, machineIndex: number, enableNotifier: boolean = true) {
        const slot = this.machines[machineIndex].blendSlots[slotIndex];

        if (this.hasEnoughBerries(berry) || slot.berry === berry) {
            if (slot.berry != berry) {
                slot.insertBerry(berry);
            } else {
                slot.insertBerry(BerryType.None);
            }
        } else {
            if (enableNotifier) {
                Notifier.notify({
                    message: `You can\'t put more berries than your stopping amount!`,
                    type: NotificationOption.warning,
                    title: 'Berry Blender',
                    image: `assets/images/items/berry/${BerryType[berry]}.png`,
                });
            }
        }
    }

    insertBerryAll(berry: BerryType) {
        this.machines.forEach(m => m.blendSlots.filter(s => s.isEmpty() && s.isUnlocked).forEach(s => this.insertBerry(s.index, berry, m.index, false)));
    }

    removeBerryAll() {
        this.machines.forEach(m => m.blendSlots.forEach(s => {
            s.berry = BerryType.None;
        }));
    }

    public rpm(index: number) {
        let smoothness = 0;
        this.machines[index].blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
            smoothness += (App.game.farming.berryData[slot.berry].smoothness * 10);
        });

        const totalBerries = this.machines[index].blendSlots.filter(slot => !slot.isEmpty()).length;
        const baseSmooth = Math.round(smoothness / totalBerries);
        const bonusSmooth = this.getRpmBonus(index);

        const totalSmooth = baseSmooth + bonusSmooth;

        return totalBerries ? totalSmooth : 0;
    }

    getSlotBerriesTotal(index: number) {
        const filledSlots = this.machines[index].blendSlots.filter(s => !s.isEmpty());

        let total = 0;
        filledSlots.forEach(() => total += 1);

        return total;
    }

    getSlotBerriesUnique(index: number) {
        const filledSlots = this.machines[index].blendSlots.filter(s => !s.isEmpty());

        let berriesInSlots: BerryType[] = [];
        filledSlots.forEach(slot => berriesInSlots.push(slot.berry));

        return [...new Set(berriesInSlots)];
    }

    getSlotBerriesUniqueNumber(index: number) {
        const uniqueBerries = this.getSlotBerriesUnique(index);

        return uniqueBerries.length;
    }

    getSlotBerriesFlavorSpread(index: number) {
        const filledSlots = this.machines[index].blendSlots.filter(s => !s.isEmpty());

        let sharedFlavors: BerryFlavor[] = [];
        GameHelper.enumNumbers(FlavorType).forEach(flavorType => sharedFlavors.push({type: flavorType, value: 0}));

        filledSlots.forEach(slot => {
            App.game.farming.berryData[slot.berry].flavors.forEach(f => {
                if (f.value > 0) {
                    sharedFlavors[f.type].value += 1;
                }
            });
        });

        const flavorSpread = sharedFlavors.filter(f => f.value > 0).length;

        return flavorSpread;
    }

    public getRpmBonus(index: number) {
        const totalBerryBonus = this.getSlotBerriesTotal(index) / 4;
        const flavorSpreadBonus = 50 / this.getSlotBerriesFlavorSpread(index);
        const uniqueBerryBonus = (this.getSlotBerriesUniqueNumber(index) - 1) / 3;

        return Math.round(totalBerryBonus * flavorSpreadBonus * uniqueBerryBonus * 10);
    }

    getRPM(index: number): string {
        return this.rpm(index) ? (this.rpm(index) / 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '0.00';
    }

    getTimer(index: number): string {
        return (this.machines[index].timer * 10 / 6).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }

    public addFlavorAmount(flavorAmount: FlavorAmount) {
        if (Number.isNaN(flavorAmount.amount) || flavorAmount.amount <= 0) {
            return;
        }

        GameHelper.incrementObservable(this.flavorBank[flavorAmount.flavor], flavorAmount.amount);

        return flavorAmount;
    }

    public incomingFlavors(index: number) {
        let spicy = 0;
        let dry = 0;
        let sweet = 0;
        let bitter = 0;
        let sour = 0;
        this.machines[index].blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
            spicy += App.game.farming.berryData[slot.berry].flavors[0].value;
            dry += App.game.farming.berryData[slot.berry].flavors[1].value;
            sweet += App.game.farming.berryData[slot.berry].flavors[2].value;
            bitter += App.game.farming.berryData[slot.berry].flavors[3].value;
            sour += App.game.farming.berryData[slot.berry].flavors[4].value;
        });
        return [spicy, dry, sweet, bitter, sour];
    }

    public gainFlavor(amount: number, flavor: FlavorType): FlavorAmount {
        return this.addFlavorAmount(new FlavorAmount(amount, flavor));
    }

    public gainFlavorByBerry(berry: BerryType) {
        const b = App.game.farming.berryData[berry];
        return b.flavors.forEach((flavor) => this.gainFlavor(flavor.value, flavor.type));
    }

    public hasAmount(flavorAmount: FlavorAmount) {
        return this.flavorBank[flavorAmount.flavor]() >= flavorAmount.amount;
    }

    public loseAmount(flavorAmount: FlavorAmount): boolean {
        if (Number.isNaN(flavorAmount.amount) || flavorAmount.amount <= 0) {
            return;
        }

        if (!this.hasAmount(flavorAmount)) {
            return false;
        }

        GameHelper.incrementObservable(this.flavorBank[flavorAmount.flavor], -flavorAmount.amount);
        return true;
    }

    public loseFlavor(recipe: BlendingRecipe, amount: number) {
        return recipe.flavorPrice.forEach((flavor) => this.loseAmount(new FlavorAmount(flavor.value * amount, flavor.type)));
    }

    public buyPokeblock(block: BlendingRecipe, amount: number) {
        let blockFlavors = [block.flavorPrice[0], block.flavorPrice[1], block.flavorPrice[2], block.flavorPrice[3], block.flavorPrice[4]];

        if (blockFlavors.filter(f => f.value > 0).every(f => this.loseAmount(new FlavorAmount(f.value * amount, f.type)))) {
            GameHelper.incrementObservable(player.itemList[block.item], amount);
            return;
        }
    }

    machineToBuy() {
        return this.machines.find(m => m.blendSlots.some(s => !s.isUnlocked));
    }

    slotToBuy() {
        return this.machineToBuy().blendSlots.find(s => !s.isUnlocked);
    }

    public getBlendingSlotCost(): number {
        const machine = this.machineToBuy().index + 1;
        const slot = this.slotToBuy().index + 1;
        const newMachineTax = slot === 1 ? 500 : 0;
        return 50 * slot * machine + (newMachineTax * machine);
    }

    public nextBlendingSlotCost(): Amount {
        return new Amount(this.getBlendingSlotCost(), Currency.contestToken);
    }

    public buyBlendingSlot(): void {
        const machine = this.machineToBuy();
        if (machine) {
            const slot = this.slotToBuy();
            const cost: Amount = this.nextBlendingSlotCost();
            if (App.game.wallet.loseAmount(cost)) {
                slot._isUnlocked(true);
            }
        }
    }

    public getBlendingSlotCostDisplay(): string {
        const slot = this.slotToBuy();
        const cost = this.nextBlendingSlotCost().amount.toLocaleString('en-US');
        const slotOrMachine = slot.index === 0 ? 'Machine' : 'Slot';
        return `New ${slotOrMachine}: <img src="./assets/images/currency/contestToken.svg" height="24px"/> ${cost}`;
    }

    public canAccess(): boolean {
        return new DevelopmentRequirement().isCompleted() && App.game.keyItems.hasKeyItem(KeyItemType.Wailmer_pail); // TODO: Pokeblock kit
    }

    toJSON(): Record<string, any> {
        return {
            flavorBank: this.flavorBank.map(ko.unwrap),
            machines: this.machines.map(m => m.toJSON()),
            berriesToBeBlended: this.berriesToBeBlended(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedMachines = json.machines;
        if (savedMachines == null) {
            this.machines = this.defaults.machines;
        } else {
            (savedMachines as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const slot: BlendingMachine = new BlendingMachine(index);
                slot.fromJSON(value);
                this.machines[index] = slot;
            });
        }

        this.flavorBank = this.defaults.flavorBank.map((v) => ko.observable(v));
        if (json.flavorBank !== null) {
            const flavorBankJson = json.flavorBank;
            flavorBankJson.forEach((value, index) => {
                this.flavorBank[index](value || 0);
            });
        }

        const berriesToBeBlended = json.berriesToBeBlended;
        if (berriesToBeBlended == null) {
            this.berriesToBeBlended = ko.observable(this.defaults.berriesToBeBlended);
        } else {
            this.berriesToBeBlended(berriesToBeBlended);
        }
    }
}
