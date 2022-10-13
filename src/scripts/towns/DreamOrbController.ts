class DreamOrbLoot {
    constructor(public item: BagItem, public weight: number) {
    }
}

class DreamOrb {
    public amount = ko.observable(100); //TODO: change to 0 before merge
    constructor(public color: string, public requirement: Requirement, public items: DreamOrbLoot[]) {
    }
}

class DreamOrbController implements Saveable {
    public selectedOrb: KnockoutObservable<DreamOrb>;
    public opening: KnockoutObservable<boolean>;
    public item: KnockoutObservable<DreamOrbLoot>;

    constructor() {
        this.selectedOrb = ko.observable(this.orbs[0]);
        this.opening = ko.observable(false);
        this.item = ko.observable(undefined);
    }

    public orbs = [
        new DreamOrb('Pink', undefined, [
            new DreamOrbLoot({type: ItemType.item, id: 'Tornadus (Therian)'}, 0.01),
            new DreamOrbLoot({type: ItemType.underground, id: 'Red Shard'}, 0.01),
        ]),
        new DreamOrb('Green', new ObtainedPokemonRequirement(pokemonMap['Tornadus (Therian)']), [
            new DreamOrbLoot({type: ItemType.item, id: 'Thundurus (Therian)'}, 0.01),
            new DreamOrbLoot({type: ItemType.underground, id: 'Moon Stone'}, 0.01),
        ]),
    ]

    public open() {
        if (!this.selectedOrb().amount) {
            Notifier.notify({
                message: 'No orbs left.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }
        this.opening(true);
        this.item(undefined);
        GameHelper.incrementObservable(this.selectedOrb().amount, -1);
        const item = Rand.fromWeightedArray(this.selectedOrb().items, this.selectedOrb().items.map((i) => i.weight));
        BagHandler.gainItem(item.item);
        setTimeout(() => {
            this.item(item);
            this.opening(false);
        }, 1800);
    }

    saveKey = 'dream-orbs';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            orbs: [
                ...this.orbs.map((o) => {
                    return {amount: o.amount(), color: o.color};
                }),
            ],
        };
    }
    fromJSON(json: Record<string, any>): void {
        json?.orbs?.forEach((o) => this.orbs.find((o2) => o2.color == o.color).amount(o.amount));
    }
}

class DreamOrbTownContent extends TownContent {
    constructor() {
        super([
            new ObtainedPokemonRequirement(pokemonMap.Tornadus),
            new ObtainedPokemonRequirement(pokemonMap.Thundurus),
            new ObtainedPokemonRequirement(pokemonMap.Landorus),
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
