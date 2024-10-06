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
import BlendingRecipes from './BlendingRecipes';

export default class Blending implements Feature {
    name = 'Blending';
    saveKey = 'blending';

    defaults = {
        blendSlots: new Array(4).fill(null).map((index) => {
            return new BlendingSlot(index === 0, BerryType.None, 0);
        }),
        flavorBank: new Array(GameHelper.enumLength(FlavorType)).fill(0),
        machines: new Array(4).fill(null).map((index) => {
            return new BlendingMachine(index === 0, 0);
        }),
    };

    blendSlots: Array<BlendingSlot>;
    flavorBank: Array<KnockoutObservable<number>>;
    machines: Array<BlendingMachine>;

    constructor() {
        this.blendSlots = this.defaults.blendSlots;
        this.flavorBank = this.defaults.flavorBank.map((v) => ko.observable(v));
        this.machines = this.defaults.machines;
    }

    initialize(): void {
        BlendingRecipes.blendingRecipeList;
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

    hasEnoughBerries(berry: BerryType, initial: number = 0): boolean {
        let total = initial;
        if (berry != BerryType.None) {
            this.machines.forEach(m => m.blendSlots.forEach(s => {
                if (s.berry === berry) {
                    total += 1;
                }
            }));
            return App.game.farming.berryList[berry]() > total;
        } else {
            return false;
        }
    }

    insertBerry(slotIndex: number, berry: BerryType, machineIndex: number) {
        const slot = this.machines[machineIndex].blendSlots[slotIndex];
        if (slot.berry != berry && this.hasEnoughBerries(berry, 1)) {
            slot.insertBerry(berry);
        } else {
            slot.insertBerry(BerryType.None);
        }
    }

    public rpm(slots: BlendingSlot[]) {
        let smoothness = 0;
        slots.filter(slot => !slot.isEmpty()).forEach(slot => {
            smoothness += (App.game.farming.berryData[slot.berry].smoothness * 10);
        });
        return slots.filter(slot => !slot.isEmpty()).length ? Math.round(smoothness / slots.filter(slot => !slot.isEmpty()).length) : 0;
    }

    getRPM(index: number): string {
        return this.rpm(this.machines[index].blendSlots) ? (this.rpm(this.machines[index].blendSlots) / 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '0.00';
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

    public gainFlavor(berry: BerryType) {
        const b = App.game.farming.berryData[berry];
        return b.flavors.forEach((flavor) => this.addFlavorAmount(new FlavorAmount(flavor.value, flavor.type)));
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

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Wailmer_pail); // TODO: Pokeblock kit
    }

    toJSON(): Record<string, any> {
        return {
            blendSlots: this.blendSlots.map(slot => slot.toJSON()),
            flavorBank: this.flavorBank.map(ko.unwrap),
            machines: this.machines.map(m => m.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedSlots = json.blendSlots;
        if (savedSlots == null) {
            this.blendSlots = this.defaults.blendSlots;
        } else {
            (savedSlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const slot: BlendingSlot = new BlendingSlot(false, BerryType.None, 0);
                slot.fromJSON(value);
                this.blendSlots[index] = slot;
            });
        }
        const savedJlots = json.machines;
        if (savedJlots == null) {
            this.machines = this.defaults.machines;
        } else {
            (savedJlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const slot: BlendingMachine = new BlendingMachine(false, 0);
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
    }
}
