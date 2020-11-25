/// <reference path="./PlateMachine.ts" />
/**
 * The Plate Reconstructor machine is used to reconstruct plates from shards.
 */
class PlateReconstructor extends PlateMachine {

    // TODO: HLXII - Balance base values
    public static baseShardCost = 500;
    public static progressAmount = 10;

    // TODO: HLXII - Handle Research Upgrades
    public static shardCost: KnockoutComputed<number> = ko.pureComputed(() => {
        return PlateReconstructor.baseShardCost;
    });

    createState(json?: any): MachineState {
        const state = new PlateReconstructorState();
        state.fromJSON(json);
        return state;
    }

}

class PlateReconstructorState extends PlateMachineState {

    constructor() {
        super();

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
        this.progressAmount = ko.pureComputed(() => {
            return PlateReconstructor.progressAmount;
        });
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
                return;
            }
            case MachineStage.active: {
                // TODO: HLXII - Handle Research Upgrades (?)
                this.progress += delta;
                // Checking Plate completion
                if (this.progress >= this.progressAmount()) {
                    // Gain plate
                    const plateAmount = PlateReconstructor.getPlateAmount(this.plateType);
                    GameHelper.incrementObservable(plateAmount, 1);
                    // Checking queue
                    if (this.queue > 0 && App.game.shards.shardWallet[this.plateType]() >= PlateReconstructor.shardCost()) {
                        App.game.shards.gainShards(-PlateReconstructor.shardCost(), this.plateType);
                        this.queue -= 1;
                    } else {
                        this.stage = MachineStage.idle;
                    }
                    this.progress = 0;
                }
                return;
            }
        }
    }

    handleDeactivate() {
        this.progress = 0;
        if (this.stage === MachineStage.active) {
            // Returning Shards
            App.game.shards.gainShards(PlateReconstructor.shardCost(), this.plateType);
            this.queue += 1;
        }
        this.stage = MachineStage.disabled;
    }

    setMaxQueue(): void {
        const max = Math.floor(App.game.shards.shardWallet[this.plateType]() / PlateReconstructor.shardCost());
        this.queueInput(max.toString());
    }

}
