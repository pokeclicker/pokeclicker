class DreamOrbLoot {
    constructor(public item: BagItem, public weight: number) {
    }
}

class DreamOrb {
    public amount = 0;
    constructor(public color: string, public requirement: Requirement, public items: DreamOrbLoot[]) {
    }
}

class DreamOrbController implements Saveable {
    public selectedOrb: KnockoutObservable<DreamOrb>;

    constructor() {
        this.selectedOrb = ko.observable(this.orbs[0]);
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

    saveKey = 'dream-orbs';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            orbs: [
                ...this.orbs.map((o) => {
                    return {amount: o.amount, color: o.color};
                }),
            ],
        };
    }
    fromJSON(json: Record<string, any>): void {
        json?.orbs?.forEach((o) => this.orbs.find((o2) => o2.color == o.color).amount = o.amount);
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
