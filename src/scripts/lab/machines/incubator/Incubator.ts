/// <reference path="../Machine.ts" />
/// <reference path="../MachineState.ts" />
/**
 * The Incubator will increase the number of queue slots in the Hatchery when placed in the Lab.
 */
class Incubator extends Machine {

    createState(json?: any): MachineState {
        const state = new IncubatorState();
        state.fromJSON(json);
        return state;
    }

    hasModal(): boolean {
        return false;
    }

    // TODO: HLXII - Handle Research Upgrades
    public static queueSlotGain: KnockoutComputed<number> = ko.pureComputed(() => {
        return 2;
    });

}

class IncubatorState extends MachineState {

    constructor() {
        super();

        this.tooltip = ko.pureComputed(() => {
            return `Adds ${Incubator.queueSlotGain()} Hatchery queue slots.`;
        });
    }

    // Empty Implementation, as the Incubator will only have a passive effect.
    // TODO: HLXII - Possibly could have Research Upgrades to boost Egg steps for some cost.
    update(delta: number) {
        return;
    }
    handleActivate(): void {
        return;
    }
    handleDeactivate(): void {
        return;
    }

    // Handle updating Breeding queue on remove
    remove(): void {
        // TODO: HLXII - Handle updating queueSlots. Might need to update how we calculate those
    }

}
