/// <reference path="./Machine.ts" />
/**
 * The Plate Reconstructor machine is used to reconstruct plates from shards.
 */
class PlateReconstructor extends Machine {

    public static baseShardCost = 500;
    public static progressAmount = 10;

    public static shardCost: KnockoutComputed<number> = ko.pureComputed(() => {
        return PlateReconstructor.baseShardCost;
    });

    createState(json?: any): MachineState {
        const state = new PlateReconstructorState();
        state.fromJSON(json);
        return state;
    }

    public static getPlateAmount(type: PokemonType): number {
        const plateID = UndergroundItem.getPlateIDByType(type);
        const plateIndex = player.mineInventoryIndex(plateID);
        return player.mineInventory()[plateIndex].amount();
    }

}

class PlateReconstructorState extends MachineState {

    private _plateType: KnockoutObservable<PokemonType>;

    private _queue: KnockoutObservable<number>;

    public queueInput: KnockoutObservable<string>;

    constructor() {
        super();
        this._plateType = ko.observable(PokemonType.Water);
        this._queue = ko.observable(0);
        this.queueInput = ko.observable('0');

        this.tooltip = ko.pureComputed(() => {
            switch (this.stage) {
                case MachineStage.disabled: {
                    return 'Disabled';
                }
                case MachineStage.idle: {
                    return 'Idle';
                }
                case MachineStage.active: {
                    const tooltip = [];
                    tooltip.push(`Constructing ${Underground.getMineItemById(UndergroundItem.getPlateIDByType(this.plateType)).name}s`);
                    tooltip.push(`${this.queue} left in queue.`);
                    return tooltip.join('<br>');
                }
            }
        });
    }

    toggleState() {
        if (this.active) {
            this.active = false;
            this.handleCancel();
        } else {
            this.active = true;
            this.stage = MachineStage.idle;
            // Handling queueInput
            this.queue = !isNaN(Number(this.queueInput())) ? Number(this.queueInput()) : 0;
        }
    }

    update(delta: number) {
        switch (this.stage) {
            case MachineStage.disabled: {
                return;
            }
            case MachineStage.idle: {
                // Checking queue
                if (this.queue <= 0) {
                    return;
                }
                // Checking if enough shards to begin reconstruction
                if (App.game.shards.shardWallet[this.plateType]() >= PlateReconstructor.shardCost()) {
                    this.stage = MachineStage.active;
                    App.game.shards.gainShards(-PlateReconstructor.shardCost(), this.plateType);
                    this.progress = 0;
                    this.queue -= 1;
                }
            }
            case MachineStage.active: {
                this.progress += delta;
                // Checking Plate completion
                if (this.progress >= PlateReconstructor.progressAmount) {
                    const plateID = UndergroundItem.getPlateIDByType(this.plateType);
                    const plateIndex = player.mineInventoryIndex(plateID);
                    GameHelper.incrementObservable(player.mineInventory()[plateIndex].amount, 1);
                    this.stage = MachineStage.idle;
                    this.progress = 0;
                }
            }
        }
    }

    handleCancel() {
        if (this.stage === MachineStage.active) {
            this.progress = 0;
            // Returning Shards
            App.game.shards.gainShards(PlateReconstructor.shardCost(), this.plateType);
        }
        this.stage = MachineStage.disabled;
    }

    remove() {
        this.handleCancel();
    }

    setMaxQueue(): void {
        const max = Math.floor(App.game.shards.shardWallet[this.plateType]() / PlateReconstructor.shardCost());
        this.queueInput(max.toString());
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['plateType'] = this.plateType;
        json['queue'] = this.queue;
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        if (!json) {
            this.plateType = PokemonType.Water;
            this.queue = 0;
        } else {
            this.plateType = json.hasOwnProperty('plateType') ? json['plateType'] : PokemonType.Water;
            this.queue = json.hasOwnProperty('queue') ? json['queue'] : 0;
        }
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
        this.queueInput(this._queue().toString());
    }

}
