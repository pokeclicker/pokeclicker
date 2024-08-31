/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Blending implements Feature {
    name = 'Blending';
    saveKey = 'blending';

    defaults = {
        blendSlots: new Array(4).fill(null).map((index) => {
            return new BlendingSlot(index === 0, BerryType.None, 0);
        }),
        flavorBank: new Array(GameHelper.enumLength(FlavorType)).fill(0),
        machines: new Array(4).fill(null).map((index) => {
            return new BlendingMachine(index === 0, 0);
        })
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

    insertBerry(slotIndex: number, berry: BerryType, machineIndex: number) {
        const slot = this.machines[machineIndex].blendSlots[slotIndex];
        if (slot.berry != berry) {
            slot.insertBerry(berry);
        } else {
            slot.insertBerry(BerryType.None);
        }
    }

    public rpm(slots: BlendingSlot[]) {
        let smoothness = 0;
        slots.filter(slot => !slot.isEmpty()).forEach(slot =>
            smoothness += (App.game.farming.berryData[slot.berry].smoothness * 10)
        );
        return slots.filter(slot => !slot.isEmpty()).length ? Math.round(smoothness / slots.filter(slot => !slot.isEmpty()).length) : 0;
    }

    getRPM(index: number): string {
        return this.rpm(this.machines[index].blendSlots) ? (this.rpm(this.machines[index].blendSlots)/100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '0.00';
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

    public gainFlavor(berry: BerryType) {
        const b = App.game.farming.berryData[berry];
        return b.flavors.forEach((flavor) => this.addFlavorAmount(new FlavorAmount(flavor.value, flavor.type)));
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
