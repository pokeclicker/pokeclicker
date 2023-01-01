class DreamOrbLoot {
    constructor(public item: BagItem, public weight: number) {
    }
}

class DreamOrb {
    public amount = ko.observable(0);
    constructor(public color: string, public requirement: Requirement, public items: DreamOrbLoot[]) {
    }
}

class DreamOrbController implements Saveable {
    public selectedOrb: KnockoutObservable<DreamOrb>;
    public opening: KnockoutObservable<boolean>;
    public item: KnockoutObservable<DreamOrbLoot>;
    public amountSelected = ko.observable(1);
    public amountOpened = ko.observable(0);
    public itemsReceived = ko.observableArray();

    constructor() {
        this.selectedOrb = ko.observable(this.orbs[0]);
        this.opening = ko.observable(false);
        this.item = ko.observable(undefined);
    }

    public orbs = [
        new DreamOrb('Pink', undefined, [
            new DreamOrbLoot({type: ItemType.item, id: 'Shuckle'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Swablu'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Riolu'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Munna'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Tornadus (Therian)'}, 0.075),
            new DreamOrbLoot({type: ItemType.underground, id: 'Sun Stone'}, 0.15),
            new DreamOrbLoot({type: ItemType.underground, id: 'Water Stone'}, 0.15),
            new DreamOrbLoot({type: ItemType.underground, id: 'Revive'}, 0.125),

        ]),
        new DreamOrb('Green', new ObtainedPokemonRequirement('Tornadus (Therian)'), [
            new DreamOrbLoot({type: ItemType.item, id: 'Drifloon'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Bronzor'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Sigilyph'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Thundurus (Therian)'}, 0.075),
            new DreamOrbLoot({type: ItemType.underground, id: 'Red Shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.underground, id: 'Blue Shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.underground, id: 'Yellow Shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.underground, id: 'Green Shard'}, 0.125),
        ]),
        new DreamOrb('Orange', new ObtainedPokemonRequirement('Thundurus (Therian)'), [

            new DreamOrbLoot({type: ItemType.item, id: 'Staryu'}, 0.133),
            new DreamOrbLoot({type: ItemType.item, id: 'Ralts'}, 0.133),
            new DreamOrbLoot({type: ItemType.item, id: 'Rotom'}, 0.134),
            new DreamOrbLoot({type: ItemType.item, id: 'Landorus (Therian)'}, 0.075),
            new DreamOrbLoot({type: ItemType.underground, id: 'Fire Stone'}, 0.25),
            new DreamOrbLoot({type: ItemType.item, id: 'Protein'}, 0.091),
            new DreamOrbLoot({type: ItemType.item, id: 'Calcium'}, 0.092),
            new DreamOrbLoot({type: ItemType.item, id: 'Carbos'}, 0.092),
        ]),
        //new DreamOrb('Blue', new ObtainedPokemonRequirement('Landorus (Therian)'), [
        //new DreamOrbLoot({type: ItemType.item, id: 'Igglybuff'}, 0.2),
        //new DreamOrbLoot({type: ItemType.item, id: 'Smoochum'}, 0.2),
        //new DreamOrbLoot({type: ItemType.item, id: 'Enamorus (Therian)'}, 0.075),
        //new DreamOrbLoot({type: ItemType.underground, id: 'Moon Stone'}, 0.1),
        //new DreamOrbLoot({type: ItemType.underground, id: 'Leaf Stone'}, 0.1),
        //new DreamOrbLoot({type: ItemType.underground, id: 'Thunder Stone'}, 0.1),
        //new DreamOrbLoot({type: ItemType.underground, id: 'Heart Scale'}, 0.125),
        //new DreamOrbLoot({type: ItemType.underground, id: 'Max Revive'}, 0.1),
    ]

    public open() {
        if (this.opening()) {
            return;
        }
        const selectedOrb = this.selectedOrb();
        if (!selectedOrb.amount()) {
            Notifier.notify({
                message: 'No orbs left.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }
        const amountToOpen = Math.min(this.amountSelected(), selectedOrb.amount());
        this.opening(true);
        this.item(undefined);
        Notifier.notify({
            sound: NotificationConstants.NotificationSound.General.dream_orb,
        });
        setTimeout(() => {
            const itemWeights = selectedOrb.items.map((i) => i.weight);
            const items = {};
            for (let i = 0; i < amountToOpen; i++) {
                const orbLoot = Rand.fromWeightedArray(selectedOrb.items, itemWeights);
                items[orbLoot.item.id] ?
                    items[orbLoot.item.id].amount++ :
                    items[orbLoot.item.id] = { item: orbLoot.item, amount: 1 };
                if (i + 1 >= amountToOpen) {
                    this.item(orbLoot);
                }
            }
            GameHelper.incrementObservable(selectedOrb.amount, amountToOpen * -1);
            Object.keys(items).forEach((key) => {
                BagHandler.gainItem(items[key].item, items[key].amount);
            });
            this.opening(false);
            this.amountOpened(amountToOpen);
            this.itemsReceived(Object.keys(items).map((key) => ({ name: key, ...items[key] })));
            if (amountToOpen > 1) {
                $('#dreamOrbsOpenedModal').modal('show');
            }
        }, 1800);
    }

    saveKey = 'dream-orbs';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            orbs: this.orbs.map((o) => ({ amount: o.amount(), color: o.color })),
        };
    }
    fromJSON(json: Record<string, any>): void {
        json?.orbs?.forEach((o) => this.orbs.find((o2) => o2.color == o.color)?.amount(o.amount));
    }
}

class DreamOrbTownContent extends TownContent {
    constructor() {
        super([
            new ObtainedPokemonRequirement('Tornadus'),
            new ObtainedPokemonRequirement('Thundurus'),
            new ObtainedPokemonRequirement('Landorus'),
        ]);
    }
    public cssClass(): string {
        return 'btn btn-info';
    }
    public text(): string {
        return 'Open Dream Orbs';
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        $('#dreamOrbsModal').modal('show');
    }
}
