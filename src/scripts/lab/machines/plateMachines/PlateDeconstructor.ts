/// <reference path="./PlateMachine.ts" />
/**
 * The Plate Deconstructor machine is used to deconstruct plates into shards.
 */
class PlateDeconstructor extends PlateMachine {

    // TODO: HLXII - Balance base values
    public static baseShardProfit = 500;
    public static progressAmount = 10;

    // TODO: HLXII - Handle Research upgrades
    public static shardProfit: KnockoutComputed<number> = ko.pureComputed(() => {
        return PlateDeconstructor.baseShardProfit;
    });

    createState(json?: any): MachineState {
        const state = new PlateDeconstructorState();
        state.fromJSON(json);
        return state;
    }

}

class PlateDeconstructorState extends PlateMachineState {

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
                    tooltip.push(`Deconstructing ${Underground.getMineItemById(UndergroundItem.getPlateIDByType(this.plateType)).name}s`);
                    tooltip.push(`${this.queue} left in queue.`);
                    return tooltip.join('<br>');
                }
            }
        });
        this.progressAmount = ko.pureComputed(() => {
            return PlateDeconstructor.progressAmount;
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
                // Checking if there are plates to deconstruct
                if (PlateDeconstructor.getPlateAmount(this.plateType)() > 0) {
                    this.stage = MachineStage.active;
                    GameHelper.incrementObservable(PlateDeconstructor.getPlateAmount(this.plateType), -1);
                    this.progress = 0;
                    this.queue -= 1;
                }
                return;
            }
            case MachineStage.active: {
                // TODO: HLXII - Handle Research Upgrades (?)
                this.progress += delta;
                // Checking deconstruction completion
                if (this.progress >= this.progressAmount()) {
                    // Gain shards
                    App.game.shards.gainShards(PlateDeconstructor.shardProfit(), this.plateType);
                    // Checking queue
                    if (this.queue > 0 && PlateDeconstructor.getPlateAmount(this.plateType)() > 0) {
                        this.queue -= 1;
                        GameHelper.incrementObservable(PlateDeconstructor.getPlateAmount(this.plateType), -1);
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
        if (this.stage === MachineStage.active) {
            this.progress = 0;
            // Returning Plate
            GameHelper.incrementObservable(PlateDeconstructor.getPlateAmount(this.plateType), 1);
            this.queue += 1;
        }
        this.stage = MachineStage.disabled;
    }

    setMaxQueue(): void {
        this.queue = PlateDeconstructor.getPlateAmount(this.plateType)();
    }

}
