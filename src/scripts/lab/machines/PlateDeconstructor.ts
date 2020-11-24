/// <reference path="./Machine.ts" />

/**
 * The Plate Deconstructor machine is used to deconstruct plates into shards.
 */
class PlateDeconstructor extends Machine {

    public static shardAmount = 200;
    public static progressAmount = 1000;

    createState(json?: any): MachineState {
        const state = new PlateDeconstructorState();
        state.fromJSON(json);
        return state;
    }

}

class PlateDeconstructorState extends MachineState {

    private _plateType: KnockoutObservable<PokemonType>;

    private _queue: KnockoutObservable<number>;

    constructor() {
        super();
        this._plateType = ko.observable(PokemonType.Water);
        this._queue = ko.observable(0);
    }
    toggleState() {
        if (this.active) {
            this.active = false;
            this.handleCancel();
        } else {
            this.active = true;
            this.stage = MachineStage.idle;
        }
    }

    update(delta: number) {
        if (this.stage === MachineStage.disabled) {
            return;
        } else if (this.stage === MachineStage.idle) {
            if (player.mineInventory()[UndergroundItem.getPlateIDByType(this.plateType)].amount() > 0) {
                this.stage = MachineStage.active;
                GameHelper.incrementObservable(player.mineInventory()[UndergroundItem.getPlateIDByType(this.plateType)].amount, -1);
                this.progress = 0;
            }
        } else if (this.stage === MachineStage.active) {
            this.progress += delta;
            if (this.progress >= PlateDeconstructor.progressAmount) {
                App.game.shards.gainShards(PlateDeconstructor.shardAmount, this.plateType);
                this.stage = MachineStage.idle;
                this.progress = 0;
            }
        }
        return;
    }

    handleCancel() {
        if (this.stage === MachineStage.active) {
            this.progress = 0;
            // Returning Plate
            GameHelper.incrementObservable(player.mineInventory()[UndergroundItem.getPlateIDByType(this.plateType)].amount, 1);
        }
        this.stage = MachineStage.disabled;
    }

    remove() {
        this.handleCancel();
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['plateType'] = this.plateType;
        json['amount'] = this.queue;
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        if (!json) {
            this.plateType = PokemonType.Normal;
            this.queue = 0;
        } else {
            this.plateType = json.hasOwnProperty('plateType') ? json['plateType'] : PokemonType.Normal;
            this.queue = json.hasOwnProperty('queue') ? json['queue'] : 0;
        }
    }

    get plateType(): PokemonType {
        return this._plateType();
    }

    set plateType(value: PokemonType) {
        this._plateType(value);
    }

    get queue(): number {
        return this._queue();
    }

    set queue(value: number) {
        this._queue(value);
    }

}
