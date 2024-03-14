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
            new DreamOrbLoot({type: ItemType.item, id: 'Sun_stone'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Water_stone'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Revive'}, 0.125),

        ]),
        new DreamOrb('Green', new ObtainedPokemonRequirement('Tornadus (Therian)'), [
            new DreamOrbLoot({type: ItemType.item, id: 'Drifloon'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Bronzor'}, 0.15),
            new DreamOrbLoot({type: ItemType.item, id: 'Sigilyph'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Thundurus (Therian)'}, 0.075),
            new DreamOrbLoot({type: ItemType.item, id: 'Red_shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Blue_shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Yellow_shard'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Green_shard'}, 0.125),
        ]),
        new DreamOrb('Orange', new ObtainedPokemonRequirement('Thundurus (Therian)'), [
            new DreamOrbLoot({type: ItemType.item, id: 'Staryu'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Ralts'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Rotom'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Landorus (Therian)'}, 0.075),
            new DreamOrbLoot({type: ItemType.item, id: 'Fire_stone'}, 0.2),
            new DreamOrbLoot({type: ItemType.item, id: 'Protein'}, 0.091),
            new DreamOrbLoot({type: ItemType.item, id: 'Calcium'}, 0.092),
            new DreamOrbLoot({type: ItemType.item, id: 'Carbos'}, 0.092),
            new DreamOrbLoot({type: ItemType.item, id: 'Rare_Candy'}, 0.15),
        ]),
        new DreamOrb('Blue', new MultiRequirement([new ObtainedPokemonRequirement('Landorus (Therian)'), new ObtainedPokemonRequirement('Enamorus')]), [
            new DreamOrbLoot({type: ItemType.item, id: 'Igglybuff'}, 0.2),
            new DreamOrbLoot({type: ItemType.item, id: 'Smoochum'}, 0.2),
            new DreamOrbLoot({type: ItemType.item, id: 'Enamorus (Therian)'}, 0.05),
            new DreamOrbLoot({type: ItemType.item, id: 'Moon_stone'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Leaf_stone'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Thunder_stone'}, 0.1),
            new DreamOrbLoot({type: ItemType.item, id: 'Heart_scale'}, 0.125),
            new DreamOrbLoot({type: ItemType.item, id: 'Max_revive'}, 0.1),
        ]),
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
            const items: Record<string | number, { amount: number; item: BagItem }> = {};
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
            this.itemsReceived(Object.values(items).map((item) => ({ name: BagHandler.displayName(item.item), ...item })));
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
    public onclick(): void {
        $('#dreamOrbsModal').modal('show');
    }
}
