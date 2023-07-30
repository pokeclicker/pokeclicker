/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class ZMoves implements Feature {
    name = 'Z Moves';
    saveKey = 'zMoves';
    defaults: Record<string, any>;
    public counter = 0;

    static requirement = new DevelopmentRequirement();
    type: KnockoutObservable<PokemonType> = ko.observable(PokemonType.Normal);
    time: KnockoutObservable<number> = ko.observable(0);
    formattedTime: KnockoutObservable<string> = ko.computed(() => GameConstants.formatTime(this.time() / GameConstants.SECOND).split(':').slice(1).join(':'));
    status: KnockoutObservable<GameConstants.ZMoveStatus> = ko.observable(GameConstants.ZMoveStatus.inactive);

    initialize(): void {
    }

    getMultiplier(...types: PokemonType[]): number {
        if (this.status() === GameConstants.ZMoveStatus.inactive) {
            return 1;
        }
        return types.includes(this.type()) || !types.length ? this.multiplier : 1;
    }

    isActive(): boolean {
        return this.status() > GameConstants.ZMoveStatus.inactive;
    }

    activate(type: PokemonType) {
        if (this.isActive()) {
            return;
        }
        this.type(type);
        this.time(GameConstants.ZMOVE_ACTIVE_TIME);
        this.status(GameConstants.ZMoveStatus.active);
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
        this.type(json.type ?? PokemonType.None);
        this.time(json.time ?? 0);
        this.status(json.status ?? GameConstants.ZMoveStatus.inactive);
    }

    toJSON() {
        return {
            type : this.type(),
            time : this.time(),
            status : this.status(),
        };
    }

    canAccess(): boolean {
        return ZMoves.requirement.isCompleted() && GameConstants.zCrystalItemType.some(crystal => player.itemList[crystal]() > 0);
    }

    update(delta: number): void {}  // This method intentionally left blank

    tick(): void {
        if (this.status() !== GameConstants.ZMoveStatus.inactive) {
            GameHelper.incrementObservable(this.time, -GameConstants.ZMOVE_TICK);
            if (this.time() === 0) {
                GameHelper.incrementObservable(this.status, -1);
                if (this.status() === GameConstants.ZMoveStatus.counteractive) {
                    this.time(GameConstants.ZMOVE_COUNTERACTIVE_TIME);
                }
            }
        }
        this.counter = 0;
    }

    get multiplier(): number {
        return GameConstants[`ZMOVE_${GameConstants.ZMoveStatus[this.status()].toUpperCase()}_MULTIPLIER`];
    }
}
