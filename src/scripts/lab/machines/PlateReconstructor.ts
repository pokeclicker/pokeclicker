/// <reference path="./Machine.ts" />
/**
 * The Plate Reconstructor machine is used to reconstruct plates from shards.
 */
class PlateReconstructor extends Machine {

    public static shardAmount = 500;
    public static progressAmount = 1000;

    createState(json?: any): MachineState {
        const state = new PlateReconstructorState();
        state.fromJSON(json);
        return state;
    }

}

class PlateReconstructorState extends MachineState {

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
            // Checking queue
            if (this.queue <= 0) {
                return;
            }
            // Checking if enough shards to begin reconstruction
            if (App.game.shards.shardWallet[this.plateType]() > PlateReconstructor.shardAmount) {
                this.stage = MachineStage.active;
                App.game.shards.gainShards(-PlateDeconstructor.shardAmount, this.plateType);
                this.progress = 0;
            }
        } else if (this.stage === MachineStage.active) {
            this.progress += delta;
            // Checking Plate completion
            if (this.progress >= PlateDeconstructor.progressAmount) {
                GameHelper.incrementObservable(player.mineInventory()[UndergroundItem.getPlateIDByType(this.plateType)].amount, 1);
                this.stage = MachineStage.idle;
                this.progress = 0;
            }
        }
        return;
    }

    handleCancel() {
        if (this.stage === MachineStage.active) {
            this.progress = 0;
            // Returning Shards
            App.game.shards.gainShards(PlateReconstructor.shardAmount, this.plateType);
        }
        this.stage = MachineStage.disabled;
    }

    remove() {
        this.handleCancel();
    }

    get progressPercent() {
        return (this.progress / PlateReconstructor.progressAmount) * 100;
    }

    get progressString() {
        return `${this.progress.toFixed(0)}/${PlateReconstructor.progressAmount}`;
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
