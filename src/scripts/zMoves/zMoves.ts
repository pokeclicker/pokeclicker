/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class ZMoves implements Feature {
    name = 'Z Moves';
    saveKey = 'zMoves';
    defaults = { types: [] };
    public counter = 0;

    public _types: KnockoutObservableArray<PokemonType> = ko.observableArray([]);
    public totalCost: KnockoutComputed<Amount> = ko.computed(() => {
        return new Amount(GameConstants.ZMOVE_COST * this.types.length ** 2, GameConstants.Currency.money);
    });


    initialize(): void {
    }

    getTypeMultiplier(type1 = PokemonType.None, type2 = PokemonType.None): number {
        if (type1 == PokemonType.None || !this.types.length) {
            return 1;
        }
        return Math.max(...this.types.map(t => TypeHelper.getAttackModifier(t, PokemonType.None, type1, type2)));
    }

    pickTypeAgainst(pokemon: PokemonNameType) {
        if (!this.types.length) {
            return PokemonType.None;
        }
        const {id, type1, type2} = PokemonHelper.getPokemonByName(pokemon);
        let bestTypes = [];
        let bestMultiplier = -1;
        this.types.forEach(t => {
            const m = TypeHelper.getAttackModifier(t, PokemonType.None, type1, type2);
            if (m > bestMultiplier) {
                bestTypes = [t];
                bestMultiplier = m;
            } else if (m === bestMultiplier) {
                bestTypes.push(t);
            }
        });
        // We want to randomize the used type otherwise the first best type would always be picked and that is boring
        // This is the code used for egg spots by the way
        const seed = id * (type1 + 1) * Math.max(type2 + 1, 1);
        SeededRand.seed(seed);
        SeededRand.seed(SeededRand.intBetween(0, 1000));
        return SeededRand.fromArray(bestTypes);
    }

    crystalImage(type: PokemonType) {
        if (type === PokemonType.None) {
            return '';
        }
        return ItemList[GameConstants.zCrystalItemType[type]].image;
    }

    isActive(type: PokemonType): boolean {
        return this.types.findIndex((t) => type == t) > -1;
    }

    deactivateAll() {
        this._types([]);
    }

    toggle(type: PokemonType) {
        if (this.isActive(type)) {
            this._types.remove(type);
        } else {
            this._types.push(type);
        }
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
        this._types(json.types);
    }

    toJSON() {
        return {
            types: ko.unwrap(this._types),
        };
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType['Z-Power_Ring']);
    }

    update(delta: number): void {}  // This method intentionally left blank

    tick(): void {
        if (this.types.length > 0) {
            if (!App.game.wallet.hasAmount(this.totalCost())) {
                Notifier.notify({
                    title: 'Z-Moves',
                    message: 'You can no longer afford Z-Crystals being activated',
                    type: NotificationConstants.NotificationOption.danger,
                });
                this.deactivateAll();
            } else {
                App.game.wallet.loseAmount(this.totalCost());
            }
        }
        this.counter = 0;
    }

    get types() {
        return this._types();
    }
}
